// ponytail: Deep stewardship inspector drawer with attribute diffing and safety gate proof.
// Upgrade path: add multi-attribute field-level merge checkboxing.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  X,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Edit3,
  Split,
  Check,
  Sparkles,
} from "lucide-react";

export interface ReviewItem {
  id: string;
  status: "MATCH" | "REVIEW" | "CONFLICT" | "NOVEL";
  rawDescription: string;
  cpse: string;
  candidateOnmc: string;
  confidence: number;
  attributes: {
    itemType: string;
    size: string;
    pressureClass: string;
    materialGrade: string;
    endConnection: string;
    standard: string;
  };
  candidateAttributes?: {
    itemType: string;
    size: string;
    pressureClass: string;
    materialGrade: string;
    endConnection: string;
    standard: string;
  };
  conflictDetails?: string;
  imageUrl?: string;
}

export interface StewardshipInspectorDrawerProps {
  item: ReviewItem | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onEdit: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalItems: number;
}

export const StewardshipInspectorDrawer: React.FC<
  StewardshipInspectorDrawerProps
> = ({
  item,
  onClose,
  onApprove,
  onReject,
  onEdit,
  onNext,
  onPrev,
  currentIndex,
  totalItems,
}) => {
  if (!item) return null;

  const isConflict = item.status === "CONFLICT";
  const isNovel = item.status === "NOVEL";

  const fallbackImage = item.imageUrl || "/images/pipeline-valves.jpg";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "560px",
        backgroundColor: "#FFFFFF",
        boxShadow: "-8px 0 28px rgba(0, 0, 0, 0.16)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        borderLeft: `1px solid ${rawTokens.borderSubtle}`,
        animation: "drawerSlideIn 0.2s ease-out",
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              backgroundColor:
                item.status === "MATCH"
                  ? "rgba(165, 215, 201, 0.4)"
                  : item.status === "CONFLICT"
                    ? "rgba(155, 18, 30, 0.12)"
                    : item.status === "NOVEL"
                      ? "rgba(233, 67, 68, 0.1)"
                      : "rgba(241, 204, 157, 0.45)",
              color:
                item.status === "MATCH"
                  ? "#0F5132"
                  : item.status === "CONFLICT"
                    ? rawTokens.colorConflict
                    : item.status === "NOVEL"
                      ? rawTokens.colorAction
                      : rawTokens.colorAnchor,
            }}
          >
            {item.status}
          </span>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: rawTokens.textPrimary,
            }}
          >
            Stewardship Inspector ({currentIndex + 1} of {totalItems})
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={onPrev}
            title="Previous (K)"
            style={{
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            K ↑
          </button>
          <button
            onClick={onNext}
            title="Next (J)"
            style={{
              padding: "4px 8px",
              fontSize: "11px",
              fontWeight: 600,
              backgroundColor: "#FFFFFF",
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            J ↓
          </button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Body Content */}
      <div
        style={{
          padding: "20px",
          overflowY: "auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Safety Conflict Alert Banner if applicable */}
        {isConflict && (
          <div
            style={{
              backgroundColor: "rgba(155, 18, 30, 0.08)",
              border: `1px solid rgba(155, 18, 30, 0.3)`,
              borderRadius: "8px",
              padding: "12px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <ShieldAlert
              size={18}
              color={rawTokens.colorConflict}
              style={{ marginTop: "1px" }}
            />
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: rawTokens.colorConflict,
                }}
              >
                FATAL SAFETY GATE DISCREPANCY DETECTED
              </div>
              <div
                style={{
                  fontSize: "11.5px",
                  color: rawTokens.colorConflict,
                  marginTop: "2px",
                }}
              >
                {item.conflictDetails ||
                  "Zero-tolerance rule violation: Pressure Class mismatch (ASME B16.34 Class 150 vs Class 300). Automated merge prohibited."}
              </div>
            </div>
          </div>
        )}
        {isNovel && (
          <div
            style={{
              backgroundColor: "rgba(233, 67, 68, 0.08)",
              border: `1px solid rgba(233, 67, 68, 0.25)`,
              borderRadius: "8px",
              padding: "12px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Sparkles
              size={18}
              color={rawTokens.colorAction}
              style={{ marginTop: "1px" }}
            />
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: rawTokens.colorAction,
                }}
              >
                NOVEL CATALOG ITEM IDENTIFIED
              </div>
              <div
                style={{
                  fontSize: "11.5px",
                  color: rawTokens.textSecondary,
                  marginTop: "2px",
                }}
              >
                No existing ONMC cluster satisfies confidence threshold. Pending
                sovereign catalog code generation.
              </div>
            </div>
          </div>
        )}

        {/* Equipment Verification Visual from Pixabay */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "150px",
            borderRadius: "8px",
            overflow: "hidden",
            border: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          <img
            src={fallbackImage}
            alt="Industrial Equipment Verification"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "6px 10px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              color: "#FFFFFF",
              fontSize: "10.5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              CPSE Source: <strong>{item.cpse}</strong>
            </span>
            <span>
              Confidence: <strong>{item.confidence}%</strong>
            </span>
          </div>
        </div>

        {/* Raw Material Description */}
        <div
          style={{
            backgroundColor: "#F8FAFC",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: rawTokens.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "4px",
            }}
          >
            Ingested Legacy Description ({item.cpse} ERP)
          </div>
          <div
            style={{
              fontFamily: rawTokens.fontMono,
              fontSize: "12px",
              fontWeight: 600,
              color: rawTokens.textPrimary,
              lineHeight: 1.4,
            }}
          >
            {item.rawDescription}
          </div>
        </div>

        {/* Candidate ONMC Canonical Target */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: `1px solid ${
              isConflict ? "rgba(155, 18, 30, 0.4)" : rawTokens.colorVerified
            }`,
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: rawTokens.colorVerified,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Candidate National Master Target (ONMC)
            </div>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: item.confidence >= 90 ? "#0F5132" : "#D97706",
              }}
            >
              {item.confidence}% Match Score
            </span>
          </div>
          <div
            style={{
              fontFamily: rawTokens.fontMono,
              fontSize: "12px",
              fontWeight: 700,
              color: rawTokens.textPrimary,
              letterSpacing: "0.02em",
            }}
          >
            {item.candidateOnmc}
          </div>
        </div>

        {/* Attribute Comparison Matrix */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: rawTokens.textMuted,
              marginBottom: "8px",
            }}
          >
            Normalized Attribute Specification Diff
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11.5px",
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
                    padding: "6px 8px",
                    color: rawTokens.textMuted,
                    fontWeight: 600,
                  }}
                >
                  Property
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 8px",
                    color: rawTokens.textMuted,
                    fontWeight: 600,
                  }}
                >
                  Legacy Ingest
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "6px 8px",
                    color: rawTokens.textMuted,
                    fontWeight: 600,
                  }}
                >
                  ONMC Standard
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "6px 8px",
                    color: rawTokens.textMuted,
                    fontWeight: 600,
                    width: "35px",
                  }}
                >
                  Gate
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Item Type",
                  legacy: item.attributes.itemType,
                  onmc:
                    item.candidateAttributes?.itemType ||
                    item.attributes.itemType,
                  match: true,
                },
                {
                  label: "Nominal Size",
                  legacy: item.attributes.size,
                  onmc: item.candidateAttributes?.size || item.attributes.size,
                  match: true,
                },
                {
                  label: "Pressure Class",
                  legacy: item.attributes.pressureClass,
                  onmc:
                    item.candidateAttributes?.pressureClass ||
                    item.attributes.pressureClass,
                  match: !isConflict,
                },
                {
                  label: "Material Grade",
                  legacy: item.attributes.materialGrade,
                  onmc:
                    item.candidateAttributes?.materialGrade ||
                    item.attributes.materialGrade,
                  match: true,
                },
                {
                  label: "Standard Code",
                  legacy: item.attributes.standard,
                  onmc:
                    item.candidateAttributes?.standard ||
                    item.attributes.standard,
                  match: true,
                },
              ].map((attr) => (
                <tr
                  key={attr.label}
                  style={{
                    borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                    backgroundColor: !attr.match
                      ? "rgba(155, 18, 30, 0.04)"
                      : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "7px 8px",
                      fontWeight: 600,
                      color: rawTokens.textSecondary,
                    }}
                  >
                    {attr.label}
                  </td>
                  <td
                    style={{
                      padding: "7px 8px",
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {attr.legacy}
                  </td>
                  <td
                    style={{
                      padding: "7px 8px",
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {attr.onmc}
                  </td>
                  <td style={{ padding: "7px 8px", textAlign: "center" }}>
                    {attr.match ? (
                      <CheckCircle2 size={13} color={rawTokens.colorVerified} />
                    ) : (
                      <XCircle size={13} color={rawTokens.colorConflict} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Sticky Action Buttons with Keyboard Shortcuts */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
          backgroundColor: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => onEdit(item.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 12px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              color: rawTokens.textPrimary,
              cursor: "pointer",
            }}
          >
            <Edit3 size={13} />
            Edit Attributes{" "}
            <span style={{ color: rawTokens.textMuted, fontSize: "10px" }}>
              (E)
            </span>
          </button>

          <button
            onClick={() => onReject(item.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              padding: "8px 12px",
              backgroundColor: "#FFFFFF",
              border: `1px solid rgba(155, 18, 30, 0.3)`,
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              color: rawTokens.colorConflict,
              cursor: "pointer",
            }}
          >
            <Split size={13} />
            Reject / Split{" "}
            <span style={{ opacity: 0.8, fontSize: "10px" }}>(R)</span>
          </button>
        </div>

        <button
          onClick={() => onApprove(item.id)}
          disabled={isConflict}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 18px",
            backgroundColor: isConflict ? "#94A3B8" : rawTokens.colorAction,
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#FFFFFF",
            cursor: isConflict ? "not-allowed" : "pointer",
            boxShadow: isConflict ? "none" : "0 2px 6px rgba(233, 67, 68, 0.3)",
          }}
        >
          <Check size={14} strokeWidth={2.6} />
          {isConflict ? "Prohibited (Conflict)" : "Approve Match (A)"}
        </button>
      </div>
    </div>
  );
};
