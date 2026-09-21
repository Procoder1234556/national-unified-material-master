# ponytail: Demand pooling aggregator computing volume discount savings (8% to 16% tiers) for joint CPSE procurement.
# Upgrade path: add multi-year cyclical demand smoothing and dynamic supplier quotation ingestion.

import uuid
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

from backend.app.schemas.demand_pool import (
    CPSEDemandItem,
    DemandAggregationRequest,
    PooledBatchesListResponse,
    PooledBatchSummary,
    VolumeTierInfo,
)
from backend.app.services.taxonomy_mapper import default_taxonomy_mapper


class DemandPoolingService:
    """
    Aggregates national purchase projections across CPSEs (IOCL, ONGC, BPCL, HPCL, GAIL, etc.)
    into unified joint procurement tenders, calculating volume discounts per MoPNG scale curves.
    """

    # Volume Discount Tiers per IMPLEMENTATION_PLAN.md Phase 5 (8% to 16% tiers)
    DISCOUNT_TIERS: List[VolumeTierInfo] = [
        VolumeTierInfo(
            min_quantity=5000,
            max_quantity=None,
            discount_percentage=0.160,
            tier_label="Tier 4: Mega National Scale (16.0%)",
        ),
        VolumeTierInfo(
            min_quantity=2500,
            max_quantity=4999,
            discount_percentage=0.142,
            tier_label="Tier 3: Multi-CPSE Bulk (14.2%)",
        ),
        VolumeTierInfo(
            min_quantity=1000,
            max_quantity=2499,
            discount_percentage=0.115,
            tier_label="Tier 2: Regional Consortium (11.5%)",
        ),
        VolumeTierInfo(
            min_quantity=500,
            max_quantity=999,
            discount_percentage=0.080,
            tier_label="Tier 1: Joint Tender Minimum (8.0%)",
        ),
        VolumeTierInfo(
            min_quantity=0,
            max_quantity=499,
            discount_percentage=0.000,
            tier_label="Baseline: Standalone Purchase (0.0%)",
        ),
    ]

    def __init__(self):
        self._batches: Dict[str, PooledBatchSummary] = {}
        self._seed_default_batches()

    def get_discount_tier(self, total_quantity: int) -> Tuple[float, str]:
        """
        Determines the discount rate and tier description based on total pooled volume.
        """
        for tier in self.DISCOUNT_TIERS:
            if total_quantity >= tier.min_quantity:
                return tier.discount_percentage, tier.tier_label
        return 0.0, "Baseline: Standalone Purchase (0.0%)"

    def calculate_pooled_savings(self, quantities: List[int], unit_price: float) -> Tuple[int, float, float]:
        """
        Computes pooled demand quantity, discount percentage, and total INR savings.
        Direct programmatic equivalent of verify_poc_and_tests.py loop engine specification.
        """
        total_qty = sum(quantities)
        discount_pct, _ = self.get_discount_tier(total_qty)
        baseline_cost = total_qty * unit_price
        savings_inr = baseline_cost * discount_pct
        return total_qty, discount_pct, round(savings_inr, 2)

    def determine_gfr_status(self, estimated_cost_inr: float) -> Tuple[str, str]:
        """
        Evaluates GFR Rule 149 public procurement threshold compliance.
        - <= 50,000 INR: Direct Purchase
        - 50,001 to 5,000,000 INR: L1 Comparison
        - > 5,000,000 INR: Mandatory Online Bidding / Reverse Auction
        """
        if estimated_cost_inr <= 50000.0:
            return "RULE_149_COMPLIANT", "DIRECT_PURCHASE"
        elif estimated_cost_inr <= 5000000.0:
            return "RULE_149_COMPLIANT", "L1_COMPARISON_REQUIRED"
        else:
            return "RULE_149_COMPLIANT", "MANDATORY_BIDDING_REVERSE_AUCTION"

    def aggregate_batch(self, req: DemandAggregationRequest, item_details: Optional[Dict] = None) -> PooledBatchSummary:
        """
        Aggregates individual CPSE requisition projections into a formal pooled batch.
        """
        total_qty = sum(d.projected_quantity for d in req.demands)
        if not req.demands:
            raise ValueError("At least one CPSE demand projection is required to pool demand.")

        # Baseline unit price (weighted average or first item price)
        total_baseline = sum(d.projected_quantity * d.estimated_unit_price for d in req.demands)
        unit_price = total_baseline / total_qty if total_qty > 0 else 0.0

        discount_pct, tier_label = self.get_discount_tier(total_qty)
        projected_savings = round(total_baseline * discount_pct, 2)
        pooled_total = round(total_baseline - projected_savings, 2)
        discounted_unit = round(unit_price * (1.0 - discount_pct), 2)

        participating_orgs = sorted(list(set(d.organization_code for d in req.demands)))
        gfr_status, proc_mode = self.determine_gfr_status(total_baseline)

        batch_id = f"POOL-2026-{uuid.uuid4().hex[:8].upper()}"
        now_iso = datetime.now(timezone.utc).isoformat()

        # Taxonomy lookup
        item_class = item_details.get("item_class", "BALL_VALVE") if item_details else "BALL_VALVE"
        canonical_desc = (
            item_details.get("canonical_description", "STANDARDIZED CANONICAL ITEM")
            if item_details
            else "STANDARDIZED CANONICAL ITEM"
        )
        tax_info = default_taxonomy_mapper.map_taxonomy(
            {
                "item_class": item_class,
                "size_inch": item_details.get("size_inch", 2.0) if item_details else 2.0,
                "pressure_class": item_details.get("pressure_class", 150) if item_details else 150,
            }
        )
        gem_cat = tax_info.get("gem_category_id", "GeM-CAT-GEN-01")

        summary = PooledBatchSummary(
            batch_id=batch_id,
            onmc_code=req.onmc_code,
            canonical_description=canonical_desc,
            item_class=item_class,
            gem_category_id=gem_cat,
            total_aggregate_quantity=total_qty,
            participating_org_count=len(participating_orgs),
            participating_organizations=participating_orgs,
            baseline_unit_price=round(unit_price, 2),
            baseline_total_cost_inr=round(total_baseline, 2),
            discount_tier_pct=discount_pct,
            discounted_unit_price=discounted_unit,
            pooled_total_cost_inr=pooled_total,
            projected_savings_inr=projected_savings,
            target_tender_month=req.target_tender_month,
            gfr_rule_149_status=gfr_status,
            procurement_mode=proc_mode,
            status="DRAFT",
            created_at=now_iso,
            demands=req.demands,
        )

        self._batches[batch_id] = summary
        return summary

    def get_batch(self, batch_id: str) -> Optional[PooledBatchSummary]:
        """Retrieves pooled batch by identifier."""
        return self._batches.get(batch_id)

    def list_batches(self) -> PooledBatchesListResponse:
        """Lists all active pooled tender batches with national macro KPI aggregation."""
        batch_list = list(self._batches.values())
        total_qty = sum(b.total_aggregate_quantity for b in batch_list)
        total_base = sum(b.baseline_total_cost_inr for b in batch_list)
        total_savings = sum(b.projected_savings_inr for b in batch_list)
        avg_disc = (total_savings / total_base) if total_base > 0 else 0.0

        return PooledBatchesListResponse(
            total_batches=len(batch_list),
            total_national_quantity=total_qty,
            total_baseline_cost_inr=round(total_base, 2),
            total_projected_savings_inr=round(total_savings, 2),
            average_discount_pct=round(avg_disc, 4),
            batches=batch_list,
        )

    def _seed_default_batches(self):
        """Initializes canonical national pooled demand batches covering pilot commodities."""
        # Batch 1: 2" Class 150 Ball Valves (IOCL + BPCL + HPCL)
        b1_demands = [
            CPSEDemandItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1002",
                plant_location="Mathura Refinery, Uttar Pradesh",
                projected_quantity=1200,
                target_procurement_month="2026-Q4",
                estimated_unit_price=28500.0,
            ),
            CPSEDemandItem(
                organization_code="BPCL",
                organization_name="Bharat Petroleum Corporation Ltd",
                plant_code="2001",
                plant_location="Mumbai Refinery, Maharashtra",
                projected_quantity=850,
                target_procurement_month="2026-Q4",
                estimated_unit_price=28500.0,
            ),
            CPSEDemandItem(
                organization_code="HPCL",
                organization_name="Hindustan Petroleum Corporation Ltd",
                plant_code="3001",
                plant_location="Visakh Refinery, Andhra Pradesh",
                projected_quantity=900,
                target_procurement_month="2026-Q4",
                estimated_unit_price=28500.0,
            ),
        ]
        self.aggregate_batch(
            DemandAggregationRequest(
                onmc_code="ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                target_tender_month="2026-Q4",
                demands=b1_demands,
            ),
            item_details={
                "canonical_description": "VALVE, BALL, 2 INCH, CLASS 150, FLANGED RF, BODY ASTM A105, TRIM 316, API 6D",
                "item_class": "BALL_VALVE",
                "size_inch": 2.0,
                "pressure_class": 150,
            },
        )

        # Batch 2: 6" Class 300 Weld Neck Flanges (HPCL + IOCL + ONGC)
        b2_demands = [
            CPSEDemandItem(
                organization_code="HPCL",
                organization_name="Hindustan Petroleum Corporation Ltd",
                plant_code="3001",
                plant_location="Visakh Refinery, Andhra Pradesh",
                projected_quantity=600,
                target_procurement_month="2026-Q4",
                estimated_unit_price=14500.0,
            ),
            CPSEDemandItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1005",
                plant_location="Panipat Refinery, Haryana",
                projected_quantity=550,
                target_procurement_month="2026-Q4",
                estimated_unit_price=14500.0,
            ),
            CPSEDemandItem(
                organization_code="ONGC",
                organization_name="Oil & Natural Gas Corporation",
                plant_code="1100",
                plant_location="Hazira Gas Processing Complex, Gujarat",
                projected_quantity=400,
                target_procurement_month="2026-Q4",
                estimated_unit_price=14500.0,
            ),
        ]
        self.aggregate_batch(
            DemandAggregationRequest(
                onmc_code="ONMC-PIPE-FLG-WNF-006-300-A105-4D1E",
                target_tender_month="2026-Q4",
                demands=b2_demands,
            ),
            item_details={
                "canonical_description": "FLANGE, WELD NECK, 6 INCH, CLASS 300, RAISED FACE, SCHEDULE 40, ASTM A105, ASME B16.5",
                "item_class": "WELD_NECK_FLANGE",
                "size_inch": 6.0,
                "pressure_class": 300,
            },
        )

        # Batch 3: 3" Class 150 Spiral Wound Gaskets (BPCL + IOCL) -> Mega Tier >= 5000
        b3_demands = [
            CPSEDemandItem(
                organization_code="BPCL",
                organization_name="Bharat Petroleum Corporation Ltd",
                plant_code="2002",
                plant_location="Kochi Refinery, Kerala",
                projected_quantity=2500,
                target_procurement_month="2027-Q1",
                estimated_unit_price=1200.0,
            ),
            CPSEDemandItem(
                organization_code="IOCL",
                organization_name="Indian Oil Corporation Ltd",
                plant_code="1001",
                plant_location="Gujarat Refinery, Vadodara",
                projected_quantity=3000,
                target_procurement_month="2027-Q1",
                estimated_unit_price=1200.0,
            ),
        ]
        self.aggregate_batch(
            DemandAggregationRequest(
                onmc_code="ONMC-STAT-GSK-SPW-003-150-SS316-2F88",
                target_tender_month="2027-Q1",
                demands=b3_demands,
            ),
            item_details={
                "canonical_description": "GASKET, SPIRAL WOUND, 3 INCH, CLASS 150, WINDING SS316, FILLER GRAPHITE, ASME B16.20",
                "item_class": "SPIRAL_WOUND_GASKET",
                "size_inch": 3.0,
                "pressure_class": 150,
            },
        )


default_demand_pooling_service = DemandPoolingService()
