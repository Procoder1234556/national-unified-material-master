// ponytail: Operational KPI cards — POC/pilot scale grounded in PRD.md + seed catalog.
// Upgrade path: live aggregates from /api/v1 when national volumes land.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertOctagon,
  Boxes,
} from "lucide-react";
import { Sparkline, SparkBar, DonutMicro, RugPlot } from "../MicroCharts";

export interface KPICardGridProps {
  onCardClick?: (metricKey: string) => void;
  reviewPending?: number;
  materialsInPilot?: number;
  autoApprovedPct?: number;
  safetyConflicts?: number;
  surplusUnits?: number;
}

export const KPICardGrid: React.FC<KPICardGridProps> = ({
  onCardClick,
  reviewPending = 6,
  materialsInPilot = 24,
  autoApprovedPct = 58,
  safetyConflicts = 1,
  surplusUnits = 14,
}) => {
  const cards = [
    {
      id: "harmonized",
      title: "PILOT CATALOG LINES",
      value: String(materialsInPilot),
      indicator: "POC.md",
      indicatorType: "positive" as const,
      caption: "Multi-CPSE benchmark dataset (SIH 26099)",
      accentColor: rawTokens.colorAction,
      icon: TrendingUp,
      renderMicro: () => (
        <Sparkline
          data={[4, 8, 12, 16, 20, 22, materialsInPilot]}
          width={64}
          height={20}
          color={rawTokens.colorAction}
          fillOpacity={0.15}
          showEndDot={true}
        />
      ),
    },
    {
      id: "review",
      title: "REVIEW REQUIRED",
      value: reviewPending.toLocaleString(),
      indicator: "70–91%",
      indicatorType: "neutral" as const,
      caption: "PENDING_REVIEW mappings (steward queue)",
      accentColor: "#D97706",
      badgeStyle: {
        backgroundColor: "rgba(241, 204, 157, 0.4)",
        color: rawTokens.colorAnchor,
      },
      icon: TrendingDown,
      renderMicro: () => (
        <SparkBar
          data={[2, 3, 4, 5, 4, 5, reviewPending]}
          width={60}
          height={18}
          barColor="#F1CC9D"
          accentColor="#D97706"
        />
      ),
    },
    {
      id: "approved",
      title: "AUTO-APPROVED",
      value: `${autoApprovedPct}%`,
      indicator: "≥92% + GATE",
      indicatorType: "verified" as const,
      caption: "Safety gate passed · ASME / API hard rules",
      accentColor: rawTokens.colorVerified,
      badgeStyle: {
        backgroundColor: "rgba(165, 215, 201, 0.35)",
        color: "#0F5132",
      },
      icon: ShieldCheck,
      renderMicro: () => (
        <DonutMicro
          value={autoApprovedPct}
          size={24}
          strokeWidth={3}
          color={rawTokens.colorVerified}
          showText={false}
        />
      ),
    },
    {
      id: "conflicts",
      title: "SAFETY CONFLICTS",
      value: String(safetyConflicts),
      indicator: "GATE BLOCK",
      indicatorType: "conflict" as const,
      caption: "Pressure / size / metallurgy hard mismatches",
      accentColor: rawTokens.colorConflict,
      badgeStyle: {
        backgroundColor: "rgba(155, 18, 30, 0.12)",
        color: rawTokens.colorConflict,
      },
      icon: AlertOctagon,
      renderMicro: () => (
        <RugPlot
          values={[0.2, 0.35, 0.5, 0.72, 0.9]}
          width={60}
          height={16}
          color={rawTokens.colorConflict}
        />
      ),
    },
    {
      id: "surplus",
      title: "SURPLUS UNITS",
      value: String(surplusUnits),
      indicator: "ONGC HAZIRA",
      indicatorType: "verified" as const,
      caption: 'APP_FLOW SBB: 2" Class 150 ball valve (78 km)',
      accentColor: rawTokens.colorVerified,
      badgeStyle: {
        backgroundColor: "rgba(95, 151, 142, 0.12)",
        color: rawTokens.colorVerified,
      },
      icon: Boxes,
      renderMicro: () => (
        <Sparkline
          data={[14, 14, 14, 14, 14, 14, surplusUnits]}
          width={64}
          height={20}
          color={rawTokens.colorVerified}
          fillOpacity={0.15}
          showEndDot={true}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        width: "100%",
      }}
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card.id)}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: "12px",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow:
                "0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.4)",
              minHeight: "108px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(203, 213, 225, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.4)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                {card.title}
              </span>
              <Icon size={13} color={card.accentColor} strokeWidth={2.2} />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "6px",
                margin: "4px 0",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: rawTokens.textPrimary,
                  letterSpacing: "-0.03em",
                }}
              >
                {card.value}
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {card.renderMicro && card.renderMicro()}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "3px",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    whiteSpace: "nowrap",
                    ...(card.badgeStyle || {
                      backgroundColor:
                        card.indicatorType === "positive"
                          ? "rgba(165, 215, 201, 0.35)"
                          : "rgba(241, 204, 157, 0.4)",
                      color:
                        card.indicatorType === "positive"
                          ? "#0F5132"
                          : rawTokens.colorAnchor,
                    }),
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: card.accentColor,
                      display: "inline-block",
                    }}
                  />
                  <span>{card.indicator}</span>
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "10.5px",
                color: rawTokens.textSecondary,
                lineHeight: 1.2,
                marginTop: "2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={card.caption}
            >
              {card.caption}
            </div>
          </div>
        );
      })}
    </div>
  );
};
