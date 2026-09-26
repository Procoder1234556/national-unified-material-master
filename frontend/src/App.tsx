// ponytail: Sovereign industrial application shell integrating Humanto editorial design, microcharts, and Watermelon UI blocks.
// Adheres strictly to NUMM color tokens, keyboard-first workflows, and deterministic ASME safety gates.

import React, { useEffect, useState } from "react";
import { rawTokens } from "./tokens.stylex";
import { AppShell, NavTabId, UserRole } from "./components/AppShell";
import { NummDashboard } from "./components/dashboard/NummDashboard";
import { ClusterReviewCockpit } from "./components/ClusterReviewCockpit";
import { SearchBeforeBuy } from "./components/SearchBeforeBuy";
import { CatalogIngestionView } from "./components/CatalogIngestionView";
import { SurplusAndDemandView } from "./components/SurplusAndDemandView";
import { SecurityAuditView } from "./components/SecurityAuditView";
import { CommandPalette } from "./components/CommandPalette";
import { KeyboardHelpModal } from "./components/KeyboardHelpModal";
import {
  ONMCDetailDrawer,
  ONMCDetailData,
} from "./components/ONMCDetailDrawer";
import { TransferModal } from "./components/TransferModal";
import { LandingPage } from "./components/LandingPage";
import {
  Terminal,
  ShieldCheck,
  Database,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { authenticateAsRole, AuthRole, getAuthSession } from "./api";

export const App: React.FC = () => {
  const getInitialView = (): "landing" | "dashboard" => {
    if (typeof window === "undefined") return "landing";
    const params = new URLSearchParams(window.location.search);
    if (params.get("view") === "dashboard" || params.has("tab"))
      return "dashboard";
    if (
      typeof document !== "undefined" &&
      document.referrer.includes("gentelella")
    )
      return "dashboard";
    return "landing";
  };

  const getInitialTab = (): NavTabId => {
    if (typeof window === "undefined") return "overview";
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") as NavTabId;
    const validTabs: NavTabId[] = [
      "overview",
      "steward",
      "search",
      "surplus",
      "demand",
      "ingest",
      "security",
      "system",
    ];
    if (tab && validTabs.includes(tab)) return tab;
    return "overview";
  };

  const [viewMode, setViewMode] = useState<"landing" | "dashboard">(
    getInitialView
  );
  const [activeTab, setActiveTab] = useState<NavTabId>(getInitialTab);
  const [activeRole, setActiveRole] = useState<UserRole>("STEWARD");
  const [authEmail, setAuthEmail] = useState<string>(
    "steward.iocl@numm.gov.in"
  );
  const [stewardPendingCount, setStewardPendingCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(
    "2 inch 150# flanged ball valve CS A105"
  );
  const [auditMessage, setAuditMessage] = useState<string | null>(null);

  const handleSelectTab = (tab: NavTabId) => {
    setActiveTab(tab);
    if (typeof window !== "undefined" && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "dashboard");
      url.searchParams.set("tab", tab);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleEnterDashboard = (targetTab?: string, targetRole?: string) => {
    if (targetTab) setActiveTab(targetTab as NavTabId);
    if (targetRole) setActiveRole(targetRole as UserRole);
    setViewMode("dashboard");
    if (typeof window !== "undefined" && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "dashboard");
      if (targetTab) url.searchParams.set("tab", targetTab);
      window.history.replaceState({}, "", url.toString());
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setViewMode("landing");
    if (typeof window !== "undefined" && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete("view");
      url.searchParams.delete("tab");
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Global Modals State
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [drawerData, setDrawerData] = useState<ONMCDetailData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [transferData, setTransferData] = useState<any>(null);
  const [isTransferOpen, setIsTransferOpen] = useState<boolean>(false);

  const handleShowAudit = (msg: string) => {
    setAuditMessage(msg);
    setTimeout(() => setAuditMessage(null), 7000);
  };

  // MeghRaj demo JWT for active persona
  useEffect(() => {
    let cancelled = false;
    authenticateAsRole(activeRole as AuthRole)
      .then((s) => {
        if (cancelled) return;
        setAuthEmail(s.email);
        handleShowAudit(
          `SIH demo persona: ${s.fullName} (${s.role}) · ${s.organizationCode} · simulated MeghRaj JWT`
        );
      })
      .catch((err) => {
        console.error("Auth bootstrap failed", err);
      });
    return () => {
      cancelled = true;
    };
  }, [activeRole]);

  // Global hotkeys: Ctrl+K / Cmd+K and ?
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      } else if (
        e.key === "?" &&
        !isCommandOpen &&
        !isDrawerOpen &&
        !isTransferOpen
      ) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          target.tagName !== "SELECT"
        ) {
          e.preventDefault();
          setIsHelpOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen, isDrawerOpen, isTransferOpen]);

  const handleOpenDetailDrawer = (onmcCode: string) => {
    // Generate contextual detail for the requested code
    let desc = "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D";
    let itemClass = "BALL VALVE";
    let sizeInch = 2.0;
    let sizeMm = 50;
    let pressure = 150;
    let metallurgy = "ASTM A105";

    if (onmcCode.includes("FLG")) {
      desc = "FLANGE WELD NECK 6 INCH 300# RF CS ASTM A105 SCH 40 ASME B16.5";
      itemClass = "WELD NECK FLANGE";
      sizeInch = 6.0;
      sizeMm = 150;
      pressure = 300;
    } else if (onmcCode.includes("GSK")) {
      desc =
        "GASKET SPIRAL WOUND 3 INCH 150# SS316L GRAPHITE FILLER ASME B16.20";
      itemClass = "SPIRAL WOUND GASKET";
      sizeInch = 3.0;
      sizeMm = 80;
      metallurgy = "SS316L / Graphite";
    }

    setDrawerData({
      onmcCode,
      canonicalDescription: desc,
      itemClass,
      sizeInch,
      sizeMm,
      pressureClass: pressure,
      metallurgy,
      endConnection: "FLANGED RF",
      standard: "API 6D / ASME B16.34",
      shellMescCode: "74.16.01.015.1",
      unspscCode: "40141607",
      gemCategoryId: "52161500",
      totalStock: 28,
      participatingCpseCount: 3,
      confidenceScore: 0.98,
    });
    setIsDrawerOpen(true);
  };

  const handleOpenTransferModal = (
    onmcCode?: string,
    plantLocation?: string
  ) => {
    setTransferData({
      onmcCode: onmcCode || "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
      description: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
      sourceOrg: "ONGC",
      sourcePlant: plantLocation || "Hazira Gas Processing Plant",
      destOrg: "IOCL",
      destPlant: "Gujarat Refinery, Vadodara",
      availableStock: 14,
      unitPrice: 28500,
      distanceKm: 78,
    });
    setIsTransferOpen(true);
  };

  if (viewMode === "landing") {
    return (
      <LandingPage
        onEnterDashboard={(targetTab, targetRole) =>
          handleEnterDashboard(targetTab, targetRole)
        }
      />
    );
  }

  return (
    <AppShell
      activeTab={activeTab}
      onSelectTab={handleSelectTab}
      activeRole={activeRole}
      onSelectRole={(role) => {
        setActiveRole(role);
      }}
      onOpenCommandPalette={() => setIsCommandOpen(true)}
      onOpenKeyboardHelp={() => setIsHelpOpen(true)}
      onBackToLanding={handleBackToLanding}
      stewardPendingCount={stewardPendingCount}
    >
      {/* CVC Tamper-Evident Audit Record Notification Toast */}
      {auditMessage && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderLeft: `4px solid ${rawTokens.colorAction}`,
            border: `1px solid ${rawTokens.borderStrong}`,
            borderRadius: rawTokens.radiusMd,
            padding: "12px 18px",
            marginBottom: "20px",
            boxShadow: rawTokens.shadowElevated,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: rawTokens.fontMono,
            fontSize: "12px",
            color: rawTokens.textPrimary,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <Terminal size={16} color={rawTokens.colorAction} />
          <span>
            <strong>CVC Immutable Audit Chain Event:</strong> {auditMessage}
          </span>
        </div>
      )}

      {/* Main Tab Panes */}
      {activeTab === "overview" && (
        <NummDashboard
          activeRole={activeRole}
          onSelectRole={(role) => setActiveRole(role as UserRole)}
          onNavigateView={(view, q) => {
            if (q) setSearchQuery(q);
            setActiveTab(view as NavTabId);
          }}
          onShowAudit={handleShowAudit}
          onInspectONMC={handleOpenDetailDrawer}
          stewardPendingCount={stewardPendingCount}
          onQueueCountChange={setStewardPendingCount}
        />
      )}

      {activeTab === "steward" && (
        <ClusterReviewCockpit
          actorEmail={authEmail || getAuthSession()?.email}
          onQueueCountChange={setStewardPendingCount}
          onNavigateToSearch={(q) => {
            setSearchQuery(q);
            setActiveTab("search");
          }}
          onShowAuditMessage={handleShowAudit}
          onInspectONMC={handleOpenDetailDrawer}
          onOpenKeyboardHelp={() => setIsHelpOpen(true)}
        />
      )}

      {activeTab === "search" && (
        <SearchBeforeBuy
          initialQuery={searchQuery}
          onInitiateTransfer={(_, stock) => {
            handleOpenTransferModal(undefined, stock.plant_location);
          }}
          onInspectONMC={handleOpenDetailDrawer}
        />
      )}

      {activeTab === "surplus" && (
        <SurplusAndDemandView
          onShowAuditMessage={handleShowAudit}
          defaultSubTab="surplus"
          onInspectONMC={handleOpenDetailDrawer}
        />
      )}

      {activeTab === "demand" && (
        <SurplusAndDemandView
          onShowAuditMessage={handleShowAudit}
          defaultSubTab="demand"
          onInspectONMC={handleOpenDetailDrawer}
        />
      )}

      {activeTab === "ingest" && <CatalogIngestionView />}

      {activeTab === "security" && (
        <SecurityAuditView
          onShowAuditMessage={handleShowAudit}
          activeRole={activeRole}
        />
      )}

      {activeTab === "system" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: rawTokens.radiusLg,
              padding: "28px",
              boxShadow: rawTokens.shadowSubtle,
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
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: rawTokens.radiusMd,
                  backgroundColor: "rgba(233, 67, 68, 0.1)",
                  color: rawTokens.colorAction,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Layers size={20} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: rawTokens.colorAction,
                    letterSpacing: "0.06em",
                  }}
                >
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                  }}
                >
                  National Unified Material Master (NUMM) Engine
                </h2>
              </div>
            </div>

            <p
              style={{
                fontSize: "13px",
                color: rawTokens.textSecondary,
                marginBottom: "16px",
                lineHeight: 1.5,
              }}
            >
              SIH 26099 evaluation build. Core harmonization engine runs fully
              offline (SQLite + FastAPI + React). NIC MeghRaj SSO and CPSE SAP
              are <strong>simulated integration seams</strong> — no cloud or ERP
              credentials required to win the demo. Production adapters plug
              into the same API surface (see <code>SIH_DEMO.md</code>).
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(165, 215, 201, 0.25)",
                  border: `1px solid ${rawTokens.colorVerified}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: rawTokens.colorVerified,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Live on this laptop (judge demo)
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    fontSize: "12px",
                    color: rawTokens.textPrimary,
                    lineHeight: 1.55,
                  }}
                >
                  <li>Ingest · normalize · safety gate · ONMC mint</li>
                  <li>Steward HITL · Search Before Buy</li>
                  <li>Surplus / MTIRF · pooled demand / GeM package</li>
                  <li>CVC SHA-256 audit verify + export</li>
                </ul>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(241, 204, 157, 0.35)",
                  border: `1px solid ${rawTokens.colorHighlight}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    color: rawTokens.colorAnchor,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Simulated for SIH (production upgrade)
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "18px",
                    fontSize: "12px",
                    color: rawTokens.textPrimary,
                    lineHeight: 1.55,
                  }}
                >
                  <li>MeghRaj SSO → local signed demo JWTs</li>
                  <li>SAP VL01N / ME21N / BAPI → document IDs + toast</li>
                  <li>GeM portal push → in-app tender package</li>
                  <li>Postgres HNSW / Redis ARQ → SQLite in-process</li>
                </ul>
              </div>
            </div>

            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textMuted,
                marginBottom: "24px",
                lineHeight: 1.45,
              }}
            >
              Target production stack (TECH_STACK.md): PostgreSQL 16 + pgvector,
              Redis workers, real NIC MeghRaj SAML/OIDC, steward-gated SAP RFC.
              Not required for SIH evaluation.
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
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "18px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderSubtle}`,
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
                  Demo storage
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "4px",
                  }}
                >
                  SQLite · Postgres-ready
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Zero-Docker laptop demo. Same schema + Alembic path for
                  PostgreSQL 16 + pgvector when MoPNG cloud is available.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "18px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderSubtle}`,
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
                  NLP & Vector Embeddings
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "4px",
                  }}
                >
                  BAAI/bge-large-en-v1.5 + RapidFuzz
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Hybrid score formulation: 0.65 × Semantic Cosine + 0.35 ×
                  Lexical Token Overlap. 250+ Oil & Gas technical abbreviation
                  expansions.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "18px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderSubtle}`,
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
                  Safety Gate Standards
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "4px",
                  }}
                >
                  ASME B16.5 • B16.34 • API 6D
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  Deterministic zero-tolerance disqualification for pressure
                  class mismatches (Class 150 vs 300) and metallurgical
                  incompatibilities.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={(tabId) => setActiveTab(tabId as NavTabId)}
        onSearchQuery={(q) => {
          setSearchQuery(q);
          setActiveTab("search");
        }}
        onOpenKeyboardHelp={() => setIsHelpOpen(true)}
      />

      {/* Global Keyboard Shortcut Modal (?) */}
      <KeyboardHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Slide-over ONMC Material Detail Drawer */}
      <ONMCDetailDrawer
        isOpen={isDrawerOpen}
        data={drawerData}
        onClose={() => setIsDrawerOpen(false)}
        onInitiateTransfer={() => {
          setIsDrawerOpen(false);
          handleOpenTransferModal(drawerData?.onmcCode);
        }}
      />

      {/* Inter-CPSE Material Transfer Requisition Form (MTIRF) Modal */}
      {isTransferOpen && (
        <TransferModal
          isOpen={isTransferOpen}
          initialData={transferData}
          onClose={() => setIsTransferOpen(false)}
          onComplete={(docNumber) => {
            handleShowAudit(
              `MTIRF ${docNumber} approved · simulated MeghRaj e-Sign · simulated SAP VL01N/ME21N.`
            );
          }}
        />
      )}
    </AppShell>
  );
};

export default App;
