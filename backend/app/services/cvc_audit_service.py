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


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from backend.app.models.models import AuditLog

class CVCAuditService:
    """
    Cryptographic Append-Only Audit Ledger.
    Complies with Central Vigilance Commission (CVC) digital provenance requirements
    and Comptroller & Auditor General (CAG) compliance standards.
    """

    GENESIS_PREV_HASH = "0" * 64
    GENESIS_ROOT_DIGEST = hashlib.sha256(b"CVC-ROOT-MoPNG-2026-NUMM-GENESIS").hexdigest()

    def __init__(self):
        pass

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

    async def record_action(
        self,
        session: AsyncSession,
        actor_email: str,
        actor_role: str,
        action: str,
        entity_type: str,
        entity_id: str,
        details: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Appends a new immutable block to the cryptographic chain in the DB.
        """
        # Fetch the tip of the chain
        stmt = select(AuditLog).order_by(desc(AuditLog.created_at)).limit(1)
        result = await session.execute(stmt)
        last_log = result.scalars().first()

        if not last_log:
            previous_hash = self.GENESIS_PREV_HASH
            index = 0
        else:
            previous_hash = last_log.sha256_hash
            index = last_log.new_state.get("index", 0) + 1 if last_log.new_state else 1

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

        new_state = {
            "index": index,
            "timestamp": timestamp,
            "actor_email": actor_email,
            "actor_role": actor_role,
            "payload_digest": payload_digest,
            "previous_hash": previous_hash,
            "details": details_payload,
        }

        audit_log = AuditLog(
            id=uuid.UUID(audit_id),
            action=action,
            entity_type=entity_type,
            entity_id=uuid.UUID(entity_id) if entity_id else uuid.uuid4(), # Handle strings gracefully if possible, or assume valid UUID.
            prior_state=None,
            new_state=new_state,
            sha256_hash=block_hash,
        )
        session.add(audit_log)
        await session.flush()

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
        return block

    async def verify_chain_integrity(self, session: AsyncSession) -> AuditChainVerificationResponse:
        """
        Full traversal from Genesis to Tip, re-verifying every hash pointer and block content.
        """
        now_str = datetime.now(timezone.utc).isoformat()
        stmt = select(AuditLog).order_by(AuditLog.created_at)
        result = await session.execute(stmt)
        chain = result.scalars().all()

        if not chain:
            return AuditChainVerificationResponse(
                is_valid=False,
                total_blocks=0,
                genesis_hash="",
                tip_hash="",
                verified_at=now_str,
                reason="Chain is completely empty.",
            )

        genesis = chain[0]
        if genesis.new_state and genesis.new_state.get("previous_hash") != self.GENESIS_PREV_HASH:
            return AuditChainVerificationResponse(
                is_valid=False,
                total_blocks=len(chain),
                genesis_hash=genesis.sha256_hash,
                tip_hash=chain[-1].sha256_hash,
                verified_at=now_str,
                tamper_detected_at_index=0,
                reason="Genesis block previous hash violates root convention.",
            )

        for i in range(len(chain)):
            curr = chain[i]
            curr_state = curr.new_state or {}

            if i > 0:
                prev = chain[i - 1]
                if curr_state.get("previous_hash") != prev.sha256_hash:
                    return AuditChainVerificationResponse(
                        is_valid=False,
                        total_blocks=len(chain),
                        genesis_hash=genesis.sha256_hash,
                        tip_hash=chain[-1].sha256_hash,
                        verified_at=now_str,
                        tamper_detected_at_index=i,
                        reason=f"Block {i} previous_hash mismatch. Expected {prev.sha256_hash}, got {curr_state.get('previous_hash')}",
                    )

            expected_hash = self._compute_hash(
                index=curr_state.get("index", 0),
                timestamp=curr_state.get("timestamp", ""),
                actor_email=curr_state.get("actor_email", ""),
                actor_role=curr_state.get("actor_role", ""),
                action=curr.action,
                entity_type=curr.entity_type,
                entity_id=str(curr.entity_id),
                payload_digest=curr_state.get("payload_digest", ""),
                previous_hash=curr_state.get("previous_hash", ""),
            )

            if curr.sha256_hash != expected_hash:
                return AuditChainVerificationResponse(
                    is_valid=False,
                    total_blocks=len(chain),
                    genesis_hash=genesis.sha256_hash,
                    tip_hash=chain[-1].sha256_hash,
                    verified_at=now_str,
                    tamper_detected_at_index=i,
                    reason=f"Block {i} payload or digest tampered! Stored: {curr.sha256_hash}, Recomputed: {expected_hash}",
                )

        return AuditChainVerificationResponse(
            is_valid=True,
            total_blocks=len(chain),
            genesis_hash=genesis.sha256_hash,
            tip_hash=chain[-1].sha256_hash,
            verified_at=now_str,
            tamper_detected_at_index=None,
            reason=None,
        )

    async def get_chain(self, session: AsyncSession, limit: int = 100, offset: int = 0) -> AuditChainResponse:
        stmt = select(AuditLog).order_by(AuditLog.created_at).offset(offset).limit(limit)
        result = await session.execute(stmt)
        chain = result.scalars().all()

        total_stmt = select(AuditLog.id)
        total_result = await session.execute(total_stmt)
        total = len(total_result.scalars().all())
        
        genesis_stmt = select(AuditLog).order_by(AuditLog.created_at).limit(1)
        genesis = (await session.execute(genesis_stmt)).scalars().first()
        
        tip_stmt = select(AuditLog).order_by(desc(AuditLog.created_at)).limit(1)
        tip = (await session.execute(tip_stmt)).scalars().first()

        blocks = []
        for l in chain:
            st = l.new_state or {}
            blocks.append(AuditBlockSchema(
                index=st.get("index", 0),
                audit_id=str(l.id),
                timestamp=st.get("timestamp", ""),
                actor_email=st.get("actor_email", ""),
                actor_role=st.get("actor_role", ""),
                action=l.action,
                entity_type=l.entity_type,
                entity_id=str(l.entity_id),
                payload_digest=st.get("payload_digest", ""),
                previous_hash=st.get("previous_hash", ""),
                block_hash=l.sha256_hash,
                details=st.get("details", {})
            ))

        return AuditChainResponse(
            total_blocks=total,
            genesis_hash=genesis.sha256_hash if genesis else "",
            tip_hash=tip.sha256_hash if tip else "",
            blocks=blocks,
        )

    async def get_stats(self, session: AsyncSession) -> AuditStatsResponse:
        verification = await self.verify_chain_integrity(session)
        stmt = select(AuditLog)
        result = await session.execute(stmt)
        chain = result.scalars().all()

        actors = set(c.new_state.get("actor_email") for c in chain if c.new_state)
        actions: Dict[str, int] = {}
        for c in chain:
            act = c.action
            actions[act] = actions.get(act, 0) + 1
            
        genesis = chain[0] if chain else None
        tip = chain[-1] if chain else None

        return AuditStatsResponse(
            total_records=len(chain),
            unique_actors=len(actors),
            action_breakdown=actions,
            is_chain_healthy=verification.is_valid,
            tip_hash=tip.sha256_hash if tip else "",
            genesis_hash=genesis.sha256_hash if genesis else "",
            last_verified_at=verification.verified_at,
        )

    async def export_cvc_dossier(self, session: AsyncSession) -> CVCDossierExportResponse:
        now_str = datetime.now(timezone.utc).isoformat()
        verification = await self.verify_chain_integrity(session)
        cert_id = f"CVC-NUMM-CERT-{hashlib.sha256(now_str.encode()).hexdigest()[:12].upper()}"

        stmt = select(AuditLog).order_by(AuditLog.created_at)
        result = await session.execute(stmt)
        chain = result.scalars().all()
        
        genesis = chain[0] if chain else None
        tip = chain[-1] if chain else None

        blocks = []
        for l in chain:
            st = l.new_state or {}
            blocks.append(AuditBlockSchema(
                index=st.get("index", 0),
                audit_id=str(l.id),
                timestamp=st.get("timestamp", ""),
                actor_email=st.get("actor_email", ""),
                actor_role=st.get("actor_role", ""),
                action=l.action,
                entity_type=l.entity_type,
                entity_id=str(l.entity_id),
                payload_digest=st.get("payload_digest", ""),
                previous_hash=st.get("previous_hash", ""),
                block_hash=l.sha256_hash,
                details=st.get("details", {})
            ))

        return CVCDossierExportResponse(
            certificate_id=cert_id,
            issued_at=now_str,
            total_blocks_audited=len(chain),
            chain_integrity="CRYPTOGRAPHICALLY_VERIFIED_100_PERCENT" if verification.is_valid else "TAMPER_DETECTED",
            genesis_root_hash=genesis.sha256_hash if genesis else "",
            tip_block_hash=tip.sha256_hash if tip else "",
            blocks=blocks,
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
