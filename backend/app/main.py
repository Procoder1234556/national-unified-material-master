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

# CORS middleware for standalone local development. Production is same-origin
# behind Nginx, so it does not rely on a permissive cross-origin policy.
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
    if settings.USE_SQLITE:
        from backend.app.db.seed import seed_data

        await seed_data(reset=True)
    else:
        if not settings.POSTGRES_PASSWORD and not settings.DATABASE_URL:
            raise RuntimeError("DATABASE_URL or POSTGRES_PASSWORD must be set for a production database connection.")
        from sqlalchemy import text

        from backend.app.db.session import engine

        try:
            async with engine.begin() as conn:
                await conn.execute(text("SELECT 1"))
                if settings.SEED_DEMO_DATA:
                    # Render free instances do not run pre-deploy commands.  The
                    # explicit demo switch keeps the bootstrap scoped to the SIH
                    # environment while still provisioning a fresh Postgres DB.
                    await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
                    from backend.app.models.models import Base

                    await conn.run_sync(Base.metadata.create_all)
        except Exception as e:
            raise RuntimeError(f"Failed to connect to Postgres. Required for production: {e}")

        if settings.SEED_DEMO_DATA:
            from backend.app.db.seed import seed_data

            await seed_data()
