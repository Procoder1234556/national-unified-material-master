from bs4 import BeautifulSoup

with open("landing_page.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

sections = soup.find_all("section")

hero_section = sections[0]
hero_section["id"] = "hero-section"
hero_section["class"] = hero_section.get("class", []) + ["motion-hero"]

for section in [sections[1], sections[3]]:
    cards = section.select(r"div.bg-white, div.bg-\[\#fff8f5\]")
    for card in cards:
        card["class"] = card.get("class", []) + ["motion-card"]

pricing_html = """
<section id="pricing-calculator" class="py-24 px-6 md:px-12 lg:px-24 bg-[#fff8f5]">
    <div class="max-w-[1280px] mx-auto">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl lg:text-[40px] font-semibold text-[#1e1714] font-['Playfair_Display'] leading-tight tracking-tight mb-4">Transparent Pricing for Growing Teams</h2>
            <p class="text-base text-[#4e4541] max-w-2xl mx-auto">Estimate your monthly investment based on your team size and strategic HR needs.</p>
        </div>
        <div class="bg-white rounded-[2rem] p-8 shadow-[0_12px_32px_rgba(30,23,20,0.04)] border border-white/80 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">

            <div class="flex-1 space-y-8">
                <div>
                    <label class="block text-sm font-semibold text-[#1e1714] mb-2">Team Size</label>
                    <input type="range" id="teamSize" min="10" max="150" step="10" value="30" class="w-full accent-[#f89a7a] bg-[#e5d7d0] h-2 rounded-full appearance-none cursor-pointer">
                    <div class="flex justify-between text-xs text-[#7a706a] mt-2 font-bold">
                        <span>10</span>
                        <span id="teamSizeDisplay">30 employees</span>
                        <span>150+</span>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-semibold text-[#1e1714] mb-2">Engagement Level</label>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-[#d1c4bf] hover:bg-[#fff8f5] transition-colors">
                            <input type="radio" name="level" value="1" class="w-4 h-4 text-[#1e1714] bg-white border-gray-300 focus:ring-[#f89a7a]">
                            <div>
                                <div class="font-semibold text-sm text-[#1e1714]">Strategic Advisory</div>
                                <div class="text-xs text-[#7a706a]">1-2 days/week. Coaching & roadmaps.</div>
                            </div>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer p-4 rounded-2xl border border-[#d1c4bf] bg-[#fff8f5] transition-colors">
                            <input type="radio" name="level" value="2" checked class="w-4 h-4 text-[#1e1714] bg-white border-gray-300 focus:ring-[#f89a7a]">
                            <div>
                                <div class="font-semibold text-sm text-[#1e1714]">Embedded Leadership</div>
                                <div class="text-xs text-[#7a706a]">3 days/week. Active implementation.</div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div class="flex-1 bg-[#fff8f5] rounded-3xl p-8 flex flex-col justify-center items-center text-center border border-[#ede0d8]">
                <div class="text-sm font-bold text-[#f89a7a] tracking-widest uppercase mb-4">Estimated Monthly</div>
                <div class="text-5xl font-semibold text-[#1e1714] font-['Playfair_Display'] mb-2" id="priceDisplay">4,500</div>
                <div class="text-sm text-[#7a706a] mb-6">Fraction of a full-time executive (15k+/mo)</div>
                <button class="w-full bg-[#1e1714] text-white rounded-full py-3.5 px-6 font-semibold hover:shadow-[0_0_20px_rgba(248,154,122,0.35)] transition-all duration-300">Get a Custom Proposal</button>
            </div>
        </div>
    </div>
</section>
"""
pricing_soup = BeautifulSoup(pricing_html, "html.parser")

faq_section = sections[10]
faq_section.insert_before(pricing_soup)

script_html = """
<script type="module">
    import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.11/+esm";

    animate(".motion-hero",
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.8, easing: "ease-out" }
    );

    const heroTexts = document.querySelectorAll(".motion-hero h1, .motion-hero p, .motion-hero button, .motion-hero img");
    animate(heroTexts,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.6, delay: stagger(0.1, { startDelay: 0.3 }), easing: "ease-out" }
    );

    inView(".motion-card", (info) => {
        animate(info.target,
            { opacity: [0, 1], y: [40, 0] },
            { duration: 0.6, easing: "ease-out" }
        );
    });

    const teamSizeInput = document.getElementById('teamSize');
    const teamSizeDisplay = document.getElementById('teamSizeDisplay');
    const priceDisplay = document.getElementById('priceDisplay');
    const levelInputs = document.querySelectorAll('input[name="level"]');

    function calculatePrice() {
        const size = parseInt(teamSizeInput.value);
        let level = 2;
        levelInputs.forEach(i => { if(i.checked) level = parseInt(i.value); });

        teamSizeDisplay.innerText = size + (size >= 150 ? '+' : '') + ' employees';

        let base = level === 1 ? 2500 : 4500;
        let addition = Math.floor(size / 10) * (level === 1 ? 150 : 300);

        const total = base + addition;

        animate(priceDisplay, { scale: [1.1, 1], opacity: [0.5, 1] }, { duration: 0.3 });
        priceDisplay.innerText = '$' + total.toLocaleString();
    }

    teamSizeInput.addEventListener('input', calculatePrice);
    levelInputs.forEach(i => i.addEventListener('change', calculatePrice));
    calculatePrice();
</script>
"""
script_soup = BeautifulSoup(script_html, "html.parser")
soup.body.append(script_soup)

with open("landing_page_edited.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
