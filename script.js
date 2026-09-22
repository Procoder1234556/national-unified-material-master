const fs = require("fs");
let code = fs.readFileSync("D:/oil/frontend/src/components/LandingPage.tsx", "utf8");

const newIcons = `
const KoboyoDashboard = () => (
  <svg viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
    <rect x="20" y="20" width="360" height="260" rx="12" />
    <line x1="20" y1="60" x2="380" y2="60" />
    <circle cx="40" cy="40" r="5" fill="currentColor" />
    <circle cx="60" cy="40" r="5" fill="currentColor" />
    <circle cx="80" cy="40" r="5" fill="currentColor" />
    <rect x="40" y="80" width="100" height="20" rx="4" />
    <rect x="160" y="80" width="200" height="20" rx="4" />
    <rect x="40" y="120" width="80" height="20" rx="4" />
    <rect x="140" y="120" width="220" height="20" rx="4" />
    <rect x="40" y="160" width="120" height="20" rx="4" />
    <rect x="180" y="160" width="180" height="20" rx="4" />
    <path d="M280 200 Q300 180 320 200 T360 200" strokeDasharray="4 4" />
  </svg>
);

const KoboyoHarmonization = () => (
  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
    <path d="M40 100 C 20 80, 40 40, 70 50 C 90 20, 120 40, 110 70 C 140 60, 160 90, 140 120 C 160 150, 120 180, 100 150 C 70 170, 30 150, 50 120 C 20 120, 20 100, 40 100 Z" strokeDasharray="4 4" />
    <path d="M80 100 L120 100 M100 80 L100 120" />
    <rect x="60" y="80" width="16" height="16" />
    <rect x="124" y="104" width="16" height="16" />
    <circle cx="100" cy="100" r="40" />
  </svg>
);

const KoboyoTransfer = () => (
  <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
    <rect x="20" y="40" width="60" height="60" rx="4" />
    <polygon points="20,40 50,20 80,40" />
    <rect x="120" y="100" width="60" height="60" rx="4" />
    <polygon points="120,100 150,80 180,100" />
    <path d="M80 70 Q 100 70 100 100 T 120 130" strokeDasharray="4 4" />
    <polygon points="110,120 120,130 110,140" fill="currentColor" />
  </svg>
);

const KoboyoOverlap = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%", padding: "20px" }}>
    <circle cx="40" cy="50" r="30" />
    <circle cx="60" cy="50" r="30" />
    <path d="M45 50 L50 55 L58 43" />
  </svg>
);

const KoboyoBatch = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%", padding: "20px" }}>
    <rect x="20" y="30" width="60" height="50" rx="4" />
    <line x1="20" y1="45" x2="80" y2="45" />
    <line x1="20" y1="60" x2="80" y2="60" />
    <path d="M40 30 L40 20 L60 20 L60 30" />
  </svg>
);

const KoboyoSavings = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%", padding: "20px" }}>
    <line x1="20" y1="80" x2="80" y2="80" />
    <line x1="20" y1="80" x2="20" y2="20" />
    <path d="M20 70 L40 50 L60 60 L80 30" />
    <polygon points="70,30 80,30 80,40" fill="currentColor" />
  </svg>
);

const KoboyoPortrait = () => (
  <svg viewBox="0 0 200 300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
    <circle cx="100" cy="100" r="50" />
    <path d="M40 250 C 40 180, 160 180, 160 250 Z" />
    <path d="M80 90 Q 90 85 100 90 T 120 90" />
    <path d="M90 120 Q 100 130 110 120" />
  </svg>
);
`

if (!code.includes("KoboyoDashboard")) {
  code = code.replace("const KoboyoButterfly", newIcons + "\n\nconst KoboyoButterfly");
}

code = code.replace(
  /<div style=\{\{\s*width:\s*.100%.,\s*height:\s*.600px.,\s*backgroundColor:\s*.#e5e7eb.,[^>]+>\s*\[ NUMM High-Throughput Triage Interface Screen \]\s*<\/div>/,
  "<div style={{ width: \"100%\", height: \"600px\", backgroundColor: \"#e5e7eb\", borderRadius: \"12px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#5F978E\", padding: \"40px\" }}><KoboyoDashboard /></div>"
);

code = code.replace(
  /<div style=\{\{\s*height:\s*.400px.,\s*backgroundColor:\s*.#e5e7eb.,\s*borderRadius:\s*.12px.\s*\}\}><\/div>/,
  "<div style={{ height: \"400px\", backgroundColor: \"#e5e7eb\", borderRadius: \"12px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#593C32\", padding: \"40px\" }}><KoboyoHarmonization /></div>"
);

code = code.replace(
  /<div style=\{\{\s*flex:\s*2,\s*height:\s*.400px.,\s*backgroundColor:\s*.#faf8f5.,\s*borderRadius:\s*.12px.\s*\}\}><\/div>/,
  "<div style={{ flex: 2, height: \"400px\", backgroundColor: \"#faf8f5\", borderRadius: \"12px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#E94344\", border: \"1px solid #E5E7EB\", padding: \"40px\" }}><KoboyoTransfer /></div>"
);

code = code.replace(
  /<div style=\{\{\s*height:\s*.160px.,\s*backgroundColor:\s*.#f0f0f0.,\s*borderRadius:\s*.8px.,\s*marginBottom:\s*.24px.\s*\}\}><\/div>\s*<h3 style=\{styles\.gridCardTitle\}>Identify Overlap<\/h3>/,
  "<div style={{ height: \"160px\", backgroundColor: \"#f0f0f0\", borderRadius: \"8px\", marginBottom: \"24px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#5F978E\" }}><KoboyoOverlap /></div>\n            <h3 style={styles.gridCardTitle}>Identify Overlap</h3>"
);

code = code.replace(
  /<div style=\{\{\s*height:\s*.160px.,\s*backgroundColor:\s*.#f0f0f0.,\s*borderRadius:\s*.8px.,\s*marginBottom:\s*.24px.\s*\}\}><\/div>\s*<h3 style=\{styles\.gridCardTitle\}>Batch Tenders<\/h3>/,
  "<div style={{ height: \"160px\", backgroundColor: \"#f0f0f0\", borderRadius: \"8px\", marginBottom: \"24px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#F1CC9D\" }}><KoboyoBatch /></div>\n            <h3 style={styles.gridCardTitle}>Batch Tenders</h3>"
);

code = code.replace(
  /<div style=\{\{\s*height:\s*.160px.,\s*backgroundColor:\s*.#f0f0f0.,\s*borderRadius:\s*.8px.,\s*marginBottom:\s*.24px.\s*\}\}><\/div>\s*<h3 style=\{styles\.gridCardTitle\}>Realize Savings<\/h3>/,
  "<div style={{ height: \"160px\", backgroundColor: \"#f0f0f0\", borderRadius: \"8px\", marginBottom: \"24px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#A5D7C9\" }}><KoboyoSavings /></div>\n            <h3 style={styles.gridCardTitle}>Realize Savings</h3>"
);

code = code.replace(
  /<div style=\{\{\s*width:\s*.240px.,\s*height:\s*.320px.,\s*backgroundColor:\s*.#e5e7eb.,\s*borderRadius:\s*.12px.\s*\}\}><\/div>/,
  "<div style={{ width: \"240px\", height: \"320px\", backgroundColor: \"#e5e7eb\", borderRadius: \"12px\", display: \"flex\", alignItems: \"center\", justifyContent: \"center\", color: \"#4B5563\", padding: \"40px\" }}><KoboyoPortrait /></div>"
);

fs.writeFileSync("D:/oil/frontend/src/components/LandingPage.tsx", code);
