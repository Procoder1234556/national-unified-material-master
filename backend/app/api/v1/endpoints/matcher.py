# ponytail: FastAPI endpoints for hybrid matching, safety gating, and ONMC minting.
# Upgrade path: add WebSockets / SSE endpoint for streaming bulk match evaluation.

from fastapi import APIRouter, HTTPException

from backend.app.schemas.matcher import (
    GateEvaluationResponse,
    MatchEvaluationRequest,
    MatchEvaluationResponse,
    MintCodeRequest,
    MintCodeResponse,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.hybrid_matcher import default_matcher
from backend.app.services.onmc_minter import default_onmc_minter
from backend.app.services.safety_gate import default_safety_gate

router = APIRouter()


@router.post("", response_model=MatchEvaluationResponse, include_in_schema=False)
@router.post("/", response_model=MatchEvaluationResponse, include_in_schema=False)
@router.post("/match", response_model=MatchEvaluationResponse, include_in_schema=False)
@router.post("/evaluate", response_model=MatchEvaluationResponse, summary="Evaluate match between two material items")
async def evaluate_match(req: MatchEvaluationRequest):
    """
    Evaluates semantic + lexical similarity between two descriptions,
    enforcing inviolable ASME / API / NACE safety gates.
    Score = 0.65 * Semantic + 0.35 * Lexical.
    """
    res = default_matcher.evaluate_pair(req.raw_text_a, req.raw_text_b)

    return MatchEvaluationResponse(
        raw_material_id=req.raw_material_id,
        onmc_candidate_code=res.unified_code,
        canonical_description=res.canonical_description,
        confidence_score=res.confidence_score,
        lexical_similarity=res.lexical_similarity,
        semantic_similarity=res.semantic_similarity,
        rule_gate_passed=res.gate_result.passed,
        rejection_reasons=res.rejection_reasons or [],
        shell_mesc_code=res.matched_mesc,
        mesc_spe_spec=res.matched_mesc_spe,
        unspsc_code=res.matched_unspsc,
        gem_category_id=res.matched_gem,
        mapping_status=res.mapping_status,
    )


@router.post("/gate", response_model=GateEvaluationResponse, summary="Evaluate safety gate between two material items")
async def evaluate_gate(req: MatchEvaluationRequest):
    """
    Directly evaluates ASME B16.5, ASME B16.34, API 6D, and NACE MR0175
    safety rules to prevent hazardous substitutions.
    """
    gate = default_safety_gate.evaluate(req.raw_text_a, req.raw_text_b)
    return GateEvaluationResponse(
        passed=gate.passed,
        rejection_reasons=gate.rejection_reasons,
        criticality=gate.criticality,
    )


@router.post("/mint", response_model=MintCodeResponse, summary="Mint deterministic sovereign ONMC code")
async def mint_code(req: MintCodeRequest):
    """
    Generates deterministic One Nation, One Material Code (ONMC) with SHA-256 verification hash.
    """
    attrs = req.attributes
    if not attrs and req.raw_text:
        attrs = default_extractor.extract(req.raw_text)
    elif not attrs:
        raise HTTPException(status_code=400, detail="Either raw_text or attributes must be provided.")

    base_code = default_onmc_minter.mint_base_code(attrs)
    v_hash = default_onmc_minter.compute_verification_hash(base_code) if req.include_hash else None
    onmc_code = f"{base_code}-{v_hash}" if req.include_hash else base_code

    return MintCodeResponse(
        onmc_code=onmc_code,
        base_code=base_code,
        verification_hash=v_hash,
        item_class=attrs.get("item_class", "UNKNOWN"),
    )
