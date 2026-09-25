// ponytail: Contextual secondary navigation sidebar adapted for NUMM operations.
// Upgrade path: add collapsible mode toggle.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  LayoutDashboard,
  ClipboardList,
  Boxes,
  Database,
  ShieldAlert,
  BookOpen,
  History,
  Search,
} from "lucide-react";

export interface SecondarySidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  activeRole: string;
  onChangeRole: (role: string) => void;
  onTriggerSearchBeforeBuy: () => void;
}

export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({
  currentView,
  onSelectView,
  activeRole,
  onChangeRole,
  onTriggerSearchBeforeBuy,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    {
      id: "review_queue",
      label: "Review Queue",
      icon: ClipboardList,
      badge: "POC",
    },
    { id: "clusters", label: "Material Clusters", icon: Boxes },
    { id: "ingestion", label: "Ingestion Jobs", icon: Database, badge: "3" },
    {
      id: "conflicts",
      label: "Safety Conflicts",
      icon: ShieldAlert,
      badgeAlert: "1",
    },
    { id: "catalog", label: "ONMC Catalog", icon: BookOpen },
    { id: "audit", label: "Audit Trail", icon: History },
  ];

  return (
    <aside
      style={{
        width: "185px",
        minWidth: "185px",
        backgroundColor: "#FCFCFD",
        borderRight: `1px solid ${rawTokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px 10px 14px 10px",
        userSelect: "none",
        zIndex: 15,
      }}
    >
      <div>
        {/* Header Branding */}
        <div
          style={{
            padding: "0 8px 14px 8px",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                letterSpacing: "-0.03em",
              }}
            >
              NUMM
            </span>
            <span
              style={{
                fontSize: "9px",
                fontWeight: 700,
                color: rawTokens.colorAction,
                backgroundColor: "rgba(233, 67, 68, 0.1)",
                padding: "1px 5px",
                borderRadius: "3px",
              }}
            >
              v2.2
            </span>
          </div>

          {/* Role selector dropdown */}
          <div style={{ marginTop: "6px", position: "relative" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: rawTokens.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "5px",
                padding: "3px 6px",
              }}
            >
              <select
                value={activeRole}
                onChange={(e) => onChangeRole(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "transparent",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: rawTokens.colorAnchor,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="STEWARD">Data Steward</option>
                <option value="PROCUREMENT_OFFICER">Procurement GM</option>
                <option value="AUDITOR">CVC Auditor</option>
                <option value="ADMIN">Ministry Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: rawTokens.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            padding: "14px 8px 6px 8px",
          }}
        >
          Operations
        </div>

        {/* Navigation links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "7px 9px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: isActive
                    ? "rgba(241, 204, 157, 0.45)"
                    : "transparent",
                  color: isActive
                    ? rawTokens.colorAnchor
                    : rawTokens.textSecondary,
                  fontSize: "12px",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.12s ease",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Icon
                    size={14}
                    strokeWidth={isActive ? 2.4 : 1.8}
                    color={
                      isActive ? rawTokens.colorAnchor : rawTokens.textSecondary
                    }
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      backgroundColor: isActive
                        ? "rgba(89, 60, 50, 0.15)"
                        : "#E2E8F0",
                      color: isActive
                        ? rawTokens.colorAnchor
                        : rawTokens.textSecondary,
                      padding: "1px 5px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.badgeAlert && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "rgba(155, 18, 30, 0.12)",
                      color: rawTokens.colorConflict,
                      padding: "1px 5px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badgeAlert}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom operational status block & CTA */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "8px",
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: rawTokens.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            National Master
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: 700,
              color: rawTokens.colorVerified,
              marginTop: "2px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: rawTokens.colorVerified,
                display: "inline-block",
              }}
            />
            Operational
          </div>
        </div>

        {/* Small CTA: Search Before Buy */}
        <button
          onClick={onTriggerSearchBeforeBuy}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "8px 10px",
            borderRadius: "7px",
            border: "none",
            backgroundColor: rawTokens.colorAction,
            color: "#FFFFFF",
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(233, 67, 68, 0.25)",
            transition: "all 0.15s ease",
          }}
        >
          <Search size={13} strokeWidth={2.4} />
          Search Before Buy
        </button>
      </div>
    </aside>
  );
};
