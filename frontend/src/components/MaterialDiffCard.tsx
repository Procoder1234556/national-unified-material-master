// ponytail: Side-by-side engineering attribute comparison card with conflict highlighting.
// Upgrade path: add 3D CAD step file visualizer viewer.

import React from "react";
import { rawTokens } from "../tokens.stylex";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  MinusCircle,
} from "lucide-react";

export interface AttributeDiff {
  attribute_name: string;
  raw_value: string | null;
  canonical_value: string | null;
  status: "MATCH" | "CONFLICT" | "TOLERANCE" | "MISSING" | string;
}

interface MaterialDiffCardProps {
  rawDescription: string;
  canonicalDescription: string;
  onmcCandidateCode: string;
  organizationCode: string;
  plantLocation: string;
  sourceItemCode: string;
  confidenceScore: number;
  ruleGatePassed: boolean;
  rejectionReasons?: string[];
  shellMescCode?: string | null;
  unspscCode?: string | null;
  gemCategoryId?: string | null;
  attributeDiffs: AttributeDiff[];
}

export const MaterialDiffCard: React.FC<MaterialDiffCardProps> = ({
  rawDescription,
  canonicalDescription,
  onmcCandidateCode,
  organizationCode,
  plantLocation,
  sourceItemCode,
  confidenceScore,
  ruleGatePassed,
  rejectionReasons = [],
  shellMescCode,
  unspscCode,
  gemCategoryId,
  attributeDiffs,
}) => {
  const scorePct = Math.round(confidenceScore * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "MATCH":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "rgba(165, 215, 201, 0.25)",
              color: "#0D533A",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <CheckCircle2 size={12} />
            MATCH
          </span>
        );
      case "CONFLICT":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "rgba(155, 18, 30, 0.2)",
              color: rawTokens.colorConflict,
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <ShieldAlert size={12} />
            FATAL CONFLICT
          </span>
        );
      case "TOLERANCE":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "rgba(241, 204, 157, 0.35)",
              color: "#8A4B08",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <AlertTriangle size={12} />
            TOLERANCE
          </span>
        );
      default:
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "#E2E8F0",
              color: rawTokens.textMuted,
              fontSize: "11px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: rawTokens.radiusFull,
            }}
          >
            <MinusCircle size={12} />
            MISSING
          </span>
        );
    }
  };

  return (
    <div
      style={{
        backgroundColor: rawTokens.surfaceCard,
        border: `1px solid ${rawTokens.borderSubtle}`,
        borderRadius: rawTokens.radiusLg,
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          paddingBottom: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                backgroundColor: rawTokens.colorAnchor,
                color: "#FFFFFF",
                fontSize: rawTokens.textXs,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: rawTokens.radiusSm,
              }}
            >
              {organizationCode}
            </span>
            <span
              style={{ fontSize: rawTokens.textXs, color: rawTokens.textMuted }}
            >
              Plant: {plantLocation} • Ref: {sourceItemCode}
            </span>
          </div>
          <div
            style={{
              marginTop: "6px",
              fontFamily: rawTokens.fontMono,
              fontSize: rawTokens.textSm,
              fontWeight: 700,
              color: rawTokens.colorAction,
            }}
          >
            {onmcCandidateCode}
          </div>
        </div>

        {/* Confidence pill */}
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: rawTokens.textLg,
              fontWeight: 800,
              color:
                confidenceScore >= 0.92
                  ? "#0D533A"
                  : confidenceScore >= 0.7
                    ? "#8A4B08"
                    : rawTokens.colorConflict,
            }}
          >
            {scorePct}%
          </div>
          <div
            style={{
              fontSize: "11px",
              color: rawTokens.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Confidence
          </div>
        </div>
      </div>

      {/* Safety Gate Alert if blocked */}
      {!ruleGatePassed && rejectionReasons.length > 0 && (
        <div
          style={{
            backgroundColor: "rgba(155, 18, 30, 0.08)",
            borderLeft: `4px solid ${rawTokens.colorConflict}`,
            padding: "10px 14px",
            borderRadius: rawTokens.radiusSm,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: rawTokens.colorConflict,
              fontWeight: 700,
              fontSize: rawTokens.textSm,
            }}
          >
            <ShieldAlert size={16} />
            ASME / API Safety Gate Disqualification
          </div>
          {rejectionReasons.map((r, i) => (
            <div
              key={i}
              style={{
                fontSize: rawTokens.textXs,
                color: rawTokens.colorConflict,
                marginTop: "4px",
              }}
            >
              • {r}
            </div>
          ))}
        </div>
      )}

      {/* Side by side description boxes */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <div
          style={{
            backgroundColor: rawTokens.surfaceSubtle,
            padding: "12px",
            borderRadius: rawTokens.radiusMd,
            border: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: rawTokens.textMuted,
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Raw Legacy Description ({organizationCode})
          </div>
          <div
            style={{
              fontFamily: rawTokens.fontMono,
              fontSize: rawTokens.textXs,
              color: rawTokens.textPrimary,
              lineHeight: "1.4",
            }}
          >
            {rawDescription}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(165, 215, 201, 0.12)",
            padding: "12px",
            borderRadius: rawTokens.radiusMd,
            border: "1px solid rgba(165, 215, 201, 0.4)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#0D533A",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Candidate Canonical ONMC Master
          </div>
          <div
            style={{
              fontFamily: rawTokens.fontMono,
              fontSize: rawTokens.textXs,
              color: rawTokens.textPrimary,
              lineHeight: "1.4",
            }}
          >
            {canonicalDescription}
          </div>
        </div>
      </div>

      {/* Attribute Diff Matrix */}
      <div>
        <div
          style={{
            fontSize: rawTokens.textXs,
            fontWeight: 700,
            color: rawTokens.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "8px",
          }}
        >
          Parametric Attribute Alignment
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {attributeDiffs.map((diff, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 1fr 110px",
                gap: "8px",
                alignItems: "center",
                padding: "6px 10px",
                borderRadius: rawTokens.radiusSm,
                backgroundColor:
                  diff.status === "CONFLICT"
                    ? "rgba(155, 18, 30, 0.08)"
                    : diff.status === "MATCH"
                      ? "rgba(165, 215, 201, 0.12)"
                      : rawTokens.surfaceSubtle,
                border: `1px solid ${diff.status === "CONFLICT" ? "rgba(155, 18, 30, 0.3)" : "transparent"}`,
              }}
            >
              <span
                style={{
                  fontSize: rawTokens.textXs,
                  fontWeight: 600,
                  color: rawTokens.textSecondary,
                }}
              >
                {diff.attribute_name}
              </span>
              <span
                style={{
                  fontFamily: rawTokens.fontMono,
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textPrimary,
                }}
              >
                {diff.raw_value ?? "—"}
              </span>
              <span
                style={{
                  fontFamily: rawTokens.fontMono,
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textPrimary,
                }}
              >
                {diff.canonical_value ?? "—"}
              </span>
              <div style={{ textAlign: "right" }}>
                {getStatusBadge(diff.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taxonomies & Standards Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          paddingTop: "8px",
          borderTop: `1px solid ${rawTokens.borderSubtle}`,
        }}
      >
        {shellMescCode && (
          <span
            style={{
              fontSize: "11px",
              backgroundColor: rawTokens.surfaceSubtle,
              padding: "3px 8px",
              borderRadius: rawTokens.radiusSm,
              color: rawTokens.textSecondary,
            }}
          >
            <strong>MESC:</strong> {shellMescCode}
          </span>
        )}
        {unspscCode && (
          <span
            style={{
              fontSize: "11px",
              backgroundColor: rawTokens.surfaceSubtle,
              padding: "3px 8px",
              borderRadius: rawTokens.radiusSm,
              color: rawTokens.textSecondary,
            }}
          >
            <strong>UNSPSC:</strong> {unspscCode}
          </span>
        )}
        {gemCategoryId && (
          <span
            style={{
              fontSize: "11px",
              backgroundColor: "rgba(95, 151, 142, 0.15)",
              color: "#1B4D3E",
              padding: "3px 8px",
              borderRadius: rawTokens.radiusSm,
              fontWeight: 600,
            }}
          >
            <strong>GeM:</strong> {gemCategoryId}
          </span>
        )}
      </div>
    </div>
  );
};
