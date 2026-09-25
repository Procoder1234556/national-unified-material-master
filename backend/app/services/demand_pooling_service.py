# ponytail: Demand pooling aggregator computing volume discount savings (8% to 16% tiers) for joint CPSE procurement.
# Upgrade path: add multi-year cyclical demand smoothing and dynamic supplier quotation ingestion.

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Tuple

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.models.models import PooledDemand, UnifiedMasterCode
from backend.app.schemas.demand_pool import (
    CPSEDemandItem,
    DemandAggregationRequest,
    PooledBatchesListResponse,
    PooledBatchSummary,
    VolumeTierInfo,
)


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
        pass

    def get_discount_tier(self, total_quantity: int) -> Tuple[float, str]:
        """
        Determines the discount rate and tier description based on total pooled volume.
        """
        for tier in self.DISCOUNT_TIERS:
            if total_quantity >= tier.min_quantity:
                return tier.discount_percentage, tier.tier_label
        return 0.0, "Baseline: Standalone Purchase (0.0%)"

    def determine_gfr_status(self, estimated_cost_inr: float) -> Tuple[str, str]:
        if estimated_cost_inr <= 50000.0:
            return "RULE_149_COMPLIANT", "DIRECT_PURCHASE"
        elif estimated_cost_inr <= 5000000.0:
            return "RULE_149_COMPLIANT", "L1_COMPARISON_REQUIRED"
        else:
            return "RULE_149_COMPLIANT", "MANDATORY_BIDDING_REVERSE_AUCTION"

    async def aggregate_batch(self, session: AsyncSession, req: DemandAggregationRequest) -> PooledBatchSummary:
        """
        Aggregates individual CPSE requisition projections into a formal pooled batch.
        """
        total_qty = sum(d.projected_quantity for d in req.demands)
        if not req.demands:
            raise ValueError("At least one CPSE demand projection is required to pool demand.")

        # Find unified master code in DB
        stmt = select(UnifiedMasterCode).where(UnifiedMasterCode.onmc_code == req.onmc_code)
        result = await session.execute(stmt)
        master = result.scalars().first()

        if not master:
            raise ValueError(f"Unified master code '{req.onmc_code}' not found.")

        total_baseline = sum(d.projected_quantity * d.estimated_unit_price for d in req.demands)
        unit_price = total_baseline / total_qty if total_qty > 0 else 0.0

        discount_pct, tier_label = self.get_discount_tier(total_qty)
        projected_savings = round(total_baseline * discount_pct, 2)
        pooled_total = round(total_baseline - projected_savings, 2)
        discounted_unit = round(unit_price * (1.0 - discount_pct), 2)

        participating_orgs = sorted(list(set(d.organization_code for d in req.demands)))
        gfr_status, proc_mode = self.determine_gfr_status(total_baseline)

        pooled_demand = PooledDemand(
            unified_master_id=master.id,
            total_aggregate_quantity=total_qty,
            participating_org_count=len(participating_orgs),
            target_tender_month=req.target_tender_month,
            status="DRAFT",
            estimated_cost_inr=pooled_total,
            projected_savings_inr=projected_savings,
        )
        session.add(pooled_demand)
        await session.flush()

        batch_id = str(pooled_demand.id)
        now_iso = datetime.now(timezone.utc).isoformat()

        summary = PooledBatchSummary(
            batch_id=batch_id,
            onmc_code=req.onmc_code,
            canonical_description=master.canonical_description,
            item_class=master.item_class,
            gem_category_id=master.gem_category_id or "GeM-CAT-GEN-01",
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

        await session.commit()
        return summary

    async def get_batch(self, session: AsyncSession, batch_id: str) -> Optional[PooledBatchSummary]:
        try:
            uid = uuid.UUID(batch_id)
        except ValueError:
            return None

        stmt = select(PooledDemand).where(PooledDemand.id == uid)
        result = await session.execute(stmt)
        batch = result.scalars().first()
        if not batch:
            return None

        master_res = await session.execute(
            select(UnifiedMasterCode).where(UnifiedMasterCode.id == batch.unified_master_id)
        )
        master = master_res.scalars().first()

        discount_pct, tier_label = self.get_discount_tier(batch.total_aggregate_quantity)
        gfr_status, proc_mode = self.determine_gfr_status(
            float(batch.estimated_cost_inr) + float(batch.projected_savings_inr)
        )

        return PooledBatchSummary(
            batch_id=str(batch.id),
            onmc_code=master.onmc_code if master else "",
            canonical_description=master.canonical_description if master else "",
            item_class=master.item_class if master else "",
            gem_category_id=master.gem_category_id or "GeM-CAT-GEN-01" if master else "GeM-CAT-GEN-01",
            total_aggregate_quantity=batch.total_aggregate_quantity,
            participating_org_count=batch.participating_org_count,
            participating_organizations=[],
            baseline_unit_price=0.0,
            baseline_total_cost_inr=float(batch.estimated_cost_inr) + float(batch.projected_savings_inr),
            discount_tier_pct=discount_pct,
            discounted_unit_price=0.0,
            pooled_total_cost_inr=float(batch.estimated_cost_inr),
            projected_savings_inr=float(batch.projected_savings_inr),
            target_tender_month=batch.target_tender_month,
            gfr_rule_149_status=gfr_status,
            procurement_mode=proc_mode,
            status=batch.status,
            created_at=datetime.now(timezone.utc).isoformat(),
            demands=[],
        )

    async def list_batches(self, session: AsyncSession) -> PooledBatchesListResponse:
        stmt = select(PooledDemand)
        result = await session.execute(stmt)
        batches = result.scalars().all()

        batch_summaries = []
        for batch in batches:
            s = await self.get_batch(session, str(batch.id))
            if s:
                batch_summaries.append(s)

        total_qty = sum(b.total_aggregate_quantity for b in batches)
        total_savings = sum(float(b.projected_savings_inr) for b in batches)
        total_base = sum(float(b.estimated_cost_inr) + float(b.projected_savings_inr) for b in batches)
        avg_disc = (total_savings / total_base) if total_base > 0 else 0.0

        return PooledBatchesListResponse(
            total_batches=len(batches),
            total_national_quantity=total_qty,
            total_baseline_cost_inr=round(total_base, 2),
            total_projected_savings_inr=round(total_savings, 2),
            average_discount_pct=round(avg_disc, 4),
            batches=batch_summaries,
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
