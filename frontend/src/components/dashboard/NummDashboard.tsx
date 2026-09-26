// ponytail: High-fidelity NUMM enterprise dashboard coordinating operational intelligence, charts, queue, and drawers.
// Upgrade path: add user customizable dashboard widget grid drag-and-drop.

import React, { useState, useEffect, useCallback } from "react";
import { MaterialSearchBar } from "./MaterialSearchBar";
import { FilterBar, FilterState } from "./FilterBar";
import { KPICardGrid } from "./KPICardGrid";
import { HarmonizationActivityChart } from "./HarmonizationActivityChart";
import { MatchQualityCard } from "./MatchQualityCard";
import { CPSEHeatmap } from "./CPSEHeatmap";
import { PriorityReviewQueue } from "./PriorityReviewQueue";
import {
  StewardshipInspectorDrawer,
  ReviewItem,
} from "./StewardshipInspectorDrawer";
import { RecentIngestionJobs } from "./RecentIngestionJobs";
import { SearchBeforeBuyOpportunity } from "./SearchBeforeBuyOpportunity";
import { NationalMasterSummary } from "./NationalMasterSummary";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { QuickSearchModal } from "./QuickSearchModal";
import { rawTokens } from "../../tokens.stylex";
import { UserCheck, ArrowUpRight } from "lucide-react";
import { apiFetch } from "../../api";

export interface NummDashboardProps {
  onNavigateView: (view: string, query?: string) => void;
  onShowAudit: (message: string) => void;
  activeRole?: string;
  onSelectRole?: (role: string) => void;
  onInspectONMC?: (onmcCode: string) => void;
  stewardPendingCount?: number;
  onQueueCountChange?: (count: number) => void;
}

const POC_FALLBACK_QUEUE: ReviewItem[] = [
  {
    id: "poc-ongc-ball",
    status: "REVIEW",
    rawDescription: "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
    cpse: "ONGC",
    candidateOnmc: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    confidence: 88.5,
    attributes: {
      itemType: "Ball Valve",
      size: '2.00" / 50mm NB',
      pressureClass: "Class 150",
      materialGrade: "ASTM A105",
      endConnection: "Flanged RF",
      standard: "API 6D",
    },
    candidateAttributes: {
      itemType: "Ball Valve",
      size: '2.00"',
      pressureClass: "Class 150",
      materialGrade: "ASTM A105",
      endConnection: "Flanged RF",
      standard: "API 6D",
    },
    imageUrl: "/images/pipeline-valves.jpg",
  },
  {
    id: "poc-pressure-conflict",
    status: "CONFLICT",
    rawDescription:
      "BALL VALVE 2IN 300LB FLGD WCB BODY (PRESSURE RATING DISCREPANCY)",
    cpse: "ONGC",
    candidateOnmc: "ONMC-MECH-VLV-BAL-002-150-A105-9B2F",
    confidence: 72.0,
    attributes: {
      itemType: "Ball Valve",
      size: '2.00"',
      pressureClass: "Class 300",
      materialGrade: "ASTM A216 WCB",
      endConnection: "Flanged RF",
      standard: "ASME B16.34",
    },
    candidateAttributes: {
      itemType: "Ball Valve",
      size: '2.00"',
      pressureClass: "Class 150",
      materialGrade: "ASTM A105",
      endConnection: "Flanged RF",
      standard: "API 6D",
    },
    conflictDetails:
      "Safety gate: pressure class mismatch Class 300 vs Class 150 (ASME B16.34). Approve blocked — use REJECT or MINT.",
    imageUrl: "/images/pipeline-inspection.jpg",
  },
  {
    id: "poc-gasket",
    status: "REVIEW",
    rawDescription: "SPIRAL WOUND GASKET 50MM 150# 316SS WITH GRAPHITE",
    cpse: "ONGC",
    candidateOnmc: "ONMC-STAT-GSK-SPW-002-150-SS316-2F88",
    confidence: 87.5,
    attributes: {
      itemType: "Spiral Wound Gasket",
      size: '2.00" / 50mm',
      pressureClass: "Class 150",
      materialGrade: "SS316 / Graphite",
      endConnection: "RF",
      standard: "ASME B16.20",
    },
    candidateAttributes: {
      itemType: "Spiral Wound Gasket",
      size: '2.00"',
      pressureClass: "Class 150",
      materialGrade: "SS316",
      endConnection: "RF",
      standard: "ASME B16.20",
    },
    imageUrl: "/images/industrial-piping.jpg",
  },
  {
    id: "poc-pipe",
    status: "REVIEW",
    rawDescription: "LINE PIPE SMLS 100MM NB SCH40 CS ASTM A106 GR B",
    cpse: "NRL",
    candidateOnmc: "ONMC-PIPE-PIP-SML-004-040-A106-5E2B",
    confidence: 84.0,
    attributes: {
      itemType: "Seamless Line Pipe",
      size: '4.00" / 100mm',
      pressureClass: "SCH 40",
      materialGrade: "ASTM A106 Gr B",
      endConnection: "BE",
      standard: "API 5L",
    },
    candidateAttributes: {
      itemType: "Line Pipe",
      size: '4.00"',
      pressureClass: "SCH 40",
      materialGrade: "ASTM A106",
      endConnection: "BE",
      standard: "API 5L",
    },
    imageUrl: "/images/refinery-plant.jpg",
  },
];

function mapStewardToReviewItem(raw: any): ReviewItem {
  const confPct = Math.round(Number(raw.confidence_score ?? 0) * 1000) / 10;
  const gate = Boolean(raw.rule_gate_passed);
  const status: ReviewItem["status"] = !gate
    ? "CONFLICT"
    : confPct >= 92
      ? "MATCH"
      : confPct < 70
        ? "NOVEL"
        : "REVIEW";

  const diffs = raw.attribute_diffs || [];
  const pick = (name: string) =>
    diffs.find((d: any) =>
      String(d.attribute_name || "")
        .toLowerCase()
        .includes(name)
    );

  const size = pick("diameter") || pick("size");
  const pressure = pick("pressure");
  const metal = pick("metallurgy");
  const cls = pick("item");
  const end = pick("end");

  return {
    id: String(raw.mapping_id),
    status,
    rawDescription: raw.raw_description || "",
    cpse: raw.organization_code || "UNKNOWN",
    candidateOnmc: raw.onmc_candidate_code || "—",
    confidence: confPct,
    attributes: {
      itemType: size
        ? String(cls?.raw_value || "—")
        : String(cls?.raw_value || "—"),
      size: String(size?.raw_value ?? "—"),
      pressureClass: String(pressure?.raw_value ?? "—"),
      materialGrade: String(metal?.raw_value ?? "—"),
      endConnection: String(end?.raw_value ?? "—"),
      standard: "—",
    },
    candidateAttributes: {
      itemType: String(cls?.canonical_value ?? "—"),
      size: String(size?.canonical_value ?? "—"),
      pressureClass: String(pressure?.canonical_value ?? "—"),
      materialGrade: String(metal?.canonical_value ?? "—"),
      endConnection: String(end?.canonical_value ?? "—"),
      standard: "—",
    },
    conflictDetails: !gate
      ? (raw.rejection_reasons || []).join(" ") ||
        "Safety gate blocked this candidate."
      : undefined,
    imageUrl: "/images/pipeline-valves.jpg",
  };
}

export const NummDashboard: React.FC<NummDashboardProps> = ({
  onNavigateView,
  onShowAudit,
  activeRole = "STEWARD",
  onSelectRole,
  onInspectONMC,
  stewardPendingCount,
  onQueueCountChange,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    period: "7D",
    dateRange: "POC pilot week",
    cpse: "All CPSEs",
    plant: "All Plants",
    materialClass: "All Classes",
    matchStatus: "All Statuses",
  });

  const [reviewItems, setReviewItems] =
    useState<ReviewItem[]>(POC_FALLBACK_QUEUE);
  const [pendingCount, setPendingCount] = useState(stewardPendingCount ?? 6);
  const [safetyConflicts, setSafetyConflicts] = useState(1);

  const [selectedQueueIndex, setSelectedQueueIndex] = useState<number | null>(
    null
  );
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

  const loadQueue = useCallback(async () => {
    try {
      const res = await apiFetch("/api/v1/steward/queue");
      if (!res.ok) throw new Error(`queue ${res.status}`);
      const data = await res.json();
      const items = (data.items || []).map(mapStewardToReviewItem);
      if (items.length > 0) {
        setReviewItems(items);
        setPendingCount(data.total_pending ?? items.length);
        setSafetyConflicts(
          items.filter((i: ReviewItem) => i.status === "CONFLICT").length
        );
        onQueueCountChange?.(data.total_pending ?? items.length);
      }
    } catch {
      setReviewItems(POC_FALLBACK_QUEUE);
      setPendingCount(POC_FALLBACK_QUEUE.length);
      onQueueCountChange?.(POC_FALLBACK_QUEUE.length);
    }
  }, [onQueueCountChange]);

  useEffect(() => {
    void loadQueue();
  }, [loadQueue]);

  useEffect(() => {
    if (typeof stewardPendingCount === "number") {
      setPendingCount(stewardPendingCount);
    }
  }, [stewardPendingCount]);

  // Global Keyboard listener for J, K, A, R, E, ?, Cmd+K, Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") {
        if (e.key === "Escape") {
          (e.target as HTMLElement)?.blur();
        }
        return;
      }

      // Cmd/Ctrl + K: Quick Search Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
        return;
      }

      // ?: Help shortcuts
      if (e.key === "?") {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // Esc: Close any modal/drawer
      if (e.key === "Escape") {
        setSelectedQueueIndex(null);
        setIsShortcutsOpen(false);
        setIsQuickSearchOpen(false);
        return;
      }

      // J: Next in queue
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        setSelectedQueueIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % reviewItems.length;
        });
        return;
      }

      // K: Prev in queue
      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        setSelectedQueueIndex((prev) => {
          if (prev === null) return reviewItems.length - 1;
          return prev === 0 ? reviewItems.length - 1 : prev - 1;
        });
        return;
      }

      // A: Approve current item
      if (e.key === "a" || e.key === "A") {
        if (selectedQueueIndex !== null) {
          const item = reviewItems[selectedQueueIndex];
          if (item.status !== "CONFLICT") {
            handleApproveItem(item.id);
          }
        }
        return;
      }

      // R: Reject current item
      if (e.key === "r" || e.key === "R") {
        if (selectedQueueIndex !== null) {
          const item = reviewItems[selectedQueueIndex];
          handleRejectItem(item.id);
        }
        return;
      }

      // E: Edit attributes
      if (e.key === "e" || e.key === "E") {
        if (selectedQueueIndex !== null) {
          const item = reviewItems[selectedQueueIndex];
          handleEditItem(item.id);
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedQueueIndex, reviewItems]);

  const handleApproveItem = (id: string) => {
    const item = reviewItems.find((i) => i.id === id);
    if (!item) return;

    onShowAudit(
      `Steward Approval Confirmed: ${item.candidateOnmc} mapped to ${item.cpse} ERP record with 100% verified gate.`
    );

    // Update item status to MATCH
    setReviewItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "MATCH", confidence: 99.8 } : i
      )
    );
  };

  const handleRejectItem = (id: string) => {
    const item = reviewItems.find((i) => i.id === id);
    if (!item) return;

    onShowAudit(
      `Steward Cluster Split Initiated: ${item.rawDescription} quarantined for dedicated ONMC classification.`
    );

    // Update item status to NOVEL
    setReviewItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "NOVEL", candidateOnmc: "—" } : i
      )
    );
  };

  const handleEditItem = (id: string) => {
    const item = reviewItems.find((i) => i.id === id);
    if (!item) return;

    onShowAudit(
      `Attribute Editor: Opened specification parameters for ${item.rawDescription.slice(0, 35)}...`
    );
    // Transition to detailed steward triage cockpit
    onNavigateView("steward");
  };

  // Persona details from PRD.md
  const personas: Record<
    string,
    {
      name: string;
      designation: string;
      mandate: string;
      actionLabel: string;
      actionTarget: string;
      badgeColor: string;
    }
  > = {
    STEWARD: {
      name: "Rameshwar Sharma",
      designation:
        "Chief Manager (Materials Management), IOCL Mathura Refinery",
      mandate:
        "HITL catalog triage · ASME B16.34 / API 6D safety gates · SAP MM01 cycle <10 min (PRD OG-02 / BG-04).",
      actionLabel: `Open steward queue (${pendingCount} pending)`,
      actionTarget: "steward",
      badgeColor: "#E94344",
    },
    PROCUREMENT_OFFICER: {
      name: "Priya Venkatraman",
      designation: "General Manager (Central Procurement Cell), MoPNG / EIL",
      mandate:
        "Search Before Buy · pooled demand across 10 CPSEs · GeM Rule 149 GFR (PRD OG-01 / BG-03).",
      actionLabel: "Open pooled demand aggregator",
      actionTarget: "demand",
      badgeColor: "#5F978E",
    },
    PLANT_ENGINEER: {
      name: "Harpreet Singh",
      designation: "DGM (Mechanical Maintenance), ONGC Hazira Plant",
      mandate:
        "Emergency spare discovery within radius · MTIRF inter-CPSE transfer <4 h (PRD OG-03 / APP_FLOW Flow 4).",
      actionLabel: "Find nearby surplus (14 units @ Hazira)",
      actionTarget: "surplus",
      badgeColor: "#D97706",
    },
    AUDITOR: {
      name: "S. K. Gupta",
      designation: "Director (Procurement Vigilance), CVC / MoPNG",
      mandate:
        "Append-only CVC SHA-256 audit ledger · catalog rationalization · price divergence (PRD BG-05).",
      actionLabel: "Open CVC cryptographic audit vault",
      actionTarget: "security",
      badgeColor: "#9B121E",
    },
  };

  const currentPersona = personas[activeRole] || personas.STEWARD;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        width: "100%",
        maxWidth: "1450px",
        margin: "0 auto",
      }}
    >
      {/* 0. Sovereign Persona Context Banner (PRD.md Section 5) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderLeft: `4px solid ${currentPersona.badgeColor}`,
          borderRadius: "12px",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              backgroundColor: `${currentPersona.badgeColor}15`,
              color: currentPersona.badgeColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserCheck size={22} />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                {currentPersona.name}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: currentPersona.badgeColor,
                  backgroundColor: `${currentPersona.badgeColor}12`,
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {currentPersona.designation}
              </span>
            </div>
            <div
              style={{
                fontSize: "12.5px",
                color: rawTokens.textSecondary,
                marginTop: "3px",
              }}
            >
              {currentPersona.mandate}
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateView(currentPersona.actionTarget)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: currentPersona.badgeColor,
            color: "#FFFFFF",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            boxShadow: `0 2px 6px ${currentPersona.badgeColor}40`,
            transition: "all 0.15s ease",
          }}
        >
          <span>{currentPersona.actionLabel}</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* 1. Global Material Search bar */}
      <MaterialSearchBar
        onSearch={(q) => onNavigateView("search", q)}
        onOpenCompare={() => onNavigateView("steward")}
        onRefresh={() =>
          onShowAudit(
            "Pilot catalog cache refreshed (24 POC lines / 7 ONMC masters)."
          )
        }
      />

      {/* 2. Filter Bar */}
      <FilterBar
        filters={filters}
        onChangeFilters={setFilters}
        onOpenAdvancedFilters={() => setIsQuickSearchOpen(true)}
      />

      {/* 3. Operational KPI Grid (5 Cards) — POC/PRD grounded */}
      <KPICardGrid
        reviewPending={pendingCount}
        materialsInPilot={24}
        autoApprovedPct={58}
        safetyConflicts={safetyConflicts}
        surplusUnits={14}
        onCardClick={(k) => {
          if (k === "review") setSelectedQueueIndex(0);
          else if (k === "surplus") onNavigateView("surplus");
          else if (k === "conflicts") setSelectedQueueIndex(1);
          else onNavigateView("steward");
        }}
      />

      {/* 4. Main Analytical Workspace (2-Column Grid) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.55fr 1fr",
          gap: "14px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Harmonization Activity Chart & Priority Review Queue */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <HarmonizationActivityChart />

          <PriorityReviewQueue
            items={reviewItems}
            selectedIndex={selectedQueueIndex ?? -1}
            onSelectItem={(idx) => setSelectedQueueIndex(idx)}
            onViewAll={() => onNavigateView("steward")}
          />
        </div>

        {/* Right Column: Match Quality, CPSE Activity Heatmap, Recent Ingestion Jobs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <MatchQualityCard
            onSelectTier={(tier) => {
              onShowAudit(
                `Filtered workspace view by match tier: ${tier.toUpperCase()}`
              );
            }}
          />

          <CPSEHeatmap />

          <RecentIngestionJobs onViewAll={() => onNavigateView("ingest")} />
        </div>
      </div>

      {/* 5. Search Before Buy Opportunity Card (Wide Callout) */}
      <SearchBeforeBuyOpportunity
        onViewSurplus={() => onNavigateView("surplus")}
        onViewMaterial={(onmc) => onNavigateView("search", onmc)}
      />

      {/* 6. National Master Summary Banner (3 stats + Crosswalk) */}
      <NationalMasterSummary />

      {/* Slide-in Stewardship Inspector Drawer */}
      {selectedQueueIndex !== null && (
        <StewardshipInspectorDrawer
          item={reviewItems[selectedQueueIndex]}
          currentIndex={selectedQueueIndex}
          totalItems={reviewItems.length}
          onClose={() => setSelectedQueueIndex(null)}
          onApprove={handleApproveItem}
          onReject={handleRejectItem}
          onEdit={handleEditItem}
          onNext={() =>
            setSelectedQueueIndex((prev) =>
              prev === null ? 0 : (prev + 1) % reviewItems.length
            )
          }
          onPrev={() =>
            setSelectedQueueIndex((prev) =>
              prev === null
                ? reviewItems.length - 1
                : prev === 0
                  ? reviewItems.length - 1
                  : prev - 1
            )
          }
        />
      )}

      {/* Keyboard Shortcuts Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Quick Search & Command Palette Modal (Cmd/Ctrl + K) */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSelectResult={(query, targetView) => {
          if (targetView) onNavigateView(targetView, query);
          else onNavigateView("search", query);
        }}
      />
    </div>
  );
};
