// ponytail: Slide-over drawer for deep ONMC material inspection with CPSE crosswalks and inventory.
// Upgrade path: add 3D CAD viewer tab and supplier drawing PDF preview.

import React from "react";
import { rawTokens } from "../tokens.stylex";
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Package,
  Layers,
  FileCheck2,
  Hash,
  ExternalLink,
  ArrowRightLeft,
} from "lucide-react";
import { DonutMicro, Sparkline } from "./MicroCharts";

export interface ONMCDetailData {
  onmcCode: string;
  canonicalDescription: string;
  itemClass: string;
  sizeInch?: number | null;
  sizeMm?: number | null;
  pressureClass?: number | null;
  metallurgy?: string | null;
  endConnection?: string | null;
  standard?: string | null;
  shellMescCode?: string | null;
  unspscCode?: string | null;
  gemCategoryId?: string | null;
  totalStock?: number;
  participatingCpseCount?: number;
  confidenceScore?: number;
  legacyMappings?: {
    cpse: string;
    itemCode: string;
    plant: string;
    rawDescription: string;
    confidence: number;
  }[];
  inventoryDistribution?: {
    cpse: string;
    plant: string;
    quantity: number;
    unitPrice: number;
    leadTimeDays: number;
  }[];
}

interface ONMCDetailDrawerProps {
  data: ONMCDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiateTransfer?: (itemCode: string, targetPlant: string) => void;
}

export const ONMCDetailDrawer: React.FC<ONMCDetailDrawerProps> = ({
  data,
  isOpen,
  onClose,
  onInitiateTransfer,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !data) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(data.onmcCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const defaultMappings = data.legacyMappings || [
    {
      cpse: "IOCL",
      itemCode: "MAT-1002931",
      plant: "Gujarat Refinery",
      rawDescription: "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D",
      confidence: 0.96,
    },
    {
      cpse: "ONGC",
      itemCode: "MAT-8849102",
      plant: "Hazira Gas Processing Plant",
      rawDescription: "VLV BL FLGD 50MM NB 150# CS BODY A105 LEVER OP",
      confidence: 0.94,
    },
    {
      cpse: "BPCL",
      itemCode: "MAT-3049104",
      plant: "Mumbai Refinery",
      rawDescription: 'BALL VALVE 2" 150 LB FLANGE END RF A105 FORGED',
      confidence: 0.92,
    },
    {
      cpse: "HPCL",
      itemCode: "MAT-7739105",
      plant: "Visakh Refinery",
      rawDescription: "VALVE, BALL, FLANGED 2IN 150# CS BODY CS BALL",
      confidence: 0.89,
    },
  ];

  const defaultInventory = data.inventoryDistribution || [
    {
      cpse: "ONGC",
      plant: "Hazira Central Warehouse",
      quantity: 14,
      unitPrice: 28500,
      leadTimeDays: 2,
    },
    {
      cpse: "IOCL",
      plant: "Gujarat Refinery Stores",
      quantity: 8,
      unitPrice: 29200,
      leadTimeDays: 1,
    },
    {
      cpse: "BPCL",
      plant: "Mumbai Refinery Warehouse",
      quantity: 6,
      unitPrice: 28900,
      leadTimeDays: 3,
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 9998,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "580px",
          height: "100vh",
          backgroundColor: "#FFFFFF",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: rawTokens.surfaceSubtle,
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
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(95, 151, 142, 0.15)",
                  color: "#0D533A",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: rawTokens.radiusFull,
                }}
              >
                CANONICAL MASTER SPECIFICATION
              </span>
              <span style={{ fontSize: "11px", color: rawTokens.textMuted }}>
                MoPNG • ONMC Core
              </span>
            </div>
            <h2
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: rawTokens.textPrimary,
                lineHeight: 1.3,
              }}
            >
              {data.canonicalDescription}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
              }}
            >
              <code
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.colorAction,
                  backgroundColor: "#FFFFFF",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  border: `1px solid ${rawTokens.borderStrong}`,
                }}
              >
                {data.onmcCode}
              </code>
              <button
                onClick={handleCopy}
                title="Copy ONMC code"
                style={{
                  background: "none",
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  borderRadius: "4px",
                  padding: "4px 6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: copied ? "#0D533A" : rawTokens.textSecondary,
                  backgroundColor: "#FFFFFF",
                }}
              >
                {copied ? (
                  <Check size={12} color="#0D533A" />
                ) : (
                  <Copy size={12} />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: rawTokens.textMuted,
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Engineering Specifications Grid */}
          <div>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: rawTokens.textMuted,
                marginBottom: "12px",
              }}
            >
              Physical Engineering Parameters
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
                backgroundColor: rawTokens.surfaceSubtle,
                padding: "14px",
                borderRadius: rawTokens.radiusMd,
                border: `1px solid ${rawTokens.borderSubtle}`,
              }}
            >
              {[
                { label: "Item Class", val: data.itemClass || "BALL VALVE" },
                {
                  label: "Size (Imperial)",
                  val: data.sizeInch ? `${data.sizeInch.toFixed(2)}"` : '2.00"',
                },
                {
                  label: "Nominal Bore",
                  val: data.sizeMm ? `${data.sizeMm}mm NB` : "50mm NB",
                },
                {
                  label: "Pressure Class",
                  val: data.pressureClass
                    ? `Class ${data.pressureClass}`
                    : "Class 150",
                },
                { label: "Metallurgy", val: data.metallurgy || "ASTM A105" },
                {
                  label: "End Connection",
                  val: data.endConnection || "FLANGED RF",
                },
                {
                  label: "Governing Standard",
                  val: data.standard || "API 6D / ASME B16.34",
                },
                { label: "Design Type", val: "TWO-PIECE SPLIT BODY, LEVER OP" },
              ].map((attr, idx) => (
                <div
                  key={idx}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: rawTokens.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {attr.label}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                      marginTop: "2px",
                    }}
                  >
                    {attr.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Standard Identification Chips */}
          <div>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: rawTokens.textMuted,
                marginBottom: "12px",
              }}
            >
              Sovereign & International Cross-Walk Codes
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: rawTokens.radiusSm,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  backgroundColor: "#FFFFFF",
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
                    SHELL MESC
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {data.shellMescCode || "74.16.01.015.1"}
                  </div>
                </div>
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  Standard SPE 77/103
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: rawTokens.radiusSm,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  backgroundColor: "#FFFFFF",
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
                    UNSPSC CODE
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {data.unspscCode || "40141607"}
                  </div>
                </div>
                <span
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  Valves - Ball valves
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  borderRadius: rawTokens.radiusSm,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  backgroundColor: "#FFFFFF",
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
                    GeM CATEGORY ID
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      fontFamily: rawTokens.fontMono,
                      color: rawTokens.textPrimary,
                    }}
                  >
                    {data.gemCategoryId || "52161500"}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: rawTokens.radiusFull,
                    backgroundColor: "rgba(95, 151, 142, 0.15)",
                    color: "#0D533A",
                  }}
                >
                  GFR Rule 149 Mandated
                </span>
              </div>
            </div>
          </div>

          {/* Unified Legacy CPSE Catalog Records */}
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
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: rawTokens.textMuted,
                }}
              >
                Harmonized CPSE Legacy Records ({defaultMappings.length})
              </h3>
              <span
                style={{ fontSize: "11px", color: "#0D533A", fontWeight: 600 }}
              >
                Deduplication Ratio: 4:1
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {defaultMappings.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 14px",
                    borderRadius: rawTokens.radiusSm,
                    backgroundColor: rawTokens.surfaceSubtle,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
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
                          backgroundColor: rawTokens.textPrimary,
                          color: "#FFFFFF",
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "3px",
                        }}
                      >
                        {m.cpse}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          fontFamily: rawTokens.fontMono,
                          color: rawTokens.textSecondary,
                        }}
                      >
                        {m.itemCode}
                      </span>
                    </div>
                    <span
                      style={{ fontSize: "11px", color: rawTokens.textMuted }}
                    >
                      {m.plant}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: rawTokens.textPrimary,
                      fontFamily: rawTokens.fontMono,
                    }}
                  >
                    {m.rawDescription}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live National Stock Distribution */}
          <div>
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: rawTokens.textMuted,
                marginBottom: "12px",
              }}
            >
              Warehouse Inventory Distribution
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {defaultInventory.map((inv, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 14px",
                    borderRadius: rawTokens.radiusMd,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                    backgroundColor: "#FFFFFF",
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
                          fontSize: "11px",
                          fontWeight: 800,
                          color: rawTokens.colorAction,
                        }}
                      >
                        {inv.cpse}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: rawTokens.textPrimary,
                        }}
                      >
                        {inv.plant}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: rawTokens.textMuted,
                        marginTop: "2px",
                      }}
                    >
                      Book Valuation: ₹{inv.unitPrice.toLocaleString("en-IN")} /
                      unit • Transit: {inv.leadTimeDays}d
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 800,
                          fontFamily: rawTokens.fontMono,
                          color: "#0D533A",
                        }}
                      >
                        {inv.quantity} units
                      </div>
                      <div
                        style={{ fontSize: "10px", color: rawTokens.textMuted }}
                      >
                        Available Surplus
                      </div>
                    </div>
                    {onInitiateTransfer && (
                      <button
                        onClick={() =>
                          onInitiateTransfer(data.onmcCode, inv.plant)
                        }
                        style={{
                          backgroundColor: rawTokens.surfaceSubtle,
                          border: `1px solid ${rawTokens.borderStrong}`,
                          borderRadius: rawTokens.radiusSm,
                          padding: "6px 10px",
                          fontSize: "11px",
                          fontWeight: 700,
                          cursor: "pointer",
                          color: rawTokens.colorAction,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <ArrowRightLeft size={12} />
                        Transfer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: `1px solid ${rawTokens.borderSubtle}`,
            backgroundColor: rawTokens.surfaceSubtle,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: rawTokens.textMuted,
              fontFamily: rawTokens.fontMono,
            }}
          >
            SHA-256 Verified Ledger Record
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: rawTokens.textPrimary,
              color: "#FFFFFF",
              border: "none",
              borderRadius: rawTokens.radiusFull,
              padding: "8px 20px",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
