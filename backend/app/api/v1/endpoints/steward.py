# ponytail: HITL stewardship triage from material_mappings + CVC decision audit.
# Upgrade path: multi-analyst consensus scoring and batch resolution.

from datetime import datetime, timezone
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from backend.app.core.security import require_steward
from backend.app.db.session import get_db
from backend.app.models.models import MaterialMapping, RawMaterial, UnifiedMasterCode
from backend.app.schemas.auth import UserSession
from backend.app.schemas.steward import (
    AttributeDiffItem,
    StewardDecisionRequest,
    StewardDecisionResponse,
    TriageQueueItem,
    TriageQueueResponse,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.cvc_audit_service import default_cvc_audit_service
from backend.app.services.onmc_minter import default_onmc_minter

router = APIRouter()


def _generate_attribute_diffs(raw_desc: str, canon_desc: str) -> List[AttributeDiffItem]:
    raw_attrs = default_extractor.extract(raw_desc)
    canon_attrs = default_extractor.extract(canon_desc)

    diffs = []
    keys = [
        ("Item Class", "item_class"),
        ("Nominal Diameter", "size_inch"),
        ("Pressure Class", "pressure_class"),
        ("Metallurgy / Material", "metallurgy"),
        ("End Connection", "end_connection"),
    ]

    for label, k in keys:
        raw_val = raw_attrs.get(k)
        canon_val = canon_attrs.get(k)
        r_str = str(raw_val) if raw_val is not None else None
        c_str = str(canon_val) if canon_val is not None else None

        if raw_val is None and canon_val is None:
            continue
        elif raw_val is None or canon_val is None:
            status = "MISSING"
        elif str(raw_val).lower() == str(canon_val).lower():
            status = "MATCH"
        elif k in ("size_inch", "pressure_class"):
            status = "CONFLICT"
        else:
            status = "TOLERANCE"

        diffs.append(
            AttributeDiffItem(
                attribute_name=label,
                raw_value=r_str,
                canonical_value=c_str,
                status=status,
            )
        )

    return diffs


def _rejection_reasons(mapping: MaterialMapping, diffs: List[AttributeDiffItem]) -> List[str]:
    if mapping.rule_gate_passed:
        return []
    conflicts = [d for d in diffs if d.status == "CONFLICT"]
    if conflicts:
        return [
            f"Safety gate blocked: {d.attribute_name} raw={d.raw_value} vs canonical={d.canonical_value}"
            for d in conflicts
        ]
    return ["Deterministic safety gate failed — physical attribute incompatibility."]


@router.get("/queue", response_model=TriageQueueResponse, summary="Get HITL steward triage queue")
async def get_steward_queue(
    session: AsyncSession = Depends(get_db),
    _user: UserSession = Depends(require_steward),
):
    """
    Returns pending borderline candidate pairs requiring data steward inspection.
    Sourced from material_mappings where mapping_status='PENDING_REVIEW'.
    """
    stmt = (
        select(MaterialMapping)
        .options(
            joinedload(MaterialMapping.raw_material).joinedload(RawMaterial.organization),
            joinedload(MaterialMapping.unified_master),
        )
        .where(MaterialMapping.mapping_status == "PENDING_REVIEW")
        .order_by(MaterialMapping.confidence_score.asc())
    )
    result = await session.execute(stmt)
    mappings = result.scalars().unique().all()

    pending: List[TriageQueueItem] = []
    for m in mappings:
        raw = m.raw_material
        master = m.unified_master
        raw_desc = raw.raw_description if raw else ""
        canon_desc = master.canonical_description if master else ""
        diffs = _generate_attribute_diffs(raw_desc, canon_desc) if raw_desc and canon_desc else []

        pending.append(
            TriageQueueItem(
                mapping_id=m.id,
                raw_material_id=m.raw_material_id,
                organization_code=raw.organization.code if raw and raw.organization else "UNKNOWN",
                plant_location=raw.plant_location if raw else "",
                source_item_code=raw.source_item_code if raw else "",
                raw_description=raw_desc,
                onmc_candidate_code=master.onmc_code if master else "",
                canonical_description=canon_desc,
                confidence_score=float(m.confidence_score),
                lexical_similarity=float(m.lexical_similarity),
                semantic_similarity=float(m.semantic_similarity),
                rule_gate_passed=bool(m.rule_gate_passed),
                rejection_reasons=_rejection_reasons(m, diffs),
                shell_mesc_code=master.shell_mesc_code if master else None,
                unspsc_code=master.unspsc_code if master else None,
                gem_category_id=master.gem_category_id if master else None,
                attribute_diffs=diffs,
                mapping_status=m.mapping_status,
            )
        )

    return TriageQueueResponse(total_pending=len(pending), items=pending)


@router.post(
    "/decision",
    response_model=StewardDecisionResponse,
    summary="Record data steward decision with audit hash",
)
async def record_steward_decision(
    req: StewardDecisionRequest,
    session: AsyncSession = Depends(get_db),
    user: UserSession = Depends(require_steward),
):
    """
    Records steward APPROVE / REJECT / OVERRIDE / MINT.
    Updates material_mappings and appends CVC SHA-256 audit block.
    """
    stmt = (
        select(MaterialMapping)
        .options(
            joinedload(MaterialMapping.raw_material),
            joinedload(MaterialMapping.unified_master),
        )
        .where(MaterialMapping.id == req.mapping_id)
    )
    result = await session.execute(stmt)
    target_mapping = result.scalars().unique().first()

    if not target_mapping:
        raise HTTPException(status_code=404, detail=f"Mapping '{req.mapping_id}' not found.")

    if target_mapping.mapping_status != "PENDING_REVIEW":
        raise HTTPException(
            status_code=409,
            detail=f"Mapping already resolved with status '{target_mapping.mapping_status}'.",
        )

    timestamp = datetime.now(timezone.utc)
    actor_email = req.actor_email or user.email
    onmc_code = target_mapping.unified_master.onmc_code if target_mapping.unified_master else ""

    if req.decision == "APPROVE":
        if not target_mapping.rule_gate_passed:
            raise HTTPException(
                status_code=400,
                detail="Cannot APPROVE when safety gate failed. Use REJECT or MINT instead.",
            )
        new_status = "MANUALLY_APPROVED"
        msg = f"Candidate ONMC code {onmc_code} verified and approved into master cluster."
    elif req.decision == "REJECT":
        new_status = "REJECTED"
        msg = "Candidate match rejected. Item quarantined from cluster."
    elif req.decision == "MINT":
        raw_desc = target_mapping.raw_material.raw_description if target_mapping.raw_material else "CUSTOM ITEM"
        attrs = default_extractor.extract(raw_desc)
        base = default_onmc_minter.mint_base_code(attrs)
        v_hash = default_onmc_minter.compute_verification_hash(base)
        onmc_code = f"{base}-{v_hash}"

        novel = UnifiedMasterCode(
            onmc_code=onmc_code,
            canonical_description=attrs.get("clean_text") or raw_desc,
            item_class=attrs.get("item_class") or "UNKNOWN",
            size_inch=attrs.get("size_inch"),
            pressure_class=attrs.get("pressure_class"),
            metallurgy=attrs.get("metallurgy"),
            end_connection=attrs.get("end_connection"),
        )
        session.add(novel)
        await session.flush()
        target_mapping.unified_master_id = novel.id
        new_status = "NOVEL_ITEM"
        msg = f"Novel sovereign ONMC code {onmc_code} minted for unmapped physical item."
    elif req.decision == "OVERRIDE":
        new_status = "MANUALLY_APPROVED"
        msg = "Item attributes overridden by data steward with technical justification."
    else:
        raise HTTPException(status_code=400, detail="Invalid steward decision.")

    target_mapping.mapping_status = new_status
    await session.flush()

    audit_block = await default_cvc_audit_service.record_action(
        session=session,
        actor_email=actor_email,
        actor_role=user.role,
        action=f"STEWARD_{req.decision}",
        entity_type="MATERIAL_MAPPING",
        entity_id=str(req.mapping_id),
        details={
            "decision": req.decision,
            "onmc_code": onmc_code,
            "justification": req.justification,
            "mapping_id": str(req.mapping_id),
            "new_status": new_status,
            "override_attributes": req.override_attributes,
        },
    )
    await session.commit()

    return StewardDecisionResponse(
        mapping_id=req.mapping_id,
        status=new_status,
        onmc_code=onmc_code,
        audit_log_id=UUID(audit_block["audit_id"]),
        sha256_hash=audit_block["block_hash"],
        action_recorded=f"STEWARD_{req.decision}",
        timestamp=timestamp,
        message=msg,
    )
