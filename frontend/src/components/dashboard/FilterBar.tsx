// ponytail: Compact filter bar matching the listening dashboard reference pill controls.
// Upgrade path: persist active filter presets to localStorage.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";
import { Filter, Calendar, ChevronDown, Check } from "lucide-react";

export interface FilterState {
  period: "1D" | "7D";
  dateRange: string;
  cpse: string;
  plant: string;
  materialClass: string;
  matchStatus: string;
}

export interface FilterBarProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onOpenAdvancedFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilters,
  onOpenAdvancedFilters,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const cpseOptions = [
    "All CPSEs",
    "IOCL",
    "ONGC",
    "BPCL",
    "HPCL",
    "GAIL",
    "OIL",
    "EIL",
    "NRL",
  ];

  const plantOptions = [
    "All Plants",
    "Gujarat Refinery (IOCL)",
    "Hazira Complex (ONGC)",
    "Mumbai Refinery (BPCL)",
    "Visakh Refinery (HPCL)",
    "Pata Petrochem (GAIL)",
    "Duliajan Fields (OIL)",
  ];

  const classOptions = [
    "All Classes",
    "Mechanical - Valves",
    "Mechanical - Pipes & Tubes",
    "Mechanical - Flanges & Gaskets",
    "Electrical - Motors",
    "Instrumentation - Transmitters",
  ];

  const statusOptions = [
    "All Statuses",
    "Auto-Approved (≥92%)",
    "Review Required (70-91%)",
    "Safety Conflicts",
    "Novel Materials",
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
        userSelect: "none",
      }}
    >
      {/* Primary Pill Group (screenshot style) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        {/* Filters primary button */}
        <button
          onClick={onOpenAdvancedFilters}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            backgroundColor: "#E2E8F0",
            border: "1px solid #CBD5E1",
            borderRadius: "16px",
            fontSize: "11px",
            fontWeight: 700,
            color: rawTokens.textPrimary,
            cursor: "pointer",
          }}
        >
          <Filter size={11} strokeWidth={2.4} />
          Filters
        </button>

        {/* 1D / 7D toggle group */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "#E2E8F0",
            borderRadius: "16px",
            padding: "2px",
            border: "1px solid #CBD5E1",
          }}
        >
          <button
            onClick={() => onChangeFilters({ ...filters, period: "1D" })}
            style={{
              padding: "2px 8px",
              borderRadius: "14px",
              border: "none",
              backgroundColor:
                filters.period === "1D" ? "#0F172A" : "transparent",
              color:
                filters.period === "1D" ? "#FFFFFF" : rawTokens.textSecondary,
              fontSize: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            1D
          </button>
          <button
            onClick={() => onChangeFilters({ ...filters, period: "7D" })}
            style={{
              padding: "2px 8px",
              borderRadius: "14px",
              border: "none",
              backgroundColor:
                filters.period === "7D" ? "#0F172A" : "transparent",
              color:
                filters.period === "7D" ? "#FFFFFF" : rawTokens.textSecondary,
              fontSize: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            7D
          </button>
        </div>

        {/* Date range pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "4px 10px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "16px",
            fontSize: "11px",
            fontWeight: 600,
            color: rawTokens.textPrimary,
          }}
        >
          <Calendar size={11} color={rawTokens.textMuted} />
          <span>{filters.dateRange}</span>
        </div>

        {/* CPSE Dropdown Pill */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "cpse" ? null : "cpse")
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              backgroundColor:
                filters.cpse !== "All CPSEs"
                  ? "rgba(95, 151, 142, 0.12)"
                  : "#FFFFFF",
              border: `1px solid ${filters.cpse !== "All CPSEs" ? rawTokens.colorVerified : rawTokens.borderSubtle}`,
              borderRadius: "16px",
              fontSize: "11px",
              fontWeight: 600,
              color:
                filters.cpse !== "All CPSEs"
                  ? rawTokens.colorVerified
                  : rawTokens.textSecondary,
              cursor: "pointer",
            }}
          >
            <span>{filters.cpse}</span>
            <ChevronDown size={11} />
          </button>

          {activeDropdown === "cpse" && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                width: "150px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 30,
                padding: "4px 0",
              }}
            >
              {cpseOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChangeFilters({ ...filters, cpse: opt });
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: opt === filters.cpse ? 700 : 500,
                    color:
                      opt === filters.cpse
                        ? rawTokens.colorAction
                        : rawTokens.textPrimary,
                    backgroundColor:
                      opt === filters.cpse
                        ? "rgba(233, 67, 68, 0.06)"
                        : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{opt}</span>
                  {opt === filters.cpse && <Check size={12} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plants Dropdown Pill */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "plant" ? null : "plant")
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              backgroundColor:
                filters.plant !== "All Plants"
                  ? "rgba(95, 151, 142, 0.12)"
                  : "#FFFFFF",
              border: `1px solid ${filters.plant !== "All Plants" ? rawTokens.colorVerified : rawTokens.borderSubtle}`,
              borderRadius: "16px",
              fontSize: "11px",
              fontWeight: 600,
              color:
                filters.plant !== "All Plants"
                  ? rawTokens.colorVerified
                  : rawTokens.textSecondary,
              cursor: "pointer",
            }}
          >
            <span>{filters.plant}</span>
            <ChevronDown size={11} />
          </button>

          {activeDropdown === "plant" && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                width: "210px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 30,
                padding: "4px 0",
              }}
            >
              {plantOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChangeFilters({ ...filters, plant: opt });
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: opt === filters.plant ? 700 : 500,
                    color:
                      opt === filters.plant
                        ? rawTokens.colorAction
                        : rawTokens.textPrimary,
                    backgroundColor:
                      opt === filters.plant
                        ? "rgba(233, 67, 68, 0.06)"
                        : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt}
                  </span>
                  {opt === filters.plant && <Check size={12} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Material Class Pill */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "class" ? null : "class")
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              backgroundColor:
                filters.materialClass !== "All Classes"
                  ? "rgba(89, 60, 50, 0.1)"
                  : "#FFFFFF",
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: "16px",
              fontSize: "11px",
              fontWeight: 600,
              color: rawTokens.textSecondary,
              cursor: "pointer",
            }}
          >
            <span>{filters.materialClass}</span>
            <ChevronDown size={11} />
          </button>

          {activeDropdown === "class" && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                width: "210px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 30,
                padding: "4px 0",
              }}
            >
              {classOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChangeFilters({ ...filters, materialClass: opt });
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: opt === filters.materialClass ? 700 : 500,
                    color:
                      opt === filters.materialClass
                        ? rawTokens.colorAction
                        : rawTokens.textPrimary,
                    backgroundColor:
                      opt === filters.materialClass
                        ? "rgba(233, 67, 68, 0.06)"
                        : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Match Status Pill */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() =>
              setActiveDropdown(activeDropdown === "status" ? null : "status")
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              backgroundColor:
                filters.matchStatus !== "All Statuses"
                  ? "rgba(165, 215, 201, 0.25)"
                  : "#FFFFFF",
              border: `1px solid ${filters.matchStatus !== "All Statuses" ? rawTokens.colorVerified : rawTokens.borderSubtle}`,
              borderRadius: "16px",
              fontSize: "11px",
              fontWeight: 600,
              color: rawTokens.textSecondary,
              cursor: "pointer",
            }}
          >
            <span>{filters.matchStatus}</span>
            <ChevronDown size={11} />
          </button>

          {activeDropdown === "status" && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                marginTop: "4px",
                width: "190px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 30,
                padding: "4px 0",
              }}
            >
              {statusOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChangeFilters({ ...filters, matchStatus: opt });
                    setActiveDropdown(null);
                  }}
                  style={{
                    padding: "6px 10px",
                    fontSize: "11px",
                    fontWeight: opt === filters.matchStatus ? 700 : 500,
                    color:
                      opt === filters.matchStatus
                        ? rawTokens.colorAction
                        : rawTokens.textPrimary,
                    backgroundColor:
                      opt === filters.matchStatus
                        ? "rgba(233, 67, 68, 0.06)"
                        : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear filters shortcut if active */}
      {(filters.cpse !== "All CPSEs" ||
        filters.plant !== "All Plants" ||
        filters.materialClass !== "All Classes" ||
        filters.matchStatus !== "All Statuses") && (
        <button
          onClick={() =>
            onChangeFilters({
              ...filters,
              cpse: "All CPSEs",
              plant: "All Plants",
              materialClass: "All Classes",
              matchStatus: "All Statuses",
            })
          }
          style={{
            fontSize: "10px",
            color: rawTokens.colorAction,
            background: "none",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            padding: "2px 6px",
          }}
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};
