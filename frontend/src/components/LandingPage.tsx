import React, { useState } from "react";



const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: "#faf8f5",
    color: "#141414",
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
  },
  sectionWhite: {
    backgroundColor: "#ffffff",
  },
  sectionCream: {
    backgroundColor: "#faf8f5",
  },
  cropMarks: {
    position: "relative",
    
    
  },
  cropMarksOrange: {
    position: "relative",
    
    
  },
  announcementBar: {
    backgroundColor: "#141414",
    color: "#fff",
    textAlign: "center",
    padding: "8px 16px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
  },
  announcementLink: {
    color: "#fff",
    textDecoration: "underline",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    position: "sticky",
    top: 0,
    backgroundColor: "rgba(250, 248, 245, 0.9)",
    backdropFilter: "blur(8px)",
    zIndex: 100,
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    fontSize: "15px",
    fontWeight: 500,
  },
  navActions: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  hero: {
    padding: "120px 40px",
    textAlign: "center",
    maxWidth: "960px",
    margin: "0 auto",
    position: "relative",
  },
  heroTitle: {
    fontSize: "96px",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    fontWeight: 600,
    marginBottom: "24px",
  },
  serifContrast: {
    fontFamily: "'Georgia', serif",
    fontWeight: 400,
    fontStyle: "italic",
    color: "#593C32",
  },
  heroSubtitle: {
    fontSize: "20px",
    lineHeight: 1.6,
    color: "#4B5563",
    maxWidth: "600px",
    margin: "0 auto 40px",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "16px",
  },
  btnSolid: {
    backgroundColor: "#141414",
    color: "#fff",
    borderRadius: "999px",
    padding: "16px 32px",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#141414",
    borderRadius: "999px",
    padding: "16px 32px",
    fontWeight: 500,
    border: "1px solid #141414",
    cursor: "pointer",
  },
  reassurance: {
    fontSize: "13px",
    color: "#9CA3AF",
  },
  floatingWidget: {
    position: "absolute",
    bottom: "-40px",
    right: "-80px",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 24px 48px rgba(0,0,0,0.08)",
    width: "320px",
    textAlign: "left",
    border: "1px solid #E5E7EB",
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "40px",
  },
  tab: {
    padding: "12px 24px",
    borderRadius: "999px",
    border: "1px solid #E5E7EB",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: 500,
  },
  tabActive: {
    backgroundColor: "#f0f0f0",
  },
  productPanel: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)",
  },
  panelImage: {
    width: "100%",
    borderRadius: "12px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
  },
  logoCloud: {
    padding: "80px 40px",
    textAlign: "center",
  },
  eyebrow: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "32px",
  },
  markerBlue: {
    width: "8px",
    height: "8px",
    backgroundColor: "#5F978E",
  },
  markerOrange: {
    width: "8px",
    height: "8px",
    backgroundColor: "#E94344",
  },
  logosGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "48px",
    opacity: 0.6,
  },
  featureSection: {
    padding: "120px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "64px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureHeader: {
    maxWidth: "600px",
    position: "relative",
  },
  featureHeadline: {
    fontSize: "64px",
    lineHeight: 1.1,
    fontWeight: 600,
    marginBottom: "24px",
  },
  featureBody: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#4B5563",
    marginBottom: "32px",
  },
  inkIllustration: {
    position: "absolute",
    right: "-200px",
    top: 0,
    opacity: 0.8,
    width: "150px",
  },
  threeColGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "32px",
  },
  gridCardTitle: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "12px",
  },
  gridCardBody: {
    fontSize: "16px",
    color: "#4B5563",
    marginBottom: "16px",
  },
  linkStyle: {
    color: "#141414",
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
  },
  testimonial: {
    padding: "120px 40px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  testimonialPanel: {
    border: "1px solid #E5E7EB",
    borderRadius: "24px",
    padding: "64px",
    backgroundColor: "#fff",
    display: "flex",
    gap: "40px",
  },
  testimonialQuote: {
    fontSize: "32px",
    lineHeight: 1.4,
    fontWeight: 500,
    flex: 1,
  },
  highlight: {
    color: "#E94344",
    borderBottom: "2px solid #E94344",
  },
  testimonialAuthor: {
    marginTop: "32px",
    fontSize: "16px",
    fontWeight: 600,
  },
  integrations: {
    padding: "120px 40px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  integrationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  integrationCard: {
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#fff",
  },
  pricing: {
    padding: "120px 40px",
    textAlign: "center",
  },
  pricingCard: {
    maxWidth: "600px",
    margin: "40px auto 0",
    backgroundColor: "#faf8f5",
    border: "1px solid #E5E7EB",
    borderRadius: "24px",
    padding: "64px",
    position: "relative",
    overflow: "hidden",
  },
  priceValue: {
    fontSize: "80px",
    fontWeight: 600,
    letterSpacing: "-0.04em",
    margin: "24px 0",
  },
  halftonePattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(#CBD5E1 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    opacity: 0.3,
    pointerEvents: "none",
  },
  closing: {
    padding: "160px 40px",
    textAlign: "center",
    position: "relative",
  },
  closingTitle: {
    fontSize: "88px",
    lineHeight: 1,
    fontWeight: 600,
    maxWidth: "1000px",
    margin: "0 auto 40px",
  },
  footer: {
    padding: "80px 40px 40px",
    backgroundColor: "#fff",
    borderTop: "1px solid #E5E7EB",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto 80px",
  },
  footerColHeader: {
    fontSize: "12px",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "#9CA3AF",
    marginBottom: "24px",
  },
  footerLink: {
    display: "block",
    color: "#4B5563",
    marginBottom: "12px",
    fontSize: "14px",
    textDecoration: "none",
  },
  footerLegal: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #E5E7EB",
    paddingTop: "24px",
    fontSize: "14px",
    color: "#9CA3AF",
    maxWidth: "1200px",
    margin: "0 auto",
  }
};

interface LandingPageProps { onStartDemo?: () => void; onEnterDashboard: (targetTab?: string, targetRole?: string) => void; }


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


const KoboyoButterfly = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    <path d="M50 50 C 20 20, 10 40, 50 80 C 90 40, 80 20, 50 50 Z" />
    <path d="M50 50 C 30 10, 10 30, 40 60" />
    <path d="M50 50 C 70 10, 90 30, 60 60" />
    <line x1="48" y1="50" x2="45" y2="25" />
    <line x1="52" y1="50" x2="55" y2="25" />
  </svg>
);

const KoboyoKite = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    <polygon points="50,10 80,40 50,90 20,40" />
    <line x1="50" y1="10" x2="50" y2="90" />
    <line x1="20" y1="40" x2="80" y2="40" />
    <path d="M50,90 Q 60,110 50,130" strokeDasharray="4 4" />
  </svg>
);

const KoboyoSparkle = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    <path d="M50 10 Q 50 50 90 50 Q 50 50 50 90 Q 50 50 10 50 Q 50 50 50 10 Z" />
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard, onStartDemo }) => {
  const [activeTab, setActiveTab] = useState("harmonization");
  const [activeTestimonial, setActiveTestimonial] = useState("ioc");

  return (
    <div style={styles.page}>
      {/* 1. Announcement bar */}
      <div style={styles.announcementBar}>
        <span>Version 2.2.0 (Enterprise Production) now deployed to MeghRaj Cloud.</span>
        <a href="#" style={styles.announcementLink}>Read release notes &rarr;</a>
        <span style={{ cursor: 'pointer', marginLeft: 'auto' }}>✕</span>
      </div>

      {/* 2. Navbar */}
      <nav style={styles.navbar}>
        <div style={{ fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em" }}>NUMM</div>
        <div style={styles.navLinks}>
          <span>Product</span>
          <span>Customers</span>
          <span>Resources</span>
          <span>Compliance</span>
        </div>
        <div style={styles.navActions}>
          <span style={{ fontWeight: 500, cursor: "pointer" }}>Log in</span>
          <span style={{ fontWeight: 500, cursor: "pointer" }}>Contact DGH</span>
          <button style={{...styles.btnSolid,  padding: "10px 20px" }} onClick={() => onEnterDashboard()}>View demo</button>
        </div>
      </nav>

      {/* 3. Hero */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          One Nation, <br />
          <span style={styles.serifContrast}>One Material Code</span>
        </h1>
        <p style={styles.heroSubtitle}>
          The AI-powered enterprise data harmonization and collaborative procurement platform. 
          Unifying legacy catalogs across India's public sector supply chain.
        </p>
        <div style={styles.buttonGroup}>
          <button style={styles.btnSolid} onClick={() => onStartDemo ? onStartDemo() : onEnterDashboard()}>Start Demo</button>
          <button style={styles.btnOutline}>Read the PRD</button>
        </div>
        <div style={styles.reassurance}>Sovereign infrastructure, CVC-compliant.</div>
        
        {/* Floating Triage Widget */}
        <div style={styles.floatingWidget}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#5F978E' }} />
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Match Confidence: 96%</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#4B5563' }}>
            ONMC-MECH-VLV-BAL-002-150-A105<br/>
            = IOCL: 2" CL150 FLG RF BALL<br/>
            = ONGC: VLV BL FLGD 50MM 150#
          </div>
        </div>
      </section>

      {/* 4. Two-product tabs */}
      <section style={{ padding: "0 40px 120px" }}>
        <div style={styles.tabsContainer}>
          <button 
            style={{...styles.tab, ...(activeTab === "harmonization" ? styles.tabActive : {})}}
            onClick={() => setActiveTab("harmonization")}
          >
            Catalog Data Harmonization
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === "surplus" ? styles.tabActive : {})}}
            onClick={() => setActiveTab("surplus")}
          >
            Inter-CPSE Procurement
          </button>
        </div>
        <div style={styles.productPanel}>
          {/* Placeholder for dense product UI screenshot */}
          <div style={{ width: "100%", height: "600px", backgroundColor: "#e5e7eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#5F978E", padding: "40px" }}><KoboyoDashboard /></div>
        </div>
      </section>

      {/* 5. Logo cloud */}
      <section style={{...styles.sectionWhite, ...styles.logoCloud}}>
        <div style={styles.eyebrow}>
          Trusted by India's leading CPSEs
        </div>
        <div style={styles.logosGrid}>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>IOCL</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>ONGC</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>BPCL</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>HPCL</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>GAIL</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>OIL</span>
          <span style={{ fontSize: '24px', fontWeight: 600 }}>EIL</span>
        </div>
      </section>

      {/* 6. Feature section A */}
      <section style={{...styles.sectionCream, ...styles.featureSection, ...styles.cropMarks}}>
        <div style={styles.featureHeader}>
          <div style={{...styles.eyebrow,  justifyContent: 'flex-start' }}>
            <div style={styles.markerBlue} /> AI Harmonization
          </div>
          <h2 style={styles.featureHeadline}>
            Standardize catalogs with <span style={styles.serifContrast}>engineering</span> precision.
          </h2>
          <p style={styles.featureBody}>
            Pair dense semantic vector embeddings with deterministic rule gating to map fragmented ERP entries into a single sovereign taxonomy. Zero false positives on pressure ratings.
          </p>
          <div style={{...styles.buttonGroup,  justifyContent: 'flex-start' }}>
            <button style={styles.btnSolid}>Explore taxonomy</button>
            <button style={styles.btnOutline}>Read whitepaper</button>
          </div>
          <div style={styles.inkIllustration}>
            <KoboyoButterfly />
          </div>
        </div>
        <div style={{ height: "400px", backgroundColor: "#e5e7eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#593C32", padding: "40px" }}><KoboyoHarmonization /></div>
        <div style={styles.threeColGrid}>
          <div>
            <h3 style={styles.gridCardTitle}>Sub-50ms Discovery</h3>
            <p style={styles.gridCardBody}>HNSW cosine distance search on pgvector ensures lightning-fast queries across millions of legacy items.</p>
            <span style={styles.linkStyle}>Learn more &rarr;</span>
          </div>
          <div>
            <h3 style={styles.gridCardTitle}>HITL Triage Interface</h3>
            <p style={styles.gridCardBody}>Keyboard-driven split-layout cockpit lets stewards review over 1,000 matches per hour with ease.</p>
            <span style={styles.linkStyle}>Learn more &rarr;</span>
          </div>
          <div>
            <h3 style={styles.gridCardTitle}>Automated Extraction</h3>
            <p style={styles.gridCardBody}>Expand 250+ Oil & Gas abbreviations and normalize dimensions dynamically during ingestion.</p>
            <span style={styles.linkStyle}>Learn more &rarr;</span>
          </div>
        </div>
      </section>

      {/* 7. Feature section B */}
      <section style={{...styles.sectionWhite, ...styles.featureSection, ...styles.cropMarksOrange}}>
        <div style={styles.featureHeader}>
          <div style={{...styles.eyebrow,  justifyContent: 'flex-start' }}>
            <div style={styles.markerOrange} /> Inter-CPSE Transfer
          </div>
          <h2 style={styles.featureHeadline}>
            Unlock hidden surplus <span style={styles.serifContrast}>inventory</span> instantly.
          </h2>
          <p style={styles.featureBody}>
            Locate idle emergency spares at neighboring refineries and initiate CVC-compliant transfers to prevent critical plant downtime.
          </p>
          <div style={styles.inkIllustration}>
            <KoboyoKite />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ flex: 2, height: "400px", backgroundColor: "#faf8f5", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#E94344", border: "1px solid #E5E7EB", padding: "40px" }}><KoboyoTransfer /></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 600 }}>Zero-Downtime Routing</h4>
              <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '8px' }}>Calculate transit times between asset bases to slash lead times from weeks to hours.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 600 }}>Automated Legal Forms</h4>
              <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '8px' }}>Generate standardized MoPNG transfer agreements seamlessly.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid #E5E7EB', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 600 }}>Real-time SAP Sync</h4>
              <p style={{ fontSize: '14px', color: '#4B5563', marginTop: '8px' }}>Direct RFC integration keeps inventory states perfectly aligned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Better together */}
      <section style={{...styles.sectionCream, ...styles.featureSection}}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={styles.eyebrow}>
            <div style={styles.markerBlue} />
            <div style={styles.markerOrange} />
            Pooled Procurement
          </div>
          <h2 style={styles.featureHeadline}>
            Aggregate demand for <span style={styles.serifContrast}>maximum</span> leverage.
          </h2>
          <p style={styles.featureBody}>
            Cluster scheduled commodity requirements across enterprises to unlock volume discounts on joint MoPNG tenders.
          </p>
          <div style={styles.buttonGroup}>
            <button style={styles.btnSolid}>View cost savings</button>
          </div>
        </div>
        <div style={styles.threeColGrid}>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
            <div style={{ height: "160px", backgroundColor: "#f0f0f0", borderRadius: "8px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#5F978E" }}><KoboyoOverlap /></div>
            <h3 style={styles.gridCardTitle}>Identify Overlap</h3>
            <p style={styles.gridCardBody}>Scan annual procurement plans to pinpoint overlapping commodity needs.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
            <div style={{ height: "160px", backgroundColor: "#f0f0f0", borderRadius: "8px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#F1CC9D" }}><KoboyoBatch /></div>
            <h3 style={styles.gridCardTitle}>Batch Tenders</h3>
            <p style={styles.gridCardBody}>Combine requirements into unified GeM-compliant public tenders.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
            <div style={{ height: "160px", backgroundColor: "#f0f0f0", borderRadius: "8px", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "#A5D7C9" }}><KoboyoSavings /></div>
            <h3 style={styles.gridCardTitle}>Realize Savings</h3>
            <p style={styles.gridCardBody}>Drive 8-16% reductions on high-volume valves, piping, and steel.</p>
          </div>
        </div>
      </section>

      {/* 9. Testimonial */}
      <section style={{...styles.sectionWhite, ...styles.testimonial}}>
        <div style={styles.tabsContainer}>
          <button style={{...styles.tab, ...(activeTestimonial === "ioc" ? styles.tabActive : {})}} onClick={() => setActiveTestimonial("ioc")}>Mathura Refinery</button>
          <button style={{...styles.tab, ...(activeTestimonial === "ongc" ? styles.tabActive : {})}} onClick={() => setActiveTestimonial("ongc")}>Hazira Plant</button>
          <button style={{...styles.tab, ...(activeTestimonial === "bpcl" ? styles.tabActive : {})}} onClick={() => setActiveTestimonial("bpcl")}>Mumbai Refinery</button>
        </div>
        <div style={styles.testimonialPanel}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '32px' }}>IOCL</div>
            <p style={styles.testimonialQuote}>
              "NUMM allowed us to <span style={styles.highlight}>reduce duplicate safety stock by 22%</span> in the first year, freeing up critical working capital while maintaining strict compliance with OISD standards."
            </p>
            <div style={styles.testimonialAuthor}>
              Rameshwar Sharma<br/>
              <span style={{ fontWeight: 400, color: '#4B5563', fontSize: '14px' }}>Chief Manager (Materials), IOCL Mathura</span>
            </div>
          </div>
          <div style={{ width: "240px", height: "320px", backgroundColor: "#e5e7eb", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#4B5563", padding: "40px" }}><KoboyoPortrait /></div>
        </div>
      </section>

      {/* 10. Integrations */}
      <section style={{...styles.sectionCream, ...styles.integrations}}>
        <div>
          <h2 style={styles.featureHeadline}>Works with the systems you already use</h2>
          <p style={styles.featureBody}>Bi-directional cross-walk mapping hooks directly into standard ERP architectures and national e-procurement hubs.</p>
          <div style={{...styles.buttonGroup,  justifyContent: 'flex-start' }}>
            <button style={styles.btnOutline}>View documentation</button>
          </div>
        </div>
        <div style={styles.integrationGrid}>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#141414' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>SAP ECC 6.0</span>
          </div>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#141414' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>SAP S/4HANA</span>
          </div>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#141414' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>Oracle EBS</span>
          </div>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#5F978E' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>GeM</span>
          </div>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#E94344' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>Shell MESC</span>
          </div>
          <div style={styles.integrationCard}>
            <div style={{ width: '40px', height: '40px', color: '#F1CC9D' }}><KoboyoSparkle /></div>
            <span style={{ fontWeight: 500, fontSize: '14px' }}>UNSPSC</span>
          </div>
        </div>
      </section>

      {/* 11. Pricing -> Transparent Deployment */}
      <section style={{...styles.sectionWhite, ...styles.pricing}}>
        <h2 style={styles.featureHeadline}>Transparent deployment</h2>
        <p style={styles.featureBody}>Standardized infrastructure limits across MeghRaj National Cloud.</p>
        
        <div style={styles.pricingCard}>
          <div style={styles.halftonePattern} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontSize: '24px', fontWeight: 600 }}>Enterprise Node</h3>
            <p style={{ color: '#4B5563', marginTop: '8px' }}>Dedicated air-gapped instance per CPSE.</p>
            <div style={styles.priceValue}>
              Air-Gapped <span style={{ color: '#9CA3AF' }}>+</span> RFC
            </div>
            <div style={styles.buttonGroup}>
              <button style={{...styles.btnSolid,  width: '100%' }}>Initialize tenant</button>
            </div>
            <button style={{...styles.btnOutline,  width: '100%', marginTop: '16px' }}>View security specs</button>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '24px' }}>Deployments subject to MoPNG DGH clearance.</p>
      </section>

      {/* 12. Closing CTA */}
      <section style={{...styles.sectionCream, ...styles.closing}}>
        <h2 style={styles.closingTitle}>
          Flawless supply chain <span style={styles.serifContrast}>synchronization</span>.
        </h2>
        <div style={styles.buttonGroup}>
          <button style={styles.btnSolid} onClick={() => onStartDemo ? onStartDemo() : onEnterDashboard()}>Start Demo</button>
          <button style={styles.btnOutline}>Contact sales</button>
        </div>
        
        {/* Decorative photo fragments */}
        <div style={{ position: 'absolute', top: '100px', left: '10%', width: '80px', height: '80px', backgroundColor: '#e5e7eb', borderRadius: '8px', transform: 'rotate(-10deg)' }} />
        <div style={{ position: 'absolute', bottom: '100px', right: '15%', width: '120px', height: '120px', backgroundColor: '#e5e7eb', borderRadius: '8px', transform: 'rotate(5deg)' }} />
      </section>

      {/* 13. Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <h5 style={styles.footerColHeader}>Product</h5>
            <a href="#" style={styles.footerLink}>Harmonization</a>
            <a href="#" style={styles.footerLink}>Surplus Transfer</a>
            <a href="#" style={styles.footerLink}>Procurement</a>
            <a href="#" style={styles.footerLink}>Taxonomy</a>
          </div>
          <div>
            <h5 style={styles.footerColHeader}>Learn</h5>
            <a href="#" style={styles.footerLink}>Documentation</a>
            <a href="#" style={styles.footerLink}>Architecture</a>
            <a href="#" style={styles.footerLink}>CVC Norms</a>
            <a href="#" style={styles.footerLink}>Blog</a>
          </div>
          <div>
            <h5 style={styles.footerColHeader}>Support</h5>
            <a href="#" style={styles.footerLink}>Help center</a>
            <a href="#" style={styles.footerLink}>System status</a>
            <a href="#" style={styles.footerLink}>Security</a>
          </div>
          <div>
            <h5 style={styles.footerColHeader}>Agencies</h5>
            <a href="#" style={styles.footerLink}>MoPNG</a>
            <a href="#" style={styles.footerLink}>DGH</a>
            <a href="#" style={styles.footerLink}>FIPI</a>
          </div>
          <div>
            <h5 style={styles.footerColHeader}>Solutions</h5>
            <a href="#" style={styles.footerLink}>For Refineries</a>
            <a href="#" style={styles.footerLink}>For Pipelines</a>
            <a href="#" style={styles.footerLink}>For E&P</a>
          </div>
        </div>
        <div style={styles.footerLegal}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span>&copy; 2026 National Unified Material Master</span>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '32px', height: '16px', backgroundColor: '#E5E7EB', borderRadius: '16px', position: 'relative' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }} />
            </div>
            Privacy choices
          </div>
        </div>
      </footer>
    </div>
  );
}






