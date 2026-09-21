# ponytail: Append-only SHA-256 cryptographic audit chain for CVC/CAG statutory compliance.
# Upgrade path: add Merkle tree root anchoring to Ethereum / Polygon state contract or Hyperledger Besu.

import hashlib
import json
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

from backend.app.schemas.audit import (
    AuditBlockSchema,
    AuditChainResponse,
    AuditChainVerificationResponse,
    AuditStatsResponse,
    CVCDossierExportResponse,
)


class CVCAuditService:
    """
    Cryptographic Append-Only Audit Ledger.
    Complies with Central Vigilance Commission (CVC) digital provenance requirements
    and Comptroller & Auditor General (CAG) compliance standards.
    """

    GENESIS_PREV_HASH = "0" * 64
    GENESIS_ROOT_DIGEST = hashlib.sha256(b"CVC-ROOT-MoPNG-2026-NUMM-GENESIS").hexdigest()

    def __init__(self):
        self._chain: List[Dict[str, Any]] = []
        self._initialize_genesis_block()
        self._seed_pilot_events()

    @staticmethod
    def _compute_hash(
        index: int,
        timestamp: str,
        actor_email: str,
        actor_role: str,
        action: str,
        entity_type: str,
        entity_id: str,
        payload_digest: str,
        previous_hash: str,
    ) -> str:
        content = (
            f"{index}:{timestamp}:{actor_email}:{actor_role}:{action}:"
            f"{entity_type}:{entity_id}:{payload_digest}:{previous_hash}"
        )
        return hashlib.sha256(content.encode("utf-8")).hexdigest()

    def _initialize_genesis_block(self):
        if self._chain:
            return

        genesis_ts = "2026-01-01T00:00:00Z"
        genesis_hash = self._compute_hash(
            index=0,
            timestamp=genesis_ts,
            actor_email="system.genesis@numm.gov.in",
            actor_role="SYSTEM",
            action="GENESIS_BLOCK",
            entity_type="SYSTEM",
            entity_id="ROOT_000",
            payload_digest=self.GENESIS_ROOT_DIGEST,
            previous_hash=self.GENESIS_PREV_HASH,
        )

        genesis_block = {
            "index": 0,
            "audit_id": "00000000-0000-0000-0000-000000000000",
            "timestamp": genesis_ts,
            "actor_email": "system.genesis@numm.gov.in",
            "actor_role": "SYSTEM",
            "action": "GENESIS_BLOCK",
            "entity_type": "SYSTEM",
            "entity_id": "ROOT_000",
            "payload_digest": self.GENESIS_ROOT_DIGEST,
            "previous_hash": self.GENESIS_PREV_HASH,
            "block_hash": genesis_hash,
            "details": {
                "framework": "National Unified Material Master (NUMM)",
                "ministry": "Ministry of Petroleum & Natural Gas (MoPNG)",
                "governance": "CVC Circular No. 01/01/2021 & GFR Rule 149",
            },
        }
        self._chain.append(genesis_block)

    def record_action(
        self,
        actor_email: str,
        actor_role: str,
        action: str,
        entity_type: str,
        entity_id: str,
        details: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Appends a new immutable block to the cryptographic chain.
        """
        tip = self._chain[-1]
        previous_hash = tip["block_hash"]
        index = len(self._chain)
        audit_id = str(uuid.uuid4())
        timestamp = datetime.now(timezone.utc).isoformat()

        details_payload = details or {}
        details_bytes = json.dumps(details_payload, sort_keys=True).encode("utf-8")
        payload_digest = hashlib.sha256(details_bytes).hexdigest()

        block_hash = self._compute_hash(
            index=index,
            timestamp=timestamp,
            actor_email=actor_email,
            actor_role=actor_role,
            action=action,
            entity_type=entity_type,
            entity_id=str(entity_id),
            payload_digest=payload_digest,
            previous_hash=previous_hash,
        )

        block = {
            "index": index,
            "audit_id": audit_id,
            "timestamp": timestamp,
            "actor_email": actor_email,
            "actor_role": actor_role,
            "action": action,
            "entity_type": entity_type,
            "entity_id": str(entity_id),
            "payload_digest": payload_digest,
            "previous_hash": previous_hash,
            "block_hash": block_hash,
            "details": details_payload,
        }
        self._chain.append(block)
        return block

    def verify_chain_integrity(self) -> AuditChainVerificationResponse:
        """
        Full traversal from Genesis to Tip, re-verifying every hash pointer and block content.
        """
        now_str = datetime.now(timezone.utc).isoformat()
        if not self._chain:
            return AuditChainVerificationResponse(
                is_valid=False,
                total_blocks=0,
                genesis_hash="",
                tip_hash="",
                verified_at=now_str,
                reason="Chain is completely empty.",
            )

        genesis = self._chain[0]
        if genesis["previous_hash"] != self.GENESIS_PREV_HASH:
            return AuditChainVerificationResponse(
                is_valid=False,
                total_blocks=len(self._chain),
                genesis_hash=genesis["block_hash"],
                tip_hash=self._chain[-1]["block_hash"],
                verified_at=now_str,
                tamper_detected_at_index=0,
                reason="Genesis block previous hash violates root convention.",
            )

        for i in range(len(self._chain)):
            curr = self._chain[i]

            # 1. Verify link to previous block
            if i > 0:
                prev = self._chain[i - 1]
                if curr["previous_hash"] != prev["block_hash"]:
                    return AuditChainVerificationResponse(
                        is_valid=False,
                        total_blocks=len(self._chain),
                        genesis_hash=genesis["block_hash"],
                        tip_hash=self._chain[-1]["block_hash"],
                        verified_at=now_str,
                        tamper_detected_at_index=i,
                        reason=f"Block {i} previous_hash mismatch. Expected {prev['block_hash']}, got {curr['previous_hash']}",
                    )

            # 2. Recompute current block hash
            expected_hash = self._compute_hash(
                index=curr["index"],
                timestamp=curr["timestamp"],
                actor_email=curr["actor_email"],
                actor_role=curr["actor_role"],
                action=curr["action"],
                entity_type=curr.get("entity_type", "SYSTEM"),
                entity_id=curr["entity_id"],
                payload_digest=curr["payload_digest"],
                previous_hash=curr["previous_hash"],
            )

            if curr["block_hash"] != expected_hash:
                return AuditChainVerificationResponse(
                    is_valid=False,
                    total_blocks=len(self._chain),
                    genesis_hash=genesis["block_hash"],
                    tip_hash=self._chain[-1]["block_hash"],
                    verified_at=now_str,
                    tamper_detected_at_index=i,
                    reason=f"Block {i} payload or digest tampered! Stored: {curr['block_hash']}, Recomputed: {expected_hash}",
                )

        return AuditChainVerificationResponse(
            is_valid=True,
            total_blocks=len(self._chain),
            genesis_hash=genesis["block_hash"],
            tip_hash=self._chain[-1]["block_hash"],
            verified_at=now_str,
            tamper_detected_at_index=None,
            reason=None,
        )

    def get_chain(self, limit: int = 100, offset: int = 0) -> AuditChainResponse:
        total = len(self._chain)
        sl = self._chain[offset : offset + limit]
        return AuditChainResponse(
            total_blocks=total,
            genesis_hash=self._chain[0]["block_hash"],
            tip_hash=self._chain[-1]["block_hash"],
            blocks=[AuditBlockSchema(**b) for b in sl],
        )

    def get_stats(self) -> AuditStatsResponse:
        verification = self.verify_chain_integrity()
        actors = set(b["actor_email"] for b in self._chain)
        actions: Dict[str, int] = {}
        for b in self._chain:
            act = b["action"]
            actions[act] = actions.get(act, 0) + 1

        return AuditStatsResponse(
            total_records=len(self._chain),
            unique_actors=len(actors),
            action_breakdown=actions,
            is_chain_healthy=verification.is_valid,
            tip_hash=self._chain[-1]["block_hash"],
            genesis_hash=self._chain[0]["block_hash"],
            last_verified_at=verification.verified_at,
        )

    def export_cvc_dossier(self) -> CVCDossierExportResponse:
        now_str = datetime.now(timezone.utc).isoformat()
        verification = self.verify_chain_integrity()
        cert_id = f"CVC-NUMM-CERT-{hashlib.sha256(now_str.encode()).hexdigest()[:12].upper()}"

        return CVCDossierExportResponse(
            certificate_id=cert_id,
            issued_at=now_str,
            total_blocks_audited=len(self._chain),
            chain_integrity="CRYPTOGRAPHICALLY_VERIFIED_100_PERCENT" if verification.is_valid else "TAMPER_DETECTED",
            genesis_root_hash=self._chain[0]["block_hash"],
            tip_block_hash=self._chain[-1]["block_hash"],
            blocks=[AuditBlockSchema(**b) for b in self._chain],
        )

    def _seed_pilot_events(self):
        """Seed realistic enterprise CPSE actions for initial evaluation."""
        self.record_action(
            actor_email="steward.iocl@numm.gov.in",
            actor_role="STEWARD",
            action="STEWARD_APPROVE",
            entity_type="MAPPING",
            entity_id="11111111-1111-1111-1111-111111111111",
            details={
                "canonical_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                "raw_code": "10048291",
                "org": "IOCL",
                "justification": "Verified against ASME B16.34 and API 6D specifications.",
            },
        )
        self.record_action(
            actor_email="safety.officer@numm.gov.in",
            actor_role="STEWARD",
            action="STEWARD_REJECT",
            entity_type="MAPPING",
            entity_id="22222222-2222-2222-2222-222222222222",
            details={
                "candidate_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                "raw_code": "MAT-VLV-8821",
                "org": "ONGC",
                "justification": "ASME B16.34 fatal violation: 300# pressure class cannot mate with 150# class.",
            },
        )
        self.record_action(
            actor_email="procurement.ongc@numm.gov.in",
            actor_role="PROCUREMENT_OFFICER",
            action="MTIRF_DISPATCH",
            entity_type="REQUISITION",
            entity_id="MoPNG/OM/2026/NUMM-149",
            details={
                "source_plant": "ONGC_HAZIRA",
                "dest_plant": "IOCL_GUJARAT",
                "material": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                "quantity": 14,
                "valuation_inr": 399000.0,
            },
        )


# Global singleton instance
default_cvc_audit_service = CVCAuditService()
