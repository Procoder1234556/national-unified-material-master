# ponytail: Clean FastAPI application instance with CORS, public auth, and protected API.
# Upgrade path: add OAuth2 / SAML SSO auth middleware and Prometheus metrics.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.v1.api import api_router, public_router
from backend.app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="National Unified Material Master (NUMM) Framework - SIH 26099",
    version="2.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware for React frontend — allow all origins for hackathon demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


# Public routes (no auth): /api/v1/auth/login, /api/v1/auth/demo-tokens, /api/v1/auth/sso/meghraj
app.include_router(public_router, prefix=settings.API_V1_STR)

# Protected routes (Bearer JWT required)
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.on_event("startup")
async def startup_event():
    if settings.USE_SQLITE:
        # Auto-create SQLite schema for zero-Docker hackathon mode
        from backend.app.db.session import engine
        from backend.app.models.models import Base
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        # Seed demo data
        try:
            from backend.app.db.seed import seed_db
            await seed_db()
        except Exception:
            pass  # Already seeded
    else:
        if not settings.POSTGRES_PASSWORD:
            raise RuntimeError("POSTGRES_PASSWORD is not set.")
        from backend.app.db.session import engine
        from sqlalchemy import text
        try:
            async with engine.begin() as conn:
                await conn.execute(text("SELECT 1"))
        except Exception as e:
            raise RuntimeError(f"Failed to connect to Postgres: {e}")
