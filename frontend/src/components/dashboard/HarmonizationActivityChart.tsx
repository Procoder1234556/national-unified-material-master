// ponytail: Pilot-week harmonization activity — POC catalog throughput (not national fantasy volume).

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

  // POC-scale daily throughput (24-line multi-CPSE seed over pilot week)
  const data: DataPoint[] = [
    { date: "19 Sep", processed: 4, approved: 2, review: 2 },
    { date: "20 Sep", processed: 3, approved: 2, review: 1 },
    { date: "21 Sep", processed: 5, approved: 3, review: 2 },
    { date: "22 Sep", processed: 4, approved: 3, review: 1 },
    { date: "23 Sep", processed: 3, approved: 2, review: 1 },
    { date: "24 Sep", processed: 3, approved: 2, review: 1 },
    { date: "25 Sep", processed: 2, approved: 1, review: 1 },
  ];

  const yTicks = [6, 5, 4, 3, 2, 1];
  const maxVal = 7;
  const minVal = 0;

  const width = 640;
  const height = 210;
  const paddingLeft = 42;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 32;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index: number) =>
    paddingLeft + (index / (data.length - 1)) * chartWidth;

  const getY = (val: number) =>
    paddingTop + (1 - (val - minVal) / (maxVal - minVal)) * chartHeight;

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
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: rawTokens.fontSans,
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
            POC catalog lines processed (24-record multi-CPSE seed)
          </p>
        </div>

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
              Processed
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
              Auto-approved
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
              Review
            </span>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", height: "210px" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
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
                  {tick}
                </text>
              </g>
            );
          })}

          <path d={processedArea} fill="url(#terracottaGradient)" />
          <path
            d={reviewLine}
            fill="none"
            stroke="#F1CC9D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d={approvedLine}
            fill="none"
            stroke={rawTokens.colorVerified}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d={processedLine}
            fill="none"
            stroke={rawTokens.colorAction}
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoverIndex === i;
            return (
              <g key={d.date}>
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
                <circle
                  cx={x}
                  cy={getY(d.processed)}
                  r={isHovered ? 5 : 3}
                  fill="#FFFFFF"
                  stroke={rawTokens.colorAction}
                  strokeWidth="2"
                />
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

        {hoverIndex !== null && (
          <div
            style={{
              position: "absolute",
              left: `${Math.min(Math.max((getX(hoverIndex) / width) * 100, 18), 82)}%`,
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
              <strong>{data[hoverIndex].processed}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ color: "#A5D7C9" }}>Approved:</span>
              <strong>{data[hoverIndex].approved}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <span style={{ color: "#FDE68A" }}>Review:</span>
              <strong>{data[hoverIndex].review}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
