// ponytail: Compact command toolbar modeled after the listening reference top command bar.
// Upgrade path: add multi-environment switcher dropdown for Production vs Staging vs Sandbox.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  ArrowLeft,
  Search,
  ClipboardList,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export interface TopCommandBarProps {
  pageTitle: string;
  onBack?: () => void;
  onNavigateView: (view: string) => void;
  onOpenShortcuts: () => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = ({
  pageTitle,
  onBack,
  onNavigateView,
  onOpenShortcuts,
}) => {
  return (
    <header
      style={{
        height: "48px",
        minHeight: "48px",
        backgroundColor: "#FFFFFF",
        borderBottom: `1px solid ${rawTokens.borderSubtle}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px 0 16px",
        userSelect: "none",
      }}
    >
      {/* Left: Back button & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={onBack}
          title="Back"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: "#FFFFFF",
            color: rawTokens.textSecondary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.15s ease",
          }}
        >
          <ArrowLeft size={14} />
        </button>

        <div
          style={{
            height: "18px",
            width: "1px",
            backgroundColor: rawTokens.borderSubtle,
          }}
        />

        <h1
          style={{
            fontSize: "18px",
            fontWeight: 700,
            color: rawTokens.textPrimary,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {pageTitle}
        </h1>
      </div>

      {/* Center/Right quick links & actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Quick navigation links */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <button
            onClick={() => onNavigateView("search")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textSecondary,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <Search size={14} color={rawTokens.colorAction} />
            <span>Search Before Buy</span>
          </button>

          <button
            onClick={() => onNavigateView("steward")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textSecondary,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <ClipboardList size={14} color={rawTokens.colorAnchor} />
            <span>Steward Queue</span>
          </button>

          <button
            onClick={() => onNavigateView("audit")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textSecondary,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <ShieldCheck size={14} color={rawTokens.colorVerified} />
            <span>Audit</span>
          </button>

          <button
            onClick={onOpenShortcuts}
            title="Shortcuts (?)"
            style={{
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <HelpCircle size={15} />
          </button>
        </div>

        {/* Far Right: Production Environment pill & Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "rgba(95, 151, 142, 0.12)",
              color: rawTokens.colorVerified,
              border: "1px solid rgba(95, 151, 142, 0.25)",
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 9px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: rawTokens.colorVerified,
              }}
            />
            Production
          </div>

          <div
            title="IOCL Chief Materials Steward"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#E2E8F0",
              border: `1.5px solid ${rawTokens.colorHighlight}`,
              color: rawTokens.colorAnchor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            IO
          </div>
        </div>
      </div>
    </header>
  );
};
