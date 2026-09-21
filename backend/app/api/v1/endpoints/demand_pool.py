# ponytail: Joint procurement demand pooling and GeM GFR Rule 149 tender endpoints.
# Upgrade path: automated push to GeM API endpoint /gem-api/v2/tenders/draft.

from typing import List

from fastapi import APIRouter, HTTPException

from backend.app.api.v1.endpoints.search import CANONICAL_MASTER_ITEMS
from backend.app.schemas.demand_pool import (
    DemandAggregationRequest,
    GeMTenderPackage,
    PooledBatchesListResponse,
    PooledBatchSummary,
    VolumeTierInfo,
)
from backend.app.services.demand_pooling_service import default_demand_pooling_service
from backend.app.services.gem_compliance import default_gem_engine

router = APIRouter()


@router.get("/tiers", response_model=List[VolumeTierInfo], summary="Get volume discount scale tiers")
async def get_discount_tiers():
    """Returns official MoPNG volume discount tiers (8.0% to 16.0%)."""
    return default_demand_pooling_service.DISCOUNT_TIERS


@router.get(
    "/batches", response_model=PooledBatchesListResponse, summary="List national pooled procurement tender batches"
)
async def list_pooled_batches():
    """Lists all active pooled procurement batches with national aggregate savings KPIs."""
    return default_demand_pooling_service.list_batches()


@router.post(
    "/aggregate", response_model=PooledBatchSummary, summary="Aggregate CPSE purchase demands into pooled tender"
)
async def aggregate_demands(req: DemandAggregationRequest):
    """
    Combines individual CPSE demand projections for identical canonical ONMC materials
    and computes volume discount tier and projected INR savings.
    """
    matched_master = next((m for m in CANONICAL_MASTER_ITEMS if m["onmc_code"] == req.onmc_code), None)
    try:
        batch = default_demand_pooling_service.aggregate_batch(req, item_details=matched_master)
        return batch
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get("/batches/{batch_id}", response_model=PooledBatchSummary, summary="Retrieve pooled batch details")
async def get_pooled_batch(batch_id: str):
    """Fetches full details of a pooled demand batch including per-CPSE quotas."""
    batch = default_demand_pooling_service.get_batch(batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail=f"Pooled batch '{batch_id}' not found.")
    return batch


@router.get(
    "/batches/{batch_id}/gem-tender",
    response_model=GeMTenderPackage,
    summary="Generate GeM Rule 149 compliant tender package",
)
async def generate_gem_tender(batch_id: str):
    """
    Exports an official GeM-ready tender dossier including GFR Rule 149 justification,
    per-CPSE delivery schedules, and CVC anti-cartelization undertaking.
    """
    batch = default_demand_pooling_service.get_batch(batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail=f"Pooled batch '{batch_id}' not found.")

    return default_gem_engine.generate_tender_package(batch)
