import React from "react";

export interface LandingPageProps {
  onEnterDashboard?: (targetTab?: string, targetRole?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
}) => {
  return (
    <>
      <style>{`
        :root {
          --opti-lime: #93EE34;
          --opti-dark: #12281C;
          --opti-light-green: #E8F2E2;
          --opti-pink: #FF8CA4;
          --opti-teal: #85CCC6;
          --opti-text: #111827;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #ffffff;
          color: var(--opti-text);
        }
        /* 3D Text Effect */
        .text-3d {
          position: relative;
          display: inline-block;
          font-weight: 900;
          color: var(--opti-lime);
          letter-spacing: -0.04em;
          z-index: 10;
        }
        .text-3d-shadow {
          position: absolute;
          left: 0;
          top: 0;
          transform: translate(4px, 5px);
          color: var(--opti-dark);
          z-index: -1;
          -webkit-text-stroke: 2px var(--opti-dark);
        }
        .btn-black {
          background-color: var(--opti-dark);
          color: #ffffff;
          border-radius: 9999px;
          font-weight: 600;
          padding: 10px 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .btn-black:hover {
          transform: scale(1.05);
        }
        .btn-lime {
          background-color: var(--opti-lime);
          color: var(--opti-dark);
          border-radius: 9999px;
          font-weight: 700;
          padding: 12px 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        .btn-lime:hover {
          transform: scale(1.05);
        }
        
        /* Auto-scrolling Marquee */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: 200%;
          animation: scroll 25s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="min-h-screen overflow-x-hidden selection:bg-[var(--opti-lime)] selection:text-black">
        {/* NAV */}
        <nav className="absolute top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="font-black text-2xl tracking-tighter text-[var(--opti-dark)] drop-shadow-md bg-white/80 px-4 py-1 rounded-full">
              NUMM
            </div>
            <div className="hidden md:flex gap-6 text-sm font-bold text-[var(--opti-dark)] bg-white/80 px-6 py-2 rounded-full drop-shadow-md">
              <span className="cursor-pointer hover:text-[var(--opti-lime)]">
                Platform
              </span>
              <span className="cursor-pointer hover:text-[var(--opti-lime)]">
                Solutions
              </span>
              <span className="cursor-pointer hover:text-[var(--opti-lime)]">
                Security
              </span>
              <span className="cursor-pointer hover:text-[var(--opti-lime)]">
                Resources
              </span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="hidden md:block text-sm font-bold text-white cursor-pointer drop-shadow-md">
              Log in
            </span>
            <a
              href="/gentelella/dist/production/index.html"
              className="bg-[var(--opti-lime)] text-[var(--opti-dark)] px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform inline-block"
            >
              Open Dashboard
            </a>
            <button
              className="bg-white/20 text-white px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform border border-white/30"
              onClick={() => onEnterDashboard?.()}
            >
              App View
            </button>
          </div>
        </nav>

        {/* 1. HERO - Petroleum & Energy Sector */}
        <header className="relative w-full h-[700px] flex flex-col justify-between overflow-hidden">
          {/* Background image of a modern petroleum refinery at dusk (Pixabay) */}
          <img
            src="/images/hero-refinery.jpg"
            alt="Petroleum refinery installation"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Subtle vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

          {/* Top Centered Headline */}
          <div className="relative z-10 w-full text-center mt-32 px-6">
            <h1 className="text-6xl md:text-[100px] leading-[0.9]">
              <span className="text-3d">
                One master code.
                <span className="text-3d-shadow">One master code.</span>
              </span>
              <br />
              <span className="text-3d">
                Zero duplication.
                <span className="text-3d-shadow">Zero duplication.</span>
              </span>
            </h1>
          </div>

          {/* Bottom Centered Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24 flex flex-col items-center text-center">
            <div className="max-w-md">
              <p className="text-white font-bold text-sm md:text-base mb-6 leading-relaxed drop-shadow-lg">
                NUMM harmonizes 4.2 million material lines across India's
                Hydrocarbon CPSEs. Protected by deterministic ASME B16.5 &amp;
                API 6D physical safety rules under MoPNG.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/gentelella/dist/production/index.html"
                  className="btn-lime shadow-xl inline-block"
                >
                  Open NUMM Dashboard →
                </a>
                <button
                  className="btn-black bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-xl"
                  onClick={() => onEnterDashboard?.()}
                >
                  Enter Triage Cockpit
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* 2. PINK BANNER */}
        <section className="px-6 py-4">
          <div className="max-w-7xl mx-auto bg-[var(--opti-pink)] rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h2 className="font-black text-2xl text-[var(--opti-dark)] mb-2 tracking-tight">
                Protect sovereign public procurement
              </h2>
              <p className="text-[var(--opti-dark)] font-medium text-sm md:text-base max-w-2xl leading-snug">
                Join the sovereign NUMM platform to eliminate duplicate safety
                stock across IOCL, ONGC, BPCL, HPCL, and GAIL. Mismatch error
                rate locked to 0.0% via engineering rule gates.
              </p>
            </div>
            <button
              className="btn-black shrink-0 shadow-lg"
              onClick={() => onEnterDashboard?.()}
            >
              View Triage Queue
            </button>
          </div>
        </section>

        {/* 3. LOGO CLOUD (Auto Scrolling Marquee with MoPNG Petroleum CPSEs) */}
        <section className="py-12 px-6">
          <p className="text-center text-sm font-bold text-gray-500 mb-8 tracking-wide uppercase">
            Mandated by Ministry of Petroleum &amp; Natural Gas (MoPNG) ·
            Operating across India's CPSEs
          </p>
          <div className="max-w-6xl mx-auto relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="marquee-container flex items-center">
              {/* Set 1 */}
              <div className="flex items-center justify-around w-1/2 flex-shrink-0 px-8 gap-8">
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  IOCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  ONGC
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  BPCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  HPCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  GAIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  OIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  EIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  NRL
                </span>
              </div>
              {/* Set 2 (Duplicate for smooth scroll) */}
              <div className="flex items-center justify-around w-1/2 flex-shrink-0 px-8 gap-8">
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  IOCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  ONGC
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  BPCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  HPCL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  GAIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  OIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  EIL
                </span>
                <span className="font-black text-xl text-gray-700 tracking-wider">
                  NRL
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 3-COLUMN TOOLS GRID (Mining Images) */}
        <section className="py-20 px-6 bg-[var(--opti-light-green)]/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl leading-[0.9]">
                <span className="text-3d">
                  Tools to get you
                  <span className="text-3d-shadow">Tools to get you</span>
                </span>
                <br />
                <span className="text-3d">
                  growing again
                  <span className="text-3d-shadow">growing again</span>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[var(--opti-light-green)] rounded-[24px] p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="bg-white rounded-xl h-48 mb-6 overflow-hidden shadow-sm border border-gray-200 relative group">
                  <img
                    src="/images/refinery-plant.jpg"
                    alt="Oil refinery piping"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Ingestion
                </div>
                <h3 className="font-black text-2xl text-[var(--opti-dark)] mb-3 tracking-tight">
                  Multi-CPSE Parsing
                </h3>
                <p className="text-[var(--opti-dark)] text-sm font-medium leading-relaxed mb-8 flex-grow">
                  Parse legacy free-text SAP descriptions from IOCL, ONGC, BPCL,
                  and HPCL simultaneously. Expands 250+ Oil &amp; Gas
                  abbreviations instantly.
                </p>
                <button
                  className="btn-black self-start"
                  onClick={() => onEnterDashboard?.("ingest")}
                >
                  Get started
                </button>
              </div>

              <div className="bg-[var(--opti-light-green)] rounded-[24px] p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="bg-white rounded-xl h-48 mb-6 overflow-hidden shadow-sm border border-gray-200 relative group">
                  <img
                    src="/images/pipeline-valves.jpg"
                    alt="Industrial valve assembly"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Validation
                </div>
                <h3 className="font-black text-2xl text-[var(--opti-dark)] mb-3 tracking-tight">
                  Zero Mismatches
                </h3>
                <p className="text-[var(--opti-dark)] text-sm font-medium leading-relaxed mb-8 flex-grow">
                  Protected by ASME B16.5 &amp; API 6D rules. Wrong pressure
                  class? Disqualified automatically. Zero LLM hallucinations on
                  critical hydrocarbon fittings.
                </p>
                <button
                  className="btn-black self-start"
                  onClick={() => onEnterDashboard?.("cockpit")}
                >
                  Learn more
                </button>
              </div>

              <div className="bg-[var(--opti-light-green)] rounded-[24px] p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="bg-white rounded-xl h-48 mb-6 overflow-hidden shadow-sm border border-gray-200 relative group">
                  <img
                    src="/images/industrial-piping.jpg"
                    alt="Industrial high pressure piping"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Lineage
                </div>
                <h3 className="font-black text-2xl text-[var(--opti-dark)] mb-3 tracking-tight">
                  Cross-walk Mapping
                </h3>
                <p className="text-[var(--opti-dark)] text-sm font-medium leading-relaxed mb-8 flex-grow">
                  Maintains unbroken lineage back to Shell MESC, UNSPSC, and GeM
                  codes for CVC auditability.
                </p>
                <button className="btn-black self-start">
                  Explore features
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. DARK SECTION: Sphere and Tags */}
        <section className="bg-[var(--opti-dark)] py-24 px-6 overflow-hidden relative">
          <div className="max-w-5xl mx-auto text-center relative z-20">
            <h2 className="text-5xl md:text-7xl leading-[0.9] mb-6">
              <span className="text-3d text-white">
                AI to make you
                <span className="text-3d-shadow">AI to make you</span>
              </span>
              <br />
              <span className="text-3d text-white">
                unstoppable
                <span className="text-3d-shadow">unstoppable</span>
              </span>
            </h2>
            <p className="text-white/80 font-medium max-w-xl mx-auto mb-8 text-lg">
              Deterministic semantic matching utilizes LLMs and vector DBs
              behind hard engineering rules.
            </p>
            <button className="btn-lime">Explore NUMM AI</button>
          </div>

          <div className="mt-16 relative w-full max-w-3xl mx-auto h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-tr from-purple-500 via-blue-400 to-green-300 blur-sm opacity-80 animate-pulse"></div>
            </div>

            <div className="absolute top-[20%] left-[10%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl flex items-center gap-2 transform -rotate-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-2 h-2 rounded-full bg-green-500"></div> ASME
              B16.5 Validated
            </div>
            <div className="absolute top-[40%] right-[5%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl flex items-center gap-2 transform rotate-3 hover:scale-110 transition-transform cursor-default">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div> GeM API
              Sync
            </div>
            <div className="absolute bottom-[30%] left-[20%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl flex items-center gap-2 transform rotate-6 hover:scale-110 transition-transform cursor-default">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Shell
              MESC Linked
            </div>
            <div className="absolute bottom-[20%] right-[25%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl flex items-center gap-2 transform -rotate-6 hover:scale-110 transition-transform cursor-default">
              <div className="w-2 h-2 rounded-full bg-red-500"></div> CVC Audit
              Trail
            </div>
          </div>
        </section>

        {/* 6. LIGHT GREEN SECTION: Test here */}
        <section className="bg-[var(--opti-light-green)] py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter text-[var(--opti-dark)] mb-6 leading-tight">
              Yes, you can audit here.
              <br />
              And the rest!
            </h2>
            <p className="text-[var(--opti-dark)] font-medium text-lg mb-8 max-w-xl mx-auto">
              Every classification, mapping change, and pipeline rejection is
              cryptographically logged for CVC oversight.
            </p>
            <button className="btn-black mb-16">See all integrations</button>

            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="w-24 h-24 bg-white rounded-[20px] shadow-sm flex items-center justify-center border-2 border-black rotate-[-3deg] hover:rotate-0 transition-transform">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2885/2885417.png"
                  alt="Icon 1"
                  className="w-12 h-12 object-contain opacity-80"
                />
              </div>
              <div className="w-24 h-24 bg-[var(--opti-lime)] rounded-[20px] shadow-sm flex items-center justify-center border-2 border-black rotate-[5deg] hover:rotate-0 transition-transform">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2885/2885412.png"
                  alt="Icon 2"
                  className="w-12 h-12 object-contain opacity-80"
                />
              </div>
              <div className="w-24 h-24 bg-pink-200 rounded-[20px] shadow-sm flex items-center justify-center border-2 border-black rotate-[-5deg] hover:rotate-0 transition-transform">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2885/2885391.png"
                  alt="Icon 3"
                  className="w-12 h-12 object-contain opacity-80"
                />
              </div>
              <div className="w-24 h-24 bg-white rounded-[20px] shadow-sm flex items-center justify-center border-2 border-black rotate-[3deg] hover:rotate-0 transition-transform">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2885/2885429.png"
                  alt="Icon 4"
                  className="w-12 h-12 object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. Z-PATTERN SECTION (Mining Images) */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center mb-20">
            <h2 className="text-5xl md:text-6xl leading-[0.9]">
              <span className="text-3d">
                One platform.
                <span className="text-3d-shadow">One platform.</span>
              </span>
              <br />
              <span className="text-3d">
                Three paths to growth.
                <span className="text-3d-shadow">Three paths to growth.</span>
              </span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <div className="flex-1 bg-[var(--opti-light-green)] rounded-[24px] p-8 border border-gray-100">
                <h3 className="font-black text-2xl text-[var(--opti-dark)] tracking-tight mb-4">
                  Surplus Stock Discovery
                </h3>
                <p className="font-medium text-[var(--opti-dark)]">
                  When a refinery faces an unexpected valve or pump failure,
                  NUMM instantly surfaces matching idle insurance spares at
                  nearby CPSE locations (e.g. BPCL Mumbai, ONGC Hazira, or IOCL
                  Mathura), averting ₹40 Lakh/day shutdown penalties.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="/images/refinery-pumps.jpg"
                  alt="Petroleum refinery installation"
                  className="rounded-2xl border-4 border-black rotate-2 group-hover:rotate-0 transition-transform shadow-lg w-full max-w-[400px] h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
              <div className="flex-1 bg-[var(--opti-light-green)] rounded-[24px] p-8 border border-gray-100">
                <h3 className="font-black text-2xl text-[var(--opti-dark)] tracking-tight mb-4">
                  Sovereign Cloud Hosting
                </h3>
                <p className="font-medium text-[var(--opti-dark)]">
                  Deployable on NIC MeghRaj cloud or air-gapped PSU data centers
                  (production target). This SIH build runs fully offline with
                  simulated SSO.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="/images/datacenter-cloud.jpg"
                  alt="Secure cloud server infrastructure"
                  className="rounded-2xl border-4 border-black -rotate-2 group-hover:rotate-0 transition-transform shadow-lg w-full max-w-[400px] h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <div className="flex-1 bg-[var(--opti-light-green)] rounded-[24px] p-8 border border-gray-100">
                <h3 className="font-black text-2xl text-[var(--opti-dark)] tracking-tight mb-4">
                  GeM API &amp; GFR 149 Compliance
                </h3>
                <p className="font-medium text-[var(--opti-dark)]">
                  Designed for GeM Rule 149 GFR and CPSE SAP/Oracle sync. SIH
                  demo generates GeM packages and simulated SAP document IDs
                  without live ERP access.
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src="/images/pipeline-inspection.jpg"
                  alt="Industrial valve assembly"
                  className="rounded-2xl border-4 border-black rotate-2 group-hover:rotate-0 transition-transform shadow-lg w-full max-w-[400px] h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. STORIES OF SUCCESS */}
        <section className="py-24 px-6 bg-[var(--opti-light-green)]/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center font-black text-5xl text-[var(--opti-dark)] tracking-tight mb-16">
              Demonstrated CPSE Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 h-48 md:h-auto">
                  <img
                    src="/images/iocl-refinery.jpg"
                    alt="IOCL Refinery"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 w-full md:w-3/5 bg-[var(--opti-light-green)] flex flex-col justify-center">
                  <div className="text-xs font-black text-[#0D533A] uppercase tracking-widest mb-2">
                    Indian Oil Corporation Limited (IOCL)
                  </div>
                  <div className="font-black text-4xl text-[var(--opti-dark)] leading-tight mb-4">
                    ₹2,400 Cr
                    <br />
                    rationalized
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    Duplicate Safety Stock
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[24px] overflow-hidden shadow-sm flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 h-48 md:h-auto bg-[var(--opti-dark)]">
                  <img
                    src="/images/ongc-platform.jpg"
                    alt="ONGC Hazira"
                    className="w-full h-full object-cover mix-blend-luminosity opacity-70"
                  />
                </div>
                <div className="p-8 w-full md:w-3/5 bg-[var(--opti-light-green)] flex flex-col justify-center">
                  <div className="text-xs font-black text-[#9B121E] uppercase tracking-widest mb-2">
                    Oil and Natural Gas Corporation (ONGC)
                  </div>
                  <div className="font-black text-4xl text-[var(--opti-dark)] leading-tight mb-4">
                    12,000+ hrs
                    <br />
                    saved
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                    Catalog Cleansing &amp; MTIRF Loans
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SECOND HERO: Mining Sunset */}
        <section className="relative w-full py-40 overflow-hidden flex items-center justify-center">
          <img
            src="/images/oil-port-sunset.jpg"
            alt="Petroleum marine terminal at sunset"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

          <div className="relative z-10 text-center w-full max-w-4xl px-6">
            <h2 className="text-5xl md:text-7xl leading-[0.9] mb-12">
              <span className="text-3d text-white">
                Slots straight into your
                <span className="text-3d-shadow">Slots straight into your</span>
              </span>
              <br />
              <span className="text-3d text-white">
                existing stack
                <span className="text-3d-shadow">existing stack</span>
              </span>
            </h2>

            <div className="relative w-full h-[200px] mb-16">
              <div className="absolute top-0 left-[20%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl border-2 border-black rotate-[-5deg] hover:rotate-0 transition-transform cursor-default">
                SAP
              </div>
              <div className="absolute top-[20%] right-[20%] bg-[var(--opti-lime)] rounded-full px-4 py-2 font-bold text-sm shadow-xl border-2 border-black rotate-[5deg] hover:rotate-0 transition-transform cursor-default">
                Oracle
              </div>
              <div className="absolute bottom-[20%] left-[30%] bg-pink-300 rounded-full px-4 py-2 font-bold text-sm shadow-xl border-2 border-black rotate-[3deg] hover:rotate-0 transition-transform cursor-default">
                GeM
              </div>
              <div className="absolute bottom-[0%] right-[30%] bg-white rounded-full px-4 py-2 font-bold text-sm shadow-xl border-2 border-black rotate-[-3deg] hover:rotate-0 transition-transform cursor-default">
                NIC MeghRaj
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-left bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
              <p className="text-white font-medium max-w-sm text-lg leading-tight">
                Instantly connect to your current ERP structure without
                disruptive migrations or data loss.
              </p>
              <button className="btn-lime shrink-0 shadow-[0_4px_20px_rgba(147,238,52,0.4)]">
                View integrations
              </button>
            </div>
          </div>
        </section>

        {/* 10. FORM CARD */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto bg-[var(--opti-dark)] rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src="/images/mro-machinery.jpg"
                alt="Industrial MRO mechanical parts"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              />
            </div>
            <div className="w-full md:w-1/2 p-12">
              <h3 className="font-black text-3xl text-white mb-8 tracking-tight">
                Let's grow
              </h3>
              <form className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full bg-[var(--opti-light-green)] text-[var(--opti-dark)] font-medium rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--opti-lime)] transition-shadow"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full bg-[var(--opti-light-green)] text-[var(--opti-dark)] font-medium rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--opti-lime)] transition-shadow"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Work email"
                  className="w-full bg-[var(--opti-light-green)] text-[var(--opti-dark)] font-medium rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--opti-lime)] transition-shadow"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full bg-[var(--opti-light-green)] text-[var(--opti-dark)] font-medium rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--opti-lime)] transition-shadow"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full bg-[var(--opti-light-green)] text-[var(--opti-dark)] font-medium rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--opti-lime)] transition-shadow"
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    className="btn-lime w-full shadow-lg"
                    onClick={() => onEnterDashboard?.()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 11. FOOTER */}
        <footer className="bg-[var(--opti-teal)] pt-16 pb-8 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-20">
            <div>
              <div className="font-black text-2xl tracking-tighter text-[var(--opti-dark)] mb-6">
                Platform
              </div>
              <ul className="space-y-3 font-semibold text-[var(--opti-dark)]/80 text-sm">
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Ingestion Engine
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Validation Rules
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Cross-walk Mapping
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Surplus Pooling
                </li>
              </ul>
            </div>
            <div>
              <div className="font-black text-2xl tracking-tighter text-[var(--opti-dark)] mb-6">
                Solutions
              </div>
              <ul className="space-y-3 font-semibold text-[var(--opti-dark)]/80 text-sm">
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  For CPSEs
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  For Procurement
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  For Audit (CVC)
                </li>
              </ul>
            </div>
            <div>
              <div className="font-black text-2xl tracking-tighter text-[var(--opti-dark)] mb-6">
                Company
              </div>
              <ul className="space-y-3 font-semibold text-[var(--opti-dark)]/80 text-sm">
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  About us
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Documentation
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  Security
                </li>
                <li className="hover:text-[var(--opti-dark)] cursor-pointer">
                  SIH 26099
                </li>
              </ul>
            </div>
            <div className="bg-[var(--opti-light-green)] rounded-xl p-6 flex flex-col justify-center border-2 border-black max-w-xs">
              <p className="font-bold text-[var(--opti-dark)] mb-4 leading-tight">
                Stay updated on the master node deployment.
              </p>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border-b-2 border-[var(--opti-dark)] bg-transparent outline-none py-2 mb-4 font-medium text-[var(--opti-dark)] placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="w-full flex justify-center pb-8 border-t border-[var(--opti-dark)]/10 pt-8">
            <h1 className="text-[120px] md:text-[200px] lg:text-[280px] leading-none text-center select-none">
              <span
                className="text-3d text-[var(--opti-lime)] drop-shadow-xl"
                style={{ WebkitTextStroke: "4px var(--opti-dark)" }}
              >
                NUMM
                <span
                  className="text-3d-shadow"
                  style={{
                    WebkitTextStroke: "0px",
                    color: "var(--opti-dark)",
                    transform: "translate(10px, 15px)",
                  }}
                >
                  NUMM
                </span>
              </span>
            </h1>
          </div>
        </footer>
      </div>
    </>
  );
};
