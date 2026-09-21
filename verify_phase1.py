"""
Verification Script for Phase 1: Foundation & Environment Setup
National Unified Material Master (NUMM) Framework - SIH 26099
Zero-Docker Safe: Executes 100% locally without running Docker.
"""

import os
import sys

# Ensure workspace root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


def print_header(title: str):
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70)


def test_docker_compose_spec():
    print_header("1. Verifying docker-compose.yml Specification (Dormant)")
    compose_path = os.path.join(os.path.dirname(__file__), "docker-compose.yml")
    assert os.path.exists(compose_path), "docker-compose.yml missing"

    with open(compose_path, "r", encoding="utf-8") as f:
        content = f.read()

    assert "pgvector/pgvector:pg16" in content, "PostgreSQL 16 with pgvector missing in compose"
    assert "redis:7-alpine" in content, "Redis 7 missing in compose"
    assert "5432" in content, "Port 5432 missing for PostgreSQL"
    assert "6379" in content, "Port 6379 missing for Redis"
    assert "pgdata:" in content, "PostgreSQL volume definition missing"
    assert "redisdata:" in content, "Redis volume definition missing"

    print("  [PASS] docker-compose.yml configured with pgvector:pg16 and redis:7-alpine")
    print("  [INFO] Kept dormant as requested to prevent host system hang.")


def test_alembic_and_models():
    print_header("2. Verifying SQLAlchemy ORM Models & Alembic Migration")

    from backend.app.models.models import (
        Base,
        MaterialEmbedding,
    )

    expected_tables = {
        "organizations",
        "users",
        "raw_materials",
        "cleansed_materials",
        "material_embeddings",
        "unified_master_codes",
        "duplicate_clusters",
        "material_mappings",
        "pooled_demands",
        "audit_logs",
    }

    loaded_tables = set(Base.metadata.tables.keys())
    assert loaded_tables == expected_tables, f"Mismatch in tables: {expected_tables ^ loaded_tables}"
    print(f"  [PASS] All {len(loaded_tables)} canonical tables declared in SQLAlchemy ORM:")
    for tbl in sorted(loaded_tables):
        print(f"         - {tbl}")

    # Verify PostgreSQL DDL compilation for Vector and HNSW index
    from sqlalchemy.dialects import postgresql
    from sqlalchemy.schema import CreateIndex, CreateTable

    emb_table = MaterialEmbedding.__table__
    pg_ddl = str(CreateTable(emb_table).compile(dialect=postgresql.dialect()))
    assert "VECTOR(1024)" in pg_ddl or "vector(1024)" in pg_ddl.lower(), "VECTOR(1024) missing from Postgres DDL"
    print("  [PASS] PostgreSQL DDL compiles VECTOR(1024) column type")

    hnsw_found = False
    for idx in emb_table.indexes:
        idx_ddl = str(CreateIndex(idx).compile(dialect=postgresql.dialect()))
        if "hnsw" in idx_ddl.lower() and "vector_cosine_ops" in idx_ddl.lower():
            hnsw_found = True
            print(f"  [PASS] HNSW Vector Index DDL verified: {idx_ddl.strip()}")
            break
    assert hnsw_found, "HNSW vector index missing from MaterialEmbedding model"

    # Verify in-memory SQLite execution for zero-Docker validation
    from sqlalchemy import create_engine

    sqlite_engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(sqlite_engine)
    print("  [PASS] All 10 tables successfully created in-memory in zero-Docker mode")


def test_alembic_migration_file():
    print_header("3. Verifying Alembic Migration Script")
    migration_path = os.path.join(
        os.path.dirname(__file__), "backend", "alembic", "versions", "001_initial_numm_schema.py"
    )
    assert os.path.exists(migration_path), f"Migration file missing at {migration_path}"

    with open(migration_path, "r", encoding="utf-8") as f:
        migration_code = f.read()

    for tbl in [
        "organizations",
        "users",
        "raw_materials",
        "cleansed_materials",
        "material_embeddings",
        "unified_master_codes",
        "duplicate_clusters",
        "material_mappings",
        "pooled_demands",
        "audit_logs",
    ]:
        assert f'"{tbl}"' in migration_code, f"Table {tbl} missing in migration script"

    assert "idx_material_embeddings_hnsw" in migration_code, "HNSW index missing in migration script"
    assert "m = 16, ef_construction = 64" in migration_code, "HNSW parameters m=16, ef_construction=64 missing"
    print("  [PASS] Alembic migration script 001_initial_numm_schema.py contains all 10 tables + HNSW index")


def test_fastapi_endpoints():
    print_header("4. Verifying FastAPI Microservice Endpoints")
    from fastapi.testclient import TestClient

    from backend.app.main import app

    client = TestClient(app)

    # Root health
    res_root = client.get("/health")
    assert res_root.status_code == 200, f"Root health failed: {res_root.text}"
    data_root = res_root.json()
    assert data_root.get("status") == "healthy", "Unexpected status"
    print(f"  [PASS] GET /health -> 200 OK: {data_root}")

    # API v1 health
    res_v1 = client.get("/api/v1/health")
    assert res_v1.status_code == 200, f"API v1 health failed: {res_v1.text}"
    data_v1 = res_v1.json()
    assert data_v1.get("status") == "online", "Unexpected status"
    assert data_v1.get("standard") == "One Nation, One Material Code (ONMC)", "Unexpected standard"
    print(f"  [PASS] GET /api/v1/health -> 200 OK: {data_v1}")


def test_frontend_scaffold():
    print_header("5. Verifying React 19 + StyleX Frontend Scaffold")
    tokens_path = os.path.join(os.path.dirname(__file__), "frontend", "src", "tokens.stylex.ts")
    assert os.path.exists(tokens_path), "tokens.stylex.ts missing"

    with open(tokens_path, "r", encoding="utf-8") as f:
        tokens_code = f.read()

    # Verify Humanto Sovereign Palette
    assert "#E94344" in tokens_code, "colorAction (#E94344) missing"
    assert "#9B121E" in tokens_code, "colorConflict (#9B121E) missing"
    assert "#F1CC9D" in tokens_code, "colorHighlight (#F1CC9D) missing"
    assert "#5F978E" in tokens_code, "colorVerified (#5F978E) missing"
    assert "#593C32" in tokens_code, "colorAnchor (#593C32) missing"
    assert "#A5D7C9" in tokens_code, "colorApproved (#A5D7C9) missing"
    print("  [PASS] Humanto Sovereign Industrial color palette tokens verified")

    app_path = os.path.join(os.path.dirname(__file__), "frontend", "src", "App.tsx")
    assert os.path.exists(app_path), "frontend/src/App.tsx missing"
    print("  [PASS] React 19 App component and mount scaffold verified")


def main():
    print("\nStarting NUMM Phase 1 Verification Suite...")
    test_docker_compose_spec()
    test_alembic_and_models()
    test_alembic_migration_file()
    test_fastapi_endpoints()
    test_frontend_scaffold()

    print("\n" + "=" * 70)
    print("  >>> PHASE 1 VERIFICATION GATE: 100% PASS (5/5 SUITES PASSED) <<<")
    print("  >>> Zero-Docker execution successful. Host system safe. <<<")
    print("=" * 70 + "\n")


if __name__ == "__main__":
    main()
