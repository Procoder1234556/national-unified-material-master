# ponytail: Direct router mounting health status and core Phase 1-5 endpoints.
# Upgrade path: add user role-based route guard middleware in Phase 6.

from fastapi import APIRouter

from backend.app.api.v1.endpoints import (
    audit,
    auth,
    demand_pool,
    ingest,
    matcher,
    normalization,
    search,
    steward,
    surplus,
)
from backend.app.core.config import settings

api_router = APIRouter()


@api_router.get("/health", tags=["system"])
async def api_health():
    return {
        "status": "online",
        "standard": "One Nation, One Material Code (ONMC)",
        "framework": "NUMM",
        "version": "2.2.0",
        "database_backend": "sqlite" if settings.USE_SQLITE else "postgresql",
    }


api_router.include_router(normalization.router, prefix="/normalize", tags=["normalization"])
api_router.include_router(matcher.router, prefix="/matcher", tags=["matcher"])
api_router.include_router(ingest.router, prefix="/ingest", tags=["ingest"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(steward.router, prefix="/steward", tags=["steward"])
api_router.include_router(surplus.router, prefix="/surplus", tags=["surplus"])
api_router.include_router(demand_pool.router, prefix="/demand-pool", tags=["demand-pool"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
