# ponytail: Pydantic schemas for CPSE surplus discovery and MoPNG MTIRF transfer requisitions.
# Upgrade path: add multi-line item requisition support and integration with GST e-Way bill schema.

from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class PlantLocationInfo(BaseModel):
    """Details of a registered CPSE refinery, gas complex, or field asset."""

    plant_key: str
    organization_code: str
    organization_name: str
    plant_code: str
    plant_name: str
    location_name: str
    latitude: float
    longitude: float


class SurplusItem(BaseModel):
    """An available surplus material holding at a CPSE installation."""

    onmc_code: str
    canonical_description: str
    item_class: str
    size_inch: Optional[float] = None
    pressure_class: Optional[int] = None
    metallurgy: Optional[str] = None
    source_organization: str
    source_organization_name: str
    source_plant_code: str
    source_plant_name: str
    source_plant_location: str
    available_stock: int
    unit_price: float
    currency: str = "INR"
    distance_km: float
    estimated_transit_hours: int
    shell_mesc_code: Optional[str] = None
    unspsc_code: Optional[str] = None
    gem_category_id: Optional[str] = None


class NearbySurplusRequest(BaseModel):
    """Query parameters to discover surplus items within a geographic radius."""

    destination_plant: str = Field("IOCL_MATHURA", description="Requesting plant key or location name")
    item_class: Optional[str] = Field(None, description="Optional filter by item class")
    onmc_code: Optional[str] = Field(None, description="Optional filter by exact ONMC code")
    max_radius_km: float = Field(default=800.0, ge=10.0, le=4000.0, description="Max geographic search radius")
    limit: int = Field(default=20, ge=1, le=100)


class NearbySurplusResponse(BaseModel):
    """Response payload for nearby surplus discovery."""

    requesting_plant_name: str
    requesting_plant_location: str
    max_radius_km: float
    total_surplus_found: int
    items: List[SurplusItem] = Field(default_factory=list)


class MTIRFGenerateRequest(BaseModel):
    """Request payload to mint an official MoPNG Material Transfer Requisition."""

    onmc_code: str = Field(..., description="Canonical One Nation One Material Code")
    source_plant_key: str = Field(..., description="Source CPSE plant holding surplus stock")
    destination_plant_key: str = Field(..., description="Receiving CPSE plant requiring material")
    transfer_quantity: int = Field(..., gt=0, description="Number of units requested for transfer")
    emergency_category: str = Field(
        default="CRITICAL_MAINTENANCE",
        description="Justification code: UNPLANNED_SHUTDOWN, CRITICAL_MAINTENANCE, STOCKOUT_PREVENTION, ROUTINE_TRANSFER",
    )
    justification_reason: str = Field(..., min_length=10, description="Operational justification text")
    requesting_officer_name: str = Field(..., min_length=3)
    requesting_officer_designation: str = Field(default="Chief Materials Manager")
    requesting_officer_email: str = Field(..., min_length=5)


class MTIRFDocument(BaseModel):
    """Standardized MoPNG Inter-CPSE Material Transfer Inter-Company Requisition Form."""

    requisition_number: str
    created_at: str
    regulatory_mandate: str = "MoPNG/OM/2026/NUMM-149 (Inter-CPSE Emergency Material Transfer Protocol)"
    status: str = "SUBMITTED"
    item_details: Dict[str, Any]
    source_details: Dict[str, Any]
    destination_details: Dict[str, Any]
    quantity: int
    uom: str = "EA"
    unit_valuation_inr: float
    total_valuation_inr: float
    distance_km: float
    estimated_transit_hours: int
    emergency_category: str
    justification_reason: str
    requesting_officer: Dict[str, str]
    approving_officer: Optional[Dict[str, str]] = None
    cvc_tamper_seal: Dict[str, Any]
    erp_handshake: Dict[str, str]


class MTIRFApproveRequest(BaseModel):
    """Payload to authorize and seal an MTIRF requisition."""

    requisition_number: str
    approving_officer_name: str
    approving_officer_email: str
    approving_officer_designation: str = "General Manager (Materials & Contracts)"
    e_sign_pin_or_token: Optional[str] = "VERIFIED-AADHAAR-OTP"


class MTIRFApproveResponse(BaseModel):
    """Result of MTIRF authorization."""

    requisition_number: str
    status: str
    approved_at: str
    approving_officer_name: str
    sha256_hash: str
    sap_outbound_delivery_note: str
    sap_inbound_purchase_order: str
    audit_log_id: str
