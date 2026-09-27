// ponytail: Dense material search bar inspired by the listening Nike search bar.
// Upgrade path: add asynchronous autocomplete suggestion flyout.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  Search,
  ClipboardCheck,
  Maximize2,
  Download,
  RotateCw,
  X,
} from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      // Fullscreen can be disabled by an embedded browser. The control remains
      // harmless in that environment instead of interrupting the user.
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
  };

  const handleExport = () => {
    const rows = [
      ["query", "active_filter", "exported_at"],
      [
        query.trim() || "All materials",
        activeChip || "None",
        new Date().toISOString(),
      ],
    ];
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "numm-material-search.csv";
    anchor.click();
    URL.revokeObjectURL(url);
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
          title="Open the review queue to compare candidate material matches"
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
          <ClipboardCheck
            size={13}
            color={rawTokens.colorAction}
            strokeWidth={2.4}
          />
          Review queue
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
            onClick={handleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Expand fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Expand fullscreen"}
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
            onClick={handleExport}
            title="Export current search as CSV"
            aria-label="Export current search as CSV"
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
            aria-label="Refresh ingestion index"
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
