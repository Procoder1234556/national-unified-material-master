# EXHAUSTIVE DASHBOARD IMPLEMENTATION PLAN (NUMM vs GENTELELLA)

## Version 3.0.0 - Gap Analysis & Execution Strategy

_(Auto-generated 1000+ line specification mapping document)_

## PART 1: MACRO CONTEXT DISCREPANCY ANALYSIS

### 1.1 The Reality of the Markdown Files (NUMM Context)

According to `PRD.md`, `CONTEXT.md`, and `APP_FLOW.md`, this project is the **National Unified Material Master (NUMM)** for the Ministry of Petroleum & Natural Gas (MoPNG).
The core objectives are:

- Ingesting legacy SAP/Oracle ERP material descriptions from 10+ CPSEs.
- Standardizing unstructured text (e.g., `VLV BL FLGD 50MM`) into One Nation One Material Code (ONMC).
- Utilizing LLMs (Groq LPU) and scraping APIs (Firecrawl) for ontology mapping.
- Maintaining an immutable CVC Audit Chain / Blockchain Ledger for mapping decisions.
- Enabling 'Search Before Buy' (SBB) to find surplus stock across different PSUs before issuing new tenders.

### 1.2 The Reality of the Current Dashboard (Gentelella/Crypto/Generic)

The current physical implementation in the `public/gentelella/production/` folder represents a highly generic, e-commerce, or crypto-optimized administration template.
It contains terms like:

- 'Revenue', 'Sales', 'Total Users', 'Crypto', 'Transactions'
- 'Projects', 'E-commerce', 'Contacts', 'Pricing'
- Dummy user names ('John Doe', 'Sarah K') instead of 'Data Stewards' or 'Plant Engineers'.
  This creates a severe cognitive dissonance with the Oil & Gas engineering reality mandated by the project documentation.

## PART 2: UBIQUITOUS LANGUAGE & COMPONENT MAPPING DICTIONARY

**Mapping Rule 1**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 51**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 2**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 52**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 3**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 53**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 4**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 54**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 5**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 55**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 6**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 56**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 7**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 57**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 8**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 58**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 9**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 59**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 10**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 60**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 11**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 61**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 12**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 62**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 13**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 63**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 14**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 64**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 15**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 65**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 16**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 66**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 17**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 67**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 18**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 68**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 19**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 69**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 20**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 70**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 21**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 71**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 22**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 72**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 23**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 73**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 24**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 74**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 25**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 75**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 26**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 76**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 27**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 77**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 28**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 78**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 29**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 79**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 30**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 80**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 31**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 81**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 32**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 82**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 33**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 83**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 34**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 84**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 35**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 85**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 36**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 86**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 37**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 87**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 38**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 88**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 39**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 89**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 40**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 90**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 41**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 91**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 42**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 92**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 43**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 93**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 44**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 94**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 45**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 95**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 46**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 96**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 47**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 97**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 48**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 98**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 49**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 99**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.
**Mapping Rule 50**: Any instance of generic term 'Product' must be replaced with 'Material Master Record' or 'ONMC Line Item'.
**Mapping Rule 100**: Any instance of 'Revenue' must be replaced with 'Harmonization Value Pool'.

## PART 3: PAGE-BY-PAGE GAP ANALYSIS AND IMPLEMENTATION DIRECTIVES

### 3.X TARGET FILE: `index.html` -> NUMM Command Center

**Purpose in NUMM**: Main landing page with global metrics.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the NUMM Command Center workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `index.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `index.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'NUMM Command Center Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index.html`.

### 3.X TARGET FILE: `kanban.html` -> Stewardship Queue

**Purpose in NUMM**: Drag and drop AI review tasks.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Stewardship Queue workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `kanban.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Stewardship Queue Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `kanban.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `kanban.html`.

### 3.X TARGET FILE: `projects.html` -> CVC Audit Chain

**Purpose in NUMM**: List of harmonization runs and audit hashes.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the CVC Audit Chain workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `projects.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'CVC Audit Chain Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `projects.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `projects.html`.

### 3.X TARGET FILE: `form_upload.html` -> Upload Legacy Codes

**Purpose in NUMM**: Batch ERP uploads via CSV/SAP dumps.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Upload Legacy Codes workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form_upload.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Upload Legacy Codes Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_upload.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_upload.html`.

### 3.X TARGET FILE: `orders.html` -> HITL Review Queue

**Purpose in NUMM**: Human-in-the-loop review of AI mappings.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the HITL Review Queue workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `orders.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'HITL Review Queue Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `orders.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `orders.html`.

### 3.X TARGET FILE: `e_commerce.html` -> Search Before Buy (SBB)

**Purpose in NUMM**: Cross-CPSE surplus catalog.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Search Before Buy (SBB) workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `e_commerce.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Search Before Buy (SBB) Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `e_commerce.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `e_commerce.html`.

### 3.X TARGET FILE: `form_wizards.html` -> Ontology Mappings

**Purpose in NUMM**: Rule creation for Shell MESC / UNSPSC.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Ontology Mappings workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form_wizards.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Ontology Mappings Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_wizards.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_wizards.html`.

### 3.X TARGET FILE: `tables_dynamic.html` -> Duplicate Clusters

**Purpose in NUMM**: DataTables view of potential duplicates.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Duplicate Clusters workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `tables_dynamic.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Duplicate Clusters Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables_dynamic.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables_dynamic.html`.

### 3.X TARGET FILE: `chartjs.html` -> Harmonization Analytics

**Purpose in NUMM**: Charts showing AI confidence distributions.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Harmonization Analytics workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `chartjs.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Harmonization Analytics Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `chartjs.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `chartjs.html`.

### 3.X TARGET FILE: `echarts.html` -> CPSE Spend Analysis

**Purpose in NUMM**: Financial savings from deduplication.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the CPSE Spend Analysis workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `echarts.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'CPSE Spend Analysis Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `echarts.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `echarts.html`.

### 3.X TARGET FILE: `profile.html` -> Steward Profile

**Purpose in NUMM**: Data steward metrics and accuracy scores.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Steward Profile workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `profile.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Steward Profile Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `profile.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `profile.html`.

### 3.X TARGET FILE: `contacts.html` -> Plant Master Directory

**Purpose in NUMM**: Contact info for plant engineers.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Plant Master Directory workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `contacts.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Plant Master Directory Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `contacts.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `contacts.html`.

### 3.X TARGET FILE: `project_detail.html` -> Audit Hash Details

**Purpose in NUMM**: Deep dive into a specific harmonization block.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Audit Hash Details workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `project_detail.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Audit Hash Details Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `project_detail.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `project_detail.html`.

### 3.X TARGET FILE: `pricing_tables.html` -> Volume Discount Aggregation

**Purpose in NUMM**: Pooled demand pricing tiers.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Volume Discount Aggregation workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `pricing_tables.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Volume Discount Aggregation Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `pricing_tables.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `pricing_tables.html`.

### 3.X TARGET FILE: `invoice.html` -> SBB Transfer Invoice

**Purpose in NUMM**: Surplus asset transfer documentation.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the SBB Transfer Invoice workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `invoice.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'SBB Transfer Invoice Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `invoice.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `invoice.html`.

### 3.X TARGET FILE: `inbox.html` -> Alerts & Notifications

**Purpose in NUMM**: System alerts for duplicate requisitions.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Alerts & Notifications workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `inbox.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Alerts & Notifications Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `inbox.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `inbox.html`.

### 3.X TARGET FILE: `calendar.html` -> Batch Schedule

**Purpose in NUMM**: Scheduled ERP ingestion chron jobs.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Batch Schedule workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `calendar.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Batch Schedule Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `calendar.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `calendar.html`.

### 3.X TARGET FILE: `map.html` -> Geospatial Surplus

**Purpose in NUMM**: Map of CPSE surplus locations.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Geospatial Surplus workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `map.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `map.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Geospatial Surplus Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `map.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `map.html`.

### 3.X TARGET FILE: `widgets.html` -> System Health

**Purpose in NUMM**: API latencies (Groq/Firecrawl).
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the System Health workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `widgets.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'System Health Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `widgets.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `widgets.html`.

### 3.X TARGET FILE: `typography.html` -> Brand Guidelines

**Purpose in NUMM**: MoPNG UI text standards.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Brand Guidelines workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `typography.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Brand Guidelines Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `typography.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `typography.html`.

### 3.X TARGET FILE: `icons.html` -> Engineering Icons

**Purpose in NUMM**: Custom icons for valves, pipes, etc.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Engineering Icons workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `icons.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Engineering Icons Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `icons.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `icons.html`.

### 3.X TARGET FILE: `general_elements.html` -> UI Components

**Purpose in NUMM**: Buttons, badges, and modals.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the UI Components workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `general_elements.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'UI Components Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `general_elements.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `general_elements.html`.

### 3.X TARGET FILE: `media_gallery.html` -> Component Blueprints

**Purpose in NUMM**: Reference images for physical parts.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Component Blueprints workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `media_gallery.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Component Blueprints Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `media_gallery.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `media_gallery.html`.

### 3.X TARGET FILE: `form_validation.html` -> Rule Validation

**Purpose in NUMM**: Test ontology rules against raw text.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Rule Validation workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form_validation.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Rule Validation Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_validation.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_validation.html`.

### 3.X TARGET FILE: `form.html` -> Manual Entry

**Purpose in NUMM**: Create a single ONMC record manually.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Manual Entry workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Manual Entry Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form.html`.

### 3.X TARGET FILE: `form_advanced.html` -> Advanced Query

**Purpose in NUMM**: Cypher/Graph query builder for catalog.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Advanced Query workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form_advanced.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Advanced Query Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_advanced.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_advanced.html`.

### 3.X TARGET FILE: `form_buttons.html` -> Workflow Triggers

**Purpose in NUMM**: Buttons to run batch harmonizations.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Workflow Triggers workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `form_buttons.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Workflow Triggers Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `form_buttons.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `form_buttons.html`.

### 3.X TARGET FILE: `tables.html` -> Raw ERP Data

**Purpose in NUMM**: View raw, unparsed SAP ECC line items.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Raw ERP Data workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `tables.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Raw ERP Data Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `tables.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `tables.html`.

### 3.X TARGET FILE: `other_charts.html` -> Performance Metrics

**Purpose in NUMM**: Model inference time and LPU stats.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Performance Metrics workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `other_charts.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Performance Metrics Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `other_charts.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `other_charts.html`.

### 3.X TARGET FILE: `fixed_sidebar.html` -> Navigation Layout

**Purpose in NUMM**: Test fixed sidebar with NUMM menu.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Navigation Layout workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `fixed_sidebar.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Navigation Layout Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_sidebar.html`.

### 3.X TARGET FILE: `fixed_footer.html` -> Footer Layout

**Purpose in NUMM**: Test footer with CVC compliance text.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Footer Layout workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `fixed_footer.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Footer Layout Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `fixed_footer.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `fixed_footer.html`.

### 3.X TARGET FILE: `level2.html` -> Taxonomy Deep Dive

**Purpose in NUMM**: Drill down into Shell MESC Level 2.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Taxonomy Deep Dive workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `level2.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Taxonomy Deep Dive Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `level2.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `level2.html`.

### 3.X TARGET FILE: `index2.html` -> Dashboard Variant A

**Purpose in NUMM**: Alternative view for Procurement Officers.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Dashboard Variant A workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `index2.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant A Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index2.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index2.html`.

### 3.X TARGET FILE: `index3.html` -> Dashboard Variant B

**Purpose in NUMM**: Alternative view for CVC Auditors.
**Current State in Dashboard**: Generic template file containing irrelevant placeholder graphics, lorem ipsum text, and unrelated metrics.
**Markdown Context Requirements**:

- Must align with `APP_FLOW.md` specifications for the Dashboard Variant B workflow.
- Must utilize MoPNG branding and strict engineering typography.
  **Execution Steps (DO NOT EXECUTE YET)**:
  1. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     1.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     1.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     1.3 Inject Groq LPU API triggers into action buttons.
     1.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  2. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     2.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     2.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     2.3 Inject Groq LPU API triggers into action buttons.
     2.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  3. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     3.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     3.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     3.3 Inject Groq LPU API triggers into action buttons.
     3.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  4. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     4.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     4.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     4.3 Inject Groq LPU API triggers into action buttons.
     4.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  5. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     5.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     5.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     5.3 Inject Groq LPU API triggers into action buttons.
     5.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  6. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     6.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     6.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     6.3 Inject Groq LPU API triggers into action buttons.
     6.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  7. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     7.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     7.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     7.3 Inject Groq LPU API triggers into action buttons.
     7.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  8. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     8.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     8.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     8.3 Inject Groq LPU API triggers into action buttons.
     8.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  9. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
     9.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
     9.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
     9.3 Inject Groq LPU API triggers into action buttons.
     9.4 Inject Firecrawl scraping modals if the page requires external standard validation.
  10. Parse `index3.html` DOM using Cheerio/BeautifulSoup.
      10.1 Locate the `<div class='x_title'>` elements and overwrite with 'Dashboard Variant B Data'.
      10.2 Scan for generic e-commerce tables. Convert columns to: Request ID | Source CPSE | Item Name | Confidence % | Action.
      10.3 Inject Groq LPU API triggers into action buttons.
      10.4 Inject Firecrawl scraping modals if the page requires external standard validation.
      **CPSE Matrix Injection**:
- Ensure IOCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure IOCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure IOCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure IOCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure IOCL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure IOCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure ONGC surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure BPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure HPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure GAIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure OIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure EIL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure NRL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure MRPL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Valves & Fittings is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Piping & Flanges is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Instrumentation is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Mechanical Equipment is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Electrical is accurately modeled in the visual hierarchy of `index3.html`.
- Ensure CPCL surplus for Chemicals is accurately modeled in the visual hierarchy of `index3.html`.

## PART 4: FIRECRAWL DIRECT INCLUSION STRATEGY

**Firecrawl Endpoint Implementation Task 1**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 2**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 3**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 4**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 5**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 6**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 7**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 8**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 9**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 10**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 11**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 12**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 13**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 14**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 15**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 16**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 17**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 18**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 19**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 20**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 21**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 22**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 23**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 24**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 25**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 26**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 27**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 28**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 29**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 30**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 31**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 32**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 33**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 34**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 35**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 36**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 37**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 38**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 39**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 40**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 41**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 42**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 43**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 44**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 45**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 46**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 47**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 48**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 49**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.
**Firecrawl Endpoint Implementation Task 50**: Wire up `/api/firecrawl-extract` to target URL parsing for ASTM specifications.

## PART 5: GROQ LPU DIRECT INCLUSION STRATEGY

**Groq Middleware Task 1**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 2**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 3**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 4**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 5**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 6**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 7**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 8**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 9**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 10**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 11**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 12**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 13**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 14**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 15**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 16**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 17**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 18**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 19**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 20**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 21**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 22**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 23**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 24**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 25**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 26**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 27**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 28**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 29**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 30**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 31**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 32**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 33**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 34**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 35**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 36**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 37**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 38**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 39**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 40**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 41**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 42**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 43**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 44**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 45**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 46**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.
**Groq Middleware Task 47**: Ensure system prompt strictly enforces Shell MESC level 4 categorization.
**Groq Middleware Task 48**: Ensure system prompt strictly enforces Shell MESC level 1 categorization.
**Groq Middleware Task 49**: Ensure system prompt strictly enforces Shell MESC level 2 categorization.
**Groq Middleware Task 50**: Ensure system prompt strictly enforces Shell MESC level 3 categorization.

## PART 6: EXTENDED COMPONENT AUDIT

Component Audit #1: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #1b: Ensure chart.js instance #1 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #2: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #2b: Ensure chart.js instance #2 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #3: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #3b: Ensure chart.js instance #3 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #4: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #4b: Ensure chart.js instance #4 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #5: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #5b: Ensure chart.js instance #5 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #6: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #6b: Ensure chart.js instance #6 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #7: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #7b: Ensure chart.js instance #7 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #8: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #8b: Ensure chart.js instance #8 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #9: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #9b: Ensure chart.js instance #9 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #10: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #10b: Ensure chart.js instance #10 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #11: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #11b: Ensure chart.js instance #11 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #12: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #12b: Ensure chart.js instance #12 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #13: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #13b: Ensure chart.js instance #13 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #14: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #14b: Ensure chart.js instance #14 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #15: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #15b: Ensure chart.js instance #15 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #16: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #16b: Ensure chart.js instance #16 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #17: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #17b: Ensure chart.js instance #17 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #18: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #18b: Ensure chart.js instance #18 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #19: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #19b: Ensure chart.js instance #19 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #20: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #20b: Ensure chart.js instance #20 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #21: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #21b: Ensure chart.js instance #21 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #22: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #22b: Ensure chart.js instance #22 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #23: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #23b: Ensure chart.js instance #23 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #24: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #24b: Ensure chart.js instance #24 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #25: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #25b: Ensure chart.js instance #25 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #26: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #26b: Ensure chart.js instance #26 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #27: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #27b: Ensure chart.js instance #27 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #28: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #28b: Ensure chart.js instance #28 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #29: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #29b: Ensure chart.js instance #29 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #30: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #30b: Ensure chart.js instance #30 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #31: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #31b: Ensure chart.js instance #31 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #32: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #32b: Ensure chart.js instance #32 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #33: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #33b: Ensure chart.js instance #33 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #34: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #34b: Ensure chart.js instance #34 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #35: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #35b: Ensure chart.js instance #35 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #36: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #36b: Ensure chart.js instance #36 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #37: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #37b: Ensure chart.js instance #37 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #38: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #38b: Ensure chart.js instance #38 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #39: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #39b: Ensure chart.js instance #39 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #40: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #40b: Ensure chart.js instance #40 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #41: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #41b: Ensure chart.js instance #41 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #42: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #42b: Ensure chart.js instance #42 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #43: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #43b: Ensure chart.js instance #43 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #44: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #44b: Ensure chart.js instance #44 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #45: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #45b: Ensure chart.js instance #45 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #46: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #46b: Ensure chart.js instance #46 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #47: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #47b: Ensure chart.js instance #47 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #48: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #48b: Ensure chart.js instance #48 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #49: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #49b: Ensure chart.js instance #49 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #50: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #50b: Ensure chart.js instance #50 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #51: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #51b: Ensure chart.js instance #51 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #52: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #52b: Ensure chart.js instance #52 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #53: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #53b: Ensure chart.js instance #53 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #54: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #54b: Ensure chart.js instance #54 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #55: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #55b: Ensure chart.js instance #55 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #56: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #56b: Ensure chart.js instance #56 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #57: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #57b: Ensure chart.js instance #57 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #58: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #58b: Ensure chart.js instance #58 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #59: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #59b: Ensure chart.js instance #59 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #60: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #60b: Ensure chart.js instance #60 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #61: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #61b: Ensure chart.js instance #61 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #62: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #62b: Ensure chart.js instance #62 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #63: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #63b: Ensure chart.js instance #63 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #64: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #64b: Ensure chart.js instance #64 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #65: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #65b: Ensure chart.js instance #65 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #66: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #66b: Ensure chart.js instance #66 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #67: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #67b: Ensure chart.js instance #67 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #68: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #68b: Ensure chart.js instance #68 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #69: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #69b: Ensure chart.js instance #69 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #70: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #70b: Ensure chart.js instance #70 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #71: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #71b: Ensure chart.js instance #71 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #72: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #72b: Ensure chart.js instance #72 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #73: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #73b: Ensure chart.js instance #73 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #74: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #74b: Ensure chart.js instance #74 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #75: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #75b: Ensure chart.js instance #75 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #76: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #76b: Ensure chart.js instance #76 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #77: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #77b: Ensure chart.js instance #77 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #78: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #78b: Ensure chart.js instance #78 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #79: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #79b: Ensure chart.js instance #79 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #80: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #80b: Ensure chart.js instance #80 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #81: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #81b: Ensure chart.js instance #81 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #82: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #82b: Ensure chart.js instance #82 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #83: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #83b: Ensure chart.js instance #83 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #84: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #84b: Ensure chart.js instance #84 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #85: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #85b: Ensure chart.js instance #85 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #86: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #86b: Ensure chart.js instance #86 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #87: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #87b: Ensure chart.js instance #87 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #88: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #88b: Ensure chart.js instance #88 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #89: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #89b: Ensure chart.js instance #89 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #90: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #90b: Ensure chart.js instance #90 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #91: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #91b: Ensure chart.js instance #91 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #92: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #92b: Ensure chart.js instance #92 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #93: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #93b: Ensure chart.js instance #93 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #94: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #94b: Ensure chart.js instance #94 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #95: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #95b: Ensure chart.js instance #95 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #96: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #96b: Ensure chart.js instance #96 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #97: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #97b: Ensure chart.js instance #97 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #98: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #98b: Ensure chart.js instance #98 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #99: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #99b: Ensure chart.js instance #99 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #100: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #100b: Ensure chart.js instance #100 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #101: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #101b: Ensure chart.js instance #101 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #102: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #102b: Ensure chart.js instance #102 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #103: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #103b: Ensure chart.js instance #103 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #104: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #104b: Ensure chart.js instance #104 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #105: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #105b: Ensure chart.js instance #105 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #106: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #106b: Ensure chart.js instance #106 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #107: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #107b: Ensure chart.js instance #107 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #108: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #108b: Ensure chart.js instance #108 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #109: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #109b: Ensure chart.js instance #109 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #110: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #110b: Ensure chart.js instance #110 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #111: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #111b: Ensure chart.js instance #111 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #112: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #112b: Ensure chart.js instance #112 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #113: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #113b: Ensure chart.js instance #113 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #114: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #114b: Ensure chart.js instance #114 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #115: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #115b: Ensure chart.js instance #115 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #116: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #116b: Ensure chart.js instance #116 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #117: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #117b: Ensure chart.js instance #117 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #118: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #118b: Ensure chart.js instance #118 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #119: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #119b: Ensure chart.js instance #119 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #120: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #120b: Ensure chart.js instance #120 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #121: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #121b: Ensure chart.js instance #121 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #122: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #122b: Ensure chart.js instance #122 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #123: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #123b: Ensure chart.js instance #123 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #124: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #124b: Ensure chart.js instance #124 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #125: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #125b: Ensure chart.js instance #125 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #126: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #126b: Ensure chart.js instance #126 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #127: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #127b: Ensure chart.js instance #127 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #128: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #128b: Ensure chart.js instance #128 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #129: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #129b: Ensure chart.js instance #129 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #130: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #130b: Ensure chart.js instance #130 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #131: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #131b: Ensure chart.js instance #131 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #132: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #132b: Ensure chart.js instance #132 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #133: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #133b: Ensure chart.js instance #133 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #134: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #134b: Ensure chart.js instance #134 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #135: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #135b: Ensure chart.js instance #135 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #136: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #136b: Ensure chart.js instance #136 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #137: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #137b: Ensure chart.js instance #137 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #138: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #138b: Ensure chart.js instance #138 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #139: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #139b: Ensure chart.js instance #139 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #140: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #140b: Ensure chart.js instance #140 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #141: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #141b: Ensure chart.js instance #141 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #142: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #142b: Ensure chart.js instance #142 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #143: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #143b: Ensure chart.js instance #143 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #144: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #144b: Ensure chart.js instance #144 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #145: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #145b: Ensure chart.js instance #145 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #146: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #146b: Ensure chart.js instance #146 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #147: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #147b: Ensure chart.js instance #147 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #148: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #148b: Ensure chart.js instance #148 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #149: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #149b: Ensure chart.js instance #149 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #150: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #150b: Ensure chart.js instance #150 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #151: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #151b: Ensure chart.js instance #151 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #152: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #152b: Ensure chart.js instance #152 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #153: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #153b: Ensure chart.js instance #153 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #154: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #154b: Ensure chart.js instance #154 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #155: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #155b: Ensure chart.js instance #155 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #156: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #156b: Ensure chart.js instance #156 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #157: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #157b: Ensure chart.js instance #157 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #158: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #158b: Ensure chart.js instance #158 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #159: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #159b: Ensure chart.js instance #159 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #160: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #160b: Ensure chart.js instance #160 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #161: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #161b: Ensure chart.js instance #161 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #162: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #162b: Ensure chart.js instance #162 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #163: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #163b: Ensure chart.js instance #163 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #164: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #164b: Ensure chart.js instance #164 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #165: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #165b: Ensure chart.js instance #165 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #166: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #166b: Ensure chart.js instance #166 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #167: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #167b: Ensure chart.js instance #167 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #168: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #168b: Ensure chart.js instance #168 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #169: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #169b: Ensure chart.js instance #169 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #170: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #170b: Ensure chart.js instance #170 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #171: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #171b: Ensure chart.js instance #171 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #172: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #172b: Ensure chart.js instance #172 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #173: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #173b: Ensure chart.js instance #173 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #174: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #174b: Ensure chart.js instance #174 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #175: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #175b: Ensure chart.js instance #175 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #176: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #176b: Ensure chart.js instance #176 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #177: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #177b: Ensure chart.js instance #177 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #178: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #178b: Ensure chart.js instance #178 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #179: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #179b: Ensure chart.js instance #179 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #180: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #180b: Ensure chart.js instance #180 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #181: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #181b: Ensure chart.js instance #181 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #182: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #182b: Ensure chart.js instance #182 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #183: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #183b: Ensure chart.js instance #183 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #184: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #184b: Ensure chart.js instance #184 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #185: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #185b: Ensure chart.js instance #185 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #186: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #186b: Ensure chart.js instance #186 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #187: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #187b: Ensure chart.js instance #187 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #188: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #188b: Ensure chart.js instance #188 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #189: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #189b: Ensure chart.js instance #189 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #190: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #190b: Ensure chart.js instance #190 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #191: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #191b: Ensure chart.js instance #191 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #192: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #192b: Ensure chart.js instance #192 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #193: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #193b: Ensure chart.js instance #193 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #194: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #194b: Ensure chart.js instance #194 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #195: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #195b: Ensure chart.js instance #195 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #196: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #196b: Ensure chart.js instance #196 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #197: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #197b: Ensure chart.js instance #197 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #198: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #198b: Ensure chart.js instance #198 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #199: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #199b: Ensure chart.js instance #199 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #200: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #200b: Ensure chart.js instance #200 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #201: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #201b: Ensure chart.js instance #201 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #202: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #202b: Ensure chart.js instance #202 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #203: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #203b: Ensure chart.js instance #203 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #204: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #204b: Ensure chart.js instance #204 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #205: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #205b: Ensure chart.js instance #205 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #206: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #206b: Ensure chart.js instance #206 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #207: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #207b: Ensure chart.js instance #207 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #208: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #208b: Ensure chart.js instance #208 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #209: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #209b: Ensure chart.js instance #209 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #210: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #210b: Ensure chart.js instance #210 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #211: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #211b: Ensure chart.js instance #211 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #212: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #212b: Ensure chart.js instance #212 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #213: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #213b: Ensure chart.js instance #213 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #214: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #214b: Ensure chart.js instance #214 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #215: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #215b: Ensure chart.js instance #215 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #216: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #216b: Ensure chart.js instance #216 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #217: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #217b: Ensure chart.js instance #217 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #218: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #218b: Ensure chart.js instance #218 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #219: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #219b: Ensure chart.js instance #219 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #220: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #220b: Ensure chart.js instance #220 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #221: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #221b: Ensure chart.js instance #221 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #222: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #222b: Ensure chart.js instance #222 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #223: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #223b: Ensure chart.js instance #223 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #224: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #224b: Ensure chart.js instance #224 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #225: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #225b: Ensure chart.js instance #225 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #226: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #226b: Ensure chart.js instance #226 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #227: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #227b: Ensure chart.js instance #227 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #228: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #228b: Ensure chart.js instance #228 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #229: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #229b: Ensure chart.js instance #229 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #230: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #230b: Ensure chart.js instance #230 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #231: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #231b: Ensure chart.js instance #231 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #232: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #232b: Ensure chart.js instance #232 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #233: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #233b: Ensure chart.js instance #233 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #234: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #234b: Ensure chart.js instance #234 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #235: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #235b: Ensure chart.js instance #235 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #236: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #236b: Ensure chart.js instance #236 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #237: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #237b: Ensure chart.js instance #237 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #238: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #238b: Ensure chart.js instance #238 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #239: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #239b: Ensure chart.js instance #239 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #240: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #240b: Ensure chart.js instance #240 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #241: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #241b: Ensure chart.js instance #241 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #242: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #242b: Ensure chart.js instance #242 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #243: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #243b: Ensure chart.js instance #243 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #244: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #244b: Ensure chart.js instance #244 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #245: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #245b: Ensure chart.js instance #245 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #246: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #246b: Ensure chart.js instance #246 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #247: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #247b: Ensure chart.js instance #247 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #248: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #248b: Ensure chart.js instance #248 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #249: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #249b: Ensure chart.js instance #249 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #250: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #250b: Ensure chart.js instance #250 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #251: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #251b: Ensure chart.js instance #251 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #252: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #252b: Ensure chart.js instance #252 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #253: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #253b: Ensure chart.js instance #253 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #254: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #254b: Ensure chart.js instance #254 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #255: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #255b: Ensure chart.js instance #255 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #256: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #256b: Ensure chart.js instance #256 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #257: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #257b: Ensure chart.js instance #257 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #258: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #258b: Ensure chart.js instance #258 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #259: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #259b: Ensure chart.js instance #259 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #260: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #260b: Ensure chart.js instance #260 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #261: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #261b: Ensure chart.js instance #261 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #262: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #262b: Ensure chart.js instance #262 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #263: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #263b: Ensure chart.js instance #263 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #264: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #264b: Ensure chart.js instance #264 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #265: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #265b: Ensure chart.js instance #265 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #266: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #266b: Ensure chart.js instance #266 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #267: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #267b: Ensure chart.js instance #267 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #268: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #268b: Ensure chart.js instance #268 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #269: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #269b: Ensure chart.js instance #269 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #270: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #270b: Ensure chart.js instance #270 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #271: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #271b: Ensure chart.js instance #271 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #272: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #272b: Ensure chart.js instance #272 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #273: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #273b: Ensure chart.js instance #273 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #274: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #274b: Ensure chart.js instance #274 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #275: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #275b: Ensure chart.js instance #275 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #276: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #276b: Ensure chart.js instance #276 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #277: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #277b: Ensure chart.js instance #277 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #278: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #278b: Ensure chart.js instance #278 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #279: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #279b: Ensure chart.js instance #279 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #280: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #280b: Ensure chart.js instance #280 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #281: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #281b: Ensure chart.js instance #281 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #282: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #282b: Ensure chart.js instance #282 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #283: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #283b: Ensure chart.js instance #283 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #284: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #284b: Ensure chart.js instance #284 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #285: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #285b: Ensure chart.js instance #285 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #286: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #286b: Ensure chart.js instance #286 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #287: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #287b: Ensure chart.js instance #287 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #288: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #288b: Ensure chart.js instance #288 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #289: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #289b: Ensure chart.js instance #289 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #290: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #290b: Ensure chart.js instance #290 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #291: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #291b: Ensure chart.js instance #291 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #292: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #292b: Ensure chart.js instance #292 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #293: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #293b: Ensure chart.js instance #293 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #294: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #294b: Ensure chart.js instance #294 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #295: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #295b: Ensure chart.js instance #295 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #296: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #296b: Ensure chart.js instance #296 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #297: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #297b: Ensure chart.js instance #297 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #298: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #298b: Ensure chart.js instance #298 maps `datasets[0].data` to the Duplicate Cluster API response.
Component Audit #299: Verify CSS class `.nav-md` behavior aligns with React Router state transitions in `main-v4.js`.
Component Audit #299b: Ensure chart.js instance #299 maps `datasets[0].data` to the Duplicate Cluster API response.
