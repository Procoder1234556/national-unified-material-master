from bs4 import BeautifulSoup, Comment, NavigableString
import re

with open('landing_page_edited.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

body = soup.body

for script in body.find_all('script'):
    script.decompose()

def reactify_style(style_str):
    styles = []
    for decl in style_str.split(';'):
        if ':' in decl:
            k, v = decl.split(':', 1)
            k = k.strip()
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            styles.append(f'{k}: "{v.strip()}"')
    return "{" + ", ".join(styles) + "}"

def node_to_jsx(node):
    if isinstance(node, Comment):
        return ""
    if isinstance(node, NavigableString):
        text = str(node)
        if text.strip() == "":
            return text
        return text.replace('{', '&#123;').replace('}', '&#125;')

    tag = node.name
    
    if tag == 'section' and node.get('id') == 'hero-section':
        tag = 'motion.section'
    
    is_motion_card = 'motion-card' in node.get('class', [])
    if is_motion_card:
        tag = 'motion.div'

    if tag == 'div' and node.get('id') == 'faqAccordion':
        return "{/* FAQ Component */}<FaqAccordion />"

    if tag == 'section' and node.get('id') == 'pricing-calculator':
        return "{/* Pricing Component */}<PricingCalculator />"

    attrs = []
    for k, v in node.attrs.items():
        if k == 'class':
            k = 'className'
            if isinstance(v, list):
                v = " ".join(v)
        elif k == 'for':
            k = 'htmlFor'
        elif k == 'style':
            attrs.append(f'style={{{reactify_style(v)}}}')
            continue
        elif k in ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-miterlimit', 'stop-color', 'stop-opacity', 'stroke-dasharray']:
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
        elif k.startswith('xmlns') or (":" in k and not k.startswith("xmlns")):
            continue

        if isinstance(v, list):
            v = " ".join(v)
        
        if v:
            v = v.replace('"', '&quot;')
        attrs.append(f'{k}="{v}"')
        
    if tag == 'motion.section':
        attrs.append('initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}')
    if is_motion_card:
        attrs.append('initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}')

    attr_str = " ".join(attrs)
    if attr_str:
        attr_str = " " + attr_str
        
    void_elements = ['img', 'input', 'br', 'hr', 'path', 'circle', 'line', 'rect', 'polygon', 'polyline', 'ellipse', 'stop']
    if tag in void_elements:
        if not list(node.children):
            return f'<{tag}{attr_str} />'
            
    children_jsx = "".join(node_to_jsx(c) for c in node.children)
    return f'<{tag}{attr_str}>{children_jsx}</{tag}>'

main_content = "".join(node_to_jsx(c) for c in body.children)

react_code = f"""import React, {{ useState }} from 'react';
import {{ motion }} from 'framer-motion';

const PricingCalculator = () => {{
    const [teamSize, setTeamSize] = useState(30);
    const [level, setLevel] = useState(2);

    const base = level === 1 ? 2500 : 4500;
    const addition = Math.floor(teamSize / 10) * (level === 1 ? 150 : 300);
    const total = base + addition;

    return (
        <section id="pricing-calculator" className="py-24 px-6 md:px-12 lg:px-24 bg-[#fff8f5]">
            <div className="max-w-[1280px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-[#1e1714] font-['Playfair_Display'] leading-tight tracking-tight mb-4">Transparent Pricing for Growing Teams</h2>
                    <p className="text-base text-[#4e4541] max-w-2xl mx-auto">Estimate your monthly investment based on your team size and strategic HR needs.</p>
                </div>
                <div className="bg-white rounded-[2rem] p-8 shadow-[0_12px_32px_rgba(30,23,20,0.04)] border border-white/80 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
                    
                    <div className="flex-1 space-y-8">
                        <div>
                            <label className="block text-sm font-semibold text-[#1e1714] mb-2">Team Size</label>
                            <input type="range" min="10" max="150" step="10" value={{teamSize}} onChange={{(e) => setTeamSize(parseInt(e.target.value))}} className="w-full accent-[#f89a7a] bg-[#e5d7d0] h-2 rounded-full appearance-none cursor-pointer" />
                            <div className="flex justify-between text-xs text-[#7a706a] mt-2 font-bold">
                                <span>10</span>
                                <span>{{teamSize}}{{teamSize >= 150 ? '+' : ''}} employees</span>
                                <span>150+</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#1e1714] mb-2">Engagement Level</label>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-[#d1c4bf] hover:bg-[#fff8f5] transition-colors">
                                    <input type="radio" name="level" value="1" checked={{level === 1}} onChange={{() => setLevel(1)}} className="w-4 h-4 text-[#1e1714] bg-white border-gray-300 focus:ring-[#f89a7a]" />
                                    <div>
                                        <div className="font-semibold text-sm text-[#1e1714]">Strategic Advisory</div>
                                        <div className="text-xs text-[#7a706a]">1-2 days/week. Coaching & roadmaps.</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-[#d1c4bf] bg-[#fff8f5] transition-colors">
                                    <input type="radio" name="level" value="2" checked={{level === 2}} onChange={{() => setLevel(2)}} className="w-4 h-4 text-[#1e1714] bg-white border-gray-300 focus:ring-[#f89a7a]" />
                                    <div>
                                        <div className="font-semibold text-sm text-[#1e1714]">Embedded Leadership</div>
                                        <div className="text-xs text-[#7a706a]">3 days/week. Active implementation.</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#fff8f5] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-[#ede0d8]">
                        <div className="text-sm font-bold text-[#f89a7a] tracking-widest uppercase mb-4">Estimated Monthly</div>
                        <motion.div key={{total}} initial={{scale: 1.1, opacity: 0.5}} animate={{scale: 1, opacity: 1}} className="text-5xl font-semibold text-[#1e1714] font-['Playfair_Display'] mb-2">
                            ${{total.toLocaleString()}}
                        </motion.div>
                        <div className="text-sm text-[#7a706a] mb-6">Fraction of a full-time executive ($15k+/mo)</div>
                        <button className="w-full bg-[#1e1714] text-white rounded-full py-3.5 px-6 font-semibold hover:shadow-[0_0_20px_rgba(248,154,122,0.35)] transition-all duration-300">Get a Custom Proposal</button>
                    </div>
                </div>
            </div>
        </section>
    );
}};

const FaqAccordion = () => {{
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const faqs = [
        {{ q: "How many hours per week is a fractional engagement?", a: "Typically, our fractional engagements range from 1 to 3 days per week depending on your company's stage and immediate goals." }},
        {{ q: "Do you handle recruiting and talent acquisition?", a: "We build the talent acquisition strategy, interview frameworks, and employer brand, but we operate alongside your recruiting team or agency rather than acting as a solo recruiter." }},
        {{ q: "How quickly can you onboard and start making an impact?", a: "We begin with a comprehensive 2-week discovery phase. You will start seeing actionable roadmaps and immediate compliance gap closures within the first 14 days." }},
        {{ q: "What happens when we are ready for a full-time Head of People?", a: "That is our ultimate goal! We help you define the role, interview candidates, and ensure a seamless handoff process so your new leader inherits a healthy, scalable infrastructure." }},
        {{ q: "Are you hands-on with employees, or just advising the founders?", a: "We do both. We advise the C-Suite on organizational strategy and also operate as the visible Head of People to your broader team, handling complex employee relations when needed." }}
    ];

    return (
        <div className="space-y-4" id="faqAccordion">
            {{faqs.map((faq, idx) => (
                <div key={{idx}}>
                    <button onClick={{() => setActiveFaq(activeFaq === idx ? null : idx)}} className="faq-btn w-full p-6 text-left flex justify-between items-center transition-colors bg-white rounded-t-2xl border-b border-[#ede0d8]">
                        <span className="font-semibold text-lg text-[#1e1714]">{{faq.q}}</span>
                        <span className="material-symbols-outlined text-[#7a706a]">
                            {{activeFaq === idx ? "remove" : "add"}}
                        </span>
                    </button>
                    <motion.div initial={{height: 0}} animate={{height: activeFaq === idx ? "auto" : 0}} className="faq-content overflow-hidden bg-white rounded-b-2xl">
                        <div className="px-6 pb-6 pt-2 text-[#4e4541] leading-relaxed">
                            {{faq.a}}
                        </div>
                    </motion.div>
                </div>
            ))}}
        </div>
    );
}};

export const LandingPage = () => {{
    return (
        <div className="bg-[#fff8f5] text-[#211a16] font-sans">
            {main_content}
        </div>
    );
}};
"""

with open('frontend/src/components/LandingPage.tsx', 'w', encoding='utf-8') as f:
    f.write(react_code)

print("LandingPage.tsx updated!")
