import re


def rewrite(path, rules):
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        for pat, rep in rules:
            content = re.sub(pat, rep, content)

        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {path}")
    except Exception as e:
        print(f"Error updating {path}: {e}")


html_rules = [
    (r"Sarah K\..*?92\.4%\.00", r"AI Model identified 92.4% match for Gasket"),
    (r"\$245", r"92.4%"),
    (r">Paid<", r">Approved<"),
    (r">Pending<", r">In Review<"),
    (r"8\.4k.*?devices", r"10 CPSEs"),
    (r">Admin<", r">Chief Steward<"),
]
rewrite("production/index.html", html_rules)

shell_rules = [
    (r"Gentelella.*?Colorlib<.*?a>", "NUMM Dashboard - Ministry of Petroleum & Natural Gas"),
    (r"v\$\{VERSION\}.*?MIT<.*?a>", "v1.0.0 &copy; 2026"),
    (r">Admin<", r">Chief Steward<"),
    (r"tb-docs.*?<span>Docs</span>.*?</a>", ""),
]
rewrite("src/v4/shell-render.js", shell_rules)
