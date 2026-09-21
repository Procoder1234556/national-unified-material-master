// ponytail: National Search Before Buy pre-procurement discovery view.
// Upgrade path: add geographic GIS map visualization for plant inventory clusters.

import React, { useState, useEffect } from "react";
import { rawTokens } from "../tokens.stylex";
import { Search, ArrowRightLeft, ShieldCheck, Filter } from "lucide-react";
import { API_BASE } from "../api";

interface StockDistributionItem {
  organization_code: string;
  organization_name: string;
  plant_code: string;
  plant_location: string;
  available_stock: number;
  unit_price: number;
  currency: string;
  lead_time_days: number;
}

interface NationalSearchResult {
  onmc_code: string;
  canonical_description: string;
  item_class: string;
  size_inch?: number | null;
  size_mm?: number | null;
  pressure_class?: number | null;
  metallurgy?: string | null;
  end_connection?: string | null;
  shell_mesc_code?: string | null;
  mesc_spe_spec?: string | null;
  unspsc_code?: string | null;
  gem_category_id?: string | null;
  similarity_score: number;
  total_national_stock: number;
  participating_cpse_count: number;
  stock_distribution: StockDistributionItem[];
}

interface SearchBeforeBuyProps {
  initialQuery?: string;
  onInitiateTransfer?: (
    item: NationalSearchResult,
    stock: StockDistributionItem
  ) => void;
}

export const SearchBeforeBuy: React.FC<SearchBeforeBuyProps> = ({
  initialQuery = "",
  onInitiateTransfer,
}) => {
  const [query, setQuery] = useState<string>(
    initialQuery || "2 inch 150# ball valve"
  );
  const [itemClassFilter, setItemClassFilter] = useState<string>("");
  const [pressureFilter, setPressureFilter] = useState<string>("");
  const [sizeFilter, setSizeFilter] = useState<string>("");
  const [results, setResults] = useState<NationalSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);

  const executeSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    const payload: any = {
      query: searchQuery,
      limit: 10,
    };
    if (itemClassFilter) payload.item_class = itemClassFilter;
    if (pressureFilter) payload.pressure_class = parseInt(pressureFilter, 10);
    if (sizeFilter) payload.size_inch = parseFloat(sizeFilter);

    fetch(`${API_BASE}/api/v1/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search failed", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    executeSearch(query);
  }, [itemClassFilter, pressureFilter, sizeFilter]);

  const handleQuickPreset = (presetQuery: string, cls: string = "") => {
    setQuery(presetQuery);
    setItemClassFilter(cls);
    executeSearch(presetQuery);
  };

  const handleTransferClick = (
    item: NationalSearchResult,
    stock: StockDistributionItem
  ) => {
    setTransferSuccess(
      `Material Transfer Requisition (MTIRF) initiated with ${stock.organization_code} (${stock.plant_location}) for ${item.onmc_code}!`
    );
    if (onInitiateTransfer) {
      onInitiateTransfer(item, stock);
    }
    setTimeout(() => setTransferSuccess(null), 5000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: rawTokens.surfaceCard,
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderRadius: rawTokens.radiusLg,
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(95, 151, 142, 0.15)",
              color: rawTokens.colorVerified,
              width: "40px",
              height: "40px",
              borderRadius: rawTokens.radiusMd,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Search size={22} />
          </div>
          <div>
            <h2
              style={{
                fontSize: rawTokens.textLg,
                fontWeight: 700,
                color: rawTokens.textPrimary,
              }}
            >
              National "Search Before Buy" Pre-Procurement Portal
            </h2>
            <div
              style={{ fontSize: rawTokens.textXs, color: rawTokens.textMuted }}
            >
              Query shared inventory across 10 CPSEs before issuing purchase
              requisitions (Rule 149 GFR compliance)
            </div>
          </div>
        </div>

        {/* Transfer Confirmation Toast */}
        {transferSuccess && (
          <div
            style={{
              backgroundColor: "rgba(165, 215, 201, 0.25)",
              border: "1px solid #0D533A",
              borderRadius: rawTokens.radiusMd,
              padding: "12px 16px",
              marginTop: "12px",
              color: "#0D533A",
              fontSize: rawTokens.textSm,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ShieldCheck size={18} />
            {transferSuccess}
          </div>
        )}

        {/* Search Input Box */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && executeSearch()}
              placeholder="Search by part description, standard, or MESC code (e.g. 2 inch 150# ball valve A105)..."
              style={{
                width: "100%",
                padding: "12px 16px 12px 42px",
                fontSize: rawTokens.textBase,
                borderRadius: rawTokens.radiusMd,
                border: `1px solid ${rawTokens.borderStrong}`,
                outline: "none",
                fontFamily: rawTokens.fontSans,
                boxSizing: "border-box",
              }}
            />
            <Search
              size={18}
              color={rawTokens.textMuted}
              style={{ position: "absolute", left: "14px", top: "14px" }}
            />
          </div>

          <button
            onClick={() => executeSearch()}
            style={{
              backgroundColor: rawTokens.colorAction,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusMd,
              padding: "0 24px",
              fontSize: rawTokens.textSm,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Search size={16} />
            Search
          </button>
        </div>

        {/* Filter Controls Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "16px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: rawTokens.textXs,
              color: rawTokens.textSecondary,
              fontWeight: 700,
            }}
          >
            <Filter size={14} />
            Quick Presets:
          </div>

          {[
            { label: "All Items", q: "valve OR flange", cls: "" },
            { label: "Ball Valves", q: "ball valve 150#", cls: "BALL_VALVE" },
            {
              label: "Weld Neck Flanges",
              q: "weld neck flange 300#",
              cls: "WELD_NECK_FLANGE",
            },
            {
              label: "Spiral Gaskets",
              q: "spiral wound gasket 150#",
              cls: "SPIRAL_WOUND_GASKET",
            },
            {
              label: "Line Pipes",
              q: "line pipe seamless 8 inch",
              cls: "LINE_PIPE",
            },
          ].map((preset, i) => (
            <button
              key={i}
              onClick={() => handleQuickPreset(preset.q, preset.cls)}
              style={{
                backgroundColor:
                  itemClassFilter === preset.cls && query === preset.q
                    ? rawTokens.colorAnchor
                    : rawTokens.surfaceSubtle,
                color:
                  itemClassFilter === preset.cls && query === preset.q
                    ? "#FFFFFF"
                    : rawTokens.textSecondary,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusFull,
                padding: "4px 12px",
                fontSize: rawTokens.textXs,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {preset.label}
            </button>
          ))}

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <select
              value={pressureFilter}
              onChange={(e) => setPressureFilter(e.target.value)}
              style={{
                padding: "4px 8px",
                borderRadius: rawTokens.radiusSm,
                border: `1px solid ${rawTokens.borderStrong}`,
                fontSize: rawTokens.textXs,
                backgroundColor: rawTokens.surfaceCard,
              }}
            >
              <option value="">All Pressure Classes</option>
              <option value="150">Class 150#</option>
              <option value="300">Class 300#</option>
              <option value="600">Class 600#</option>
            </select>

            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              style={{
                padding: "4px 8px",
                borderRadius: rawTokens.radiusSm,
                border: `1px solid ${rawTokens.borderStrong}`,
                fontSize: rawTokens.textXs,
                backgroundColor: rawTokens.surfaceCard,
              }}
            >
              <option value="">All Sizes</option>
              <option value="2.0">2 Inch (DN 50)</option>
              <option value="3.0">3 Inch (DN 80)</option>
              <option value="4.0">4 Inch (DN 100)</option>
              <option value="6.0">6 Inch (DN 150)</option>
              <option value="8.0">8 Inch (DN 200)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: rawTokens.textSm,
              fontWeight: 700,
              color: rawTokens.textSecondary,
            }}
          >
            {results.length} National Master Item(s) Located
          </span>
          <span
            style={{ fontSize: rawTokens.textXs, color: rawTokens.textMuted }}
          >
            Cross-checking IOCL, ONGC, BPCL, HPCL, GAIL, OIL inventory
          </span>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: rawTokens.textMuted,
            }}
          >
            Searching national CPSE material repository...
          </div>
        ) : results.length === 0 ? (
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: rawTokens.radiusLg,
              padding: "40px",
              textAlign: "center",
              color: rawTokens.textMuted,
            }}
          >
            No matching items found for "{query}". Try loosening your search
            criteria.
          </div>
        ) : (
          results.map((item) => (
            <div
              key={item.onmc_code}
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "20px",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {/* Item Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: rawTokens.fontMono,
                        fontSize: rawTokens.textSm,
                        fontWeight: 700,
                        color: rawTokens.colorAction,
                        backgroundColor: "rgba(233, 67, 68, 0.08)",
                        padding: "3px 8px",
                        borderRadius: rawTokens.radiusSm,
                      }}
                    >
                      {item.onmc_code}
                    </span>
                    <span
                      style={{
                        fontSize: rawTokens.textXs,
                        color: rawTokens.textMuted,
                      }}
                    >
                      Class: <strong>{item.item_class}</strong>
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: rawTokens.textBase,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "6px",
                      fontFamily: rawTokens.fontMono,
                    }}
                  >
                    {item.canonical_description}
                  </h3>
                </div>

                {/* Similarity & Total Stock Summary */}
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "rgba(165, 215, 201, 0.25)",
                      color: "#0D533A",
                      padding: "4px 10px",
                      borderRadius: rawTokens.radiusFull,
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                    }}
                  >
                    <ShieldCheck size={14} />
                    {Math.round(item.similarity_score * 100)}% Match
                  </div>
                  <div
                    style={{
                      marginTop: "6px",
                      fontSize: rawTokens.textSm,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {item.total_national_stock} Units Available
                  </div>
                  <div style={{ fontSize: "11px", color: rawTokens.textMuted }}>
                    Across {item.participating_cpse_count} CPSE Enterprises
                  </div>
                </div>
              </div>

              {/* Standards Tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {item.shell_mesc_code && (
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: rawTokens.surfaceSubtle,
                      padding: "3px 8px",
                      borderRadius: rawTokens.radiusSm,
                      color: rawTokens.textSecondary,
                    }}
                  >
                    Shell MESC: <strong>{item.shell_mesc_code}</strong>
                  </span>
                )}
                {item.unspsc_code && (
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: rawTokens.surfaceSubtle,
                      padding: "3px 8px",
                      borderRadius: rawTokens.radiusSm,
                      color: rawTokens.textSecondary,
                    }}
                  >
                    UNSPSC: <strong>{item.unspsc_code}</strong>
                  </span>
                )}
                {item.gem_category_id && (
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "rgba(95, 151, 142, 0.15)",
                      color: "#1B4D3E",
                      padding: "3px 8px",
                      borderRadius: rawTokens.radiusSm,
                      fontWeight: 600,
                    }}
                  >
                    GeM Direct Requisition:{" "}
                    <strong>{item.gem_category_id}</strong>
                  </span>
                )}
              </div>

              {/* Multi-CPSE Stock Distribution Matrix */}
              <div
                style={{
                  backgroundColor: rawTokens.surfaceSubtle,
                  borderRadius: rawTokens.radiusMd,
                  padding: "12px 16px",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                }}
              >
                <div
                  style={{
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    color: rawTokens.textSecondary,
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Live Warehouse Stock Across CPSE Refineries & Plants
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {item.stock_distribution.map((stock, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: rawTokens.surfaceCard,
                        padding: "8px 12px",
                        borderRadius: rawTokens.radiusSm,
                        border: `1px solid ${rawTokens.borderSubtle}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: rawTokens.colorAnchor,
                            color: "#FFFFFF",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: rawTokens.radiusSm,
                          }}
                        >
                          {stock.organization_code}
                        </span>
                        <div>
                          <div
                            style={{
                              fontSize: rawTokens.textXs,
                              fontWeight: 600,
                              color: rawTokens.textPrimary,
                            }}
                          >
                            {stock.plant_location}
                          </div>
                          <div
                            style={{
                              fontSize: "10px",
                              color: rawTokens.textMuted,
                            }}
                          >
                            Plant WERKS: {stock.plant_code} • Estimated Transit:{" "}
                            {stock.lead_time_days} day(s)
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: rawTokens.textSm,
                              fontWeight: 700,
                              color: "#0D533A",
                            }}
                          >
                            {stock.available_stock} EA in stock
                          </div>
                          <div
                            style={{
                              fontSize: "10px",
                              color: rawTokens.textMuted,
                            }}
                          >
                            Book Value: ₹
                            {stock.unit_price.toLocaleString("en-IN")} / EA
                          </div>
                        </div>

                        <button
                          onClick={() => handleTransferClick(item, stock)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            backgroundColor: rawTokens.colorAction,
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: rawTokens.radiusSm,
                            padding: "6px 12px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          <ArrowRightLeft size={12} />
                          Inter-CPSE Transfer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
