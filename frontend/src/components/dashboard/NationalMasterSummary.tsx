// ponytail: National Master summary banner reinforcing central sovereign purpose and standard crosswalks.
// Upgrade path: add clickable crosswalk map opening ontology mapping explorer.

import React from "react";
import { rawTokens } from "../../tokens.stylex";
import { ArrowRight } from "lucide-react";

export const NationalMasterSummary: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: `1px solid ${rawTokens.borderSubtle}`,
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      {/* Left Title & Three Stats */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: rawTokens.textMuted,
            }}
          >
            National Material Master
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: rawTokens.textPrimary,
              marginTop: "2px",
            }}
          >
            Sovereign CPSE Harmonization Core
          </div>
        </div>

        <div
          style={{
            height: "28px",
            width: "1px",
            backgroundColor: rawTokens.borderSubtle,
          }}
        />

        {/* 4.2M+ Catalog Records */}
        <div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            4.2M+
          </div>
          <div
            style={{
              fontSize: "10.5px",
              color: rawTokens.textMuted,
              marginTop: "3px",
            }}
          >
            Catalog Records
          </div>
        </div>

        {/* 10 Participating CPSEs */}
        <div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: rawTokens.textPrimary,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            10
          </div>
          <div
            style={{
              fontSize: "10.5px",
              color: rawTokens.textMuted,
              marginTop: "3px",
            }}
          >
            Participating CPSEs
          </div>
        </div>

        {/* ONMC National Coding Standard */}
        <div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: rawTokens.colorAction,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            ONMC
          </div>
          <div
            style={{
              fontSize: "10.5px",
              color: rawTokens.textMuted,
              marginTop: "3px",
            }}
          >
            National Coding Standard
          </div>
        </div>
      </div>

      {/* Right Crosswalk Pipeline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#F8FAFC",
          border: `1px solid ${rawTokens.borderSubtle}`,
          borderRadius: "8px",
          padding: "6px 12px",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 700,
            color: rawTokens.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Crosswalk:
        </span>

        {/* Step 1: ONMC */}
        <span
          style={{
            fontFamily: rawTokens.fontMono,
            fontSize: "11px",
            fontWeight: 700,
            color: rawTokens.colorAction,
          }}
        >
          ONMC
        </span>
        <ArrowRight size={11} color={rawTokens.textMuted} />

        {/* Step 2: Shell MESC */}
        <span
          style={{
            fontFamily: rawTokens.fontMono,
            fontSize: "11px",
            fontWeight: 600,
            color: rawTokens.textSecondary,
          }}
        >
          Shell MESC
        </span>
        <ArrowRight size={11} color={rawTokens.textMuted} />

        {/* Step 3: UNSPSC */}
        <span
          style={{
            fontFamily: rawTokens.fontMono,
            fontSize: "11px",
            fontWeight: 600,
            color: rawTokens.textSecondary,
          }}
        >
          UNSPSC
        </span>
        <ArrowRight size={11} color={rawTokens.textMuted} />

        {/* Step 4: GeM */}
        <span
          style={{
            fontFamily: rawTokens.fontMono,
            fontSize: "11px",
            fontWeight: 700,
            color: rawTokens.colorVerified,
          }}
        >
          GeM
        </span>
      </div>
    </div>
  );
};
