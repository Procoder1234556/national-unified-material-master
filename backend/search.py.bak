# ponytail: Hybrid search engine for National Search Before Buy pre-procurement discovery.
# Upgrade path: add raw pgvector SQL query with HNSW cosine distance when Postgres is enabled.

from typing import List

from fastapi import APIRouter

from backend.app.schemas.search import (
    NationalSearchItem,
    NationalSearchRequest,
    NationalSearchResponse,
    NationalStockItem,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.hybrid_matcher import default_matcher

router = APIRouter()

# Canonical master catalog covering primary MoPNG CPSE commodities
CANONICAL_MASTER_ITEMS = [
    {
        "onmc_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
        "canonical_description": "VALVE, BALL, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, TRIM 316, API 6D",
        "item_class": "BALL_VALVE",
        "size_inch": 2.0,
        "size_mm": 50,
        "pressure_class": 150,
        "metallurgy": "ASTM_A105",
        "end_connection": "FLANGED_RF",
        "shell_mesc_code": "74.16.01.015.1",
        "mesc_spe_spec": "SPE 77/300",
        "unspsc_code": "40141607",
        "gem_category_id": "GeM-CAT-VLV-BALL-01",
        "stock_distribution": [
            NationalStockItem(
                organization_code="ONGC",
                organization_name="Oil & Natural Gas Corporation",
                plant_code="1100",
                plant_location="Hazira Gas Processing Complex, Gujarat",
                available_stock=14,
                unit_price=28500.0,
                lead_time_days=2,
            ),
            NationalStockItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1002",
                plant_location="Mathura Refinery, Uttar Pradesh",
                available_stock=8,
                unit_price=29200.0,
                lead_time_days=3,
            ),
            NationalStockItem(
                organization_code="BPCL",
                organization_name="Bharat Petroleum Corporation Ltd",
                plant_code="2001",
                plant_location="Mumbai Refinery, Maharashtra",
                available_stock=5,
                unit_price=28900.0,
                lead_time_days=2,
            ),
        ],
    },
    {
        "onmc_code": "ONMC-PIPE-FLG-WNF-006-300-A105-4D1E",
        "canonical_description": "FLANGE, WELD NECK, 6 INCH, CLASS 300, RAISED FACE, SCHEDULE 40, ASTM A105, ASME B16.5",
        "item_class": "WELD_NECK_FLANGE",
        "size_inch": 6.0,
        "size_mm": 150,
        "pressure_class": 300,
        "metallurgy": "ASTM_A105",
        "end_connection": "WELD_NECK",
        "shell_mesc_code": "76.12.30.060.1",
        "mesc_spe_spec": "SPE 76/100",
        "unspsc_code": "40141708",
        "gem_category_id": "GeM-CAT-FLG-WNF-02",
        "stock_distribution": [
            NationalStockItem(
                organization_code="HPCL",
                organization_name="Hindustan Petroleum Corporation Ltd",
                plant_code="3001",
                plant_location="Visakh Refinery, Andhra Pradesh",
                available_stock=32,
                unit_price=14500.0,
                lead_time_days=3,
            ),
            NationalStockItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1005",
                plant_location="Panipat Refinery, Haryana",
                available_stock=18,
                unit_price=14800.0,
                lead_time_days=2,
            ),
        ],
    },
    {
        "onmc_code": "ONMC-MECH-VLV-GAT-004-150-A216-7A3C",
        "canonical_description": "VALVE, GATE, 4 INCH, CLASS 150, FLANGED RF, BODY ASTM A216 WCB, TRIM 13CR, API 600",
        "item_class": "GATE_VALVE",
        "size_inch": 4.0,
        "size_mm": 100,
        "pressure_class": 150,
        "metallurgy": "ASTM_A216_WCB",
        "end_connection": "FLANGED_RF",
        "shell_mesc_code": "74.12.02.040.1",
        "mesc_spe_spec": "SPE 77/100",
        "unspsc_code": "40141613",
        "gem_category_id": "GeM-CAT-VLV-GATE-01",
        "stock_distribution": [
            NationalStockItem(
                organization_code="GAIL",
                organization_name="GAIL (India) Limited",
                plant_code="4001",
                plant_location="Vijaipur Petrochemical Complex, MP",
                available_stock=11,
                unit_price=42000.0,
                lead_time_days=4,
            ),
            NationalStockItem(
                organization_code="ONGC",
                organization_name="Oil & Natural Gas Corporation",
                plant_code="1102",
                plant_location="Uran Plant, Maharashtra",
                available_stock=6,
                unit_price=41500.0,
                lead_time_days=2,
            ),
        ],
    },
    {
        "onmc_code": "ONMC-STAT-GSK-SPW-003-150-SS316-2F88",
        "canonical_description": "GASKET, SPIRAL WOUND, 3 INCH, CLASS 150, WINDING SS316, FILLER GRAPHITE, ASME B16.20",
        "item_class": "SPIRAL_WOUND_GASKET",
        "size_inch": 3.0,
        "size_mm": 80,
        "pressure_class": 150,
        "metallurgy": "STAINLESS_STEEL_316",
        "end_connection": "RAISED_FACE",
        "shell_mesc_code": "60.40.10.030.1",
        "mesc_spe_spec": "SPE 85/100",
        "unspsc_code": "31181502",
        "gem_category_id": "GeM-CAT-GSK-SPW-01",
        "stock_distribution": [
            NationalStockItem(
                organization_code="BPCL",
                organization_name="Bharat Petroleum Corporation Ltd",
                plant_code="2002",
                plant_location="Kochi Refinery, Kerala",
                available_stock=120,
                unit_price=1200.0,
                lead_time_days=1,
            ),
            NationalStockItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1001",
                plant_location="Gujarat Refinery, Vadodara",
                available_stock=95,
                unit_price=1180.0,
                lead_time_days=2,
            ),
        ],
    },
    {
        "onmc_code": "ONMC-MECH-VLV-CHK-002-150-A105-1C9A",
        "canonical_description": "VALVE, CHECK, SWING, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, BS 1868",
        "item_class": "CHECK_VALVE",
        "size_inch": 2.0,
        "size_mm": 50,
        "pressure_class": 150,
        "metallurgy": "ASTM_A105",
        "end_connection": "FLANGED_RF",
        "shell_mesc_code": "74.20.01.020.1",
        "mesc_spe_spec": "SPE 77/200",
        "unspsc_code": "40141611",
        "gem_category_id": "GeM-CAT-VLV-CHK-01",
        "stock_distribution": [
            NationalStockItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1004",
                plant_location="Paradip Refinery, Odisha",
                available_stock=24,
                unit_price=22000.0,
                lead_time_days=3,
            ),
        ],
    },
    {
        "onmc_code": "ONMC-PIPE-PIP-SML-008-040-A106-5E2B",
        "canonical_description": "PIPE, LINE, SEAMLESS, 8 INCH, SCHEDULE 40, CARBON STEEL ASTM A106 GR B, API 5L",
        "item_class": "LINE_PIPE",
        "size_inch": 8.0,
        "size_mm": 200,
        "pressure_class": 40,
        "metallurgy": "ASTM_A106_GR_B",
        "end_connection": "BEVELED",
        "shell_mesc_code": "27.10.08.040.1",
        "mesc_spe_spec": "SPE 76/200",
        "unspsc_code": "40171501",
        "gem_category_id": "GeM-CAT-PIP-SML-01",
        "stock_distribution": [
            NationalStockItem(
                organization_code="ONGC",
                organization_name="Oil & Natural Gas Corporation",
                plant_code="1103",
                plant_location="Mehsana Asset, Gujarat",
                available_stock=450,
                unit_price=18500.0,
                lead_time_days=5,
            ),
            NationalStockItem(
                organization_code="OIL",
                organization_name="Oil India Limited",
                plant_code="5001",
                plant_location="Duliajan Field Headquarters, Assam",
                available_stock=180,
                unit_price=18900.0,
                lead_time_days=7,
            ),
        ],
    },
]


@router.post("", response_model=NationalSearchResponse, summary="Execute Search Before Buy query")
async def national_search(req: NationalSearchRequest):
    """
    Executes hybrid pre-procurement discovery across national CPSE inventory.
    Filters by physical parameters and computes semantic + lexical similarity.
    """
    query_attrs = default_extractor.extract(req.query)
    results: List[NationalSearchItem] = []

    for master in CANONICAL_MASTER_ITEMS:
        # Check explicit filter constraints
        if req.item_class and master["item_class"].lower() != req.item_class.lower():
            continue
        if req.pressure_class and master["pressure_class"] != req.pressure_class:
            continue
        if req.size_inch and abs(float(master["size_inch"] or 0) - float(req.size_inch)) > 0.01:
            continue

        eval_res = default_matcher.evaluate_pair(req.query, master["canonical_description"])
        score = eval_res.confidence_score

        # Boost score if extracted query attributes match
        if query_attrs.get("item_class") == master["item_class"]:
            score = min(1.0, score + 0.15)
        if query_attrs.get("size_inch") == master["size_inch"]:
            score = min(1.0, score + 0.10)
        if query_attrs.get("pressure_class") == master["pressure_class"]:
            score = min(1.0, score + 0.10)

        # Include if score >= 0.20 or query matches text loosely
        query_words = set(req.query.lower().replace(",", " ").split())
        canon_words = set(master["canonical_description"].lower().replace(",", " ").split())
        overlap = len(query_words & canon_words)

        has_explicit_filter = bool(req.item_class or req.pressure_class or req.size_inch)
        if has_explicit_filter or score >= 0.20 or overlap >= 1:
            total_stock = sum(s.available_stock for s in master["stock_distribution"])
            cpse_count = len(master["stock_distribution"])

            results.append(
                NationalSearchItem(
                    onmc_code=master["onmc_code"],
                    canonical_description=master["canonical_description"],
                    item_class=master["item_class"],
                    size_inch=master["size_inch"],
                    size_mm=master["size_mm"],
                    pressure_class=master["pressure_class"],
                    metallurgy=master["metallurgy"],
                    end_connection=master["end_connection"],
                    shell_mesc_code=master["shell_mesc_code"],
                    mesc_spe_spec=master["mesc_spe_spec"],
                    unspsc_code=master["unspsc_code"],
                    gem_category_id=master["gem_category_id"],
                    similarity_score=round(score, 4),
                    total_national_stock=total_stock,
                    participating_cpse_count=cpse_count,
                    stock_distribution=master["stock_distribution"],
                )
            )

    # Sort results by similarity score descending
    results.sort(key=lambda x: x.similarity_score, reverse=True)
    results = results[: req.limit]

    return NationalSearchResponse(
        query=req.query,
        total_matches=len(results),
        results=results,
    )
