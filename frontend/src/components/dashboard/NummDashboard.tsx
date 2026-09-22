// ponytail: High-fidelity NUMM enterprise dashboard coordinating operational intelligence, charts, queue, and drawers.
// Upgrade path: add user customizable dashboard widget grid drag-and-drop.

import React, { useState, useEffect } from "react";
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

export interface NummDashboardProps {
  onNavigateView: (view: string, query?: string) => void;
  onShowAudit: (message: string) => void;
}

export const NummDashboard: React.FC<NummDashboardProps> = ({
  onNavigateView,
  onShowAudit,
}) => {
  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    period: "7D",
    dateRange: "28/01/26 – 03/02/26",
    cpse: "All CPSEs",
    plant: "All Plants",
    materialClass: "All Classes",
    matchStatus: "All Statuses",
  });

  // Priority Review Queue Items
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: "item-1",
      status: "REVIEW",
      rawDescription: "VLV BL FLGD 50MM NB 150# WCB BODY PTFE SEAT LEVER OP",
      cpse: "ONGC",
      candidateOnmc: "ONMC-MECH-VLV-BAL-050-150-WCB-48A1",
      confidence: 89.4,
      attributes: {
        itemType: "Ball Valve",
        size: '50mm (2")',
        pressureClass: "Class 150",
        materialGrade: "ASTM A216 WCB",
        endConnection: "Flanged RF",
        standard: "ASME B16.34",
      },
      candidateAttributes: {
        itemType: "Ball Valve",
        size: '50mm (2")',
        pressureClass: "Class 150",
        materialGrade: "ASTM A216 WCB",
        endConnection: "Flanged RF",
        standard: "ASME B16.34",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "item-2",
      status: "CONFLICT",
      rawDescription: "4IN GATE VALVE CL300 A216 WCB RF FLANGED OS&Y TRIM 8",
      cpse: "IOCL",
      candidateOnmc: "ONMC-MECH-VLV-GAT-100-300-WCB-91F2",
      confidence: 94.1,
      attributes: {
        itemType: "Gate Valve",
        size: '100mm (4")',
        pressureClass: "Class 300",
        materialGrade: "ASTM A216 WCB",
        endConnection: "Flanged RF",
        standard: "API 6D",
      },
      candidateAttributes: {
        itemType: "Gate Valve",
        size: '100mm (4")',
        pressureClass: "Class 150", // fatal conflict
        materialGrade: "ASTM A216 WCB",
        endConnection: "Flanged RF",
        standard: "API 6D",
      },
      conflictDetails:
        "Fatal Safety Gate: Pressure Class mismatch. Ingested item is Class 300 (PN50) whereas candidate target is Class 150 (PN20). Hydrostatic threshold violation.",
      imageUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "item-3",
      status: "REVIEW",
      rawDescription:
        "SPWD GASKET 50MM 150# SS316 GRAPHITE FILLER RF CENTERING RING",
      cpse: "BPCL",
      candidateOnmc: "ONMC-MECH-GSK-SPW-050-150-SS3-11C8",
      confidence: 86.7,
      attributes: {
        itemType: "Spiral Wound Gasket",
        size: '50mm (2")',
        pressureClass: "Class 150",
        materialGrade: "SS316 / Graphite",
        endConnection: "Raised Face",
        standard: "ASME B16.20",
      },
      candidateAttributes: {
        itemType: "Spiral Wound Gasket",
        size: '50mm (2")',
        pressureClass: "Class 150",
        materialGrade: "SS316 / Graphite",
        endConnection: "Raised Face",
        standard: "ASME B16.20",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "item-4",
      status: "NOVEL",
      rawDescription:
        "LINE PIPE SMLS 100MM SCH40 API 5L GR.B PSL2 BE 12M LENGTH",
      cpse: "NRL",
      candidateOnmc: "—",
      confidence: 62.3,
      attributes: {
        itemType: "Seamless Line Pipe",
        size: '100mm (4")',
        pressureClass: "SCH 40",
        materialGrade: "API 5L Gr. B PSL2",
        endConnection: "Beveled Ends",
        standard: "API 5L",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    },
  ]);

  // Selected item index for inspector
  const [selectedQueueIndex, setSelectedQueueIndex] = useState<number | null>(
    null
  );
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState(false);

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
      {/* 1. Global Material Search bar */}
      <MaterialSearchBar
        onSearch={(q) => onNavigateView("search", q)}
        onOpenCompare={() => onNavigateView("steward")}
        onRefresh={() =>
          onShowAudit(
            "Harmonization vector cache refreshed. 12,640 records re-indexed."
          )
        }
      />

      {/* 2. Filter Bar */}
      <FilterBar
        filters={filters}
        onChangeFilters={setFilters}
        onOpenAdvancedFilters={() => setIsQuickSearchOpen(true)}
      />

      {/* 3. Operational KPI Grid (5 Cards) */}
      <KPICardGrid
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
