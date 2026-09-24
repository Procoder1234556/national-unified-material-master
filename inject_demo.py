import sys

with open('frontend/src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('return (\n    <AppShell', '''return (
    <>
      {isDemoMode && (
        <div style={{ backgroundColor: "#141414", color: "white", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 9999, position: "relative" }}>
          <div style={{ fontWeight: "bold" }}>SIH 26099 Demo - Step {demoStep}/5: {
            demoStep === 1 ? "Flow A: Catalog Harmonization" : 
            demoStep === 2 ? "Flow B: Safety Gate" : 
            demoStep === 3 ? "Flow C: Inter-CPSE Surplus" : 
            demoStep === 4 ? "Flow D: Demand Pooling" : 
            "Flow E: Audit Trail"
          }</div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => {
              if (demoStep === 1) { setDemoStep(2); setActiveTab("steward"); setActiveRole("STEWARD"); }
              else if (demoStep === 2) { setDemoStep(3); setActiveTab("search"); setActiveRole("PLANT_ENGINEER"); }
              else if (demoStep === 3) { setDemoStep(4); setActiveTab("demand"); setActiveRole("PROCUREMENT_OFFICER"); }
              else if (demoStep === 4) { setDemoStep(5); setActiveTab("security"); setActiveRole("AUDITOR"); }
              else { setIsDemoMode(false); setViewMode("landing"); }
            }} style={{ backgroundColor: "white", color: "#141414", padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
              {demoStep === 5 ? "Finish Demo" : "Next Flow"}
            </button>
          </div>
        </div>
      )}
    <AppShell''')

content = content.replace('</AppShell>\n  );', '''</AppShell>\n    </>\n  );''')

with open('frontend/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
