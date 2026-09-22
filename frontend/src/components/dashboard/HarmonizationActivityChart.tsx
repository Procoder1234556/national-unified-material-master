// ponytail: Clean SVG line/area chart representing Harmonization Activity over time.
// Upgrade path: add multi-series zoom and brush selection when time window exceeds 90 days.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";

export interface DataPoint {
  date: string;
  processed: number;
  approved: number;
  review: number;
}

export const HarmonizationActivityChart: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Realistic data points matching the chart in screenshot
  const data: DataPoint[] = [
    { date: "28 Jan", processed: 2850, approved: 2620, review: 190 },
    { date: "29 Jan", processed: 2710, approved: 2490, review: 180 },
    { date: "30 Jan", processed: 1820, approved: 1670, review: 120 },
    { date: "31 Jan", processed: 1390, approved: 1280, review: 95 },
    { date: "1 Feb", processed: 1340, approved: 1225, review: 90 },
    { date: "2 Feb", processed: 1720, approved: 1580, review: 115 },
    { date: "3 Feb", processed: 980, approved: 895, review: 68 },
  ];

  const yTicks = [3000, 2500, 2000, 1500, 1000, 500];
  const maxVal = 3200;
  const minVal = 0;

  // SVG dimensions
  const width = 640;
  const height = 210;
  const paddingLeft = 42;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 32;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) => {
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + (1 - (val - minVal) / (maxVal - minVal)) * chartHeight;
  };

  // Generate smooth cubic bezier SVG path
  const makeSmoothPath = (values: number[]) => {
    if (values.length === 0) return "";
    let d = `M ${getX(0)},${getY(values[0])}`;
    for (let i = 0; i < values.length - 1; i++) {
      const x0 = getX(i);
      const y0 = getY(values[i]);
      const x1 = getX(i + 1);
      const y1 = getY(values[i + 1]);
      const cx = (x0 + x1) / 2;
      d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
    }
    return d;
  };

  const processedValues = data.map((d) => d.processed);
  const approvedValues = data.map((d) => d.approved);
  const reviewValues = data.map((d) => d.review);

  const processedLine = makeSmoothPath(processedValues);
  const approvedLine = makeSmoothPath(approvedValues);
  const reviewLine = makeSmoothPath(reviewValues);

  // Closed area path for primary line
  const processedArea = `${processedLine} L ${getX(data.length - 1)},${paddingTop + chartHeight} L ${getX(0)},${paddingTop + chartHeight} Z`;

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${rawTokens.borderSubtle}`,
        borderRadius: "12px",
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: rawTokens.fontCalligraphy,
              letterSpacing: "0em",
              textTransform: "none",
              color: rawTokens.textPrimary,
              margin: 0,
            }}
          >
            Harmonization Activity
          </h2>
          <p
            style={{
              fontSize: "11px",
              color: rawTokens.textMuted,
              margin: "2px 0 0 0",
            }}
          >
            Material records processed over the selected period
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "10px",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: rawTokens.colorAction,
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: rawTokens.textSecondary,
              }}
            >
              Materials Processed
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "10px",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: rawTokens.colorVerified,
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: rawTokens.textSecondary,
              }}
            >
              Matches Approved
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "10px",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: "#D97706",
              }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: rawTokens.textSecondary,
              }}
            >
              Review Required
            </span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div style={{ position: "relative", width: "100%", height: "210px" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            {/* Soft terracotta gradient fill */}
            <linearGradient id="terracottaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={rawTokens.colorAction}
                stopOpacity="0.22"
              />
              <stop
                offset="90%"
                stopColor={rawTokens.colorAction}
                stopOpacity="0.02"
              />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines and Y axis ticks */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="#94A3B8"
                  fontFamily={rawTokens.fontSans}
                >
                  {tick >= 1000 ? `${tick / 1000}K` : tick}
                </text>
              </g>
            );
          })}

          {/* Area fill under primary curve */}
          <path d={processedArea} fill="url(#terracottaGradient)" />

          {/* Curve 3: Review required (sandstone/amber) */}
          <path
            d={reviewLine}
            fill="none"
            stroke="#F1CC9D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Curve 2: Approved (sage/mint) */}
          <path
            d={approvedLine}
            fill="none"
            stroke={rawTokens.colorVerified}
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Curve 1: Processed (terracotta primary) */}
          <path
            d={processedLine}
            fill="none"
            stroke={rawTokens.colorAction}
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* X axis labels and vertical hover detection zones */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoverIndex === i;
            return (
              <g key={d.date}>
                {/* Vertical hover guide */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* X-axis label */}
                <text
                  x={x}
                  y={paddingTop + chartHeight + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight={isHovered ? 700 : 500}
                  fill={isHovered ? rawTokens.textPrimary : "#64748B"}
                  fontFamily={rawTokens.fontSans}
                >
                  {d.date}
                </text>

                {/* Indicator dot on primary line */}
                <circle
                  cx={x}
                  cy={getY(d.processed)}
                  r={isHovered ? 5 : 3}
                  fill="#FFFFFF"
                  stroke={rawTokens.colorAction}
                  strokeWidth="2"
                />

                {/* Transparent hit target for hover */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={paddingTop}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoverIndex(i)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoverIndex !== null && (
          <div
            style={{
              position: "absolute",
              left: `${Math.min(
                Math.max((getX(hoverIndex) / width) * 100, 18),
                82
              )}%`,
              top: "20px",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "11px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              pointerEvents: "none",
              zIndex: 10,
              minWidth: "155px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                paddingBottom: "4px",
                marginBottom: "4px",
                fontSize: "11px",
              }}
            >
              {data[hoverIndex].date}, 2026
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ color: "#FDA4AF" }}>Processed:</span>
              <strong>{data[hoverIndex].processed.toLocaleString()}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ color: "#A5D7C9" }}>Approved:</span>
              <strong>{data[hoverIndex].approved.toLocaleString()}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ color: "#FDE68A" }}>Review:</span>
              <strong>{data[hoverIndex].review.toLocaleString()}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
