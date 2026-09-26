filepath = r"d:\oil\frontend\public\gentelella\dist\js\kanban-D-uVG5fV.js"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace column titles
content = content.replace(
    'id:"todo",title:"To do",color:"var(--text-muted)"', 'id:"todo",title:"Backlog",color:"var(--text-muted)"'
)
content = content.replace(
    'id:"doing",title:"In progress",color:"var(--blue)"', 'id:"doing",title:"Steward Review",color:"var(--blue)"'
)
content = content.replace(
    'id:"review",title:"Review",color:"var(--yellow)"', 'id:"review",title:"CPSE Consensus",color:"var(--yellow)"'
)
content = content.replace(
    'id:"done",title:"Done",color:"var(--green)"', 'id:"done",title:"Minted",color:"var(--green)"'
)

# Replace label texts
content = content.replace('id:"design",text:"Design"', 'id:"design",text:"Mech"')
content = content.replace('id:"eng",text:"Eng"', 'id:"eng",text:"Elec"')
content = content.replace('id:"pm",text:"PM"', 'id:"pm",text:"Instru"')
content = content.replace('id:"docs",text:"Docs"', 'id:"docs",text:"Safety"')
content = content.replace('id:"bug",text:"Bug"', 'id:"bug",text:"Duplicate"')

# Replace tasks
content = content.replace(
    'title:"Define onboarding email sequence",desc:"Three-message welcome flow with day 1, 3, 7 cadence"',
    'title:"Review ONMC flange specifications",desc:"Verify API 6D pipeline valves against legacy IOCL records"',
)
content = content.replace(
    'title:"Refresh icon system",desc:"Move from heroicons to a custom set with consistent stroke"',
    'title:"Merge duplicate bearing codes",desc:"Combine 14 identical SKU entries from HPCL and BPCL"',
)
content = content.replace('title:"Audit a11y on form pages",desc:""', 'title:"Validate API 6D pipeline valves",desc:""')
content = content.replace(
    'title:"Plan Q3 OKRs",desc:"Workshop with leads to define Q3 outcomes"',
    'title:"Resolve MTIRF request from IOCL",desc:"Urgent surplus inventory transfer approval required"',
)
content = content.replace(
    'title:"Implement drag-and-drop kanban",desc:"Use HTML5 drag API, no library"',
    'title:"Approve BPCL legacy data map",desc:"Map legacy SAP material codes to ONMC ontology"',
)
content = content.replace(
    'title:"Design product detail page",desc:"Gallery + variants + reviews + related"',
    'title:"Check HSN code mapping for pumps",desc:"Audit HSN codes for centrifugal pumps"',
)
content = content.replace(
    'title:"Write FAQ content",desc:"15 articles across 5 categories"',
    'title:"Harmonize Gasket categories",desc:"Review Spiral Wound 150# Gaskets"',
)
content = content.replace(
    'title:"Fix DataTables sort indicators",desc:"Replace empty span with proper chevron SVG"',
    'title:"Verify Transmitter, Pressure match",desc:"Hit 75.3% AI confidence; needs human override"',
)
content = content.replace(
    'title:"Notifications dropdown",desc:"Bell button → panel with sample notifications"',
    'title:"Audit Oil, Lube ISO VG 46 rejection",desc:"Investigate why GAIL record was rejected (45.2% match)"',
)
content = content.replace('title:"Build chat page"', 'title:"Mint ONMC-841 (Gasket)"')
content = content.replace('title:"Build settings page"', 'title:"Mint ONMC-839 (Valve, Gate)"')
content = content.replace('title:"Migrate to Vite 8"', 'title:"Update ontology rules engine"')
content = content.replace(
    'title:"Add dark mode",desc:"Pre-paint script, token overrides, ECharts theme observer"',
    'title:"Cross-border compliance check",desc:"Verify standards mapping for imported valves"',
)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated kanban-D-uVG5fV.js successfully")
