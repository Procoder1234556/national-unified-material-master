// ponytail: High-density operational KPI cards upgraded with microcharts.dev and watermelon.sh design patterns.
// Upgrade path: add real-time websocket pulse counters for live streaming CPSE pipelines.

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
}

export const KPICardGrid: React.FC<KPICardGridProps> = ({ onCardClick }) => {
  const cards = [
    {
      id: "harmonized",
      title: "MATERIALS HARMONIZED",
      value: "12.6K",
      indicator: "↑ 8.4%",
      indicatorType: "positive",
      caption: "compared to previous 7 days",
      accentColor: rawTokens.colorAction,
      icon: TrendingUp,
      renderMicro: () => (
        <Sparkline
          data={[9.8, 10.4, 10.9, 11.2, 11.8, 12.1, 12.6]}
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
      value: "1,284",
      indicator: "↓ 12.6%",
      indicatorType: "neutral",
      caption: "borderline clusters awaiting stewardship",
      accentColor: "#D97706", // warm amber/sandstone
      badgeStyle: {
        backgroundColor: "rgba(241, 204, 157, 0.4)",
        color: rawTokens.colorAnchor,
      },
      icon: TrendingDown,
      renderMicro: () => (
        <SparkBar
          data={[240, 210, 195, 230, 180, 160, 140]}
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
      value: "91.6%",
      indicator: "SAFE MATCH",
      indicatorType: "verified",
      caption: "engineering safety gate passed",
      accentColor: rawTokens.colorVerified,
      badgeStyle: {
        backgroundColor: "rgba(165, 215, 201, 0.35)",
        color: "#0F5132",
      },
      icon: ShieldCheck,
      renderMicro: () => (
        <DonutMicro
          value={91.6}
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
      value: "46",
      indicator: "ACTION REQUIRED",
      indicatorType: "conflict",
      caption: "pressure, size or metallurgy conflicts",
      accentColor: rawTokens.colorConflict,
      badgeStyle: {
        backgroundColor: "rgba(155, 18, 30, 0.12)",
        color: rawTokens.colorConflict,
      },
      icon: AlertOctagon,
      renderMicro: () => (
        <RugPlot
          values={[0.08, 0.14, 0.22, 0.35, 0.48, 0.62, 0.78, 0.88, 0.96]}
          width={60}
          height={16}
          color={rawTokens.colorConflict}
        />
      ),
    },
    {
      id: "surplus",
      title: "SURPLUS STOCK",
      value: "10.4K",
      indicator: "UNITS AVAILABLE",
      indicatorType: "verified",
      caption: "across participating CPSEs",
      accentColor: rawTokens.colorVerified,
      badgeStyle: {
        backgroundColor: "rgba(95, 151, 142, 0.12)",
        color: rawTokens.colorVerified,
      },
      icon: Boxes,
      renderMicro: () => (
        <Sparkline
          data={[7.2, 7.8, 8.4, 8.9, 9.5, 9.9, 10.4]}
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
            {/* Header: Title + Micro Icon */}
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

            {/* Middle: Big Metric + MicroChart + Supporting Indicator */}
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

              {/* Watermelon UI / MicroCharts inline preview */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {card.renderMicro && card.renderMicro()}

                {/* Supporting badge */}
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
                  {card.indicator.startsWith("↑") ||
                  card.indicator.startsWith("↓") ? (
                    <span>{card.indicator}</span>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Caption */}
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
