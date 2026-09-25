# SIH 26099 — Demo Mode (No MeghRaj / No SAP Required)

**Problem**: National Unified Material Master (NUMM)  
**Sponsor framing**: MoPNG · One Nation, One Material Code (ONMC)  
**This build**: Fully runnable hackathon POC. NIC MeghRaj cloud and CPSE SAP are **simulated integration seams**, not live connections.

---

## What judges need to hear (30 seconds)

> “We do not need MeghRaj credentials or SAP RFC access to evaluate NUMM. Identity is a **simulated MeghRaj SSO** with five role personas. ERP write-back is a **simulated SAP handshake** that emits VL01N / ME21N document IDs for the MTIRF flow. The **live engine** you will see is ingestion, normalization, safety gating, ONMC minting, Search Before Buy, surplus/MTIRF, pooled demand / GeM package, and the CVC SHA-256 audit chain — all offline on this laptop.”

---

## What works today (demoable)

| Capability                                              | Status                              | Where to click        |
| ------------------------------------------------------- | ----------------------------------- | --------------------- |
| Multi-CPSE catalog ingest (24 POC lines)                | **Live**                            | Ingestion             |
| Abbreviation expand + attribute extract                 | **Live**                            | Ingestion / Steward   |
| ASME/API safety gate (Class 150 ≠ 300)                  | **Live**                            | Steward Queue         |
| ONMC mint + MESC / UNSPSC / GeM crosswalk               | **Live**                            | Steward Mint / Search |
| Search Before Buy                                       | **Live**                            | Search Before Buy     |
| Surplus + MTIRF generate/approve                        | **Live** (SAP docs simulated)       | Surplus               |
| Pooled demand + GeM tender package                      | **Live** (export package simulated) | Pooled Demand         |
| CVC append-only SHA-256 ledger                          | **Live**                            | Security Vault        |
| Role personas (Steward / Procurement / Plant / Auditor) | **Simulated SSO**                   | Role dropdown         |

---

## What is intentionally simulated (upgrade path for production)

| Integration             | SIH behavior                                                                                     | Production upgrade                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| **NIC MeghRaj SSO**     | Demo JWTs from `/api/v1/auth/demo-tokens` + role switcher                                        | Real SAML 2.0 / OIDC with NIC IdP                       |
| **SAP ECC / S/4HANA**   | Simulated outbound VL01N + inbound ME21N IDs on MTIRF approve; BAPI button shows simulated toast | SAP RFC / BAPI_MATERIAL_SAVEDATA under steward approval |
| **GeM portal push**     | GeM-ready tender **package** generated in-app                                                    | GeM API draft tender submit                             |
| **Postgres + HNSW**     | SQLite default for zero-Docker laptop demo                                                       | `docker-compose` Postgres + pgvector                    |
| **Redis / ARQ workers** | In-process ingest                                                                                | Async workers for 100k+ catalogs                        |

Framing for jury: _“These are deliberate deep-module seams (ARCHITECTURE.md). The interface stays stable; production adapters plug in without rewriting the product.”_

---

## 5-minute live pitch (from POC.md)

1. **Problem** — Fragmented SAP MAKTX across IOCL/ONGC/BPCL → ₹4,000+ Cr inefficiency.
2. **ONMC** — Deterministic code + safety gate (show Class 300 vs 150 conflict).
3. **Live demo** — Steward queue approve/mint → Search Before Buy → 14 units Hazira surplus.
4. **Value** — MTIRF transfer + pooled demand 14.2% discount narrative.
5. **Compliance** — CVC vault verify chain → Architecture tab “SIH Demo Mode” slide.

---

## How to run for jury (laptop)

```bash
# Terminal 1 — API (SQLite, auto-seed)
cd backend
# or from repo root with your usual uvicorn entry
uvicorn backend.app.main:app --host 0.0.0.0 --port 8001

# Terminal 2 — UI
cd frontend
npm run dev
```

1. Open landing → **Enter dashboard**.
2. Role = **STEWARD** → Steward Queue → Approve safe match / Mint conflict.
3. **Search Before Buy** → `2 inch 150# flanged ball valve CS A105`.
4. **Surplus** → Generate + Approve MTIRF (note “Simulated SAP”).
5. **Security Vault** → Verify chain (AUDITOR role for verify/export).
6. **Architecture** → Point to SIH Demo Mode panel.

No NIC account. No SAP client. No internet required after deps installed.

---

## Judge FAQ

**Q: Is MeghRaj integrated?**  
A: Identity seam is MeghRaj-shaped (JWT roles matching MoPNG personas). Live NIC SSO is the production adapter; SIH uses signed demo tokens.

**Q: Does it write to SAP?**  
A: No — by design for SIH. PRD forbids silent SAP overwrite. We simulate the document handshake and keep steward / CVC audit as the control plane.

**Q: Why SQLite not Postgres?**  
A: Zero-Docker reliability for evaluation. Schema and services are Postgres-ready (`docker-compose.yml` + Alembic).

**Q: Can MoPNG deploy this?**  
A: Yes — same API surface; swap auth + SAP + GeM adapters; set `USE_SQLITE=false` and MeghRaj credentials in production env.
