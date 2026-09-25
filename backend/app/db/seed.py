import asyncio
import uuid

from sqlalchemy import select

from backend.app.api.v1.endpoints.ingest import _process_items_async
from backend.app.core.config import settings
from backend.app.db.session import AsyncSessionLocal, engine
from backend.app.models.models import Base, UnifiedMasterCode
from backend.app.schemas.ingest import RawMaterialIn

POC_DATA = [
    {
        "id": "01",
        "cpse": "IOCL",
        "source_code": "IOC-100482",
        "desc": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D',
        "price": 28500,
        "loc": "Mathura Refinery, UP",
    },
    {
        "id": "02",
        "cpse": "ONGC",
        "source_code": "ONG-992144",
        "desc": "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
        "price": 29200,
        "loc": "Hazira Processing Plant, GJ",
    },
    {
        "id": "03",
        "cpse": "BPCL",
        "source_code": "BPC-402910",
        "desc": "2IN 150LB BALL VALVE FLANGED WCB/A105 TRIM 316",
        "price": 27800,
        "loc": "Mumbai Refinery, MH",
    },
    {
        "id": "04",
        "cpse": "HPCL",
        "source_code": "HPC-773102",
        "desc": "VALVE BALL FLG 2INCH 150# CS ASTM A-105",
        "price": 28100,
        "loc": "Visakhapatnam Refinery, AP",
    },
    {
        "id": "05",
        "cpse": "GAIL",
        "source_code": "GAL-110294",
        "desc": "BALL VLV, 2 IN, ASME 150, FLANGED, CS BODY",
        "price": 28900,
        "loc": "Vijaipur Compressor Station, MP",
    },
    {
        "id": "06",
        "cpse": "OIL",
        "source_code": "OIL-550192",
        "desc": '2" NB BALL VALVE 150 CLASS FLANGED CS A105',
        "price": 29000,
        "loc": "Dulia Field HQ, AS",
    },
    {
        "id": "07",
        "cpse": "IOCL",
        "source_code": "IOC-200911",
        "desc": 'VALVE, GATE, 4", CL300, FLG RF, ASTM A216 WCB',
        "price": 64000,
        "loc": "Panipat Refinery, HR",
    },
    {
        "id": "08",
        "cpse": "ONGC",
        "source_code": "ONG-881023",
        "desc": "VLV GT FLGD 100MM NB 300# WCB OS&Y API 600",
        "price": 66500,
        "loc": "Uran Extraction Plant, MH",
    },
    {
        "id": "09",
        "cpse": "BPCL",
        "source_code": "BPC-501239",
        "desc": "4IN 300LB GATE VALVE FLANGED CAST CS A216",
        "price": 63200,
        "loc": "Kochi Refinery, KL",
    },
    {
        "id": "10",
        "cpse": "HPCL",
        "source_code": "HPC-881920",
        "desc": "GATE VLV 4 INCH 300# CS BODY ASTM A216 WCB",
        "price": 65000,
        "loc": "Mumbai Refinery, MH",
    },
    {
        "id": "11",
        "cpse": "IOCL",
        "source_code": "IOC-300481",
        "desc": 'VALVE, GLOBE, 3", CL150, FLG RF, WCB, BS 1873',
        "price": 48000,
        "loc": "Paradip Refinery, OD",
    },
    {
        "id": "12",
        "cpse": "BPCL",
        "source_code": "BPC-602911",
        "desc": "3IN 150LB GLOBE VALVE FLANGED BODY A216-WCB",
        "price": 47500,
        "loc": "Mumbai Refinery, MH",
    },
    {
        "id": "13",
        "cpse": "ONGC",
        "source_code": "ONG-771920",
        "desc": "VLV CHK FLGD 50MM 150# CS A105 DUAL PLATE",
        "price": 22000,
        "loc": "Hazira Processing Plant, GJ",
    },
    {
        "id": "14",
        "cpse": "GAIL",
        "source_code": "GAL-220194",
        "desc": "NON RETURN VALVE 2 INCH 150# FLANGED CS BODY",
        "price": 21800,
        "loc": "Pata Petrochemical Plant, UP",
    },
    {
        "id": "15",
        "cpse": "IOCL",
        "source_code": "IOC-400192",
        "desc": 'FLG, WNRF, 6", CL150, SCH 40, ASTM A105, ASME B16.5',
        "price": 8400,
        "loc": "Gujarat Refinery, Vadodara",
    },
    {
        "id": "16",
        "cpse": "ONGC",
        "source_code": "ONG-662910",
        "desc": "WELD NECK FLANGE 150MM NB 150# SCH40 CS A105",
        "price": 8600,
        "loc": "Ankleshwar Asset, GJ",
    },
    {
        "id": "17",
        "cpse": "BPCL",
        "source_code": "BPC-701920",
        "desc": "6IN 150LB WNRF FLANGE SCH 40 ASTM A-105",
        "price": 8200,
        "loc": "Mumbai Refinery, MH",
    },
    {
        "id": "18",
        "cpse": "HPCL",
        "source_code": "HPC-991204",
        "desc": 'FLANGE WN RF 6" 150 CLASS SCH 40 CS BODY',
        "price": 8500,
        "loc": "Visakhapatnam Refinery, AP",
    },
    {
        "id": "19",
        "cpse": "IOCL",
        "source_code": "IOC-500291",
        "desc": 'GASKET, SPWD, 2", CL150, SS316/GRAFOIL, ASME B16.20',
        "price": 1200,
        "loc": "Mathura Refinery, UP",
    },
    {
        "id": "20",
        "cpse": "ONGC",
        "source_code": "ONG-551029",
        "desc": "SPIRAL WOUND GASKET 50MM 150# 316SS WITH GRAPHITE",
        "price": 1250,
        "loc": "Hazira Processing Plant, GJ",
    },
    {
        "id": "21",
        "cpse": "BPCL",
        "source_code": "BPC-801293",
        "desc": "2IN 150# SPWD GASKET SS 316 / GRAPHITE FILLER",
        "price": 1180,
        "loc": "Kochi Refinery, KL",
    },
    {
        "id": "22",
        "cpse": "IOCL",
        "source_code": "IOC-600192",
        "desc": 'PIPE, SMLS, 4", SCH 40, ASTM A106 GR B, BE, API 5L',
        "price": 14500,
        "loc": "Panipat Refinery, HR",
    },
    {
        "id": "23",
        "cpse": "GAIL",
        "source_code": "GAL-330192",
        "desc": "4 INCH SCH 40 SEAMLESS LINE PIPE ASTM A106-B",
        "price": 14200,
        "loc": "Vijaipur Compressor Station, MP",
    },
    {
        "id": "24",
        "cpse": "NRL",
        "source_code": "NRL-110293",
        "desc": "LINE PIPE SMLS 100MM NB SCH40 CS ASTM A106 GR B",
        "price": 14800,
        "loc": "Numaligarh Refinery, AS",
    },
]

SEEDS = [
    {
        "desc": "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
        "code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        "cls": "BALL_VALVE",
        "size": 2.0,
        "p": 150,
        "met": "ASTM A105",
    },
    {
        "desc": "FLANGE WELD NECK 6 INCH 150# RF CS ASTM A105 ASME B16.5",
        "code": "ONMC-PIPE-FLG-WNF-006-150-A105-4D1E",
        "cls": "WELD_NECK_FLANGE",
        "size": 6.0,
        "p": 150,
        "met": "ASTM A105",
    },
    {
        "desc": "VALVE GATE FLANGED 4 INCH 300# CS ASTM A216 WCB ASME B16.34",
        "code": "ONMC-MECH-VLV-GAT-004-300-A216-7A3C",
        "cls": "GATE_VALVE",
        "size": 4.0,
        "p": 300,
        "met": "ASTM A216",
    },
    {
        "desc": "GASKET SPIRAL WOUND 2 INCH 150# SS316 GRAPHITE ASME B16.20",
        "code": "ONMC-STAT-GSK-SPW-002-150-SS316-2F88",
        "cls": "SPIRAL_WOUND_GASKET",
        "size": 2.0,
        "p": 150,
        "met": "SS316",
    },
    {
        "desc": "VALVE CHECK SWING 2 INCH 150# CS ASTM A105 API 6D",
        "code": "ONMC-MECH-VLV-CHK-002-150-A105-1C9A",
        "cls": "CHECK_VALVE",
        "size": 2.0,
        "p": 150,
        "met": "ASTM A105",
    },
    {
        "desc": "PIPE LINE SEAMLESS 4 INCH SCH 40 CS ASTM A106 GR B API 5L",
        "code": "ONMC-PIPE-PIP-SML-004-040-A106-5E2B",
        "cls": "LINE_PIPE",
        "size": 4.0,
        "p": None,
        "met": "ASTM A106",
    },
    {
        "desc": "VALVE GLOBE FLANGED 3 INCH 150# CS ASTM A216 WCB",
        "code": "ONMC-MECH-VLV-GLB-003-150-A216-8D2A",
        "cls": "GLOBE_VALVE",
        "size": 3.0,
        "p": 150,
        "met": "ASTM A216",
    },
]


async def seed_data():
    if not settings.USE_SQLITE:
        return

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        # Create UnifiedMasterCodes
        for s in SEEDS:
            umc = UnifiedMasterCode(
                onmc_code=s["code"],
                canonical_description=s["desc"],
                item_class=s["cls"],
                size_inch=s["size"],
                pressure_class=s["p"],
                metallurgy=s["met"],
                shell_mesc_code="74.16.01.015.1" if s["cls"] == "BALL VALVE" else None,
                unspsc_code="40141607" if s["cls"] == "BALL VALVE" else None,
            )
            session.add(umc)
        await session.commit()

        # Group by CPSE
        by_cpse = {}
        for d in POC_DATA:
            by_cpse.setdefault(d["cpse"], []).append(d)

        for cpse, items in by_cpse.items():
            in_items = [
                RawMaterialIn(
                    source_item_code=item["source_code"],
                    plant_code=item["loc"].split(",")[0].replace(" ", "_").upper(),
                    plant_location=item["loc"],
                    raw_description=item["desc"],
                    unit_price=item["price"],
                    currency="INR",
                    stock_quantity=14 if cpse == "ONGC" and "Hazira" in item["loc"] else (100 if cpse == "IOCL" else 5),
                )
                for item in items
            ]
            await _process_items_async(session, str(uuid.uuid4()), cpse, in_items)

        # Ensure steward queue has work: demote borderline AUTO_APPROVED + inject pressure-conflict
        from backend.app.models.models import CleansedMaterial, MaterialMapping, Organization, RawMaterial
        from backend.app.services.attribute_extractor import default_extractor
        from backend.app.services.hybrid_matcher import default_matcher

        conflict_org = (
            (await session.execute(select(Organization).where(Organization.code == "ONGC"))).scalars().first()
        )
        if not conflict_org:
            conflict_org = Organization(code="ONGC", name="Oil and Natural Gas Corporation", division="E&P")
            session.add(conflict_org)
            await session.flush()

        master_150 = (
            (
                await session.execute(
                    select(UnifiedMasterCode).where(
                        UnifiedMasterCode.onmc_code == "ONMC-MECH-VLV-BAL-002-150-A105-9B2F"
                    )
                )
            )
            .scalars()
            .first()
        )

        if master_150:
            conflict_raw = RawMaterial(
                organization_id=conflict_org.id,
                source_item_code="ONG-PRESS-300",
                plant_code="HAZIRA",
                plant_location="Hazira Processing Plant, GJ",
                raw_description="BALL VALVE 2IN 300LB FLGD WCB BODY (PRESSURE RATING DISCREPANCY)",
                unit_price=29500,
                currency="INR",
                stock_quantity=3,
                uom="EA",
                source_system="SAP_ECC",
            )
            session.add(conflict_raw)
            await session.flush()
            attrs = default_extractor.extract(conflict_raw.raw_description)
            clean = CleansedMaterial(
                raw_material_id=conflict_raw.id,
                cleaned_description=attrs.get("clean_text") or conflict_raw.raw_description,
                item_class=attrs.get("item_class") or "BALL_VALVE",
                size_inch=attrs.get("size_inch"),
                size_mm=attrs.get("size_mm"),
                pressure_class=attrs.get("pressure_class"),
                metallurgy=attrs.get("metallurgy"),
                end_connection=attrs.get("end_connection"),
                standards=attrs.get("standards") or [],
                parametric_attributes=attrs.get("parametric_attributes") or {},
            )
            session.add(clean)
            eval_res = default_matcher.evaluate_pair(conflict_raw.raw_description, master_150.canonical_description)
            session.add(
                MaterialMapping(
                    raw_material_id=conflict_raw.id,
                    unified_master_id=master_150.id,
                    confidence_score=eval_res.confidence_score,
                    lexical_similarity=eval_res.lexical_similarity,
                    semantic_similarity=eval_res.semantic_similarity,
                    rule_gate_passed=eval_res.gate_result.passed,
                    mapping_status="PENDING_REVIEW",
                )
            )

        pending_count = (
            (await session.execute(select(MaterialMapping).where(MaterialMapping.mapping_status == "PENDING_REVIEW")))
            .scalars()
            .all()
        )
        if len(pending_count) < 4:
            autos = (
                (
                    await session.execute(
                        select(MaterialMapping).where(MaterialMapping.mapping_status == "AUTO_APPROVED").limit(4)
                    )
                )
                .scalars()
                .all()
            )
            for m in autos:
                m.mapping_status = "PENDING_REVIEW"
        await session.commit()

        # Seed CVC Audit Chain Records directly specified in root MD files (POC.md, PRD.md, APP_FLOW.md, RUNBOOK.md)
        from backend.app.services.cvc_audit_service import default_cvc_audit_service

        # Block 0: Sovereign Genesis Root Seal (MoPNG SIH-26099 / GFR Rule 149)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="system.genesis@numm.gov.in",
            actor_role="SYSTEM",
            action="GENESIS_BLOCK",
            entity_type="SYSTEM",
            entity_id="ROOT_MoPNG_SIH26099",
            details={
                "framework": "National Unified Material Master (NUMM)",
                "standard": "One Nation, One Material Code (ONMC) Specification v2.2.0",
                "mandate": "Ministry of Petroleum & Natural Gas (MoPNG) SIH-26099",
                "governance": "CVC Circular No. 01/01/2021 & GFR Rule 149",
                "cloud_deployment": "NIC National Cloud (MeghRaj) Air-Gapped PSU Enclave",
                "participating_cpse_count": 10,
            },
        )

        # Block 1: Steward Approval of First IOCL Benchmark Record (POC.md Item 01 / PRD.md Persona 5.1)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="rameshwar.sharma@iocl.co.in",
            actor_role="STEWARD",
            action="STEWARD_APPROVE",
            entity_type="MAPPING",
            entity_id="IOC-100482",
            details={
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
        )

        # Block 2: Multi-CPSE Cluster Harmonization across 5 CPSEs (POC.md Section 2 Benchmark)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="rameshwar.sharma@iocl.co.in",
            actor_role="STEWARD",
            action="STEWARD_APPROVE",
            entity_type="CLUSTER",
            entity_id="CLUST-BALL-VALVE-002-150",
            details={
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
        )

        # Block 3: Deterministic Hard Safety Gate Quarantine (APP_FLOW.md E-01 / POC.md Minute 2)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="safety.gate@numm.gov.in",
            actor_role="STEWARD",
            action="SAFETY_GATE_TRIGGERED",
            entity_type="MAPPING_REJECTED",
            entity_id="IOC-200911",
            details={
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
        )

        # Block 4: Novel ONMC Sovereign Code Minting (POC.md Item 07-10 Gate Valves)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="rameshwar.sharma@iocl.co.in",
            actor_role="STEWARD",
            action="ONMC_MINT",
            entity_type="UNIFIED_MASTER_CODE",
            entity_id="ONMC-MECH-VLV-GAT-004-300-A216-7A3C",
            details={
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
        )

        # Block 5: Inter-CPSE Surplus Stock Transfer (POC.md Minute 4 / APP_FLOW.md Flow 4 / PRD.md 5.3)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="harpreet.singh@ongc.co.in",
            actor_role="PLANT_ENGINEER",
            action="MTIRF_DISPATCH",
            entity_type="TRANSFER_REQUISITION",
            entity_id="MoPNG/OM/2026/NUMM-149",
            details={
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
        )

        # Block 6: Pooled Demand Joint Procurement Aggregation (POC.md Minute 4 / APP_FLOW.md Flow 5 / PRD.md 5.2)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="priya.venkatraman@eil.co.in",
            actor_role="PROCUREMENT_OFFICER",
            action="POOLED_TENDER_BATCH",
            entity_type="JOINT_TENDER",
            entity_id="MoPNG/CPD/2026/VALVE-POOL-01",
            details={
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
        )

        # Block 7: Independent CVC Vigilance Inspection Sign-Off (RUNBOOK.md Section 4 / PRD.md 5.4)
        await default_cvc_audit_service.record_action(
            session=session,
            actor_email="sk.gupta@cvc.gov.in",
            actor_role="AUDITOR",
            action="CVC_VIGILANCE_INSPECTION",
            entity_type="AUDIT_DOSSIER",
            entity_id="CVC-NUMM-CERT-2026-02-25",
            details={
                "statutory_standard": "Central Vigilance Commission Circular No. 01/01/2021 & GFR 2017 Rule 149",
                "total_blocks_verified": 4829,
                "verification_algorithm": "FIPS 180-4 SHA-256 Sequential Hash Pointer Traversal",
                "tamper_evidence_status": "100% INTACT - ZERO COLLISION - ZERO UNAUTHORIZED MUTATION",
                "price_divergence_scrutiny": "Zero supplier price cartelization across 10 CPSEs; all inter-CPSE valuations transparent",
                "sign_off": "Approved for sovereign air-gapped production operation across all CPSEs.",
            },
        )
        await session.commit()

        print("Successfully seeded POC data with CVC Audit Records!")


if __name__ == "__main__":
    asyncio.run(seed_data())
