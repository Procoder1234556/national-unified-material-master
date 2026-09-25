import re

with open("production/index.html", "r", encoding="utf-8") as f:
    html = f.read()


def repl(pattern, replacement):
    global html
    html = re.sub(pattern, replacement, html, count=1)


def repl_all(pattern, replacement):
    global html
    html = re.sub(pattern, replacement, html)


# HITL Table Headers
repl(r"<th>Order</th>", "<th>Request ID</th>")
repl(r"<th>Customer</th>", "<th>Source CPSE</th>")
repl(r"<th>Product</th>", "<th>Item Name</th>")
repl(r"<th>Amount</th>", "<th>Match %</th>")
repl(r"<th>Status</th>", "<th>Action</th>")

# HITL Table Rows
repl(r"#7841", "ONMC-841")
repl(r"JD(.*?)John Doe", r"ON\1ONGC")
repl(r"AdminLTE Pro", "Gasket, Spiral Wound 150#")
repl(r"\$245", "92.4%")
repl(r"Paid", "Approved")

repl(r"#7840", "ONMC-840")
repl(r"AS(.*?)Anna Smith", r"IO\1IOCL")
repl(r"Gentelella Theme", "Bearing, Ball 6205")
repl(r"\$89", "89.1%")
repl(r"Processing", "In Review")

repl(r"#7839", "ONMC-839")
repl(r"RJ(.*?)Robert Jones", r"BP\1BPCL")
repl(r"Dashboard Pack", "Valve, Gate 2&quot; 150#")
repl(r"\$490", "98.0%")

repl(r"#7838", "ONMC-838")
repl(r"EW(.*?)Emily Wang", r"HP\1HPCL")
repl(r"ArchitectUI", "Transmitter, Pressure")
repl(r"\$125", "75.3%")

repl(r"#7837", "ONMC-837")
repl(r"MK(.*?)Mark Kim", r"GA\1GAIL")
repl(r"Bootstrap Bundle", "Oil, Lube ISO VG 46")
repl(r"\$67", "45.2%")
repl(r"Cancelled", "Rejected")

# Surplus Stock
repl(r"6\.8 GB of 8 GB used", "₹245Cr of ₹800Cr mobilized")
repl(r"Regular(.*?)3\.4 GB", r"Pipe & Tubes\1₹102Cr")
repl(r"System(.*?)1\.4 GB", r"Valves\1₹55Cr")
repl(r"Shared(.*?)1\.0 GB", r"Bearings\1₹48Cr")
repl(r"Free(.*?)1\.2 GB", r"Rotating Eq.\1₹40Cr")

# Ingestion Coverage
repl(r"8\.4k.*?devices", r"10 CPSEs")
repl(r"iOS(.*?)30%", r"ONGC\1 30%")
repl(r"Android(.*?)25%", r"IOCL\1 25%")
repl(r"Desktop(.*?)20%", r"BPCL\1 20%")
repl(r"Tablet(.*?)15%", r"HPCL\1 15%")
repl(r"Other(.*?)10%", r"Others\1 10%")

# Search Before Buy
repl(r"United States", "ONGC")
repl(r"France", "IOCL")
repl(r"Germany", "BPCL")
repl(r"Spain", "HPCL")
repl(r"United Kingdom", "GAIL")
repl(r"Latvia", "OIL")
repl_all(r'<span class="visitor-flag">.*?</span>', "")

# Checklist
repl(r"Review Q4 analytics report", "Resolve ambiguous matches for Valves")
repl(r"Send invoices to clients", "Approve ONGC batch #1042")
repl(r"Update user documentation", "Review Gasket ontology mappings")
repl(r"Deploy v3\.2\.1 to production", "Audit CVC trail for HPCL import")
repl(r"Fix sidebar responsive issues", "Map NACE MR0175 standards")
repl(r"Prepare team standup notes", "Check duplicate alerts in Bearings")
repl(r"4 of 6 remaining", "4 of 6 pending")
repl(r"Dec 08", "Today")
repl(r"Jan 01", "Today")
repl(r"Jan 15", "High Prio")
repl(r"Feb 01", "High Prio")
repl(r"Feb 14", "Routine")
repl(r"Feb 15", "Routine")

# Participation
repl(r"v3\.2\.1", "ONGC")
repl(r"v3\.2\.0", "IOCL")
repl(r"v3\.1\.9", "BPCL")
repl(r"v3\.1\.8", "HPCL")
repl(r"v3\.1\.7", "GAIL")

# Settings
repl(r"Email notifications", "AI Auto-approval (&lt;90%)")
repl(r"Two-factor auth", "SBB Surplus Alerts")
repl(r"Dark mode", "Strict ASME B16.5")
repl(r"Public profile", "CVC Blockchain Sync")

# Activity / CVC
repl(
    r"<strong>John D\.</strong> uploaded <strong>AdminLTE 3\.2\.zip</strong>",
    "<strong>ONGC</strong> harmonized <strong>Batch #4100 (1,204 items)</strong>",
)
repl(
    r"<strong>Michael R\.</strong> registered a new account",
    "<strong>Steward J.K.</strong> audited <strong>Code ONMC-55921</strong>",
)
repl(
    r"<strong>Payment</strong> processed (.*?) Invoice #4521",
    r"<strong>Surplus</strong> transferred \1 ONGC to IOCL (₹45L)",
)
repl(
    r"<strong>Jeffie L\.</strong> reviewed <strong>Dashboard Kit</strong>",
    "<strong>AI</strong> grouped 450 items under <strong>Bearings</strong>",
)
repl(
    r"<strong>Emmy L\.</strong> created project <strong>Morning Clock</strong>",
    "<strong>GAIL</strong> uploaded 12,000 legacy codes",
)
repl(
    r"<strong>Shipment</strong> dispatched (.*?) Order #3847",
    r"<strong>Master Catalog</strong> synced to ERP \1 (SAP/Oracle)",
)

with open("production/index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done!")
