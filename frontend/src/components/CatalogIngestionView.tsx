// ponytail: Catalog ingestion view with multi-stage pipeline stepper and KPI analytics.
// Upgrade path: add WebSockets / Server-Sent Events (SSE) live row-by-row stream.

import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Database,
  Plus,
  AlertCircle,
} from "lucide-react";
import { apiFetch } from "../api";

interface IngestionSummary {
  job_id: string;
  organization_code: string;
  total_rows: number;
  auto_approved_count: number;
  auto_approved_pct: number;
  review_required_count: number;
  review_required_pct: number;
  novel_count: number;
  novel_pct: number;
  estimated_duplicate_savings_inr: number;
  completed_at: string;
}

const SAMPLE_CPSE_BATCH = [
  {
    source_item_code: "MAT-1002931",
    plant_code: "1001",
    plant_location: "IOCL Gujarat Refinery, Vadodara",
    raw_description: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
    unit_price: 28500,
    stock_quantity: 12,
  },
  {
    source_item_code: "MAT-8849102",
    plant_code: "1100",
    plant_location: "ONGC Hazira Gas Processing Plant",
    raw_description:
      "BALL VALVE 2IN 300LB FLGD WCB BODY (POTENTIAL PRESSURE DISCREPANCY)",
    unit_price: 32000,
    stock_quantity: 6,
  },
  {
    source_item_code: "MAT-3049104",
    plant_code: "2001",
    plant_location: "BPCL Mumbai Refinery, Mahul",
    raw_description: 'FLG WN 6" 300LBS RF CS ASTM A-105 SCH40 ASME B16.5',
    unit_price: 14500,
    stock_quantity: 24,
  },
  {
    source_item_code: "MAT-7739105",
    plant_code: "3001",
    plant_location: "HPCL Visakh Refinery",
    raw_description: "GASKET SPW 3 IN 150# SS316L/GRAPHITE ASME B16.20",
    unit_price: 1200,
    stock_quantity: 150,
  },
  {
    source_item_code: "MAT-9920194",
    plant_code: "4001",
    plant_location: "GAIL Vijaipur Petrochemical Complex",
    raw_description: "GATE VALVE 4INCH 150LB FLANGED RF CS BODY WCB API 600",
    unit_price: 42000,
    stock_quantity: 8,
  },
  {
    source_item_code: "MAT-5501923",
    plant_code: "5001",
    plant_location: "OIL Duliajan Field HQ, Assam",
    raw_description: "PROPRIETARY OILWELL DOWNHOLE TELEMETRY SENSOR S-992",
    unit_price: 185000,
    stock_quantity: 2,
  },
];

export const CatalogIngestionView: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState<string>("IOCL");
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [summary, setSummary] = useState<IngestionSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [manualItem, setManualItem] = useState({
    source_item_code: "",
    plant_code: "1001",
    plant_location: "",
    raw_description: "",
    unit_price: "",
    stock_quantity: "1",
  });

  const getApiError = async (res: Response, fallback: string) => {
    try {
      const data = await res.json();
      return data.detail || data.message || fallback;
    } catch {
      return fallback;
    }
  };

  const triggerIngestion = async (
    items = SAMPLE_CPSE_BATCH
  ): Promise<boolean> => {
    setLoading(true);
    setSummary(null);
    setError(null);
    setActiveStage(1);

    // Simulate multi-stage pipeline transition for visual feedback
    const stageTimer1 = setTimeout(() => setActiveStage(2), 300);
    const stageTimer2 = setTimeout(() => setActiveStage(3), 600);
    const stageTimer3 = setTimeout(() => setActiveStage(4), 900);
    const stageTimer4 = setTimeout(() => setActiveStage(5), 1200);

    try {
      const res = await apiFetch("/api/v1/ingest/batch", {
        method: "POST",
        body: JSON.stringify({
          organization_code: selectedOrg,
          items: items,
        }),
      });

      if (!res.ok)
        throw new Error(await getApiError(res, "Catalog import failed."));
      const data = await res.json();
      setSummary(data);
      setActiveStage(5);
      return true;
    } catch (e) {
      console.error("Ingestion failed", e);
      setError(
        e instanceof Error
          ? e.message
          : "Catalog import failed. Please try again."
      );
      setActiveStage(0);
      return false;
    } finally {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearTimeout(stageTimer4);
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setSummary(null);
    setError(null);
    setActiveStage(1);

    const formData = new FormData();
    formData.append("file", file);

    apiFetch(`/api/v1/ingest/upload?organization_code=${selectedOrg}`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(await getApiError(res, "File import failed."));
        }
        return res.json();
      })
      .then((data) => {
        setSummary(data);
        setActiveStage(5);
        setLoading(false);
      })
      .catch((err) => {
        console.error("File upload failed", err);
        setError(
          err instanceof Error
            ? err.message
            : "File import failed. Please try again."
        );
        setActiveStage(0);
        setLoading(false);
      });
    e.target.value = "";
  };

  const handleManualSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (
      !manualItem.raw_description.trim() ||
      !manualItem.plant_location.trim()
    ) {
      setError(
        "Add a material description and plant location before importing."
      );
      return;
    }
    const imported = await triggerIngestion([
      {
        source_item_code:
          manualItem.source_item_code.trim() || `MANUAL-${Date.now()}`,
        plant_code: manualItem.plant_code.trim() || "1001",
        plant_location: manualItem.plant_location.trim(),
        raw_description: manualItem.raw_description.trim(),
        unit_price: Number(manualItem.unit_price) || 0,
        stock_quantity: Number(manualItem.stock_quantity) || 1,
      },
    ]);
    if (imported) {
      setIsManualEntryOpen(false);
      setManualItem({
        source_item_code: "",
        plant_code: "1001",
        plant_location: "",
        raw_description: "",
        unit_price: "",
        stock_quantity: "1",
      });
    }
  };

  const pipelineStages = [
    {
      num: 1,
      label: "Schema & Header Parse",
      desc: "Validating legacy ERP column types & encoding",
    },
    {
      num: 2,
      label: "Token Cleansing",
      desc: "250+ Oil & Gas technical abbreviation expansion",
    },
    {
      num: 3,
      label: "Attribute Extraction",
      desc: "Parametric ASME size, pressure & metallurgy parsing",
    },
    {
      num: 4,
      label: "BGE Embeddings",
      desc: "1024-dim BAAI/bge-large dense vector generation",
    },
    {
      num: 5,
      label: "HNSW Search + Safety Gate",
      desc: "Cosine vector search & ASME B16.5 physical safety gate",
    },
    {
      num: 6,
      label: "ONMC Mapping",
      desc: "Cluster merging & sovereign code attribution",
    },
  ];

  const manualFields: Array<{
    field: keyof typeof manualItem;
    label: string;
    type: "text" | "number";
    required: boolean;
  }> = [
    {
      field: "source_item_code",
      label: "Source item code",
      type: "text",
      required: false,
    },
    { field: "plant_code", label: "Plant code", type: "text", required: false },
    {
      field: "plant_location",
      label: "Plant location",
      type: "text",
      required: true,
    },
    {
      field: "raw_description",
      label: "Material description",
      type: "text",
      required: true,
    },
    {
      field: "unit_price",
      label: "Unit price (INR)",
      type: "number",
      required: false,
    },
    {
      field: "stock_quantity",
      label: "Stock quantity",
      type: "number",
      required: false,
    },
  ];

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
              backgroundColor: "rgba(233, 67, 68, 0.1)",
              color: rawTokens.colorAction,
              width: "40px",
              height: "40px",
              borderRadius: rawTokens.radiusMd,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadCloud size={22} />
          </div>
          <div>
            <h2
              style={{
                fontSize: rawTokens.textLg,
                fontWeight: 700,
                color: rawTokens.textPrimary,
              }}
            >
              Import & Harmonize Catalogs Instantly
            </h2>
            <div
              style={{ fontSize: rawTokens.textXs, color: rawTokens.textMuted }}
            >
              Import CSV or JSON CPSE catalog exports, including SAP MAKTX
              extracts.
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: rawTokens.textXs,
                fontWeight: 700,
                color: rawTokens.textSecondary,
              }}
            >
              Originating CPSE:
            </span>
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: rawTokens.radiusSm,
                border: `1px solid ${rawTokens.borderStrong}`,
                fontSize: rawTokens.textXs,
                fontWeight: 700,
                backgroundColor: rawTokens.surfaceCard,
              }}
            >
              {[
                "IOCL",
                "ONGC",
                "BPCL",
                "HPCL",
                "GAIL",
                "OIL",
                "EIL",
                "NRL",
                "MRPL",
                "CPCL",
              ].map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => triggerIngestion()}
            disabled={loading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: rawTokens.colorAction,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusMd,
              padding: "8px 18px",
              fontSize: rawTokens.textXs,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Database size={14} />
            {loading
              ? "Processing Pipeline..."
              : "Run Pipeline on Sample CPSE Batch"}
          </button>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setIsManualEntryOpen((open) => !open);
            }}
            disabled={loading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: rawTokens.surfaceCard,
              color: rawTokens.textPrimary,
              border: `1px solid ${rawTokens.borderStrong}`,
              borderRadius: rawTokens.radiusMd,
              padding: "8px 18px",
              fontSize: rawTokens.textXs,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            <Plus size={14} color={rawTokens.colorAction} />
            Add catalog item
          </button>

          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: rawTokens.surfaceSubtle,
              color: rawTokens.textPrimary,
              border: `1px solid ${rawTokens.borderStrong}`,
              borderRadius: rawTokens.radiusMd,
              padding: "8px 18px",
              fontSize: rawTokens.textXs,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <FileSpreadsheet size={14} color={rawTokens.colorAction} />
            Upload CSV or JSON catalog
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {error && (
          <div
            role="alert"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "14px",
              padding: "10px 12px",
              backgroundColor: "rgba(233, 67, 68, 0.08)",
              border: "1px solid rgba(233, 67, 68, 0.3)",
              borderRadius: rawTokens.radiusMd,
              color: "#9B121E",
              fontSize: rawTokens.textXs,
              fontWeight: 600,
            }}
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {isManualEntryOpen && (
          <form
            onSubmit={handleManualSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "10px",
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${rawTokens.borderSubtle}`,
            }}
          >
            {manualFields.map(({ field, label, type, required }) => (
              <label
                key={field}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textSecondary,
                }}
              >
                {label}
                {required ? " *" : ""}
                <input
                  required={Boolean(required)}
                  type={type}
                  min={type === "number" ? 0 : undefined}
                  value={manualItem[field as keyof typeof manualItem]}
                  onChange={(e) =>
                    setManualItem((item) => ({
                      ...item,
                      [field]: e.target.value,
                    }))
                  }
                  style={{
                    padding: "8px 10px",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusSm,
                    color: rawTokens.textPrimary,
                    fontSize: rawTokens.textXs,
                  }}
                />
              </label>
            ))}
            <div style={{ display: "flex", alignItems: "end", gap: "8px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: rawTokens.colorAction,
                  color: "#fff",
                  border: 0,
                  borderRadius: rawTokens.radiusMd,
                  padding: "9px 14px",
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                Import item
              </button>
              <button
                type="button"
                onClick={() => setIsManualEntryOpen(false)}
                style={{
                  backgroundColor: "transparent",
                  color: rawTokens.textSecondary,
                  border: `1px solid ${rawTokens.borderStrong}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "8px 12px",
                  fontSize: rawTokens.textXs,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Pipeline 5-Stage Stepper */}
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
            fontSize: rawTokens.textXs,
            fontWeight: 700,
            color: rawTokens.textSecondary,
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Automated Standardization & Harmonization Pipeline Stages
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "12px",
          }}
        >
          {pipelineStages.map((st) => {
            const isDone = activeStage >= st.num;
            const isCurrent = activeStage === st.num && loading;
            return (
              <div
                key={st.num}
                style={{
                  backgroundColor: isDone
                    ? "rgba(165, 215, 201, 0.15)"
                    : rawTokens.surfaceSubtle,
                  border: `1px solid ${isCurrent ? rawTokens.colorAction : isDone ? "rgba(165, 215, 201, 0.5)" : rawTokens.borderSubtle}`,
                  borderRadius: rawTokens.radiusMd,
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: rawTokens.radiusFull,
                      backgroundColor: isDone
                        ? "#0D533A"
                        : rawTokens.borderStrong,
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {st.num}
                  </span>
                  {isDone && <CheckCircle2 size={16} color="#0D533A" />}
                </div>

                <div
                  style={{
                    fontSize: rawTokens.textXs,
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                  }}
                >
                  {st.label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: rawTokens.textMuted,
                    lineHeight: "1.3",
                  }}
                >
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-Ingestion KPI Summary Cards */}
      {summary && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: rawTokens.textBase,
              fontWeight: 700,
              color: rawTokens.textPrimary,
            }}
          >
            Catalog Rationalization KPI Summary (Job #
            {summary.job_id.substring(0, 8)})
          </div>

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
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Total Catalog Items
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                  marginTop: "6px",
                }}
              >
                {summary.total_rows}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                Originating: <strong>{summary.organization_code}</strong>
              </div>
            </div>

            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: "1px solid rgba(165, 215, 201, 0.6)",
                borderRadius: rawTokens.radiusLg,
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: "#0D533A",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Auto-Approved Matches
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: "#0D533A",
                  marginTop: "6px",
                }}
              >
                {summary.auto_approved_pct}%
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                {summary.auto_approved_count} lines merged to master
              </div>
            </div>

            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: "1px solid rgba(241, 204, 157, 0.8)",
                borderRadius: rawTokens.radiusLg,
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: "#8A4B08",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Review Required (HITL)
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: "#8A4B08",
                  marginTop: "6px",
                }}
              >
                {summary.review_required_pct}%
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                {summary.review_required_count} candidate pairs queued
              </div>
            </div>

            <div
              style={{
                backgroundColor: rawTokens.surfaceCard,
                border: "1px solid rgba(95, 151, 142, 0.6)",
                borderRadius: rawTokens.radiusLg,
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: rawTokens.textXs,
                  color: rawTokens.colorVerified,
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Projected Savings
              </div>
              <div
                style={{
                  fontSize: rawTokens.text2Xl,
                  fontWeight: 800,
                  color: rawTokens.colorVerified,
                  marginTop: "6px",
                }}
              >
                ₹{(summary.estimated_duplicate_savings_inr / 100000).toFixed(2)}{" "}
                L
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textSecondary,
                  marginTop: "4px",
                }}
              >
                From duplicate elimination
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
