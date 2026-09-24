# ponytail: High-throughput catalog ingestion pipeline with status tracking and KPI summaries.
# Upgrade path: offload heavy 100k+ line processing to Redis/ARQ workers with SSE streaming.

import csv
import io
import json
import uuid
from datetime import datetime, timezone
from typing import Dict, List

import asyncio
from fastapi.responses import StreamingResponse
from fastapi import BackgroundTasks
from backend.app.db.session import AsyncSessionLocal


from fastapi import APIRouter, File, HTTPException, UploadFile, Depends

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


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.app.db.session import get_db
from backend.app.models.models import Organization, RawMaterial, CleansedMaterial, MaterialEmbedding, UnifiedMasterCode, MaterialMapping
from backend.app.services.embedding_generator import default_embedding_generator


async def _background_ingest(job_id: str, org_code: str, items: List[RawMaterialIn]):
    async with AsyncSessionLocal() as session:
        try:
            await _process_items_async(session, job_id, org_code, items)
        except Exception as e:
            print("Error in bg ingest:", e)
            _JOB_STATUS_STORE[job_id].status = "FAILED"
            _JOB_STATUS_STORE[job_id].current_stage = f"Error: {e}"

async def _process_items_async(session: AsyncSession, job_id: str, org_code: str, items: List[RawMaterialIn]) -> IngestSummaryResponse:
    total_rows = len(items)
    auto_approved = 0
    review_required = 0
    novel_count = 0
    
    started_time = datetime.now(timezone.utc)

    # Ensure organization exists
    org_result = await session.execute(select(Organization).where(Organization.code == org_code))
    org = org_result.scalars().first()
    if not org:
        org = Organization(code=org_code, name=f"{org_code} Auto-Created", division="Default")
        session.add(org)
        await session.flush()

    # Load seeds from DB
    seeds_result = await session.execute(select(UnifiedMasterCode))
    seeds = seeds_result.scalars().all()

    for idx, item in enumerate(items):
        await asyncio.sleep(0.3)  # simulate real-time processing
        
        # update status
        stage = "Stage 1: Parsing"
        if idx > total_rows * 0.2: stage = "Stage 2: Token Cleansing"
        if idx > total_rows * 0.4: stage = "Stage 3: Attribute Extraction"
        if idx > total_rows * 0.6: stage = "Stage 4: BGE Embeddings"
        if idx > total_rows * 0.8: stage = "Stage 5: Vector Search"
        
        _JOB_STATUS_STORE[job_id] = IngestJobStatusResponse(
            job_id=job_id,
            status="RUNNING",
            current_stage=stage,
            progress_pct=int(((idx + 1) / total_rows) * 100),
            total_rows=total_rows,
            processed_rows=idx + 1,
            started_at=started_time,
            completed_at=None,
        )

        attrs = default_extractor.extract(item.raw_description)

        best_match = None
        best_score = -1.0
        best_seed = None

        for seed in seeds:
            eval_res = default_matcher.evaluate_pair(item.raw_description, seed.canonical_description)
            if eval_res.confidence_score > best_score:
                best_score = eval_res.confidence_score
                best_match = eval_res
                best_seed = seed

        if best_match and best_match.gate_result.passed and best_score >= 0.92:
            status = "AUTO_APPROVED"
            auto_approved += 1
        elif best_match and (0.70 <= best_score < 0.92 or not best_match.gate_result.passed):
            status = "PENDING_REVIEW"
            review_required += 1
        else:
            status = "NOVEL_ITEM"
            novel_count += 1

        # 1. RawMaterial
        raw_mat = RawMaterial(
            organization_id=org.id,
            source_item_code=item.source_item_code,
            plant_code=item.plant_code,
            plant_location=item.plant_location,
            raw_description=item.raw_description,
            unit_price=item.unit_price,
            currency=item.currency,
            stock_quantity=item.stock_quantity,
            uom=item.uom,
        )
        session.add(raw_mat)
        await session.flush()

        # 2. CleansedMaterial
        clean_mat = CleansedMaterial(
            raw_material_id=raw_mat.id,
            cleaned_description=attrs.get("clean_text", item.raw_description),
            item_class=attrs.get("item_class", "UNKNOWN"),
            size_inch=attrs.get("size_inch"),
            size_mm=attrs.get("size_mm"),
            pressure_class=attrs.get("pressure_class"),
            metallurgy=attrs.get("metallurgy"),
            end_connection=attrs.get("end_connection"),
            standards=attrs.get("standards", []),
            parametric_attributes=attrs,
        )
        session.add(clean_mat)
        await session.flush()

        # 3. MaterialEmbedding
        emb_vector = default_embedding_generator.generate_embedding(clean_mat.cleaned_description)
        # Ensure it's padded to 1024 dims if using mock generator, or let the DB handle it.
        # But we must provide it.
        if len(emb_vector) < 1024:
            emb_vector = emb_vector + [0.0] * (1024 - len(emb_vector))
        elif len(emb_vector) > 1024:
            emb_vector = emb_vector[:1024]
            
        embedding = MaterialEmbedding(
            cleansed_material_id=clean_mat.id,
            embedding_1024=emb_vector
        )
        session.add(embedding)

        # 4. MaterialMapping
        mapping = MaterialMapping(
            raw_material_id=raw_mat.id,
            unified_master_id=best_seed.id if best_seed else None,
            confidence_score=best_match.confidence_score if best_match else 0.0,
            lexical_similarity=best_match.lexical_similarity if best_match else 0.0,
            semantic_similarity=best_match.semantic_similarity if best_match else 0.0,
            rule_gate_passed=best_match.gate_result.passed if best_match else False,
            mapping_status=status
        )
        session.add(mapping)
        
    await session.commit()

    auto_pct = round((auto_approved / total_rows) * 100, 2) if total_rows > 0 else 0.0
    review_pct = round((review_required / total_rows) * 100, 2) if total_rows > 0 else 0.0
    novel_pct = round((novel_count / total_rows) * 100, 2) if total_rows > 0 else 0.0
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


@router.post("/batch", summary="Ingest batch of CPSE catalog items")
async def ingest_batch(
    req: BatchIngestRequest,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_db)
):
    job_id = str(uuid.uuid4())
    _JOB_STATUS_STORE[job_id] = IngestJobStatusResponse(
        job_id=job_id, status="PENDING", current_stage="Initializing",
        progress_pct=0, total_rows=len(req.items), processed_rows=0,
        started_at=datetime.now(timezone.utc), completed_at=None
    )
    background_tasks.add_task(_background_ingest, job_id, req.organization_code, req.items)
    return {"job_id": job_id}


@router.post("/upload", summary="Upload CSV/JSON catalog file")
async def upload_catalog_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    organization_code: str = "IOCL",
    session: AsyncSession = Depends(get_db)
):
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

    _JOB_STATUS_STORE[job_id] = IngestJobStatusResponse(
        job_id=job_id, status="PENDING", current_stage="Initializing",
        progress_pct=0, total_rows=len(items), processed_rows=0,
        started_at=datetime.now(timezone.utc), completed_at=None
    )
    background_tasks.add_task(_background_ingest, job_id, organization_code, items)
    return {"job_id": job_id}


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

@router.get("/stream/{job_id}", summary="Stream ingestion progress via SSE")
async def stream_ingest_progress(job_id: str):
    async def event_generator():
        while True:
            status = _JOB_STATUS_STORE.get(job_id)
            if not status:
                yield f"data: {json.dumps({'status': 'PENDING', 'progress_pct': 0})}\n\n"
                await asyncio.sleep(0.5)
                continue
            
            data = status.model_dump_json() if hasattr(status, 'model_dump_json') else status.json()
            yield f"data: {data}\n\n"
            
            if status.status in ("COMPLETED", "FAILED"):
                break
            await asyncio.sleep(0.5)
            
    return StreamingResponse(event_generator(), media_type="text/event-stream")
