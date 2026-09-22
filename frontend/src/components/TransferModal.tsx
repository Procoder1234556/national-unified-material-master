// ponytail: Inter-CPSE Material Transfer Requisition Form (MTIRF) with 5-stage sovereign approval timeline.

import React, { useState } from "react";
import { rawTokens } from "../tokens.stylex";
import {
  X,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  Lock,
  Clock,
} from "lucide-react";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (docNumber: string) => void;
  initialData?: {
    sourceOrg?: string;
    sourcePlant?: string;
    destOrg?: string;
    destPlant?: string;
    onmcCode?: string;
    description?: string;
    availableStock?: number;
    unitPrice?: number;
    distanceKm?: number;
  };
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialData,
}) => {
  const data = initialData || {};
  const [sourceOrg, setSourceOrg] = useState(data.sourceOrg || "ONGC");
  const [sourcePlant, setSourcePlant] = useState(
    data.sourcePlant || "Hazira Gas Processing Plant"
  );
  const [destOrg, setDestOrg] = useState(data.destOrg || "IOCL");
  const [destPlant, setDestPlant] = useState(
    data.destPlant || "Gujarat Refinery, Vadodara"
  );
  const [transferQty, setTransferQty] = useState<number>(4);
  const [reason, setReason] = useState<string>(
    "Emergency replacement for Hydrocracker unit shutdown (Tag #V-102A)"
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [requisitionDoc, setRequisitionDoc] = useState<string | null>(null);

  if (!isOpen) return null;

  const onmcCode = data.onmcCode || "ONMC-MECH-VLV-BAL-002-150-A105-9B2F";
  const description =
    data.description || "VALVE BALL FLGD 2 INCH 150# CS ASTM A105 API 6D";
  const unitPrice = data.unitPrice || 28500;
  const distanceKm = data.distanceKm || 78;
  const totalValuation = transferQty * unitPrice;

  const handleDispatch = () => {
    setIsSubmitting(true);
    const docNum = `MTIRF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // Simulate multi-stage timeline progression
    setTimeout(() => {
      setCurrentStep(2); // Source Approval
    }, 600);
    setTimeout(() => {
      setCurrentStep(3); // e-Sign
    }, 1200);
    setTimeout(() => {
      setCurrentStep(4); // ERP Outbound
    }, 1800);
    setTimeout(() => {
      setCurrentStep(5); // Completed
      setIsSubmitting(false);
      setRequisitionDoc(docNum);
      if (onComplete) onComplete(docNum);
    }, 2400);
  };

  const steps = [
    { num: 1, label: "Requisition Draft" },
    { num: 2, label: "Source CPSE Approval" },
    { num: 3, label: "MeghRaj e-Sign" },
    { num: 4, label: "SAP Outbound (VL01N)" },
    { num: 5, label: "Receiving ERP (ME21N)" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(15, 23, 42, 0.5)",
        backdropFilter: "blur(3px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `1px solid ${rawTokens.borderStrong}`,
          borderRadius: rawTokens.radiusLg,
          width: "100%",
          maxWidth: "680px",
          boxShadow: rawTokens.shadowElevated,
          padding: "24px",
          animation: "fadeIn 0.15s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: rawTokens.radiusMd,
                backgroundColor: "rgba(233, 67, 68, 0.1)",
                color: rawTokens.colorAction,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  color: rawTokens.colorAction,
                  letterSpacing: "0.06em",
                }}
              >
                MoPNG INTER-CPSE MATERIAL REQUISITION
              </span>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: rawTokens.textPrimary,
                }}
              >
                Initiate Surplus Stock Transfer
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
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

        {/* 5-Stage Step Progress Timeline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: rawTokens.surfaceSubtle,
            borderRadius: rawTokens.radiusMd,
            marginBottom: "20px",
            border: `1px solid ${rawTokens.borderSubtle}`,
          }}
        >
          {steps.map((st, i) => {
            const isDone = st.num < currentStep;
            const isCurrent = st.num === currentStep;

            return (
              <React.Fragment key={st.num}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: isDone
                        ? "#0D533A"
                        : isCurrent
                          ? rawTokens.colorAction
                          : "#E2E8F0",
                      color:
                        isDone || isCurrent ? "#FFFFFF" : rawTokens.textMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {isDone ? <CheckCircle2 size={14} /> : st.num}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent
                        ? rawTokens.textPrimary
                        : rawTokens.textMuted,
                      textAlign: "center",
                      maxWidth: "80px",
                      lineHeight: 1.2,
                    }}
                  >
                    {st.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      backgroundColor: isDone ? "#0D533A" : "#E2E8F0",
                      margin: "0 6px",
                      marginBottom: "14px",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Content Form or Success State */}
        {requisitionDoc ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              backgroundColor: "rgba(165, 215, 201, 0.2)",
              borderRadius: rawTokens.radiusMd,
              border: "1px solid rgba(13, 83, 58, 0.2)",
            }}
          >
            <CheckCircle2
              size={42}
              color="#0D533A"
              style={{ margin: "0 auto 12px" }}
            />
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0D533A" }}>
              Inter-CPSE Transfer Requisition Dispatched!
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: rawTokens.textSecondary,
                marginTop: "6px",
              }}
            >
              Document ID:{" "}
              <strong style={{ fontFamily: rawTokens.fontMono }}>
                {requisitionDoc}
              </strong>
            </p>
            <p
              style={{
                fontSize: "12px",
                color: rawTokens.textMuted,
                marginTop: "4px",
              }}
            >
              Aadhaar e-Signed by Requester • Outbound delivery scheduled in
              ONGC SAP ECC
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "16px",
                backgroundColor: "#0D533A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: rawTokens.radiusFull,
                padding: "8px 24px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Material Card */}
            <div
              style={{
                padding: "12px 14px",
                backgroundColor: rawTokens.surfaceSubtle,
                borderRadius: rawTokens.radiusMd,
                border: `1px solid ${rawTokens.borderSubtle}`,
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: rawTokens.textMuted,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Transfer Item Specification
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: rawTokens.textPrimary,
                  marginTop: "2px",
                }}
              >
                {description}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontFamily: rawTokens.fontMono,
                  color: rawTokens.colorAction,
                  marginTop: "2px",
                }}
              >
                {onmcCode}
              </div>
            </div>

            {/* Source & Destination Matrix */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: "12px",
                alignItems: "center",
              }}
            >
              {/* Source */}
              <div
                style={{
                  padding: "12px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: rawTokens.colorAction,
                    textTransform: "uppercase",
                  }}
                >
                  Source CPSE Facility
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "2px",
                  }}
                >
                  {sourceOrg}
                </div>
                <div
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  {sourcePlant}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#0D533A",
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  Available Surplus: 14 units
                </div>
              </div>

              {/* Transit Distance Arrow */}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.textSecondary,
                  }}
                >
                  {distanceKm} km
                </div>
                <ArrowRight
                  size={20}
                  color={rawTokens.colorAction}
                  style={{ margin: "2px auto" }}
                />
                <div style={{ fontSize: "10px", color: rawTokens.textMuted }}>
                  ~4.5 hrs
                </div>
              </div>

              {/* Destination */}
              <div
                style={{
                  padding: "12px",
                  borderRadius: rawTokens.radiusMd,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#0D533A",
                    textTransform: "uppercase",
                  }}
                >
                  Receiving CPSE Facility
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: rawTokens.textPrimary,
                    marginTop: "2px",
                  }}
                >
                  {destOrg}
                </div>
                <div
                  style={{ fontSize: "11px", color: rawTokens.textSecondary }}
                >
                  {destPlant}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: rawTokens.colorAction,
                    fontWeight: 700,
                    marginTop: "4px",
                  }}
                >
                  Zero Warehouse Stock
                </div>
              </div>
            </div>

            {/* Quantity and Valuation Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    textTransform: "uppercase",
                  }}
                >
                  Requisition Quantity (Units)
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={transferQty}
                  onChange={(e) =>
                    setTransferQty(parseInt(e.target.value, 10) || 1)
                  }
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    padding: "8px 12px",
                    borderRadius: rawTokens.radiusSm,
                    border: `1px solid ${rawTokens.borderStrong}`,
                    fontSize: "13px",
                    fontFamily: rawTokens.fontMono,
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: rawTokens.textMuted,
                    textTransform: "uppercase",
                  }}
                >
                  Book Valuation (Inter-CPSE Rate)
                </label>
                <div
                  style={{
                    marginTop: "4px",
                    padding: "8px 12px",
                    borderRadius: rawTokens.radiusSm,
                    border: `1px solid ${rawTokens.borderSubtle}`,
                    backgroundColor: rawTokens.surfaceSubtle,
                    fontSize: "13px",
                    fontFamily: rawTokens.fontMono,
                    fontWeight: 700,
                    color: rawTokens.textPrimary,
                  }}
                >
                  ₹{totalValuation.toLocaleString("en-IN")}{" "}
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 400,
                      color: rawTokens.textMuted,
                    }}
                  >
                    (₹{unitPrice.toLocaleString("en-IN")}/u)
                  </span>
                </div>
              </div>
            </div>

            {/* Justification Textarea */}
            <div>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: rawTokens.textMuted,
                  textTransform: "uppercase",
                }}
              >
                Operational Justification / Work Order Reference
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "4px",
                  padding: "8px 12px",
                  borderRadius: rawTokens.radiusSm,
                  border: `1px solid ${rawTokens.borderSubtle}`,
                  fontSize: "12px",
                  fontFamily: rawTokens.fontSans,
                  resize: "none",
                }}
              />
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                paddingTop: "14px",
                borderTop: `1px solid ${rawTokens.borderSubtle}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: rawTokens.textMuted,
                }}
              >
                <Lock size={13} />
                <span>e-Sign digitally bound via NIC MeghRaj SSO</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    backgroundColor: "transparent",
                    border: `1px solid ${rawTokens.borderStrong}`,
                    borderRadius: rawTokens.radiusFull,
                    padding: "8px 18px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleDispatch}
                  style={{
                    backgroundColor: rawTokens.colorAction,
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: rawTokens.radiusFull,
                    padding: "8px 22px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isSubmitting ? (
                    <span>Dispatching MTIRF...</span>
                  ) : (
                    <>
                      <span>Dispatch Requisition</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
