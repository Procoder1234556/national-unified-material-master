# ponytail: Hybrid search engine for National Search Before Buy pre-procurement discovery.
# Upgrade path: add raw pgvector SQL query with HNSW cosine distance when Postgres is enabled.

from typing import List

from fastapi import APIRouter

from backend.app.schemas.search import (
    NationalSearchItem,
    NationalSearchRequest,
    NationalSearchResponse,
    NationalStockItem,
)
from backend.app.services.attribute_extractor import default_extractor
from backend.app.services.hybrid_matcher import default_matcher

router = APIRouter()

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import Depends
from backend.app.db.session import get_db
from backend.app.models.models import UnifiedMasterCode, MaterialMapping, RawMaterial

@router.post("", response_model=NationalSearchResponse, summary="Execute Search Before Buy query")
async def national_search(
    req: NationalSearchRequest,
    session: AsyncSession = Depends(get_db)
):
    """
    Executes hybrid pre-procurement discovery across national CPSE inventory.
    Filters by physical parameters and computes semantic + lexical similarity.
    """
    query_attrs = default_extractor.extract(req.query)
    results: List[NationalSearchItem] = []

    stmt = select(UnifiedMasterCode)
    if req.item_class:
        stmt = stmt.where(UnifiedMasterCode.item_class == req.item_class)
    elif query_attrs.get("item_class"):
        stmt = stmt.where(UnifiedMasterCode.item_class == query_attrs["item_class"])
        
    if req.pressure_class:
        stmt = stmt.where(UnifiedMasterCode.pressure_class == req.pressure_class)
        
    result = await session.execute(stmt)
    masters = result.scalars().all()

    for master in masters:
        if req.size_inch and master.size_inch is not None and abs(float(master.size_inch) - float(req.size_inch)) > 0.01:
            continue

        eval_res = default_matcher.evaluate_pair(req.query, master.canonical_description)
        score = eval_res.confidence_score

        if query_attrs.get("item_class") == master.item_class:
            score = min(1.0, score + 0.15)
        if query_attrs.get("size_inch") and master.size_inch is not None and float(query_attrs.get("size_inch")) == float(master.size_inch):
            score = min(1.0, score + 0.10)
        if query_attrs.get("pressure_class") == master.pressure_class:
            score = min(1.0, score + 0.10)

        query_words = set(req.query.lower().replace(",", " ").split())
        overlap = len(query_words & canon_words)

        has_explicit_filter = bool(req.item_class or req.pressure_class or req.size_inch)
        if has_explicit_filter or score >= 0.20 or overlap >= 1:
            from sqlalchemy.orm import selectinload
            from backend.app.models.models import MaterialMapping, RawMaterial, Organization

            # Fetch mapped raw materials to calculate real stock distribution
            mappings_stmt = (
                select(MaterialMapping)
                .where(MaterialMapping.unified_master_id == master.id)
                .where(MaterialMapping.mapping_status.in_(("AUTO_APPROVED", "MANUALLY_APPROVED")))
                .options(selectinload(MaterialMapping.raw_material).selectinload(RawMaterial.organization))
            )
            mappings_res = await session.execute(mappings_stmt)
            mappings = mappings_res.scalars().all()

            dist = []
            total_stock = 0
            cpses = set()
            for m in mappings:
                rm = m.raw_material
                if rm and rm.stock_quantity > 0:
                    org = rm.organization
                    dist.append(
                        NationalStockItem(
                            organization_code=org.code,
                            organization_name=org.name,
                            plant_code=rm.plant_code,
                            plant_location=rm.plant_location,
                            available_stock=rm.stock_quantity,
                            unit_price=float(rm.unit_price) if rm.unit_price else 0.0,
                            currency=rm.currency,
                            lead_time_days=2, # Mock lead time
                            distance_km=78 if org.code == "ONGC" else None # Mock distance for UI
                        )
                    )
                    total_stock += rm.stock_quantity
                    cpses.add(org.code)

            results.append(
                NationalSearchItem(
                    onmc_code=master.onmc_code,
                    canonical_description=master.canonical_description,
                    item_class=master.item_class,
                    size_inch=float(master.size_inch) if master.size_inch else None,
                    size_mm=None,
                    pressure_class=master.pressure_class,
                    metallurgy=master.metallurgy,
                    end_connection=master.end_connection,
                    shell_mesc_code=master.shell_mesc_code,
                    mesc_spe_spec=master.mesc_spe_spec,
                    unspsc_code=master.unspsc_code,
                    gem_category_id=master.gem_category_id,
                    similarity_score=round(score, 4),
                    total_national_stock=total_stock,
                    participating_cpse_count=len(cpses),
                    stock_distribution=dist,
                )
            )

    results.sort(key=lambda x: x.similarity_score, reverse=True)
    results = results[: req.limit]

    return NationalSearchResponse(
        query=req.query,
        total_matches=len(results),
        results=results,
    )
