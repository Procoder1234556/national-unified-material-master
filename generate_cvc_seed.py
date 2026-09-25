import hashlib
import json
import sqlite3
import uuid


def compute_hash(
    index, timestamp, actor_email, actor_role, action, entity_type, entity_id, payload_digest, previous_hash
):
    content = f"{index}:{timestamp}:{actor_email}:{actor_role}:{action}:{entity_type}:{entity_id}:{payload_digest}:{previous_hash}"
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def get_digest(details):
    return hashlib.sha256(json.dumps(details, sort_keys=True).encode("utf-8")).hexdigest()


blocks_spec = [
    {
        "index": 0,
        "audit_id": "00000000-0000-0000-0000-000000000000",
        "timestamp": "2026-01-01T00:00:00Z",
        "actor_email": "system.genesis@numm.gov.in",
        "actor_role": "SYSTEM",
        "action": "GENESIS_BLOCK",
        "entity_type": "SYSTEM",
        "entity_id": "ROOT_MoPNG_SIH26099",
        "details": {
            "framework": "National Unified Material Master (NUMM)",
            "standard": "One Nation, One Material Code (ONMC) Specification v2.2.0",
            "mandate": "Ministry of Petroleum & Natural Gas (MoPNG) SIH-26099",
            "governance": "CVC Circular No. 01/01/2021 & GFR Rule 149",
            "cloud_deployment": "NIC National Cloud (MeghRaj) Air-Gapped PSU Enclave",
        },
    },
    {
        "index": 1,
        "audit_id": "10048291-a1b2-4c3d-8e9f-000000000001",
        "timestamp": "2026-01-15T09:14:22Z",
        "actor_email": "rameshwar.sharma@iocl.co.in",
        "actor_role": "STEWARD",
        "action": "STEWARD_APPROVE",
        "entity_type": "MAPPING",
        "entity_id": "IOC-100482",
        "details": {
            "source_code": "IOC-100482",
            "raw_description": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D',
            "cpse": "IOCL",
            "plant_location": "Mathura Refinery, UP",
            "canonical_onmc": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
            "shell_mesc": "74.16.01.015.1",
            "unspsc": "40141607",
            "gem_category": "GeM-CAT-VLV-BALL-01",
            "safety_verification": "ASME B16.34 & API 6D 100% compliant",
            "justification": "Verified full metallurgy ASTM A105 and Class 150 pressure rating.",
        },
    },
    {
        "index": 2,
        "audit_id": "20048292-b2c3-4d4e-9f0a-000000000002",
        "timestamp": "2026-01-15T11:42:08Z",
        "actor_email": "rameshwar.sharma@iocl.co.in",
        "actor_role": "STEWARD",
        "action": "STEWARD_APPROVE",
        "entity_type": "CLUSTER",
        "entity_id": "CLUST-BALL-VALVE-002-150",
        "details": {
            "canonical_onmc": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
            "harmonized_items": [
                {
                    "cpse": "ONGC",
                    "source_code": "ONG-992144",
                    "raw": "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
                    "plant": "Hazira Processing Plant, GJ",
                },
                {
                    "cpse": "BPCL",
                    "source_code": "BPC-402910",
                    "raw": "2IN 150LB BALL VALVE FLANGED WCB/A105 TRIM 316",
                    "plant": "Mumbai Refinery, MH",
                },
                {
                    "cpse": "HPCL",
                    "source_code": "HPC-773102",
                    "raw": "VALVE BALL FLG 2INCH 150# CS ASTM A-105",
                    "plant": "Visakhapatnam Refinery, AP",
                },
                {
                    "cpse": "GAIL",
                    "source_code": "GAL-110294",
                    "raw": "BALL VLV, 2 IN, ASME 150, FLANGED, CS BODY",
                    "plant": "Vijaipur Compressor Station, MP",
                },
                {
                    "cpse": "OIL",
                    "source_code": "OIL-550192",
                    "raw": '2" NB BALL VALVE 150 CLASS FLANGED CS A105',
                    "plant": "Duliajan Field HQ, AS",
                },
            ],
            "confidence_score": 98.4,
            "metric_conversion": "50MM NB standardized to 2.00 INCH NPS",
            "sap_cycle_reduction": "Reduced SAP MM01 lead time from 14 days to 6.2 minutes",
        },
    },
    {
        "index": 3,
        "audit_id": "30048293-c3d4-4e5f-0a1b-000000000003",
        "timestamp": "2026-01-18T14:28:40Z",
        "actor_email": "safety.gate@numm.gov.in",
        "actor_role": "STEWARD",
        "action": "SAFETY_GATE_TRIGGERED",
        "entity_type": "MAPPING_REJECTED",
        "entity_id": "IOC-200911",
        "details": {
            "source_code": "IOC-200911",
            "raw_description": 'VALVE, GATE, 4", CL300, FLG RF, ASTM A216 WCB',
            "cpse": "IOCL",
            "plant_location": "Panipat Refinery, HR",
            "candidate_target": "ONMC-MECH-VLV-GAT-004-150-A216-11B2",
            "conflict_type": "Inviolable Safety Gate E-01: Pressure Class Incompatibility",
            "violation_details": "Raw description specifies Class 300 (PN50) whereas candidate target is Class 150 (PN20). Hydrostatic threshold violation.",
            "enforcement_standard": "ASME B16.34 Section 2.1 Pressure-Temperature Ratings",
            "resolution": "Automated cluster merge prohibited. Item quarantined for dedicated Class 300 ONMC minting.",
        },
    },
    {
        "index": 4,
        "audit_id": "40048294-d4e5-4f6a-1b2c-000000000004",
        "timestamp": "2026-01-18T16:05:12Z",
        "actor_email": "rameshwar.sharma@iocl.co.in",
        "actor_role": "STEWARD",
        "action": "ONMC_MINT",
        "entity_type": "UNIFIED_MASTER_CODE",
        "entity_id": "ONMC-MECH-VLV-GAT-004-300-A216-7A3C",
        "details": {
            "minted_onmc": "ONMC-MECH-VLV-GAT-004-300-A216-7A3C",
            "canonical_description": "VALVE GATE FLANGED 4 INCH 300# CS ASTM A216 WCB ASME B16.34",
            "item_class": "GATE_VALVE",
            "size_inch": 4.0,
            "pressure_class": 300,
            "metallurgy": "ASTM A216 WCB",
            "shell_mesc": "74.20.02.040.1",
            "unspsc": "40141611",
            "participating_records": ["IOC-200911", "ONG-881023", "BPC-501239", "HPC-881920"],
        },
    },
    {
        "index": 5,
        "audit_id": "50048295-e5f6-4a7b-2c3d-000000000005",
        "timestamp": "2026-02-01T10:15:33Z",
        "actor_email": "harpreet.singh@ongc.co.in",
        "actor_role": "PLANT_ENGINEER",
        "action": "MTIRF_DISPATCH",
        "entity_type": "TRANSFER_REQUISITION",
        "entity_id": "MoPNG/OM/2026/NUMM-149",
        "details": {
            "requisition_number": "MoPNG/OM/2026/NUMM-149",
            "source_plant": "ONGC Hazira Processing Plant, GJ",
            "destination_plant": "IOCL Gujarat Refinery, Vadodara, GJ",
            "pipeline_distance_km": 78.4,
            "material_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
            "quantity_transferred": 14,
            "book_valuation_inr": 399000.0,
            "procurement_cost_avoided_inr": 420000.0,
            "delivery_lead_time_saved": "16 weeks lead time reduced to 24 hours dispatch",
            "sap_integration": "Outbound delivery VL01N created in ONGC SAP; Inbound PO ME21N created in IOCL SAP",
        },
    },
    {
        "index": 6,
        "audit_id": "60048296-f6a7-4b8c-3d4e-000000000006",
        "timestamp": "2026-02-10T15:30:19Z",
        "actor_email": "priya.venkatraman@eil.co.in",
        "actor_role": "PROCUREMENT_OFFICER",
        "action": "POOLED_TENDER_BATCH",
        "entity_type": "JOINT_TENDER",
        "entity_id": "MoPNG/CPD/2026/VALVE-POOL-01",
        "details": {
            "tender_ref": "MoPNG/CPD/2026/VALVE-POOL-01",
            "commodity": "2 INCH 150# FLANGED BALL VALVES CS A105 API 6D",
            "canonical_onmc": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
            "breakdown_by_cpse": {"IOCL_Mathura": 1200, "BPCL_Mumbai": 850, "HPCL_Vizag": 900},
            "total_pooled_units": 2950,
            "baseline_aggregate_value_inr": 84075000.0,
            "bulk_negotiated_discount_pct": 14.2,
            "net_procurement_savings_inr": 11400000.0,
            "regulatory_undertaking": "CVC Anti-Cartelization Undertaking compliant with GeM Rule 149 GFR 2017",
        },
    },
    {
        "index": 7,
        "audit_id": "70048297-a7b8-4c9d-4e5f-000000000007",
        "timestamp": "2026-02-25T11:00:00Z",
        "actor_email": "sk.gupta@cvc.gov.in",
        "actor_role": "AUDITOR",
        "action": "CVC_VIGILANCE_INSPECTION",
        "entity_type": "AUDIT_DOSSIER",
        "entity_id": "CVC-NUMM-CERT-2026-02-25",
        "details": {
            "statutory_standard": "Central Vigilance Commission Circular No. 01/01/2021 & GFR 2017 Rule 149",
            "total_blocks_verified": 4829,
            "verification_algorithm": "FIPS 180-4 SHA-256 Sequential Hash Pointer Traversal",
            "tamper_evidence_status": "100% INTACT - ZERO COLLISION - ZERO UNAUTHORIZED MUTATION",
            "price_divergence_scrutiny": "Zero supplier price cartelization across 10 CPSEs; all inter-CPSE valuations transparent",
            "sign_off": "Approved for sovereign air-gapped production operation across all CPSEs.",
        },
    },
]

prev_hash = "0" * 64
for b in blocks_spec:
    b["previous_hash"] = prev_hash
    p_digest = get_digest(b["details"])
    b["payload_digest"] = p_digest
    b_hash = compute_hash(
        b["index"],
        b["timestamp"],
        b["actor_email"],
        b["actor_role"],
        b["action"],
        b["entity_type"],
        b["entity_id"],
        p_digest,
        prev_hash,
    )
    b["block_hash"] = b_hash
    prev_hash = b_hash

print("Successfully calculated 8 sequential blocks.")
print(f"Genesis: {blocks_spec[0]['block_hash']}")
print(f"Tip:     {blocks_spec[-1]['block_hash']}")

# Save JSON file for frontend and backend consumption
with open("seed_blocks.json", "w", encoding="utf-8") as f:
    json.dump(blocks_spec, f, indent=2)
print("Saved seed_blocks.json")

# Populate SQLite numm_dev.db table audit_logs
conn = sqlite3.connect("numm_dev.db")
c = conn.cursor()
c.execute("DELETE FROM audit_logs")

for b in blocks_spec:
    uid_hex = uuid.UUID(b["audit_id"]).hex
    new_state = {
        "index": b["index"],
        "timestamp": b["timestamp"],
        "actor_email": b["actor_email"],
        "actor_role": b["actor_role"],
        "entity_id": b["entity_id"],
        "payload_digest": b["payload_digest"],
        "previous_hash": b["previous_hash"],
        "details": b["details"],
    }
    try:
        ent_hex = uuid.UUID(b["entity_id"]).hex
    except Exception:
        ent_hex = uuid.uuid5(uuid.NAMESPACE_DNS, b["entity_id"]).hex

    c.execute(
        """
        INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, prior_state, new_state, sha256_hash, created_at)
        VALUES (?, NULL, ?, ?, ?, NULL, ?, ?, ?)
    """,
        (uid_hex, b["action"], b["entity_type"], ent_hex, json.dumps(new_state), b["block_hash"], b["timestamp"]),
    )

conn.commit()
c.execute("SELECT count(*) FROM audit_logs")
print("Total records inserted into numm_dev.db audit_logs:", c.fetchone()[0])
conn.close()
