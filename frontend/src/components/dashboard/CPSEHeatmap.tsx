// ponytail: Dense CPSE activity heatmap matrix modeled after the listening reference heatmap.
// Upgrade path: add hourly breakdown toggle (Hours vs Days).

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";

export const CPSEHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{
    cpse: string;
    day: string;
    count: number;
  } | null>(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const cpseRows = [
    { name: "IOCL", values: [420, 510, 480, 620, 590, 210, 180] },
    { name: "ONGC", values: [380, 440, 490, 530, 510, 190, 140] },
    { name: "BPCL", values: [290, 310, 340, 410, 390, 120, 95] },
    { name: "HPCL", values: [260, 290, 310, 360, 340, 110, 80] },
    { name: "GAIL", values: [180, 220, 250, 280, 270, 75, 60] },
    { name: "OIL", values: [140, 160, 180, 210, 195, 60, 45] },
    { name: "EIL", values: [95, 110, 125, 140, 130, 40, 30] },
    { name: "NRL", values: [85, 95, 105, 120, 115, 35, 25] },
  ];

  // Calculate day totals
  const dayTotals = days.map((_, dayIdx) =>
    cpseRows.reduce((sum, r) => sum + r.values[dayIdx], 0)
  );

  // Maximum value for intensity color scale
  const maxVal = 620;

  // Intensity color generator
  const getCellBg = (val: number) => {
    const ratio = Math.min(val / maxVal, 1);
    if (ratio > 0.8) {
      // Highest activity: deep petroleum sage / terracotta anchor
      return "rgba(95, 151, 142, 0.92)";
    } else if (ratio > 0.6) {
      return "rgba(95, 151, 142, 0.70)";
    } else if (ratio > 0.4) {
      return "rgba(95, 151, 142, 0.45)";
    } else if (ratio > 0.2) {
      return "rgba(95, 151, 142, 0.25)";
    } else {
      return "rgba(95, 151, 142, 0.12)";
    }
  };

  const getCellTextColor = (val: number) => {
    const ratio = val / maxVal;
    return ratio > 0.6 ? "#FFFFFF" : rawTokens.textPrimary;
  };

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
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: rawTokens.textMuted,
            }}
          >
            CPSE Activity
          </div>
          <div
            style={{
              fontSize: "11px",
              color: rawTokens.textSecondary,
              marginTop: "2px",
            }}
          >
            Harmonization volume by participating CPSE
          </div>
        </div>

        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: rawTokens.colorVerified,
            backgroundColor: "rgba(95, 151, 142, 0.1)",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          Records processed
        </div>
      </div>

      {/* Matrix Table */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "3px",
            fontSize: "11px",
            fontFamily: rawTokens.fontMono,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  padding: "4px 6px",
                  fontFamily: rawTokens.fontSans,
                  width: "55px",
                }}
              >
                CPSE
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  style={{
                    textAlign: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    padding: "4px 2px",
                    fontFamily: rawTokens.fontSans,
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cpseRows.map((row) => (
              <tr key={row.name}>
                <td
                  style={{
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                    fontSize: "11px",
                    padding: "3px 6px",
                    fontFamily: rawTokens.fontSans,
                  }}
                >
                  {row.name}
                </td>
                {row.values.map((val, dIdx) => (
                  <td
                    key={dIdx}
                    onMouseEnter={() =>
                      setHoveredCell({
                        cpse: row.name,
                        day: days[dIdx],
                        count: val,
                      })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      textAlign: "center",
                      padding: "4px 2px",
                      borderRadius: "4px",
                      backgroundColor: getCellBg(val),
                      color: getCellTextColor(val),
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "transform 0.1s ease",
                    }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}

            {/* Total Row */}
            <tr>
              <td
                style={{
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  fontSize: "10px",
                  padding: "6px 6px 2px 6px",
                  fontFamily: rawTokens.fontSans,
                  textTransform: "uppercase",
                }}
              >
                Total
              </td>
              {dayTotals.map((tot, idx) => (
                <td
                  key={idx}
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                    fontSize: "10.5px",
                    padding: "6px 2px 2px 2px",
                  }}
                >
                  {tot.toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "18px",
            backgroundColor: "rgba(15, 23, 42, 0.92)",
            color: "#FFFFFF",
            fontSize: "10.5px",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>
            <strong>{hoveredCell.cpse}</strong> • {hoveredCell.day}:
          </span>
          <span style={{ color: "#A5D7C9", fontWeight: 700 }}>
            {hoveredCell.count} records
          </span>
        </div>
      )}
    </div>
  );
};
