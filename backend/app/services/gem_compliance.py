# ponytail: GeM Category ID linking and GFR Rule 149 Public Procurement Compliance Engine.
# Upgrade path: direct REST API integration with GeM 4.0 GeM-SAHAJ procurement gateway.

import uuid
from datetime import datetime, timezone
from typing import Dict

from backend.app.schemas.demand_pool import GeMTenderPackage, PooledBatchSummary
from backend.app.services.taxonomy_mapper import default_taxonomy_mapper


class GeMComplianceEngine:
    """
    Enforces Rule 149 of the General Financial Rules (GFR), 2017 for public CPSE procurement.
    Links ONMC master codes to GeM Category IDs and synthesizes standardized GeM Tender Packages.
    """

    # Statutory GFR Rule 149 Procurement Threshold Clauses
    GFR_CLAUSES = {
        "DIRECT_PURCHASE": (
            "GFR Rule 149 (i): Requisition value <= INR 50,000. Direct purchase permissible "
            "through any available supplier on GeM meeting requisites of technical specification and quality."
        ),
        "L1_COMPARISON_REQUIRED": (
            "GFR Rule 149 (ii): Requisition value between INR 50,001 and INR 50,00,000. "
            "Mandatory automated comparison of at least three (3) different manufacturers on GeM meeting technical specs to identify L1 rate."
        ),
        "MANDATORY_BIDDING_REVERSE_AUCTION": (
            "GFR Rule 149 (iii): Requisition value > INR 50,00,000. "
            "Mandatory electronic open bidding or e-Reverse Auction (e-RA) on GeM portal. CVC Integrity Pact applicable."
        ),
    }

    @classmethod
    def resolve_gem_category(
        cls, item_class: str, size_inch: float = None, pressure_class: int = None
    ) -> Dict[str, str]:
        """
        Resolves official Government e-Marketplace (GeM) catalog category ID and title.
        """
        meta = default_taxonomy_mapper.map_taxonomy(
            {
                "item_class": item_class,
                "size_inch": size_inch,
                "pressure_class": pressure_class,
            }
        )
        return {
            "gem_category_id": meta.get("gem_category_id", "GeM-CAT-GEN-01"),
            "category_name": meta.get("category_name", "Industrial Oil & Gas General Spares"),
            "shell_mesc_code": meta.get("shell_mesc_code", "00.00.00.000.0"),
            "unspsc_code": meta.get("unspsc_code", "40141600"),
        }

    @classmethod
    def generate_tender_package(cls, batch: PooledBatchSummary) -> GeMTenderPackage:
        """
        Synthesizes a GeM-ready unified tender dossier compliant with CVC and MoPNG guidelines.
        """
        short_id = uuid.uuid4().hex[:8].upper()
        tender_ref = f"GeM-NUMM-2026-TND-{short_id}"
        now_iso = datetime.now(timezone.utc).isoformat()

        clause = cls.GFR_CLAUSES.get(batch.procurement_mode, cls.GFR_CLAUSES["MANDATORY_BIDDING_REVERSE_AUCTION"])

        allocations = [
            {
                "organization_code": d.organization_code,
                "organization_name": d.organization_name,
                "plant_code": d.plant_code,
                "plant_location": d.plant_location,
                "allocated_quantity": d.projected_quantity,
                "estimated_line_value_inr": round(d.projected_quantity * batch.discounted_unit_price, 2),
                "target_delivery_window": d.target_procurement_month,
            }
            for d in batch.demands
        ]

        # Standard technical requirements for industrial Oil & Gas tender
        tech_specs = {
            "onmc_standard_code": batch.onmc_code,
            "item_classification": batch.item_class,
            "canonical_description": batch.canonical_description,
            "quality_assurance_standard": "ISO 9001:2015 & API Spec Q1",
            "third_party_inspection_agency": "Engineers India Limited (EIL) / Lloyd's Register",
            "statutory_warranty_months": 18,
            "indigenous_content_minimum_pct": 50,  # Make in India (DPIIT) Preference
        }

        anti_cartel = (
            f"UNDERTAKING UNDER CVC GUIDELINES: Tendering CPSEs ({', '.join(batch.participating_organizations)}) "
            f"certify that procurement of {batch.total_aggregate_quantity} units under {batch.onmc_code} "
            f"is pooled strictly to achieve scale economies of {batch.discount_tier_pct * 100:.1f}%, "
            f"yielding INR {batch.projected_savings_inr:,.2f} public savings without restrictive trade practices."
        )

        return GeMTenderPackage(
            tender_reference_number=tender_ref,
            batch_id=batch.batch_id,
            onmc_code=batch.onmc_code,
            canonical_description=batch.canonical_description,
            gem_category_id=batch.gem_category_id,
            gem_category_name=f"GeM Product Category ({batch.item_class})",
            gfr_rule_149_threshold_clause=clause,
            procurement_mode=batch.procurement_mode,
            total_pooled_quantity=batch.total_aggregate_quantity,
            estimated_tender_value_inr=batch.pooled_total_cost_inr,
            projected_savings_inr=batch.projected_savings_inr,
            discount_tier_achieved=f"{batch.discount_tier_pct * 100:.1f}% Volume Discount",
            participating_cpse_allocations=allocations,
            mandatory_technical_specifications=tech_specs,
            cvc_anti_cartelization_undertaking=anti_cartel,
            created_at=now_iso,
        )


default_gem_engine = GeMComplianceEngine()
