# Technology Stack Documentation (TECH_STACK.md)

## National Unified Material Master (NUMM) Framework

**Problem Statement**: SIH 26099 (Ministry of Petroleum & Natural Gas - MoPNG)  
**Standard**: One Nation, One Material Code (ONMC)  
**Version**: 2.2.0 (Enterprise Specification)  
**Last Updated**: 2026-09-21

---

## 1. Stack Architectural Overview

The NUMM Framework employs a decoupled, asynchronous microservices architecture engineered specifically for high-throughput public sector industrial catalog processing:

- **Frontend Presentation Layer**: High-density enterprise single page application (SPA) built with React 19, Astryx Design System, and StyleX.
- **Backend API & Orchestration**: Asynchronous Python 3.11 + FastAPI microservices serving REST, WebSockets, and Server-Sent Events (SSE).
- **Hybrid Storage & Vector Search**: PostgreSQL 16 with `pgvector` 0.8+ executing HNSW cosine similarity search combined with ACID relational tables.
- **Asynchronous Task Processing**: Redis 7.4 with ARQ / Celery workers for streaming catalog ingestion, NLP extraction, and batch vector generation.
- **AI/ML & NLP Engine**: Dual-tier pipeline pairing dense semantic embeddings (`BAAI/bge-large-en-v1.5`) with C++ accelerated lexical string algorithms (`RapidFuzz`, `Jellyfish`) and deterministic engineering rule gating.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User & Enterprise Layer                         │
│     - CPSE Data Stewards    - Plant Engineers    - Procurement CPOs    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTPS (TLS 1.3) / WebSockets
┌───────────────────────────────────▼────────────────────────────────────┐
│                        Frontend SPA Application                        │
│   - React 19.0.0 + Vite 6.0.3 + TypeScript 5.6 (Strict Mode)           │
│   - Astryx Design System (@astryxdesign/core @ 1.2.0)                  │
│   - StyleX (@stylexjs/stylex @ 0.9.3) Zero-Runtime CSS Engine          │
│   - TanStack Table v8 (Virtualized Grid) + TanStack Query v5           │
│   - Zustand 5.0 (Client Triage State) + ECharts 5.5 (Visualizations)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ RESTful JSON / SSE Streams
┌───────────────────────────────────▼────────────────────────────────────┐
│                         API Gateway & Middleware                       │
│   - FastAPI 0.115.6 + Uvicorn 0.34.0 (uvloop worker class)             │
│   - OAuth2 / SAML 2.0 (NIC SSO & CPSE Active Directory)                │
│   - Rate Limiting, Request Validation (Pydantic v2.10.3)               │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │ Enqueue Batch
         Synchronous Queries             ┌───────────▼───────────┐
                    │                    │ Redis 7.4 Task Queue  │
                    │                    └───────────┬───────────┘
                    │                                │ Consume Jobs
                    │                    ┌───────────▼───────────┐
                    │                    │ ARQ / Celery Workers  │
                    │                    │ - PyTorch 2.5.1       │
                    │                    │ - BGE Embedding Model │
                    │                    └───────────┬───────────┘
                    │                                │
┌───────────────────▼────────────────────────────────▼───────────────────┐
│               PostgreSQL 16.6 + pgvector 0.8.0 Database                │
│   - HNSW Cosine Vector Index (1024-dimensional dense vectors)          │
│   - Relational Master Tables (Organizations, Users, Mappings)          │
│   - Append-Only CVC Cryptographic Audit Ledger                         │
│   - MESC & UNSPSC Taxonomy Cross-Walk Tables                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Stack Specifications

### 2.1. Core Runtime & Build Tooling

- **Framework**: React 19.0.0
  - _Rationale_: React 19 brings React Server Actions, asset loading optimizations, and concurrent rendering necessary for 10,000+ item virtualized catalog grids.
- **Build Tool / Bundler**: Vite 6.0.3
  - _Rationale_: Sub-second Hot Module Replacement (HMR) and optimized Rollup tree-shaking for minimal production bundle footprint (<180kB initial gzip).
- **Language**: TypeScript 5.6.3 (Strict Mode enabled, `noImplicitAny: true`, `strictNullChecks: true`).

### 2.2. Design System & Styling Engine

- **Design System**: **Astryx Design System**
  - Package: `@astryxdesign/core` @ 1.2.0
  - Theme: `@astryxdesign/theme-neutral` @ 1.2.0
- **Styling Architecture**: **StyleX** (`@stylexjs/stylex` @ 0.9.3)
  - _Rationale_: Zero-runtime CSS-in-JS developed by Meta. Guarantees deterministic style resolution, eliminates runtime CSS style-injection overhead, and enforces strict token constraints suitable for mission-critical sovereign software.
- **Aesthetic Direction**: Humanto-inspired warm sovereign industrial theme (`#E94344` terracotta red, `#9B121E` crimson wine, `#F1CC9D` sandstone, `#5F978E` petroleum sage, `#593C32` deep umber, `#A5D7C9` soft mint).

### 2.3. State Management & Data Grids

- **Server State**: TanStack Query (React Query) v5.62.7
  - Automatic background refetching, cache invalidation, and optimistic UI mutations for instant review approvals.
- **Client State**: Zustand 5.0.2
  - Ultra-lightweight store (1.2kB) managing data steward review queues, active filters, and keyboard triage state.
- **Data Table Engine**: TanStack Table v8.20.5
  - Headless virtualized data grid rendering 10,000+ material rows at a locked 60 FPS.
- **Charts & Data Analytics**: Apache ECharts 5.5.1 via `echarts-for-react` 3.0.2.
- **Icons**: Lucide React 0.468.0.

---

## 3. Backend Stack Specifications

### 3.1. Web Framework & Runtime

- **Runtime**: Python 3.11.10
  - Native performance optimizations (up to 25% faster than Python 3.10) combined with full C-extension compatibility for PyTorch, NumPy, and RapidFuzz.
- **Web Framework**: FastAPI 0.115.6
  - High-throughput asynchronous routing with automated OpenAPI documentation and async I/O.
- **ASGI Server**: Uvicorn 0.34.0 configured with `uvloop` event loop engine.
- **Data Serialization & Validation**: Pydantic v2.10.3 (Rust-backed validation engine).

### 3.2. Database & Vector Storage

- **Relational Database**: PostgreSQL 16.6
- **Vector Search Extension**: `pgvector` 0.8.0
  - Index Type: HNSW (Hierarchical Navigable Small World) with cosine distance (`vector_cosine_ops`).
  - Index Configuration: `m = 16`, `ef_construction = 64`, enabling sub-50ms nearest neighbor search across 1,000,000 dense vectors.
- **Object Relational Mapper**: SQLAlchemy 2.0.36 in full async mode using the `asyncpg` 0.30.0 driver.
- **Schema Migrations**: Alembic 1.14.0.

### 3.3. Task Queue & In-Memory Caching

- **Cache Engine**: Redis 7.4.1 (Alpine Linux container).
- **Asynchronous Task Queue**: ARQ 0.26.1 / Celery 5.4.0
  - Asynchronous background worker processing of multi-gigabyte SAP catalog exports, batch NLP entity extraction, and embedding computations without blocking HTTP server threads.

---

## 4. AI / ML & Natural Language Processing Pipeline

### 4.1. Dense Semantic Embeddings

- **Model**: `BAAI/bge-large-en-v1.5`
  - Dimensions: 1024-dimensional dense vectors.
  - Context Window: 512 tokens.
  - Evaluation Benchmark: Top-ranked model on Massive Text Embedding Benchmark (MTEB) for technical domain retrieval.
  - CPU Fallback: `sentence-transformers/all-MiniLM-L6-v2` (384-dimensional) for constrained edge environments.
- **Framework**: `sentence-transformers` 3.3.1 + PyTorch 2.5.1.

### 4.2. Lexical & Phonetic Matching Engines

- **Fuzzy String Distance**: `RapidFuzz` 3.10.1 (C++ SIMD-accelerated implementation of Levenshtein, Jaro-Winkler, and Token Sort Ratio).
- **Phonetic Encoding**: `Jellyfish` 1.1.0 (Double Metaphone algorithm to catch phonetic spelling errors in manual SAP entries, e.g. `FLANGE` vs `FLNGE` vs `PHLANGE`).

### 4.3. Domain Attribute Normalization & Extraction

- **Regex Engine**: Python standard `re` module with PCRE word boundary matching.
- **Physical Unit Normalization**: `Pint` 0.24.4 (converts metric millimeters to imperial nominal bore inches, and bar/psi to ASME pressure classes).
- **Domain Dictionaries**: Curated Oil & Gas knowledge base covering:
  - 250+ engineering abbreviations (`VLV`, `FLG`, `CS`, `SS316`, `SPWD`, `WCB`).
  - Shell MESC Group 74/76/60/27 taxonomy mapping tables.
  - UNSPSC Segment 40/31 commodity coding tables.
  - ASTM, ASME, and API engineering specification standards.

---

## 5. Security, Compliance & DevOps

### 5.1. Authentication & Enterprise Integration

- **SSO Protocol**: SAML 2.0 & OAuth2 OpenID Connect for integration with NIC National Informatics Centre and CPSE Active Directories.
- **Cryptographic Signing**: Ed25519 and RS256 JWT tokens.
- **Password Hashing**: Argon2id via `pwdlib` (RFC 9106 compliant).
- **Audit Ledger**: SHA-256 append-only hash chains recording all data steward approvals for Central Vigilance Commission (CVC) compliance.

### 5.2. Containerization & Deployment

- **Container Platform**: Docker 27.3.1 & Docker Compose v2.30.0.
- **Target Cloud**: NIC National Cloud (MeghRaj) / On-premise air-gapped PSU data centers.
- **Base OS Images**: `python:3.11-slim-bookworm` and `node:20-alpine`.
