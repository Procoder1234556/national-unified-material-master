import re

with open("production/index.html", "r", encoding="utf-8") as f:
    html = f.read()


def repl(pattern, replacement):
    global html
    html = re.sub(pattern, replacement, html)


repl(r"Dashboard \| Gentelella 2026 v4", "NUMM Material Master")
repl(r'<div class="page-pretitle">Overview</div>', '<div class="page-pretitle">Command Center</div>')
repl(r"New view", "Import Codes")
repl(r"Create report", "Run Harmonization")

with open("production/index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done!")
