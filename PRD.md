# Product Requirements Document (PRD)

## National Unified Material Master (NUMM) Framework

### AI-Driven Standardization and Harmonization of Material Codes Across CPSEs

**Problem Statement Code**: SIH 26099 (Smart India Hackathon 2026)  
**Sponsoring Organization**: Ministry of Petroleum & Natural Gas (MoPNG), Government of India  
**Document Version**: 2.2.0 (Enterprise Production Specification)  
**Last Updated**: 2026-09-21  
**Status**: Approved for Architecture & Implementation

---

## 1. Executive Summary & Product Overview

### 1.1. Executive Summary

India's Central Public Sector Enterprises (CPSEs) operating under the Ministry of Petroleum & Natural Gas (MoPNG)—including Indian Oil Corporation Limited (IOCL), Oil and Natural Gas Corporation (ONGC), Bharat Petroleum Corporation Limited (BPCL), Hindustan Petroleum Corporation Limited (HPCL), GAIL (India) Limited, Oil India Limited (OIL), Engineers India Limited (EIL), Numaligarh Refinery Limited (NRL), Mangalore Refinery and Petrochemicals Limited (MRPL), and Chennai Petroleum Corporation Limited (CPCL)—collectively manage over ₹3.5 Lakh Crore ($42 Billion USD) in operational and capital procurements annually.

These enterprises maintain independent, isolated Enterprise Resource Planning (ERP) installations (principally SAP ECC 6.0, SAP S/4HANA, and Oracle E-Business Suite) containing an estimated 4.2 million active and legacy Material Master catalog line items. Due to decades of decentralized cataloging, plant-specific entry customs, and free-text requisitioning, the identical physical industrial part (such as valves, pipe fittings, flanges, gaskets, heat exchanger tubes, and instrumentation sensors) is cataloged under thousands of distinct, incompatible internal material numbers and unstructured descriptions.

The **National Unified Material Master (NUMM) Framework** is an AI-powered enterprise data harmonization and collaborative procurement platform. Acting as a sovereign "universal translator" for India's public sector supply chain, NUMM continuously ingests, cleanses, standardizes, and clusters legacy procurement catalogs. It introduces the **One Nation, One Material Code (ONMC)** architecture: a deterministic, hierarchical, attribute-anchored national codification standard that maps bi-directionally to existing CPSE legacy codes, international taxonomies (**Shell MESC** and **UNSPSC**), and national public procurement platforms (**Government e-Marketplace - GeM**).

By pairing dense semantic vector embeddings (`BAAI/bge-large-en-v1.5`) with deterministic engineering rule gating (ASME B16.5, ASME B16.34, API 6D, ASTM standards), NUMM achieves sub-50ms search latencies, prevents hazardous engineering mismatches, unlocks inter-CPSE surplus inventory visibility, and enables pooled demand aggregation to negotiate high-volume discounts across common commodities.

### 1.2. Administrative & Governance Metadata

- **Sponsoring Ministry**: Ministry of Petroleum & Natural Gas (MoPNG)
- **Nodal Agency**: Directorate General of Hydrocarbons (DGH) / Federation of Indian Petroleum Industry (FIPI)
- **Project Lead**: Technical Directorate / Digital Transformation Cell
- **Participating Enterprises**: IOCL, ONGC, BPCL, HPCL, GAIL, OIL, EIL, NRL, MRPL, CPCL
- **Target Deployment Environment**: NIC National Cloud (MeghRaj) / On-Premise Air-Gapped PSU Data Centers
- **Compliance Mandate**: Central Vigilance Commission (CVC) Public Procurement Guidelines; Government e-Marketplace (GeM) Rule 149 of GFR 2017; Oil Industry Safety Directorate (OISD-STD-118, OISD-STD-141) Norms

---

## 2. In-Depth Problem Definition & Economic Impact Analysis

### 2.1. The Anatomy of Catalog Fragmentation

In high-asset-intensity sectors like upstream exploration, cross-country pipeline transportation, and downstream petroleum refining, material management requires extreme precision. However, current CPSE procurement databases exhibit severe structural entropy:

1. **Free-Text Description Discrepancies**:
   In legacy SAP implementations, materials are identified via short text fields (`MAKT-MAKTX`, capped at 40 characters in legacy ECC 6.0, or 132 characters in S/4HANA). Plant engineers and procurement clerks routinely abbreviate technical terms to fit character boundaries, resulting in extreme linguistic variance:
   - _IOCL Mathura_: `VALVE, BALL, 2", CL150, FLG RF, ASTM A105, API 6D`
   - _ONGC Hazira_: `VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP`
   - _BPCL Mumbai_: `2IN 150LB BALL VALVE FLANGED WCB/A105 TRIM 316`
   - _HPCL Vizag_: `VALVE BALL FLG 2INCH 150# CS ASTM A-105`
   - _GAIL Vijaipur_: `BALL VLV, 2 IN, ASME 150, FLANGED, CS BODY`
     All five descriptions represent the exact same functional equipment (a 2-inch ASME Class 150 flanged carbon steel ball valve), yet in conventional databases, they appear as five unrelated items.

2. **Decentralized Multi-Instance ERP Architecture**:
   CPSEs operate distinct SAP/Oracle client instances across their divisions (Refineries Division, Pipelines Division, Exploration & Production Asset Bases). A part cataloged in IOCL Paradip is completely invisible to IOCL Panipat, let alone sister enterprises like ONGC or BPCL.
   - SAP MM Table Landscape:
     - `MARA`: General Material Data (`MATNR`, `MTART`, `MATKL`, `MEINS`)
     - `MAKT`: Material Descriptions (`MATNR`, `SPRAS`, `MAKTX`)
     - `MARC`: Plant Data for Material (`MATNR`, `WERKS`, `DISPO`, `MINBE`, `EISBE`)
     - `MARD`: Storage Location Data (`MATNR`, `WERKS`, `LGORT`, `LABST`)
     - `MBEW`: Material Valuation (`MATNR`, `BWKEY`, `STPRS`, `VERPR`, `SALK3`)

3. **Inconsistent Unit of Measurement (UOM) Standards**:
   Nominal pipe sizes and pressure ratings toggle unpredictably between Imperial and Metric standards:
   - Nominal diameter expressed as `2"`, `2 INCH`, `2 IN`, `50 MM`, `50MM NB`, `DN 50`.
   - Pressure class expressed as `150#`, `CL 150`, `CLASS 150`, `150 LB`, `150 LBS`, `PN 20`.
   - Wall thickness expressed as `SCH 40`, `SCHEDULE 40`, `STD`, or millimeter wall thickness `9.52 MM`.

4. **Taxonomy Divergence (MESC vs UNSPSC vs In-House)**:
   - **Shell MESC** is an international 10-digit standard (`XX.XX.XX.XXX.X`) created by Shell in 1932 covering 80+ categories and 110,000+ items. In Indian PSUs, licensing costs and rigidity prevented universal adoption, though individual refineries use variations of Group 74 (Valves) and Group 76 (Piping/Flanges) linked to MESC SPE 77/300.
   - **UNSPSC** is an 8-digit generic hierarchy (e.g. `40141600` Valves, `40141700` Pipe fittings). While used by global e-procurement systems, UNSPSC fails to encode critical engineering attributes like pressure ratings or metallurgy, resulting in false groupings.
   - Plant engineers bypass rigid dropdown menus by choosing generic "Miscellaneous" categories to expedite emergency work orders.

### 2.2. Macroeconomic & Operational Impact

The economic consequences of fragmented procurement across MoPNG CPSEs are quantified below based on industry benchmarks:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      QUANTIFIED CPSE PROCUREMENT INEFFICIENCIES                  │
├──────────────────────────────────────────────────┬───────────────────────────────┤
│ Metric Category                                  │ Estimated Cost Impact (Annual)│
├──────────────────────────────────────────────────┼───────────────────────────────┤
│ Redundant Capital Tied in Duplicate Safety Stock │ ₹1,850 - ₹2,400 Crore         │
│ Lost Bulk Procurement Leverage (Volume Discount) │ ₹650 - ₹950 Crore             │
│ Emergency Expedited Sourcing Due to Blind Spots  │ ₹320 - ₹450 Crore             │
│ Manual Catalog Cleansing & Reconciliation Labor  │ ₹85 - ₹120 Crore              │
│ Plant Downtime from Awaiting Long-Lead Spares    │ ₹1,200+ Crore                 │
├──────────────────────────────────────────────────┼───────────────────────────────┤
│ Total Addressable Value Pool for NUMM Framework  │ ₹4,105 - ₹5,120 Crore / Year  │
└──────────────────────────────────────────────────┴───────────────────────────────┘
```

#### Detailed Breakdown:

- **Redundant Safety Stock**: Refineries located in close geographic proximity (e.g., IOCL Gujarat Refinery at Vadodara, ONGC Hazira Plant, and BPCL Mumbai Refinery) independently hold dedicated insurance spares (such as turbine rotors, high-pressure emergency shutdown valves, and titanium heat exchanger tubes). Holding costs average 18–22% of item capital value per year in climate-controlled warehousing, preservation, insurance, and financing costs.
- **Divergent Unit Purchase Prices**: Because CPSEs tender independently, identical commoditized line items exhibit price divergence of 12% to 35% between different enterprises in the same fiscal quarter.
- **Lead-Time Crisis**: Specialized alloy piping (e.g., Incoloy, Duplex SS) frequently requires foreign mill lead times of 24 to 40 weeks. A refinery facing an unexpected shutdown may wait months for a component that sits idle as surplus in a sister CPSE warehouse 150 km away.

---

## 3. Goals & Objectives

### 3.1. Business Goals

- **BG-01 (Inventory Rationalization)**: Identify, index, and cluster duplicate and near-duplicate material items across participating CPSE catalogs, achieving a target catalog rationalization rate of ≥22% within 12 months of deployment.
- **BG-02 (Working Capital Reduction)**: Enable inter-CPSE surplus stock discovery to reduce aggregate safety stock holding by ₹250+ Crore across pilot refineries (IOCL Mathura, ONGC Hazira, BPCL Mumbai, HPCL Vizag) within Year 1.
- **BG-03 (Pooled Demand Procurement Savings)**: Aggregate projected procurement quantities for high-volume standardized commodities (valves, line pipes, structural steel, flanges, gaskets), unlocking 8% to 16% volume-discount savings on pooled MoPNG joint tenders.
- **BG-04 (Procurement Cycle Acceleration)**: Reduce the average time required to create, verify, and approve a new Material Master record in CPSE SAP systems from 14 business days to < 10 minutes.
- **BG-05 (Public Procurement Transparency)**: Provide full compliance with Central Vigilance Commission (CVC) audit norms and GeM Rule 149 GFR by generating immutable, explainable decision records for every catalog unification action.

### 3.2. Operational & User Goals

- **OG-01 (Search Before Buy)**: Provide every CPSE procurement officer with an instantaneous semantic search engine that checks national catalog holdings before a new purchase requisition or tender can be floated.
- **OG-02 (High-Throughput Stewardship)**: Enable catalog data stewards to review, validate, and approve 1,000+ AI-matched candidate pairs per hour using an optimized, keyboard-navigable human-in-the-loop triage interface.
- **OG-03 (Zero-Downtime Inter-Plant Transfer)**: Enable plant maintenance superintendents to locate, reserve, and initiate legal inter-CPSE transfers of emergency spares during unexpected operational shutdowns in < 4 hours.

---

## 4. Codification Architecture: One Nation, One Material Code (ONMC)

NUMM establishes a deterministic, multi-segment national codification standard that maps bi-directionally to legacy CPSE codes and international taxonomies.

### 4.1. ONMC Structure

```
ONMC - [DISCIPLINE] - [CATEGORY] - [TYPE] - [SIZE] - [RATING] - [ALLOY] - [HASH4]
 │          │             │          │       │        │          │        │
 │          │             │          │       │        │          │        └─ Deterministic
 │          │             │          │       │        │          │           Verification Hash
 │          │             │          │       │        │          └─ ASTM/AISI Material Grade
 │          │             │          │       │        └─ ASME Pressure Class (e.g. 150, 300, 600)
 │          │             │          │       └─ Nominal Bore in Thousandths of Inch (002 = 2.00")
 │          │             │          └─ Equipment Type (BAL=Ball, GAT=Gate, GLB=Globe, WNF=Flange)
 │          │             └─ Equipment Category (VLV=Valve, PIP=Pipe, FLG=Flange, GSK=Gasket)
 │          └─ Engineering Discipline (MECH=Mechanical, ELEC=Electrical, INST=Instrumentation)
 └─ National Sovereign Prefix
```

### 4.2. Bi-Directional Cross-Walk Mapping

| ONMC Code                              | Shell MESC (10-Digit) | MESC SPE   | UNSPSC (8-Digit) | GeM Category ID     | Physical Specification                                            |
| -------------------------------------- | --------------------- | ---------- | ---------------- | ------------------- | ----------------------------------------------------------------- |
| `ONMC-MECH-VLV-BAL-002-150-A105-9B2F`  | `74.16.01.015.1`      | SPE 77/300 | `40141607`       | GeM-CAT-VLV-BALL-01 | 2" Class 150 Flanged Carbon Steel Ball Valve (ASTM A105)          |
| `ONMC-MECH-VLV-GAT-004-300-WCB-4A1C`   | `74.12.03.020.1`      | SPE 77/200 | `40141611`       | GeM-CAT-VLV-GATE-02 | 4" Class 300 Flanged Cast Carbon Steel Gate Valve (ASTM A216 WCB) |
| `ONMC-MECH-FLG-WNF-006-150-A105-8D3E`  | `76.22.11.025.1`      | SPE 74/019 | `40141720`       | GeM-CAT-FLG-WNRF-01 | 6" Class 150 Weld Neck Raised Face Flange (ASTM A105)             |
| `ONMC-MECH-GSK-SPW-002-150-SS316-2F9A` | `76.44.02.015.1`      | SPE 76/100 | `31181502`       | GeM-CAT-GSK-SPWD-01 | 2" Class 150 Spiral Wound Gasket SS316 with Graphite Filler       |
| `ONMC-MECH-PIP-SML-004-STD-A106-1C7B`  | `74.00.01.020.1`      | SPE 74/001 | `40171501`       | GeM-CAT-PIP-SMLS-01 | 4" Sch 40 Seamless Line Pipe ASTM A106 Gr B                       |

---

## 5. Target User Personas

### 5.1. Primary Persona 1: Catalog Data Steward

- **Name**: Rameshwar Sharma
- **Title**: Chief Manager (Materials Management), IOCL Mathura Refinery
- **Context**: 24 years in refinery warehousing. Handles catalog creation requests, reviews SAP `MM01` entries, cleans duplicate spares.
- **Pain Points**: Requisitioners submit free-text abbreviations. Spends hours checking manual catalogs to prevent duplicate code creation.
- **Goals**: Rapid triage interface, instant duplicate detection, clear visual deltas.

### 5.2. Primary Persona 2: Chief Procurement Officer

- **Name**: Priya Venkatraman
- **Title**: General Manager (Central Procurement Cell), MoPNG / EIL
- **Context**: Coordinates high-value capital procurement tenders across all CPSEs.
- **Pain Points**: Zero visibility into identical item tenders floated concurrently by IOCL, BPCL, and HPCL. Fragmented purchasing sacrifices bulk volume discounts.
- **Goals**: Unified commodity demand aggregation, joint tender batching, CVC-compliant audit trail.

### 5.3. Secondary Persona 3: Plant Maintenance Superintendent

- **Name**: Harpreet Singh
- **Title**: DGM (Mechanical Maintenance), ONGC Hazira Plant
- **Context**: Responsible for 24/7 continuous gas processing plant uptime.
- **Pain Points**: Emergency valve failure requires 18-week replacement lead time from European manufacturer while plant faces ₹40 Lakh/day downtime penalty.
- **Goals**: Search national CPSE surplus inventory to find matching spares located at nearby refineries (BPCL Mumbai or IOCL Gujarat) for immediate inter-company transfer.

---

## 6. Functional Features & Requirements Matrix

### 6.1. Must-Have Features (P0)

#### F-P0-01: Multi-ERP Catalog Ingestion & Extraction Engine

- **Description**: Automated ingestion of legacy catalog dumps (`.xlsx`, `.csv`, SAP RFC connection) with automated field mapping.
- **Acceptance Criteria**:
  - Ingests files up to 250,000 rows without memory crashes.
  - Automatically identifies column headers (`MAKTX`, `MATNR`, `WERKS`, `STPRS`).
  - Normalizes text: expands 250+ Oil & Gas abbreviations (`VLV` -> `VALVE`, `FLG` -> `FLANGED`).
  - Extracts key physical attributes: `item_class`, `size_inch`, `pressure_class`, `metallurgy`, `end_connection`, `standards`.
- **Success Metric**: Extraction accuracy ≥ 95.0% on verified benchmark dataset.

#### F-P0-02: Hybrid Vector Semantic & Engineering Rule Matcher

- **Description**: Two-tier matching engine pairing dense vector similarity with physical rule gating.
- **Acceptance Criteria**:
  - Tier 1: Generates 1024-dimensional embeddings via `BAAI/bge-large-en-v1.5` and executes HNSW cosine distance search on `pgvector`.
  - Tier 2: Enforces hard physical safety gate: Disqualifies any candidate if nominal size or pressure class does not match exactly.
  - Generates transparent match confidence score: `High Confidence` (≥92%), `Borderline HITL Review` (70% - 91%), `Novel Item` (<70%).
- **Success Metric**: 0.0% false positives on mismatched pressure ratings or nominal bore dimensions.

#### F-P0-03: High-Throughput HITL Triage Interface

- **Description**: Data steward review cockpit designed for keyboard-driven decision-making.
- **Acceptance Criteria**:
  - Built with **Astryx Design System** (`@astryxdesign/core`) and **StyleX** (`@stylexjs/stylex`).
  - Humanto warm sovereign aesthetic with sticky split layout (`360px` inspector + `1fr` virtualized grid).
  - Single-key actions: `A` (Approve Match), `R` (Reject / Mint Novel Code), `E` (Edit Attributes), `J`/`K` (Next/Previous).
  - Displays side-by-side attribute diff card highlighting discrepancies in red and matches in green.
- **Success Metric**: Steward throughput ≥ 1,000 items reviewed per hour.

#### F-P0-04: "Search Before Buy" Discovery Portal

- **Description**: Pre-procurement search engine allowing plant engineers to query national inventory using natural language, technical specs, or legacy codes.
- **Acceptance Criteria**:
  - Sub-50ms search latency across 4+ million indexed catalog items.
  - Returns canonical ONMC code, legacy CPSE item codes, mapped MESC and UNSPSC numbers, and real-time plant stock levels.
  - Integrates GeM catalog lookup link for direct public procurement compliance under Rule 149 GFR.
- **Success Metric**: Query response time < 50ms at p95.

### 6.2. Should-Have Features (P1)

#### F-P1-01: Inter-CPSE Surplus Stock Discovery & Transfer Gateway

- **Description**: Identifies non-moving / insurance surplus stock held across sister CPSEs within configurable geographic radius (e.g., 250 km).
- **Acceptance Criteria**:
  - Calculates travel distance and estimated transit time between plants.
  - Generates inter-CPSE material transfer requisition form compliant with MoPNG guidelines.
- **Success Metric**: Reduces emergency spare sourcing lead time from 120 days to < 48 hours.

#### F-P1-02: Pooled Demand Joint Procurement Aggregator

- **Description**: Scans CPSE annual procurement plans and clusters scheduled commodity requirements to form joint procurement tenders.
- **Acceptance Criteria**:
  - Aggregates quantity demands for identical ONMC items over rolling 6-month horizons.
  - Visualizes cost savings curve based on volume discount tiers (8% to 16% estimated savings).
- **Success Metric**: Identifies ≥ ₹500 Crore in annual joint tendering opportunities across participating CPSEs.

### 6.3. Nice-to-Have Features (P2)

- **F-P2-01**: Automated SAP BAPI webhook connector for real-time `MM01` creation sync.
- **F-P2-02**: Computer Vision OCR for scanning legacy paper equipment data sheets and piping P&IDs.

---

## 7. Explicitly OUT OF SCOPE (Anti-Requirements)

- **No Direct Financial Transaction Execution**: NUMM does not execute electronic fund transfers or replace CPSE banking portals; it generates purchase authorizations and transfer agreements.
- **No Modification of Upstream Production SAP Databases**: NUMM does not overwrite CPSE SAP tables directly without human data steward approval and certified SAP RFC connection.
- **No Generic Consumer Commodity Cataloging**: NUMM strictly focuses on industrial engineering MRO equipment (piping, valves, instrumentation, electrical, rotating machinery); office supplies and generic IT hardware are deferred to standard GeM.
- **No Proprietary Vendor Lock-in**: All models, embeddings, taxonomies, and database schemas remain sovereign, open, and air-gapped on national infrastructure.

---

## 8. Non-Functional Requirements & System Constraints

### 8.1. Performance & Latency SLAs

- **Batch Ingestion Rate**: ≥ 10,000 catalog rows processed per minute on standard 16-core CPU server.
- **Vector Search Latency**: ≤ 50ms at p95 across 1,000,000 active vector embeddings.
- **UI Interaction Latency**: Headless virtualized table scrolling maintains steady 60 FPS at 10,000 rendered rows.

### 8.2. Security & Compliance

- **Authentication**: SAML 2.0 / OAuth2 OpenID Connect integrated with NIC SSO and CPSE corporate Active Directories.
- **Data Privacy**: Role-Based Access Control (RBAC) preventing unauthorized CPSE officers from viewing non-public commercial pricing data before joint tendering approval.
- **Audit Logging**: Write-once, append-only cryptographic hash chain for every catalog unification decision, satisfying CVC and CAG audit requirements.
- **Safety Norms**: Strict alignment with Oil Industry Safety Directorate guidelines (OISD-STD-118, OISD-STD-141).
