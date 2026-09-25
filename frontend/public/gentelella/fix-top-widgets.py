import re

with open("production/index.html", "r", encoding="utf-8") as f:
    html = f.read()

reps = {
    "TOTAL USERS": "TOTAL CATALOG ITEMS",
    "Total users": "Total Catalog Items",
    "2,500": "4.21M",
    "342 new this week": "Across 10 CPSEs",
    "AVG SESSION": "AUTO-APPROVED MATCHES",
    "Avg session": "Auto-Approved Matches",
    "123.5<small>min</small>": "83.2%",
    "+14min from last week": "ASME validated",
    "ORDERS": "PENDING HITL REVIEW",
    "Orders": "Pending HITL Review",
    "1,240": "84",
    "78 shipped today": "Borderline 70-91% confidence",
    "REVENUE": "ADDRESSABLE VALUE POOL",
    "Revenue": "Addressable Value Pool",
    r"\$24,567": "₹4,812Cr",
    r"\$3,218 today": "Duplicate & surplus savings",
    "CONVERSIONS": "ONMC CODES MINTED",
    "Conversions": "ONMC Codes Minted",
    "2,315": "1,04,281",
    "Rate: 4.2%": "National master catalog entries",
    "PAGE VIEWS": "SAFETY GATE BLOCKS",
    "Page views": "Safety Gate Blocks",
    "47,325": "2",
    "6,854 unique visitors": "NACE MR0175 sour gas isolations",
}

for k, v in reps.items():
    html = re.sub(re.escape(k) if "\\" not in k else k, v, html)

with open("production/index.html", "w", encoding="utf-8") as f:
    f.write(html)
