# Backend Architecture & Database Structure (BACKEND_STRUCTURE.md)

## National Unified Material Master (NUMM) Framework

**Problem Statement**: SIH 26099 (Ministry of Petroleum & Natural Gas - MoPNG)  
**Standard**: One Nation, One Material Code (ONMC)  
**Version**: 2.2.0 (Enterprise Production Specification)

---

## 1. System Architecture & Component Interaction

NUMM's backend operates as an asynchronous, decoupled services architecture combining an ACID relational core with a high-dimensional vector search engine:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│          (React 19 + Astryx UI + StyleX SPA)                │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST / WebSockets
┌──────────────────────────────▼──────────────────────────────┐
│                    API Gateway / FastAPI                    │
│      - Auth / RBAC Middleware   - Rate Limiting             │
│      - Request Validation (Pydantic v2)                     │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼───────────┐      ┌───────────▼───────────┐
    │  Synchronous Routes  │      │  Async Task Producer  │
    │  - Realtime Search   │      │  - File Ingestion     │
    │  - HITL Review CRUD  │      │  - Batch NLP Parse    │
    │  - Analytics Queries │      │  - Vector Indexing    │
    └──────────┬───────────┘      └───────────┬───────────┘
               │                              │ Enqueue Job
               │                     ┌────────▼───────────┐
               │                     │ Redis 7.4 Queue    │
               │                     └────────┬───────────┘
               │                              │
               │                     ┌────────▼───────────┐
               │                     │ Async ARQ Workers  │
               │                     │ (PyTorch 2.5 + BGE)│
               │                     └────────┬───────────┘
               │                              │
┌──────────────▼──────────────────────────────▼───────────────┐
│              PostgreSQL 16.6 + pgvector Engine              │
│    - Relational Catalog Tables (ACID)                       │
│    - HNSW Cosine Vector Index (1024-dim, m=16, ef=64)       │
│    - Parametric Attribute JSONB & GIN Indexes              │
│    - Immutable Cryptographic Audit Logs                     │
│    - Shell MESC & UNSPSC Cross-Walk Tables                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Complete PostgreSQL 16 DDL Schemas

```sql
-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Organizations (CPSE Enterprises)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(16) NOT NULL UNIQUE, -- 'IOCL', 'ONGC', 'BPCL', 'HPCL', 'GAIL', 'OIL', 'EIL', 'NRL', 'MRPL', 'CPCL'
    name VARCHAR(128) NOT NULL,
    division VARCHAR(64) NOT NULL,    -- 'Refineries', 'Pipelines', 'E&P', 'Marketing'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users & Roles (RBAC)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
    email VARCHAR(128) NOT NULL UNIQUE,
    hashed_password VARCHAR(256) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('STEWARD', 'PROCUREMENT_OFFICER', 'ADMIN', 'AUDITOR')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Raw Materials (Legacy CPSE Catalog Dump)
CREATE TABLE raw_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    source_item_code VARCHAR(64) NOT NULL,      -- e.g. SAP MATNR '10048291'
    plant_code VARCHAR(32) NOT NULL,            -- e.g. SAP WERKS '1100' (Mathura)
    plant_location VARCHAR(128) NOT NULL,       -- e.g. 'Mathura, Uttar Pradesh'
    raw_description TEXT NOT NULL,              -- e.g. SAP MAKTX 'VLV BL FLGD 50MM NB 150# CS A105'
    unit_price NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(8) NOT NULL DEFAULT 'INR',
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    uom VARCHAR(16) NOT NULL DEFAULT 'EA',
    source_system VARCHAR(32) NOT NULL DEFAULT 'SAP_ECC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_raw_materials_org ON raw_materials(organization_id);
CREATE INDEX idx_raw_materials_code ON raw_materials(source_item_code);

-- 4. Cleansed Materials (Normalized & Parametric Attributes)
CREATE TABLE cleansed_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_material_id UUID NOT NULL UNIQUE REFERENCES raw_materials(id) ON DELETE CASCADE,
    cleaned_description TEXT NOT NULL,
    item_class VARCHAR(64) NOT NULL,            -- 'BALL_VALVE', 'WELD_NECK_FLANGE', 'SPIRAL_WOUND_GASKET'
    size_inch NUMERIC(6, 3),                    -- e.g. 2.000
    size_mm INTEGER,                            -- e.g. 50
    pressure_class INTEGER,                     -- e.g. 150
    metallurgy VARCHAR(64),                     -- e.g. 'ASTM_A105', 'ASTM_A216_WCB'
    end_connection VARCHAR(64),                 -- e.g. 'FLANGED_RF', 'BUTTWELD'
    standards JSONB NOT NULL DEFAULT '[]',      -- ['API_6D', 'ASME_B16.5']
    parametric_attributes JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cleansed_class ON cleansed_materials(item_class);
CREATE INDEX idx_cleansed_size ON cleansed_materials(size_inch);
CREATE INDEX idx_cleansed_pressure ON cleansed_materials(pressure_class);
CREATE INDEX idx_cleansed_gin ON cleansed_materials USING gin(parametric_attributes);

-- 5. Material Dense Embeddings (pgvector)
CREATE TABLE material_embeddings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cleansed_material_id UUID NOT NULL UNIQUE REFERENCES cleansed_materials(id) ON DELETE CASCADE,
    embedding_1024 vector(1024) NOT NULL,       -- BAAI/bge-large-en-v1.5
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HNSW Vector Cosine Index
CREATE INDEX idx_material_embeddings_hnsw ON material_embeddings
USING hnsw (embedding_1024 vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 6. Unified Master Codes (One Nation, One Material Code - ONMC)
CREATE TABLE unified_master_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    onmc_code VARCHAR(128) NOT NULL UNIQUE,     -- 'ONMC-MECH-VLV-BAL-002-150-A105-9B2F'
    canonical_description TEXT NOT NULL,
    item_class VARCHAR(64) NOT NULL,
    size_inch NUMERIC(6, 3),
    pressure_class INTEGER,
    metallurgy VARCHAR(64),
    end_connection VARCHAR(64),
    shell_mesc_code VARCHAR(32),                -- '74.16.01.015.1' (MESC 10-digit)
    mesc_spe_spec VARCHAR(32),                  -- 'SPE 77/300'
    unspsc_code VARCHAR(16),                    -- '40141607'
    gem_category_id VARCHAR(64),                -- 'GeM-CAT-VLV-BALL-01'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_onmc_code ON unified_master_codes(onmc_code);
CREATE INDEX idx_onmc_mesc ON unified_master_codes(shell_mesc_code);
CREATE INDEX idx_onmc_unspsc ON unified_master_codes(unspsc_code);

-- 7. Duplicate Clusters (Harmonized Item Groupings)
CREATE TABLE duplicate_clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cluster_hash VARCHAR(64) NOT NULL UNIQUE,
    item_class VARCHAR(64) NOT NULL,
    item_count INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'RESOLVED', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Material Mappings (Raw -> Canonical ONMC Linkage)
CREATE TABLE material_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_material_id UUID NOT NULL UNIQUE REFERENCES raw_materials(id) ON DELETE CASCADE,
    unified_master_id UUID REFERENCES unified_master_codes(id) ON DELETE SET NULL,
    duplicate_cluster_id UUID REFERENCES duplicate_clusters(id) ON DELETE SET NULL,
    confidence_score NUMERIC(5, 4) NOT NULL,   -- 0.9450
    lexical_similarity NUMERIC(5, 4) NOT NULL,
    semantic_similarity NUMERIC(5, 4) NOT NULL,
    rule_gate_passed BOOLEAN NOT NULL DEFAULT TRUE,
    mapping_status VARCHAR(32) NOT NULL CHECK (mapping_status IN ('AUTO_APPROVED', 'PENDING_REVIEW', 'MANUALLY_APPROVED', 'REJECTED')),
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_mappings_status ON material_mappings(mapping_status);

-- 9. Pooled Demand Aggregations (Joint Tendering)
CREATE TABLE pooled_demands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unified_master_id UUID NOT NULL REFERENCES unified_master_codes(id) ON DELETE RESTRICT,
    total_aggregate_quantity INTEGER NOT NULL DEFAULT 0,
    participating_org_count INTEGER NOT NULL DEFAULT 0,
    target_tender_month VARCHAR(16) NOT NULL,    -- '2026-Q4'
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'PUBLISHED_GEM', 'AWARDED')),
    estimated_cost_inr NUMERIC(16, 2) NOT NULL DEFAULT 0.00,
    projected_savings_inr NUMERIC(16, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Immutable Audit Logs (CVC & CAG Compliance Hash Ledger)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id),
    action VARCHAR(64) NOT NULL,                 -- 'APPROVE_MAPPING', 'MINT_NEW_ONMC', 'REJECT_CLUSTER'
    entity_type VARCHAR(64) NOT NULL,            -- 'MATERIAL_MAPPING', 'UNIFIED_MASTER_CODE'
    entity_id UUID NOT NULL,
    prior_state JSONB,
    new_state JSONB NOT NULL,
    sha256_hash VARCHAR(64) NOT NULL,           -- Cryptographic tamper-evident hash
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
```

---

## 3. Pydantic v2 Validation Schemas

```python
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from uuid import UUID
from datetime import datetime


class RawMaterialCreate(BaseModel):
    source_item_code: str = Field(..., max_length=64)
    plant_code: str = Field(..., max_length=32)
    plant_location: str = Field(..., max_length=128)
    raw_description: str = Field(..., min_length=3)
    unit_price: float = Field(default=0.0, ge=0.0)
    stock_quantity: int = Field(default=0, ge=0)
    uom: str = Field(default="EA", max_length=16)


class ExtractedAttributesSchema(BaseModel):
    clean_text: str
    item_class: str
    size_inch: Optional[float] = None
    size_mm: Optional[int] = None
    pressure_class: Optional[int] = None
    metallurgy: Optional[str] = None
    end_connection: Optional[str] = None
    standards: List[str] = []
    parametric_attributes: Dict[str, Any] = {}


class MatchEvaluationResponse(BaseModel):
    raw_material_id: UUID
    onmc_candidate_code: str
    canonical_description: str
    confidence_score: float
    lexical_similarity: float
    semantic_similarity: float
    rule_gate_passed: bool
    rejection_reasons: List[str] = []
    shell_mesc_code: Optional[str] = None
    unspsc_code: Optional[str] = None
    mapping_status: str


class StewardDecisionRequest(BaseModel):
    mapping_id: UUID
    decision: str = Field(..., pattern="^(APPROVE|REJECT|OVERRIDE)$")
    override_attributes: Optional[Dict[str, Any]] = None
    justification: str = Field(..., min_length=10)


class NationalSearchRequest(BaseModel):
    query: str = Field(..., min_length=2)
    item_class: Optional[str] = None
    pressure_class: Optional[int] = None
    size_inch: Optional[float] = None
    max_results: int = Field(default=20, le=100)


class NationalSearchItem(BaseModel):
    onmc_code: str
    canonical_description: str
    item_class: str
    size_inch: Optional[float]
    pressure_class: Optional[int]
    metallurgy: Optional[str]
    shell_mesc_code: Optional[str]
    unspsc_code: Optional[str]
    total_national_stock: int
    participating_cpse_count: int
    similarity_score: float
```

---

## 4. FastAPI Endpoint Specifications

### 4.1. Catalog Ingestion

- `POST /api/v1/ingest/upload`: Uploads catalog file (`.xlsx` or `.csv`). Dispatches streaming Celery/ARQ task. Returns `{"job_id": "uuid", "total_rows_queued": 12500}`.
- `GET /api/v1/ingest/status/{job_id}`: Polls or streams (SSE) progress through Stages 1 to 5.
- `GET /api/v1/ingest/summary/{job_id}`: Ingestion KPI analytics (Auto-approved %, Review Required %, Novel %).

### 4.2. National Search ("Search Before Buy")

- `POST /api/v1/search`: Hybrid dense vector (HNSW) + parametric filtered search. Latency SLA < 50ms at p95.

### 4.3. Data Steward Review Cockpit

- `GET /api/v1/steward/queue`: Paginated list of borderline candidate pairs (70% - 91% confidence) with delta attribute payload.
- `POST /api/v1/steward/decision`: Submits steward approve/reject/override action. Atomically records cryptographic audit log.

### 4.4. Inter-CPSE Surplus & Pooled Demand

- `GET /api/v1/surplus/nearby`: Queries non-moving stock within geographic radius of requesting plant.
- `GET /api/v1/demand-pool/batches`: Aggregates active purchase requisitions into joint tender opportunities.
