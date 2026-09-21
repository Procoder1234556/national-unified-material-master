"""
Test Suite for Phase 2: NLP Normalization & Attribute Extraction Engine
SIH 26099 - National Unified Material Master (NUMM) Framework
"""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.domain_normalizer import default_normalizer
from backend.app.services.taxonomy_mapper import default_taxonomy_mapper


@pytest.fixture
def client():
    return TestClient(app)


# ==============================================================================
# TC-PR2-01: Abbreviation Expansion & Domain Dictionary
# ==============================================================================


def test_abbrev_expansion_dictionary():
    """Verify 250+ Oil & Gas domain abbreviations are registered and functional."""
    assert default_normalizer.abbreviation_count >= 250

    # TC-PR2-01 canonical test case
    raw = "VLV BL FLGD 50MM 150# CS A105"
    cleaned = default_normalizer.clean_text(raw)
    assert "VALVE" in cleaned
    assert "BALL" in cleaned
    assert "FLANGED" in cleaned
    assert "CARBON STEEL" in cleaned
    assert "ASTM A105" in cleaned


def test_broad_acronym_expansions():
    """Verify various categories of acronyms expand accurately."""
    samples = [
        ("GT VLV 4IN", ["GATE", "VALVE"]),
        ("GLB VLV 2IN", ["GLOBE", "VALVE"]),
        ("CHK VLV 3IN", ["CHECK", "VALVE"]),
        ("NRV 6IN", ["NON RETURN VALVE"]),
        ("FLG WNRF 8IN", ["FLANGED", "WELD NECK RAISED FACE"]),
        ("SPWD GSK 2IN", ["SPIRAL WOUND", "GASKET"]),
        ("PIPE SMLS 4IN", ["PIPE", "SEAMLESS"]),
        ("FS BODY A105", ["FORGED STEEL", "ASTM A105"]),
        ("SS316 TRIM", ["STAINLESS STEEL 316", "TRIM"]),
        ("A216 WCB", ["ASTM A216 WCB"]),
        ("A350 LF2", ["ASTM A350 LF2"]),
        ("BEVEL END BE", ["BEVEL END"]),
        ("LEVER OP LVR", ["LEVER OPERATED"]),
        ("NACE MR0175", ["NACE", "SOUR SERVICE"]),
    ]
    for raw, expected_tokens in samples:
        cleaned = default_normalizer.clean_text(raw)
        for token in expected_tokens:
            assert token in cleaned, f"Expected '{token}' in '{cleaned}' for input '{raw}'"


# ==============================================================================
# TC-PR2-02: Metric to Imperial Unit Harmonization
# ==============================================================================


def test_metric_imperial_unit_conversion():
    """TC-PR2-02: Resolves nominal bore mm/DN to NPS inches bidirectionally."""
    # 50mm NB / DN 50 -> 2.0"
    for raw in ["BALL VALVE 50MM NB 150#", "BALL VALVE 50 MM 150#", "BALL VALVE DN 50 150#", "BALL VALVE 50MM 150#"]:
        attrs = default_extractor.extract(raw)
        assert attrs["size_inch"] == 2.0, f"Failed for {raw}"
        assert attrs["size_mm"] == 50, f"Failed for {raw}"

    # Fractional inch representations
    f1 = default_extractor.extract("BALL VALVE 1-1/2 INCH 150#")
    assert f1["size_inch"] == 1.5
    assert f1["size_mm"] == 40

    f2 = default_extractor.extract('GATE VALVE 1/2" 800#')
    assert f2["size_inch"] == 0.5
    assert f2["size_mm"] == 15

    f3 = default_extractor.extract("GLOBE VALVE 2 1/2 IN 300#")
    assert f3["size_inch"] == 2.5
    assert f3["size_mm"] == 65

    # Standard nominal bore lookup fixtures
    dn_tests = [
        ("DN 15", 0.5, 15),
        ("DN 25", 1.0, 25),
        ("DN 80", 3.0, 80),
        ("DN 100", 4.0, 100),
        ("DN 150", 6.0, 150),
        ("DN 200", 8.0, 200),
        ("DN 300", 12.0, 300),
        ("DN 600", 24.0, 600),
    ]
    for dn_str, exp_inch, exp_mm in dn_tests:
        attrs = default_extractor.extract(f"VALVE {dn_str} 150#")
        assert attrs["size_inch"] == exp_inch
        assert attrs["size_mm"] == exp_mm


# ==============================================================================
# TC-PR2-03: Pressure Class Rating Extraction
# ==============================================================================


def test_pressure_rating_extraction():
    """TC-PR2-03: Extracts ANSI pound ratings and converts European PN ratings."""
    # Standard ASME/ANSI pound classes
    pound_cases = [
        ('VALVE 2" 150#', 150),
        ('VALVE 2" CL 150', 150),
        ('VALVE 2" CLASS 150', 150),
        ('VALVE 2" 150 LB', 150),
        ('VALVE 2" 150 LBS', 150),
        ('VALVE 4" 300#', 300),
        ('VALVE 6" 600#', 600),
        ('VALVE 1" 800#', 800),
        ('VALVE 8" 900#', 900),
        ('VALVE 10" 1500#', 1500),
        ('VALVE 12" 2500#', 2500),
    ]
    for text, exp_rating in pound_cases:
        attrs = default_extractor.extract(text)
        assert attrs["pressure_class"] == exp_rating, f"Failed for {text}"

    # PN rating conversions
    pn_cases = [
        ("VALVE DN 50 PN 16", 150),
        ("VALVE DN 50 PN 20", 150),
        ("VALVE DN 100 PN 40", 300),
        ("VALVE DN 150 PN 100", 600),
        ("VALVE DN 200 PN 250", 1500),
    ]
    for text, exp_rating in pn_cases:
        attrs = default_extractor.extract(text)
        assert attrs["pressure_class"] == exp_rating, f"Failed for PN conversion: {text}"


# ==============================================================================
# TC-PR2-04: Metallurgy Grade Extraction
# ==============================================================================


def test_metallurgy_extraction():
    """TC-PR2-04: Extracts standardized ASTM and alloy grades."""
    alloy_cases = [
        ('VALVE 2" 150# ASTM A105', "ASTM_A105"),
        ('VALVE 2" 150# CS A105', "ASTM_A105"),
        ('VALVE 2" 150# A-105', "ASTM_A105"),
        ('VALVE 4" 300# ASTM A216 WCB', "ASTM_A216_WCB"),
        ('VALVE 4" 300# WCB', "ASTM_A216_WCB"),
        ('VALVE 6" 150# A350 LF2', "ASTM_A350_LF2"),
        ('VALVE 2" 150# LF2', "ASTM_A350_LF2"),
        ('PIPE 4" ASTM A106 GR B', "ASTM_A106_GR_B"),
        ('PIPE 4" A106-B', "ASTM_A106_GR_B"),
        ('VALVE 2" 150# ASTM A182 F316', "ASTM_A182_F316"),
        ('VALVE 2" 150# SS316', "ASTM_A182_F316"),
        ('VALVE 2" 150# 316SS', "ASTM_A182_F316"),
        ('VALVE 2" 150# DUPLEX 2205', "ASTM_A182_F51_DUPLEX"),
        ('VALVE 2" 150# SUPER DUPLEX 2507', "ASTM_A182_F53_SUPER_DUPLEX"),
        ('VALVE 2" 150# INCONEL 625', "INCONEL_625"),
        ('VALVE 2" 150# MONEL 400', "MONEL_400"),
        ('VALVE 2" 150# HASTELLOY C276', "HASTELLOY_C276"),
    ]
    for text, exp_metal in alloy_cases:
        attrs = default_extractor.extract(text)
        assert attrs["metallurgy"] == exp_metal, f"Failed for '{text}': got '{attrs['metallurgy']}'"


# ==============================================================================
# TC-PR2-05: Flange and Gasket Extraction
# ==============================================================================


def test_flange_and_gasket_extraction():
    """TC-PR2-05: Weld Neck Flange and Spiral Wound Gasket parsing."""
    f1 = default_extractor.extract("FLG WNRF 6IN 150# SCH40 A105")
    assert f1["item_class"] == "WELD_NECK_FLANGE"
    assert f1["size_inch"] == 6.0
    assert f1["pressure_class"] == 150
    assert f1["metallurgy"] == "ASTM_A105"
    assert f1["end_connection"] == "FLANGED_RF"
    assert f1["parametric_attributes"].get("schedule") == "SCH 40"

    g1 = default_extractor.extract("GASKET SPWD 2IN 150# SS316 ASME B16.20")
    assert g1["item_class"] == "SPIRAL_WOUND_GASKET"
    assert g1["size_inch"] == 2.0
    assert g1["pressure_class"] == 150
    assert g1["metallurgy"] == "ASTM_A182_F316"
    assert "ASME B16.20" in g1["standards"]


# ==============================================================================
# TC-PR2-06: Line Pipe Extraction
# ==============================================================================


def test_line_pipe_extraction():
    """TC-PR2-06: Seamless line pipe and wall schedule extraction."""
    p1 = default_extractor.extract("PIPE SMLS 4IN SCH40 A106 GR B API 5L")
    assert p1["item_class"] == "LINE_PIPE"
    assert p1["size_inch"] == 4.0
    assert p1["metallurgy"] == "ASTM_A106_GR_B"
    assert "API 5L" in p1["standards"]
    assert p1["parametric_attributes"].get("schedule") == "SCH 40"


# ==============================================================================
# Standards & End Connections
# ==============================================================================


def test_standards_extraction():
    """Extracts ASME, API, and NACE engineering standards."""
    text = 'BALL VALVE 2" 150# ASTM A105 API 6D ASME B16.5 ASME B16.34 NACE MR0175'
    attrs = default_extractor.extract(text)
    assert "API 6D" in attrs["standards"]
    assert "ASME B16.5" in attrs["standards"]
    assert "ASME B16.34" in attrs["standards"]
    assert "NACE MR0175" in attrs["standards"]
    assert attrs["parametric_attributes"].get("sour_service") is True


# ==============================================================================
# Taxonomy Cross-Walk (Shell MESC, UNSPSC, GeM)
# ==============================================================================


def test_taxonomy_cross_walk():
    """Verifies canonical and algorithmic mapping to MESC, UNSPSC, and GeM."""
    # 1. 2" Class 150 Ball Valve
    t1 = default_taxonomy_mapper.map_taxonomy(
        {
            "item_class": "BALL_VALVE",
            "size_inch": 2.0,
            "pressure_class": 150,
        }
    )
    assert t1["shell_mesc_code"] == "74.16.01.015.1"
    assert t1["mesc_spe_spec"] == "SPE 77/300"
    assert t1["unspsc_code"] == "40141607"
    assert t1["gem_category_id"] == "GeM-CAT-VLV-BALL-01"

    # 2. 4" Class 300 Gate Valve
    t2 = default_taxonomy_mapper.map_taxonomy(
        {
            "item_class": "GATE_VALVE",
            "size_inch": 4.0,
            "pressure_class": 300,
        }
    )
    assert t2["shell_mesc_code"] == "74.12.03.020.1"
    assert t2["mesc_spe_spec"] == "SPE 77/200"
    assert t2["unspsc_code"] == "40141611"
    assert t2["gem_category_id"] == "GeM-CAT-VLV-GATE-02"

    # 3. 6" Class 150 Flange
    t3 = default_taxonomy_mapper.map_taxonomy(
        {
            "item_class": "WELD_NECK_FLANGE",
            "size_inch": 6.0,
            "pressure_class": 150,
        }
    )
    assert t3["shell_mesc_code"] == "76.22.11.025.1"
    assert t3["unspsc_code"] == "40141720"
    assert t3["gem_category_id"] == "GeM-CAT-FLG-WNRF-01"

    # 4. 2" Class 150 Gasket
    t4 = default_taxonomy_mapper.map_taxonomy(
        {
            "item_class": "SPIRAL_WOUND_GASKET",
            "size_inch": 2.0,
            "pressure_class": 150,
        }
    )
    assert t4["shell_mesc_code"] == "76.44.02.015.1"
    assert t4["unspsc_code"] == "31181502"
    assert t4["gem_category_id"] == "GeM-CAT-GSK-SPWD-01"

    # 5. 4" Seamless Line Pipe
    t5 = default_taxonomy_mapper.map_taxonomy(
        {
            "item_class": "LINE_PIPE",
            "size_inch": 4.0,
            "pressure_class": None,
        }
    )
    assert t5["shell_mesc_code"] == "74.00.01.020.1"
    assert t5["unspsc_code"] == "40171501"
    assert t5["gem_category_id"] == "GeM-CAT-PIP-SMLS-01"


# ==============================================================================
# Multi-CPSE Real-World Benchmark Dataset (Target Accuracy >= 95.0%)
# ==============================================================================

REAL_CPSE_FIXTURES = [
    # IOCL Mathura Refinery
    {
        "raw": 'VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D',
        "expected": {"item_class": "BALL_VALVE", "size_inch": 2.0, "pressure_class": 150, "metallurgy": "ASTM_A105"},
    },
    # ONGC Hazira Gas Processing Plant
    {
        "raw": "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
        "expected": {"item_class": "BALL_VALVE", "size_inch": 2.0, "pressure_class": 150, "metallurgy": "ASTM_A105"},
    },
    # BPCL Mumbai Refinery
    {
        "raw": "2IN 150LB BALL VALVE FLANGED WCB/A105 TRIM 316",
        "expected": {"item_class": "BALL_VALVE", "size_inch": 2.0, "pressure_class": 150, "metallurgy": "ASTM_A105"},
    },
    # HPCL Vizag Refinery
    {
        "raw": "VALVE BALL FLG 2INCH 150# CS ASTM A-105",
        "expected": {"item_class": "BALL_VALVE", "size_inch": 2.0, "pressure_class": 150, "metallurgy": "ASTM_A105"},
    },
    # GAIL Vijaipur Pipeline Hub
    {
        "raw": "BALL VLV, 2 IN, ASME 150, FLANGED, CS BODY",
        "expected": {"item_class": "BALL_VALVE", "size_inch": 2.0, "pressure_class": 150, "metallurgy": "CARBON_STEEL"},
    },
    # IOCL Panipat Refinery - Gate Valve
    {
        "raw": 'GATE VALVE 4" 300# FLANGED RF CAST STEEL A216 WCB API 600',
        "expected": {
            "item_class": "GATE_VALVE",
            "size_inch": 4.0,
            "pressure_class": 300,
            "metallurgy": "ASTM_A216_WCB",
        },
    },
    # ONGC Ankleshwar Asset - Globe Valve
    {
        "raw": 'GLB VLV 1-1/2" 800# SW FS A105 BS 5352',
        "expected": {"item_class": "GLOBE_VALVE", "size_inch": 1.5, "pressure_class": 800, "metallurgy": "ASTM_A105"},
    },
    # NRL Numaligarh Refinery - Check Valve
    {
        "raw": "CHECK VALVE DUAL PLATE DN 100 PN 40 FLANGED WCB",
        "expected": {
            "item_class": "CHECK_VALVE",
            "size_inch": 4.0,
            "pressure_class": 300,
            "metallurgy": "ASTM_A216_WCB",
        },
    },
    # MRPL Mangalore - Flange
    {
        "raw": "FLANGE WELD NECK 6 INCH CLASS 150 SCH 40 ASTM A105 ASME B16.5",
        "expected": {
            "item_class": "WELD_NECK_FLANGE",
            "size_inch": 6.0,
            "pressure_class": 150,
            "metallurgy": "ASTM_A105",
        },
    },
    # CPCL Chennai - Spiral Wound Gasket
    {
        "raw": 'GSK SPWD 2" 150# SS316 / GRAPHITE ASME B16.20',
        "expected": {
            "item_class": "SPIRAL_WOUND_GASKET",
            "size_inch": 2.0,
            "pressure_class": 150,
            "metallurgy": "ASTM_A182_F316",
        },
    },
    # EIL Standard Spec - Seamless Pipe
    {
        "raw": 'PIPE SMLS 4" SCH 40 BE ASTM A106 GR B API 5L',
        "expected": {"item_class": "LINE_PIPE", "size_inch": 4.0, "metallurgy": "ASTM_A106_GR_B"},
    },
    # OIL Duliajan - Low Temp Valve
    {
        "raw": "VALVE BALL 3IN 300# FLANGED ASTM A350 LF2 NACE MR0175",
        "expected": {
            "item_class": "BALL_VALVE",
            "size_inch": 3.0,
            "pressure_class": 300,
            "metallurgy": "ASTM_A350_LF2",
        },
    },
]


def test_multi_cpse_benchmark_accuracy():
    """
    Verification Gate: Multi-CPSE Benchmark Extraction Accuracy >= 95.0%.
    Evaluates key physical parameters (item_class, size, pressure, metallurgy).
    """
    total_fields = 0
    matched_fields = 0

    for fixture in REAL_CPSE_FIXTURES:
        raw_text = fixture["raw"]
        expected = fixture["expected"]
        attrs = default_extractor.extract(raw_text)

        for field, exp_val in expected.items():
            total_fields += 1
            act_val = attrs.get(field)
            if act_val == exp_val:
                matched_fields += 1
            else:
                print(f"[BENCHMARK MISMATCH] Fixture: '{raw_text}' | Field: {field} | Exp: {exp_val} | Act: {act_val}")

    accuracy = (matched_fields / total_fields) * 100.0
    print(f"\n[BENCHMARK RESULT] Multi-CPSE Extraction Accuracy: {accuracy:.2f}% ({matched_fields}/{total_fields})")
    assert accuracy >= 95.0, f"Extraction accuracy {accuracy:.2f}% below required 95.0% threshold"


# ==============================================================================
# FastAPI Endpoints Integration Verification
# ==============================================================================


def test_api_normalize_text(client):
    """Test POST /api/v1/normalize/text endpoint."""
    payload = {"raw_text": "VLV BL FLGD 50MM NB 150# CS A105 API 6D"}
    response = client.post("/api/v1/normalize/text", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["raw_text"] == payload["raw_text"]
    attrs = data["attributes"]
    assert attrs["item_class"] == "BALL_VALVE"
    assert attrs["size_inch"] == 2.0
    assert attrs["pressure_class"] == 150
    assert attrs["metallurgy"] == "ASTM_A105"
    assert "API 6D" in attrs["standards"]

    tax = data["taxonomy"]
    assert tax["shell_mesc_code"] == "74.16.01.015.1"
    assert tax["unspsc_code"] == "40141607"
    assert tax["gem_category_id"] == "GeM-CAT-VLV-BALL-01"


def test_api_normalize_batch(client):
    """Test POST /api/v1/normalize/batch endpoint."""
    payload = {
        "items": [
            {"raw_text": "VLV BL FLGD 50MM NB 150# CS A105"},
            {"raw_text": "FLG WNRF 6IN 150# SCH40 A105"},
            {"raw_text": "PIPE SMLS 4IN SCH40 A106 GR B"},
        ]
    }
    response = client.post("/api/v1/normalize/batch", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["total_processed"] == 3
    assert len(data["results"]) == 3
    assert data["results"][0]["attributes"]["item_class"] == "BALL_VALVE"
    assert data["results"][1]["attributes"]["item_class"] == "WELD_NECK_FLANGE"
    assert data["results"][2]["attributes"]["item_class"] == "LINE_PIPE"
