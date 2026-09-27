# National Unified Material Master (NUMM)

NUMM is an offline-first reference implementation for **One Nation, One Material Code (ONMC)**. It helps CPSE material stewards normalize catalog descriptions, reject unsafe matches, mint canonical codes, find transferable stock, and preserve a tamper-evident audit trail.

It is built for Smart India Hackathon 2026 problem **SIH 26099**. The repository runs on a laptop without cloud credentials, SAP access, or hosted AI services.

## What is live

- Catalog ingestion, abbreviation expansion, attribute extraction, and deterministic safety gates.
- ONMC minting with MESC, UNSPSC, and GeM crosswalk fields.
- Steward review, Search Before Buy, surplus transfer (MTIRF), pooled demand, and audit verification.
- Five local demo personas and simulated MeghRaj/SAP/GeM seams for the SIH presentation.

## Architecture

The standard demo path is deliberately small and self-contained:

```text
React + Vite  ── /api (same origin) ──>  FastAPI + SQLite
                                             │
                                  deterministic embeddings + RapidFuzz
                                             │
                               ASME/API safety gate + SHA-256 audit chain
```

Vite proxies `/api` to FastAPI during development. The production Nginx configuration performs the same proxy, so the browser never needs a hosted backend URL or an API key. The semantic matcher uses an offline deterministic projection by default. A BGE model may be pre-provisioned locally only when an operator explicitly enables it; NUMM never downloads a model at runtime.

## Quick start

### Prerequisites

- Python 3.11+
- Node.js 20+ with Corepack-enabled pnpm

### 1. Install the local dependencies

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r config/requirements.txt
corepack enable
pnpm --dir frontend install --frozen-lockfile
```

### 2. Start the API

```powershell
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```

The API auto-seeds SQLite at `numm_dev.db`. Verify it at `http://127.0.0.1:8000/health` or inspect the API at `http://127.0.0.1:8000/docs`.

### 3. Start the frontend

In a second terminal:

```powershell
pnpm --dir frontend dev
```

Open `http://127.0.0.1:5173`. Choose **Enter dashboard**, then use the role switcher to exercise the steward, procurement, plant, auditor, and administrator flows.

## Verification

Run these before sharing a build:

```powershell
python verify_poc_and_tests.py
python -m ruff check backend
pnpm --dir frontend build
```

To exercise the containerized production topology (PostgreSQL + pgvector, Redis, FastAPI, and Nginx), run:

```powershell
docker compose -f docker-compose.prod.yml up --build
```

For an SIH jury walkthrough, use [SIH_DEMO.md](SIH_DEMO.md). It identifies exactly which integrations are simulated and which product flows are live.

## Configuration

The default configuration needs no `.env` file. Useful local settings are:

| Variable | Default | Purpose |
| --- | --- | --- |
| `USE_SQLITE` | `true` | Uses the zero-setup local database. Set `false` only for the PostgreSQL deployment. |
| `SQLITE_DB_PATH` | `./numm_dev.db` | Local SQLite database location. |
| `NUMM_USE_LOCAL_BGE` | unset | Set to `true` only after pre-provisioning BGE and its Python package in the local environment; otherwise the deterministic offline matcher is used. |
| Browser `NUMM_API_BASE` local-storage key | unset | Optional explicit integration-test target. Normal development and production use same-origin `/api`. |

Do not put secrets in frontend variables. This project has no Groq, Firecrawl, Render, or other hosted runtime dependency.

## Deployment modes

| Mode | Storage | Network requirement | Intended use |
| --- | --- | --- | --- |
| Laptop demo | SQLite | None after dependencies are installed | SIH presentation and development |
| Self-hosted production | PostgreSQL/pgvector + Redis | Your managed infrastructure | CPSE/NIC deployment |
| Air-gapped deployment | Pre-built images and local packages | None | Restricted refinery or PSU environment |

The production deployment guide is [RUNBOOK.md](RUNBOOK.md). Real MeghRaj SSO, SAP RFC/BAPI, and GeM APIs are production adapters; they are not present in the demo build.

## Documentation map

| Document | Use it for |
| --- | --- |
| [PRD.md](PRD.md) | Problem, users, scope, and priorities |
| [CONTEXT.md](CONTEXT.md) | Domain language and invariants |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Module boundaries and integration seams |
| [TECH_STACK.md](TECH_STACK.md) | Technology choices and production target |
| [BACKEND_STRUCTURE.md](BACKEND_STRUCTURE.md) | API, data model, and migrations |
| [FRONTEND_GUIDELINES.md](FRONTEND_GUIDELINES.md) | UI system and interaction patterns |
| [APP_FLOW.md](APP_FLOW.md) | User journeys and state transitions |
| [DESIGN.md](DESIGN.md) | Visual system and layouts |
| [POC.md](POC.md) | Demo data and pitch script |
| [TEST_CASES.md](TEST_CASES.md) | Acceptance and regression coverage |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | Phased delivery plan |

## Repository layout

```text
backend/      FastAPI API, services, schemas, database seed, and migrations
frontend/     React application, Vite configuration, and Nginx reverse proxy
config/       Minimal Python dependency set for the supported runtime
evals/        Benchmark evaluation scripts
tests/        Automated tests
```

## Security notes

- The demo tokens and SAP document numbers are intentionally simulated; they are not a production identity or ERP integration.
- The audit chain is an application-level SHA-256 integrity control. Production deployment still requires operational controls, backups, access management, and an independently reviewed key-management design.
- Use environment-managed secrets for self-hosted database and Redis credentials. Never commit secrets or vendor API keys.
