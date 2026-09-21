# ponytail: Pydantic schemas for National Search Before Buy pre-procurement discovery.
# Upgrade path: add multi-attribute facet aggregation counts and geospatial radius filters.

from typing import List, Optional

from pydantic import BaseModel, Field


class NationalStockItem(BaseModel):
    """Specific stock instance across participating CPSE plants."""

    organization_code: str
    organization_name: str
    plant_code: str
    plant_location: str
    available_stock: int
    unit_price: float
    currency: str = "INR"
    lead_time_days: int = 1


class NationalSearchRequest(BaseModel):
    """Query payload for National Search Before Buy."""

    query: str = Field(..., min_length=2, description="Free text technical query or part description")
    item_class: Optional[str] = Field(None, description="Filter by class: BALL_VALVE, WELD_NECK_FLANGE, etc.")
    pressure_class: Optional[int] = Field(None, description="Filter by pressure rating: 150, 300, 600, etc.")
    size_inch: Optional[float] = Field(None, description="Filter by nominal diameter in inches")
    limit: int = Field(default=20, ge=1, le=100)


class NationalSearchItem(BaseModel):
    """Harmonized national catalog search result item."""

    onmc_code: str
    canonical_description: str
    item_class: str
    size_inch: Optional[float] = None
    size_mm: Optional[int] = None
    pressure_class: Optional[int] = None
    metallurgy: Optional[str] = None
    end_connection: Optional[str] = None
    shell_mesc_code: Optional[str] = None
    mesc_spe_spec: Optional[str] = None
    unspsc_code: Optional[str] = None
    gem_category_id: Optional[str] = None
    similarity_score: float
    total_national_stock: int
    participating_cpse_count: int
    stock_distribution: List[NationalStockItem] = Field(default_factory=list)


class NationalSearchResponse(BaseModel):
    """Search response holding matched national canonical master items."""

    query: str
    total_matches: int
    results: List[NationalSearchItem] = Field(default_factory=list)
