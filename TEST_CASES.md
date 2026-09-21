# PR Test Cases Matrix & Loop Engineering Protocol (TEST_CASES.md)

## National Unified Material Master (NUMM) Framework

**Problem Statement**: SIH 26099 (Ministry of Petroleum & Natural Gas - MoPNG)  
**Standard**: One Nation, One Material Code (ONMC)  
**Version**: 2.2.0 (Verification Protocol)

---

## 1. Overview & Verification Philosophy

This document establishes the exhaustive testing matrix for the National Unified Material Master (NUMM) Framework, mapped directly to each Pull Request (PR) and developmental phase.

It integrates **Loop Engineering**—a deterministic verification cycle that executes tests, measures deviation against physical engineering standards, loops through iterative fine-tuning of weights and rules, and halts only upon verified convergence:

- **Safety Constraint Inviolability**: 0.0% false-positive matches between different pressure ratings (e.g. Class 150 vs Class 300) or nominal pipe sizes.
- **Extraction Accuracy**: ≥95.0% accuracy across engineering dimensions, metallurgy grades, and standards.
- **Execution Latency**: <50ms per pairwise item evaluation on standard CPU.

---

## 2. Loop Engineering Framework

```
                       ┌──────────────────────────────┐
                       │   1. Test Input Injection    │
                       │   (Synthetic & Real Catalogs)│
                       └──────────────┬───────────────┘
                                      │
                                      ▼
                       ┌──────────────────────────────┐
                       │   2. Component Execution     │
                       │   (Normalization, Match, XAI)│
                       └──────────────┬───────────────┘
                                      │
                                      ▼
                       ┌──────────────────────────────┐
                       │   3. Assert Evaluation       │
                       │   - Attribute Accuracy       │
                       │   - Hard Rule Violations     │
                       │   - Cosine Score Thresholds  │
                       └──────────────┬───────────────┘
                                      │
                         Is Convergence Met?
                       ┌──────────────┴───────────────┐
                      YES                             NO
                       │                              │
                       ▼                              ▼
          ┌─────────────────────────┐   ┌───────────────────────────┐
          │  4. PR Merge Approved   │   │  5. Feedback Loop Iterate │
          │  (Zero Safety Regress)  │   │  - Update Regex / Weights │
          └─────────────────────────┘   │  - Expand Synonym Dict    │
                                        │  - Adjust Penalty Factor  │
                                        └─────────────┬─────────────┘
                                                      │
                                                      └─────── Re-run Loop
```

---

## 3. Pull Request Test Matrix

### PR 1: Infrastructure & Database Foundation

- **Scope**: PostgreSQL 16 schema, `pgvector` HNSW index, Redis 7 configuration, Docker Compose.

| Test ID       | Category     | Description                   | Input Fixture               | Expected Outcome                                                     | Verification Command                   | Status |
| ------------- | ------------ | ----------------------------- | --------------------------- | -------------------------------------------------------------------- | -------------------------------------- | ------ |
| **TC-PR1-01** | Database DDL | Table creation & foreign keys | Initial SQL migration       | All 10 tables exist with strict FK constraints                       | `docker compose exec db psql -c "\dt"` | PASS   |
| **TC-PR1-02** | Vector Index | HNSW index creation           | `material_embeddings` table | Index `idx_material_embeddings_hnsw` active with `vector_cosine_ops` | `docker compose exec db psql -c "\di"` | PASS   |
| **TC-PR1-03** | Redis Cache  | Redis queue connection        | ARQ worker ping             | PING returns PONG within <5ms                                        | `redis-cli ping`                       | PASS   |

---

### PR 2: NLP Normalization & Attribute Extraction Engine

- **Scope**: Abbreviation expansion, metric-imperial unit harmonization, regex extraction.

| Test ID       | Category           | Description                   | Input Fixture                             | Expected Outcome                                   | Verification Command                      | Status |
| ------------- | ------------------ | ----------------------------- | ----------------------------------------- | -------------------------------------------------- | ----------------------------------------- | ------ |
| **TC-PR2-01** | NLP Clean          | Abbreviation expansion        | `"VLV BL FLGD 50MM 150# CS A105"`         | `"VALVE BALL FLANGED 50MM 150# CARBON STEEL A105"` | `pytest tests/test_nlp.py::test_abbrev`   | PASS   |
| **TC-PR2-02** | Unit Normalization | Metric to Imperial NB         | `"50MM NB"`, `"50 MM"`, `"DN 50"`         | `size_inch = 2.0`, `size_mm = 50`                  | `pytest tests/test_nlp.py::test_units`    | PASS   |
| **TC-PR2-03** | Pressure Extract   | Pressure rating extraction    | `"150#", "CL 150", "CLASS 150", "150 LB"` | `pressure_class = 150`                             | `pytest tests/test_nlp.py::test_pressure` | PASS   |
| **TC-PR2-04** | Metallurgy         | Metallurgy grade extraction   | `"ASTM A105", "CS A105", "A-105"`         | `metallurgy = "ASTM_A105"`                         | `pytest tests/test_nlp.py::test_alloy`    | PASS   |
| **TC-PR2-05** | Flange Extract     | Flange & Gasket extraction    | `"FLG WNRF 6IN 150# SCH40 A105"`          | `item_class = "WELD_NECK_FLANGE", size = 6.0`      | `pytest tests/test_nlp.py::test_flange`   | PASS   |
| **TC-PR2-06** | Pipe Extract       | Seamless line pipe extraction | `"PIPE SMLS 4IN SCH40 A106 GR B"`         | `item_class = "LINE_PIPE", size = 4.0`             | `pytest tests/test_nlp.py::test_pipe`     | PASS   |

---

### PR 3: Hybrid Matching & Safety Rule Gates

- **Scope**: Vector similarity scoring, ASME physical safety gate, deterministic ONMC minting.

| Test ID       | Category     | Description                      | Input Fixture                              | Expected Outcome                                                       | Verification Command                               | Status |
| ------------- | ------------ | -------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------- | ------ |
| **TC-PR3-01** | Safety Gate  | Class 150 vs Class 300 conflict  | Pair with 150# and 300# ratings            | **Disqualified**. Confidence forced to 0.0%. Safety violation flagged. | `pytest tests/test_matcher.py::test_pressure_gate` | PASS   |
| **TC-PR3-02** | Safety Gate  | Size 2" vs Size 3" conflict      | Pair with 2.0" and 3.0" sizes              | **Disqualified**. Confidence forced to 0.0%.                           | `pytest tests/test_matcher.py::test_size_gate`     | PASS   |
| **TC-PR3-03** | Matcher      | High-confidence cross-CPSE match | IOCL Mathura vs ONGC Hazira 2" Ball Valves | Confidence ≥ 90.0%, Rule Gate = TRUE                                   | `pytest tests/test_matcher.py::test_valid_match`   | PASS   |
| **TC-PR3-04** | Taxonomy Map | Shell MESC & UNSPSC Cross-Walk   | 2" Class 150 A105 Ball Valve               | MESC = `74.16.01.015.1`, UNSPSC = `40141607`                           | `pytest tests/test_matcher.py::test_taxonomy`      | PASS   |
| **TC-PR3-05** | ONMC Minter  | Deterministic code generation    | Validated 2" Class 150 A105 Ball Valve     | `ONMC-MECH-VLV-BAL-002-150-A105-XXXX` with stable SHA hash             | `pytest tests/test_matcher.py::test_mint`          | PASS   |

---

### PR 4: Full-Stack Web Application (Astryx + StyleX)

- **Scope**: Keyboard triage shortcuts, StyleX token compilation, WCAG AA accessibility.

| Test ID       | Category     | Description               | Input Fixture           | Expected Outcome                                | Verification Command                                 | Status |
| ------------- | ------------ | ------------------------- | ----------------------- | ----------------------------------------------- | ---------------------------------------------------- | ------ |
| **TC-PR4-01** | Keyboard Nav | Press <kbd>A</kbd> key    | Focused borderline item | Calls approve mutation, advances to next row    | `pnpm test src/components/ReviewCockpit.test.tsx`    | PASS   |
| **TC-PR4-02** | Keyboard Nav | Press <kbd>R</kbd> key    | Focused borderline item | Calls reject/split mutation, marks novel code   | `pnpm test src/components/ReviewCockpit.test.tsx`    | PASS   |
| **TC-PR4-03** | Diff UI      | Attribute conflict render | Pressure mismatch pair  | Renders attribute in Crimson Wine (`#9B121E`)   | `pnpm test src/components/MaterialDiffCard.test.tsx` | PASS   |
| **TC-PR4-04** | StyleX Build | Bundle compilation        | Production build        | Zero CSS-in-JS runtime injection, bundle <180kB | `pnpm build`                                         | PASS   |

---

### PR 5: Inter-CPSE Surplus Discovery & Pooled Demand

- **Scope**: Geographic distance calculation, demand aggregation, volume discount tiers.

| Test ID       | Category    | Description                  | Input Fixture                                   | Expected Outcome                                       | Verification Command                          | Status |
| ------------- | ----------- | ---------------------------- | ----------------------------------------------- | ------------------------------------------------------ | --------------------------------------------- | ------ |
| **TC-PR5-01** | Surplus Geo | Neighboring plant distance   | ONGC Hazira to IOCL Gujarat Refinery            | Distance = 78 km; flagged as High Feasibility Transfer | `pytest tests/test_surplus.py::test_distance` | PASS   |
| **TC-PR5-02** | Demand Pool | Commodity volume aggregation | IOCL (1200) + BPCL (850) + HPCL (900) 2" Valves | Total = 2,950 units; Volume savings = 14.2% (₹1.14 Cr) | `pytest tests/test_demand.py::test_pooling`   | PASS   |

---

### PR 6: Audit Logging & Enterprise Security

- **Scope**: Cryptographic audit hash chains, CVC compliance, RBAC authorization.

| Test ID       | Category    | Description                   | Input Fixture                              | Expected Outcome                                          | Verification Command                          | Status |
| ------------- | ----------- | ----------------------------- | ------------------------------------------ | --------------------------------------------------------- | --------------------------------------------- | ------ |
| **TC-PR6-01** | Audit Chain | Cryptographic hash generation | Steward approves mapping                   | Append-only record with SHA-256 hash chaining prior state | `pytest tests/test_audit.py::test_hash_chain` | PASS   |
| **TC-PR6-02** | RBAC Auth   | Role access verification      | Procurement officer attempts data deletion | HTTP 403 Forbidden                                        | `pytest tests/test_auth.py::test_rbac`        | PASS   |
