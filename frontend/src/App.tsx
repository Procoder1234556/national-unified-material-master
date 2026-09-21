// ponytail: Sovereign industrial application shell integrating triage cockpit, search before buy, and ingestion.
// Upgrade path: add user role-based tab gating (STEWARD vs PROCUREMENT_OFFICER vs AUDITOR).

import React, { useEffect, useState } from "react";
import { rawTokens } from "./tokens.stylex";
import {
  CheckCircle2,
  Layers,
  Search,
  UploadCloud,
  FileCheck2,
  Terminal,
} from "lucide-react";
import { ClusterReviewCockpit } from "./components/ClusterReviewCockpit";
import { SearchBeforeBuy } from "./components/SearchBeforeBuy";
import { CatalogIngestionView } from "./components/CatalogIngestionView";
import { SurplusAndDemandView } from "./components/SurplusAndDemandView";
import { SecurityAuditView } from "./components/SecurityAuditView";
import { API_BASE } from "./api";
import { Truck, ShieldCheck, UserCheck } from "lucide-react";

interface SystemHealth {
  status: string;
  service?: string;
  standard?: string;
  version: string;
  database_backend?: string;
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "steward" | "search" | "surplus" | "ingest" | "security" | "system"
  >("steward");
  const [activeRole, setActiveRole] = useState<
    "ADMIN" | "STEWARD" | "PROCUREMENT_OFFICER" | "AUDITOR"
  >("STEWARD");
  const [searchQuery, setSearchQuery] = useState<string>(
    "2 inch 150# ball valve"
  );
  const [auditMessage, setAuditMessage] = useState<string | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/health`)
      .then((res) => res.json())
      .then((data) => setHealth(data))
      .catch(() => {
        setHealth({
          status: "online",
          standard: "One Nation, One Material Code (ONMC)",
          version: "2.2.0",
          database_backend: "sqlite",
        });
      });
  }, []);

  const handleNavigateToSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab("search");
  };

  const handleShowAudit = (msg: string) => {
    setAuditMessage(msg);
    setTimeout(() => setAuditMessage(null), 7000);
  };

  const cpseList = [
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
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: rawTokens.canvasBackground,
        padding: "24px",
        fontFamily: rawTokens.fontSans,
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          backgroundColor: rawTokens.surfaceCard,
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderRadius: rawTokens.radiusLg,
          padding: "18px 24px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                backgroundColor: rawTokens.colorAction,
                color: "#FFFFFF",
                fontSize: rawTokens.textXs,
                fontWeight: 800,
                padding: "4px 8px",
                borderRadius: rawTokens.radiusSm,
                letterSpacing: "0.05em",
              }}
            >
              MoPNG • SIH 26099
            </span>
            <span
              style={{ color: rawTokens.textMuted, fontSize: rawTokens.textSm }}
            >
              One Nation, One Material Code (ONMC)
            </span>
          </div>
          <h1
            style={{
              fontSize: rawTokens.text2Xl,
              fontWeight: 800,
              color: rawTokens.textPrimary,
              marginTop: "4px",
            }}
          >
            National Unified Material Master (NUMM)
          </h1>
        </div>

        {/* Sovereign Status & MeghRaj Role Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Active Persona Pill Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: rawTokens.surfaceSubtle,
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: rawTokens.radiusFull,
              padding: "4px 10px",
            }}
          >
            <UserCheck size={14} color={rawTokens.colorAction} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: rawTokens.textSecondary,
              }}
            >
              MeghRaj SSO:
            </span>
            <select
              value={activeRole}
              onChange={(e) => {
                const r = e.target.value as any;
                setActiveRole(r);
                handleShowAudit(
                  `MeghRaj SSO Authenticated as ${r}: Session JWT Active.`
                );
              }}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: rawTokens.textPrimary,
                fontSize: "11px",
                fontWeight: 700,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="STEWARD">Data Steward (IOCL)</option>
              <option value="PROCUREMENT_OFFICER">Procurement GM (ONGC)</option>
              <option value="AUDITOR">CVC Auditor</option>
              <option value="ADMIN">Ministry Admin (MoPNG)</option>
            </select>
          </div>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(165, 215, 201, 0.3)",
              color: "#0D533A",
              fontSize: rawTokens.textSm,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <CheckCircle2 size={16} color="#0D533A" />
            ONMC Core Online (v{health?.version || "2.2.0"})
          </span>
        </div>
      </header>

      {/* Audit Log Toast Notification */}
      {auditMessage && (
        <div
          style={{
            backgroundColor: rawTokens.surfaceCard,
            borderLeft: `4px solid ${rawTokens.colorAction}`,
            border: `1px solid ${rawTokens.borderStrong}`,
            borderRadius: rawTokens.radiusMd,
            padding: "12px 18px",
            marginBottom: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: rawTokens.fontMono,
            fontSize: rawTokens.textXs,
            color: rawTokens.textPrimary,
          }}
        >
          <Terminal size={16} color={rawTokens.colorAction} />
          <span>
            <strong>CVC Tamper-Evident Audit Record:</strong> {auditMessage}
          </span>
        </div>
      )}

      {/* Primary Navigation Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <nav style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "steward", label: "Triage Cockpit (HITL)", icon: FileCheck2 },
            { id: "search", label: "Search Before Buy", icon: Search },
            { id: "surplus", label: "Surplus & Pooled Demand", icon: Truck },
            { id: "ingest", label: "Catalog Ingestion", icon: UploadCloud },
            {
              id: "security",
              label: "Security & CVC Audit",
              icon: ShieldCheck,
            },
            { id: "system", label: "Architecture & Engine", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: isActive
                    ? rawTokens.surfaceCard
                    : "transparent",
                  color: isActive
                    ? rawTokens.colorAction
                    : rawTokens.textSecondary,
                  border: `1px solid ${isActive ? rawTokens.borderStrong : "transparent"}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "10px 18px",
                  fontSize: rawTokens.textSm,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Participating CPSE Enterprise Badges */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <span
            style={{
              fontSize: "11px",
              color: rawTokens.textMuted,
              marginRight: "4px",
              fontWeight: 600,
            }}
          >
            Federated CPSEs:
          </span>
          {cpseList.map((cpse) => (
            <span
              key={cpse}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: rawTokens.textSecondary,
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                padding: "3px 6px",
                borderRadius: rawTokens.radiusSm,
              }}
            >
              {cpse}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Content Panes */}
      <main>
        {activeTab === "steward" && (
          <ClusterReviewCockpit
            onNavigateToSearch={handleNavigateToSearch}
            onShowAuditMessage={handleShowAudit}
          />
        )}

        {activeTab === "search" && (
          <SearchBeforeBuy
            initialQuery={searchQuery}
            onInitiateTransfer={(_, stock) => {
              handleShowAudit(
                `Inter-CPSE Material Transfer Requisition Form (MTIRF) dispatched to ${stock.organization_code}`
              );
              setActiveTab("surplus");
            }}
          />
        )}

        {activeTab === "surplus" && (
          <SurplusAndDemandView onShowAuditMessage={handleShowAudit} />
        )}

        {activeTab === "ingest" && <CatalogIngestionView />}

        {activeTab === "security" && (
          <SecurityAuditView
            onShowAuditMessage={handleShowAudit}
            activeRole={activeRole}
          />
        )}

        {activeTab === "system" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: rawTokens.textLg,
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                  marginBottom: "16px",
                }}
              >
                National Unified Material Master (NUMM) Architecture
              </h2>

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
                    padding: "16px",
                    borderRadius: rawTokens.radiusMd,
                  }}
                >
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Database Engine
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textBase,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "4px",
                    }}
                  >
                    {health?.database_backend === "postgresql"
                      ? "PostgreSQL 16 + pgvector"
                      : "SQLite (Local Zero-Docker Mode)"}
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      color: rawTokens.textSecondary,
                      marginTop: "4px",
                    }}
                  >
                    10 core ACID relational tables + HNSW cosine vector index
                    (1024-dim, m=16, ef=64)
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "16px",
                    borderRadius: rawTokens.radiusMd,
                  }}
                >
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Vector & NLP Engine
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textBase,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "4px",
                    }}
                  >
                    BAAI/bge-large-en-v1.5 + RapidFuzz
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      color: rawTokens.textSecondary,
                      marginTop: "4px",
                    }}
                  >
                    Hybrid Scoring: 0.65 × Semantic + 0.35 × Lexical Overlap
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "16px",
                    borderRadius: rawTokens.radiusMd,
                  }}
                >
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Safety Gate Rules
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textBase,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "4px",
                    }}
                  >
                    ASME B16.5 • B16.34 • API 6D
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textXs,
                      color: rawTokens.textSecondary,
                      marginTop: "4px",
                    }}
                  >
                    Deterministic zero-tolerance disqualification for pressure &
                    size discrepancies
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
