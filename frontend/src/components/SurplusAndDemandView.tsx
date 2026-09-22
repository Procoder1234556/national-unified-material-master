// ponytail: Unified Inter-CPSE Surplus Discovery & Pooled Demand Engine UI.
// Upgrade path: add real-time WebSocket feed of live CPSE surplus dispatches.

import React, { useEffect, useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  Compass,
  TrendingDown,
  Truck,
  FileCheck,
  ShieldCheck,
  Layers,
  CheckCircle2,
  FileSpreadsheet,
  X,
} from "lucide-react";
import { API_BASE } from "../api";

interface PlantInfo {
  plant_key: string;
  organization_code: string;
  organization_name: string;
  plant_code: string;
  plant_name: string;
  location_name: string;
  latitude: number;
  longitude: number;
}

interface SurplusItem {
  onmc_code: string;
  canonical_description: string;
  item_class: string;
  size_inch?: number;
  pressure_class?: number;
  metallurgy?: string;
  source_organization: string;
  source_organization_name: string;
  source_plant_code: string;
  source_plant_name: string;
  source_plant_location: string;
  available_stock: number;
  unit_price: number;
  distance_km: number;
  estimated_transit_hours: number;
  gem_category_id?: string;
}

interface PooledBatch {
  batch_id: string;
  onmc_code: string;
  canonical_description: string;
  item_class: string;
  gem_category_id: string;
  total_aggregate_quantity: number;
  participating_org_count: number;
  participating_organizations: string[];
  baseline_unit_price: number;
  baseline_total_cost_inr: number;
  discount_tier_pct: number;
  discounted_unit_price: number;
  pooled_total_cost_inr: number;
  projected_savings_inr: number;
  target_tender_month: string;
  gfr_rule_149_status: string;
  procurement_mode: string;
  status: string;
}

interface BatchesResponse {
  total_batches: number;
  total_national_quantity: number;
  total_baseline_cost_inr: number;
  total_projected_savings_inr: number;
  average_discount_pct: number;
  batches: PooledBatch[];
}

interface GeMTenderPackage {
  tender_reference_number: string;
  batch_id: string;
  onmc_code: string;
  canonical_description: string;
  gem_category_id: string;
  gem_category_name: string;
  gfr_rule_149_threshold_clause: string;
  procurement_mode: string;
  total_pooled_quantity: number;
  estimated_tender_value_inr: number;
  projected_savings_inr: number;
  discount_tier_achieved: string;
  participating_cpse_allocations: any[];
  mandatory_technical_specifications: any;
  cvc_anti_cartelization_undertaking: string;
  created_at: string;
}

interface MTIRFDoc {
  requisition_number: string;
  created_at: string;
  regulatory_mandate: string;
  status: string;
  item_details: any;
  source_details: any;
  destination_details: any;
  quantity: number;
  unit_valuation_inr: number;
  total_valuation_inr: number;
  distance_km: number;
  estimated_transit_hours: number;
  emergency_category: string;
  justification_reason: string;
  cvc_tamper_seal: any;
  erp_handshake: any;
}

interface Props {
  onShowAuditMessage: (msg: string) => void;
  defaultSubTab?: "surplus" | "demand";
  onInspectONMC?: (code: string) => void;
}

export const SurplusAndDemandView: React.FC<Props> = ({
  onShowAuditMessage,
  defaultSubTab = "surplus",
  onInspectONMC,
}) => {
  const [subTab, setSubTab] = useState<"surplus" | "demand">(defaultSubTab);

  useEffect(() => {
    if (defaultSubTab) {
      setSubTab(defaultSubTab);
    }
  }, [defaultSubTab]);

  const [plants, setPlants] = useState<PlantInfo[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<string>("IOCL_MATHURA");
  const [maxRadius, setMaxRadius] = useState<number>(1500);
  const [surplusList, setSurplusList] = useState<SurplusItem[]>([]);
  const [loadingSurplus, setLoadingSurplus] = useState<boolean>(false);

  // Demand Pool State
  const [batchData, setBatchData] = useState<BatchesResponse | null>(null);
  const [selectedTender, setSelectedTender] = useState<GeMTenderPackage | null>(
    null
  );

  // MTIRF Modal State
  const [activeSurplusForMTIRF, setActiveSurplusForMTIRF] =
    useState<SurplusItem | null>(null);
  const [transferQty, setTransferQty] = useState<number>(4);
  const [justification, setJustification] = useState<string>(
    "Critical turnaround bypass valve failure; immediate inter-CPSE loan required to avert unscheduled flaring."
  );
  const [emergencyCat, setEmergencyCat] = useState<string>(
    "CRITICAL_MAINTENANCE"
  );
  const [activeMTIRF, setActiveMTIRF] = useState<MTIRFDoc | null>(null);
  const [submittingMTIRF, setSubmittingMTIRF] = useState<boolean>(false);

  // Fetch plant directory and batches
  useEffect(() => {
    fetch(`${API_BASE}/api/v1/surplus/plants`)
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((err) => console.error("Failed to load CPSE plants", err));

    fetchBatches();
  }, []);

  const fetchBatches = () => {
    fetch(`${API_BASE}/api/v1/demand-pool/batches`)
      .then((res) => res.json())
      .then((data) => setBatchData(data))
      .catch((err) => console.error("Failed to load pooled batches", err));
  };

  // Fetch nearby surplus when plant or radius changes
  useEffect(() => {
    if (!selectedPlant) return;
    setLoadingSurplus(true);
    fetch(
      `${API_BASE}/api/v1/surplus/nearby?destination_plant=${selectedPlant}&max_radius_km=${maxRadius}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSurplusList(data.items || []);
        setLoadingSurplus(false);
      })
      .catch((err) => {
        console.error("Failed to load nearby surplus", err);
        setLoadingSurplus(false);
      });
  }, [selectedPlant, maxRadius]);

  // Handle MTIRF Generation
  const handleGenerateMTIRF = async () => {
    if (!activeSurplusForMTIRF) return;
    setSubmittingMTIRF(true);

    const sourceKey = `${activeSurplusForMTIRF.source_organization}_${activeSurplusForMTIRF.source_plant_code}`;
    const payload = {
      onmc_code: activeSurplusForMTIRF.onmc_code,
      source_plant_key: sourceKey,
      destination_plant_key: selectedPlant,
      transfer_quantity: transferQty,
      emergency_category: emergencyCat,
      justification_reason: justification,
      requesting_officer_name: "S. K. Gupta",
      requesting_officer_designation: "Chief Materials Manager",
      requesting_officer_email: "skgupta@iocl.co.in",
    };

    try {
      const res = await fetch(`${API_BASE}/api/v1/surplus/mtirf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setActiveMTIRF(data);
      setSubmittingMTIRF(false);
      onShowAuditMessage(
        `MoPNG MTIRF generated [${data.requisition_number}] with SHA-256 seal: ${data.cvc_tamper_seal.sha256_digest.substring(0, 16)}...`
      );
    } catch (err) {
      console.error("Failed to generate MTIRF", err);
      setSubmittingMTIRF(false);
    }
  };

  // Handle MTIRF Approval
  const handleApproveMTIRF = async (reqNumber: string) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/v1/surplus/mtirf/${reqNumber}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requisition_number: reqNumber,
            approving_officer_name: "A. K. Mehta",
            approving_officer_email: "akmehta@ongc.co.in",
            approving_officer_designation:
              "Executive Director (Materials Management)",
            e_sign_pin_or_token: "AADHAAR-OTP-VERIFIED",
          }),
        }
      );
      const data = await res.json();
      onShowAuditMessage(
        `MTIRF ${reqNumber} APPROVED by source. SAP Outbound Note: ${data.sap_outbound_delivery_note}`
      );
      if (activeMTIRF) {
        setActiveMTIRF({ ...activeMTIRF, status: "APPROVED_BY_SOURCE" });
      }
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  // Handle GeM Tender Export View
  const handleViewGeMTender = async (batchId: string) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/v1/demand-pool/batches/${batchId}/gem-tender`
      );
      const data = await res.json();
      setSelectedTender(data);
    } catch (err) {
      console.error("Failed to load GeM tender package", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Sub navigation bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: rawTokens.surfaceCard,
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderRadius: rawTokens.radiusLg,
          padding: "12px 20px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setSubTab("surplus")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                subTab === "surplus" ? rawTokens.colorAction : "transparent",
              color: subTab === "surplus" ? "#FFFFFF" : rawTokens.textPrimary,
              border: "none",
              borderRadius: rawTokens.radiusMd,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: rawTokens.textSm,
              cursor: "pointer",
            }}
          >
            <Compass size={16} />
            Inter-CPSE Surplus Discovery & MTIRF
          </button>
          <button
            onClick={() => setSubTab("demand")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                subTab === "demand" ? rawTokens.colorAction : "transparent",
              color: subTab === "demand" ? "#FFFFFF" : rawTokens.textPrimary,
              border: "none",
              borderRadius: rawTokens.radiusMd,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: rawTokens.textSm,
              cursor: "pointer",
            }}
          >
            <TrendingDown size={16} />
            Pooled Demand Engine & GeM Tenders
          </button>
        </div>

        <div
          style={{
            fontSize: rawTokens.textXs,
            color: rawTokens.textMuted,
            fontWeight: 600,
          }}
        >
          MoPNG / NUMM Inter-CPSE Cooperation Protocol • Rule 149 GFR Compliant
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: INTER-CPSE SURPLUS DISCOVERY */}
      {/* ==================================================================== */}
      {subTab === "surplus" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Controls Panel */}
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: rawTokens.radiusLg,
              padding: "20px",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  marginBottom: "6px",
                }}
              >
                REQUESTING CPSE REFINERY / ASSET
              </label>
              <select
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderStrong}`,
                  fontFamily: rawTokens.fontSans,
                  fontSize: rawTokens.textSm,
                  backgroundColor: rawTokens.surfaceSubtle,
                  color: rawTokens.textPrimary,
                  fontWeight: 600,
                }}
              >
                {plants.map((p) => (
                  <option key={p.plant_key} value={p.plant_key}>
                    {p.organization_code} • {p.plant_name} ({p.location_name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  marginBottom: "6px",
                }}
              >
                SEARCH RADIUS:{" "}
                <span style={{ color: rawTokens.colorAction }}>
                  {maxRadius} KM
                </span>
              </label>
              <input
                type="range"
                min="100"
                max="2500"
                step="100"
                value={maxRadius}
                onChange={(e) => setMaxRadius(parseInt(e.target.value))}
                style={{ width: "100%", cursor: "pointer" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "10px",
                  color: rawTokens.textMuted,
                  marginTop: "2px",
                }}
              >
                <span>100 km (Immediate)</span>
                <span>800 km (Regional)</span>
                <span>2500 km (Pan-India)</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  fontSize: rawTokens.textBase,
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                Surplus Stock Ready for Transfer ({surplusList.length} items
                within {maxRadius} km)
              </h3>
              <span
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textSecondary,
                }}
              >
                Ranked by Road Transit Distance (Nearest Depot First)
              </span>
            </div>

            {loadingSurplus ? (
              <div
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: rawTokens.textMuted,
                }}
              >
                Computing Haversine road transit paths across CPSE terminals...
              </div>
            ) : surplusList.length === 0 ? (
              <div
                style={{
                  backgroundColor: rawTokens.surfaceCard,
                  padding: "40px",
                  textAlign: "center",
                  borderRadius: rawTokens.radiusLg,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  color: rawTokens.textSecondary,
                }}
              >
                No surplus inventory located within {maxRadius} km radius.
                Expand radius slider to search nationwide.
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                  gap: "16px",
                }}
              >
                {surplusList.map((item, idx) => (
                  <div
                    key={`${item.onmc_code}-${idx}`}
                    style={{
                      backgroundColor: rawTokens.surfaceCard,
                      border: `1px solid ${rawTokens.borderSubtle}`,
                      borderRadius: rawTokens.radiusLg,
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div>
                      {/* Header with Organization badge and distance */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: rawTokens.surfaceSubtle,
                              border: `1px solid ${rawTokens.borderStrong}`,
                              color: rawTokens.textPrimary,
                              fontWeight: 800,
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: rawTokens.radiusSm,
                            }}
                          >
                            {item.source_organization}
                          </span>
                          <span
                            style={{
                              fontSize: rawTokens.textXs,
                              color: rawTokens.textSecondary,
                              fontWeight: 600,
                            }}
                          >
                            {item.source_plant_name}
                          </span>
                        </div>

                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            backgroundColor:
                              item.distance_km <= 300
                                ? "rgba(95, 151, 142, 0.15)"
                                : "rgba(233, 67, 68, 0.1)",
                            color:
                              item.distance_km <= 300
                                ? "#0D533A"
                                : rawTokens.colorAction,
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: rawTokens.radiusFull,
                          }}
                        >
                          <Truck size={12} />
                          {item.distance_km} km (~{item.estimated_transit_hours}
                          h transit)
                        </span>
                      </div>

                      {/* ONMC Code */}
                      <div
                        style={{
                          fontFamily: rawTokens.fontMono,
                          fontSize: "11px",
                          color: rawTokens.colorAction,
                          fontWeight: 700,
                          marginBottom: "4px",
                        }}
                      >
                        {item.onmc_code}
                      </div>

                      {/* Canonical Description */}
                      <div
                        style={{
                          fontSize: rawTokens.textSm,
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                          lineHeight: 1.4,
                          marginBottom: "12px",
                        }}
                      >
                        {item.canonical_description}
                      </div>

                      {/* Specs pills */}
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                          marginBottom: "16px",
                        }}
                      >
                        {item.size_inch && (
                          <span
                            style={{
                              fontSize: "10px",
                              backgroundColor: rawTokens.surfaceSubtle,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              border: `1px solid ${rawTokens.borderSubtle}`,
                            }}
                          >
                            Size: {item.size_inch}"
                          </span>
                        )}
                        {item.pressure_class && (
                          <span
                            style={{
                              fontSize: "10px",
                              backgroundColor: rawTokens.surfaceSubtle,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              border: `1px solid ${rawTokens.borderSubtle}`,
                            }}
                          >
                            Rating: {item.pressure_class}#
                          </span>
                        )}
                        {item.metallurgy && (
                          <span
                            style={{
                              fontSize: "10px",
                              backgroundColor: rawTokens.surfaceSubtle,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              border: `1px solid ${rawTokens.borderSubtle}`,
                            }}
                          >
                            {item.metallurgy}
                          </span>
                        )}
                        {item.gem_category_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              backgroundColor: "rgba(95,151,142,0.1)",
                              color: "#0D533A",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontWeight: 600,
                            }}
                          >
                            {item.gem_category_id}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer with Price and Action */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: `1px solid ${rawTokens.borderSubtle}`,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: rawTokens.textMuted,
                          }}
                        >
                          Available Surplus Stock
                        </div>
                        <div
                          style={{
                            fontSize: rawTokens.textBase,
                            fontWeight: 800,
                            color: "#0D533A",
                          }}
                        >
                          {item.available_stock} Units @ ₹
                          {item.unit_price.toLocaleString("en-IN")}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveSurplusForMTIRF(item);
                          setActiveMTIRF(null);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor: rawTokens.colorAction,
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: rawTokens.radiusMd,
                          padding: "8px 14px",
                          fontSize: rawTokens.textXs,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        <FileCheck size={14} />
                        Initiate MTIRF Form
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: POOLED DEMAND & GEM TENDERS */}
      {/* ==================================================================== */}
      {subTab === "demand" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Macro KPI Scoreboard */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Active Pooled Tenders
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "4px",
                }}
              >
                {batchData?.total_batches || 3} Batches
              </div>
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textSecondary,
                  marginTop: "2px",
                }}
              >
                Aggregated across 10 CPSEs
              </div>
            </div>

            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Total Pooled Volume
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "4px",
                }}
              >
                {batchData?.total_national_quantity.toLocaleString() ||
                  "10,000"}{" "}
                Units
              </div>
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textSecondary,
                  marginTop: "2px",
                }}
              >
                Standardized ONMC Specifications
              </div>
            </div>

            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: `1px solid ${rawTokens.borderSubtle}`,
                borderRadius: rawTokens.radiusLg,
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Baseline Procurement Value
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "4px",
                }}
              >
                ₹
                {(
                  (batchData?.total_baseline_cost_inr || 113150000) / 10000000
                ).toFixed(2)}{" "}
                Cr
              </div>
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textSecondary,
                  marginTop: "2px",
                }}
              >
                Un-pooled Standalone Estimate
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(165, 215, 201, 0.25)",
                border: `1px solid ${rawTokens.colorApproved}`,
                borderRadius: rawTokens.radiusLg,
                padding: "18px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  color: "#0D533A",
                  textTransform: "uppercase",
                }}
              >
                Projected Public Savings
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: "#0D533A",
                  marginTop: "4px",
                }}
              >
                ₹
                {(
                  (batchData?.total_projected_savings_inr || 15369875) /
                  10000000
                ).toFixed(2)}{" "}
                Cr
              </div>
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: "#0D533A",
                  marginTop: "2px",
                  fontWeight: 600,
                }}
              >
                {((batchData?.average_discount_pct || 0.136) * 100).toFixed(1)}%
                Average Discount Secured
              </div>
            </div>
          </div>

          {/* Volume Tiers Explainer Banner */}
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              border: `1px solid ${rawTokens.borderSubtle}`,
              borderRadius: rawTokens.radiusLg,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Layers size={18} color={rawTokens.colorAction} />
              <span
                style={{
                  fontSize: rawTokens.textSm,
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                }}
              >
                MoPNG Volume Discount Curve (8% to 16% Tiers):
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                }}
              >
                500+ units: <strong>8.0%</strong>
              </span>
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                }}
              >
                1,000+ units: <strong>11.5%</strong>
              </span>
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: "rgba(233, 67, 68, 0.1)",
                  color: rawTokens.colorAction,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: 700,
                }}
              >
                2,500+ units: <strong>14.2%</strong>
              </span>
              <span
                style={{
                  fontSize: "11px",
                  backgroundColor: "rgba(165, 215, 201, 0.3)",
                  color: "#0D533A",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: 800,
                }}
              >
                5,000+ units: <strong>16.0% (Max Scale)</strong>
              </span>
            </div>
          </div>

          {/* Batches Table / Cards */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {batchData?.batches.map((batch) => (
              <div
                key={batch.batch_id}
                style={{
                  backgroundColor: rawTokens.surfaceCard,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusLg,
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ maxWidth: "65%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: rawTokens.fontMono,
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: rawTokens.surfaceSubtle,
                        padding: "3px 8px",
                        borderRadius: rawTokens.radiusSm,
                        border: `1px solid ${rawTokens.borderStrong}`,
                      }}
                    >
                      {batch.batch_id}
                    </span>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        backgroundColor: "rgba(165, 215, 201, 0.3)",
                        color: "#0D533A",
                        padding: "3px 8px",
                        borderRadius: rawTokens.radiusSm,
                      }}
                    >
                      {(batch.discount_tier_pct * 100).toFixed(1)}% Volume
                      Discount Achieved
                    </span>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: rawTokens.textSecondary,
                        backgroundColor: rawTokens.surfaceSubtle,
                        padding: "3px 8px",
                        borderRadius: rawTokens.radiusSm,
                      }}
                    >
                      Target: {batch.target_tender_month}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: rawTokens.textBase,
                      fontWeight: 800,
                      color: rawTokens.textPrimary,
                      marginBottom: "6px",
                    }}
                  >
                    {batch.canonical_description}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: rawTokens.textXs,
                      color: rawTokens.textSecondary,
                    }}
                  >
                    <span>
                      ONMC:{" "}
                      <strong style={{ fontFamily: rawTokens.fontMono }}>
                        {batch.onmc_code}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      GeM Category:{" "}
                      <strong style={{ color: "#0D533A" }}>
                        {batch.gem_category_id}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Participating CPSEs:{" "}
                      <strong>
                        {batch.participating_organizations.join(", ")}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Financial Summary & Action */}
                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: "11px", color: rawTokens.textMuted }}
                    >
                      Total Pooled Volume
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textLg,
                        fontWeight: 800,
                        color: rawTokens.textPrimary,
                      }}
                    >
                      {batch.total_aggregate_quantity.toLocaleString()} Units
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: rawTokens.textMuted,
                        textDecoration: "line-through",
                        marginRight: "8px",
                      }}
                    >
                      ₹{(batch.baseline_total_cost_inr / 10000000).toFixed(2)}{" "}
                      Cr
                    </span>
                    <span
                      style={{
                        fontSize: rawTokens.textBase,
                        fontWeight: 800,
                        color: "#0D533A",
                      }}
                    >
                      ₹{(batch.pooled_total_cost_inr / 10000000).toFixed(2)} Cr
                    </span>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#0D533A",
                        fontWeight: 700,
                      }}
                    >
                      Saves ₹
                      {(batch.projected_savings_inr / 10000000).toFixed(2)} Cr (
                      {(batch.discount_tier_pct * 100).toFixed(1)}%)
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewGeMTender(batch.batch_id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: rawTokens.surfaceSubtle,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      color: rawTokens.textPrimary,
                      borderRadius: rawTokens.radiusMd,
                      padding: "8px 14px",
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      cursor: "pointer",
                      marginTop: "4px",
                    }}
                  >
                    <FileSpreadsheet size={14} color={rawTokens.colorAction} />
                    View GeM Rule 149 Tender Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 1: MTIRF GENERATION & REQUISITION FORM */}
      {/* ==================================================================== */}
      {activeSurplusForMTIRF && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              borderRadius: rawTokens.radiusLg,
              maxWidth: "820px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: `1px solid ${rawTokens.borderStrong}`,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: rawTokens.colorAction,
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: rawTokens.radiusSm,
                    letterSpacing: "0.05em",
                  }}
                >
                  MoPNG OFFICIAL REQUISITION
                </span>
                <h2
                  style={{
                    fontSize: rawTokens.textXl,
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "6px",
                  }}
                >
                  Transfer Surplus Stock Now (MTIRF)
                </h2>
                <div
                  style={{
                    fontSize: rawTokens.textXs,
                    color: rawTokens.textSecondary,
                  }}
                >
                  Standard Operating Protocol for Inter-CPSE Critical Material
                  Sharing • GFR Rule 149 Exempt
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveSurplusForMTIRF(null);
                  setActiveMTIRF(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: rawTokens.textMuted,
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Requisition Card Content */}
            {!activeMTIRF ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Source & Destination Details */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    backgroundColor: rawTokens.surfaceSubtle,
                    padding: "16px",
                    borderRadius: rawTokens.radiusMd,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.textMuted,
                      }}
                    >
                      SOURCE CPSE (Lender)
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textBase,
                        fontWeight: 800,
                        color: rawTokens.textPrimary,
                        marginTop: "2px",
                      }}
                    >
                      {activeSurplusForMTIRF.source_organization_name}
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textXs,
                        color: rawTokens.textSecondary,
                      }}
                    >
                      {activeSurplusForMTIRF.source_plant_name} (
                      {activeSurplusForMTIRF.source_plant_location})
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.textMuted,
                      }}
                    >
                      RECEIVING CPSE (Borrower)
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textBase,
                        fontWeight: 800,
                        color: rawTokens.textPrimary,
                        marginTop: "2px",
                      }}
                    >
                      {plants.find((p) => p.plant_key === selectedPlant)
                        ?.organization_name || "Indian Oil Corporation Ltd"}
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textXs,
                        color: rawTokens.textSecondary,
                      }}
                    >
                      {plants.find((p) => p.plant_key === selectedPlant)
                        ?.plant_name || "Mathura Refinery"}
                    </div>
                  </div>
                </div>

                {/* Material Details */}
                <div
                  style={{
                    border: `1px solid ${rawTokens.borderSubtle}`,
                    borderRadius: rawTokens.radiusMd,
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: rawTokens.textMuted,
                      fontWeight: 700,
                    }}
                  >
                    CANONICAL MATERIAL SPECIFICATION
                  </div>
                  <div
                    style={{
                      fontFamily: rawTokens.fontMono,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: rawTokens.colorAction,
                      marginTop: "2px",
                    }}
                  >
                    {activeSurplusForMTIRF.onmc_code}
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textSm,
                      fontWeight: 700,
                      color: rawTokens.textPrimary,
                      marginTop: "4px",
                    }}
                  >
                    {activeSurplusForMTIRF.canonical_description}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px",
                      marginTop: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{ fontSize: "10px", color: rawTokens.textMuted }}
                      >
                        Haversine Distance
                      </div>
                      <div
                        style={{
                          fontSize: rawTokens.textSm,
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        {activeSurplusForMTIRF.distance_km} km
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ fontSize: "10px", color: rawTokens.textMuted }}
                      >
                        Estimated Road Transit
                      </div>
                      <div
                        style={{
                          fontSize: rawTokens.textSm,
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        ~{activeSurplusForMTIRF.estimated_transit_hours} Hours
                      </div>
                    </div>
                    <div>
                      <div
                        style={{ fontSize: "10px", color: rawTokens.textMuted }}
                      >
                        Book Valuation Price
                      </div>
                      <div
                        style={{
                          fontSize: rawTokens.textSm,
                          fontWeight: 700,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        ₹
                        {activeSurplusForMTIRF.unit_price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        / unit
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity & Justification Input */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: rawTokens.textXs,
                        fontWeight: 700,
                        color: rawTokens.textSecondary,
                        marginBottom: "6px",
                      }}
                    >
                      QUANTITY REQUIRED (Max:{" "}
                      {activeSurplusForMTIRF.available_stock})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={activeSurplusForMTIRF.available_stock}
                      value={transferQty}
                      onChange={(e) =>
                        setTransferQty(
                          Math.max(1, parseInt(e.target.value) || 1)
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: rawTokens.radiusMd,
                        border: `1px solid ${rawTokens.borderStrong}`,
                        fontFamily: rawTokens.fontSans,
                        fontSize: rawTokens.textBase,
                        fontWeight: 700,
                      }}
                    />
                    <div
                      style={{
                        fontSize: "11px",
                        color: rawTokens.textMuted,
                        marginTop: "4px",
                      }}
                    >
                      Total Transfer Value:{" "}
                      <strong>
                        ₹
                        {(
                          transferQty * activeSurplusForMTIRF.unit_price
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: rawTokens.textXs,
                        fontWeight: 700,
                        color: rawTokens.textSecondary,
                        marginBottom: "6px",
                      }}
                    >
                      EMERGENCY JUSTIFICATION CATEGORY
                    </label>
                    <select
                      value={emergencyCat}
                      onChange={(e) => setEmergencyCat(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: rawTokens.radiusMd,
                        border: `1px solid ${rawTokens.borderStrong}`,
                        fontFamily: rawTokens.fontSans,
                        fontSize: rawTokens.textSm,
                        fontWeight: 600,
                      }}
                    >
                      <option value="CRITICAL_MAINTENANCE">
                        CRITICAL_MAINTENANCE - Equipment bypass replacement
                      </option>
                      <option value="UNPLANNED_SHUTDOWN">
                        UNPLANNED_SHUTDOWN - Emergency plant outage recovery
                      </option>
                      <option value="STOCKOUT_PREVENTION">
                        STOCKOUT_PREVENTION - Pipeline safety valve stockout
                      </option>
                      <option value="ROUTINE_TRANSFER">
                        ROUTINE_TRANSFER - Scheduled turnaround replenishment
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: rawTokens.textXs,
                      fontWeight: 700,
                      color: rawTokens.textSecondary,
                      marginBottom: "6px",
                    }}
                  >
                    OPERATIONAL JUSTIFICATION DETAILS (CVC Audit Trail)
                  </label>
                  <textarea
                    rows={2}
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: rawTokens.radiusMd,
                      border: `1px solid ${rawTokens.borderStrong}`,
                      fontFamily: rawTokens.fontSans,
                      fontSize: rawTokens.textSm,
                    }}
                  />
                </div>

                {/* Submit Action */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    onClick={() => setActiveSurplusForMTIRF(null)}
                    style={{
                      backgroundColor: "transparent",
                      border: `1px solid ${rawTokens.borderStrong}`,
                      borderRadius: rawTokens.radiusMd,
                      padding: "10px 18px",
                      fontSize: rawTokens.textSm,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateMTIRF}
                    disabled={submittingMTIRF}
                    style={{
                      backgroundColor: rawTokens.colorAction,
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: rawTokens.radiusMd,
                      padding: "10px 20px",
                      fontSize: rawTokens.textSm,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <ShieldCheck size={16} />
                    {submittingMTIRF
                      ? "Generating Form..."
                      : "Sign & Dispatch MTIRF Requisition"}
                  </button>
                </div>
              </div>
            ) : (
              /* MTIRF Dispatched / Sealed Success View */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(165, 215, 201, 0.25)",
                    border: `1px solid ${rawTokens.colorApproved}`,
                    borderRadius: rawTokens.radiusMd,
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <CheckCircle2 size={24} color="#0D533A" />
                  <div>
                    <div
                      style={{
                        fontSize: rawTokens.textSm,
                        fontWeight: 800,
                        color: "#0D533A",
                      }}
                    >
                      Requisition {activeMTIRF.requisition_number} Successfully
                      Minted & Cryptographically Sealed
                    </div>
                    <div
                      style={{ fontSize: rawTokens.textXs, color: "#0D533A" }}
                    >
                      Dispatched electronically to Materials Division at{" "}
                      {activeMTIRF.source_details.plant_name}.
                    </div>
                  </div>
                </div>

                {/* Audit Digest & SAP references */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: rawTokens.surfaceSubtle,
                      padding: "14px",
                      borderRadius: rawTokens.radiusMd,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.textMuted,
                      }}
                    >
                      CVC CRYPTOGRAPHIC SEAL
                    </div>
                    <div
                      style={{
                        fontFamily: rawTokens.fontMono,
                        fontSize: "11px",
                        color: rawTokens.colorAction,
                        wordBreak: "break-all",
                        marginTop: "4px",
                      }}
                    >
                      {activeMTIRF.cvc_tamper_seal.sha256_digest}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: rawTokens.textMuted,
                        marginTop: "4px",
                      }}
                    >
                      Algorithm: FIPS 180-4 SHA-256 (Tamper-Evident)
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: rawTokens.surfaceSubtle,
                      padding: "14px",
                      borderRadius: rawTokens.radiusMd,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: rawTokens.textMuted,
                      }}
                    >
                      SAP ERP DISPATCH HANDSHAKE
                    </div>
                    <div
                      style={{
                        fontSize: rawTokens.textXs,
                        color: rawTokens.textPrimary,
                        marginTop: "4px",
                      }}
                    >
                      <div>
                        Outbound T-Code:{" "}
                        <strong>
                          {activeMTIRF.erp_handshake.sap_outbound_tcode}
                        </strong>
                      </div>
                      <div>
                        Inbound T-Code:{" "}
                        <strong>
                          {activeMTIRF.erp_handshake.sap_inbound_tcode}
                        </strong>
                      </div>
                      <div>
                        Movement:{" "}
                        <strong>
                          {activeMTIRF.erp_handshake.sap_movement_type}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Action */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "12px",
                    borderTop: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <div>
                    <span
                      style={{ fontSize: "11px", color: rawTokens.textMuted }}
                    >
                      Current Status:{" "}
                    </span>
                    <span
                      style={{
                        fontSize: rawTokens.textSm,
                        fontWeight: 800,
                        color:
                          activeMTIRF.status === "APPROVED_BY_SOURCE"
                            ? "#0D533A"
                            : rawTokens.colorAction,
                      }}
                    >
                      {activeMTIRF.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    {activeMTIRF.status !== "APPROVED_BY_SOURCE" && (
                      <button
                        onClick={() =>
                          handleApproveMTIRF(activeMTIRF.requisition_number)
                        }
                        style={{
                          backgroundColor: "#0D533A",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: rawTokens.radiusMd,
                          padding: "10px 18px",
                          fontSize: rawTokens.textSm,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Simulate Source CPSE Approval (e-Sign)
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setActiveSurplusForMTIRF(null);
                        setActiveMTIRF(null);
                      }}
                      style={{
                        backgroundColor: rawTokens.surfaceSubtle,
                        border: `1px solid ${rawTokens.borderStrong}`,
                        borderRadius: rawTokens.radiusMd,
                        padding: "10px 18px",
                        fontSize: rawTokens.textSm,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Close Form
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODAL 2: GEM TENDER SPECIFICATION DOSSIER */}
      {/* ==================================================================== */}
      {selectedTender && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: rawTokens.surfaceCard,
              borderRadius: rawTokens.radiusLg,
              maxWidth: "820px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: `1px solid ${rawTokens.borderStrong}`,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: "#0D533A",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: rawTokens.radiusSm,
                  }}
                >
                  GeM 4.0 UNIFIED TENDER SPECIFICATION
                </span>
                <h2
                  style={{
                    fontSize: rawTokens.textXl,
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "6px",
                  }}
                >
                  {selectedTender.tender_reference_number}
                </h2>
                <div
                  style={{
                    fontSize: rawTokens.textXs,
                    color: rawTokens.textSecondary,
                  }}
                >
                  Public Procurement via Government e-Marketplace (GeM) • GFR
                  2017 Rule 149 Compliance
                </div>
              </div>

              <button
                onClick={() => setSelectedTender(null)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: rawTokens.textMuted,
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* GFR Statutory Clause Alert */}
              <div
                style={{
                  backgroundColor: "rgba(95, 151, 142, 0.1)",
                  borderLeft: "4px solid #0D533A",
                  padding: "14px",
                  borderRadius: rawTokens.radiusSm,
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textPrimary,
                  lineHeight: 1.5,
                }}
              >
                <strong>Statutory Compliance Clause:</strong>{" "}
                {selectedTender.gfr_rule_149_threshold_clause}
              </div>

              {/* Tender Specs Summary */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "16px",
                  borderRadius: rawTokens.radiusMd,
                }}
              >
                <div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    GeM Category ID
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textSm,
                      fontWeight: 800,
                      color: "#0D533A",
                    }}
                  >
                    {selectedTender.gem_category_id}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    Total Tender Volume
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textSm,
                      fontWeight: 800,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {selectedTender.total_pooled_quantity.toLocaleString()}{" "}
                    Units
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                    Estimated Tender Value
                  </div>
                  <div
                    style={{
                      fontSize: rawTokens.textSm,
                      fontWeight: 800,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    ₹
                    {(
                      selectedTender.estimated_tender_value_inr / 10000000
                    ).toFixed(2)}{" "}
                    Cr
                  </div>
                </div>
              </div>

              {/* Per-CPSE Delivery Allocations */}
              <div>
                <div
                  style={{
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    marginBottom: "8px",
                  }}
                >
                  PER-CPSE DELIVERY SCHEDULE & TERMINAL ALLOCATION
                </div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: rawTokens.textXs,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        backgroundColor: rawTokens.surfaceSubtle,
                        borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                      }}
                    >
                      <th style={{ padding: "8px", textAlign: "left" }}>
                        CPSE
                      </th>
                      <th style={{ padding: "8px", textAlign: "left" }}>
                        Delivery Terminal / Plant
                      </th>
                      <th style={{ padding: "8px", textAlign: "right" }}>
                        Quota
                      </th>
                      <th style={{ padding: "8px", textAlign: "right" }}>
                        Line Value
                      </th>
                      <th style={{ padding: "8px", textAlign: "left" }}>
                        Target Window
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTender.participating_cpse_allocations.map(
                      (a, i) => (
                        <tr
                          key={i}
                          style={{
                            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
                          }}
                        >
                          <td style={{ padding: "8px", fontWeight: 700 }}>
                            {a.organization_code}
                          </td>
                          <td style={{ padding: "8px" }}>{a.plant_location}</td>
                          <td
                            style={{
                              padding: "8px",
                              textAlign: "right",
                              fontWeight: 700,
                            }}
                          >
                            {a.allocated_quantity.toLocaleString()}
                          </td>
                          <td style={{ padding: "8px", textAlign: "right" }}>
                            ₹{(a.estimated_line_value_inr / 100000).toFixed(2)}{" "}
                            L
                          </td>
                          <td style={{ padding: "8px" }}>
                            {a.target_delivery_window}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* CVC Anti-Cartelization Undertaking */}
              <div
                style={{
                  backgroundColor: rawTokens.surfaceSubtle,
                  padding: "14px",
                  borderRadius: rawTokens.radiusMd,
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                  }}
                >
                  CVC ANTI-CARTELIZATION CERTIFICATE
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: rawTokens.textSecondary,
                    marginTop: "4px",
                    lineHeight: 1.4,
                  }}
                >
                  {selectedTender.cvc_anti_cartelization_undertaking}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => {
                    onShowAuditMessage(
                      `GeM Tender Dossier [${selectedTender.tender_reference_number}] downloaded for GeM portal publish.`
                    );
                    setSelectedTender(null);
                  }}
                  style={{
                    backgroundColor: rawTokens.colorAction,
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: rawTokens.radiusMd,
                    padding: "10px 18px",
                    fontSize: rawTokens.textSm,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Download GeM Bidding Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

