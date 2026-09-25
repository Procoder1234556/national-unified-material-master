import React, { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Database,
  ShieldCheck,
  Layers,
  Hash,
  Shield,
  ArrowRightLeft,
  Lock,
} from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { Stack } from "@astryxdesign/core/Stack";
import { Card } from "@astryxdesign/core/Card";

const styles = stylex.create({
  pageWrapper: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#FFFFFF",
    color: "#4A4A4A",
    scrollBehavior: "smooth",
  },
  section: {
    width: "100%",
    paddingTop: "100px",
    paddingBottom: "100px",
    paddingLeft: "24px",
    paddingRight: "24px",
  },
  sectionSoft: {
    backgroundColor: "#F8F7F5",
  },
  sectionDark: {
    backgroundColor: "#141414",
    color: "#FFFFFF",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    width: "100%",
  },
  containerSmall: {
    maxWidth: "700px",
  },
  containerHero: {
    maxWidth: "780px",
    textAlign: "center",
    margin: "0 auto",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #E5E2DE",
    height: "72px",
    display: "flex",
    alignItems: "center",
  },
  navInner: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
    paddingLeft: "24px",
    paddingRight: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navBrand: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#141414",
    lineHeight: 1,
  },
  navSubtitle: {
    fontSize: "10px",
    fontWeight: 500,
    marginTop: "4px",
  },
  heroSection: {
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    backgroundImage: "linear-gradient(to bottom, #FFFFFF, #F8F7F5)",
    paddingTop: "120px",
    paddingBottom: "80px",
  },
  eyebrow: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#E94344",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "24px",
  },
  h1: {
    fontSize: "56px",
    fontWeight: 800,
    lineHeight: 1.1,
    color: "#141414",
    marginBottom: "24px",
  },
  heroSub: {
    fontSize: "18px",
    lineHeight: 1.6,
    color: "#4A4A4A",
    maxWidth: "640px",
    margin: "0 auto 40px",
  },
  trustLine: {
    fontSize: "14px",
    color: "#6B6B6B",
    marginTop: "32px",
    fontWeight: 500,
  },
  logoRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    marginTop: "32px",
  },
  logoItem: {
    fontWeight: 600,
    fontSize: "15px",
    color: "#4A4A4A",
    cursor: "default",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "28px",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "40px",
  },
  h2: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#141414",
    textAlign: "center",
    marginBottom: "16px",
  },
  h2Dark: {
    color: "#FFFFFF",
    fontSize: "42px",
  },
  subH2: {
    fontSize: "17px",
    textAlign: "center",
    marginBottom: "56px",
    color: "#4A4A4A",
  },
  metricNum: {
    fontSize: "36px",
    fontWeight: 800,
    color: "#E94344",
    marginBottom: "8px",
  },
  metricLabel: {
    fontSize: "14px",
    color: "#4A4A4A",
  },
  featureCard: {
    backgroundColor: "#F8F7F5",
    border: "1px solid #E5E2DE",
    borderRadius: "12px",
    padding: "36px",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#141414",
    marginTop: "16px",
    marginBottom: "12px",
  },
  badgeRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
  },
  badge: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E2DE",
    borderRadius: "999px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#141414",
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerBottom: {
    borderTop: "1px solid #2A2A2A",
    marginTop: "40px",
    paddingTop: "24px",
    textAlign: "center",
    fontSize: "13px",
  },
  fadeUp: {
    opacity: 0,
    transform: "translateY(30px)",
    transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
  },
  inView: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

// A simple Intersection Observer hook
function useInView() {
  const [inView, setInView] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

const FadeUpSection: React.FC<{
  children: React.ReactNode;
  delay?: string;
}> = ({ children }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} {...stylex.props(styles.fadeUp, inView && styles.inView)}>
      {children}
    </div>
  );
};

export default function LandingPage() {
  return (
    <div {...stylex.props(styles.pageWrapper)}>
      {/* 01 NAVBAR */}
      <nav {...stylex.props(styles.nav)}>
        <div {...stylex.props(styles.navInner)}>
          <div>
            <div {...stylex.props(styles.navBrand)}>NUMM</div>
            <div {...stylex.props(styles.navSubtitle)}>
              National Unified Material Master
            </div>
          </div>
          <Stack direction="row" gap="sm">
            <Button variant="secondary">Architecture</Button>
            <Button variant="primary">Enter Dashboard</Button>
          </Stack>
        </div>
      </nav>

      {/* 02 HERO */}
      <header {...stylex.props(styles.heroSection)}>
        <div {...stylex.props(styles.container, styles.containerHero)}>
          <FadeUpSection>
            <div {...stylex.props(styles.eyebrow)}>
              SIH 26099 | Ministry of Petroleum &amp; Natural Gas
            </div>
            <h1 {...stylex.props(styles.h1)}>
              Unify India’s energy procurement.
            </h1>
            <p {...stylex.props(styles.heroSub)}>
              NUMM is the AI-powered National Unified Material Master that turns
              fragmented CPSE catalogs into one sovereign standard — ONMC — with
              zero false-positive safety mismatches.
            </p>
            <Stack direction="row" gap="md" align="center" justify="center">
              <Button variant="primary" size="large">
                Enter Live Demo
              </Button>
              <Button variant="secondary" size="large">
                Watch 5-min Pitch
              </Button>
            </Stack>
            <div {...stylex.props(styles.trustLine)}>
              Built for IOCL | ONGC | BPCL | HPCL | GAIL | OIL | EIL | NRL
            </div>
          </FadeUpSection>
        </div>
      </header>

      {/* 03 LOGO CLOUD */}
      <section
        {...stylex.props(styles.section, styles.sectionSoft)}
        style={{ paddingTop: "64px", paddingBottom: "64px" }}
      >
        <div {...stylex.props(styles.container)}>
          <FadeUpSection>
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#6B6B6B",
                marginBottom: "32px",
              }}
            >
              Designed under the vision of Ministry of Petroleum & Natural Gas
            </div>
            <div {...stylex.props(styles.logoRow)}>
              {[
                "IOCL",
                "ONGC",
                "BPCL",
                "HPCL",
                "GAIL",
                "OIL",
                "EIL",
                "NRL",
                "MRPL",
                "CPCL",
              ].map((logo) => (
                <span key={logo} {...stylex.props(styles.logoItem)}>
                  {logo}
                </span>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* 04 PROBLEM SOLUTION */}
      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.container)}>
          <FadeUpSection>
            <h2 {...stylex.props(styles.h2)}>
              The sovereign solution for India’s energy procurement
            </h2>
            <p {...stylex.props(styles.subH2)}>
              From fragmented catalogs to One Nation, One Material Code
            </p>
          </FadeUpSection>

          <div {...stylex.props(styles.grid3)}>
            <FadeUpSection>
              <Card padding="lg">
                <Database color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  Multi-CPSE Ingestion
                </h3>
                <p>
                  Ingest messy free-text descriptions from IOCL, ONGC, BPCL,
                  HPCL and others. Automatically expand 250+ petroleum acronyms
                  and normalize units.
                </p>
              </Card>
            </FadeUpSection>
            <FadeUpSection>
              <Card padding="lg">
                <ShieldCheck color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  Zero False-Positive Safety Gate
                </h3>
                <p>
                  Hybrid lexical + semantic matching protected by hard ASME
                  B16.5, B16.34 and API 6D rules. Different pressure class or
                  size? Instantly rejected.
                </p>
              </Card>
            </FadeUpSection>
            <FadeUpSection>
              <Card padding="lg">
                <Layers color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  Surplus & Demand Pooling
                </h3>
                <p>
                  Surface idle stock across sister CPSEs and aggregate demand
                  for volume discounts. Turn fragmentation into shared national
                  savings.
                </p>
              </Card>
            </FadeUpSection>
          </div>
        </div>
      </section>

      {/* 05 METRICS */}
      <section {...stylex.props(styles.section, styles.sectionSoft)}>
        <div {...stylex.props(styles.container)}>
          <FadeUpSection>
            <h2 {...stylex.props(styles.h2)}>
              The economic case is already clear
            </h2>
            <div {...stylex.props(styles.grid4)}>
              <Card padding="lg" align="center">
                <div {...stylex.props(styles.metricNum)}>₹14,200 Cr</div>
                <div {...stylex.props(styles.metricLabel)}>
                  Annual economic drag addressed
                </div>
              </Card>
              <Card padding="lg" align="center">
                <div {...stylex.props(styles.metricNum)}>₹13.5 Lakh Cr</div>
                <div {...stylex.props(styles.metricLabel)}>
                  Procurement volume in scope
                </div>
              </Card>
              <Card padding="lg" align="center">
                <div {...stylex.props(styles.metricNum)}>0.0%</div>
                <div {...stylex.props(styles.metricLabel)}>
                  False-positive safety mismatches
                </div>
              </Card>
              <Card padding="lg" align="center">
                <div {...stylex.props(styles.metricNum)}>&lt; 50 ms</div>
                <div {...stylex.props(styles.metricLabel)}>
                  Target search latency (p95)
                </div>
              </Card>
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "40px",
                color: "#6B6B6B",
                fontSize: "15px",
              }}
            >
              Built for pilot deployment at IOCL Mathura, ONGC Hazira, BPCL
              Mumbai and HPCL Visakhapatnam.
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* 06 FEATURES */}
      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.container)}>
          <FadeUpSection>
            <h2 {...stylex.props(styles.h2)} style={{ marginBottom: "56px" }}>
              Everything required for a national material master
            </h2>
            <div {...stylex.props(styles.grid2)}>
              <div {...stylex.props(styles.featureCard)}>
                <Hash color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  Mint canonical ONMC codes in milliseconds
                </h3>
                <p>
                  Every matched cluster receives a sovereign One Nation, One
                  Material Code such as ONMC-MECH-VLV-BAL-002-150-A105-9B2F with
                  bidirectional cross-walks to Shell MESC, UNSPSC and GeM.
                </p>
              </div>
              <div {...stylex.props(styles.featureCard)}>
                <Shield color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  0.0% false-positive safety mismatches
                </h3>
                <p>
                  Engineering rules from ASME and API are non-negotiable. Vector
                  search is only allowed to propose candidates that pass all
                  physical constraints on size, pressure class and metallurgy.
                </p>
              </div>
              <div {...stylex.props(styles.featureCard)}>
                <ArrowRightLeft color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  See idle stock across the nation
                </h3>
                <p>
                  When Mathura searches for a 2-inch Class 150 ball valve, NUMM
                  instantly surfaces 14 available units at ONGC Hazira — only 78
                  km away — instead of placing a new foreign order.
                </p>
              </div>
              <div {...stylex.props(styles.featureCard)}>
                <Lock color="#E94344" size={40} />
                <h3 {...stylex.props(styles.featureTitle)}>
                  Immutable cryptographic audit trail
                </h3>
                <p>
                  Every steward approval and inter-CPSE transfer is recorded in
                  an append-only SHA-256 ledger ready for Central Vigilance
                  Commission verification.
                </p>
              </div>
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* 07 STANDARDS */}
      <section {...stylex.props(styles.section, styles.sectionSoft)}>
        <div
          {...stylex.props(styles.container, styles.containerSmall)}
          style={{ textAlign: "center" }}
        >
          <FadeUpSection>
            <h2 {...stylex.props(styles.h2)}>
              Cross-walked to the standards that matter
            </h2>
            <p {...stylex.props(styles.subH2)}>
              Bidirectional mapping ensures every ONMC code can be traced to
              international catalogs and Indian public procurement platforms.
            </p>
            <div {...stylex.props(styles.badgeRow)}>
              {[
                "Shell MESC (10-digit)",
                "UNSPSC (8-digit)",
                "Government e-Marketplace (GeM)",
                "ASME B16.5 / B16.34",
                "API 6D",
                "ASTM Material Grades",
                "CVC Audit Ready",
                "NIC MeghRaj Cloud Ready",
              ].map((b) => (
                <span key={b} {...stylex.props(styles.badge)}>
                  {b}
                </span>
              ))}
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* 08 FINAL CTA */}
      <section {...stylex.props(styles.section, styles.sectionDark)}>
        <div
          {...stylex.props(styles.container, styles.containerSmall)}
          style={{ textAlign: "center" }}
        >
          <FadeUpSection>
            <h2 {...stylex.props(styles.h2, styles.h2Dark)}>
              Unify. Standardize. Save.
            </h2>
            <p
              style={{
                fontSize: "17px",
                color: "#D0D0D0",
                marginBottom: "40px",
                lineHeight: 1.6,
              }}
            >
              The sovereign material master for India’s energy CPSEs.
              <br />
              Built for the Ministry of Petroleum &amp; Natural Gas.
              <br />
              Ready for pilot.
            </p>
            <Button variant="primary" size="large">
              Enter Live Demo
            </Button>
            <div
              style={{ marginTop: "20px", color: "#A0A0A0", fontSize: "15px" }}
            >
              View Technical Architecture &rarr;
            </div>
          </FadeUpSection>
        </div>
      </section>

      {/* 09 FOOTER */}
      <footer
        {...stylex.props(styles.sectionDark)}
        style={{ padding: "60px 24px 40px" }}
      >
        <div {...stylex.props(styles.container)}>
          <div {...stylex.props(styles.grid3)}>
            <div {...stylex.props(styles.footerCol)}>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "#FFF" }}>
                NUMM
              </div>
              <div>National Unified Material Master</div>
              <div>One Nation, One Material Code</div>
            </div>
            <div {...stylex.props(styles.footerCol)}>
              <span style={{ color: "#A0A0A0" }}>
                Problem Statement (SIH 26099)
              </span>
              <span style={{ color: "#A0A0A0" }}>Architecture</span>
              <span style={{ color: "#A0A0A0" }}>Live Demo</span>
              <span style={{ color: "#A0A0A0" }}>GitHub Repository</span>
            </div>
            <div {...stylex.props(styles.footerCol)}>
              <div>Smart India Hackathon 2026</div>
              <div>Ministry of Petroleum &amp; Natural Gas</div>
              <div>Government of India</div>
            </div>
          </div>
          <div {...stylex.props(styles.footerBottom)}>
            &copy; 2026 NUMM Framework | Built for SIH 26099 | Sovereign by
            design
          </div>
        </div>
      </footer>
    </div>
  );
}
