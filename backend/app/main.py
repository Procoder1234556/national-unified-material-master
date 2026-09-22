# ponytail: Clean FastAPI application instance with CORS and health endpoints.
# Upgrade path: add OAuth2 / SAML SSO auth middleware and Prometheus metrics.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.v1.api import api_router
from backend.app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="National Unified Material Master (NUMM) Framework - SIH 26099",
    version="2.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["system"])
@app.head("/", tags=["system"])
@app.get("/health", tags=["system"])
async def root_health():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": "2.2.0",
        "environment": settings.ENVIRONMENT,
    }


# Mount API v1 router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    if not settings.USE_SQLITE:
        if not settings.POSTGRES_PASSWORD:
            raise RuntimeError("POSTGRES_PASSWORD is not set. Cannot run in production mode with missing database credentials.")
        from backend.app.db.session import engine
        from sqlalchemy import text
        try:
            async with engine.begin() as conn:
                await conn.execute(text("SELECT 1"))
        except Exception as e:
            raise RuntimeError(f"Failed to connect to Postgres. Required for production: {e}")
