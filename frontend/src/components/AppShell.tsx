// ponytail: Enterprise AppShell layout combining Humanto editorial design with Watermelon UI enterprise blocks.
// Desktop left sidebar, topbar breadcrumbs, MeghRaj SSO status, and responsive workspace container.

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
  UserCheck,
  CheckCircle2,
  Menu,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Building2,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const navItems = [
    { id: "overview", label: "Overview", icon: Layers, badge: null },
    {
      id: "steward",
      label: "Steward Queue",
      icon: FileCheck2,
      badge: `${stewardPendingCount}`,
    },
    { id: "search", label: "Search Before Buy", icon: Search, badge: null },
    { id: "surplus", label: "Surplus Stock", icon: Truck, badge: "14 Near" },
    {
      id: "demand",
      label: "Pooled Demand",
      icon: TrendingDown,
      badge: "₹1.14 Cr",
    },
    {
      id: "ingest",
      label: "Catalog Ingestion",
      icon: UploadCloud,
      badge: null,
    },
    {
      id: "security",
      label: "Audit & Ledger",
      icon: ShieldCheck,
      badge: "CVC",
    },
    { id: "system", label: "Engine Architecture", icon: Cpu, badge: null },
  ];

  const roleLabels: Record<
    UserRole,
    { title: string; org: string; avatar: string }
  > = {
    STEWARD: { title: "Rajesh Sharma", org: "IOCL Lead Steward", avatar: "RS" },
    PROCUREMENT_OFFICER: {
      title: "Priya Nair",
      org: "ONGC Materials GM",
      avatar: "PN",
    },
    PLANT_ENGINEER: {
      title: "Amitabh Sen",
      org: "Gujarat Refinery Plant",
      avatar: "AS",
    },
    AUDITOR: {
      title: "CVC Inspectorate",
      org: "MoPNG Audit Cell",
      avatar: "CV",
    },
  };

  const currentProfile = roleLabels[activeRole];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: rawTokens.canvasBackground,
        color: rawTokens.textPrimary,
        fontFamily: rawTokens.fontSans,
      }}
    >
      {/* ========================================================================= */}
      {/* DESKTOP LEFT SIDEBAR                                                      */}
      {/* ========================================================================= */}
      <aside
        style={{
          width: sidebarCollapsed ? "72px" : "260px",
          backgroundColor: "#FFFFFF",
          borderRight: `1px solid ${rawTokens.borderSubtle}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          height: "100vh",
          transition: "width 0.2s ease",
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        {/* Top Branding Section */}
        <div>
          <div
            style={{
              padding: sidebarCollapsed ? "16px 12px" : "18px 20px",
              borderBottom: `1px solid ${rawTokens.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: sidebarCollapsed ? "center" : "space-between",
            }}
          >
            {!sidebarCollapsed ? (
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: rawTokens.radiusSm,
                      backgroundColor: rawTokens.colorAction,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "14px",
                      letterSpacing: "-0.05em",
                    }}
                  >
                    N
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color: rawTokens.textPrimary,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      NUMM MASTER
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        color: rawTokens.textMuted,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                      }}
                    >
                      MoPNG • SIH 26099
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "8px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(95, 151, 142, 0.12)",
                    fontSize: "9px",
                    fontWeight: 800,
                    color: "#0D533A",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#0D533A",
                    }}
                  />
                  PRODUCTION • ONMC CORE
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: rawTokens.radiusSm,
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "16px",
                }}
              >
                N
              </div>
            )}

            <button
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              style={{
                background: "none",
                border: "none",
                color: rawTokens.textMuted,
                cursor: "pointer",
                padding: "4px",
                display: sidebarCollapsed ? "none" : "flex",
              }}
            >
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id as NavTabId)}
                  title={sidebarCollapsed ? item.label : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: sidebarCollapsed
                      ? "center"
                      : "space-between",
                    padding: sidebarCollapsed ? "10px 0" : "9px 12px",
                    borderRadius: rawTokens.radiusMd,
                    backgroundColor: isActive
                      ? "rgba(233, 67, 68, 0.08)"
                      : "transparent",
                    color: isActive
                      ? rawTokens.colorAction
                      : rawTokens.textSecondary,
                    border: "none",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.12s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Icon
                      size={17}
                      color={
                        isActive
                          ? rawTokens.colorAction
                          : rawTokens.textSecondary
                      }
                    />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: rawTokens.radiusFull,
                        backgroundColor: isActive
                          ? rawTokens.colorAction
                          : rawTokens.surfaceSubtle,
                        color: isActive ? "#FFFFFF" : rawTokens.textMuted,
                        border: `1px solid ${isActive ? "transparent" : rawTokens.borderSubtle}`,
                        fontFamily: rawTokens.fontMono,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & MeghRaj SSO Panel */}
        <div
          style={{
            padding: sidebarCollapsed ? "12px 6px" : "14px",
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: rawTokens.surfaceSubtle,
          }}
        >
          {!sidebarCollapsed ? (
            <div>
              {/* Persona Selector Dropdown */}
              <div style={{ marginBottom: "10px" }}>
                <label
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    textTransform: "uppercase",
                  }}
                >
                  Active Persona:
                </label>
                <select
                  value={activeRole}
                  onChange={(e) => onSelectRole(e.target.value as UserRole)}
                  style={{
                    width: "100%",
                    marginTop: "2px",
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusSm,
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="STEWARD">Data Steward (IOCL)</option>
                  <option value="PROCUREMENT_OFFICER">
                    Procurement GM (ONGC)
                  </option>
                  <option value="PLANT_ENGINEER">
                    Plant Maintenance (Gujarat)
                  </option>
                  <option value="AUDITOR">MoPNG / CVC Auditor</option>
                </select>
              </div>

              {/* Profile Card */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: rawTokens.colorAnchor,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "11px",
                  }}
                >
                  {currentProfile.avatar}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentProfile.title}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: rawTokens.textMuted,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {currentProfile.org}
                  </div>
                </div>
              </div>

              {/* MeghRaj SSO status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "10px",
                  fontSize: "10px",
                  color: "#0D533A",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#0D533A",
                  }}
                />
                <span>NIC MeghRaj SSO Active (JWT)</span>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                title={`${currentProfile.title} (${currentProfile.org})`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: rawTokens.colorAnchor,
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "11px",
                  cursor: "pointer",
                }}
              >
                {currentProfile.avatar}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN VIEWPORT CONTAINER                                                   */}
      {/* ========================================================================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top Bar (Breadcrumbs, Cmd+K, Notification, Shortcuts) */}
        <header
          style={{
            height: "56px",
            backgroundColor: "#FFFFFF",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 90,
          }}
        >
          {/* Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
            }}
          >
            {onBackToLanding ? (
              <button
                onClick={onBackToLanding}
                style={{
                  background: "none",
                  border: "none",
                  color: rawTokens.colorAction,
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(233, 67, 68, 0.08)",
                }}
              >
                &larr; Public Portal
              </button>
            ) : (
              <span style={{ color: rawTokens.textMuted, fontWeight: 500 }}>
                NUMM
              </span>
            )}
            <span style={{ color: rawTokens.borderStrong }}>/</span>
            <span style={{ fontWeight: 700, color: rawTokens.textPrimary }}>
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
            <span style={{ color: rawTokens.borderStrong }}>/</span>
            <span style={{ color: rawTokens.textSecondary, fontSize: "12px" }}>
              Federated CPSE Master
            </span>
          </div>

          {/* Right Action Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Command Palette Trigger (Ctrl+K) */}
            <button
              onClick={onOpenCommandPalette}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: rawTokens.surfaceSubtle,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusFull,
                padding: "6px 14px",
                fontSize: "12px",
                color: rawTokens.textSecondary,
                cursor: "pointer",
              }}
            >
              <Search size={14} color={rawTokens.textMuted} />
              <span>Quick search master or codes...</span>
              <kbd
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${rawTokens.borderStrong}`,
                  borderRadius: "3px",
                  padding: "1px 5px",
                  fontSize: "10px",
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.textMuted,
                }}
              >
                Ctrl K
              </kbd>
            </button>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={onOpenKeyboardHelp}
              title="Keyboard shortcuts (?)"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: rawTokens.surfaceSubtle,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusSm,
                padding: "6px 10px",
                fontSize: "12px",
                fontWeight: 600,
                color: rawTokens.textSecondary,
                cursor: "pointer",
              }}
            >
              <Keyboard size={14} />
              <span>(?)</span>
            </button>

            {/* Notifications Popover Trigger */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotificationMenu((prev) => !prev)}
                title="System notifications"
                style={{
                  position: "relative",
                  background: "none",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusSm,
                  padding: "6px 8px",
                  cursor: "pointer",
                  color: rawTokens.textSecondary,
                  backgroundColor: rawTokens.surfaceSubtle,
                  display: "flex",
                }}
              >
                <Bell size={15} />
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: rawTokens.colorConflict,
                  }}
                />
              </button>

              {showNotificationMenu && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "36px",
                    width: "300px",
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusMd,
                    boxShadow: rawTokens.shadowCard,
                    padding: "12px",
                    zIndex: 200,
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      marginBottom: "8px",
                    }}
                  >
                    OPERATIONAL ALERTS
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px",
                        backgroundColor: "rgba(155, 18, 30, 0.08)",
                        borderRadius: "4px",
                      }}
                    >
                      <strong style={{ color: rawTokens.colorConflict }}>
                        Fatal Safety Gate Intercept
                      </strong>
                      <div
                        style={{
                          fontSize: "11px",
                          color: rawTokens.textSecondary,
                          marginTop: "2px",
                        }}
                      >
                        Pressure class 300 vs 150 mismatch intercepted in ONGC
                        Hazira batch.
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "8px",
                        backgroundColor: rawTokens.surfaceSubtle,
                        borderRadius: "4px",
                      }}
                    >
                      <strong>Pooled Demand Batch Ready</strong>
                      <div
                        style={{
                          fontSize: "11px",
                          color: rawTokens.textSecondary,
                          marginTop: "2px",
                        }}
                      >
                        2,950 ball valves consolidated for Q4 joint GeM bidding.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Core Online Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "rgba(165, 215, 201, 0.35)",
                color: "#0D533A",
                padding: "4px 10px",
                borderRadius: rawTokens.radiusFull,
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              <CheckCircle2 size={13} color="#0D533A" />
              <span>ONMC Core v2.2.0</span>
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main
          style={{
            flex: 1,
            padding: "24px",
            maxWidth: "1800px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>

        {/* Minimal Industrial Footer */}
        <footer
          style={{
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: "#FFFFFF",
            padding: "16px 24px",
            fontSize: "11px",
            color: rawTokens.textMuted,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: rawTokens.textSecondary }}>
              NUMM
            </span>
            <span>•</span>
            <span>One Nation, One Material Code (ONMC)</span>
            <span>•</span>
            <span>MoPNG • SIH 26099</span>
            <span>•</span>
            <span>Version 2.2.0 (Sovereign Production)</span>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ color: "#0D533A", fontWeight: 700 }}>
              ● All Systems Operational
            </span>
            <span>CVC Audit Compliance</span>
            <span>GFR Rule 149 Mandate</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
