# ponytail: High-speed synchronous normalization REST endpoints.
# Upgrade path: add Redis/ARQ task offload when batch size exceeds 5,000 items.

from fastapi import APIRouter, status

from backend.app.schemas.normalization import (
    BatchNormalizeRequest,
    BatchNormalizeResponse,
    ExtractedAttributesSchema,
    NormalizeTextRequest,
    NormalizeTextResponse,
    TaxonomyMappingSchema,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.taxonomy_mapper import default_taxonomy_mapper

router = APIRouter()


@router.post(
    "/text",
    response_model=NormalizeTextResponse,
    status_code=status.HTTP_200_OK,
    summary="Normalize single material short text",
    description="Expands Oil & Gas abbreviations, extracts engineering parameters, and maps Shell MESC/UNSPSC taxonomy.",
)
async def normalize_text(payload: NormalizeTextRequest) -> NormalizeTextResponse:
    attrs_dict = default_extractor.extract(payload.raw_text)
    taxonomy_dict = default_taxonomy_mapper.map_taxonomy(attrs_dict)

    return NormalizeTextResponse(
        raw_text=payload.raw_text,
        attributes=ExtractedAttributesSchema(**attrs_dict),
        taxonomy=TaxonomyMappingSchema(**taxonomy_dict),
    )


@router.post(
    "/batch",
    response_model=BatchNormalizeResponse,
    status_code=status.HTTP_200_OK,
    summary="Batch normalize multiple material texts",
    description="High-throughput batch processor for multi-row CPSE catalog imports.",
)
async def normalize_batch(payload: BatchNormalizeRequest) -> BatchNormalizeResponse:
    results = []
    for item in payload.items:
        attrs_dict = default_extractor.extract(item.raw_text)
        taxonomy_dict = default_taxonomy_mapper.map_taxonomy(attrs_dict)
        results.append(
            NormalizeTextResponse(
                raw_text=item.raw_text,
                attributes=ExtractedAttributesSchema(**attrs_dict),
                taxonomy=TaxonomyMappingSchema(**taxonomy_dict),
            )
        )

    return BatchNormalizeResponse(
        total_processed=len(results),
        results=results,
    )
