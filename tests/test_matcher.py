"""
Test Suite for Phase 3: Hybrid Matcher, Vector Indexing & Safety Rule Gates
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.embedding_generator import default_embedding_generator
from backend.app.services.hybrid_matcher import default_matcher
from backend.app.services.onmc_minter import default_onmc_minter
from backend.app.services.safety_gate import default_safety_gate


@pytest.fixture
def client():
    return TestClient(app)


# ==============================================================================
# TC-PR3-01: Safety Gate - ASME Pressure Rating Hard Block
# ==============================================================================


def test_pressure_gate():
    """
    TC-PR3-01: Class 150 vs Class 300 pressure mismatch MUST be disqualified.
    ASME B16.34: Zero tolerance for pressure rating mismatch.
    Confidence score must be forced to 0.0%.
    """
    raw_150 = 'BALL VALVE 2" 150# A105'
    raw_300 = 'BALL VALVE 2" 300# A105'

    # Direct safety gate check
    gate = default_safety_gate.evaluate(raw_150, raw_300)
    assert gate.passed is False
    assert gate.criticality == "BLOCKER"
    assert any("Pressure mismatch" in r for r in gate.rejection_reasons)

    # Matcher evaluation check
    candidate = default_matcher.evaluate_pair(raw_150, raw_300)
    assert candidate.gate_result.passed is False
    assert candidate.confidence_score == 0.0
    assert candidate.mapping_status == "REJECTED"


# ==============================================================================
# TC-PR3-02: Safety Gate - Nominal Size (NPS) Hard Block
# ==============================================================================


def test_size_gate():
    """
    TC-PR3-02: Size 2" vs Size 3" conflict MUST be disqualified.
    ASME B16.5: Zero tolerance for dimensional diameter mismatch.
    Confidence score must be forced to 0.0%.
    """
    raw_2in = 'BALL VALVE 2" 150# A105'
    raw_3in = 'BALL VALVE 3" 150# A105'

    # Direct safety gate check
    gate = default_safety_gate.evaluate(raw_2in, raw_3in)
    assert gate.passed is False
    assert gate.criticality == "BLOCKER"
    assert any("Size mismatch" in r for r in gate.rejection_reasons)

    # Matcher evaluation check
    candidate = default_matcher.evaluate_pair(raw_2in, raw_3in)
    assert candidate.gate_result.passed is False
    assert candidate.confidence_score == 0.0
    assert candidate.mapping_status == "REJECTED"


# ==============================================================================
# TC-PR3-03: High-Confidence Cross-CPSE Item Match (>= 90%)
# ==============================================================================


def test_valid_match():
    """
    TC-PR3-03: IOCL Mathura vs ONGC Hazira 2" Ball Valves.
    Both describe 2" Class 150 Flanged ASTM A105 Ball Valve.
    Must pass safety gate and achieve confidence score >= 0.90 (90.0%).
    """
    raw_iocl = 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D'
    raw_ongc = "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP"

    candidate = default_matcher.evaluate_pair(raw_iocl, raw_ongc)
    assert candidate.gate_result.passed is True
    assert candidate.confidence_score >= 0.90
    assert candidate.mapping_status == "AUTO_APPROVED"
    assert candidate.lexical_similarity > 0.0
    assert candidate.semantic_similarity >= 0.90


# ==============================================================================
# TC-PR3-04: Shell MESC & UNSPSC Cross-Walk
# ==============================================================================


def test_taxonomy():
    """
    TC-PR3-04: Cross-walk resolution to Shell MESC and UNSPSC standards.
    2" Class 150 Ball Valve maps to MESC 74.16.01.015.1 and UNSPSC 40141607.
    """
    raw_iocl = 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D'
    candidate = default_matcher.evaluate_pair(raw_iocl, raw_iocl)

    assert candidate.matched_mesc == "74.16.01.015.1"
    assert candidate.matched_mesc_spe == "SPE 77/300"
    assert candidate.matched_unspsc == "40141607"
    assert candidate.matched_gem == "GeM-CAT-VLV-BALL-01"


# ==============================================================================
# TC-PR3-05: Deterministic ONMC Minting with SHA-256 Hash
# ==============================================================================


def test_mint():
    """
    TC-PR3-05: Validated 2" Class 150 A105 Ball Valve deterministic code generation.
    Must generate canonical base ONMC-MECH-VLV-BAL-002-150-A105
    and stable 4-character SHA-256 validation hash.
    """
    raw_iocl = 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D'
    attrs = default_extractor.extract(raw_iocl)

    # 6-segment base code
    base_code = default_onmc_minter.mint_base_code(attrs)
    assert base_code == "ONMC-MECH-VLV-BAL-002-150-A105"

    # Full sovereign code with verification hash
    full_code = default_onmc_minter.mint_canonical_code(attrs, include_hash=True)
    assert full_code.startswith("ONMC-MECH-VLV-BAL-002-150-A105-")
    assert len(full_code.split("-")) == 8
    hash_part = full_code.split("-")[-1]
    assert len(hash_part) == 4
    assert hash_part == hash_part.upper()

    # Verify determinism: repeating generation yields identical hash
    full_code_repeat = default_onmc_minter.mint_canonical_code(attrs, include_hash=True)
    assert full_code == full_code_repeat


# ==============================================================================
# Safety Gate: NACE MR0175 Sour Gas Service Segregation
# ==============================================================================


def test_nace_sour_service_gate():
    """
    Enforces NACE MR0175 / ISO 15156 sour gas service segregation.
    Standard carbon steel valve cannot substitute NACE MR0175 sour service valve.
    """
    standard_item = 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105'
    sour_item = 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, NACE MR0175 SOUR'

    gate = default_safety_gate.evaluate(standard_item, sour_item)
    assert gate.passed is False
    assert gate.criticality == "BLOCKER"
    assert any("NACE MR0175 sour service violation" in r for r in gate.rejection_reasons)

    candidate = default_matcher.evaluate_pair(standard_item, sour_item)
    assert candidate.confidence_score == 0.0
    assert candidate.mapping_status == "REJECTED"


# ==============================================================================
# Safety Gate: Metallurgy Conflict (SS316 vs A105)
# ==============================================================================


def test_metallurgy_conflict_gate():
    """
    Disqualifies pairing Stainless Steel (SS316) with Carbon Steel (ASTM A105).
    """
    cs_valve = 'BALL VALVE 2" 150# A105'
    ss_valve = 'BALL VALVE 2" 150# SS316'

    gate = default_safety_gate.evaluate(cs_valve, ss_valve)
    assert gate.passed is False
    assert gate.criticality == "BLOCKER"
    assert any("Metallurgy conflict" in r for r in gate.rejection_reasons)


# ==============================================================================
# Dense Vector Embedding Generator & Cosine Similarity
# ==============================================================================


def test_dense_vector_embedding():
    """
    Verifies dense embedding generator produces 1024-dimensional normalized vectors.
    """
    gen = default_embedding_generator
    emb = gen.generate_embedding("VALVE BALL 2INCH 150# ASTM A105")
    assert len(emb) == 1024

    # Identical texts yield cosine similarity = 1.0
    sim_self = gen.cosine_similarity(emb, emb)
    assert pytest.approx(sim_self, abs=1e-3) == 1.0

    # Distinct texts yield sensible cosine similarity
    emb2 = gen.generate_embedding("FLANGE WELD NECK 6INCH 300# ASTM A105")
    sim_diff = gen.cosine_similarity(emb, emb2)
    assert 0.0 <= sim_diff < 1.0


# ==============================================================================
# RapidFuzz Lexical Scoring
# ==============================================================================


def test_rapidfuzz_lexical_similarity():
    """
    Verifies RapidFuzz token sorting and ratio calculation.
    """
    text_a = "VLV BL FLGD 50MM 150# CS A105"
    text_b = "BALL VALVE FLANGED 2IN 150# CARBON STEEL ASTM A105"
    lex = default_matcher.compute_lexical_similarity(text_a, text_b)
    assert 0.70 <= lex <= 1.0


# ==============================================================================
# API Endpoints: /api/v1/matcher/evaluate, /gate, /mint
# ==============================================================================


def test_api_matcher_evaluate(client):
    """Verifies POST /api/v1/matcher/evaluate."""
    payload = {
        "raw_text_a": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D',
        "raw_text_b": "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
    }
    response = client.post("/api/v1/matcher/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["rule_gate_passed"] is True
    assert data["confidence_score"] >= 0.90
    assert data["mapping_status"] == "AUTO_APPROVED"
    assert data["shell_mesc_code"] == "74.16.01.015.1"
    assert data["unspsc_code"] == "40141607"


def test_api_matcher_gate_rejection(client):
    """Verifies POST /api/v1/matcher/gate rejects pressure mismatch."""
    payload = {
        "raw_text_a": 'BALL VALVE 2" 150# A105',
        "raw_text_b": 'BALL VALVE 2" 300# A105',
    }
    response = client.post("/api/v1/matcher/gate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["passed"] is False
    assert data["criticality"] == "BLOCKER"
    assert len(data["rejection_reasons"]) > 0


def test_api_matcher_mint(client):
    """Verifies POST /api/v1/matcher/mint."""
    payload = {
        "raw_text": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D',
        "include_hash": True,
    }
    response = client.post("/api/v1/matcher/mint", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["base_code"] == "ONMC-MECH-VLV-BAL-002-150-A105"
    assert data["onmc_code"].startswith("ONMC-MECH-VLV-BAL-002-150-A105-")
    assert len(data["verification_hash"]) == 4
