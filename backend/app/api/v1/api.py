# ponytail: Public auth routes unguarded; all other routes require Bearer JWT.
# Upgrade path: add OAuth2 scope-based granular attribute permissions in Phase 6.

from fastapi import APIRouter, Depends

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
from backend.app.core.security import get_current_user

# Public router — no auth required (login, demo-tokens, SSO exchange)
public_router = APIRouter()
public_router.include_router(auth.router, prefix="/auth", tags=["auth"])

# Protected router — Bearer JWT required on all sub-routes
api_router = APIRouter(dependencies=[Depends(get_current_user)])


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
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
