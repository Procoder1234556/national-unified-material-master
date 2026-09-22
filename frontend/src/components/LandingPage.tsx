// ponytail: Humanto-inspired public landing page for NUMM (One Nation, One Material Code).
// Features warm editorial aesthetic, ambient radial glow, interactive persona pathways, and seamless transition to enterprise workspace.

import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Sparkline,
  SparkBar,
  SegBar,
  BulletMeter,
  DonutMicro,
} from "./MicroCharts";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Truck,
  TrendingDown,
  Layers,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Factory,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Lock,
  ArrowRightLeft,
  ChevronRight,
} from "lucide-react";

interface LandingPageProps {
  onEnterDashboard: (targetTab?: string, targetRole?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cpseList = [
    { code: "IOCL", name: "Indian Oil" },
    { code: "ONGC", name: "Oil & Natural Gas Corp" },
    { code: "BPCL", name: "Bharat Petroleum" },
    { code: "HPCL", name: "Hindustan Petroleum" },
    { code: "GAIL", name: "Gas Authority of India" },
    { code: "OIL", name: "Oil India Limited" },
    { code: "EIL", name: "Engineers India" },
    { code: "NRL", name: "Numaligarh Refinery" },
    { code: "MRPL", name: "Mangalore Refinery" },
    { code: "CPCL", name: "Chennai Petroleum" },
  ];

  const faqs = [
    {
      q: "How does the deterministic ASME safety gate prevent valve misapplications?",
      a: "NUMM couples BGE semantic vector embeddings with a strict, rule-based ASME physical safety gate. If an incoming catalog record specifies Class 300 (51 bar) while the candidate master code is Class 150 (19 bar), the automated merger is halted, highlighted in Crimson Wine (#9B121E), and locked to 'Split / Mint New Code' to prevent catastrophic field ruptures.",
    },
    {
      q: "What is the GFR Rule 149 'Search Before Buy' mandate?",
      a: "General Financial Rules (GFR) Rule 149 mandates that CPSE procurement officers verify existing unallocated surplus inventory across sister CPSEs before issuing new purchase requisitions. If ONGC Hazira holds 14 unallocated ball valves 78 km from IOCL Gujarat Refinery, an inter-CPSE transfer is executed instead of floating a duplicate tender.",
    },
    {
      q: "How does MeghRaj SSO ensure auditability for CVC oversight?",
      a: "Every triage approval, attribute override, and novel code minting action is cryptographically signed using the data steward's National Informatics Centre (NIC) MeghRaj SSO JWT session. The resulting SHA-256 hash is appended to an immutable audit ledger accessible by MoPNG and Central Vigilance Commission (CVC) inspectors.",
    },
    {
      q: "Can legacy SAP ECC and S/4HANA material numbers coexist with ONMC?",
      a: "Yes. NUMM operates as a federated cross-walk layer. Existing CPSE SAP material numbers (e.g. IOCL MAT-1002931) remain intact in local ERPs while being cross-walked to the canonical ONMC code (e.g. ONMC-MECH-VLV-BAL-002-150-A105-9B2F), Shell MESC (74.16.01.015.1), and GeM Category.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: rawTokens.canvasBackground,
        color: rawTokens.textPrimary,
        fontFamily: rawTokens.fontSans,
        overflowX: "hidden",
      }}
    >
      {/* ========================================================================= */}
      {/* FLOATING PILL HEADER (Humanto reference)                                  */}
      {/* ========================================================================= */}
      <header
        style={{
          position: "sticky",
          top: "16px",
          zIndex: 100,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: rawTokens.radiusFull,
            padding: "8px 16px 8px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
          }}
        >
          {/* Brand Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "15px",
                letterSpacing: "-0.05em",
              }}
            >
              N
            </div>
            <div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  letterSpacing: "-0.02em",
                }}
              >
                NUMM
              </span>
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  letterSpacing: "0.06em",
                }}
              >
                MoPNG • SIH 26099
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a
              href="#pathways"
              style={{
                textDecoration: "none",
                color: rawTokens.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Role Pathways
            </a>
            <a
              href="#features"
              style={{
                textDecoration: "none",
                color: rawTokens.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Commodities
            </a>
            <a
              href="#safety"
              style={{
                textDecoration: "none",
                color: rawTokens.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              ASME Safety Gate
            </a>
            <a
              href="#network"
              style={{
                textDecoration: "none",
                color: rawTokens.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              CPSE Network
            </a>
            <a
              href="#faq"
              style={{
                textDecoration: "none",
                color: rawTokens.textSecondary,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              FAQ
            </a>
          </nav>

          {/* Launch Enterprise Workspace Pill CTA */}
          <button
            onClick={() => onEnterDashboard("overview")}
            style={{
              backgroundColor: rawTokens.textPrimary,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusFull,
              padding: "9px 20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.15)",
              transition: "transform 0.15s ease",
            }}
          >
            <span>Launch Platform</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* HERO SECTION WITH WARM AMBIENT GLOW (Humanto style)                       */}
      {/* ========================================================================= */}
      <section
        style={{
          position: "relative",
          padding: "80px 24px 60px",
          maxWidth: "1280px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Soft Ambient Radial Gradient Backdrop */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "85%",
            height: "120%",
            background: rawTokens.glowAmbientHero,
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.9,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Sovereign Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                backgroundColor: "rgba(233, 67, 68, 0.12)",
                color: rawTokens.colorAction,
                fontSize: "11px",
                fontWeight: 800,
                padding: "4px 12px",
                borderRadius: rawTokens.radiusFull,
                letterSpacing: "0.06em",
              }}
            >
              ONE NATION, ONE MATERIAL CODE (ONMC)
            </span>
            <span
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                fontWeight: 600,
              }}
            >
              Sovereign Industrial Catalog Harmonization
            </span>
          </div>

          {/* Main H1 Headline */}
          <h1
            style={{
              fontSize: "46px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
              margin: "0 auto",
            }}
          >
            Harmonizing India's Energy Procurement with Deterministic
            Engineering AI
          </h1>

          {/* Sub-lead */}
          <p
            style={{
              fontSize: "16px",
              color: rawTokens.textSecondary,
              lineHeight: 1.6,
              maxWidth: "760px",
              margin: "18px auto 0",
            }}
          >
            A unified national material master for India's oil & gas CPSEs.
            Eliminates duplicate tenders, surfaces ₹12.8+ Crore in neighboring
            surplus inventory, and prevents dangerous specification
            discrepancies before they reach the plant.
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              marginTop: "32px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => onEnterDashboard("overview", "STEWARD")}
              style={{
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "14px 32px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(233, 67, 68, 0.35)",
              }}
            >
              <span>Enter Enterprise Platform</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onEnterDashboard("search", "PROCUREMENT_OFFICER")}
              style={{
                backgroundColor: "#FFFFFF",
                color: rawTokens.textPrimary,
                border: `1px solid ${rawTokens.borderStrong}`,
                borderRadius: rawTokens.radiusFull,
                padding: "14px 28px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <Search size={15} color={rawTokens.colorAction} />
              <span>Search Before Buy</span>
            </button>
          </div>

          {/* Live Micro-Metrics Bar */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "28px",
              marginTop: "36px",
              padding: "10px 24px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(6px)",
              borderRadius: rawTokens.radiusFull,
              border: `1px solid ${rawTokens.borderSubtle}`,
              fontSize: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#0D533A",
                }}
              />
              <span>
                <strong>104,219</strong> Materials Harmonized
              </span>
            </div>
            <span>•</span>
            <div>
              <span>
                <strong>₹12.8 Cr</strong> Projected Savings
              </span>
            </div>
            <span>•</span>
            <div>
              <span style={{ color: "#0D533A", fontWeight: 700 }}>92.4%</span>{" "}
              Auto-Approval Rate
            </div>
            <span>•</span>
            <div>
              <span>
                <strong>100%</strong> CVC Auditable (SHA-256)
              </span>
            </div>
          </div>
        </div>

        {/* 3 Editorial Feature Preview Cards (Humanto Hero Bottom trio) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginTop: "56px",
            textAlign: "left",
          }}
        >
          <div
            onClick={() => onEnterDashboard("steward", "STEWARD")}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: rawTokens.colorAction,
                  letterSpacing: "0.06em",
                }}
              >
                HUMAN-IN-THE-LOOP TRIAGE
              </span>
              <FileCheck2 size={18} color={rawTokens.colorAction} />
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                marginTop: "10px",
              }}
            >
              High-Throughput Stewardship
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
                lineHeight: 1.5,
              }}
            >
              Resolve borderline duplicate clusters (70% - 91% confidence) with
              side-by-side attribute deltas and keyboard shortcuts (
              <kbd>J/K/A/R</kbd>).
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "14px",
                fontSize: "12px",
                fontWeight: 700,
                color: rawTokens.colorAction,
              }}
            >
              <span>Open Triage Cockpit</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div
            onClick={() => onEnterDashboard("search", "PROCUREMENT_OFFICER")}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#0D533A",
                  letterSpacing: "0.06em",
                }}
              >
                PRE-PROCUREMENT DISCOVERY
              </span>
              <Search size={18} color="#0D533A" />
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                marginTop: "10px",
              }}
            >
              Search Before Buy
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
                lineHeight: 1.5,
              }}
            >
              Mandatory GFR Rule 149 verification: discover unallocated surplus
              stock in neighboring sister CPSEs before floating redundant
              purchase orders.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "14px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#0D533A",
              }}
            >
              <span>Search National Master</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div
            onClick={() => onEnterDashboard("security", "AUDITOR")}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: rawTokens.colorAnchor,
                  letterSpacing: "0.06em",
                }}
              >
                DETERMINISTIC SAFETY GATES
              </span>
              <ShieldCheck size={18} color={rawTokens.colorAnchor} />
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                marginTop: "10px",
              }}
            >
              Zero-Tolerance Safety Intercepts
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
                lineHeight: 1.5,
              }}
            >
              Deterministic physical rules block pressure rating mismatches
              (Class 150 vs 300) and metallurgical incompatibilities with
              cryptographic logging.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "14px",
                fontSize: "12px",
                fontWeight: 700,
                color: rawTokens.colorAnchor,
              }}
            >
              <span>Inspect Audit Ledger</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PARTICIPATING CPSE FEDERATION BAR                                         */}
      {/* ========================================================================= */}
      <section
        style={{
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
          borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          backgroundColor: "#FFFFFF",
          padding: "24px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: rawTokens.textMuted,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            Federating Public Sector Enterprises Across India's Energy
            Infrastructure
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {cpseList.map((cpse) => (
              <div
                key={cpse.code}
                style={{
                  padding: "8px 16px",
                  borderRadius: rawTokens.radiusSm,
                  backgroundColor: rawTokens.surfaceSubtle,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <strong
                  style={{ fontSize: "12px", color: rawTokens.textPrimary }}
                >
                  {cpse.code}
                </strong>
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  {cpse.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE ROLE PATHWAYS ("Start where you are" from Humanto)            */}
      {/* ========================================================================= */}
      <section
        id="pathways"
        style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: rawTokens.colorAction,
              letterSpacing: "0.06em",
            }}
          >
            TAILORED OPERATIONAL WORKSPACES
          </span>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
              marginTop: "8px",
            }}
          >
            Start where you are — we'll guide you to the right workflow
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: rawTokens.textSecondary,
              marginTop: "8px",
            }}
          >
            Role-gated interfaces designed for enterprise efficiency, keyboard
            navigation, and statutory compliance
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {/* Pathway 1: Data Steward */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "32px 28px",
              boxShadow: rawTokens.shadowCard,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: "rgba(233, 67, 68, 0.1)",
                  color: rawTokens.colorAction,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <FileCheck2 size={24} />
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                }}
              >
                I'm a Data Steward
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: rawTokens.textSecondary,
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              >
                Review borderline catalog clusters, inspect attribute deltas,
                and resolve discrepancies with 1,000+ items/hr throughput.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  borderRadius: rawTokens.radiusSm,
                  fontSize: "11px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Pending Triage Queue:
                  </span>
                  <strong
                    style={{
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.colorAction,
                    }}
                  >
                    84 items
                  </strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Keyboard Shortcuts:
                  </span>
                  <span
                    style={{ fontFamily: rawTokens.fontMono, fontWeight: 700 }}
                  >
                    J, K, A, R, E, N
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterDashboard("steward", "STEWARD")}
              style={{
                marginTop: "24px",
                backgroundColor: rawTokens.textPrimary,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>Enter Triage Cockpit</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Pathway 2: Procurement Officer */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "32px 28px",
              boxShadow: rawTokens.shadowCard,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: "rgba(95, 151, 142, 0.15)",
                  color: "#0D533A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <Search size={24} />
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                }}
              >
                I'm a Procurement Officer
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: rawTokens.textSecondary,
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              >
                Query national master holdings before floating tenders. Find
                surplus inventory within 100 km and aggregate pooled demand.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  borderRadius: rawTokens.radiusSm,
                  fontSize: "11px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Duplicate Avoidance:
                  </span>
                  <strong
                    style={{ fontFamily: rawTokens.fontMono, color: "#0D533A" }}
                  >
                    ₹3.42 Cr identified
                  </strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Pooled Tenders:
                  </span>
                  <span
                    style={{ fontFamily: rawTokens.fontMono, fontWeight: 700 }}
                  >
                    2,950 units (14.2% off)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterDashboard("search", "PROCUREMENT_OFFICER")}
              style={{
                marginTop: "24px",
                backgroundColor: rawTokens.textPrimary,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>Search Before Buy</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Pathway 3: Plant Maintenance Engineer */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "32px 28px",
              boxShadow: rawTokens.shadowCard,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: "rgba(241, 204, 157, 0.4)",
                  color: rawTokens.colorAnchor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "18px",
                }}
              >
                <Truck size={24} />
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                }}
              >
                I'm a Plant Engineer
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: rawTokens.textSecondary,
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              >
                Locate emergency insurance spares in neighboring refineries
                within 6 hours. Initiate digital MTIRF requisitions with e-Sign.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  padding: "14px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  borderRadius: rawTokens.radiusSm,
                  fontSize: "11px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Hazira → Gujarat Ref.:
                  </span>
                  <strong
                    style={{ fontFamily: rawTokens.fontMono, color: "#0D533A" }}
                  >
                    78 km • 14 units
                  </strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: rawTokens.textMuted }}>
                    Requisition Format:
                  </span>
                  <span
                    style={{ fontFamily: rawTokens.fontMono, fontWeight: 700 }}
                  >
                    MoPNG MTIRF (5-Stage)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnterDashboard("surplus", "PLANT_ENGINEER")}
              style={{
                marginTop: "24px",
                backgroundColor: rawTokens.textPrimary,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "12px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>Locate Surplus Stock</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* COMMODITIES HARMONIZED SECTION                                            */}
      {/* ========================================================================= */}
      <section
        id="features"
        style={{
          padding: "60px 24px",
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
          borderBottom: `1px solid ${rawTokens.borderSubtle}`,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: rawTokens.colorAction,
                letterSpacing: "0.06em",
              }}
            >
              STANDARDIZED OIL & GAS COMMODITY FAMILIES
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                marginTop: "8px",
              }}
            >
              Standardized Mechanical & Piping Equipment Classes
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
              }}
            >
              Cross-walked across Shell MESC, UNSPSC, and GeM categories with
              exact engineering tolerances
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {[
              {
                title: "Ball Valves (API 6D)",
                desc: 'Two-piece split body, floating/trunnion mounted, 2" - 24", Class 150 - 600, ASTM A105 / A216 WCB.',
                code: "ONMC-MECH-VLV-BAL",
                mesc: "74.16.XX",
              },
              {
                title: "Gate Valves (API 600)",
                desc: 'Bolted bonnet, flexible wedge, OS&Y, 2" - 36", Class 150 - 900, ASTM A216 WCB / WC6.',
                code: "ONMC-MECH-VLV-GAT",
                mesc: "74.02.XX",
              },
              {
                title: "Weld Neck Flanges (ASME B16.5)",
                desc: 'Raised face (RF), RTJ, SCH 40/80/160, 1/2" - 24", Class 150 - 2500, ASTM A105.',
                code: "ONMC-PIP-FLG-WN",
                mesc: "76.22.XX",
              },
              {
                title: "Spiral Wound Gaskets (ASME B16.20)",
                desc: "SS316L winding, flexible graphite filler, carbon steel outer ring, Class 150 - 600.",
                code: "ONMC-GSK-SPW",
                mesc: "81.12.XX",
              },
              {
                title: "Seamless Line Pipe (API 5L)",
                desc: "Grade B, X42, X52, PSL-1 / PSL-2 sour service certified, SCH 40/80, beveled ends.",
                code: "ONMC-PIP-SML",
                mesc: "78.10.XX",
              },
              {
                title: "Globe Valves (BS 1873)",
                desc: "Plug type disc, renewable seat ring, flanged ends, Class 150 - 300, ASTM A216 WCB.",
                code: "ONMC-MECH-VLV-GLB",
                mesc: "74.05.XX",
              },
            ].map((com, idx) => (
              <div
                key={idx}
                style={{
                  padding: "20px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: rawTokens.surfaceSubtle,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {com.title}
                  </h4>
                  <span
                    style={{
                      fontSize: "10px",
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textMuted,
                    }}
                  >
                    MESC {com.mesc}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: rawTokens.textSecondary,
                    marginTop: "6px",
                    lineHeight: 1.4,
                  }}
                >
                  {com.desc}
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "11px",
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.colorAction,
                    fontWeight: 700,
                  }}
                >
                  {com.code}-*
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DARK SOVEREIGN AUDIT VAULT SECTION (Humanto Dark Block)                   */}
      {/* ========================================================================= */}
      <section
        id="safety"
        style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            backgroundColor: rawTokens.darkVaultBg,
            borderRadius: rawTokens.radiusXl,
            border: `1px solid ${rawTokens.darkVaultBorder}`,
            padding: "48px",
            color: "#FFFFFF",
            boxShadow: rawTokens.shadowElevated,
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "36px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                backgroundColor: "rgba(233, 67, 68, 0.2)",
                color: "#FF8F8F",
                fontSize: "10px",
                fontWeight: 800,
                padding: "3px 10px",
                borderRadius: rawTokens.radiusFull,
                letterSpacing: "0.06em",
              }}
            >
              CVC SOVEREIGN TAMPER-EVIDENT VAULT
            </span>
            <h2
              style={{
                fontSize: "30px",
                fontWeight: 800,
                color: "#FFFFFF",
                marginTop: "12px",
                lineHeight: 1.2,
              }}
            >
              Immutable Cryptographic Audit Trail for Every Catalog Action
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#CBD5E1",
                marginTop: "12px",
                lineHeight: 1.6,
              }}
            >
              Compliance with Central Vigilance Commission (CVC)
              anti-cartelization directives and MoPNG governance. Every decision
              made by a human steward or automated AI gate generates an
              append-only SHA-256 block hash.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "24px",
              }}
            >
              {[
                "Deterministic ASME safety gate halts pressure class mismatches (Class 150 vs 300)",
                "MeghRaj SSO cryptographic e-Sign binding with actor timestamps",
                "Append-only ledger structure ensures zero post-facto modification",
                "GFR Rule 149 compliance verification logged for every procurement action",
              ].map((pt, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    color: "#E2E8F0",
                  }}
                >
                  <CheckCircle2 size={16} color="#A5D7C9" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onEnterDashboard("security", "AUDITOR")}
              style={{
                marginTop: "32px",
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "12px 28px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Inspect CVC Audit Chain</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cryptographic Hash Card Mock */}
          <div
            style={{
              backgroundColor: rawTokens.darkVaultCard,
              border: `1px solid ${rawTokens.darkVaultBorder}`,
              borderRadius: rawTokens.radiusLg,
              padding: "24px",
              fontFamily: rawTokens.fontMono,
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#A0AEC0",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Latest Verified Block #104,219
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#FF8F8F",
                wordBreak: "break-all",
                lineHeight: 1.4,
              }}
            >
              0x9b121e4a78c0245fd8841a052f9b2fa105150002...
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: `1px solid ${rawTokens.darkVaultBorder}`,
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#A0AEC0" }}>Action:</span>
                <span style={{ color: "#A5D7C9", fontWeight: 700 }}>
                  APPROVE_MATCH
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#A0AEC0" }}>Material:</span>
                <span style={{ color: "#FFFFFF" }}>ONMC-MECH-VLV-BAL-002</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#A0AEC0" }}>Steward:</span>
                <span style={{ color: "#FFFFFF" }}>
                  data.steward@mopng.gov.in
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#A0AEC0" }}>Safety Status:</span>
                <span style={{ color: "#A5D7C9" }}>VERIFIED PASSED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CPSE GEOSPATIAL LOGISTICS GRID                                            */}
      {/* ========================================================================= */}
      <section
        id="network"
        style={{
          padding: "60px 24px",
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: rawTokens.colorAction,
                letterSpacing: "0.06em",
              }}
            >
              INTER-REFINERY LOGISTICS TOPOLOGY
            </span>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                marginTop: "8px",
              }}
            >
              Interconnecting India's Oil & Gas Refineries & Terminals
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
              }}
            >
              Real-time transit distance and available insurance spare
              allocations between neighboring operating sites
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {[
              {
                source: "ONGC Hazira Gas Processing Plant",
                dest: "IOCL Gujarat Refinery, Vadodara",
                distance: "78 km",
                transit: "4.5 hrs",
                surplus: "14 Ball Valves available",
              },
              {
                source: "BPCL Mumbai Refinery, Mahul",
                dest: "HPCL Mumbai Refinery",
                distance: "12 km",
                transit: "1.5 hrs",
                surplus: "24 Weld Neck Flanges available",
              },
              {
                source: "GAIL Vijaipur Petrochemical Complex",
                dest: "IOCL Mathura Refinery",
                distance: "185 km",
                transit: "6.5 hrs",
                surplus: "8 Gate Valves available",
              },
              {
                source: "HPCL Visakh Refinery",
                dest: "IOCL Paradip Refinery",
                distance: "520 km",
                transit: "12 hrs",
                surplus: "150 Spiral Gaskets available",
              },
            ].map((route, i) => (
              <div
                key={i}
                style={{
                  padding: "18px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: rawTokens.surfaceSubtle,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: rawTokens.colorAction,
                    }}
                  >
                    {route.source.split(" ")[0]} &rarr;{" "}
                    {route.dest.split(" ")[0]}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "4px",
                    }}
                  >
                    {route.distance} ({route.transit})
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: rawTokens.textSecondary,
                      marginTop: "6px",
                    }}
                  >
                    {route.source}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    paddingTop: "10px",
                    borderTop: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#0D533A",
                    }}
                  >
                    {route.surplus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAQ SECTION (Humanto accordion)                                           */}
      {/* ========================================================================= */}
      <section
        id="faq"
        style={{ padding: "80px 24px", maxWidth: "900px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              color: rawTokens.colorAction,
              letterSpacing: "0.06em",
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
              marginTop: "8px",
            }}
          >
            Everything you need to know about NUMM
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;

            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusMd,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "transparent",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 20px 16px",
                      fontSize: "13px",
                      color: rawTokens.textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BOTTOM CTA BANNER & FOOTER                                                */}
      {/* ========================================================================= */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
          padding: "60px 24px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
            }}
          >
            Ready to unify catalog master data across CPSEs?
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: rawTokens.textSecondary,
              marginTop: "10px",
            }}
          >
            Launch the high-fidelity enterprise workspace to begin catalog
            ingestion, triage borderline clusters, or search national inventory.
          </p>

          <button
            onClick={() => onEnterDashboard("overview")}
            style={{
              marginTop: "24px",
              backgroundColor: rawTokens.colorAction,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusFull,
              padding: "14px 36px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(233, 67, 68, 0.3)",
            }}
          >
            <span>Launch Enterprise Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Minimal Footer Strip */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "48px auto 0",
            paddingTop: "24px",
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: rawTokens.textMuted,
          }}
        >
          <div>
            <strong>NUMM</strong> • One Nation, One Material Code • Ministry of
            Petroleum & Natural Gas (MoPNG) • SIH 26099
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span>Version 2.2.0</span>
            <span>CVC Audit Compliant</span>
            <span>NIC MeghRaj SSO</span>
          </div>
        </div>
      </section>
    </div>
  );
};
