# ponytail: Inter-CPSE Surplus discovery endpoints and MTIRF transfer requisition workflow.
# Upgrade path: add multi-stop milk-run logistics consolidation and live GPS transit truck tracking.

from typing import List, Optional

from fastapi import APIRouter, HTTPException, Query

from backend.app.api.v1.endpoints.search import CANONICAL_MASTER_ITEMS
from backend.app.schemas.surplus import (
    MTIRFApproveRequest,
    MTIRFApproveResponse,
    MTIRFDocument,
    MTIRFGenerateRequest,
    NearbySurplusResponse,
    PlantLocationInfo,
    SurplusItem,
)
from backend.app.services.cvc_audit_service import default_cvc_audit_service
from backend.app.services.geo_service import default_geo_service
from backend.app.services.mtirf_generator import default_mtirf_generator

router = APIRouter()


@router.get("/plants", response_model=List[PlantLocationInfo], summary="List registered CPSE plant installations")
async def list_cpse_plants():
    """Returns directory of all registered CPSE refineries and field assets with coordinates."""
    plants = []
    for key, p in default_geo_service.CPSE_PLANTS.items():
        plants.append(
            PlantLocationInfo(
                plant_key=key,
                organization_code=p["organization_code"],
                organization_name=p["organization_name"],
                plant_code=p["plant_code"],
                plant_name=p["plant_name"],
                location_name=p["location_name"],
                latitude=p["coordinates"][0],
                longitude=p["coordinates"][1],
            )
        )
    return plants


@router.get("/nearby", response_model=NearbySurplusResponse, summary="Discover surplus stock within geographic radius")
async def get_nearby_surplus(
    destination_plant: str = Query("IOCL_MATHURA", description="Requesting plant key or location (e.g. IOCL_MATHURA)"),
    item_class: Optional[str] = Query(None, description="Filter by item class (BALL_VALVE, etc.)"),
    onmc_code: Optional[str] = Query(None, description="Filter by ONMC standard code"),
    max_radius_km: float = Query(1200.0, ge=10.0, le=4000.0, description="Max geographic search radius in km"),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Scans national CPSE inventory for available surplus stock and sorts by road transit distance.
    Filters out the requesting plant's own local inventory to highlight inter-CPSE transfer opportunities.
    """
    dest_plant_rec = default_geo_service.find_plant(destination_plant)
    if not dest_plant_rec:
        # Fallback to Mathura Refinery if unknown
        dest_plant_rec = default_geo_service.CPSE_PLANTS["IOCL_MATHURA"]

    dest_coords = dest_plant_rec["coordinates"]
    dest_org = dest_plant_rec["organization_code"]
    dest_code = dest_plant_rec["plant_code"]

    surplus_hits: List[SurplusItem] = []

    for master in CANONICAL_MASTER_ITEMS:
        # Filter item class or ONMC code if specified
        if item_class and master["item_class"].upper() != item_class.upper():
            continue
        if onmc_code and master["onmc_code"] != onmc_code:
            continue

        for stock in master["stock_distribution"]:
            # Exclude stock located at the requesting plant itself
            if stock.plant_code == dest_code and stock.organization_code == dest_org:
                continue

            # Resolve coordinates of the source plant holding stock
            source_rec = default_geo_service.find_plant(f"{stock.organization_code}_{stock.plant_code}")
            if not source_rec:
                source_rec = default_geo_service.find_plant(stock.plant_location)

            if source_rec:
                dist = default_geo_service.calculate_distance(dest_coords, source_rec["coordinates"])
                plant_name = source_rec["plant_name"]
            else:
                dist = 450.0  # Conservative estimate
                plant_name = stock.plant_location

            if dist <= max_radius_km:
                transit_hours = default_geo_service.estimate_transit_hours(dist)
                surplus_hits.append(
                    SurplusItem(
                        onmc_code=master["onmc_code"],
                        canonical_description=master["canonical_description"],
                        item_class=master["item_class"],
                        size_inch=master.get("size_inch"),
                        pressure_class=master.get("pressure_class"),
                        metallurgy=master.get("metallurgy"),
                        source_organization=stock.organization_code,
                        source_organization_name=stock.organization_name,
                        source_plant_code=stock.plant_code,
                        source_plant_name=plant_name,
                        source_plant_location=stock.plant_location,
                        available_stock=stock.available_stock,
                        unit_price=stock.unit_price,
                        currency=stock.currency,
                        distance_km=dist,
                        estimated_transit_hours=transit_hours,
                        shell_mesc_code=master.get("shell_mesc_code"),
                        unspsc_code=master.get("unspsc_code"),
                        gem_category_id=master.get("gem_category_id"),
                    )
                )

    # Sort items by proximity ascending (nearest plant first)
    surplus_hits.sort(key=lambda x: x.distance_km)
    surplus_hits = surplus_hits[:limit]

    return NearbySurplusResponse(
        requesting_plant_name=dest_plant_rec["plant_name"],
        requesting_plant_location=dest_plant_rec["location_name"],
        max_radius_km=max_radius_km,
        total_surplus_found=len(surplus_hits),
        items=surplus_hits,
    )


@router.post("/mtirf/generate", response_model=MTIRFDocument, summary="Generate MoPNG MTIRF Requisition Form")
async def generate_mtirf_form(req: MTIRFGenerateRequest):
    """
    Generates a formal Material Transfer Inter-Company Requisition Form (MTIRF)
    between requesting and source CPSE installations with a SHA-256 tamper seal.
    """
    # Lookup canonical item details if available
    matched_master = next((m for m in CANONICAL_MASTER_ITEMS if m["onmc_code"] == req.onmc_code), None)

    try:
        doc = default_mtirf_generator.generate_form(req, item_lookup=matched_master)
        return doc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get(
    "/mtirf/{requisition_number}", response_model=MTIRFDocument, summary="Retrieve MTIRF document by requisition number"
)
async def get_mtirf_document(requisition_number: str):
    """Fetches details of an existing MTIRF transfer requisition."""
    doc = default_mtirf_generator.get_document(requisition_number)
    if not doc:
        raise HTTPException(status_code=404, detail=f"Requisition '{requisition_number}' not found.")
    return doc


@router.post(
    "/mtirf/{requisition_number}/approve", response_model=MTIRFApproveResponse, summary="Authorize MTIRF transfer"
)
async def approve_mtirf(requisition_number: str, payload: MTIRFApproveRequest):
    """
    Authorizes the inter-CPSE transfer from the source materials division.
    Emits simulated SAP outbound delivery note and cryptographic audit seal.
    """
    if payload.requisition_number != requisition_number:
        payload.requisition_number = requisition_number

    try:
        resp = default_mtirf_generator.approve_requisition(payload)
        # Record into CVC cryptographic ledger
        default_cvc_audit_service.record_action(
            actor_email=payload.approving_officer_email,
            actor_role="PROCUREMENT_OFFICER",
            action="MTIRF_APPROVED",
            entity_type="REQUISITION",
            entity_id=payload.requisition_number,
            details={
                "requisition_number": payload.requisition_number,
                "approving_officer_name": payload.approving_officer_name,
                "approving_officer_designation": payload.approving_officer_designation,
                "sap_outbound_delivery": resp.sap_outbound_delivery_note,
                "sap_inbound_po": resp.sap_inbound_purchase_order,
            },
        )
        return resp
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
