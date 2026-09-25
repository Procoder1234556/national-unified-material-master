import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Layers,
  FileCheck2,
  Search,
  Truck,
  TrendingDown,
  UploadCloud,
  ShieldCheck,
  Cpu,
  Keyboard,
  Bell,
  CheckCircle2,
  Menu,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Building2,
  Plus,
  Home,
  Share2,
  Puzzle,
  Link,
  Globe,
  MoreHorizontal,
  Book,
  Rocket,
  HelpCircle,
  Settings,
} from "lucide-react";

export type NavTabId =
  | "overview"
  | "steward"
  | "search"
  | "surplus"
  | "demand"
  | "ingest"
  | "security"
  | "system";

export type UserRole =
  "STEWARD" | "PROCUREMENT_OFFICER" | "PLANT_ENGINEER" | "AUDITOR";

interface AppShellProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  onOpenCommandPalette: () => void;
  onOpenKeyboardHelp: () => void;
  onBackToLanding?: () => void;
  children: React.ReactNode;
  stewardPendingCount?: number;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onSelectTab,
  activeRole,
  onSelectRole,
  onOpenCommandPalette,
  onOpenKeyboardHelp,
  onBackToLanding,
  children,
  stewardPendingCount = 84,
}) => {
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "steward", label: "Steward Queue" },
    { id: "search", label: "Search Before Buy" },
    { id: "surplus", label: "Surplus" },
    { id: "demand", label: "Pooled Demand" },
    { id: "ingest", label: "Ingestion" },
    { id: "security", label: "Security Vault" },
    { id: "system", label: "Architecture" },
  ];

  const leftNav = [
    { id: "overview" as NavTabId, label: "Overview", icon: Home },
    { id: "steward" as NavTabId, label: "Steward Queue", icon: FileCheck2 },
    { id: "search" as NavTabId, label: "Search Before Buy", icon: Search },
    { id: "surplus" as NavTabId, label: "Surplus Inventory", icon: Truck },
    { id: "demand" as NavTabId, label: "Pooled Demand", icon: Layers },
    { id: "ingest" as NavTabId, label: "Ingestion Engine", icon: UploadCloud },
    {
      id: "security" as NavTabId,
      label: "CVC Security Vault",
      icon: ShieldCheck,
    },
    { id: "system" as NavTabId, label: "Architecture", icon: Cpu },
  ];

  const roleLabels: Record<
    UserRole,
    { short: string; name: string; title: string }
  > = {
    STEWARD: {
      short: "RS",
      name: "Rameshwar Sharma",
      title: "Data Steward (IOCL Mathura)",
    },
    PROCUREMENT_OFFICER: {
      short: "PV",
      name: "Priya Venkatraman",
      title: "Procurement Officer (MoPNG/EIL)",
    },
    PLANT_ENGINEER: {
      short: "HS",
      name: "Harpreet Singh",
      title: "Maintenance Superintendent (ONGC Hazira)",
    },
    AUDITOR: { short: "SG", name: "S. K. Gupta", title: "CVC Auditor (MoPNG)" },
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `,
        }}
      />

      <div
        style={{
          display: "flex",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
          flex: 1,
          padding: "12px",
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: "80px",
            backgroundColor: "#111315",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px 0",
            gap: "16px",
          }}
        >
          {/* Sovereign MoPNG Flame Logo */}
          <div
            onClick={onBackToLanding}
            title="Ministry of Petroleum & Natural Gas - Return to National Portal"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #E94344 0%, #9B121E 100%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              marginBottom: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(233, 67, 68, 0.4)",
            }}
          >
            <ShieldAlert size={22} />
          </div>

          {/* Authentic Navigation Rail */}
          {leftNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                id={`rail-nav-${item.id}`}
                data-nav={item.id}
                onClick={() => onSelectTab(item.id)}
                title={item.label}
                style={{
                  color: isActive ? "white" : "#94A3B8",
                  backgroundColor: isActive ? "#2A2D32" : "transparent",
                  padding: "10px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={20} />
                {item.id === "steward" && stewardPendingCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#E94344",
                    }}
                  />
                )}
              </div>
            );
          })}

          <div style={{ flex: 1 }} />

          {/* User Persona Avatar */}
          <div
            title={`${roleLabels[activeRole]?.name} • ${roleLabels[activeRole]?.title}`}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#5F978E",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {roleLabels[activeRole]?.short || "CP"}
          </div>
        </div>

        {/* Main Area */}
        <div
          style={{
            flex: 1,
            padding: "32px 40px",
            display: "flex",
            gap: "40px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              maxWidth: "100%",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#5F978E",
                      backgroundColor: "rgba(95, 151, 142, 0.12)",
                      padding: "3px 9px",
                      borderRadius: "4px",
                    }}
                  >
                    Ministry of Petroleum & Natural Gas
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#9B121E",
                      backgroundColor: "rgba(155, 18, 30, 0.10)",
                      padding: "3px 9px",
                      borderRadius: "4px",
                    }}
                  >
                    SIH 26099 · ONMC
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#593C32",
                      backgroundColor: "rgba(241, 204, 157, 0.45)",
                      padding: "3px 9px",
                      borderRadius: "4px",
                    }}
                    title="No NIC MeghRaj or SAP credentials required — integrations are simulated seams for evaluation"
                  >
                    Demo Mode · Simulated MeghRaj SSO · Simulated SAP
                  </span>
                </div>
                <h1
                  style={{
                    fontSize: "38px",
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.15,
                    color: "#111315",
                    letterSpacing: "-0.02em",
                  }}
                >
                  National Unified Material Master (NUMM)
                </h1>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#64748B",
                    marginTop: "6px",
                    fontWeight: 500,
                  }}
                >
                  Active Persona:{" "}
                  <strong style={{ color: "#0F172A" }}>
                    {roleLabels[activeRole]?.name}
                  </strong>{" "}
                  ({roleLabels[activeRole]?.title})
                  <span style={{ color: "#94A3B8" }}>
                    {" "}
                    · local JWT (no cloud SSO)
                  </span>
                </div>
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <a
                  href="/gentelella/dist/production/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "100px",
                    backgroundColor: "#E94344",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(233, 67, 68, 0.25)",
                  }}
                  title="Open Full CPSE Management Portal"
                >
                  <ExternalLink size={14} />
                  Full Portal
                </a>
                <div
                  onClick={onOpenKeyboardHelp}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#F4F5F7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  title="Keyboard Shortcuts (?)"
                >
                  <Keyboard size={18} />
                </div>
                <div
                  onClick={onOpenCommandPalette}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: "#F4F5F7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  title="Command Palette (Ctrl+K)"
                >
                  <Search size={18} />
                </div>
                <select
                  value={activeRole}
                  onChange={(e) => onSelectRole(e.target.value as UserRole)}
                  style={{
                    backgroundColor: "#111315",
                    color: "white",
                    border: "none",
                    borderRadius: "100px",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    appearance: "none",
                    outline: "none",
                  }}
                >
                  <option value="STEWARD">R. Sharma (Steward - IOCL)</option>
                  <option value="PROCUREMENT_OFFICER">
                    P. Venkatraman (Procurement - EIL)
                  </option>
                  <option value="PLANT_ENGINEER">
                    H. Singh (Engineer - ONGC)
                  </option>
                  <option value="AUDITOR">S. K. Gupta (Auditor - CVC)</option>
                </select>
              </div>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
              className="hide-scrollbar"
            >
              {navItems.map((tab) => (
                <div
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  data-tab={tab.id}
                  onClick={() => onSelectTab(tab.id as NavTabId)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "100px",
                    backgroundColor:
                      activeTab === tab.id ? "#111315" : "transparent",
                    color: activeTab === tab.id ? "white" : "#6B7280",
                    fontWeight: 500,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}{" "}
                  {tab.id === "steward" && (
                    <span style={{ marginLeft: "6px", opacity: 0.8 }}>
                      ({stewardPendingCount})
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Children rendered below tabs */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
