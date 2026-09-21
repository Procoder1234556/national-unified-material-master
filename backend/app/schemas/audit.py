# ponytail: Schemas for CVC-compliant append-only cryptographic audit chain and verification.
# Upgrade path: add RFC 3161 cryptographic timestamp authority signature schema.

from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class AuditBlockSchema(BaseModel):
    index: int
    audit_id: str
    timestamp: str
    actor_email: str
    actor_role: str
    action: str
    entity_type: str
    entity_id: str
    payload_digest: str
    previous_hash: str
    block_hash: str
    details: Optional[Dict[str, Any]] = None


class AuditChainResponse(BaseModel):
    total_blocks: int
    genesis_hash: str
    tip_hash: str
    blocks: List[AuditBlockSchema]


class AuditChainVerificationResponse(BaseModel):
    is_valid: bool
    total_blocks: int
    genesis_hash: str
    tip_hash: str
    verified_at: str
    tamper_detected_at_index: Optional[int] = None
    reason: Optional[str] = None


class AuditStatsResponse(BaseModel):
    total_records: int
    unique_actors: int
    action_breakdown: Dict[str, int]
    is_chain_healthy: bool
    tip_hash: str
    genesis_hash: str
    last_verified_at: str


class CVCDossierExportResponse(BaseModel):
    certificate_id: str
    framework: str = "National Unified Material Master (NUMM) - SIH 26099"
    statutory_standard: str = "CVC Digital Evidence & Transparency Directive / GFR Rule 149"
    issued_at: str
    total_blocks_audited: int
    chain_integrity: str
    genesis_root_hash: str
    tip_block_hash: str
    audited_by_system: str = "NUMM Cryptographic Provenance Ledger v2.2.0"
    blocks: List[AuditBlockSchema]
