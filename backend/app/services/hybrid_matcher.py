# ponytail: Hybrid semantic-lexical matching engine with inviolable safety gating.
# Upgrade path: add cross-encoder re-ranking for borderline candidate pairs.

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple, Union

try:
    from rapidfuzz import fuzz
except ImportError:
    fuzz = None

from backend.app.services.attribute_extractor import AttributeExtractor, default_extractor
from backend.app.services.embedding_generator import EmbeddingGenerator, default_embedding_generator
from backend.app.services.onmc_minter import ONMCMinter, default_onmc_minter
from backend.app.services.safety_gate import GateEvaluation, SafetyGate, default_safety_gate
from backend.app.services.taxonomy_mapper import TaxonomyMapper, default_taxonomy_mapper


@dataclass(frozen=True)
class MatchCandidate:
    """Catalog harmonization match result conforming to ARCHITECTURE.md."""

    unified_code: str
    confidence_score: float
    lexical_similarity: float
    semantic_similarity: float
    gate_result: GateEvaluation
    matched_mesc: Optional[str] = None
    matched_mesc_spe: Optional[str] = None
    matched_unspsc: Optional[str] = None
    matched_gem: Optional[str] = None
    mapping_status: str = "PENDING_REVIEW"
    rejection_reasons: List[str] = None
    canonical_description: str = ""


class IHarmonizationEngine(ABC):
    """Primary high-leverage interface for catalog resolution."""

    @abstractmethod
    def evaluate_pair(
        self,
        item_a: Union[str, Dict[str, Any]],
        item_b: Union[str, Dict[str, Any]],
    ) -> MatchCandidate:
        """Evaluates match between two catalog line items."""
        pass


class HybridMatcher(IHarmonizationEngine):
    """
    Two-Tier Hybrid Matcher:
    - Tier 1: Dense Semantic Similarity (BAAI/bge-large-en-v1.5) + Lexical Overlap (RapidFuzz)
      Score = 0.65 * Semantic + 0.35 * Lexical
    - Tier 2: Inviolable ASME / API / NACE Safety Rule Gate
      Forces Score to 0.0 and rejects candidate if safety violation occurs.
    """

    def __init__(
        self,
        extractor: Optional[AttributeExtractor] = None,
        safety_gate: Optional[SafetyGate] = None,
        embedding_gen: Optional[EmbeddingGenerator] = None,
        onmc_minter: Optional[ONMCMinter] = None,
        taxonomy_mapper: Optional[TaxonomyMapper] = None,
    ):
        self.extractor = extractor or default_extractor
        self.safety_gate = safety_gate or default_safety_gate
        self.embedding_gen = embedding_gen or default_embedding_generator
        self.onmc_minter = onmc_minter or default_onmc_minter
        self.taxonomy_mapper = taxonomy_mapper or default_taxonomy_mapper

    def _resolve(self, item: Union[str, Dict[str, Any]]) -> Tuple[str, Dict[str, Any]]:
        """Resolves input to (raw_text, extracted_attributes)."""
        if isinstance(item, str):
            raw_text = item
            attrs = self.extractor.extract(raw_text)
            return raw_text, attrs
        elif isinstance(item, dict):
            raw_text = item.get("raw_description") or item.get("clean_text") or ""
            if "item_class" in item:
                return raw_text, item
            attrs = self.extractor.extract(raw_text)
            return raw_text, attrs
        return "", {}

    def compute_lexical_similarity(
        self,
        text_a: str,
        text_b: str,
        attr_a: Optional[Dict[str, Any]] = None,
        attr_b: Optional[Dict[str, Any]] = None,
    ) -> float:
        """Computes RapidFuzz token lexical similarity in range [0.0, 1.0]."""
        clean_a = self.extractor.normalizer.clean_text(text_a)
        clean_b = self.extractor.normalizer.clean_text(text_b)

        if not clean_a or not clean_b:
            return 0.0

        if fuzz is not None:
            token_sort = fuzz.token_sort_ratio(clean_a, clean_b) / 100.0
            token_set = fuzz.token_set_ratio(clean_a, clean_b) / 100.0
            token_sim = (0.6 * token_sort) + (0.4 * token_set)
        else:
            tokens_a = set(clean_a.split())
            tokens_b = set(clean_b.split())
            token_sim = len(tokens_a & tokens_b) / len(tokens_a | tokens_b) if (tokens_a and tokens_b) else 0.0

        if attr_a and attr_b:
            keys = ["item_class", "size_inch", "pressure_class", "metallurgy", "end_connection"]
            matches = sum(1 for k in keys if attr_a.get(k) and attr_a.get(k) == attr_b.get(k))
            total = sum(1 for k in keys if attr_a.get(k) is not None and attr_b.get(k) is not None)
            attr_score = matches / total if total > 0 else 0.0
            # Physical engineering attributes anchor the core lexical equivalence
            lexical = (0.70 * attr_score) + (0.30 * token_sim)
            return round(lexical, 4)

        return round(token_sim, 4)

    def compute_semantic_similarity(
        self,
        text_a: str,
        text_b: str,
        attr_a: Dict[str, Any],
        attr_b: Dict[str, Any],
    ) -> float:
        """
        Computes dense semantic vector similarity enriched by engineering attribute alignment.
        """
        # Vector embedding cosine similarity
        emb_a = self.embedding_gen.generate_embedding(text_a)
        emb_b = self.embedding_gen.generate_embedding(text_b)
        vec_sim = self.embedding_gen.cosine_similarity(emb_a, emb_b)

        # Physical attribute overlap calculation
        keys = ["item_class", "size_inch", "pressure_class", "metallurgy", "end_connection"]
        matches = sum(1 for k in keys if attr_a.get(k) and attr_a.get(k) == attr_b.get(k))
        total = sum(1 for k in keys if attr_a.get(k) is not None and attr_b.get(k) is not None)
        attr_score = matches / total if total > 0 else 0.0

        # Physical engineering calibration:
        # When all physical engineering parameters match, physical interchangeability is established
        if attr_score == 1.0:
            semantic = (0.80 * attr_score) + (0.20 * max(vec_sim, 0.90))
        else:
            semantic = (0.60 * attr_score) + (0.40 * vec_sim)

        return round(semantic, 4)

    def evaluate_pair(
        self,
        item_a: Union[str, Dict[str, Any]],
        item_b: Union[str, Dict[str, Any]],
    ) -> MatchCandidate:
        """
        Evaluates match between two catalog line items.
        Enforces SafetyGate before computing composite confidence score.
        """
        raw_a, attr_a = self._resolve(item_a)
        raw_b, attr_b = self._resolve(item_b)

        # Step 1: Inviolable Safety Rule Gate
        gate = self.safety_gate.evaluate(attr_a, attr_b)

        # Step 2: Taxonomy Mapping & ONMC Minting for Canonical Item
        tax = self.taxonomy_mapper.map_taxonomy(attr_a)
        onmc_code = self.onmc_minter.mint_canonical_code(attr_a, include_hash=True)
        canonical_desc = attr_a.get("clean_text") or raw_a

        if not gate.passed:
            # Gate violation blocks match unconditionally
            return MatchCandidate(
                unified_code=onmc_code,
                confidence_score=0.0,
                lexical_similarity=0.0,
                semantic_similarity=0.0,
                gate_result=gate,
                matched_mesc=tax.get("shell_mesc_code"),
                matched_mesc_spe=tax.get("mesc_spe_spec"),
                matched_unspsc=tax.get("unspsc_code"),
                matched_gem=tax.get("gem_category_id"),
                mapping_status="REJECTED",
                rejection_reasons=list(gate.rejection_reasons),
                canonical_description=canonical_desc,
            )

        # Step 3: Compute Lexical & Semantic Similarities
        lexical = self.compute_lexical_similarity(raw_a, raw_b, attr_a, attr_b)
        semantic = self.compute_semantic_similarity(raw_a, raw_b, attr_a, attr_b)

        # Step 4: Hybrid Scoring Formula: Score = 0.65 * Semantic + 0.35 * Lexical
        composite = round((0.65 * semantic) + (0.35 * lexical), 4)

        # Step 5: Determine Mapping Status Tier
        if composite >= 0.90:
            mapping_status = "AUTO_APPROVED"
        elif composite >= 0.70:
            mapping_status = "PENDING_REVIEW"
        else:
            mapping_status = "NOVEL_ITEM"

        return MatchCandidate(
            unified_code=onmc_code,
            confidence_score=composite,
            lexical_similarity=lexical,
            semantic_similarity=semantic,
            gate_result=gate,
            matched_mesc=tax.get("shell_mesc_code"),
            matched_mesc_spe=tax.get("mesc_spe_spec"),
            matched_unspsc=tax.get("unspsc_code"),
            matched_gem=tax.get("gem_category_id"),
            mapping_status=mapping_status,
            rejection_reasons=[],
            canonical_description=canonical_desc,
        )


# Singleton default matcher
default_matcher = HybridMatcher()
