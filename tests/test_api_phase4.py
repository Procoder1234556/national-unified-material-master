"""
Test Suite for Phase 4: Full-Stack Web Application Endpoints
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import io

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app


@pytest.fixture
def client():
    return TestClient(app)


# ==============================================================================
# 1. Ingestion Pipeline Tests
# ==============================================================================


def test_batch_ingest_endpoint(client):
    """Verify batch catalog ingestion endpoint calculates KPIs properly."""
    payload = {
        "organization_code": "IOCL",
        "items": [
            {
                "source_item_code": "IOCL-101",
                "plant_code": "1002",
                "plant_location": "Mathura Refinery",
                "raw_description": "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
                "unit_price": 28500.0,
                "stock_quantity": 10,
                "uom": "EA",
            },
            {
                "source_item_code": "IOCL-102",
                "plant_code": "1002",
                "plant_location": "Mathura Refinery",
                "raw_description": "BALL VALVE 2IN 300LB FLGD WCB BODY",
                "unit_price": 31000.0,
                "stock_quantity": 5,
                "uom": "EA",
            },
            {
                "source_item_code": "IOCL-103",
                "plant_code": "1002",
                "plant_location": "Mathura Refinery",
                "raw_description": "SPECIAL PROPRIETARY SENSOR HOUSING NOVEL PART 999",
                "unit_price": 12000.0,
                "stock_quantity": 2,
                "uom": "EA",
            },
        ],
    }
    resp = client.post("/api/v1/ingest/batch", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["organization_code"] == "IOCL"
    assert data["total_rows"] == 3
    assert data["auto_approved_count"] >= 1
    assert data["review_required_count"] >= 1
    assert data["novel_count"] >= 1
    assert data["estimated_duplicate_savings_inr"] > 0

    job_id = data["job_id"]

    # Verify status endpoint
    status_resp = client.get(f"/api/v1/ingest/status/{job_id}")
    assert status_resp.status_code == 200
    status_data = status_resp.json()
    assert status_data["status"] == "COMPLETED"
    assert status_data["progress_pct"] == 100

    # Verify summary endpoint
    summary_resp = client.get(f"/api/v1/ingest/summary/{job_id}")
    assert summary_resp.status_code == 200
    summary_data = summary_resp.json()
    assert summary_data["total_rows"] == 3


def test_upload_csv_catalog(client):
    """Verify file upload via CSV parses and runs normalization pipeline."""
    csv_content = """source_item_code,plant_code,plant_location,raw_description,unit_price,stock_quantity
BPCL-901,2001,Mumbai Refinery,FLANGE WELD NECK 6 INCH 300# RF CS ASTM A105 ASME B16.5,14500,20
BPCL-902,2001,Mumbai Refinery,GASKET SPIRAL WOUND 3 INCH 150# SS316 GRAPHITE ASME B16.20,1200,100
"""
    files = {"file": ("catalog.csv", io.BytesIO(csv_content.encode("utf-8")), "text/csv")}
    resp = client.post("/api/v1/ingest/upload", files=files, params={"organization_code": "BPCL"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["organization_code"] == "BPCL"
    assert data["total_rows"] == 2
    assert data["auto_approved_count"] == 2


# ==============================================================================
# 2. National Search Before Buy Tests
# ==============================================================================


def test_national_search_endpoint(client):
    """Verify search returns harmonized ONMC items and multi-CPSE inventory."""
    payload = {
        "query": "2 inch 150# ball valve flanged carbon steel",
        "limit": 5,
    }
    resp = client.post("/api/v1/search", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_matches"] > 0
    top_hit = data["results"][0]

    assert "ONMC-MECH-VLV-BAL" in top_hit["onmc_code"]
    assert top_hit["shell_mesc_code"] is not None
    assert top_hit["unspsc_code"] is not None
    assert top_hit["gem_category_id"] is not None
    assert top_hit["total_national_stock"] > 0
    assert top_hit["participating_cpse_count"] >= 2
    assert len(top_hit["stock_distribution"]) >= 2

    # Verify CPSE enterprise holdings in stock distribution
    orgs = [s["organization_code"] for s in top_hit["stock_distribution"]]
    assert "ONGC" in orgs
    assert "IOCL" in orgs


def test_national_search_parametric_filtering(client):
    """Verify exact filtering by pressure_class and size_inch."""
    payload = {
        "query": "flange",
        "item_class": "WELD_NECK_FLANGE",
        "pressure_class": 300,
        "size_inch": 6.0,
    }
    resp = client.post("/api/v1/search", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_matches"] == 1
    item = data["results"][0]
    assert item["item_class"] == "WELD_NECK_FLANGE"
    assert item["pressure_class"] == 300
    assert item["size_inch"] == 6.0


# ==============================================================================
# 3. Data Steward Review Cockpit & Decision Tests
# ==============================================================================


def test_steward_queue_endpoint(client):
    """Verify triage review queue includes side-by-side attribute diffs."""
    resp = client.get("/api/v1/steward/queue")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_pending"] >= 5

    # Check first pending item
    item = data["items"][0]
    assert "mapping_id" in item
    assert "raw_description" in item
    assert "onmc_candidate_code" in item
    assert "attribute_diffs" in item
    assert len(item["attribute_diffs"]) > 0

    # Ensure conflict is marked for pressure mismatch item
    conflict_items = [it for it in data["items"] if not it["rule_gate_passed"]]
    assert len(conflict_items) >= 1
    conflict_diffs = conflict_items[0]["attribute_diffs"]
    assert any(d["status"] == "CONFLICT" for d in conflict_diffs)


def test_steward_decision_approve(client):
    """Verify steward approval generates immutable SHA-256 audit entry."""
    mapping_id = "11111111-1111-1111-1111-111111111111"
    payload = {
        "mapping_id": mapping_id,
        "decision": "APPROVE",
        "justification": "Verified physical specifications match refinery engineering catalog exactly.",
        "actor_email": "steward.iocl@numm.gov.in",
    }
    resp = client.post("/api/v1/steward/decision", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["status"] == "MANUALLY_APPROVED"
    assert data["mapping_id"] == mapping_id
    assert len(data["sha256_hash"]) == 64  # Valid SHA-256 hex string
    assert "audit_log_id" in data
    assert data["action_recorded"] == "STEWARD_APPROVE"


def test_steward_decision_reject(client):
    """Verify steward rejection updates status and logs justification."""
    mapping_id = "22222222-2222-2222-2222-222222222222"
    payload = {
        "mapping_id": mapping_id,
        "decision": "REJECT",
        "justification": "Fatal ASME B16.34 pressure class mismatch between 300# and 150#.",
        "actor_email": "safety.officer@numm.gov.in",
    }
    resp = client.post("/api/v1/steward/decision", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["status"] == "REJECTED"
    assert len(data["sha256_hash"]) == 64


def test_steward_decision_mint_novel(client):
    """Verify mint decision produces a valid sovereign ONMC code."""
    mapping_id = "33333333-3333-3333-3333-333333333333"
    payload = {
        "mapping_id": mapping_id,
        "decision": "MINT",
        "justification": "Novel specialized refinery component not present in canonical master.",
        "actor_email": "chief.steward@numm.gov.in",
    }
    resp = client.post("/api/v1/steward/decision", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["status"] == "MINTED_NOVEL"
    assert "ONMC-" in data["onmc_code"]
    assert len(data["sha256_hash"]) == 64
