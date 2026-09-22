// ponytail: MicroCharts suite inspired by microcharts.dev.
// Zero runtime dependencies, pure inline SVG, word-sized charts for KPI cards, table cells, and triage badges.

import React from "react";
import { rawTokens } from "../tokens.stylex";

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  showEndDot?: boolean;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 80,
  height = 22,
  color = rawTokens.colorAction,
  fillOpacity = 0.12,
  showEndDot = true,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const paddingY = 3;
  const availableH = height - paddingY * 2;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 4) + 2;
    const y = height - paddingY - ((val - min) / range) * availableH;
    return { x, y };
  });

  // Build path definition
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    // Smooth curve using cubic bezier control points
    const prev = points[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  const lastPt = points[points.length - 1];
  const areaD = `${pathD} L ${lastPt.x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        overflow: "visible",
      }}
      aria-label={`Trend chart with ${data.length} points, current value: ${data[data.length - 1]}`}
    >
      <defs>
        <linearGradient
          id={`grad-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace("#", "")})`} />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showEndDot && (
        <>
          <circle
            cx={lastPt.x}
            cy={lastPt.y}
            r={3}
            fill="#FFFFFF"
            stroke={color}
            strokeWidth={1.5}
          />
          <circle cx={lastPt.x} cy={lastPt.y} r={1.5} fill={color} />
        </>
      )}
    </svg>
  );
};

export interface SparkBarProps {
  data: number[];
  width?: number;
  height?: number;
  barColor?: string;
  accentLast?: boolean;
  accentColor?: string;
}

export const SparkBar: React.FC<SparkBarProps> = ({
  data,
  width = 72,
  height = 20,
  barColor = rawTokens.colorVerified,
  accentLast = true,
  accentColor = rawTokens.colorAction,
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(0, ...data);
  const max = Math.max(...data) || 1;
  const range = max - min;
  const count = data.length;
  const gap = 2;
  const barWidth = Math.max(2, (width - (count - 1) * gap) / count);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "inline-block", verticalAlign: "middle" }}
      aria-label={`Micro bar chart with ${data.length} bars`}
    >
      {data.map((val, idx) => {
        const barH = Math.max(2, (val / range) * (height - 2));
        const x = idx * (barWidth + gap);
        const y = height - barH;
        const isLast = idx === count - 1;
        const fill = isLast && accentLast ? accentColor : barColor;

        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width={barWidth}
            height={barH}
            rx={1}
            fill={fill}
            opacity={isLast ? 1 : 0.75}
          />
        );
      })}
    </svg>
  );
};

export interface SegBarItem {
  label: string;
  value: number;
  color: string;
}

export interface SegBarProps {
  segments: SegBarItem[];
  width?: number | string;
  height?: number;
  showLegend?: boolean;
}

export const SegBar: React.FC<SegBarProps> = ({
  segments,
  width = "100%",
  height = 8,
  showLegend = false,
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          height: `${height}px`,
          width: typeof width === "number" ? `${width}px` : width,
          borderRadius: rawTokens.radiusFull,
          overflow: "hidden",
          backgroundColor: "#E2E8F0",
          gap: "1px",
        }}
      >
        {segments.map((seg, idx) => {
          const pct = (seg.value / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={idx}
              title={`${seg.label}: ${seg.value} (${pct.toFixed(1)}%)`}
              style={{
                width: `${pct}%`,
                height: "100%",
                backgroundColor: seg.color,
                transition: "width 0.3s ease",
              }}
            />
          );
        })}
      </div>

      {showLegend && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "11px",
          }}
        >
          {segments.map((seg, idx) => {
            const pct = (seg.value / total) * 100;
            return (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: seg.color,
                  }}
                />
                <span
                  style={{ color: rawTokens.textSecondary, fontWeight: 500 }}
                >
                  {seg.label}
                </span>
                <span
                  style={{
                    color: rawTokens.textPrimary,
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  {pct.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface BulletMeterProps {
  value: number; // 0-100
  target?: number; // 0-100
  width?: number;
  height?: number;
  color?: string;
}

export const BulletMeter: React.FC<BulletMeterProps> = ({
  value,
  target = 90,
  width = 100,
  height = 14,
  color = rawTokens.colorApproved,
}) => {
  const clampVal = Math.min(100, Math.max(0, value));
  const clampTarget = Math.min(100, Math.max(0, target));

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Background track */}
      <rect
        x="0"
        y="3"
        width={width}
        height={height - 6}
        rx={3}
        fill="#E2E8F0"
      />
      {/* Actual value bar */}
      <rect
        x="0"
        y="3"
        width={(clampVal / 100) * width}
        height={height - 6}
        rx={3}
        fill={color}
      />
      {/* Target marker */}
      {target > 0 && (
        <line
          x1={(clampTarget / 100) * width}
          y1="0"
          x2={(clampTarget / 100) * width}
          y2={height}
          stroke={rawTokens.textPrimary}
          strokeWidth={2}
        />
      )}
    </svg>
  );
};

export interface DonutMicroProps {
  value: number; // percentage 0 - 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  showText?: boolean;
}

export const DonutMicro: React.FC<DonutMicroProps> = ({
  value,
  size = 28,
  strokeWidth = 3.5,
  color = rawTokens.colorApproved,
  showText = false,
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      {showText && (
        <span
          style={{
            position: "absolute",
            fontSize: "9px",
            fontWeight: 800,
            fontFamily: rawTokens.fontMono,
            color: rawTokens.textPrimary,
          }}
        >
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
};

export interface RugPlotProps {
  values: number[]; // 0 to 1
  width?: number;
  height?: number;
  color?: string;
}

export const RugPlot: React.FC<RugPlotProps> = ({
  values,
  width = 90,
  height = 14,
  color = rawTokens.colorAction,
}) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <line
        x1="0"
        y1={height - 1}
        x2={width}
        y2={height - 1}
        stroke="#E2E8F0"
        strokeWidth={1}
      />
      {values.map((v, i) => {
        const x = Math.min(width - 1, Math.max(0, v * width));
        return (
          <line
            key={i}
            x1={x}
            y1={2}
            x2={x}
            y2={height - 2}
            stroke={color}
            strokeWidth={1.2}
            strokeOpacity={0.65}
          />
        );
      })}
    </svg>
  );
};
