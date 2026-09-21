"""
Test Suite for Phase 6: Enterprise Hardening, GeM/SAP Integration & Pilot Deployment
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.services.cvc_audit_service import CVCAuditService
from backend.app.services.meghraj_auth_service import MeghRajAuthService
from backend.app.services.simulation_service import SimulationService


@pytest.fixture
def client():
    return TestClient(app)


# ==============================================================================
# 1. CVC Cryptographic Append-Only Audit Chain Tests
# ==============================================================================


def test_cvc_audit_chain_genesis_and_append():
    """Verify genesis block initialization and sequential hash chaining."""
    service = CVCAuditService()
    chain = service._chain

    # Genesis block checks
    assert len(chain) >= 1
    genesis = chain[0]
    assert genesis["index"] == 0
    assert genesis["previous_hash"] == "0" * 64
    assert len(genesis["block_hash"]) == 64
    assert genesis["action"] == "GENESIS_BLOCK"

    # Append block
    initial_count = len(chain)
    block = service.record_action(
        actor_email="inspector@cvc.gov.in",
        actor_role="AUDITOR",
        action="INSPECTION_COMMENCED",
        entity_type="SYSTEM",
        entity_id="ANNUAL_AUDIT_2026",
        details={"scope": "All inter-CPSE material master records"},
    )

    assert len(service._chain) == initial_count + 1
    assert block["index"] == initial_count
    assert block["previous_hash"] == chain[initial_count - 1]["block_hash"]
    assert len(block["block_hash"]) == 64
    assert block["payload_digest"] is not None


def test_cvc_audit_chain_integrity_verification():
    """Verify full chain mathematical traversal passes on pristine ledger."""
    service = CVCAuditService()
    res = service.verify_chain_integrity()

    assert res.is_valid is True
    assert res.total_blocks == len(service._chain)
    assert res.tamper_detected_at_index is None
    assert res.reason is None
    assert len(res.genesis_hash) == 64
    assert len(res.tip_hash) == 64


def test_cvc_audit_chain_tamper_detection():
    """Verify that tampering with any block payload or hash fails verification."""
    service = CVCAuditService()
    # Append a couple of test actions
    service.record_action(
        actor_email="steward@iocl.in",
        actor_role="STEWARD",
        action="APPROVE",
        entity_type="MAPPING",
        entity_id="REC-001",
        details={"approved_price": 25000.0},
    )
    service.record_action(
        actor_email="officer@ongc.in",
        actor_role="PROCUREMENT_OFFICER",
        action="DISPATCH",
        entity_type="REQUISITION",
        entity_id="REQ-002",
        details={"quantity": 10},
    )

    # Intact chain passes
    assert service.verify_chain_integrity().is_valid is True

    # Tamper with block payload in the middle
    tamper_index = 1
    service._chain[tamper_index]["details"]["scope"] = "TAMPERED BY MALICIOUS ACTOR"
    service._chain[tamper_index]["payload_digest"] = "bad" + service._chain[tamper_index]["payload_digest"][3:]

    # Verification must flag failure at exact block index
    tamper_res = service.verify_chain_integrity()
    assert tamper_res.is_valid is False
    assert tamper_res.tamper_detected_at_index == tamper_index
    assert "tampered" in tamper_res.reason.lower()


def test_cvc_dossier_export():
    """Verify CVC compliance dossier export structure."""
    service = CVCAuditService()
    dossier = service.export_cvc_dossier()

    assert "CVC-NUMM-CERT-" in dossier.certificate_id
    assert dossier.chain_integrity == "CRYPTOGRAPHICALLY_VERIFIED_100_PERCENT"
    assert dossier.total_blocks_audited == len(service._chain)
    assert len(dossier.blocks) == len(service._chain)
    assert "MoPNG" in dossier.statutory_standard or "CVC" in dossier.statutory_standard


# ==============================================================================
# 2. NIC MeghRaj Cloud SSO & RBAC Engine Tests
# ==============================================================================


def test_meghraj_oauth2_sso_authentication():
    """Verify JWT generation, claims encoding, and signature verification."""
    auth = MeghRajAuthService()

    payload = {
        "sub": "test.steward@iocl.in",
        "email": "test.steward@iocl.in",
        "name": "Test Steward",
        "role": "STEWARD",
        "org": "IOCL",
        "exp": 9999999999,
    }

    token = auth.generate_jwt(payload)
    assert token is not None
    assert len(token.split(".")) == 3

    decoded = auth.verify_and_decode_jwt(token)
    assert decoded is not None
    assert decoded["email"] == "test.steward@iocl.in"
    assert decoded["role"] == "STEWARD"
    assert decoded["org"] == "IOCL"

    # Signature tampering test
    tampered_token = token[:-4] + "ABCD"
    assert auth.verify_and_decode_jwt(tampered_token) is None


def test_meghraj_preset_personas_and_sso_exchange():
    """Verify authentication for all predefined enterprise personas."""
    auth = MeghRajAuthService()

    # Admin
    admin_login = auth.authenticate_credentials("admin@numm.gov.in", "AdminPassword@2026")
    assert admin_login is not None
    assert admin_login.user.role == "ADMIN"

    # Steward
    steward_login = auth.authenticate_credentials("steward.iocl@numm.gov.in", "StewardPass@2026")
    assert steward_login is not None
    assert steward_login.user.role == "STEWARD"

    # Invalid password fails
    fail_login = auth.authenticate_credentials("admin@numm.gov.in", "WrongPassword")
    assert fail_login is None

    # MeghRaj SSO Code Exchange
    sso_resp = auth.exchange_meghraj_sso("SAML-ASSERTION-ONGC-PROCURE-TOKEN")
    assert sso_resp.user.role == "PROCUREMENT_OFFICER"
    assert sso_resp.user.organization_code == "ONGC"


# ==============================================================================
# 3. 50,000 Catalog Simulation & Sub-50ms Latency Tests
# ==============================================================================


def test_simulation_50k_catalog_generation():
    """Verify 50,000 synthetic CPSE items are correctly generated and indexed."""
    sim = SimulationService()
    stats = sim.generate_50k_catalog()

    assert stats["total_items"] == 50000
    assert stats["participating_orgs"] == 10
    assert stats["distinct_index_buckets"] > 100
    assert len(sim._catalog) == 50000


def test_simulation_50k_sub50ms_latency():
    """Verify p95 query latency under load remains strictly under 50ms."""
    sim = SimulationService()
    sim.generate_50k_catalog()

    res = sim.benchmark_search_queries(num_queries=150)
    assert res["catalog_size"] == 50000
    assert res["queries_executed"] == 150
    assert res["sub_50ms_verified"] is True
    assert res["p95_latency_ms"] < 50.0
    assert res["status"] == "PASS"


# ==============================================================================
# 4. REST API Endpoints Integration Tests
# ==============================================================================


def test_auth_endpoints_api(client):
    """Test /api/v1/auth login, demo-tokens, and me endpoints."""
    # 1. Get demo tokens
    tokens_resp = client.get("/api/v1/auth/demo-tokens")
    assert tokens_resp.status_code == 200
    personas = tokens_resp.json()["personas"]
    assert len(personas) == 4

    steward_token = next(p["token"] for p in personas if p["role"] == "STEWARD")

    # 2. Login via credentials
    login_resp = client.post(
        "/api/v1/auth/login",
        json={"email": "admin@numm.gov.in", "password": "AdminPassword@2026"},
    )
    assert login_resp.status_code == 200
    login_resp.json()["access_token"]
    assert login_resp.json()["user"]["role"] == "ADMIN"

    # 3. /me profile endpoint with Bearer auth
    me_resp = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {steward_token}"},
    )
    assert me_resp.status_code == 200
    assert me_resp.json()["role"] == "STEWARD"
    assert me_resp.json()["organization_code"] == "IOCL"

    # 4. /me without auth returns 401
    me_unauth = client.get("/api/v1/auth/me")
    assert me_unauth.status_code == 401


def test_audit_endpoints_api(client):
    """Test /api/v1/audit chain, verify, stats, and export endpoints."""
    # 1. /chain
    chain_resp = client.get("/api/v1/audit/chain")
    assert chain_resp.status_code == 200
    data = chain_resp.json()
    assert data["total_blocks"] >= 1
    assert len(data["genesis_hash"]) == 64

    # 2. /verify
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.status_code == 200
    assert verify_resp.json()["is_valid"] is True

    # 3. /stats
    stats_resp = client.get("/api/v1/audit/stats")
    assert stats_resp.status_code == 200
    assert stats_resp.json()["is_chain_healthy"] is True
    assert stats_resp.json()["total_records"] >= 1

    # 4. /export
    export_resp = client.get("/api/v1/audit/export")
    assert export_resp.status_code == 200
    assert "CVC-NUMM-CERT-" in export_resp.json()["certificate_id"]
    assert export_resp.json()["chain_integrity"] == "CRYPTOGRAPHICALLY_VERIFIED_100_PERCENT"


def test_steward_and_surplus_actions_linked_to_audit_chain(client):
    """Verify that calling steward and MTIRF endpoints appends blocks to CVC audit ledger."""
    stats_before = client.get("/api/v1/audit/stats").json()["total_records"]

    # 1. Call steward decision
    steward_resp = client.post(
        "/api/v1/steward/decision",
        json={
            "mapping_id": "11111111-1111-1111-1111-111111111111",
            "decision": "APPROVE",
            "justification": "Verified against ASME B16.34 specifications for Mathura Refinery.",
            "actor_email": "steward.iocl@numm.gov.in",
        },
    )
    assert steward_resp.status_code == 200
    assert len(steward_resp.json()["sha256_hash"]) == 64

    stats_after = client.get("/api/v1/audit/stats").json()["total_records"]
    assert stats_after == stats_before + 1

    # 2. Verify chain is still 100% cryptographically valid
    verify_resp = client.get("/api/v1/audit/verify")
    assert verify_resp.json()["is_valid"] is True
