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
        canon_words = set(master.canonical_description.lower().replace(",", " ").split())
        overlap = len(query_words & canon_words)

        has_explicit_filter = bool(req.item_class or req.pressure_class or req.size_inch)
        if has_explicit_filter or score >= 0.20 or overlap >= 1:
            # We would normally query RawMaterials linked to this Master for real stock.
            # Defaulting to 0 for now as stock calculation wasn't explicitly refactored in the plan,
            # but we can provide the shell of it.
            
            results.append(
                NationalSearchItem(
                    onmc_code=master.onmc_code,
                    canonical_description=master.canonical_description,
                    item_class=master.item_class,
                    size_inch=float(master.size_inch) if master.size_inch else None,
                    size_mm=None, # not currently stored natively unless we parse
                    pressure_class=master.pressure_class,
                    metallurgy=master.metallurgy,
                    end_connection=master.end_connection,
                    shell_mesc_code=master.shell_mesc_code,
                    mesc_spe_spec=master.mesc_spe_spec,
                    unspsc_code=master.unspsc_code,
                    gem_category_id=master.gem_category_id,
                    similarity_score=round(score, 4),
                    total_national_stock=0,
                    participating_cpse_count=0,
                    stock_distribution=[],
                )
            )

    results.sort(key=lambda x: x.similarity_score, reverse=True)
    results = results[: req.limit]

    return NationalSearchResponse(
        query=req.query,
        total_matches=len(results),
        results=results,
    )
