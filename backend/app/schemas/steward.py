# ponytail: Pydantic schemas for HITL steward triage queue and decision auditing.
# Upgrade path: add multi-analyst consensus scoring and batch resolution payload.

from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class AttributeDiffItem(BaseModel):
    """Side-by-side attribute comparison unit with conflict classification."""

    attribute_name: str
    raw_value: Optional[str] = None
    canonical_value: Optional[str] = None
    status: str = Field(..., description="'MATCH', 'CONFLICT', 'TOLERANCE', or 'MISSING'")


class TriageQueueItem(BaseModel):
    """Borderline candidate pair for human steward resolution."""

    mapping_id: UUID
    raw_material_id: Optional[UUID] = None
    organization_code: str
    plant_location: str
    source_item_code: str
    raw_description: str
    onmc_candidate_code: str
    canonical_description: str
    confidence_score: float
    lexical_similarity: float
    semantic_similarity: float
    rule_gate_passed: bool
    rejection_reasons: List[str] = Field(default_factory=list)
    shell_mesc_code: Optional[str] = None
    unspsc_code: Optional[str] = None
    gem_category_id: Optional[str] = None
    attribute_diffs: List[AttributeDiffItem] = Field(default_factory=list)
    mapping_status: str


class TriageQueueResponse(BaseModel):
    """Paginated triage review queue."""

    total_pending: int
    items: List[TriageQueueItem] = Field(default_factory=list)


class StewardDecisionRequest(BaseModel):
    """Action payload for approving, rejecting, or overriding match."""

    mapping_id: UUID
    decision: str = Field(..., pattern="^(APPROVE|REJECT|OVERRIDE|MINT)$")
    override_attributes: Optional[Dict[str, Any]] = None
    justification: str = Field(..., min_length=5, description="Technical justification for audit log")
    actor_email: Optional[str] = Field(default="steward@numm.gov.in")


class StewardDecisionResponse(BaseModel):
    """Confirmation payload with tamper-evident cryptographic hash."""

    mapping_id: UUID
    status: str
    onmc_code: Optional[str] = None
    audit_log_id: UUID
    sha256_hash: str
    action_recorded: str
    timestamp: datetime
    message: str
