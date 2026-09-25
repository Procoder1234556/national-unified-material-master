# ponytail: Router mount — public auth/health, RBAC-gated product API.
# Upgrade path: per-route OAuth2 scopes.

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


# Public: login / SSO / demo tokens must work without Bearer
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

# Authenticated product surface
protected = APIRouter(dependencies=[Depends(get_current_user)])
protected.include_router(normalization.router, prefix="/normalize", tags=["normalization"])
protected.include_router(matcher.router, prefix="/matcher", tags=["matcher"])
protected.include_router(ingest.router, prefix="/ingest", tags=["ingest"])
protected.include_router(search.router, prefix="/search", tags=["search"])
protected.include_router(steward.router, prefix="/steward", tags=["steward"])
protected.include_router(surplus.router, prefix="/surplus", tags=["surplus"])
protected.include_router(demand_pool.router, prefix="/demand-pool", tags=["demand-pool"])
protected.include_router(audit.router, prefix="/audit", tags=["audit"])

api_router.include_router(protected)
