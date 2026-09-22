// ponytail: Dense material search bar inspired by the listening Nike search bar.
// Upgrade path: add asynchronous autocomplete suggestion flyout.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";
import { Search, Plus, Maximize2, Download, RotateCw, X } from "lucide-react";

export interface MaterialSearchBarProps {
  onSearch: (query: string) => void;
  onOpenCompare?: () => void;
  onRefresh?: () => void;
}

export const MaterialSearchBar: React.FC<MaterialSearchBarProps> = ({
  onSearch,
  onOpenCompare,
  onRefresh,
}) => {
  const [query, setQuery] = useState("2 inch 150# flanged ball valve A105");
  const [activeChip, setActiveChip] = useState<string | null>("BALL VALVE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      // extract short chip
      const upper = query.toUpperCase();
      if (upper.includes("VALVE")) setActiveChip("BALL VALVE");
      else if (upper.includes("GASKET")) setActiveChip("GASKET");
      else if (upper.includes("PIPE")) setActiveChip("LINE PIPE");
      else setActiveChip(query.split(" ").slice(0, 2).join(" ").toUpperCase());
    }
  };

  const handleClearChip = () => {
    setActiveChip(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${rawTokens.borderSubtle}`,
        borderRadius: "8px",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flex: 1,
        }}
      >
        {/* Active Query Chip with red indicator dot */}
        {activeChip && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(233, 67, 68, 0.08)",
              border: "1px solid rgba(233, 67, 68, 0.2)",
              borderRadius: "4px",
              padding: "3px 7px",
              fontSize: "11px",
              fontWeight: 700,
              color: rawTokens.colorAction,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: rawTokens.colorAction,
                display: "inline-block",
              }}
            />
            <span>{activeChip}</span>
            <button
              type="button"
              onClick={handleClearChip}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: rawTokens.colorAction,
              }}
            >
              <X size={11} />
            </button>
          </div>
        )}

        <Search size={15} color={rawTokens.textMuted} />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search materials, ONMC codes, SAP codes... (Press ⌘K)"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "13px",
            color: rawTokens.textPrimary,
            fontFamily: rawTokens.fontSans,
            backgroundColor: "transparent",
            padding: "4px 0",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "4px 10px",
            backgroundColor: rawTokens.surfaceSubtle,
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "5px",
            fontSize: "11px",
            fontWeight: 600,
            color: rawTokens.textSecondary,
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* Compare button */}
        <button
          onClick={onOpenCompare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 11px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: rawTokens.textPrimary,
            cursor: "pointer",
          }}
        >
          <Plus size={13} color={rawTokens.colorAction} strokeWidth={2.4} />
          Compare
        </button>

        {/* Small icon actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            marginLeft: "4px",
          }}
        >
          <button
            title="Expand Fullscreen"
            style={{
              padding: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Maximize2 size={13} />
          </button>
          <button
            title="Export CSV / JSON"
            style={{
              padding: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Download size={13} />
          </button>
          <button
            onClick={onRefresh}
            title="Refresh Ingestion Index"
            style={{
              padding: "5px",
              background: "none",
              border: "none",
              color: rawTokens.textMuted,
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RotateCw size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
