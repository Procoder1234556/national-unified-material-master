const fs = require('fs');
let content = fs.readFileSync('LandingPage.tsx', 'utf8');

content = content.replace(/fontSize: .56px./g, 'fontSize: "64px"');
content = content.replace(/letterSpacing: .-0.02em./g, 'letterSpacing: "-0.03em"');

fs.writeFileSync('LandingPage.tsx', content);
