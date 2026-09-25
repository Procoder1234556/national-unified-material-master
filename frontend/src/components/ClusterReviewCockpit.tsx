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
  Copy,
  Building2,
  Database,
} from "lucide-react";
import { DonutMicro, Sparkline, SegBar } from "./MicroCharts";
import { apiFetch, getAuthSession } from "../api";

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
  actorEmail?: string;
  onQueueCountChange?: (count: number) => void;
}

function mapApiItem(raw: any): TriageItem {
  const conf = Number(raw.confidence_score ?? 0);
  const gate = Boolean(raw.rule_gate_passed);
  let mapping_status: string = "REVIEW";
  if (!gate) mapping_status = "CONFLICT";
  else if (conf >= 0.88) mapping_status = "MATCH";
  else mapping_status = "REVIEW";

  const diffs = (raw.attribute_diffs || []).map((d: any) => ({
    attribute_name: d.attribute_name,
    raw_value: d.raw_value,
    canonical_value: d.canonical_value,
    status: d.status,
  }));

  const byName = (n: string) =>
    diffs.find((d: AttributeDiff) =>
      d.attribute_name.toLowerCase().includes(n)
    );

  return {
    mapping_id: String(raw.mapping_id),
    organization_code: raw.organization_code || "UNKNOWN",
    plant_location: raw.plant_location || "",
    source_item_code: raw.source_item_code || "",
    raw_description: raw.raw_description || "",
    onmc_candidate_code: raw.onmc_candidate_code || "",
    canonical_description: raw.canonical_description || "",
    confidence_score: conf,
    lexical_similarity: Number(raw.lexical_similarity ?? 0),
    semantic_similarity: Number(raw.semantic_similarity ?? 0),
    rule_gate_passed: gate,
    rejection_reasons: raw.rejection_reasons || [],
    shell_mesc_code: raw.shell_mesc_code,
    unspsc_code: raw.unspsc_code,
    gem_category_id: raw.gem_category_id,
    attribute_diffs: diffs,
    mapping_status,
    item_class:
      byName("item")?.canonical_value || byName("item")?.raw_value || undefined,
    size_val:
      byName("diameter")?.canonical_value ||
      byName("diameter")?.raw_value ||
      undefined,
    pressure_val:
      byName("pressure")?.canonical_value ||
      byName("pressure")?.raw_value ||
      undefined,
    metallurgy_val:
      byName("metallurgy")?.canonical_value ||
      byName("metallurgy")?.raw_value ||
      undefined,
  };
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
  actorEmail,
  onQueueCountChange,
}) => {
  const [items, setItems] = useState<TriageItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [filterState, setFilterState] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editAttrs, setEditAttrs] = useState<{ [key: string]: string }>({});
  const [mintedDossier, setMintedDossier] = useState<any | null>(null);
  const [copiedDossierCode, setCopiedDossierCode] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const activeItem = items[selectedIndex] || items[0] || null;

  const refreshQueue = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await apiFetch("/api/v1/steward/queue");
      if (!res.ok) {
        throw new Error(`queue ${res.status}`);
      }
      const data = await res.json();
      const mapped = (data.items || []).map(mapApiItem);
      setItems(mapped);
      setSelectedIndex(0);
      onQueueCountChange?.(mapped.length);
    } catch (err) {
      console.error("Steward queue load failed, using local fallback", err);
      setLoadError("API unavailable — showing offline triage fallback");
      setItems(DEFAULT_TRIAGE_ITEMS);
      onQueueCountChange?.(DEFAULT_TRIAGE_ITEMS.length);
    } finally {
      setLoading(false);
    }
  }, [onQueueCountChange]);

  useEffect(() => {
    void refreshQueue();
  }, [refreshQueue]);

  const handleDecision = useCallback(
    async (decision: "APPROVE" | "REJECT" | "MINT" | "OVERRIDE") => {
      if (!activeItem) return;

      const email =
        actorEmail || getAuthSession()?.email || "steward@numm.gov.in";

      try {
        const res = await apiFetch("/api/v1/steward/decision", {
          method: "POST",
          body: JSON.stringify({
            mapping_id: activeItem.mapping_id,
            decision,
            justification: `${decision} by steward via HITL cockpit for ${activeItem.source_item_code}`,
            actor_email: email,
          }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const detail =
            typeof errBody.detail === "string"
              ? errBody.detail
              : `Decision failed (${res.status})`;
          onShowAuditMessage?.(detail);
          return;
        }

        const data = await res.json();
        const shaHex = String(data.sha256_hash || "");

        if (decision === "MINT") {
          const mintedCode = data.onmc_code || activeItem.onmc_candidate_code;
          setMintedDossier({
            onmc_code: mintedCode,
            item: activeItem,
            sha256_seal: shaHex,
            timestamp: data.timestamp || new Date().toISOString(),
            segments: [
              {
                label: "Discipline",
                code: "MECH",
                desc: "Mechanical Equipment & Piping Components",
              },
              {
                label: "Category",
                code: "VLV",
                desc: "Industrial Valves & Actuation",
              },
              {
                label: "Sub-Family",
                code: "BAL",
                desc: "Ball Valve (Full Bore, 2-Piece / 3-Piece)",
              },
              {
                label: "Nominal Size",
                code: "002",
                desc: '2.00" Nominal Bore (50 mm DN)',
              },
              {
                label: "Pressure Rating",
                code: "NEW",
                desc: "Minted from raw attributes",
              },
              {
                label: "Metallurgy",
                code: "NEW",
                desc: "Extracted from CPSE description",
              },
              {
                label: "Deterministic Suffix",
                code: mintedCode.split("-").pop() || "HASH",
                desc: "Verification hash",
              },
            ],
            plant_matters: {
              organization: activeItem.organization_code,
              location: activeItem.plant_location,
              plant_code:
                activeItem.organization_code === "ONGC" ? "1100" : "1001",
              distance_to_hub: "—",
              in_plant_stock: "—",
              book_valuation: "—",
              officer_name: getAuthSession()?.fullName || "Data Steward",
              officer_title: "NUMM Data Steward",
            },
          });
        }

        onShowAuditMessage?.(
          data.message ||
            `[${decision}] ${activeItem.source_item_code} → SHA-256: ${shaHex.substring(0, 16)}...`
        );

        setItems((prev) => {
          const next = prev.filter(
            (it) => it.mapping_id !== activeItem.mapping_id
          );
          onQueueCountChange?.(next.length);
          return next;
        });
        setSelectedIndex((prev) =>
          Math.max(0, Math.min(prev, items.length - 2))
        );
      } catch (err) {
        console.error("Steward decision failed", err);
        onShowAuditMessage?.("Steward decision API unreachable");
      }
    },
    [
      activeItem,
      actorEmail,
      items.length,
      onQueueCountChange,
      onShowAuditMessage,
    ]
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
              {loading ? " • Loading queue…" : ` • ${items.length} pending`}
              {loadError ? ` • ${loadError}` : ""}
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

              {/* Pinned Primary Action Bar at Top of Inspector */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  border: `1px solid ${rawTokens.borderStrong}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Steward Triage Action
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: rawTokens.textSecondary,
                      fontFamily: rawTokens.fontMono,
                    }}
                  >
                    Shortcuts: A / R / N / E
                  </span>
                </div>

                {activeItem.mapping_status === "CONFLICT" ||
                activeItem.mapping_status === "BLOCKED" ? (
                  // Safety Conflict Mode: Approve is strictly locked!
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "6px",
                    }}
                  >
                    <button
                      onClick={() => handleDecision("REJECT")}
                      title="Reject candidate and maintain physical segregation"
                      style={{
                        backgroundColor: rawTokens.colorConflict,
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: rawTokens.radiusSm,
                        padding: "8px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <X size={13} />
                      <span>Split / Reject (R)</span>
                    </button>
                    <button
                      onClick={() => handleDecision("MINT")}
                      title="Mint a new sovereign ONMC code with correct parameters"
                      style={{
                        backgroundColor: "#111315",
                        color: "#FFFFFF",
                        border: `1px solid ${rawTokens.borderStrong}`,
                        borderRadius: rawTokens.radiusSm,
                        padding: "8px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <Sparkles size={13} color="#F1CC9D" />
                      <span>Mint Code (N)</span>
                    </button>
                  </div>
                ) : (
                  // Normal Review Mode
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "6px",
                    }}
                  >
                    <button
                      onClick={() => handleDecision("APPROVE")}
                      style={{
                        backgroundColor: "#0D533A",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: rawTokens.radiusSm,
                        padding: "8px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <Check size={13} />
                      <span>Approve (A)</span>
                    </button>
                    <button
                      onClick={() => handleDecision("REJECT")}
                      style={{
                        backgroundColor: rawTokens.surfaceCard,
                        border: `1px solid ${rawTokens.borderStrong}`,
                        borderRadius: rawTokens.radiusSm,
                        padding: "8px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.textPrimary,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <X size={13} />
                      <span>Reject (R)</span>
                    </button>
                  </div>
                )}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
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
                      backgroundColor: rawTokens.surfaceCard,
                      border: `1px solid ${rawTokens.borderSubtle}`,
                      borderRadius: rawTokens.radiusSm,
                      padding: "6px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: rawTokens.textSecondary,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <Edit2 size={11} />
                    <span>Edit (E)</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onNavigateToSearch) {
                        onNavigateToSearch(activeItem.raw_description);
                      }
                    }}
                    style={{
                      backgroundColor: rawTokens.surfaceCard,
                      border: `1px solid ${rawTokens.borderSubtle}`,
                      borderRadius: rawTokens.radiusSm,
                      padding: "6px",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: rawTokens.textSecondary,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    <Search size={11} />
                    <span>Search (S)</span>
                  </button>
                </div>
              </div>

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
                    id={`queue-row-${item.mapping_id}`}
                    data-mapping-id={item.mapping_id}
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

      {/* Minted Sovereign ONMC Code Dossier Modal */}
      {mintedDossier && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(17, 19, 21, 0.75)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: rawTokens.radiusLg,
              width: "100%",
              maxWidth: "720px",
              padding: "28px",
              boxShadow: rawTokens.shadowElevated,
              border: `1px solid ${rawTokens.borderStrong}`,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                paddingBottom: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(165, 215, 201, 0.35)",
                      color: "#0D533A",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    MoPNG Sovereign Catalog
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(233, 67, 68, 0.12)",
                      color: "#9B121E",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    SIH 26099 MINTED
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    margin: 0,
                  }}
                >
                  Sovereign ONMC Master Code Dossier
                </h2>
                <div
                  style={{
                    fontSize: "12px",
                    color: rawTokens.textMuted,
                    marginTop: "2px",
                  }}
                >
                  Statutory Codification under National Unified Material Master
                  (NUMM) Framework
                </div>
              </div>
              <button
                onClick={() => setMintedDossier(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: rawTokens.textMuted,
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Minted Code Showcase Banner */}
            <div
              style={{
                backgroundColor: "#111315",
                borderRadius: rawTokens.radiusMd,
                padding: "20px",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 700,
                }}
              >
                Assigned Sovereign Material Code
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: rawTokens.fontMono,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#F1CC9D",
                    letterSpacing: "0.04em",
                  }}
                >
                  {mintedDossier.onmc_code}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mintedDossier.onmc_code);
                    setCopiedDossierCode(true);
                    setTimeout(() => setCopiedDossierCode(false), 2000);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: copiedDossierCode
                      ? "#0D533A"
                      : "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    borderRadius: rawTokens.radiusSm,
                    padding: "6px 14px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {copiedDossierCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>
                    {copiedDossierCode
                      ? "Copied to Clipboard"
                      : "Copy ONMC Code"}
                  </span>
                </button>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#CBD5E1",
                  fontFamily: rawTokens.fontMono,
                  marginTop: "4px",
                }}
              >
                Raw Source: {mintedDossier.item?.source_item_code} •{" "}
                {mintedDossier.item?.raw_description}
              </div>
            </div>

            {/* Deterministic Segment Breakdown */}
            <div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                Deterministic Code Architecture Breakdown
              </div>
              <div
                style={{
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusMd,
                  overflow: "hidden",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: rawTokens.surfaceSubtle,
                        borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                      }}
                    >
                      <th
                        style={{
                          padding: "8px 12px",
                          textAlign: "left",
                          color: rawTokens.textMuted,
                        }}
                      >
                        Segment
                      </th>
                      <th
                        style={{
                          padding: "8px 12px",
                          textAlign: "left",
                          color: rawTokens.textMuted,
                        }}
                      >
                        Token
                      </th>
                      <th
                        style={{
                          padding: "8px 12px",
                          textAlign: "left",
                          color: rawTokens.textMuted,
                        }}
                      >
                        Engineering Specification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mintedDossier.segments.map((seg: any, sIdx: number) => (
                      <tr
                        key={sIdx}
                        style={{
                          borderBottom:
                            sIdx === mintedDossier.segments.length - 1
                              ? "none"
                              : `1px solid ${rawTokens.borderSubtle}`,
                        }}
                      >
                        <td
                          style={{
                            padding: "8px 12px",
                            fontWeight: 700,
                            color: rawTokens.textSecondary,
                          }}
                        >
                          {seg.label}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            fontFamily: rawTokens.fontMono,
                            fontWeight: 800,
                            color: rawTokens.colorAction,
                          }}
                        >
                          {seg.code}
                        </td>
                        <td
                          style={{
                            padding: "8px 12px",
                            color: rawTokens.textPrimary,
                          }}
                        >
                          {seg.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CPSE Plant Matters & Stock Overview */}
            <div
              style={{
                backgroundColor: rawTokens.surfaceSubtle,
                border: `1px solid ${rawTokens.borderStrong}`,
                borderRadius: rawTokens.radiusMd,
                padding: "16px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                fontSize: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    color: rawTokens.textMuted,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Originating CPSE Plant
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "2px",
                  }}
                >
                  {mintedDossier.plant_matters.organization} •{" "}
                  {mintedDossier.plant_matters.location} (Plant{" "}
                  {mintedDossier.plant_matters.plant_code})
                </div>
                <div
                  style={{ color: rawTokens.textSecondary, marginTop: "4px" }}
                >
                  Distance to Hub:{" "}
                  <strong>{mintedDossier.plant_matters.distance_to_hub}</strong>
                </div>
                <div
                  style={{
                    color: "#0D533A",
                    fontWeight: 700,
                    marginTop: "2px",
                  }}
                >
                  Stock Position: {mintedDossier.plant_matters.in_plant_stock}
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: rawTokens.textMuted,
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Statutory Sign-Off
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "2px",
                  }}
                >
                  {mintedDossier.plant_matters.officer_name}
                </div>
                <div
                  style={{ color: rawTokens.textSecondary, marginTop: "2px" }}
                >
                  {mintedDossier.plant_matters.officer_title}
                </div>
                <div
                  style={{
                    color: rawTokens.colorAction,
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  Book Valuation: {mintedDossier.plant_matters.book_valuation}
                </div>
              </div>
            </div>

            {/* CVC Cryptographic SHA-256 Provenance Seal */}
            <div
              style={{
                backgroundColor: "rgba(95, 151, 142, 0.08)",
                border: "1px solid rgba(95, 151, 142, 0.3)",
                borderRadius: rawTokens.radiusSm,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: rawTokens.fontMono,
                fontSize: "11px",
              }}
            >
              <ShieldCheck size={18} color="#0D533A" />
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ color: "#0D533A" }}>
                  FIPS 180-4 SHA-256 AUDIT SEAL:
                </strong>{" "}
                <span style={{ color: rawTokens.textPrimary }}>
                  {mintedDossier.sha256_seal}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: `1px solid ${rawTokens.borderSubtle}`,
                paddingTop: "16px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    const code = mintedDossier.onmc_code;
                    setMintedDossier(null);
                    if (onNavigateToSearch) onNavigateToSearch(code);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusFull,
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Search size={13} />
                  <span>Search National Stock</span>
                </button>
                <button
                  onClick={() => {
                    if (onShowAuditMessage) {
                      onShowAuditMessage(
                        `SIH: Simulated SAP BAPI_MATERIAL_SAVEDATA for ${mintedDossier.plant_matters.organization} plant ${mintedDossier.plant_matters.plant_code} (no live RFC — production adapter seam).`
                      );
                    }
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusFull,
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: rawTokens.colorAction,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Database size={13} />
                  <span>Simulate SAP Sync</span>
                </button>
              </div>

              <button
                onClick={() => setMintedDossier(null)}
                style={{
                  backgroundColor: "#0D533A",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: rawTokens.radiusFull,
                  padding: "10px 24px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Proceed to Next Item →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
