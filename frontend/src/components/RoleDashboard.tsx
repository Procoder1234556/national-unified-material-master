// ponytail: Role-Aware Enterprise Dashboard synthesizing Humanto editorial warmth with NUMM industrial density.
// Features microcharts.dev sparklines, Watermelon UI stat cards, and dynamic persona-tailored operations.

import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Sparkline,
  SparkBar,
  SegBar,
  BulletMeter,
  DonutMicro,
  RugPlot,
} from "./MicroCharts";
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  Search,
  Truck,
  TrendingDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Factory,
  ArrowUpRight,
  Hash,
  Clock,
  ExternalLink,
  ChevronRight,
  Compass,
} from "lucide-react";

interface RoleDashboardProps {
  activeRole: "STEWARD" | "PROCUREMENT_OFFICER" | "PLANT_ENGINEER" | "AUDITOR";
  onSelectRole: (
    role: "STEWARD" | "PROCUREMENT_OFFICER" | "PLANT_ENGINEER" | "AUDITOR"
  ) => void;
  onNavigate: (tabId: string) => void;
  onSearchQuery?: (query: string) => void;
  onInspectONMC?: (onmcCode: string) => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  activeRole,
  onSelectRole,
  onNavigate,
  onSearchQuery,
  onInspectONMC,
}) => {
  const [searchHeroText, setSearchHeroText] = useState(
    "2 inch 150# flanged ball valve CS A105"
  );

  const roles = [
    { id: "STEWARD", label: "Data Steward", org: "IOCL Refineries HQ" },
    {
      id: "PROCUREMENT_OFFICER",
      label: "Procurement Officer",
      org: "ONGC Materials Mgmt",
    },
    {
      id: "PLANT_ENGINEER",
      label: "Plant Maintenance",
      org: "Gujarat Refinery Vadodara",
    },
    {
      id: "AUDITOR",
      label: "MoPNG / CVC Auditor",
      org: "Sovereign Audit Cell",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        position: "relative",
      }}
    >
      {/* Humanto Ambient Glow Header Banner */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: rawTokens.radiusXl,
          backgroundColor: "#FFFFFF",
          border: `1px solid ${rawTokens.borderSubtle}`,
          padding: "32px 36px",
          boxShadow: rawTokens.shadowCard,
        }}
      >
        {/* Soft Ambient Radial Gradient Wash */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "10%",
            width: "80%",
            height: "160%",
            background: rawTokens.glowAmbientHero,
            pointerEvents: "none",
            filter: "blur(20px)",
            opacity: 0.9,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Sovereign Sub-heading & Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  backgroundColor: "rgba(233, 67, 68, 0.12)",
                  color: rawTokens.colorAction,
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "3px 9px",
                  borderRadius: rawTokens.radiusFull,
                  letterSpacing: "0.06em",
                }}
              >
                SIH 26099 • MoPNG FEDERATION
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: rawTokens.textSecondary,
                  fontWeight: 500,
                }}
              >
                One Nation, One Material Code (ONMC)
              </span>
            </div>

            {/* Persona Switcher Pill Bar (Humanto style) */}
            <div
              style={{
                display: "flex",
                backgroundColor: rawTokens.surfaceSubtle,
                padding: "4px",
                borderRadius: rawTokens.radiusFull,
                border: `1px solid ${rawTokens.borderSubtle}`,
                gap: "4px",
              }}
            >
              {roles.map((r) => {
                const isSelected = activeRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => onSelectRole(r.id as any)}
                    style={{
                      border: "none",
                      backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                      color: isSelected
                        ? rawTokens.colorAction
                        : rawTokens.textSecondary,
                      padding: "6px 14px",
                      borderRadius: rawTokens.radiusFull,
                      fontSize: "11px",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      boxShadow: isSelected
                        ? "0 1px 4px rgba(0,0,0,0.06)"
                        : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heading dynamic to persona */}
          <div style={{ maxWidth: "880px", marginTop: "8px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
              }}
            >
              {activeRole === "STEWARD" &&
                "Good morning. Here's your catalog stewardship queue."}
              {activeRole === "PROCUREMENT_OFFICER" &&
                "Pre-Procurement Discovery & Pooled Demand Dashboard."}
              {activeRole === "PLANT_ENGINEER" &&
                "Emergency Spare Discovery & Inter-Refinery Surplus Inventory."}
              {activeRole === "AUDITOR" &&
                "Sovereign Catalog Harmonization & Immutable Audit Ledger."}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: rawTokens.textSecondary,
                marginTop: "8px",
                lineHeight: 1.5,
              }}
            >
              {activeRole === "STEWARD" &&
                "Review borderline duplicate clusters (70% - 91% confidence), enforce ASME physical safety gates, and resolve cross-CPSE material discrepancies across IOCL, ONGC, and BPCL."}
              {activeRole === "PROCUREMENT_OFFICER" &&
                "Prevent duplicate purchases by querying national inventories before issuing tenders. Aggregate scheduled CPSE demands to unlock bulk GeM volume discounts."}
              {activeRole === "PLANT_ENGINEER" &&
                "Discover critical insurance spares in neighboring CPSE refineries within 100 km. Initiate digital MTIRF requisitions to eliminate shutdown delays."}
              {activeRole === "AUDITOR" &&
                "Inspect cryptographically signed triage actions, verify append-only SHA-256 decision hashes, and monitor deterministic safety gate disqualification metrics."}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DATA STEWARD VIEW                                                      */}
      {/* ========================================================================= */}
      {activeRole === "STEWARD" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* 4 High-Density KPI Cards with MicroCharts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {/* Review Required */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Review Required
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "rgba(241, 204, 157, 0.4)",
                      color: rawTokens.colorAnchor,
                      padding: "2px 6px",
                      borderRadius: rawTokens.radiusFull,
                    }}
                  >
                    70% - 91% Match
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    84
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: rawTokens.colorAction,
                      fontWeight: 700,
                    }}
                  >
                    +12 today
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  7-day queue intake
                </span>
                <Sparkline
                  data={[45, 52, 60, 58, 67, 72, 84]}
                  color={rawTokens.colorAction}
                />
              </div>
            </div>

            {/* Auto-Approved */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Auto-Approved
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "rgba(165, 215, 201, 0.35)",
                      color: "#0D533A",
                      padding: "2px 6px",
                      borderRadius: rawTokens.radiusFull,
                    }}
                  >
                    &ge; 92% Match
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    1,420
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#0D533A",
                      fontWeight: 700,
                    }}
                  >
                    92.4% rate
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  National SLA Goal: 90%
                </span>
                <BulletMeter
                  value={92.4}
                  target={90}
                  width={90}
                  color="#0D533A"
                />
              </div>
            </div>

            {/* Novel Materials */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Novel Materials
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: rawTokens.surfaceSubtle,
                      color: rawTokens.textSecondary,
                      padding: "2px 6px",
                      borderRadius: rawTokens.radiusFull,
                    }}
                  >
                    &lt; 70% Match
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    18
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: rawTokens.colorVerified,
                      fontWeight: 700,
                    }}
                  >
                    Minting ready
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  Monthly novel items
                </span>
                <SparkBar
                  data={[4, 8, 12, 10, 15, 18]}
                  barColor={rawTokens.colorVerified}
                />
              </div>
            </div>

            {/* Safety Conflicts */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid rgba(155, 18, 30, 0.25)`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.colorConflict,
                      textTransform: "uppercase",
                    }}
                  >
                    Safety Conflicts
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "rgba(155, 18, 30, 0.15)",
                      color: rawTokens.colorConflict,
                      padding: "2px 6px",
                      borderRadius: rawTokens.radiusFull,
                    }}
                  >
                    Hard Gate Block
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.colorConflict,
                    }}
                  >
                    7
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: rawTokens.colorConflict,
                      fontWeight: 700,
                    }}
                  >
                    Zero tolerance
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  Disqualification points
                </span>
                <RugPlot
                  values={[0.15, 0.28, 0.45, 0.62, 0.78, 0.88, 0.95]}
                  color={rawTokens.colorConflict}
                />
              </div>
            </div>
          </div>

          {/* Middle Row: Confidence Distribution + Ingestion Jobs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "20px",
            }}
          >
            {/* Confidence Distribution Card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "24px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    Catalog Harmonization Confidence Distribution
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: rawTokens.textSecondary,
                      marginTop: "2px",
                    }}
                  >
                    1,529 records processed in the last 24-hour cycle across
                    BGE-large semantic + ASME rule gating
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("steward")}
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                    borderRadius: rawTokens.radiusFull,
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.colorAction,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Open Triage Cockpit
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* SegBar Representation */}
              <div style={{ margin: "20px 0" }}>
                <SegBar
                  height={12}
                  showLegend={true}
                  segments={[
                    {
                      label: "Auto-Approved (>=92%)",
                      value: 1420,
                      color: "#0D533A",
                    },
                    {
                      label: "Steward Review (70-91%)",
                      value: 84,
                      color: rawTokens.colorHighlight,
                    },
                    {
                      label: "Novel Material (<70%)",
                      value: 18,
                      color: rawTokens.colorAction,
                    },
                    {
                      label: "Fatal Safety Conflict",
                      value: 7,
                      color: rawTokens.colorConflict,
                    },
                  ]}
                />
              </div>

              {/* Threshold explanation strips */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "10px 12px",
                    borderRadius: rawTokens.radiusSm,
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#0D533A",
                    }}
                  >
                    AUTO-APPROVAL ZONE
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: rawTokens.textPrimary,
                      marginTop: "2px",
                    }}
                  >
                    Score &ge; 0.92
                  </div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    Directly merged into ONMC master
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "10px 12px",
                    borderRadius: rawTokens.radiusSm,
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rawTokens.colorAnchor,
                    }}
                  >
                    HITL TRIAGE ZONE
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: rawTokens.textPrimary,
                      marginTop: "2px",
                    }}
                  >
                    0.70 &le; Score &lt; 0.92
                  </div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    Dispatched to Steward Cockpit
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "10px 12px",
                    borderRadius: rawTokens.radiusSm,
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rawTokens.colorConflict,
                    }}
                  >
                    SAFETY GATE INTERCEPT
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: rawTokens.textPrimary,
                      marginTop: "2px",
                    }}
                  >
                    Zero Tolerance
                  </div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    ASME B16.5 / B16.34 mismatch
                  </div>
                </div>
              </div>
            </div>

            {/* Ingestion Pipeline Status Card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "24px",
                boxShadow: rawTokens.shadowSubtle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    Recent Catalog Ingestion Jobs
                  </h3>
                  <button
                    onClick={() => onNavigate("ingest")}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.colorAction,
                      cursor: "pointer",
                    }}
                  >
                    Upload File &rarr;
                  </button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {[
                    {
                      file: "iocl_valves_q3.xlsx",
                      org: "IOCL",
                      rows: 450,
                      approved: "93.3%",
                      time: "10m ago",
                    },
                    {
                      file: "ongc_hazira_spares.csv",
                      org: "ONGC",
                      rows: 280,
                      approved: "89.2%",
                      time: "1h ago",
                    },
                    {
                      file: "bpcl_mumbai_flanges.xlsx",
                      org: "BPCL",
                      rows: 620,
                      approved: "95.1%",
                      time: "3h ago",
                    },
                  ].map((job, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        borderRadius: rawTokens.radiusSm,
                        backgroundColor: rawTokens.surfaceSubtle,
                        border: `1px solid ${rawTokens.borderSubtle}`,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: rawTokens.textPrimary,
                          }}
                        >
                          {job.file}
                        </div>
                        <div
                          style={{
                            fontSize: "10px",
                            color: rawTokens.textMuted,
                          }}
                        >
                          {job.org} • {job.rows} records • {job.time}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#0D533A",
                          backgroundColor: "rgba(165, 215, 201, 0.3)",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {job.approved} match
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 12px",
                  borderRadius: rawTokens.radiusSm,
                  backgroundColor: "rgba(95, 151, 142, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "11px",
                    color: "#0D533A",
                  }}
                >
                  <CheckCircle2 size={14} color="#0D533A" />
                  <span>Redis ARQ Workers: 4 Active (Queue depth: 0)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Priority Triage Queue Preview */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                  }}
                >
                  Priority Triage Items (Requires Data Steward Review)
                </h3>
                <p style={{ fontSize: "12px", color: rawTokens.textSecondary }}>
                  Highest-value borderline materials queued for single-key
                  keyboard approval (<kbd>A</kbd>) or rejection (<kbd>R</kbd>)
                </p>
              </div>
              <button
                onClick={() => onNavigate("steward")}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: rawTokens.radiusFull,
                  padding: "6px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                Inspect in Cockpit &rarr;
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                {
                  org: "IOCL",
                  plant: "Gujarat Refinery",
                  raw: "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
                  candidate: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                  score: 0.88,
                  status: "REVIEW",
                  conflict: null,
                },
                {
                  org: "ONGC",
                  plant: "Hazira Plant",
                  raw: "BALL VALVE 2IN 300LB FLGD WCB BODY (POTENTIAL PRESSURE DISCREPANCY)",
                  candidate: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                  score: 0.74,
                  status: "FATAL CONFLICT",
                  conflict: "Pressure class mismatch (Class 300 vs Class 150)",
                },
                {
                  org: "BPCL",
                  plant: "Mumbai Refinery",
                  raw: 'FLG WN 6" 300LBS RF CS ASTM A-105 SCH40 ASME B16.5',
                  candidate: "ONMC-PIP-FLG-WN-006-300-A105-882E",
                  score: 0.91,
                  status: "REVIEW",
                  conflict: null,
                },
              ].map((row, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate("steward")}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1.5fr 1.5fr 100px 140px",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 14px",
                    borderRadius: rawTokens.radiusSm,
                    backgroundColor:
                      row.status === "FATAL CONFLICT"
                        ? "rgba(155, 18, 30, 0.05)"
                        : rawTokens.surfaceSubtle,
                    border: `1px solid ${row.status === "FATAL CONFLICT" ? "rgba(155, 18, 30, 0.25)" : rawTokens.borderSubtle}`,
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: rawTokens.textPrimary,
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: "3px",
                      textAlign: "center",
                    }}
                  >
                    {row.org}
                  </span>

                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontFamily: rawTokens.fontMono,
                        color: rawTokens.textPrimary,
                      }}
                    >
                      {row.raw}
                    </div>
                    <div
                      style={{ fontSize: "10px", color: rawTokens.textMuted }}
                    >
                      {row.plant}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontFamily: rawTokens.fontMono,
                        fontWeight: 700,
                        color: rawTokens.colorAction,
                      }}
                    >
                      {row.candidate}
                    </div>
                    {row.conflict && (
                      <div
                        style={{
                          fontSize: "10px",
                          color: rawTokens.colorConflict,
                          fontWeight: 700,
                        }}
                      >
                        {row.conflict}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <DonutMicro
                      value={row.score * 100}
                      size={24}
                      color={
                        row.score >= 0.85 ? "#0D533A" : rawTokens.colorAction
                      }
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: rawTokens.fontMono,
                        fontWeight: 700,
                      }}
                    >
                      {(row.score * 100).toFixed(0)}%
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: rawTokens.radiusFull,
                      textAlign: "center",
                      backgroundColor:
                        row.status === "FATAL CONFLICT"
                          ? "rgba(155, 18, 30, 0.15)"
                          : "rgba(241, 204, 157, 0.4)",
                      color:
                        row.status === "FATAL CONFLICT"
                          ? rawTokens.colorConflict
                          : rawTokens.colorAnchor,
                    }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PROCUREMENT OFFICER VIEW                                               */}
      {/* ========================================================================= */}
      {activeRole === "PROCUREMENT_OFFICER" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Prominent Search Before Buy Hero */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusXl,
              border: `1px solid ${rawTokens.borderStrong}`,
              padding: "28px 32px",
              boxShadow: rawTokens.shadowElevated,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <Search size={22} color={rawTokens.colorAction} />
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                }}
              >
                National "Search Before Buy" Discovery Engine
              </h2>
            </div>
            <p
              style={{
                fontSize: "13px",
                color: rawTokens.textSecondary,
                marginBottom: "18px",
              }}
            >
              Mandatory GFR Rule 149 pre-procurement check: discover unallocated
              surplus stock across CPSEs before issuing new purchase
              requisitions.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={searchHeroText}
                onChange={(e) => setSearchHeroText(e.target.value)}
                placeholder="Enter engineering description, ONMC code, or size/pressure ratings..."
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  borderRadius: rawTokens.radiusFull,
                  border: `1px solid ${rawTokens.borderStrong}`,
                  fontSize: "14px",
                  fontFamily: rawTokens.fontSans,
                  outline: "none",
                }}
              />
              <button
                onClick={() => {
                  if (onSearchQuery) onSearchQuery(searchHeroText);
                  onNavigate("search");
                }}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: rawTokens.radiusFull,
                  padding: "12px 28px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>Search National Master</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick preset chips */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "14px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: rawTokens.textMuted,
                  fontWeight: 600,
                }}
              >
                Frequent Searches:
              </span>
              {[
                "2 inch 150# flanged ball valve CS A105",
                '6" 300# weld neck flange ASTM A105',
                "Gasket SPW 3 IN 150# SS316L",
                "Gate valve 4 inch 150# flanged WCB",
              ].map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchHeroText(p);
                    if (onSearchQuery) onSearchQuery(p);
                    onNavigate("search");
                  }}
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                    borderRadius: rawTokens.radiusFull,
                    padding: "3px 10px",
                    fontSize: "11px",
                    color: rawTokens.textSecondary,
                    cursor: "pointer",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 4 KPI Cards for Procurement */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Potential Duplicate Purchases
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.colorAction,
                  marginTop: "8px",
                }}
              >
                ₹3.42 Cr
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                14 pending PRs have existing surplus in sister CPSEs
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Available National Surplus
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: "#0D533A",
                  marginTop: "8px",
                }}
              >
                1,240
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Units across IOCL, ONGC, BPCL, HPCL warehouses
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Pooled Demand Clusters
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.textPrimary,
                  marginTop: "8px",
                }}
              >
                14
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Active commodities ready for joint GeM bidding
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Projected Volume Savings
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: "#0D533A",
                  marginTop: "8px",
                }}
              >
                ₹12.8 Cr
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                14.8% average bulk tender price reduction
              </div>
            </div>
          </div>

          {/* Active Pooled Demand Opportunity Banner */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: "rgba(95, 151, 142, 0.15)",
                  color: "#0D533A",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: rawTokens.radiusFull,
                }}
              >
                FEATURED POOLED TENDER BATCH #BATCH-VLV-2026-Q4
              </span>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "6px",
                }}
              >
                2" 150# Flanged Ball Valve Joint Procurement (2,950 Units
                Consolidated)
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "8px",
                  fontSize: "12px",
                  color: rawTokens.textSecondary,
                }}
              >
                <span>IOCL: 1,200 units</span>
                <span>•</span>
                <span>BPCL: 850 units</span>
                <span>•</span>
                <span>HPCL: 900 units</span>
                <span>•</span>
                <strong style={{ color: "#0D533A" }}>
                  Projected Savings: 14.2% (₹1.14 Crore)
                </strong>
              </div>
            </div>

            <button
              onClick={() => onNavigate("surplus")}
              style={{
                backgroundColor: "#0D533A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "10px 22px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>View Pooled Demand</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PLANT MAINTENANCE ENGINEER VIEW                                        */}
      {/* ========================================================================= */}
      {activeRole === "PLANT_ENGINEER" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Emergency Spare Discovery Banner */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusXl,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px 30px",
              boxShadow: rawTokens.shadowCard,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  backgroundColor: "rgba(233, 67, 68, 0.12)",
                  color: rawTokens.colorAction,
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "3px 8px",
                  borderRadius: rawTokens.radiusFull,
                  letterSpacing: "0.06em",
                }}
              >
                REFINERY EMERGENCY HOTLINE • GFR RULE 149(VIII)
              </span>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "6px",
                }}
              >
                Locate Nearby Insurance Spares Within 100 km
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Current Plant: <strong>IOCL Gujarat Refinery, Vadodara</strong>.
                Neighboring plant stocks reachable in &lt;6 hours.
              </p>
            </div>

            <button
              onClick={() => {
                if (onSearchQuery) onSearchQuery("2 inch 150# ball valve");
                onNavigate("search");
              }}
              style={{
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "10px 22px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Emergency Spare Search</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3 Proximity Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {[
              {
                source: "ONGC Hazira Gas Plant",
                distance: "78 km",
                time: "4.5 hrs transit",
                item: '2" 150# Ball Valve CS A105',
                code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
                qty: 14,
                val: "₹28,500/u",
              },
              {
                source: "BPCL Mumbai Refinery",
                distance: "12 km",
                time: "1.5 hrs transit",
                item: '6" 300# Weld Neck Flange A105',
                code: "ONMC-PIP-FLG-WN-006-300-A105-882E",
                qty: 24,
                val: "₹14,500/u",
              },
              {
                source: "GAIL Vijaipur Petrochemicals",
                distance: "185 km",
                time: "8 hrs transit",
                item: '4" 150# Gate Valve WCB Flanged',
                code: "ONMC-MECH-VLV-GAT-004-150-WCB-44D1",
                qty: 8,
                val: "₹42,000/u",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: rawTokens.radiusLg,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  padding: "20px",
                  boxShadow: rawTokens.shadowSubtle,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.colorAction,
                      }}
                    >
                      {card.source}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: rawTokens.surfaceSubtle,
                        color: rawTokens.textPrimary,
                        padding: "2px 8px",
                        borderRadius: rawTokens.radiusFull,
                      }}
                    >
                      {card.distance}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "10px",
                    }}
                  >
                    {card.item}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textSecondary,
                      marginTop: "2px",
                    }}
                  >
                    {card.code}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "12px",
                    borderTop: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{ fontSize: "11px", color: rawTokens.textMuted }}
                    >
                      Surplus Stock:
                    </span>
                    <strong
                      style={{
                        fontSize: "13px",
                        fontFamily: rawTokens.fontMono,
                        color: "#0D533A",
                      }}
                    >
                      {card.qty} units available
                    </strong>
                  </div>

                  <button
                    onClick={() => onNavigate("surplus")}
                    style={{
                      width: "100%",
                      backgroundColor: rawTokens.surfaceSubtle,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      borderRadius: rawTokens.radiusSm,
                      padding: "6px 12px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <span>Initiate Inter-CPSE Transfer</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Plant Network Topology Visualizer */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: rawTokens.textPrimary,
                marginBottom: "4px",
              }}
            >
              CPSE Inter-Refinery Logistics Grid (Western & Central Zone)
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                marginBottom: "16px",
              }}
            >
              Automated road & pipeline freight calculation for inter-company
              emergency material sharing
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                padding: "16px",
                backgroundColor: rawTokens.surfaceSubtle,
                borderRadius: rawTokens.radiusMd,
              }}
            >
              {[
                {
                  route: "ONGC Hazira → IOCL Gujarat",
                  dist: "78 km",
                  time: "4.5h",
                  status: "Optimal",
                },
                {
                  route: "IOCL Gujarat → BPCL Mumbai",
                  dist: "410 km",
                  time: "9.0h",
                  status: "Active",
                },
                {
                  route: "BPCL Mumbai → HPCL Mumbai",
                  dist: "12 km",
                  time: "1.5h",
                  status: "Immediate",
                },
                {
                  route: "GAIL Vijaipur → IOCL Mathura",
                  dist: "185 km",
                  time: "6.5h",
                  status: "Active",
                },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "12px",
                    borderRadius: rawTokens.radiusSm,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {r.route}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "6px",
                      fontSize: "11px",
                      color: rawTokens.textSecondary,
                    }}
                  >
                    <span>{r.dist}</span>
                    <span>{r.time}</span>
                  </div>
                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#0D533A",
                    }}
                  >
                    {r.status} Transit
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MoPNG / CVC AUDITOR VIEW                                              */}
      {/* ========================================================================= */}
      {activeRole === "AUDITOR" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Humanto-inspired Dark Sovereign Audit Vault Block */}
          <div
            style={{
              backgroundColor: rawTokens.darkVaultBg,
              borderRadius: rawTokens.radiusXl,
              border: `1px solid ${rawTokens.darkVaultBorder}`,
              padding: "28px 32px",
              boxShadow: rawTokens.shadowElevated,
              color: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "rgba(233, 67, 68, 0.2)",
                    color: "#FF8F8F",
                    fontSize: "10px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: rawTokens.radiusFull,
                    letterSpacing: "0.06em",
                  }}
                >
                  CVC SOVEREIGN IMMUTABLE LEDGER
                </span>
                <span style={{ fontSize: "12px", color: "#A0AEC0" }}>
                  Block Height #104,219 • Integrity 100%
                </span>
              </div>
              <h2
                style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}
              >
                Cryptographic Audit Trail & Deterministic Safety Gate
                Verification
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#CBD5E1",
                  marginTop: "6px",
                  maxWidth: "720px",
                  lineHeight: 1.4,
                }}
              >
                Every triage approval, rejection, and code minting action is
                appended to an immutable SHA-256 cryptographic chain signed by
                certified steward MeghRaj JWT tokens.
              </p>
            </div>

            <button
              onClick={() => onNavigate("security")}
              style={{
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "12px 24px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Inspect Audit Ledger</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4 Auditor Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Harmonization Index
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: "#0D533A",
                  marginTop: "8px",
                }}
              >
                88.4%
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                14,890 legacy CPSE items mapped to canonical ONMC
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Deduplication Ratio
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.textPrimary,
                  marginTop: "8px",
                }}
              >
                3.2 : 1
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Average legacy descriptions consolidated per master
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Total Signed Decisions
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.colorAction,
                  marginTop: "8px",
                }}
              >
                2,419
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                100% tamper-evident SHA-256 verified records
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "20px",
                boxShadow: rawTokens.shadowSubtle,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Safety Gate Intercepts
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.colorConflict,
                  marginTop: "8px",
                }}
              >
                142
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Dangerous pressure & metallurgy merges blocked
              </div>
            </div>
          </div>

          {/* Safety Gate Breakdown Card */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "24px",
              boxShadow: rawTokens.shadowSubtle,
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: rawTokens.textPrimary,
                marginBottom: "4px",
              }}
            >
              Deterministic Engineering Safety Gate Disqualification Analysis
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textSecondary,
                marginBottom: "16px",
              }}
            >
              Zero-tolerance physical discrepancies preventing catastrophic
              valve & piping cross-contamination
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(155, 18, 30, 0.06)",
                  borderRadius: rawTokens.radiusMd,
                  border: "1px solid rgba(155, 18, 30, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: rawTokens.colorConflict,
                  }}
                >
                  PRESSURE CLASS MISMATCHES (62%)
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.colorConflict,
                    marginTop: "4px",
                  }}
                >
                  88 Intercepts
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                  }}
                >
                  E.g. Class 300 (51 bar) attempted merge with Class 150 (19
                  bar). Rupture hazard strictly prevented.
                </div>
              </div>

              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(241, 204, 157, 0.15)",
                  borderRadius: rawTokens.radiusMd,
                  border: "1px solid rgba(241, 204, 157, 0.4)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: rawTokens.colorAnchor,
                  }}
                >
                  METALLURGY DIVERGENCE (24%)
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.colorAnchor,
                    marginTop: "4px",
                  }}
                >
                  34 Intercepts
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                  }}
                >
                  Carbon steel (ASTM A105) vs Stainless steel (SS316) chemical
                  incompatibility.
                </div>
              </div>

              <div
                style={{
                  padding: "14px",
                  backgroundColor: "rgba(155, 18, 30, 0.06)",
                  borderRadius: rawTokens.radiusMd,
                  border: "1px solid rgba(155, 18, 30, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: rawTokens.colorConflict,
                  }}
                >
                  SOUR SERVICE / NACE MR0175 (14%)
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.colorConflict,
                    marginTop: "4px",
                  }}
                >
                  20 Intercepts
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                  }}
                >
                  H2S wet acid cracking vulnerability prevented for non-NACE
                  compliant trims.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
