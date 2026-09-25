# ponytail: Joint procurement demand pooling and GeM GFR Rule 149 tender endpoints.
# Upgrade path: automated push to GeM API endpoint /gem-api/v2/tenders/draft.

from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.security import require_procurement
from backend.app.db.session import get_db
from backend.app.schemas.auth import UserSession
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
async def list_pooled_batches(session: AsyncSession = Depends(get_db)):
    """Lists all active pooled procurement batches with national aggregate savings KPIs."""
    return await default_demand_pooling_service.list_batches(session)


@router.post(
    "/aggregate", response_model=PooledBatchSummary, summary="Aggregate CPSE purchase demands into pooled tender"
)
async def aggregate_demands(
    req: DemandAggregationRequest,
    session: AsyncSession = Depends(get_db),
    _user: UserSession = Depends(require_procurement),
):
    """
    Combines individual CPSE demand projections for identical canonical ONMC materials
    and computes volume discount tier and projected INR savings.
    """
    try:
        batch = await default_demand_pooling_service.aggregate_batch(session, req)
        return batch
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get("/batches/{batch_id}", response_model=PooledBatchSummary, summary="Retrieve pooled batch details")
async def get_pooled_batch(batch_id: str, session: AsyncSession = Depends(get_db)):
    """Fetches full details of a pooled demand batch including per-CPSE quotas."""
    batch = await default_demand_pooling_service.get_batch(session, batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail=f"Pooled batch '{batch_id}' not found.")
    return batch


@router.get(
    "/batches/{batch_id}/gem-tender",
    response_model=GeMTenderPackage,
    summary="Generate GeM Rule 149 compliant tender package",
)
async def generate_gem_tender(
    batch_id: str,
    session: AsyncSession = Depends(get_db),
    _user: UserSession = Depends(require_procurement),
):
    """
    Exports an official GeM-ready tender dossier including GFR Rule 149 justification,
    per-CPSE delivery schedules, and CVC anti-cartelization undertaking.
    """
    batch = await default_demand_pooling_service.get_batch(session, batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail=f"Pooled batch '{batch_id}' not found.")

    return default_gem_engine.generate_tender_package(batch)
