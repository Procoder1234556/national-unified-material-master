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
from backend.app.models.models import UnifiedMasterCode, MaterialMapping, RawMaterial, Organization

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
        stmt = stmt.where(UnifiedMasterCode.item_class.ilike(f"%{req.item_class.replace('_', ' ')}%"))
    elif query_attrs.get("item_class"):
        val = query_attrs["item_class"].replace("_", " ")
        stmt = stmt.where(UnifiedMasterCode.item_class.ilike(f"%{val}%"))
        
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
        canon_words = set(master.canonical_description.lower().replace(",", " ").split())
        overlap = len(query_words & canon_words)

        has_explicit_filter = bool(req.item_class or req.pressure_class or req.size_inch)
        if has_explicit_filter or score >= 0.20 or overlap >= 1:
            # Fetch real stock data for this master code
            stock_stmt = (
                select(RawMaterial.stock_quantity, Organization.code, Organization.name, RawMaterial.plant_location, RawMaterial.plant_code, RawMaterial.unit_price)
                .select_from(MaterialMapping)
                .join(RawMaterial, MaterialMapping.raw_material_id == RawMaterial.id)
                .join(Organization, RawMaterial.organization_id == Organization.id)
                .where(MaterialMapping.unified_master_id == master.id)
                .where(MaterialMapping.mapping_status.in_(("AUTO_APPROVED", "MANUALLY_APPROVED")))
            )
            stock_res = await session.execute(stock_stmt)
            stock_rows = stock_res.all()

            total_stock = 0
            dist_map = {}
            for row in stock_rows:
                qty = row.stock_quantity or 0
                total_stock += qty
                org_code = row.code
                if org_code not in dist_map:
                    dist_map[org_code] = {
                        "organization_code": org_code,
                        "organization_name": row.name,
                        "plant_code": row.plant_code,
                        "plant_location": row.plant_location,
                        "available_stock": 0,
                        "unit_price": float(row.unit_price) if row.unit_price else 0.0,
                    }
                dist_map[org_code]["available_stock"] += qty

            stock_dist = list(dist_map.values())
            
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
                    participating_cpse_count=len(dist_map),
                    stock_distribution=stock_dist,
                )
            )

    results.sort(key=lambda x: x.similarity_score, reverse=True)
    results = results[: req.limit]

    return NationalSearchResponse(
        query=req.query,
        total_matches=len(results),
        results=results,
    )
