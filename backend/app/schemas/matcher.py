# ponytail: Pydantic v2 schemas for hybrid matcher, safety gate, and ONMC minter.
# Upgrade path: add vector query payload schema for direct pgvector KNN streaming.

from typing import Any, Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class GateEvaluationResponse(BaseModel):
    """Safety rule gate evaluation output."""

    passed: bool
    rejection_reasons: List[str] = Field(default_factory=list)
    criticality: str = Field(default="CLEAN", description="'BLOCKER', 'WARNING', or 'CLEAN'")


class MatchEvaluationRequest(BaseModel):
    """Request payload for comparing two material items."""

    raw_text_a: str = Field(..., min_length=2, description="First material description")
    raw_text_b: str = Field(..., min_length=2, description="Second material description")
    raw_material_id: Optional[UUID] = Field(None, description="Optional database ID of raw material")


class MatchEvaluationResponse(BaseModel):
    """Response payload for hybrid match evaluation."""

    raw_material_id: Optional[UUID] = None
    onmc_candidate_code: str
    canonical_description: str
    confidence_score: float
    lexical_similarity: float
    semantic_similarity: float
    rule_gate_passed: bool
    rejection_reasons: List[str] = Field(default_factory=list)
    shell_mesc_code: Optional[str] = None
    mesc_spe_spec: Optional[str] = None
    unspsc_code: Optional[str] = None
    gem_category_id: Optional[str] = None
    mapping_status: str = Field(..., description="'AUTO_APPROVED', 'PENDING_REVIEW', 'NOVEL_ITEM', 'REJECTED'")


class MintCodeRequest(BaseModel):
    """Request to mint sovereign ONMC code from raw text or attributes."""

    raw_text: Optional[str] = None
    attributes: Optional[Dict[str, Any]] = None
    include_hash: bool = Field(default=True, description="Whether to append deterministic 4-character SHA hash")


class MintCodeResponse(BaseModel):
    """Minted ONMC code and metadata."""

    onmc_code: str
    base_code: str
    verification_hash: Optional[str] = None
    item_class: str
