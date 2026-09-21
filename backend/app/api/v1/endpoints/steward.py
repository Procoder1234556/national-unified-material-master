# ponytail: Human-in-the-loop stewardship triage queue and CVC-compliant cryptographic decision logging.
# Upgrade path: add multi-analyst consensus scoring and batch resolution.

import hashlib
import uuid
from datetime import datetime, timezone
from typing import Dict, List
from uuid import UUID

from fastapi import APIRouter, HTTPException

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

# Seed triage queue with realistic CPSE borderline records
_TRIAGE_ITEMS: Dict[UUID, TriageQueueItem] = {}
_AUDIT_LOG_STORE: Dict[UUID, Dict] = {}


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
        else:
            # Fatal safety conflicts on size or pressure
            if k in ("size_inch", "pressure_class"):
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


# Initialize realistic CPSE triage candidate pairs
_SEED_DATA = [
    {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "org": "IOCL",
        "plant": "Mathura Refinery, Uttar Pradesh",
        "code": "10048291",
        "raw_desc": "VLV BL FLGD 50MM NB 150# CS A105 LEVER OP",
        "canon_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        "canon_desc": "VALVE, BALL, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, TRIM 316, API 6D",
        "conf": 0.8850,
        "lex": 0.8400,
        "sem": 0.9100,
        "gate": True,
        "mesc": "74.16.01.015.1",
        "unspsc": "40141607",
        "gem": "GeM-CAT-VLV-BALL-01",
    },
    {
        "id": UUID("22222222-2222-2222-2222-222222222222"),
        "org": "ONGC",
        "plant": "Hazira Gas Complex, Gujarat",
        "code": "MAT-VLV-8821",
        "raw_desc": "BALL VALVE 2IN 300LB FLGD WCB BODY (PRESSURE RATING DISCREPANCY)",
        "canon_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        "canon_desc": "VALVE, BALL, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, TRIM 316, API 6D",
        "conf": 0.7200,
        "lex": 0.7100,
        "sem": 0.7300,
        "gate": False,
        "rejection_reasons": [
            "Pressure class mismatch: Raw is 300# but Canonical is 150# (ASME B16.34 fatal violation)"
        ],
        "mesc": "74.16.01.015.1",
        "unspsc": "40141607",
        "gem": "GeM-CAT-VLV-BALL-01",
    },
    {
        "id": UUID("33333333-3333-3333-3333-333333333333"),
        "org": "BPCL",
        "plant": "Mumbai Refinery, Maharashtra",
        "code": "FLG-WN-6-300",
        "raw_desc": 'FLG WN 6" 300LBS RF CS ASTM A-105 SCH40 ASME B16.5',
        "canon_code": "ONMC-PIPE-FLG-WNF-006-300-A105-4D1E",
        "canon_desc": "FLANGE, WELD NECK, 6 INCH, CLASS 300, RAISED FACE, SCHEDULE 40, ASTM A105, ASME B16.5",
        "conf": 0.9050,
        "lex": 0.8900,
        "sem": 0.9150,
        "gate": True,
        "mesc": "76.12.30.060.1",
        "unspsc": "40141708",
        "gem": "GeM-CAT-FLG-WNF-02",
    },
    {
        "id": UUID("44444444-4444-4444-4444-444444444444"),
        "org": "HPCL",
        "plant": "Visakh Refinery, Andhra Pradesh",
        "code": "GSK-SPW-3-150",
        "raw_desc": "GASKET SPW 3 IN 150# SS316L/GRAPHITE ASME B16.20",
        "canon_code": "ONMC-STAT-GSK-SPW-003-150-SS316-2F88",
        "canon_desc": "GASKET, SPIRAL WOUND, 3 INCH, CLASS 150, WINDING SS316, FILLER GRAPHITE, ASME B16.20",
        "conf": 0.8750,
        "lex": 0.8500,
        "sem": 0.8900,
        "gate": True,
        "mesc": "60.40.10.030.1",
        "unspsc": "31181502",
        "gem": "GeM-CAT-GSK-SPW-01",
    },
    {
        "id": UUID("55555555-5555-5555-5555-555555555555"),
        "org": "GAIL",
        "plant": "Vijaipur Petrochem, Madhya Pradesh",
        "code": "GAT-VLV-4-150",
        "raw_desc": "GATE VALVE 4INCH 150LB FLANGED RF CS BODY WCB API 600",
        "canon_code": "ONMC-MECH-VLV-GAT-004-150-A216-7A3C",
        "canon_desc": "VALVE, GATE, 4 INCH, CLASS 150, FLANGED RF, BODY ASTM A216 WCB, TRIM 13CR, API 600",
        "conf": 0.8920,
        "lex": 0.8700,
        "sem": 0.9050,
        "gate": True,
        "mesc": "74.12.02.040.1",
        "unspsc": "40141613",
        "gem": "GeM-CAT-VLV-GATE-01",
    },
]

for s in _SEED_DATA:
    diffs = _generate_attribute_diffs(s["raw_desc"], s["canon_desc"])
    item = TriageQueueItem(
        mapping_id=s["id"],
        raw_material_id=uuid.uuid4(),
        organization_code=s["org"],
        plant_location=s["plant"],
        source_item_code=s["code"],
        raw_description=s["raw_desc"],
        onmc_candidate_code=s["canon_code"],
        canonical_description=s["canon_desc"],
        confidence_score=s["conf"],
        lexical_similarity=s["lex"],
        semantic_similarity=s["sem"],
        rule_gate_passed=s["gate"],
        rejection_reasons=s.get("rejection_reasons", []),
        shell_mesc_code=s.get("mesc"),
        unspsc_code=s.get("unspsc"),
        gem_category_id=s.get("gem"),
        attribute_diffs=diffs,
        mapping_status="PENDING_REVIEW",
    )
    _TRIAGE_ITEMS[s["id"]] = item


@router.get("/queue", response_model=TriageQueueResponse, summary="Get HITL steward triage queue")
async def get_steward_queue():
    """
    Returns pending borderline candidate pairs requiring data steward inspection.
    Includes side-by-side attribute diffs and ASME/API safety flags.
    """
    pending = [item for item in _TRIAGE_ITEMS.values() if item.mapping_status == "PENDING_REVIEW"]
    return TriageQueueResponse(
        total_pending=len(pending),
        items=pending,
    )


@router.post(
    "/decision", response_model=StewardDecisionResponse, summary="Record data steward decision with audit hash"
)
async def record_steward_decision(req: StewardDecisionRequest):
    """
    Records data steward approval, rejection, override, or novel code minting.
    Produces an immutable SHA-256 cryptographic hash compliant with CVC and CAG audit norms.
    """
    if req.mapping_id not in _TRIAGE_ITEMS:
        # Fallback for dynamic/newly uploaded mappings
        target_item = None
    else:
        target_item = _TRIAGE_ITEMS[req.mapping_id]

    timestamp = datetime.now(timezone.utc)
    audit_id = uuid.uuid4()
    onmc_code = target_item.onmc_candidate_code if target_item else "ONMC-SOV-NEW-0000"

    # Compute tamper-evident audit hash
    hash_payload = f"{req.actor_email}:{req.decision}:{req.mapping_id}:{req.justification}:{timestamp.isoformat()}"
    sha256_hash = hashlib.sha256(hash_payload.encode("utf-8")).hexdigest()

    if req.decision == "APPROVE":
        new_status = "MANUALLY_APPROVED"
        msg = f"Candidate ONMC code {onmc_code} verified and approved into master cluster."
    elif req.decision == "REJECT":
        new_status = "REJECTED"
        msg = "Candidate match rejected. Item quarantined from cluster."
    elif req.decision == "MINT":
        new_status = "MINTED_NOVEL"
        raw_desc = target_item.raw_description if target_item else "CUSTOM ITEM"
        attrs = default_extractor.extract(raw_desc)
        base = default_onmc_minter.mint_base_code(attrs)
        v_hash = default_onmc_minter.compute_verification_hash(base)
        onmc_code = f"{base}-{v_hash}"
        msg = f"Novel sovereign ONMC code {onmc_code} minted for unmapped physical item."
    elif req.decision == "OVERRIDE":
        new_status = "OVERRIDDEN"
        msg = "Item attributes overridden by data steward with technical justification."
    else:
        raise HTTPException(status_code=400, detail="Invalid steward decision.")

    if target_item:
        target_item.mapping_status = new_status

    # Record into append-only cryptographic audit chain
    audit_block = default_cvc_audit_service.record_action(
        actor_email=req.actor_email,
        actor_role="STEWARD",
        action=f"STEWARD_{req.decision}",
        entity_type="MAPPING",
        entity_id=str(req.mapping_id),
        details={
            "decision": req.decision,
            "onmc_code": onmc_code,
            "justification": req.justification,
            "mapping_id": str(req.mapping_id),
            "new_status": new_status,
        },
    )
    audit_id = uuid.UUID(audit_block["audit_id"])
    sha256_hash = audit_block["block_hash"]

    # Record into legacy in-memory store
    _AUDIT_LOG_STORE[audit_id] = {
        "id": audit_id,
        "actor": req.actor_email,
        "decision": req.decision,
        "mapping_id": req.mapping_id,
        "justification": req.justification,
        "sha256_hash": sha256_hash,
        "timestamp": timestamp,
    }

    return StewardDecisionResponse(
        mapping_id=req.mapping_id,
        status=new_status,
        onmc_code=onmc_code,
        audit_log_id=audit_id,
        sha256_hash=sha256_hash,
        action_recorded=f"STEWARD_{req.decision}",
        timestamp=timestamp,
        message=msg,
    )
