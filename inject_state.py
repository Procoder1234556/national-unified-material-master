with open("frontend/src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'const [viewMode, setViewMode] = useState<"landing" | "dashboard">("landing");',
    'const [viewMode, setViewMode] = useState<"landing" | "dashboard">("landing");\n  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);\n  const [demoStep, setDemoStep] = useState<number>(0);',
)

content = content.replace('activeRole === "STEWARD" || activeRole === "ADMIN"', 'activeRole === "STEWARD"')

with open("frontend/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
