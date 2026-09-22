// ponytail: Command Palette (Cmd+K) inspired by Watermelon UI and shadcn Command.
// Instant keyboard navigation across NUMM master records, views, and operational triggers.

import React, { useState, useEffect } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Search,
  FileCheck2,
  Truck,
  UploadCloud,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
  Command,
  X,
  Keyboard,
  ExternalLink,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Master Data Query" | "Actions";
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
  onSearchQuery?: (query: string) => void;
  onOpenKeyboardHelp?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSearchQuery,
  onOpenKeyboardHelp,
}) => {
  const [search, setSearch] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-overview",
      category: "Navigation",
      title: "Overview Dashboard",
      subtitle: "Role-aware executive view and confidence analytics",
      icon: Layers,
      badge: "Tab 1",
      action: () => onNavigate("overview"),
    },
    {
      id: "nav-steward",
      category: "Navigation",
      title: "Steward Review Cockpit (HITL)",
      subtitle: "380px asymmetric triage inspector & duplicate resolution",
      icon: FileCheck2,
      badge: "84 Pending",
      action: () => onNavigate("steward"),
    },
    {
      id: "nav-search",
      category: "Navigation",
      title: "Search Before Buy",
      subtitle: "Pre-procurement duplicate avoidance and national inventory",
      icon: Search,
      badge: "Tab 3",
      action: () => onNavigate("search"),
    },
    {
      id: "nav-surplus",
      category: "Navigation",
      title: "Surplus Stock & Pooled Demand",
      subtitle: "Inter-CPSE transfers and bulk procurement aggregation",
      icon: Truck,
      badge: "₹1.14 Cr Pool",
      action: () => onNavigate("surplus"),
    },
    {
      id: "nav-ingest",
      category: "Navigation",
      title: "Catalog Ingestion Pipeline",
      subtitle: "Multi-stage ERP batch ingestion & token cleansing",
      icon: UploadCloud,
      badge: "SSE Stream",
      action: () => onNavigate("ingest"),
    },
    {
      id: "nav-security",
      category: "Navigation",
      title: "Security & CVC Audit",
      subtitle: "Tamper-evident append-only SHA-256 decision ledger",
      icon: ShieldCheck,
      badge: "Immutable",
      action: () => onNavigate("security"),
    },

    // Master Data Queries
    {
      id: "query-ball-valve",
      category: "Master Data Query",
      title: "2 inch 150# flanged ball valve CS A105",
      subtitle: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F • 14 Units at Hazira",
      icon: Search,
      badge: "ONMC Master",
      action: () => {
        if (onSearchQuery)
          onSearchQuery("2 inch 150# flanged ball valve CS A105");
        onNavigate("search");
      },
    },
    {
      id: "query-gate-valve",
      category: "Master Data Query",
      title: "4 inch 150# gate valve flanged WCB API 600",
      subtitle: "ONMC-MECH-VLV-GAT-004-150-WCB-44D1 • GAIL Vijaipur",
      icon: Search,
      badge: "ONMC Master",
      action: () => {
        if (onSearchQuery)
          onSearchQuery("4 inch 150# gate valve flanged WCB API 600");
        onNavigate("search");
      },
    },
    {
      id: "query-flange",
      category: "Master Data Query",
      title: '6" 300# weld neck flange ASTM A105 ASME B16.5',
      subtitle: "ONMC-PIP-FLG-WN-006-300-A105-882E • BPCL Mumbai",
      icon: Search,
      badge: "ONMC Master",
      action: () => {
        if (onSearchQuery) onSearchQuery('6" 300# weld neck flange ASTM A105');
        onNavigate("search");
      },
    },

    // Actions
    {
      id: "act-shortcuts",
      category: "Actions",
      title: "Keyboard Shortcuts Reference",
      subtitle: "View J/K/A/R/E/N/S triage shortcut keybindings",
      icon: Keyboard,
      action: () => {
        if (onOpenKeyboardHelp) onOpenKeyboardHelp();
      },
    },
    {
      id: "act-upload-demo",
      category: "Actions",
      title: "Upload IOCL Valves Sample Batch",
      subtitle: "Load iocl_valves.xlsx with 6 demo materials",
      icon: Sparkles,
      badge: "Quick Ingest",
      action: () => onNavigate("ingest"),
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle keyboard inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        onClose();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${rawTokens.borderStrong}`,
          borderRadius: rawTokens.radiusLg,
          width: "100%",
          maxWidth: "640px",
          boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.25)",
          overflow: "hidden",
          animation: "fadeIn 0.15s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          <Search size={18} color={rawTokens.colorAction} />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search material master (e.g. 'ball valve', 'ingest')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: rawTokens.textPrimary,
              fontFamily: rawTokens.fontSans,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: rawTokens.fontMono,
              color: rawTokens.textMuted,
              backgroundColor: rawTokens.surfaceSubtle,
              padding: "2px 6px",
              borderRadius: "4px",
              border: `1px solid ${rawTokens.borderSubtle}`,
            }}
          >
            ESC
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: rawTokens.textMuted,
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: "380px", overflowY: "auto", padding: "8px" }}>
          {filteredItems.length === 0 ? (
            <div
              style={{
                padding: "32px 20px",
                textAlign: "center",
                color: rawTokens.textMuted,
                fontSize: "13px",
              }}
            >
              No master commands or materials matching "{search}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusMd,
                    backgroundColor: isSelected
                      ? "rgba(241, 204, 157, 0.25)"
                      : "transparent",
                    cursor: "pointer",
                    transition: "background-color 0.1s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        backgroundColor: isSelected
                          ? "#FFFFFF"
                          : rawTokens.surfaceSubtle,
                        border: `1px solid ${rawTokens.borderSubtle}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isSelected
                          ? rawTokens.colorAction
                          : rawTokens.textSecondary,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: rawTokens.textSecondary,
                          marginTop: "2px",
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item.badge && (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: rawTokens.radiusFull,
                          backgroundColor: isSelected
                            ? "rgba(233, 67, 68, 0.15)"
                            : rawTokens.surfaceSubtle,
                          color: isSelected
                            ? rawTokens.colorAction
                            : rawTokens.textSecondary,
                          border: `1px solid ${rawTokens.borderSubtle}`,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isSelected && (
                      <ArrowRight size={14} color={rawTokens.colorAction} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: rawTokens.surfaceSubtle,
            fontSize: "11px",
            color: rawTokens.textMuted,
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span style={{ fontFamily: rawTokens.fontMono }}>
            MoPNG • NUMM v2.2.0
          </span>
        </div>
      </div>
    </div>
  );
};
