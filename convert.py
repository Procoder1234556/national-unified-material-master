import re

with open('landing_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

body_match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
content = body_match.group(1) if body_match else html

content = content.replace('class="', 'className="')
content = content.replace('for="', 'htmlFor="')
content = re.sub(r'<(img|br|input|hr)([^>]*)(?<!/)>', r'<\1\2 />', content)
content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)

# Add Framer motion to hero section (assuming it's the first section)
content = content.replace('<section className="relative', '<motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative', 1)
content = content.replace('</section>', '</motion.section>', 1)

# Style conversions
content = re.sub(r'style="([^"]*)"', lambda m: 'style={{' + ', '.join([f'"{k.strip()}": "{v.strip()}"' for k, v in [p.split(':') for p in m.group(1).split(';') if ':' in p]]) + '}}', content)

# Remove SVG viewBox warnings by replacing standalone xml tags
content = re.sub(r'xmlns:xlink="[^"]*"', '', content)
content = re.sub(r'xml:space="[^"]*"', '', content)

jsx = '''import React, { useState } from "react";
import { motion } from "framer-motion";

export const HumanteLandingPage = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    return (
        <div className="bg-[#fff8f5] text-[#211a16] font-sans">
            ''' + content + '''
        </div>
    );
};
'''

with open('frontend/src/components/HumanteLandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(jsx)

print('JSX Created!')
