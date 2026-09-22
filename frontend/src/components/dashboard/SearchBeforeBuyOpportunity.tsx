// ponytail: High-impact Search Before Buy duplicate purchase alert card enhanced with Watermelon UI copy-to-clipboard and MicroCharts DonutMicro.
// Upgrade path: add direct 1-click inter-CPSE Material Transfer Requisition Form (MTIRF) dispatch.

import React, { useState } from "react";
import { rawTokens } from "../../tokens.stylex";
import {
  PackageCheck,
  Truck,
  ArrowRight,
  ExternalLink,
  MapPin,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { DonutMicro } from "../MicroCharts";

export interface SearchBeforeBuyOpportunityProps {
  onViewSurplus: () => void;
  onViewMaterial: (onmcCode: string) => void;
}

export const SearchBeforeBuyOpportunity: React.FC<
  SearchBeforeBuyOpportunityProps
> = ({ onViewSurplus, onViewMaterial }) => {
  const onmcCode = "ONMC-MECH-VLV-BAL-002-150-A105-9B2F";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(onmcCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage:
          "radial-gradient(ellipse 70% 60% at 90% 20%, rgba(165, 215, 201, 0.22) 0%, transparent 75%)",
        border: "1px solid rgba(95, 151, 142, 0.4)",
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        boxShadow:
          "0 4px 18px rgba(95, 151, 142, 0.08), 0 0 0 1px rgba(165, 215, 201, 0.3)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Subtle indicator bar on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "4px",
          backgroundColor: rawTokens.colorVerified,
        }}
      />

      {/* Left section: Thumbnail + Details */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}
      >
        {/* Unsplash Industrial Equipment Thumbnail */}
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
            border: `1px solid ${rawTokens.borderSubtle}`,
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80"
            alt="2 inch 150# Ball Valve"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Content details */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: rawTokens.colorVerified,
                backgroundColor: "rgba(95, 151, 142, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <PackageCheck size={12} strokeWidth={2.4} />
              Search Before Buy
            </span>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: rawTokens.colorAction,
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <Sparkles size={13} />
              Potential duplicate purchase detected
            </span>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: rawTokens.textPrimary,
              marginTop: "4px",
            }}
          >
            2" Ball Valve • Class 150 • ASTM A105
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "4px",
              flexWrap: "wrap",
            }}
          >
            {/* Copyable ONMC Chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontFamily: rawTokens.fontMono,
                fontSize: "11px",
                color: rawTokens.colorAnchor,
                backgroundColor: "#F1F5F9",
                padding: "2px 7px",
                borderRadius: "4px",
                border: "1px solid #E2E8F0",
              }}
            >
              <span>{onmcCode}</span>
              <button
                onClick={handleCopy}
                title="Copy ONMC code"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: copied ? rawTokens.colorVerified : rawTokens.textMuted,
                }}
              >
                {copied ? (
                  <Check size={11} strokeWidth={2.4} />
                ) : (
                  <Copy size={11} />
                )}
              </button>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <DonutMicro
                value={100}
                size={18}
                strokeWidth={2.5}
                color={rawTokens.colorVerified}
              />
              <span
                style={{ fontSize: "11.5px", color: rawTokens.textSecondary }}
              >
                Opportunity:{" "}
                <strong style={{ color: "#0F5132" }}>14 units available</strong>
              </span>
            </div>

            <span
              style={{
                fontSize: "11px",
                color: rawTokens.textMuted,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MapPin size={11} />
              Source:{" "}
              <strong style={{ color: rawTokens.textPrimary }}>
                ONGC Hazira
              </strong>{" "}
              → Dest:{" "}
              <strong style={{ color: rawTokens.textPrimary }}>
                IOCL Gujarat Refinery
              </strong>{" "}
              (78 km)
            </span>
          </div>
        </div>
      </div>

      {/* Right section: Action CTAs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => onViewMaterial(onmcCode)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "8px 14px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${rawTokens.borderSubtle}`,
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            color: rawTokens.textPrimary,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          View Material
          <ExternalLink size={12} />
        </button>

        <button
          onClick={onViewSurplus}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            backgroundColor: rawTokens.colorVerified,
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#FFFFFF",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(95, 151, 142, 0.3)",
          }}
        >
          <Truck size={14} />
          View Surplus
          <ArrowRight size={13} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
};
