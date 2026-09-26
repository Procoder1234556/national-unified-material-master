import os
import re

dist_dir = r"d:\oil\frontend\public\gentelella\dist\production"

with open(os.path.join(dist_dir, "projects.html"), "r", encoding="utf-8") as f:
    proj_html = f.read()

head_assets_match = re.search(r'(<link rel="modulepreload".*?<link rel="stylesheet".*?>)', proj_html, re.DOTALL)
head_assets = head_assets_match.group(1) if head_assets_match else ""

sidebar_match = re.search(r'(<aside class="sidebar".*?</aside>)', proj_html, re.DOTALL)
sidebar = sidebar_match.group(1) if sidebar_match else ""

header_match = re.search(r'(<header class="topbar".*?</header>)', proj_html, re.DOTALL)
header = header_match.group(1) if header_match else ""

footer_match = re.search(r'(<footer class="footer".*?</footer>)', proj_html, re.DOTALL)
footer = footer_match.group(1) if footer_match else ""

html_files = [
    "e_commerce.html",
    "kanban.html",
    "form_upload.html",
    "orders.html",
    "form_wizards.html",
    "tables_dynamic.html",
    "contacts.html",
    "tables.html",
    "settings.html",
]

for filename in html_files:
    filepath = os.path.join(dist_dir, filename)
    if not os.path.exists(filepath):
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace head assets
    content = re.sub(r'<script type="module" src="/src/main-v4.js"></script>', head_assets, content)

    # Inject sidebar and header before <main class="main">
    if '<aside class="sidebar"' not in content:
        content = content.replace(
            '<main class="main">',
            f'<a class="skip-link" href="#main-content">Skip to main content</a>\n{sidebar}\n{header}\n<main class="main">',
        )

    # Make sure main has id="main-content"
    content = content.replace('<main class="main">', '<main id="main-content" tabindex="-1" class="main">')

    # Inject footer
    if '<footer class="footer"' not in content:
        content = content.replace("</main>", f"{footer}\n</main>")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Fixed {filename}")
