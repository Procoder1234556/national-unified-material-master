// ponytail: Accessible keyboard shortcut reference dialog for high-throughput stewards.

import React from "react";
import { rawTokens } from "../tokens.stylex";
import { Keyboard, X, CheckCircle2 } from "lucide-react";

interface KeyboardHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardHelpModal: React.FC<KeyboardHelpModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    {
      key: "J",
      action: "Next Item",
      description: "Advance to the next candidate cluster in the triage queue",
    },
    {
      key: "K",
      action: "Previous Item",
      description: "Step backward to the previous candidate cluster",
    },
    {
      key: "A",
      action: "Approve Match",
      description: "Confirm candidate ONMC code and merge into master record",
    },
    {
      key: "R",
      action: "Reject / Split",
      description:
        "Reject match candidate and route as separate novel material",
    },
    {
      key: "E",
      action: "Edit Attributes",
      description:
        "Open inline parameter editor to correct size, pressure, or alloy",
    },
    {
      key: "N",
      action: "Mint Code",
      description:
        "Trigger immediate generation of a novel ONMC sovereign code",
    },
    {
      key: "S",
      action: "Search Inventory",
      description:
        "Jump directly to Search Before Buy view with current description",
    },
    {
      key: "Ctrl + K",
      action: "Command Palette",
      description: "Open universal search and quick navigation menu",
    },
    {
      key: "?",
      action: "Keyboard Help",
      description: "Toggle this shortcut cheatsheet",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${rawTokens.borderStrong}`,
          borderRadius: rawTokens.radiusLg,
          width: "100%",
          maxWidth: "580px",
          boxShadow: rawTokens.shadowElevated,
          padding: "24px",
          animation: "fadeIn 0.15s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              <Keyboard size={20} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                Keyboard-First Triage Controls
              </h3>
              <p style={{ fontSize: "12px", color: rawTokens.textSecondary }}>
                Target throughput: &gt;1,000 candidate items per steward hour
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: rawTokens.textMuted,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderRadius: rawTokens.radiusSm,
                backgroundColor: rawTokens.surfaceSubtle,
                border: `1px solid ${rawTokens.borderSubtle}`,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <kbd
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                    fontSize: "12px",
                    fontFamily: rawTokens.fontMono,
                    fontWeight: 700,
                    color: rawTokens.colorAction,
                    minWidth: "32px",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {sc.key}
                </kbd>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: rawTokens.textPrimary,
                  }}
                >
                  {sc.action}
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  textAlign: "right",
                  maxWidth: "260px",
                }}
              >
                {sc.description}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "20px",
            paddingTop: "14px",
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            Active in Review Cockpit when no inputs are focused
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: rawTokens.textPrimary,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusFull,
              padding: "6px 16px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
