// ponytail: Compact global navigation rail inspired by sovereign industrial reference.
// Upgrade path: add collapsible tooltip expansion on rail hover.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  Home,
  UploadCloud,
  FileCheck2,
  Search,
  Package,
  Layers,
  ShieldCheck,
  MoreHorizontal,
  Bell,
  HelpCircle,
  Flame,
} from "lucide-react";

export interface GlobalRailProps {
  activeModule: string;
  onSelectModule: (id: string) => void;
  onOpenShortcuts: () => void;
}

export const GlobalRail: React.FC<GlobalRailProps> = ({
  activeModule,
  onSelectModule,
  onOpenShortcuts,
}) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "ingest", label: "Ingest", icon: UploadCloud },
    { id: "steward", label: "Steward", icon: FileCheck2 },
    { id: "search", label: "Search", icon: Search },
    { id: "surplus", label: "Surplus", icon: Package },
    { id: "demand", label: "Demand", icon: Layers },
    { id: "audit", label: "Audit", icon: ShieldCheck },
    { id: "more", label: "More", icon: MoreHorizontal },
  ];

  return (
    <aside
      style={{
        width: "56px",
        minWidth: "56px",
        backgroundColor: "#FFFFFF",
        borderRight: `1px solid ${rawTokens.borderSubtle}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0 16px 0",
        userSelect: "none",
        zIndex: 20,
      }}
    >
      {/* Top Logo & Navigation items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* NUMM Sovereign Emblem */}
        <div
          onClick={() => onSelectModule("home")}
          title="National Unified Material Master (NUMM)"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: `linear-gradient(135deg, ${rawTokens.colorAction} 0%, #B82A2B 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(233, 67, 68, 0.35)",
            cursor: "pointer",
            marginBottom: "16px",
          }}
        >
          <Flame size={20} strokeWidth={2.4} />
        </div>

        {/* Navigation Items list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                title={item.label}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isActive
                    ? "rgba(233, 67, 68, 0.08)"
                    : "transparent",
                  color: isActive
                    ? rawTokens.colorAction
                    : rawTokens.textSecondary,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.15s ease",
                  position: "relative",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      backgroundColor: rawTokens.colorAction,
                      borderRadius: "0 2px 2px 0",
                    }}
                  />
                )}
                <Icon size={17} strokeWidth={isActive ? 2.3 : 1.8} />
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom utility icons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Notification Bell */}
        <button
          onClick={() => onSelectModule("audit")}
          title="Audit Notifications (3 new)"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            color: rawTokens.textSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: rawTokens.colorAction,
              border: "1.5px solid #FFFFFF",
            }}
          />
        </button>

        {/* Keyboard shortcut help */}
        <button
          onClick={onOpenShortcuts}
          title="Keyboard Shortcuts (?)"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            color: rawTokens.textMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <HelpCircle size={18} />
        </button>

        {/* User avatar */}
        <div
          title="CPSE Data Steward (IOCL / MoPNG)"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: rawTokens.colorAnchor,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          DS
        </div>
      </div>
    </aside>
  );
};
