// ponytail: High-density asymmetric Stewardship Review Cockpit (380px sticky inspector + 1fr dynamic queue).
// Implements deterministic safety gates, side-by-side engineering diffs, and keyboard-first triage controls.

import React, { useState, useEffect, useCallback } from "react";
import { rawTokens } from "../tokens.stylex";
import { MaterialDiffCard, AttributeDiff } from "./MaterialDiffCard";
import {
  Check,
  X,
  Sparkles,
  Search,
  HelpCircle,
  ShieldCheck,
  ShieldAlert,
  AlertCircle,
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Edit2,
  Flame,
} from "lucide-react";
import { DonutMicro, Sparkline, SegBar } from "./MicroCharts";
import { API_BASE } from "../api";

export interface TriageItem {
  mapping_id: string;
  organization_code: string;
  plant_location: string;
  source_item_code: string;
  raw_description: string;
  onmc_candidate_code: string;
  canonical_description: string;
  confidence_score: number;
  lexical_similarity: number;
  semantic_similarity: number;
  rule_gate_passed: boolean;
  rejection_reasons: string[];
  shell_mesc_code?: string | null;
  unspsc_code?: string | null;
  gem_category_id?: string | null;
  attribute_diffs: AttributeDiff[];
  mapping_status: "MATCH" | "REVIEW" | "CONFLICT" | "BLOCKED" | string;
  item_class?: string;
  size_val?: string;
  pressure_val?: string;
  metallurgy_val?: string;
}

interface ClusterReviewCockpitProps {
  onNavigateToSearch?: (query: string) => void;
  onShowAuditMessage?: (msg: string) => void;
  onInspectONMC?: (code: string) => void;
  onOpenKeyboardHelp?: () => void;
}

const DEFAULT_TRIAGE_ITEMS: TriageItem[] = [
  {
    mapping_id: "MAP-IOCL-VLV-001",
    organization_code: "IOCL",
    plant_location: "Gujarat Refinery, Vadodara",
    source_item_code: "MAT-1002931",
    raw_description: "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
    onmc_candidate_code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    canonical_description: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
    confidence_score: 0.88,
    lexical_similarity: 0.82,
    semantic_similarity: 0.91,
    rule_gate_passed: true,
    rejection_reasons: [],
    shell_mesc_code: "74.16.01.015.1",
    unspsc_code: "40141607",
    gem_category_id: "52161500",
    mapping_status: "REVIEW",
    item_class: "BALL VALVE",
    size_val: '2.00" / 50mm NB',
    pressure_val: "Class 150",
    metallurgy_val: "ASTM A105",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "BALL VALVE",
        canonical_value: "BALL VALVE",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: "50MM NB",
        canonical_value: '2.00" (50mm)',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "150#",
        canonical_value: "Class 150",
        status: "MATCH",
      },
      {
        attribute_name: "METALLURGY",
        raw_value: "CS BODY A105",
        canonical_value: "ASTM A105",
        status: "MATCH",
      },
      {
        attribute_name: "END CONNECTION",
        raw_value: "FLGD",
        canonical_value: "FLANGED RF",
        status: "MATCH",
      },
      {
        attribute_name: "STANDARD",
        raw_value: null,
        canonical_value: "API 6D",
        status: "TOLERANCE",
      },
      {
        attribute_name: "MESC",
        raw_value: null,
        canonical_value: "74.16.01.015.1",
        status: "MATCH",
      },
      {
        attribute_name: "UNSPSC",
        raw_value: null,
        canonical_value: "40141607",
        status: "MATCH",
      },
    ],
  },
  {
    mapping_id: "MAP-ONGC-VLV-002",
    organization_code: "ONGC",
    plant_location: "Hazira Gas Processing Plant",
    source_item_code: "MAT-8849102",
    raw_description:
      "BALL VALVE 2IN 300LB FLGD WCB BODY (POTENTIAL PRESSURE DISCREPANCY)",
    onmc_candidate_code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    canonical_description: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
    confidence_score: 0.74,
    lexical_similarity: 0.79,
    semantic_similarity: 0.71,
    rule_gate_passed: false,
    rejection_reasons: [
      "Deterministic Safety Gate Failure: Pressure class mismatch (Class 300 vs Class 150). Catastrophic rupture hazard under 51 bar operating conditions.",
    ],
    shell_mesc_code: "74.16.01.015.1",
    unspsc_code: "40141607",
    gem_category_id: "52161500",
    mapping_status: "CONFLICT",
    item_class: "BALL VALVE",
    size_val: '2.00"',
    pressure_val: "Class 300 (Raw) vs 150 (Master)",
    metallurgy_val: "ASTM A216 WCB",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "BALL VALVE",
        canonical_value: "BALL VALVE",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: '2"',
        canonical_value: '2.00"',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "Class 300 (51 bar)",
        canonical_value: "Class 150 (19 bar)",
        status: "CONFLICT",
      },
      {
        attribute_name: "METALLURGY",
        raw_value: "WCB",
        canonical_value: "ASTM A105",
        status: "TOLERANCE",
      },
      {
        attribute_name: "END CONNECTION",
        raw_value: "FLGD",
        canonical_value: "FLANGED RF",
        status: "MATCH",
      },
      {
        attribute_name: "SAFETY GATE",
        raw_value: "DISQUALIFIED",
        canonical_value: "ASME B16.34",
        status: "CONFLICT",
      },
    ],
  },
  {
    mapping_id: "MAP-BPCL-FLG-003",
    organization_code: "BPCL",
    plant_location: "Mumbai Refinery, Mahul",
    source_item_code: "MAT-3049104",
    raw_description: 'FLG WN 6" 300LBS RF CS ASTM A-105 SCH40 ASME B16.5',
    onmc_candidate_code: "ONMC-PIP-FLG-WN-006-300-A105-882E",
    canonical_description:
      "FLANGE WELD NECK 6 INCH 300# RF CS ASTM A105 SCH 40 ASME B16.5",
    confidence_score: 0.91,
    lexical_similarity: 0.94,
    semantic_similarity: 0.89,
    rule_gate_passed: true,
    rejection_reasons: [],
    shell_mesc_code: "76.22.14.006.1",
    unspsc_code: "40173305",
    gem_category_id: "52161502",
    mapping_status: "REVIEW",
    item_class: "WELD NECK FLANGE",
    size_val: '6.00"',
    pressure_val: "Class 300",
    metallurgy_val: "ASTM A105",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "WELD NECK FLANGE",
        canonical_value: "WELD NECK FLANGE",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: '6"',
        canonical_value: '6.00"',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "300LBS",
        canonical_value: "Class 300",
        status: "MATCH",
      },
      {
        attribute_name: "METALLURGY",
        raw_value: "ASTM A-105",
        canonical_value: "ASTM A105",
        status: "MATCH",
      },
      {
        attribute_name: "WALL THICKNESS",
        raw_value: "SCH40",
        canonical_value: "SCH 40",
        status: "MATCH",
      },
      {
        attribute_name: "STANDARD",
        raw_value: "ASME B16.5",
        canonical_value: "ASME B16.5",
        status: "MATCH",
      },
    ],
  },
  {
    mapping_id: "MAP-HPCL-GSK-004",
    organization_code: "HPCL",
    plant_location: "Visakh Refinery",
    source_item_code: "MAT-7739105",
    raw_description: "GASKET SPW 3 IN 150# SS316L/GRAPHITE ASME B16.20",
    onmc_candidate_code: "ONMC-GSK-SPW-003-150-316L-99A1",
    canonical_description:
      "GASKET SPIRAL WOUND 3 INCH 150# SS316L GRAPHITE FILLER ASME B16.20",
    confidence_score: 0.94,
    lexical_similarity: 0.95,
    semantic_similarity: 0.93,
    rule_gate_passed: true,
    rejection_reasons: [],
    shell_mesc_code: "81.12.03.015.1",
    unspsc_code: "31181501",
    gem_category_id: "52161503",
    mapping_status: "MATCH",
    item_class: "SPIRAL WOUND GASKET",
    size_val: '3.00"',
    pressure_val: "Class 150",
    metallurgy_val: "SS316L / Graphite",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "SPIRAL WOUND GASKET",
        canonical_value: "SPIRAL WOUND GASKET",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: "3 IN",
        canonical_value: '3.00"',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "150#",
        canonical_value: "Class 150",
        status: "MATCH",
      },
      {
        attribute_name: "WINDING MATERIAL",
        raw_value: "SS316L",
        canonical_value: "SS316L",
        status: "MATCH",
      },
      {
        attribute_name: "FILLER",
        raw_value: "GRAPHITE",
        canonical_value: "FLEXIBLE GRAPHITE",
        status: "MATCH",
      },
      {
        attribute_name: "STANDARD",
        raw_value: "ASME B16.20",
        canonical_value: "ASME B16.20",
        status: "MATCH",
      },
    ],
  },
  {
    mapping_id: "MAP-GAIL-MET-005",
    organization_code: "GAIL",
    plant_location: "Vijaipur Petrochemicals",
    source_item_code: "MAT-9920194",
    raw_description: 'VALVE BALL 2" 150# CS BODY NO TRIM METALLURGY SPECIFIED',
    onmc_candidate_code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    canonical_description: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
    confidence_score: 0.79,
    lexical_similarity: 0.75,
    semantic_similarity: 0.81,
    rule_gate_passed: false,
    rejection_reasons: [
      "Mandatory Engineering Attribute Missing: Trim metallurgy not specified in raw catalog.",
    ],
    shell_mesc_code: "74.16.01.015.1",
    unspsc_code: "40141607",
    gem_category_id: "52161500",
    mapping_status: "REVIEW",
    item_class: "BALL VALVE",
    size_val: '2.00"',
    pressure_val: "Class 150",
    metallurgy_val: "UNKNOWN (MISSING)",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "BALL VALVE",
        canonical_value: "BALL VALVE",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: '2"',
        canonical_value: '2.00"',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "150#",
        canonical_value: "Class 150",
        status: "MATCH",
      },
      {
        attribute_name: "METALLURGY",
        raw_value: "UNSPECIFIED",
        canonical_value: "ASTM A105",
        status: "MISSING",
      },
    ],
  },
  {
    mapping_id: "MAP-OIL-NACE-006",
    organization_code: "OIL",
    plant_location: "Duliajan Field HQ, Assam",
    source_item_code: "MAT-5501923",
    raw_description: "VALVE BALL 2IN 150# FLGD NACE MR0175 SOUR SERVICE SPEC",
    onmc_candidate_code: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    canonical_description:
      "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D (STANDARD SERVICE)",
    confidence_score: 0.72,
    lexical_similarity: 0.76,
    semantic_similarity: 0.69,
    rule_gate_passed: false,
    rejection_reasons: [
      "Sour Service Incompatibility: Raw specification mandates NACE MR0175 / ISO 15156. Candidate ONMC is certified only for standard non-sour service.",
    ],
    shell_mesc_code: "74.16.01.015.1",
    unspsc_code: "40141607",
    gem_category_id: "52161500",
    mapping_status: "BLOCKED",
    item_class: "BALL VALVE",
    size_val: '2.00"',
    pressure_val: "Class 150",
    metallurgy_val: "NACE MR0175 Sour",
    attribute_diffs: [
      {
        attribute_name: "ITEM CLASS",
        raw_value: "BALL VALVE",
        canonical_value: "BALL VALVE",
        status: "MATCH",
      },
      {
        attribute_name: "SIZE",
        raw_value: "2IN",
        canonical_value: '2.00"',
        status: "MATCH",
      },
      {
        attribute_name: "PRESSURE",
        raw_value: "150#",
        canonical_value: "Class 150",
        status: "MATCH",
      },
      {
        attribute_name: "SERVICE COND.",
        raw_value: "SOUR (NACE MR0175)",
        canonical_value: "STANDARD OIL/GAS",
        status: "CONFLICT",
      },
    ],
  },
];

export const ClusterReviewCockpit: React.FC<ClusterReviewCockpitProps> = ({
  onNavigateToSearch,
  onShowAuditMessage,
  onInspectONMC,
  onOpenKeyboardHelp,
}) => {
  const [items, setItems] = useState<TriageItem[]>(DEFAULT_TRIAGE_ITEMS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [filterState, setFilterState] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editAttrs, setEditAttrs] = useState<{ [key: string]: string }>({});

  const activeItem = items[selectedIndex] || items[0] || null;

  const handleDecision = useCallback(
    async (decision: "APPROVE" | "REJECT" | "MINT" | "OVERRIDE") => {
      if (!activeItem) return;

      const shaMock = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;

      if (onShowAuditMessage) {
        onShowAuditMessage(
          `[${decision}] Item ${activeItem.source_item_code} → SHA-256: ${shaMock.substring(0, 16)}...`
        );
      }

      setItems((prev) => {
        const next = prev.filter(
          (it) => it.mapping_id !== activeItem.mapping_id
        );
        return next;
      });

      if (selectedIndex >= items.length - 1) {
        setSelectedIndex(Math.max(0, items.length - 2));
      }
    },
    [activeItem, selectedIndex, items.length, onShowAuditMessage]
  );

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        return;
      }

      const key = e.key.toUpperCase();

      if (key === "J") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
      } else if (key === "K") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (key === "A") {
        e.preventDefault();
        if (
          activeItem &&
          activeItem.mapping_status !== "CONFLICT" &&
          activeItem.mapping_status !== "BLOCKED"
        ) {
          handleDecision("APPROVE");
        }
      } else if (key === "R") {
        e.preventDefault();
        handleDecision("REJECT");
      } else if (key === "N") {
        e.preventDefault();
        handleDecision("MINT");
      } else if (key === "E") {
        e.preventDefault();
        if (activeItem) {
          const init: Record<string, string> = {};
          activeItem.attribute_diffs.forEach((d) => {
            init[d.attribute_name] = d.raw_value || "";
          });
          setEditAttrs(init);
          setShowEditModal(true);
        }
      } else if (key === "S") {
        e.preventDefault();
        if (activeItem && onNavigateToSearch) {
          onNavigateToSearch(activeItem.raw_description);
        }
      } else if (e.key === "?") {
        e.preventDefault();
        if (onOpenKeyboardHelp) onOpenKeyboardHelp();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    items.length,
    activeItem,
    handleDecision,
    onNavigateToSearch,
    onOpenKeyboardHelp,
  ]);

  const filteredItems = items.filter((item) => {
    if (filterState === "ALL") return true;
    if (filterState === "REVIEW") return item.mapping_status === "REVIEW";
    if (filterState === "CONFLICT")
      return (
        item.mapping_status === "CONFLICT" || item.mapping_status === "BLOCKED"
      );
    if (filterState === "MATCH") return item.mapping_status === "MATCH";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Top Banner with Triage Controls & Status */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: rawTokens.radiusLg,
          border: `1px solid ${rawTokens.borderSubtle}`,
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: rawTokens.shadowSubtle,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: rawTokens.radiusMd,
              backgroundColor: "rgba(233, 67, 68, 0.1)",
              color: rawTokens.colorAction,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
              }}
            >
              Resolve Catalog Duplicates (Triage Cockpit)
            </h2>
            <div style={{ fontSize: "12px", color: rawTokens.textSecondary }}>
              Asymmetric triage inspector • Single-key keyboard ergonomics •
              Deterministic ASME safety gating
            </div>
          </div>
        </div>

        {/* Filter Pills & Shortcuts Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: rawTokens.surfaceSubtle,
              padding: "3px",
              borderRadius: rawTokens.radiusFull,
              border: `1px solid ${rawTokens.borderSubtle}`,
            }}
          >
            {[
              { id: "ALL", label: `All (${items.length})` },
              { id: "REVIEW", label: "Review Required" },
              { id: "CONFLICT", label: "Safety Conflicts" },
              { id: "MATCH", label: "Verified Matches" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterState(f.id)}
                style={{
                  border: "none",
                  backgroundColor:
                    filterState === f.id ? "#FFFFFF" : "transparent",
                  color:
                    filterState === f.id
                      ? rawTokens.colorAction
                      : rawTokens.textSecondary,
                  padding: "4px 10px",
                  borderRadius: rawTokens.radiusFull,
                  fontSize: "11px",
                  fontWeight: filterState === f.id ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenKeyboardHelp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: rawTokens.surfaceSubtle,
              border: `1px solid ${rawTokens.borderStrong}`,
              borderRadius: rawTokens.radiusSm,
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <HelpCircle size={13} />
            <span>Shortcuts (?)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ASYMMETRIC LAYOUT: 380px STICKY INSPECTOR + 1fr DYNAMIC QUEUE             */}
      {/* ========================================================================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "380px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: 380px STICKY INSPECTOR PANEL */}
        <div
          style={{
            position: "sticky",
            top: "80px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {activeItem ? (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: rawTokens.radiusLg,
                border: `1px solid ${
                  activeItem.mapping_status === "CONFLICT" ||
                  activeItem.mapping_status === "BLOCKED"
                    ? "rgba(155, 18, 30, 0.4)"
                    : rawTokens.borderSubtle
                }`,
                padding: "20px",
                boxShadow:
                  activeItem.mapping_status === "CONFLICT" ||
                  activeItem.mapping_status === "BLOCKED"
                    ? rawTokens.shadowGlowWine
                    : rawTokens.shadowCard,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Inspector Header */}
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
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: rawTokens.textPrimary,
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: "3px",
                      }}
                    >
                      {activeItem.organization_code}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: rawTokens.fontMono,
                        color: rawTokens.textSecondary,
                      }}
                    >
                      {activeItem.source_item_code}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: rawTokens.textMuted,
                      marginTop: "2px",
                    }}
                  >
                    {activeItem.plant_location}
                  </div>
                </div>

                {/* Match Confidence Gauge */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <DonutMicro
                    value={activeItem.confidence_score * 100}
                    size={28}
                    color={
                      activeItem.mapping_status === "CONFLICT" ||
                      activeItem.mapping_status === "BLOCKED"
                        ? rawTokens.colorConflict
                        : activeItem.confidence_score >= 0.9
                          ? "#0D533A"
                          : rawTokens.colorAction
                    }
                  />
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 800,
                        fontFamily: rawTokens.fontMono,
                      }}
                    >
                      {(activeItem.confidence_score * 100).toFixed(0)}%
                    </div>
                    <div
                      style={{ fontSize: "9px", color: rawTokens.textMuted }}
                    >
                      Confidence
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: rawTokens.radiusSm,
                  backgroundColor:
                    activeItem.mapping_status === "CONFLICT" ||
                    activeItem.mapping_status === "BLOCKED"
                      ? "rgba(155, 18, 30, 0.12)"
                      : activeItem.mapping_status === "MATCH"
                        ? "rgba(165, 215, 201, 0.25)"
                        : "rgba(241, 204, 157, 0.3)",
                  color:
                    activeItem.mapping_status === "CONFLICT" ||
                    activeItem.mapping_status === "BLOCKED"
                      ? rawTokens.colorConflict
                      : activeItem.mapping_status === "MATCH"
                        ? "#0D533A"
                        : rawTokens.colorAnchor,
                  fontSize: "11px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {activeItem.mapping_status === "CONFLICT" ? (
                  <>
                    <ShieldAlert size={14} />
                    <span>FATAL SAFETY CONFLICT — APPROVE LOCKED</span>
                  </>
                ) : activeItem.mapping_status === "BLOCKED" ? (
                  <>
                    <AlertTriangle size={14} />
                    <span>SOUR SERVICE INCOMPATIBILITY — BLOCKED</span>
                  </>
                ) : activeItem.mapping_status === "MATCH" ? (
                  <>
                    <CheckCircle2 size={14} />
                    <span>VERIFIED PHYSICAL MATCH (&ge; 92%)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} />
                    <span>HUMAN REVIEW REQUIRED (70% - 91%)</span>
                  </>
                )}
              </div>

              {/* Safety Disqualification Explanation */}
              {activeItem.rejection_reasons.length > 0 && (
                <div
                  style={{
                    padding: "10px",
                    borderRadius: rawTokens.radiusSm,
                    backgroundColor: "rgba(155, 18, 30, 0.06)",
                    border: "1px solid rgba(155, 18, 30, 0.2)",
                    fontSize: "11px",
                    color: rawTokens.colorConflict,
                    lineHeight: 1.4,
                  }}
                >
                  <strong>Safety Gate Rejection:</strong>{" "}
                  {activeItem.rejection_reasons[0]}
                </div>
              )}

              {/* Raw vs Candidate Specs */}
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    textTransform: "uppercase",
                  }}
                >
                  Raw Description (Source Catalog)
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.textPrimary,
                    marginTop: "3px",
                    padding: "8px",
                    backgroundColor: rawTokens.surfaceSubtle,
                    borderRadius: rawTokens.radiusSm,
                    lineHeight: 1.4,
                  }}
                >
                  {activeItem.raw_description}
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    Candidate Master Code
                  </span>
                  {onInspectONMC && (
                    <button
                      onClick={() =>
                        onInspectONMC(activeItem.onmc_candidate_code)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: rawTokens.colorAction,
                        fontSize: "10px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      Inspect Drawer
                      <ExternalLink size={10} />
                    </button>
                  )}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: rawTokens.fontMono,
                    fontWeight: 700,
                    color: rawTokens.colorAction,
                    marginTop: "3px",
                    padding: "8px",
                    backgroundColor: "rgba(233, 67, 68, 0.05)",
                    border: `1px solid rgba(233, 67, 68, 0.2)`,
                    borderRadius: rawTokens.radiusSm,
                    wordBreak: "break-all",
                  }}
                >
                  {activeItem.onmc_candidate_code}
                </div>
              </div>

              {/* Attribute Diff List */}
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Physical Attribute Deltas
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {activeItem.attribute_diffs.map((diff, i) => {
                    const isConflict = diff.status === "CONFLICT";
                    const isMissing = diff.status === "MISSING";
                    const isMatch = diff.status === "MATCH";

                    return (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "100px 1fr 1fr",
                          gap: "6px",
                          padding: "6px 8px",
                          borderRadius: "4px",
                          backgroundColor: isConflict
                            ? "rgba(155, 18, 30, 0.1)"
                            : isMissing
                              ? "rgba(241, 204, 157, 0.25)"
                              : isMatch
                                ? "rgba(165, 215, 201, 0.15)"
                                : rawTokens.surfaceSubtle,
                          fontSize: "11px",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 700,
                            color: rawTokens.textMuted,
                            fontSize: "9px",
                          }}
                        >
                          {diff.attribute_name}
                        </span>
                        <span
                          style={{
                            fontFamily: rawTokens.fontMono,
                            color: isConflict
                              ? rawTokens.colorConflict
                              : rawTokens.textPrimary,
                            fontWeight: isConflict ? 700 : 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {diff.raw_value || "—"}
                        </span>
                        <span
                          style={{
                            fontFamily: rawTokens.fontMono,
                            color: isConflict
                              ? rawTokens.colorConflict
                              : rawTokens.textSecondary,
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {diff.canonical_value || "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Operational Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                {activeItem.mapping_status === "CONFLICT" ||
                activeItem.mapping_status === "BLOCKED" ? (
                  // Safety Conflict Mode: Approve is strictly locked!
                  <>
                    <button
                      onClick={() => handleDecision("REJECT")}
                      style={{
                        backgroundColor: rawTokens.colorConflict,
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: rawTokens.radiusMd,
                        padding: "10px",
                        fontSize: "12px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <X size={14} />
                      <span>Split / Reject Candidate (R)</span>
                    </button>
                    <button
                      onClick={() => handleDecision("MINT")}
                      style={{
                        backgroundColor: rawTokens.surfaceSubtle,
                        border: `1px solid ${rawTokens.borderStrong}`,
                        borderRadius: rawTokens.radiusMd,
                        padding: "8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.colorAction,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      <Sparkles size={13} />
                      <span>Mint New Sovereign ONMC (N)</span>
                    </button>
                  </>
                ) : (
                  // Normal Review Mode
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => handleDecision("APPROVE")}
                        style={{
                          backgroundColor: "#0D533A",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: rawTokens.radiusMd,
                          padding: "10px",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        <Check size={14} />
                        <span>Approve (A)</span>
                      </button>

                      <button
                        onClick={() => handleDecision("REJECT")}
                        style={{
                          backgroundColor: rawTokens.surfaceSubtle,
                          border: `1px solid ${rawTokens.borderStrong}`,
                          borderRadius: rawTokens.radiusMd,
                          padding: "10px",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        <X size={14} />
                        <span>Reject (R)</span>
                      </button>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => {
                          const init: Record<string, string> = {};
                          activeItem.attribute_diffs.forEach((d) => {
                            init[d.attribute_name] = d.raw_value || "";
                          });
                          setEditAttrs(init);
                          setShowEditModal(true);
                        }}
                        style={{
                          backgroundColor: rawTokens.surfaceSubtle,
                          border: `1px solid ${rawTokens.borderSubtle}`,
                          borderRadius: rawTokens.radiusSm,
                          padding: "7px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: rawTokens.textSecondary,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Edit2 size={12} />
                        <span>Edit (E)</span>
                      </button>

                      <button
                        onClick={() => handleDecision("MINT")}
                        style={{
                          backgroundColor: rawTokens.surfaceSubtle,
                          border: `1px solid ${rawTokens.borderSubtle}`,
                          borderRadius: rawTokens.radiusSm,
                          padding: "7px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: rawTokens.colorAction,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Sparkles size={12} />
                        <span>Mint Code (N)</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                color: rawTokens.textMuted,
              }}
            >
              No item selected
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: 1fr DYNAMIC CANDIDATE WORKSPACE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              border: `1px solid ${rawTokens.borderSubtle}`,
              overflow: "hidden",
              boxShadow: rawTokens.shadowSubtle,
            }}
          >
            {/* Table Header Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1.5fr 1fr 100px 90px 120px",
                gap: "12px",
                padding: "12px 18px",
                backgroundColor: rawTokens.surfaceSubtle,
                borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                fontSize: "11px",
                fontWeight: 700,
                color: rawTokens.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>CPSE</span>
              <span>Raw Material Description</span>
              <span>Item Parameters</span>
              <span>Candidate Match</span>
              <span>Confidence</span>
              <span style={{ textAlign: "right" }}>Status</span>
            </div>

            {/* Table Rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filteredItems.map((item, idx) => {
                const isSelected = item.mapping_id === activeItem?.mapping_id;
                const isConflict =
                  item.mapping_status === "CONFLICT" ||
                  item.mapping_status === "BLOCKED";

                return (
                  <div
                    key={item.mapping_id}
                    onClick={() => {
                      const realIndex = items.findIndex(
                        (it) => it.mapping_id === item.mapping_id
                      );
                      if (realIndex !== -1) setSelectedIndex(realIndex);
                    }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1.5fr 1fr 100px 90px 120px",
                      gap: "12px",
                      padding: "14px 18px",
                      borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                      backgroundColor: isSelected
                        ? "rgba(241, 204, 157, 0.18)"
                        : isConflict
                          ? "rgba(155, 18, 30, 0.03)"
                          : "#FFFFFF",
                      outline: isSelected
                        ? `2px solid ${rawTokens.colorAction}`
                        : "none",
                      outlineOffset: "-2px",
                      cursor: "pointer",
                      alignItems: "center",
                      transition: "background-color 0.1s ease",
                    }}
                  >
                    {/* CPSE Tag */}
                    <span
                      style={{
                        backgroundColor: rawTokens.textPrimary,
                        color: "#FFFFFF",
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: "3px",
                        textAlign: "center",
                      }}
                    >
                      {item.organization_code}
                    </span>

                    {/* Raw Description */}
                    <div>
                      <div
                        style={{
                          fontSize: "12px",
                          fontFamily: rawTokens.fontMono,
                          fontWeight: 600,
                          color: rawTokens.textPrimary,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.raw_description}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: rawTokens.textMuted,
                          marginTop: "2px",
                        }}
                      >
                        {item.source_item_code} • {item.plant_location}
                      </div>
                    </div>

                    {/* Extracted Parameters */}
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        {item.item_class}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: rawTokens.textSecondary,
                          fontFamily: rawTokens.fontMono,
                        }}
                      >
                        {item.size_val} • {item.pressure_val}
                      </div>
                    </div>

                    {/* Candidate Code preview */}
                    <div
                      style={{
                        fontSize: "11px",
                        fontFamily: rawTokens.fontMono,
                        color: rawTokens.colorAction,
                      }}
                    >
                      {item.onmc_candidate_code.split("-").slice(-2).join("-")}
                    </div>

                    {/* Confidence Donut */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <DonutMicro
                        value={item.confidence_score * 100}
                        size={22}
                        color={
                          isConflict
                            ? rawTokens.colorConflict
                            : item.confidence_score >= 0.9
                              ? "#0D533A"
                              : rawTokens.colorAction
                        }
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: rawTokens.fontMono,
                          fontWeight: 700,
                        }}
                      >
                        {(item.confidence_score * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: rawTokens.radiusFull,
                          backgroundColor:
                            item.mapping_status === "CONFLICT"
                              ? "rgba(155, 18, 30, 0.15)"
                              : item.mapping_status === "BLOCKED"
                                ? "rgba(155, 18, 30, 0.12)"
                                : item.mapping_status === "MATCH"
                                  ? "rgba(165, 215, 201, 0.3)"
                                  : "rgba(241, 204, 157, 0.4)",
                          color:
                            item.mapping_status === "CONFLICT" ||
                            item.mapping_status === "BLOCKED"
                              ? rawTokens.colorConflict
                              : item.mapping_status === "MATCH"
                                ? "#0D533A"
                                : rawTokens.colorAnchor,
                        }}
                      >
                        {item.mapping_status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Persistent Keyboard Shortcut Navigation Strip */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusMd,
              border: `1px solid ${rawTokens.borderSubtle}`,
              padding: "10px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "11px",
              color: rawTokens.textSecondary,
            }}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  J
                </kbd>{" "}
                Next
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  K
                </kbd>{" "}
                Prev
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                    color: "#0D533A",
                  }}
                >
                  A
                </kbd>{" "}
                Approve
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                    color: rawTokens.colorConflict,
                  }}
                >
                  R
                </kbd>{" "}
                Reject
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  E
                </kbd>{" "}
                Edit
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  N
                </kbd>{" "}
                Mint Code
              </span>
              <span>
                <kbd
                  style={{
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "2px 5px",
                    borderRadius: "3px",
                    border: "1px solid #CBD5E1",
                    fontWeight: 700,
                    fontFamily: rawTokens.fontMono,
                  }}
                >
                  S
                </kbd>{" "}
                Search Inv.
              </span>
            </div>

            <span style={{ fontSize: "10px", color: rawTokens.textMuted }}>
              Press{" "}
              <kbd
                style={{
                  padding: "1px 4px",
                  border: "1px solid #CBD5E1",
                  borderRadius: "2px",
                }}
              >
                ?
              </kbd>{" "}
              for help
            </span>
          </div>
        </div>
      </div>

      {/* Attribute Edit Modal */}
      {showEditModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10001,
          }}
          onClick={() => setShowEditModal(false)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `1px solid ${rawTokens.borderStrong}`,
              borderRadius: rawTokens.radiusLg,
              width: "100%",
              maxWidth: "520px",
              padding: "24px",
              boxShadow: rawTokens.shadowElevated,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                Edit Parsed Engineering Parameters
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: rawTokens.textMuted,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxHeight: "360px",
                overflowY: "auto",
              }}
            >
              {Object.keys(editAttrs).map((k) => (
                <div key={k}>
                  <label
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {k}
                  </label>
                  <input
                    type="text"
                    value={editAttrs[k]}
                    onChange={(e) =>
                      setEditAttrs({ ...editAttrs, [k]: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginTop: "4px",
                      padding: "8px 12px",
                      borderRadius: rawTokens.radiusSm,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      fontSize: "13px",
                      fontFamily: rawTokens.fontMono,
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${rawTokens.borderStrong}`,
                  borderRadius: rawTokens.radiusFull,
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  if (onShowAuditMessage) {
                    onShowAuditMessage(
                      "Attribute overrides saved by steward. Re-scoring vector confidence..."
                    );
                  }
                }}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: rawTokens.radiusFull,
                  padding: "8px 20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Save Overrides
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

