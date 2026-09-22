// ponytail: Operational keyboard shortcuts reference modal.
// Upgrade path: allow custom key bindings per user profile.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import { X, Command } from "lucide-react";

export interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "J", desc: "Select next material in review queue" },
    { key: "K", desc: "Select previous material in review queue" },
    { key: "A", desc: "Approve candidate match (stewardship gate)" },
    { key: "R", desc: "Reject / split borderline cluster" },
    { key: "E", desc: "Edit normalized attributes" },
    { key: "⌘ / Ctrl + K", desc: "Focus global material search palette" },
    { key: "?", desc: "Toggle keyboard shortcuts help" },
    { key: "Esc", desc: "Close open inspector or modal" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "460px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: `1px solid ${rawTokens.borderSubtle}`,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          padding: "20px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
            paddingBottom: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Command size={16} color={rawTokens.colorAction} />
            <h3
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 700,
                color: rawTokens.textPrimary,
              }}
            >
              NUMM Stewardship Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Shortcuts list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {shortcuts.map((s) => (
            <div
              key={s.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: "6px",
                backgroundColor: "#F8FAFC",
              }}
            >
              <span
                style={{ fontSize: "12px", color: rawTokens.textSecondary }}
              >
                {s.desc}
              </span>
              <kbd
                style={{
                  fontFamily: rawTokens.fontMono,
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${rawTokens.borderStrong}`,
                  borderRadius: "4px",
                  padding: "2px 7px",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  color: rawTokens.textPrimary,
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer tip */}
        <div
          style={{
            fontSize: "11px",
            color: rawTokens.textMuted,
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Press{" "}
          <kbd style={{ fontFamily: rawTokens.fontMono, fontWeight: 700 }}>
            ?
          </kbd>{" "}
          anytime to open this dialog.
        </div>
      </div>
    </div>
  );
};
