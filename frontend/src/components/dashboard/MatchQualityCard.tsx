// ponytail: Match Quality card replacing the listening sentiment card, powered by microcharts SegBar and watermelon ui styling.
// Upgrade path: add drill-down click to filter main view by match tier.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import { CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { SegBar } from "../MicroCharts";

export interface MatchQualityCardProps {
  onSelectTier?: (tier: string) => void;
}

export const MatchQualityCard: React.FC<MatchQualityCardProps> = ({
  onSelectTier,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(226, 232, 240, 0.9)",
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.4)",
        minHeight: "185px",
        transition: "box-shadow 0.18s ease",
      }}
    >
      {/* Title */}
      <div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: rawTokens.fontCalligraphy,
              letterSpacing: "0em",
              color: rawTokens.textPrimary,
              marginBottom: "12px",
            }}
          >
            Match Quality
          </div>

        {/* Three Large Metrics Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          {/* Approved */}
          <div
            onClick={() => onSelectTier?.("approved")}
            style={{ cursor: "pointer" }}
            title="Click to filter by Auto-Approved"
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0F5132",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              91.6%
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                fontWeight: 700,
                color: rawTokens.colorVerified,
                marginTop: "4px",
              }}
            >
              <CheckCircle2 size={11} strokeWidth={2.4} />
              <span>AUTO-APPROVED</span>
            </div>
          </div>

          {/* Review */}
          <div
            onClick={() => onSelectTier?.("review")}
            style={{ cursor: "pointer" }}
            title="Click to filter by Review Required"
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: rawTokens.colorAnchor,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              6.8%
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                fontWeight: 700,
                color: "#D97706",
                marginTop: "4px",
              }}
            >
              <AlertTriangle size={11} strokeWidth={2.4} />
              <span>REVIEW</span>
            </div>
          </div>

          {/* Novel */}
          <div
            onClick={() => onSelectTier?.("novel")}
            style={{ cursor: "pointer" }}
            title="Click to filter by Novel items"
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: rawTokens.colorAction,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              1.6%
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                fontWeight: 700,
                color: rawTokens.colorAction,
                marginTop: "4px",
              }}
            >
              <Sparkles size={11} strokeWidth={2.4} />
              <span>NOVEL</span>
            </div>
          </div>
        </div>

        {/* MicroCharts SegBar */}
        <div style={{ marginTop: "16px" }}>
          <SegBar
            segments={[
              {
                label: "Approved",
                value: 91.6,
                color: rawTokens.colorVerified,
              },
              { label: "Review", value: 6.8, color: rawTokens.colorHighlight },
              { label: "Novel", value: 1.6, color: rawTokens.colorAction },
            ]}
            height={8}
            showLegend={false}
          />
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          fontSize: "11px",
          color: rawTokens.textMuted,
          marginTop: "10px",
        }}
      >
        based on current harmonization jobs
      </div>
    </div>
  );
};
