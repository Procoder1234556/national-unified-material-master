# ponytail: Pydantic v2 schemas for NLP normalization and attribute extraction.
# Upgrade path: add JSON schema export for CPSE ERP middleware validators.

from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class ExtractedAttributesSchema(BaseModel):
    """Extracted physical and engineering parameters from material description."""

    clean_text: str = Field(..., description="Cleaned uppercase description with expanded abbreviations")
    item_class: str = Field(..., description="Standard equipment/component classification")
    size_inch: Optional[float] = Field(None, description="Nominal pipe size in inches (NPS)")
    size_mm: Optional[int] = Field(None, description="Nominal diameter in millimeters (DN/NB)")
    pressure_class: Optional[int] = Field(
        None, description="Pressure rating in ASME pound class or converted PN rating"
    )
    metallurgy: Optional[str] = Field(None, description="Standardized ASTM/AISI material grade")
    end_connection: Optional[str] = Field(None, description="Mechanical end connection geometry")
    standards: List[str] = Field(default_factory=list, description="Governing engineering standards (API, ASME, NACE)")
    parametric_attributes: Dict[str, Any] = Field(
        default_factory=dict, description="Detailed JSON attributes (schedule, bore, operator, trim)"
    )


class TaxonomyMappingSchema(BaseModel):
    """International and sovereign procurement catalog taxonomy cross-walk."""

    shell_mesc_code: Optional[str] = Field(None, description="Shell MESC 10-digit code (XX.XX.XX.XXX.X)")
    mesc_spe_spec: Optional[str] = Field(None, description="MESC SPE engineering specification")
    unspsc_code: Optional[str] = Field(None, description="UNSPSC 8-digit international taxonomy code")
    gem_category_id: Optional[str] = Field(None, description="Government e-Marketplace (GeM) category identifier")
    category_name: Optional[str] = Field(None, description="Descriptive category classification title")


class NormalizeTextRequest(BaseModel):
    """Request payload for single material text normalization."""

    raw_text: str = Field(..., min_length=2, description="Raw unstructured material short text (e.g. SAP MAKTX)")


class NormalizeTextResponse(BaseModel):
    """Response payload for normalized text with extracted attributes and taxonomy."""

    raw_text: str
    attributes: ExtractedAttributesSchema
    taxonomy: TaxonomyMappingSchema


class BatchNormalizeRequest(BaseModel):
    """Batch normalization request for high-throughput catalog file ingestion."""

    items: List[NormalizeTextRequest] = Field(
        ..., min_length=1, max_length=1000, description="List of items to normalize"
    )


class BatchNormalizeResponse(BaseModel):
    """Batch normalization response payload."""

    total_processed: int
    results: List[NormalizeTextResponse]
