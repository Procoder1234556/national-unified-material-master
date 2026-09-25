// ponytail: Priority review queue table with compact status badges, MicroCharts bullet meters, and Watermelon UI copy-to-clipboard interactions.
// Upgrade path: add inline row quick-action buttons on hover.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Eye,
  Copy,
  Check,
} from "lucide-react";
import { ReviewItem } from "./StewardshipInspectorDrawer";
import { BulletMeter } from "../MicroCharts";

export interface PriorityReviewQueueProps {
  items: ReviewItem[];
  selectedIndex: number;
  onSelectItem: (index: number) => void;
  onViewAll?: () => void;
}

export const PriorityReviewQueue: React.FC<PriorityReviewQueueProps> = ({
  items,
  selectedIndex,
  onSelectItem,
  onViewAll,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    if (code === "—") return;
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderStatusBadge = (status: ReviewItem["status"]) => {
    switch (status) {
      case "MATCH":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "4px",
              backgroundColor: "rgba(165, 215, 201, 0.4)",
              color: "#0F5132",
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <CheckCircle2 size={11} strokeWidth={2.4} />
            MATCH
          </span>
        );
      case "REVIEW":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "4px",
              backgroundColor: "rgba(241, 204, 157, 0.45)",
              color: rawTokens.colorAnchor,
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <AlertTriangle size={11} strokeWidth={2.4} />
            REVIEW
          </span>
        );
      case "CONFLICT":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "4px",
              backgroundColor: "rgba(155, 18, 30, 0.12)",
              color: rawTokens.colorConflict,
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <XCircle size={11} strokeWidth={2.4} />
            CONFLICT
          </span>
        );
      case "NOVEL":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 7px",
              borderRadius: "4px",
              backgroundColor: "rgba(233, 67, 68, 0.1)",
              color: rawTokens.colorAction,
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            <Sparkles size={11} strokeWidth={2.4} />
            NOVEL
          </span>
        );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(226, 232, 240, 0.9)",
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.4)",
      }}
    >
      {/* Title & View all action */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: rawTokens.fontSans,
              letterSpacing: "0em",
              textTransform: "none",
              color: rawTokens.textPrimary,
              margin: 0,
            }}
          >
            Priority Review Queue
          </h2>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              backgroundColor: "rgba(241, 204, 157, 0.4)",
              color: rawTokens.colorAnchor,
              padding: "1px 6px",
              borderRadius: "10px",
            }}
          >
            {items.length} Pending
          </span>
        </div>

        <button
          onClick={onViewAll}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            background: "none",
            border: "none",
            color: rawTokens.colorAction,
            fontSize: "11px",
            fontWeight: 700,
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          <span>View all</span>
          <ArrowRight size={12} strokeWidth={2.4} />
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                backgroundColor: "#F8FAFC",
              }}
            >
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  width: "90px",
                }}
              >
                Status
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Raw Material (ERP Ingest)
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  width: "55px",
                }}
              >
                CPSE
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Candidate ONMC
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  width: "115px",
                }}
              >
                Confidence
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "8px 10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  width: "45px",
                }}
              >
                Inspect
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const isCopied = copiedCode === item.candidateOnmc;
              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectItem(idx)}
                  style={{
                    borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                    backgroundColor: isSelected
                      ? "rgba(241, 204, 157, 0.18)"
                      : "transparent",
                    cursor: "pointer",
                    transition: "all 0.12s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.backgroundColor = "#F8FAFC";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={{ padding: "8px 10px" }}>
                    {renderStatusBadge(item.status)}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      fontFamily: rawTokens.fontMono,
                      fontSize: "11px",
                      color: rawTokens.textPrimary,
                      fontWeight: 600,
                    }}
                  >
                    {item.rawDescription}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      fontWeight: 700,
                      color: rawTokens.textSecondary,
                      fontSize: "11px",
                    }}
                  >
                    {item.cpse}
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      fontFamily: rawTokens.fontMono,
                      fontSize: "11px",
                      color:
                        item.candidateOnmc === "—"
                          ? rawTokens.textMuted
                          : rawTokens.colorAnchor,
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{item.candidateOnmc}</span>
                      {item.candidateOnmc !== "—" && (
                        <button
                          onClick={(e) => handleCopy(e, item.candidateOnmc)}
                          title="Copy ONMC code"
                          style={{
                            background: "none",
                            border: "none",
                            padding: "2px",
                            cursor: "pointer",
                            color: isCopied
                              ? rawTokens.colorVerified
                              : rawTokens.textMuted,
                            display: "inline-flex",
                            alignItems: "center",
                            borderRadius: "3px",
                          }}
                        >
                          {isCopied ? (
                            <Check size={11} strokeWidth={2.4} />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "8px 10px",
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "6px",
                      }}
                    >
                      {/* MicroCharts BulletMeter */}
                      <BulletMeter
                        value={item.confidence}
                        target={92}
                        width={42}
                        height={10}
                        color={
                          item.confidence >= 90
                            ? rawTokens.colorVerified
                            : item.confidence >= 70
                              ? "#D97706"
                              : rawTokens.colorConflict
                        }
                      />
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "11px",
                          fontFamily: rawTokens.fontMono,
                          color:
                            item.confidence >= 90
                              ? "#0F5132"
                              : item.confidence >= 70
                                ? "#D97706"
                                : rawTokens.colorConflict,
                        }}
                      >
                        {item.confidence.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "8px 10px", textAlign: "center" }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(idx);
                      }}
                      title="Open Stewardship Inspector"
                      style={{
                        background: "none",
                        border: "none",
                        color: rawTokens.textSecondary,
                        cursor: "pointer",
                        padding: "3px",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
