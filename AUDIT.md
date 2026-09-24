# NUMM Platform — Full Hackathon Audit, Findings & Implementation Plan

> **SIH 26099 · Ministry of Petroleum & Natural Gas · National Unified Material Master (NUMM) Framework v2.2.0**
> Audit date: 2026-09-24 · Auditor: Antigravity AI (gstack + loop engineering + antigravity-awesome-skills)

---

## Executive Summary

| Dimension | Status |
|-----------|--------|
| Backend boot | ✅ Fixed & Running `:8000` |
| Frontend boot | ✅ Running `:5173` |
| Auth (JWT) | ✅ Fixed — public routes working |
| Frontend API integration | ✅ Fixed — Bearer headers wired via `auth.ts` |
| DB seed | ✅ Auto-seeded on startup (SQLite) |
| antigravity-awesome-skills | ✅ v13.13.0 installed |
| Production-readiness | 🟡 SQLite mode — fine for hackathon demo |

---

## 1. Critical Bugs Fixed This Session

### 1.1 — Auth Guard Blocked All Public Endpoints (CRITICAL ✅ Fixed)
**File:** [`backend/app/api/v1/api.py`](file:///d:/oil/backend/app/api/v1/api.py)

All routes including `/auth/login` and `/auth/demo-tokens` had `Depends(get_current_user)` via the global `api_router`. Every unauthenticated client got `401 Not authenticated` — a chicken-and-egg deadlock.

**Fix:** Split into `public_router` (no auth: `/auth/*`) and `api_router` (Bearer required). Both mounted in `main.py`.

```python
# Before — deadlock: /auth/login required a token to get a token
api_router = APIRouter(dependencies=[Depends(get_current_user)])
api_router.include_router(auth.router, prefix="/auth")  # ❌ 401

# After — auth routes public
public_router = APIRouter()
public_router.include_router(auth.router, prefix="/auth")  # ✅
api_router = APIRouter(dependencies=[Depends(get_current_user)])  # protected
```

---

### 1.2 — SQLite Not Default — Backend Crashed Without Postgres (CRITICAL ✅ Fixed)
**File:** [`backend/app/core/config.py`](file:///d:/oil/backend/app/core/config.py)

`USE_SQLITE: bool = False` caused `RuntimeError: POSTGRES_PASSWORD is not set` at startup.

**Fix:** Changed default to `USE_SQLITE: bool = True`. Config now searches both `.env` and `backend/.env`. CORS changed from `["http://localhost:3000"]` to `["*"]`.

---

### 1.3 — Frontend Had No Auth — All API Calls Silent 401 (CRITICAL ✅ Fixed)
**Files:**
- [`frontend/src/auth.ts`](file:///d:/oil/frontend/src/auth.ts) — **New file** — auth singleton
- [`frontend/src/main.tsx`](file:///d:/oil/frontend/src/main.tsx) — `ensureAuth()` on startup
- [`frontend/src/components/SearchBeforeBuy.tsx`](file:///d:/oil/frontend/src/components/SearchBeforeBuy.tsx)
- [`frontend/src/components/CatalogIngestionView.tsx`](file:///d:/oil/frontend/src/components/CatalogIngestionView.tsx)

Frontend used raw `fetch()` with no `Authorization` header. Protected API calls all failed silently; components fell back to static mock data permanently.

**Fix:** Created `auth.ts` with:
- `ensureAuth()` — auto-fetches demo STEWARD token on first load, stores in `localStorage`
- `apiFetch()` — drop-in `fetch` wrapper that injects `Bearer` header
- All `fetch()` calls in `SearchBeforeBuy`, `CatalogIngestionView` switched to `apiFetch()`

---

### 1.4 — SQLite Tables Never Created on Startup (HIGH ✅ Fixed)
**File:** [`backend/app/main.py`](file:///d:/oil/backend/app/main.py)

`startup_event` only checked Postgres. In SQLite mode no tables existed; any DB query crashed with `no such table`.

**Fix:** `startup_event` now runs `Base.metadata.create_all` + `seed_db()` when `USE_SQLITE=True`.

---

### 1.5 — CORS Blocked Frontend (MEDIUM ✅ Fixed)
Vite runs on `:5173`. CORS was only `["http://localhost:3000"]` — preflight blocked.

**Fix:** CORS now `["*"]` for hackathon. Upgrade to explicit domain list for production.

---

## 2. Remaining Issues (Ranked — Next Actions)

### P1 — Do Before Presentation

| # | Issue | File | Fix |
|---|-------|------|-----|
| 2.1 | `ClusterReviewCockpit`, `SurplusAndDemandView`, `SecurityAuditView` have bare `fetch()` calls — no Bearer token | `*.tsx` | Replace `fetch(` with `apiFetch(` from `../auth` |
| 2.2 | Search returns 0 results — only 2 ONMC masters seeded, no RawMaterial/Mapping records | `seed.py` | Expand seed: add 6 RawMaterial + MaterialMapping records per CPSE (IOCL, ONGC, BPCL, HPCL, GAIL) |
| 2.3 | SSE progress stream (`EventSource`) can't send Bearer header — ingest progress bar will break | `CatalogIngestionView.tsx` / `ingest.py` | Add `?token=` query param to SSE URL; validate on backend in `/ingest/stream/{job_id}` |
| 2.4 | `MINTED_NOVEL` + `OVERRIDDEN` not in `MaterialMapping` CheckConstraint — Postgres crash | `models.py` L239 | Add both to `ck_mapping_status` constraint values |

### P2 — Quality/Polish

| # | Issue | Fix |
|---|-------|-----|
| 2.5 | Hardcoded JWT `SECRET_KEY` in `meghraj_auth_service.py` | Move to `settings.JWT_SECRET_KEY` from env |
| 2.6 | `asyncio.sleep(0.3)` per ingest item slows demo (6 items = 1.8s) | Add `DEMO_SLEEP_MS=0` env var |
| 2.7 | Steward `APPROVE`/`REJECT` buttons in Cockpit don't call real API | Wire to `POST /api/v1/steward/decision` |
| 2.8 | `TransferModal` doesn't call `/surplus/mtirf/generate` | Wire modal submit to real MTIRF endpoint |
| 2.9 | `stewardPendingCount={84}` is hardcoded in `App.tsx` | Fetch from `GET /api/v1/steward/queue` on mount |

### P3 — Production (Post-Hackathon)

| # | Issue |
|---|-------|
| 3.1 | Replace CORS `*` with explicit domain |
| 3.2 | Replace `EventSource` with `fetch` + `ReadableStream` for SSE |
| 3.3 | Add Redis + ARQ workers for heavy ingest |
| 3.4 | Add pgvector HNSW for real 1024-dim semantic search |
| 3.5 | Add API rate limiting middleware |
| 3.6 | Move JWT secret to Vault / AWS Secrets Manager |

---

## 3. Architecture Audit (gstack /health)

### What's Solid ✅
| Component | Notes |
|-----------|-------|
| FastAPI layering | Clean `endpoints → services → models` separation |
| JWT auth | Pure stdlib HMAC-SHA256 — no external JWT lib dependency |
| Hybrid matcher | RapidFuzz + BGE sentence-transformers — correct semantic approach |
| SQLite/Postgres duality | `PortableVector`, `PortableJSON` decorators — portable schema |
| CVC audit chain | SHA-256 hash chaining on every steward decision — audit-compliant |
| Error boundary | `RootErrorBoundary` in `main.tsx` — handles all UI crashes |
| ONMC minter | Deterministic code gen with verification hash |
| Mock data richness | All components have realistic fallback data — demo never crashes |

### Gaps Identified
| Gap | Severity |
|-----|----------|
| No stock data in search results (seed too thin) | HIGH |
| SSE auth broken | MEDIUM |
| CheckConstraint mismatch (`MINTED_NOVEL`) | MEDIUM |
| Frontend components not all using `apiFetch` | MEDIUM |
| Hardcoded JWT secret | LOW (demo) |

---

## 4. Skills & Tools Status

### antigravity-awesome-skills
- **Version:** v13.13.0 (19,719 files cloned)
- **Location:** `C:\Users\Administrator\.gemini\antigravity\workspace-skills\`
- **Note:** Windows symlinks prevented install to default path. Installed to `workspace-skills` instead.

### gstack
- Binary `gstack-skill-start` not present on this Windows machine — ran in degraded mode.
- Applied gstack disciplines manually: `/health` (architecture review), `/review` (code diff), `/qa` (live endpoint testing).

---

## 5. How to Start the App

```powershell
# Backend (terminal 1)
cd d:\oil
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
# → http://127.0.0.1:8000
# → SQLite DB auto-created at ./numm_dev.db
# → Seeded with ONMC masters on first boot
# → API docs: http://127.0.0.1:8000/docs

# Frontend (terminal 2)
cd d:\oil\frontend
pnpm run dev
# → http://localhost:5173
# → Auto-fetches demo STEWARD token on startup
```

---

## 6. Demo Persona Credentials

| Role | Email | Password |
|------|-------|---------|
| ADMIN | admin@numm.gov.in | AdminPassword@2026 |
| STEWARD | steward.iocl@numm.gov.in | StewardPass@2026 |
| PROCUREMENT | procurement.ongc@numm.gov.in | ProcurePass@2026 |
| AUDITOR | auditor.cvc@nic.in | AuditorPass@2026 |

```bash
# Get all tokens at once (no auth needed):
curl http://127.0.0.1:8000/api/v1/auth/demo-tokens
```

---

## 7. Verified API Endpoints (Live Test Results)

| Method | Path | Auth | Live Status |
|--------|------|------|------------|
| GET | `/health` | None | ✅ 200 |
| GET | `/api/v1/auth/demo-tokens` | None | ✅ 200 — 4 personas |
| POST | `/api/v1/auth/login` | None | ✅ 200 |
| GET | `/api/v1/health` | Bearer | ✅ 200 — sqlite mode |
| POST | `/api/v1/search` | Bearer | ✅ 200 — 0 results (seed P1.2) |
| GET | `/api/v1/steward/queue` | Bearer | ✅ 200 — 0 items (seed P1.2) |
| POST | `/api/v1/ingest/batch` | Bearer | ✅ 200 — job_id returned |
| GET | `/api/v1/ingest/stream/{id}` | Bearer | ⚠️ SSE auth broken (P1.3) |
| GET | `/api/v1/ingest/summary/{id}` | Bearer | ✅ Available after job completes |
| GET | `/api/v1/surplus/plants` | Bearer | Not yet tested |
| GET | `/docs` | None | ✅ Swagger UI |

---

## 8. Full File Change Log

| File | Change |
|------|--------|
| `backend/app/api/v1/api.py` | Split into `public_router` + `api_router` |
| `backend/app/core/config.py` | `USE_SQLITE=True` default; multi-path `.env` loading |
| `backend/app/main.py` | Mount `public_router`; SQLite auto-init; CORS `*` |
| `backend/.env` | `USE_SQLITE=True` |
| `frontend/src/auth.ts` | **New** — auth singleton with `ensureAuth`, `apiFetch`, `setPersona` |
| `frontend/src/main.tsx` | `ensureAuth()` called on startup |
| `frontend/src/components/SearchBeforeBuy.tsx` | `fetch` → `apiFetch` |
| `frontend/src/components/CatalogIngestionView.tsx` | `fetch` → `apiFetch` (batch + upload) |

---

*Audit by Antigravity AI · gstack /health + /review + /qa disciplines · antigravity-awesome-skills v13.13.0*
