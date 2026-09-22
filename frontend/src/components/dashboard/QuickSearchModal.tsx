// ponytail: Command palette modal for global material, ONMC, and SAP code lookup.
// Upgrade path: add live fuzzy backend search API querying.

import React, { useState, useEffect } from "react";
import { rawTokens } from "../../tokens.stylex";
import { Search, ArrowRight } from "lucide-react";

export interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (query: string, targetView?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isOpen) setSearchTerm("");
  }, [isOpen]);

  if (!isOpen) return null;

  const quickSuggestions = [
    {
      category: "Canonical Materials",
      items: [
        {
          code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
          desc: '2" Ball Valve • Class 150 • ASTM A105',
          view: "search",
        },
        {
          code: "ONMC-MECH-VLV-GAT-004-300-WCB-41A7",
          desc: '4" Gate Valve • Class 300 • ASTM A216 WCB',
          view: "search",
        },
        {
          code: "ONMC-MECH-GSK-SPW-050-150-SS3-11C8",
          desc: "Spiral Wound Gasket 50mm 150# SS316",
          view: "search",
        },
      ],
    },
    {
      category: "Operational Modules",
      items: [
        {
          code: "Triage Cockpit (HITL)",
          desc: "Review borderline clusters and safety overrides",
          view: "steward",
        },
        {
          code: "Surplus & Pooled Demand",
          desc: "Inter-CPSE transfer and inventory pooling",
          view: "surplus",
        },
        {
          code: "Security & CVC Audit",
          desc: "Tamper-evident logs and cryptographic hash verification",
          view: "audit",
        },
      ],
    },
  ];

  const filtered = searchTerm.trim()
    ? quickSuggestions
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (i) =>
              i.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
              i.desc.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : quickSuggestions;

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
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "560px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          border: `1px solid ${rawTokens.borderSubtle}`,
          boxShadow: "0 12px 36px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 16px",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          <Search size={18} color={rawTokens.colorAction} />
          <input
            autoFocus
            type="text"
            placeholder="Search materials, ONMC codes, SAP codes, modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: rawTokens.textPrimary,
              fontFamily: rawTokens.fontSans,
            }}
          />
          <kbd
            style={{
              fontSize: "10.5px",
              fontFamily: rawTokens.fontMono,
              color: rawTokens.textMuted,
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: "4px",
              padding: "1px 5px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Suggestion list */}
        <div
          style={{ maxHeight: "360px", overflowY: "auto", padding: "10px 8px" }}
        >
          {filtered.map((cat) => (
            <div key={cat.category} style={{ marginBottom: "10px" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: rawTokens.textMuted,
                  padding: "4px 8px",
                }}
              >
                {cat.category}
              </div>

              {cat.items.map((item) => (
                <div
                  key={item.code}
                  onClick={() => {
                    onSelectResult(item.code, item.view);
                    onClose();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "background-color 0.1s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F8FAFC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div>
                    <div
                      style={{
                        fontFamily: item.code.startsWith("ONMC")
                          ? rawTokens.fontMono
                          : rawTokens.fontSans,
                        fontSize: "12px",
                        fontWeight: 700,
                        color: rawTokens.textPrimary,
                      }}
                    >
                      {item.code}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: rawTokens.textSecondary,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <ArrowRight size={13} color={rawTokens.textMuted} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
