import os
import re

files_to_update = [
    "production/kanban.html",
    "production/projects.html",
    "production/e_commerce.html",
    "production/form_upload.html",
    "production/orders.html",
    "production/form_wizards.html",
    "production/tables_dynamic.html",
    "production/contacts.html",
    "production/tables.html",
    "production/settings.html",
]

replacements = [
    # Global titles and headers
    (r"<title>.*?</title>", r"<title>NUMM Material Master</title>"),
    (r'<div class="page-pretitle">.*?</div>', r'<div class="page-pretitle">National Unified Material Master</div>'),
    (r'<h1 class="page-title">.*?</h1>', r'<h1 class="page-title">NUMM Component</h1>'),
    # E-commerce -> Search Before Buy / Surplus
    (r"E-commerce", "Search Before Buy"),
    (r"Products", "Master Materials"),
    (r"Add Product", "List Surplus Item"),
    # Kanban -> Stewardship Queue
    (r"Kanban Board", "Stewardship Queue"),
    (r"To Do", "Pending AI Reviews"),
    (r"In Progress", "Active Harmonization"),
    (r"Done", "Approved ONMC Codes"),
    # Projects -> CVC Audit Chain
    (r"Projects", "CVC Audit Chain"),
    (r"Project Name", "Audit Hash"),
    (r"Project Progress", "Validation Status"),
    # Orders -> HITL Review
    (r"Orders", "HITL Queue"),
    (r"Order ID", "Batch ID"),
    (r"Customer", "Source CPSE"),
    # Contacts -> CPSE Plant Masters
    (r"Contacts", "CPSE Plant Masters"),
    # General terms
    (r"Gentelella", "NUMM"),
    (r"Colorlib", "Ministry of PNG"),
    (r"AdminLTE", "ONMC Standard"),
]

# File-specific page title overrides
title_overrides = {
    "kanban.html": "Stewardship Queue",
    "projects.html": "CVC Audit Chain",
    "e_commerce.html": "Search Before Buy",
    "form_upload.html": "Upload Legacy Codes",
    "orders.html": "HITL Review",
    "form_wizards.html": "Ontology Mappings",
    "tables_dynamic.html": "Minted ONMC Codes",
    "contacts.html": "CPSE Plant Masters",
    "tables.html": "Blockchain Ledger",
    "settings.html": "Compliance Settings",
}

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    for pat, rep in replacements:
        content = re.sub(pat, rep, content, flags=re.IGNORECASE)

    # Apply specific title
    basename = os.path.basename(filepath)
    if basename in title_overrides:
        specific_title = title_overrides[basename]
        content = re.sub(r'<h1 class="page-title">.*?</h1>', f'<h1 class="page-title">{specific_title}</h1>', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {filepath}")
