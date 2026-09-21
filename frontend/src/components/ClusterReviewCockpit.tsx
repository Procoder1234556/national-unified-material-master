// ponytail: Asymmetric split-screen reviewer cockpit with sticky inspector and keyboard navigation.
// Upgrade path: add TanStack virtualized list when cluster count exceeds 10,000 items.

import React, { useState, useEffect, useCallback } from "react";
import { rawTokens } from "../tokens.stylex";
import { MaterialDiffCard, AttributeDiff } from "./MaterialDiffCard";
import {
  Check,
  X,
  Sparkles,
  Search,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { API_BASE } from "../api";

export interface TriageItem {
  mapping_id: string;
  organization_code: string;
  plant_location: string;
  source_item_code: string;
  raw_description: string;
  onmc_candidate_code: string;
  canonical_description: string;
  confidence_score: number;
  lexical_similarity: number;
  semantic_similarity: number;
  rule_gate_passed: boolean;
  rejection_reasons: string[];
  shell_mesc_code?: string | null;
  unspsc_code?: string | null;
  gem_category_id?: string | null;
  attribute_diffs: AttributeDiff[];
  mapping_status: string;
}

interface ClusterReviewCockpitProps {
  onNavigateToSearch?: (query: string) => void;
  onShowAuditMessage?: (msg: string) => void;
}

export const ClusterReviewCockpit: React.FC<ClusterReviewCockpitProps> = ({
  onNavigateToSearch,
  onShowAuditMessage,
}) => {
  const [items, setItems] = useState<TriageItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editAttrs, setEditAttrs] = useState<{ [key: string]: string }>({});

  const fetchQueue = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/v1/steward/queue`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
          if (data.items.length > 0) {
            setSelectedIndex(0);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const activeItem = items[selectedIndex] || null;

  const handleDecision = useCallback(
    async (
      decision: "APPROVE" | "REJECT" | "MINT" | "OVERRIDE",
      justification?: string
    ) => {
      if (!activeItem) return;

      try {
        const payload = {
          mapping_id: activeItem.mapping_id,
          decision,
          justification:
            justification ||
            (decision === "APPROVE"
              ? "Approved canonical ONMC match after physical attribute verification."
              : decision === "REJECT"
                ? "Rejected candidate due to specification divergence."
                : decision === "MINT"
                  ? "Minted novel sovereign code for unmatched engineering equipment."
                  : "Steward attribute override applied."),
          actor_email: "data.steward@mopng.gov.in",
        };

        const res = await fetch(`${API_BASE}/api/v1/steward/decision`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
          if (onShowAuditMessage) {
            onShowAuditMessage(
              `[${decision}] SHA-256: ${data.sha256_hash.substring(0, 16)}...`
            );
          }

          // Remove item from pending list
          setItems((prev) => {
            const nextList = prev.filter(
              (it) => it.mapping_id !== activeItem.mapping_id
            );
            if (selectedIndex >= nextList.length) {
              setSelectedIndex(Math.max(0, nextList.length - 1));
            }
            return nextList;
          });
        }
      } catch (e) {
        console.error("Decision submission failed", e);
      }
    },
    [activeItem, selectedIndex, onShowAuditMessage]
  );

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const key = e.key.toUpperCase();

      if (key === "J") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
      } else if (key === "K") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (key === "A") {
        e.preventDefault();
        handleDecision("APPROVE");
      } else if (key === "R") {
        e.preventDefault();
        handleDecision("REJECT");
      } else if (key === "N") {
        e.preventDefault();
        handleDecision("MINT");
      } else if (key === "E") {
        e.preventDefault();
        if (activeItem) {
          const init: { [k: string]: string } = {};
          activeItem.attribute_diffs.forEach((d) => {
            init[d.attribute_name] = d.raw_value || "";
          });
          setEditAttrs(init);
          setShowEditModal(true);
        }
      } else if (key === "S") {
        e.preventDefault();
        if (activeItem && onNavigateToSearch) {
          onNavigateToSearch(activeItem.raw_description);
        }
      } else if (e.key === "?") {
        e.preventDefault();
        setShowHelpModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, activeItem, handleDecision, onNavigateToSearch]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Banner with Triage Stats and Keyboard Shortcut Trigger */}
      <div
        style={{
          backgroundColor: rawTokens.surfaceCard,
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderRadius: rawTokens.radiusLg,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              backgroundColor: "rgba(233, 67, 68, 0.1)",
              color: rawTokens.colorAction,
              width: "40px",
              height: "40px",
              borderRadius: rawTokens.radiusMd,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <h2
              style={{
                fontSize: rawTokens.textLg,
                fontWeight: 700,
                color: rawTokens.textPrimary,
              }}
            >
              Data Steward Review Cockpit
            </h2>
            <div
              style={{ fontSize: rawTokens.textXs, color: rawTokens.textMuted }}
            >
              Borderline candidates (70% - 91% confidence) & safety
              discrepancies requiring human authorization
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              backgroundColor: rawTokens.surfaceSubtle,
              color: rawTokens.textSecondary,
              padding: "6px 12px",
              borderRadius: rawTokens.radiusFull,
              fontSize: rawTokens.textXs,
              fontWeight: 700,
              border: `1px solid ${rawTokens.borderSubtle}`,
            }}
          >
            {items.length} Pending In Queue
          </span>

          <button
            onClick={() => setShowHelpModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: rawTokens.surfaceSubtle,
              color: rawTokens.textPrimary,
              border: `1px solid ${rawTokens.borderStrong}`,
              padding: "6px 14px",
              borderRadius: rawTokens.radiusMd,
              fontSize: rawTokens.textXs,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <HelpCircle size={14} />
            Keyboard Shortcuts (<kbd>?</kbd>)
          </button>
        </div>
      </div>

      {/* Asymmetric Split View: 380px Sticky Inspector + 1fr Candidate List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Candidate List (1fr) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading ? (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: rawTokens.textMuted,
              }}
            >
              Loading data steward review queue...
            </div>
          ) : items.length === 0 ? (
            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "48px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#0D533A",
                  fontWeight: 700,
                  fontSize: rawTokens.textLg,
                  marginBottom: "8px",
                }}
              >
                All Candidate Clusters Harmonized
              </div>
              <div
                style={{
                  color: rawTokens.textMuted,
                  fontSize: rawTokens.textSm,
                }}
              >
                Zero pending items in the active review queue. Excellent work!
              </div>
            </div>
          ) : (
            items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const hasSafetyBlock = !item.rule_gate_passed;
              return (
                <div
                  key={item.mapping_id}
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    backgroundColor: rawTokens.surfaceCard,
                    border: `1px solid ${isSelected ? rawTokens.colorAction : rawTokens.borderSubtle}`,
                    borderRadius: rawTokens.radiusMd,
                    padding: "14px 18px",
                    cursor: "pointer",
                    boxShadow: isSelected
                      ? "0 0 0 2px rgba(233, 67, 68, 0.2)"
                      : "0 1px 2px rgba(0,0,0,0.03)",
                    transition: "all 0.15s ease",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: rawTokens.colorAnchor,
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: rawTokens.radiusSm,
                        }}
                      >
                        {item.organization_code}
                      </span>
                      <span
                        style={{
                          fontSize: rawTokens.textXs,
                          color: rawTokens.textMuted,
                        }}
                      >
                        Ref: {item.source_item_code} • {item.plant_location}
                      </span>
                      {hasSafetyBlock && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            backgroundColor: "rgba(155, 18, 30, 0.15)",
                            color: rawTokens.colorConflict,
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: rawTokens.radiusSm,
                          }}
                        >
                          <AlertCircle size={10} />
                          SAFETY CONFLICT
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontFamily: rawTokens.fontMono,
                        fontSize: rawTokens.textXs,
                        color: rawTokens.textPrimary,
                        fontWeight: 600,
                      }}
                    >
                      {item.raw_description}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color: rawTokens.textSecondary,
                        marginTop: "4px",
                        display: "flex",
                        gap: "12px",
                      }}
                    >
                      <span>
                        Candidate: <strong>{item.onmc_candidate_code}</strong>
                      </span>
                      <span>
                        Sim:{" "}
                        <strong>
                          {Math.round(item.confidence_score * 100)}%
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: rawTokens.textSm,
                        fontWeight: 700,
                        color:
                          item.confidence_score >= 0.92
                            ? "#0D533A"
                            : item.confidence_score >= 0.7
                              ? "#8A4B08"
                              : rawTokens.colorConflict,
                      }}
                    >
                      {Math.round(item.confidence_score * 100)}%
                    </span>
                    <ChevronRight
                      size={18}
                      color={
                        isSelected ? rawTokens.colorAction : rawTokens.textMuted
                      }
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 380px-420px Sticky Inspector on the Right */}
        <div
          style={{
            position: "sticky",
            top: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {activeItem ? (
            <>
              <MaterialDiffCard
                rawDescription={activeItem.raw_description}
                canonicalDescription={activeItem.canonical_description}
                onmcCandidateCode={activeItem.onmc_candidate_code}
                organizationCode={activeItem.organization_code}
                plantLocation={activeItem.plant_location}
                sourceItemCode={activeItem.source_item_code}
                confidenceScore={activeItem.confidence_score}
                ruleGatePassed={activeItem.rule_gate_passed}
                rejectionReasons={activeItem.rejection_reasons}
                shellMescCode={activeItem.shell_mesc_code}
                unspscCode={activeItem.unspsc_code}
                gemCategoryId={activeItem.gem_category_id}
                attributeDiffs={activeItem.attribute_diffs}
              />

              {/* Action Buttons Toolbar */}
              <div
                style={{
                  backgroundColor: rawTokens.surfaceCard,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusLg,
                  padding: "16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => handleDecision("APPROVE")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: "#0D533A",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusMd,
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <Check size={16} />
                  Approve (
                  <kbd
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                    }}
                  >
                    A
                  </kbd>
                  )
                </button>

                <button
                  onClick={() => handleDecision("REJECT")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: rawTokens.colorConflict,
                    color: "#FFFFFF",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusMd,
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <X size={16} />
                  Reject (
                  <kbd
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                    }}
                  >
                    R
                  </kbd>
                  )
                </button>

                <button
                  onClick={() => handleDecision("MINT")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: rawTokens.surfaceSubtle,
                    color: rawTokens.textPrimary,
                    border: `1px solid ${rawTokens.borderStrong}`,
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusMd,
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <Sparkles size={16} color={rawTokens.colorAction} />
                  Mint Novel (
                  <kbd
                    style={{
                      backgroundColor: "#E2E8F0",
                      padding: "1px 4px",
                      borderRadius: "3px",
                    }}
                  >
                    N
                  </kbd>
                  )
                </button>

                <button
                  onClick={() => {
                    if (onNavigateToSearch && activeItem) {
                      onNavigateToSearch(activeItem.raw_description);
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    backgroundColor: rawTokens.surfaceSubtle,
                    color: rawTokens.textPrimary,
                    border: `1px solid ${rawTokens.borderStrong}`,
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusMd,
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <Search size={16} />
                  Search (
                  <kbd
                    style={{
                      backgroundColor: "#E2E8F0",
                      padding: "1px 4px",
                      borderRadius: "3px",
                    }}
                  >
                    S
                  </kbd>
                  )
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                padding: "24px",
                borderRadius: rawTokens.radiusLg,
                color: rawTokens.textMuted,
                textAlign: "center",
              }}
            >
              Select an item to inspect engineering parameters.
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showHelpModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              borderRadius: rawTokens.radiusLg,
              padding: "24px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: rawTokens.textBase,
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                Keyboard Ergonomics (1,000+ Items/Hour)
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                { key: "J", action: "Next item in triage queue" },
                { key: "K", action: "Previous item in triage queue" },
                {
                  key: "A",
                  action: "Approve candidate match into master cluster",
                },
                { key: "R", action: "Reject candidate match" },
                { key: "E", action: "Edit attributes inline" },
                { key: "N", action: "Mint novel sovereign ONMC code" },
                {
                  key: "S",
                  action: "Search national inventory with item query",
                },
                { key: "?", action: "Toggle this keyboard cheat sheet" },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: rawTokens.textSm,
                      color: rawTokens.textSecondary,
                    }}
                  >
                    {row.action}
                  </span>
                  <kbd
                    style={{
                      backgroundColor: rawTokens.surfaceSubtle,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontFamily: rawTokens.fontMono,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {row.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={() => setShowHelpModal(false)}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: rawTokens.radiusMd,
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Close Cheat Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline Attribute Edit Modal */}
      {showEditModal && activeItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              borderRadius: rawTokens.radiusLg,
              padding: "24px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: rawTokens.textBase,
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                Edit Extracted Attributes
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {Object.keys(editAttrs).map((k) => (
                <div key={k}>
                  <label
                    style={{
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      color: rawTokens.textSecondary,
                      textTransform: "uppercase",
                    }}
                  >
                    {k}
                  </label>
                  <input
                    type="text"
                    value={editAttrs[k]}
                    onChange={(e) =>
                      setEditAttrs({ ...editAttrs, [k]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: rawTokens.radiusSm,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      marginTop: "4px",
                      fontFamily: rawTokens.fontMono,
                      fontSize: rawTokens.textSm,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  backgroundColor: rawTokens.surfaceSubtle,
                  color: rawTokens.textSecondary,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  padding: "8px 16px",
                  borderRadius: rawTokens.radiusMd,
                  fontSize: rawTokens.textXs,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  handleDecision(
                    "OVERRIDE",
                    "Steward manual attribute override saved."
                  );
                }}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: rawTokens.radiusMd,
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Save & Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
