# ponytail: High-throughput catalog ingestion pipeline with status tracking and KPI summaries.
# Upgrade path: offload heavy 100k+ line processing to Redis/ARQ workers with SSE streaming.

import csv
import io
import json
import uuid
from datetime import datetime, timezone
from typing import Dict, List

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.app.schemas.ingest import (
    BatchIngestRequest,
    IngestJobStatusResponse,
    IngestSummaryResponse,
    RawMaterialIn,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.hybrid_matcher import default_matcher

router = APIRouter()

# In-memory storage for jobs and summaries
_JOB_STATUS_STORE: Dict[str, IngestJobStatusResponse] = {}
_JOB_SUMMARY_STORE: Dict[str, IngestSummaryResponse] = {}
_INGESTED_RECORDS: Dict[str, List[Dict]] = {}

CANONICAL_SEED_RECORDS = [
    {
        "raw_description": "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
        "canonical_code": "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    },
    {
        "raw_description": "FLANGE WELD NECK 6 INCH 300# RF CS ASTM A105 ASME B16.5",
        "canonical_code": "ONMC-PIPE-FLG-WNF-006-300-A105-4D1E",
    },
    {
        "raw_description": "VALVE GATE FLANGED 4 INCH 150# CS ASTM A216 WCB ASME B16.34",
        "canonical_code": "ONMC-MECH-VLV-GAT-004-150-A216-7A3C",
    },
    {
        "raw_description": "GASKET SPIRAL WOUND 3 INCH 150# SS316 GRAPHITE ASME B16.20",
        "canonical_code": "ONMC-STAT-GSK-SPW-003-150-SS316-2F88",
    },
    {
        "raw_description": "VALVE CHECK SWING 2 INCH 150# CS ASTM A105 API 6D",
        "canonical_code": "ONMC-MECH-VLV-CHK-002-150-A105-1C9A",
    },
    {
        "raw_description": "PIPE LINE SEAMLESS 8 INCH SCH 40 CS ASTM A106 GR B API 5L",
        "canonical_code": "ONMC-PIPE-PIP-SML-008-040-A106-5E2B",
    },
]


def _process_items_sync(job_id: str, org_code: str, items: List[RawMaterialIn]) -> IngestSummaryResponse:
    total_rows = len(items)
    auto_approved = 0
    review_required = 0
    novel_count = 0
    records = []

    for item in items:
        attrs = default_extractor.extract(item.raw_description)

        best_match = None
        best_score = -1.0

        for seed in CANONICAL_SEED_RECORDS:
            eval_res = default_matcher.evaluate_pair(item.raw_description, seed["raw_description"])
            if eval_res.confidence_score > best_score:
                best_score = eval_res.confidence_score
                best_match = eval_res

        if best_match and best_match.gate_result.passed and best_score >= 0.92:
            status = "AUTO_APPROVED"
            auto_approved += 1
        elif best_match and (0.70 <= best_score < 0.92 or not best_match.gate_result.passed):
            status = "PENDING_REVIEW"
            review_required += 1
        else:
            status = "NOVEL_ITEM"
            novel_count += 1

        records.append(
            {
                "source_item_code": item.source_item_code,
                "raw_description": item.raw_description,
                "organization_code": org_code,
                "plant_location": item.plant_location,
                "extracted_attributes": attrs,
                "status": status,
                "best_match": best_match,
            }
        )

    _INGESTED_RECORDS[job_id] = records

    auto_pct = round((auto_approved / total_rows) * 100, 2) if total_rows > 0 else 0.0
    review_pct = round((review_required / total_rows) * 100, 2) if total_rows > 0 else 0.0
    novel_pct = round((novel_count / total_rows) * 100, 2) if total_rows > 0 else 0.0
    # Estimated savings: ₹35,000 per auto-approved duplicate consolidation
    savings_inr = auto_approved * 35000.0

    completed_time = datetime.now(timezone.utc)

    status_resp = IngestJobStatusResponse(
        job_id=job_id,
        status="COMPLETED",
        current_stage="Stage 5: Vector Search & ASME Safety Gate Evaluation Complete",
        progress_pct=100,
        total_rows=total_rows,
        processed_rows=total_rows,
        started_at=completed_time,
        completed_at=completed_time,
    )
    _JOB_STATUS_STORE[job_id] = status_resp

    summary_resp = IngestSummaryResponse(
        job_id=job_id,
        organization_code=org_code,
        total_rows=total_rows,
        auto_approved_count=auto_approved,
        auto_approved_pct=auto_pct,
        review_required_count=review_required,
        review_required_pct=review_pct,
        novel_count=novel_count,
        novel_pct=novel_pct,
        estimated_duplicate_savings_inr=savings_inr,
        completed_at=completed_time,
    )
    _JOB_SUMMARY_STORE[job_id] = summary_resp
    return summary_resp


@router.post("/batch", response_model=IngestSummaryResponse, summary="Ingest batch of CPSE catalog items")
async def ingest_batch(req: BatchIngestRequest):
    """
    Synchronously ingests and harmonizes a structured batch of legacy CPSE materials.
    Runs NLP normalization, attribute extraction, and ASME safety gate matching.
    """
    job_id = str(uuid.uuid4())
    summary = _process_items_sync(job_id, req.organization_code, req.items)
    return summary


@router.post("/upload", response_model=IngestSummaryResponse, summary="Upload CSV/JSON catalog file")
async def upload_catalog_file(
    file: UploadFile = File(...),
    organization_code: str = "IOCL",
):
    """
    Parses and processes an uploaded CSV or JSON procurement catalog file.
    """
    job_id = str(uuid.uuid4())
    content = await file.read()
    filename = file.filename.lower() if file.filename else "upload.csv"
    items: List[RawMaterialIn] = []

    if filename.endswith(".json"):
        try:
            data = json.loads(content.decode("utf-8"))
            raw_list = data if isinstance(data, list) else data.get("items", [])
            for r in raw_list:
                items.append(
                    RawMaterialIn(
                        source_item_code=str(r.get("source_item_code", f"ITEM-{uuid.uuid4().hex[:6]}")),
                        plant_code=str(r.get("plant_code", "1001")),
                        plant_location=str(r.get("plant_location", "Mathura, UP")),
                        raw_description=str(r.get("raw_description", r.get("description", ""))),
                        unit_price=float(r.get("unit_price", 0.0)),
                        currency=str(r.get("currency", "INR")),
                        stock_quantity=int(r.get("stock_quantity", 1)),
                        uom=str(r.get("uom", "EA")),
                    )
                )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse JSON file: {str(e)}")
    else:
        # Default CSV parser
        try:
            text = content.decode("utf-8", errors="replace")
            reader = csv.DictReader(io.StringIO(text))
            for r in reader:
                desc = r.get("raw_description") or r.get("description") or r.get("MAKTX") or r.get("desc")
                if not desc:
                    continue
                items.append(
                    RawMaterialIn(
                        source_item_code=r.get("source_item_code") or r.get("MATNR") or f"ITEM-{uuid.uuid4().hex[:6]}",
                        plant_code=r.get("plant_code") or r.get("WERKS") or "1001",
                        plant_location=r.get("plant_location") or "Refinery Site",
                        raw_description=desc,
                        unit_price=float(r.get("unit_price", 0.0) or 0.0),
                        currency=r.get("currency") or "INR",
                        stock_quantity=int(r.get("stock_quantity", 1) or 1),
                        uom=r.get("uom") or "EA",
                    )
                )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to parse CSV file: {str(e)}")

    if not items:
        raise HTTPException(status_code=400, detail="Uploaded file contains no valid material descriptions.")

    summary = _process_items_sync(job_id, organization_code, items)
    return summary


@router.get("/status/{job_id}", response_model=IngestJobStatusResponse, summary="Get ingestion job status")
async def get_ingest_status(job_id: str):
    """
    Returns progress and status of a catalog ingestion job.
    """
    if job_id not in _JOB_STATUS_STORE:
        raise HTTPException(status_code=404, detail=f"Ingestion job {job_id} not found.")
    return _JOB_STATUS_STORE[job_id]


@router.get("/summary/{job_id}", response_model=IngestSummaryResponse, summary="Get ingestion KPI summary")
async def get_ingest_summary(job_id: str):
    """
    Returns post-ingestion rationalization KPIs for the specified job.
    """
    if job_id not in _JOB_SUMMARY_STORE:
        raise HTTPException(status_code=404, detail=f"Ingestion summary for {job_id} not found.")
    return _JOB_SUMMARY_STORE[job_id]
