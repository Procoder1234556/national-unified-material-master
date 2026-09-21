# ponytail: Pydantic schemas for catalog batch upload, job progress, and KPI summaries.
# Upgrade path: add multi-part chunked upload and parquet binary streaming.

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class RawMaterialIn(BaseModel):
    """Raw material line item from CPSE catalog dump."""

    source_item_code: str = Field(..., max_length=64, description="Legacy ERP part number, e.g. SAP MATNR")
    plant_code: str = Field(..., max_length=32, description="Plant code, e.g. WERKS 1100")
    plant_location: str = Field(..., max_length=128, description="Geographic location of plant")
    raw_description: str = Field(..., min_length=3, description="Unstructured description, e.g. MAKTX")
    unit_price: float = Field(default=0.0, ge=0.0)
    currency: str = Field(default="INR", max_length=8)
    stock_quantity: int = Field(default=0, ge=0)
    uom: str = Field(default="EA", max_length=16)


class BatchIngestRequest(BaseModel):
    """Batch ingestion payload for CPSE catalog import."""

    organization_code: str = Field(..., description="CPSE enterprise code: IOCL, ONGC, BPCL, HPCL, GAIL, etc.")
    items: List[RawMaterialIn] = Field(..., min_length=1, description="List of raw material line items")


class IngestJobStatusResponse(BaseModel):
    """Async ingestion pipeline progress response."""

    job_id: str
    status: str = Field(..., description="'QUEUED', 'PROCESSING', 'COMPLETED', 'FAILED'")
    current_stage: str = Field(..., description="Active pipeline stage description")
    progress_pct: int = Field(..., ge=0, le=100)
    total_rows: int
    processed_rows: int
    started_at: datetime
    completed_at: Optional[datetime] = None


class IngestSummaryResponse(BaseModel):
    """Post-ingestion KPI analytics for catalog rationalization."""

    job_id: str
    organization_code: str
    total_rows: int
    auto_approved_count: int
    auto_approved_pct: float
    review_required_count: int
    review_required_pct: float
    novel_count: int
    novel_pct: float
    estimated_duplicate_savings_inr: float
    completed_at: datetime
