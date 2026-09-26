filepath = r"d:\oil\frontend\public\gentelella\dist\production\project_detail.html"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace strings exactly using python
content = content.replace(
    "Project — Acme Website Redesign | Gentelella 2026 v4", "Audit Dossier — ONMC-MECH-VLV-BAL-002 | NUMM Dashboard"
)
content = content.replace(
    "Project — Acme Website Redesign — Projects > Acme Website Redesign. Free admin template by Colorlib. 60 pages, 20 chart variants, dark mode, PWA-ready.",
    "Audit Dossier — ONMC-MECH-VLV-BAL-002 — Projects > ONMC-MECH-VLV-BAL-002. CVC Audit Log.",
)
content = content.replace("Project — Acme Website Redesign", "Audit Dossier — ONMC-MECH-VLV-BAL-002")

content = content.replace(
    "Home > Projects|projects.html > Acme Website Redesign",
    "Home > CVC Audit Chain|projects.html > ONMC-MECH-VLV-BAL-002",
)
content = content.replace(
    '>Projects</a><span class="sep" aria-hidden="true">›</span><span class="current" aria-current="page">Acme Website Redesign</span>',
    '>Audit Chain</a><span class="sep" aria-hidden="true">›</span><span class="current" aria-current="page">ONMC-MECH-VLV-BAL-002</span>',
)

content = content.replace("Project · Acme Corp", "CVC Audit Dossier")
content = content.replace("Acme Website Redesign", "ONMC-MECH-VLV-BAL-002")

content = content.replace(
    "Refresh of the public marketing site with a new brand identity. Includes home, product, pricing, and ~12 marketing pages. Runs on the new headless CMS backed by the v2 design system.",
    "Cryptographically verifiable ledger of the harmonization process for the 2 inch Class 150 Ball Valve across 10 CPSEs, leading to the minting of ONMC-MECH-VLV-BAL-002. Ensured 100% compliance with CVC guidelines and MoPNG standard operating procedures.",
)

content = content.replace('<div class="card-title">Tasks</div>', '<div class="card-title">Audit Milestones</div>')
content = content.replace("+ Add task", "+ Add evidence")
content = content.replace("Brand identity workshop", "Ingest Legacy ERP Data")
content = content.replace("Sitemap and IA", "AI Ontology Mapping")
content = content.replace("Wireframes — desktop", "Data Steward Review")
content = content.replace("High-fidelity homepage", "CPSE Committee Consensus")
content = content.replace("Pricing page comp", "CVC Verification & Security Audit")
content = content.replace("Mobile responsive pass", "Final MoPNG Approval")
content = content.replace("CMS integration", "Mint ONMC Code")
content = content.replace("QA & launch", "Broadcast to Ecosystem")

content = content.replace('<div class="card-title">Activity</div>', '<div class="card-title">Ledger Events</div>')
content = content.replace(
    "<strong>Sarah K.</strong> completed <strong>Wireframes — desktop</strong>",
    "<strong>Sarah K. (ONGC)</strong> verified <strong>Data Steward Review</strong>",
)
content = content.replace(
    "<strong>Michael R.</strong> commented on <strong>Homepage</strong>",
    "<strong>Michael R. (IOCL)</strong> commented on <strong>AI Ontology Mapping</strong>",
)
content = content.replace(
    "<strong>Emily W.</strong> uploaded 3 design files",
    "<strong>Emily W. (BPCL)</strong> uploaded 3 legacy material files",
)
content = content.replace(
    "<strong>Diego R.</strong> moved this project to <strong>In Progress</strong>",
    "<strong>Diego R. (CVC)</strong> moved this dossier to <strong>Under Review</strong>",
)

content = content.replace('<div class="card-title">Details</div>', '<div class="card-title">Audit Metadata</div>')
content = content.replace(
    'Client</span> · <strong style="color:var(--text)">Acme Corp</strong>',
    'Sector</span> · <strong style="color:var(--text)">Oil & Gas Upstream</strong>',
)
content = content.replace("Started", "Initiated")
content = content.replace("Due", "Target Date")
content = content.replace("Budget", "Harmonization Value")
content = content.replace("$48,000", "₹4,80,000")
content = content.replace("Spent</span> · $29,760", "Realized</span> · ₹2,97,600")
content = content.replace(
    '<span class="chip chip-primary">Web</span> <span class="chip chip-blue">Design</span>',
    '<span class="chip chip-primary">Valves</span> <span class="chip chip-blue">Mechanical</span>',
)

content = content.replace("Lead designer", "ONGC Steward")
content = content.replace("Engineer", "IOCL Engineer")
content = content.replace("PM", "BPCL Verifier")
content = content.replace("Sales", "CVC Auditor")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated project_detail.html successfully")
