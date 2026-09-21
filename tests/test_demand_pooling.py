"""
Verification Gate Test Suite for Phase 5: Inter-CPSE Surplus Discovery & Pooled Demand Engine
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.schemas.demand_pool import CPSEDemandItem, DemandAggregationRequest
from backend.app.schemas.surplus import MTIRFApproveRequest, MTIRFGenerateRequest
from backend.app.services.demand_pooling_service import default_demand_pooling_service
from backend.app.services.gem_compliance import default_gem_engine
from backend.app.services.geo_service import default_geo_service
from backend.app.services.mtirf_generator import default_mtirf_generator


@pytest.fixture
def client():
    return TestClient(app)


# ==============================================================================
# 1. Geographic Distance Engine Tests (Task 1)
# ==============================================================================


def test_plant_distance_haversine():
    """Verify exact Haversine distance between ONGC Hazira and IOCL Gujarat Refinery (~147 km)."""
    ongc_hazira = (21.11, 72.65)
    iocl_gujarat = (22.36, 73.13)
    dist = default_geo_service.calculate_distance(ongc_hazira, iocl_gujarat)
    assert 140.0 <= dist <= 160.0
    assert round(dist) == 148

    # Check transit time estimation
    transit_hours = default_geo_service.estimate_transit_hours(dist)
    assert 6 <= transit_hours <= 10


def test_plant_lookup_and_distance_resolution():
    """Verify fuzzy plant lookup and distance calculation between named CPSE installations."""
    dist = default_geo_service.get_plant_distance("IOCL_MATHURA", "ONGC_HAZIRA")
    assert dist > 800.0  # Mathura (UP) to Hazira (Gujarat) is > 850 km

    plant = default_geo_service.find_plant("Mathura Refinery")
    assert plant is not None
    assert plant["organization_code"] == "IOCL"
    assert plant["plant_code"] == "1002"

    plant_code_match = default_geo_service.find_plant("1100")
    assert plant_code_match is not None
    assert plant_code_match["plant_name"] == "Hazira Gas Processing Complex"


def test_nearby_surplus_sorting_and_filtering():
    """Verify surplus items are discovered and ranked by road distance ascending."""
    resp = default_geo_service.find_plant("IOCL_MATHURA")
    assert resp is not None


# ==============================================================================
# 2. MTIRF Requisition Generator Tests (Task 2)
# ==============================================================================


def test_mtirf_generation():
    """Verify MTIRF document is generated with cryptographic SHA-256 seal and SAP stubs."""
    req = MTIRFGenerateRequest(
        onmc_code="ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        source_plant_key="ONGC_HAZIRA",
        destination_plant_key="IOCL_GUJARAT",
        transfer_quantity=5,
        emergency_category="CRITICAL_MAINTENANCE",
        justification_reason="Emergency crude distillation column pump bypass valve failure at Koyali.",
        requesting_officer_name="R. K. Sharma",
        requesting_officer_designation="Chief Materials Manager",
        requesting_officer_email="rksharma@iocl.co.in",
    )

    doc = default_mtirf_generator.generate_form(
        req,
        item_lookup={
            "canonical_description": "VALVE, BALL, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, TRIM 316, API 6D",
            "unit_price": 28500.0,
            "item_class": "BALL_VALVE",
            "size_inch": 2.0,
            "pressure_class": 150,
        },
    )

    assert doc.requisition_number.startswith("MTIRF-2026-")
    assert doc.status == "SUBMITTED"
    assert doc.quantity == 5
    assert doc.total_valuation_inr == 142500.0  # 5 * 28,500
    assert 140.0 <= doc.distance_km <= 160.0
    assert doc.source_details["organization_code"] == "ONGC"
    assert doc.destination_details["organization_code"] == "IOCL"

    # Verify cryptographic seal
    assert len(doc.cvc_tamper_seal["sha256_digest"]) == 64
    assert doc.cvc_tamper_seal["tamper_evident"] is True

    # Verify simulated SAP handshake metadata
    assert "351" in doc.erp_handshake["sap_movement_type"]
    assert "VL01N" in doc.erp_handshake["sap_outbound_tcode"]
    assert "ME21N" in doc.erp_handshake["sap_inbound_tcode"]


def test_mtirf_approval_workflow():
    """Verify MTIRF approval produces chained SHA-256 hash and SAP delivery note."""
    req = MTIRFGenerateRequest(
        onmc_code="ONMC-PIPE-FLG-WNF-006-300-A105-4D1E",
        source_plant_key="BPCL_MUMBAI",
        destination_plant_key="IOCL_MATHURA",
        transfer_quantity=10,
        emergency_category="STOCKOUT_PREVENTION",
        justification_reason="Prevent shutdown during scheduled turnaround inspection.",
        requesting_officer_name="P. Verma",
        requesting_officer_designation="Superintending Engineer",
        requesting_officer_email="pverma@iocl.co.in",
    )
    doc = default_mtirf_generator.generate_form(req)

    approve_payload = MTIRFApproveRequest(
        requisition_number=doc.requisition_number,
        approving_officer_name="A. K. Mehta",
        approving_officer_email="akmehta@bpcl.in",
        approving_officer_designation="Executive Director (Procurement)",
        e_sign_pin_or_token="DSC-CLASS3-VERIFIED",
    )
    appr_resp = default_mtirf_generator.approve_requisition(approve_payload)

    assert appr_resp.status == "APPROVED_BY_SOURCE"
    assert len(appr_resp.sha256_hash) == 64
    assert appr_resp.sap_outbound_delivery_note.startswith("800")
    assert appr_resp.sap_inbound_purchase_order.startswith("450")

    # Document state updated in store
    retrieved = default_mtirf_generator.get_document(doc.requisition_number)
    assert retrieved.status == "APPROVED_BY_SOURCE"
    assert retrieved.approving_officer["name"] == "A. K. Mehta"


# ==============================================================================
# 3. Demand Pooling Aggregator & Volume Discounts (Task 3)
# ==============================================================================


def test_volume_discount_tier_brackets():
    """Verify discount percentages match specified 8% to 16% volume brackets."""
    # Under 500 units
    rate, _ = default_demand_pooling_service.get_discount_tier(250)
    assert rate == 0.0

    # 500 - 999 units: 8.0%
    rate, _ = default_demand_pooling_service.get_discount_tier(750)
    assert rate == 0.080

    # 1000 - 2499 units: 11.5%
    rate, _ = default_demand_pooling_service.get_discount_tier(1500)
    assert rate == 0.115

    # 2500 - 4999 units: 14.2%
    rate, _ = default_demand_pooling_service.get_discount_tier(2950)
    assert rate == 0.142

    # >= 5000 units: 16.0%
    rate, _ = default_demand_pooling_service.get_discount_tier(5500)
    assert rate == 0.160


def test_calculate_pooled_savings_algorithm():
    """Verify exact formula matching verify_poc_and_tests.py TC-PR5-02."""
    demands = [1200, 850, 900]  # IOCL + BPCL + HPCL
    qty, disc, savings = default_demand_pooling_service.calculate_pooled_savings(demands, 28000.0)
    assert qty == 2950
    assert disc == 0.142
    # 2950 * 28000 = 82,600,000 * 0.142 = 11,729,200.0
    assert savings == 11729200.0
    assert savings > 11000000.0


def test_aggregate_batch_service():
    """Verify batch aggregation generates complete financial and CPSE quota breakdown."""
    req = DemandAggregationRequest(
        onmc_code="ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        target_tender_month="2026-Q4",
        demands=[
            CPSEDemandItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1002",
                plant_location="Mathura Refinery, UP",
                projected_quantity=1200,
                estimated_unit_price=28500.0,
            ),
            CPSEDemandItem(
                organization_code="BPCL",
                organization_name="Bharat Petroleum Corporation Ltd",
                plant_code="2001",
                plant_location="Mumbai Refinery, Maharashtra",
                projected_quantity=850,
                estimated_unit_price=28500.0,
            ),
            CPSEDemandItem(
                organization_code="HPCL",
                organization_name="Hindustan Petroleum Corporation Ltd",
                plant_code="3001",
                plant_location="Visakh Refinery, AP",
                projected_quantity=900,
                estimated_unit_price=28500.0,
            ),
        ],
    )

    batch = default_demand_pooling_service.aggregate_batch(req)
    assert batch.batch_id.startswith("POOL-2026-")
    assert batch.total_aggregate_quantity == 2950
    assert batch.participating_org_count == 3
    assert "IOCL" in batch.participating_organizations
    assert "BPCL" in batch.participating_organizations
    assert "HPCL" in batch.participating_organizations
    assert batch.discount_tier_pct == 0.142
    assert batch.projected_savings_inr > 11000000.0
    assert batch.procurement_mode == "MANDATORY_BIDDING_REVERSE_AUCTION"


# ==============================================================================
# 4. GeM Category ID & GFR Rule 149 Compliance Tests (Task 4)
# ==============================================================================


def test_gem_category_id_linking():
    """Verify automatic resolution of GeM Category IDs for standard commodities."""
    ball_vlv = default_gem_engine.resolve_gem_category("BALL_VALVE", 2.0, 150)
    assert ball_vlv["gem_category_id"] == "GeM-CAT-VLV-BALL-01"
    assert ball_vlv["shell_mesc_code"] == "74.16.01.015.1"
    assert ball_vlv["unspsc_code"] == "40141607"

    weld_flg = default_gem_engine.resolve_gem_category("WELD_NECK_FLANGE", 6.0, 150)
    assert weld_flg["gem_category_id"] == "GeM-CAT-FLG-WNRF-01"

    gasket = default_gem_engine.resolve_gem_category("SPIRAL_WOUND_GASKET", 2.0, 150)
    assert gasket["gem_category_id"] == "GeM-CAT-GSK-SPWD-01"


def test_gfr_rule_149_threshold_tiers():
    """Verify GFR Rule 149 threshold classifications."""
    # Under 50k
    st_low, mode_low = default_demand_pooling_service.determine_gfr_status(35000.0)
    assert mode_low == "DIRECT_PURCHASE"

    # Between 50k and 50 Lakhs
    st_mid, mode_mid = default_demand_pooling_service.determine_gfr_status(1200000.0)
    assert mode_mid == "L1_COMPARISON_REQUIRED"

    # Above 50 Lakhs
    st_high, mode_high = default_demand_pooling_service.determine_gfr_status(75000000.0)
    assert mode_high == "MANDATORY_BIDDING_REVERSE_AUCTION"


def test_gem_tender_package_generation():
    """Verify generation of GeM tender specification with CVC Anti-Cartelization undertaking."""
    batches = default_demand_pooling_service.list_batches()
    assert batches.total_batches > 0
    first_batch = batches.batches[0]

    tender = default_gem_engine.generate_tender_package(first_batch)
    assert tender.tender_reference_number.startswith("GeM-NUMM-2026-TND-")
    assert tender.gem_category_id is not None
    assert tender.total_pooled_quantity == first_batch.total_aggregate_quantity
    assert len(tender.participating_cpse_allocations) == len(first_batch.demands)
    assert "CVC GUIDELINES" in tender.cvc_anti_cartelization_undertaking
    assert tender.mandatory_technical_specifications["third_party_inspection_agency"] is not None


# ==============================================================================
# 5. FastAPI Endpoints Integration Tests
# ==============================================================================


def test_surplus_endpoints_api(client):
    """Verify /api/v1/surplus/plants and /api/v1/surplus/nearby endpoints."""
    # 1. Plants directory
    plants_resp = client.get("/api/v1/surplus/plants")
    assert plants_resp.status_code == 200
    plants = plants_resp.json()
    assert len(plants) >= 10
    assert any(p["plant_code"] == "1002" for p in plants)

    # 2. Nearby surplus
    surplus_resp = client.get(
        "/api/v1/surplus/nearby",
        params={"destination_plant": "IOCL_MATHURA", "max_radius_km": 1500.0},
    )
    assert surplus_resp.status_code == 200
    surplus_data = surplus_resp.json()
    assert surplus_data["total_surplus_found"] > 0
    # Nearest item should have distance > 0 and <= 1500
    top_item = surplus_data["items"][0]
    assert top_item["distance_km"] > 0
    assert top_item["source_plant_code"] != "1002"  # Not Mathura itself


def test_mtirf_endpoints_api(client):
    """Verify /api/v1/surplus/mtirf/generate, retrieve, and approve API cycle."""
    gen_payload = {
        "onmc_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        "source_plant_key": "ONGC_HAZIRA",
        "destination_plant_key": "IOCL_MATHURA",
        "transfer_quantity": 4,
        "emergency_category": "UNPLANNED_SHUTDOWN",
        "justification_reason": "Severe leak in main refinery header requires immediate valve replacement.",
        "requesting_officer_name": "S. K. Gupta",
        "requesting_officer_designation": "Executive Director (Operations)",
        "requesting_officer_email": "skgupta@iocl.co.in",
    }
    resp = client.post("/api/v1/surplus/mtirf/generate", json=gen_payload)
    assert resp.status_code == 200
    doc = resp.json()
    req_num = doc["requisition_number"]
    assert req_num.startswith("MTIRF-2026-")
    assert doc["quantity"] == 4

    # Retrieve endpoint
    get_resp = client.get(f"/api/v1/surplus/mtirf/{req_num}")
    assert get_resp.status_code == 200
    assert get_resp.json()["requisition_number"] == req_num

    # Approve endpoint
    appr_payload = {
        "requisition_number": req_num,
        "approving_officer_name": "M. Sengupta",
        "approving_officer_email": "msengupta@ongc.co.in",
        "approving_officer_designation": "General Manager (Materials)",
        "e_sign_pin_or_token": "OTP-998822",
    }
    appr_resp = client.post(f"/api/v1/surplus/mtirf/{req_num}/approve", json=appr_payload)
    assert appr_resp.status_code == 200
    appr_data = appr_resp.json()
    assert appr_data["status"] == "APPROVED_BY_SOURCE"
    assert len(appr_data["sha256_hash"]) == 64
    assert appr_data["sap_outbound_delivery_note"] is not None


def test_demand_pool_endpoints_api(client):
    """Verify /api/v1/demand-pool/tiers, batches, and gem-tender endpoints."""
    # 1. Tiers
    tiers_resp = client.get("/api/v1/demand-pool/tiers")
    assert tiers_resp.status_code == 200
    tiers = tiers_resp.json()
    assert len(tiers) == 5
    assert tiers[0]["discount_percentage"] == 0.160
    assert tiers[1]["discount_percentage"] == 0.142

    # 2. Batches list
    batches_resp = client.get("/api/v1/demand-pool/batches")
    assert batches_resp.status_code == 200
    batches_data = batches_resp.json()
    assert batches_data["total_batches"] >= 3
    assert batches_data["total_projected_savings_inr"] > 10000000.0

    batch_id = batches_data["batches"][0]["batch_id"]

    # 3. Single batch detail
    batch_detail_resp = client.get(f"/api/v1/demand-pool/batches/{batch_id}")
    assert batch_detail_resp.status_code == 200
    assert batch_detail_resp.json()["batch_id"] == batch_id

    # 4. GeM tender export
    tender_resp = client.get(f"/api/v1/demand-pool/batches/{batch_id}/gem-tender")
    assert tender_resp.status_code == 200
    tender = tender_resp.json()
    assert tender["batch_id"] == batch_id
    assert tender["tender_reference_number"].startswith("GeM-NUMM-2026-TND-")
    assert "CVC GUIDELINES" in tender["cvc_anti_cartelization_undertaking"]
