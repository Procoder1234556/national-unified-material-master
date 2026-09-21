# ponytail: Pydantic schemas for Joint Procurement Pooled Demand Engine & GeM GFR Rule 149 Tendering.
# Upgrade path: add multi-currency dynamic currency hedge modeling and reverse-auction bid tracking.

from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class CPSEDemandItem(BaseModel):
    """Annual or quarterly requisition projection for an individual CPSE installation."""

    organization_code: str
    organization_name: str
    plant_code: str
    plant_location: str
    projected_quantity: int = Field(..., gt=0)
    target_procurement_month: str = "2026-Q4"
    estimated_unit_price: float = Field(..., ge=0.0)


class DemandAggregationRequest(BaseModel):
    """Payload to aggregate multi-CPSE demand projections into a unified bulk batch."""

    onmc_code: str = Field(..., description="Target One Nation One Material Code")
    target_tender_month: str = Field(default="2026-Q4")
    demands: List[CPSEDemandItem] = Field(..., min_length=1)


class VolumeTierInfo(BaseModel):
    """Volume discount curve tier metadata."""

    min_quantity: int
    max_quantity: Optional[int]
    discount_percentage: float
    tier_label: str


class PooledBatchSummary(BaseModel):
    """Summary metrics of a pooled national tender batch."""

    batch_id: str
    onmc_code: str
    canonical_description: str
    item_class: str
    gem_category_id: str
    total_aggregate_quantity: int
    participating_org_count: int
    participating_organizations: List[str]
    baseline_unit_price: float
    baseline_total_cost_inr: float
    discount_tier_pct: float
    discounted_unit_price: float
    pooled_total_cost_inr: float
    projected_savings_inr: float
    target_tender_month: str
    gfr_rule_149_status: str
    procurement_mode: str
    status: str
    created_at: str
    demands: List[CPSEDemandItem] = Field(default_factory=list)


class PooledBatchesListResponse(BaseModel):
    """Response holding national list of pooled procurement batches and aggregate KPI metrics."""

    total_batches: int
    total_national_quantity: int
    total_baseline_cost_inr: float
    total_projected_savings_inr: float
    average_discount_pct: float
    batches: List[PooledBatchSummary] = Field(default_factory=list)


class GeMTenderPackage(BaseModel):
    """Official GeM Rule 149 compliant tender specification dossier."""

    tender_reference_number: str
    batch_id: str
    onmc_code: str
    canonical_description: str
    gem_category_id: str
    gem_category_name: str
    gfr_rule_149_threshold_clause: str
    procurement_mode: str
    total_pooled_quantity: int
    estimated_tender_value_inr: float
    projected_savings_inr: float
    discount_tier_achieved: str
    participating_cpse_allocations: List[Dict[str, Any]]
    mandatory_technical_specifications: Dict[str, Any]
    cvc_anti_cartelization_undertaking: str
    created_at: str
