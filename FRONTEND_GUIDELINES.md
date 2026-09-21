# Frontend Design System & UI Guidelines (FRONTEND_GUIDELINES.md)

## National Unified Material Master (NUMM) Framework

**Design Engine**: Astryx Design System (`@astryxdesign/core`) + StyleX (`@stylexjs/stylex`)  
**Aesthetic Anchor**: Humanto Sovereign Industrial Palette  
**Version**: 2.2.0

---

## 1. Design System Principles

1. **Enterprise Industrial Clarity**: Prioritize engineering attribute scannability and unambiguous dimensional representation over decorative fluff.
2. **Deterministic Zero-Runtime Style Resolution**: Strictly implemented with Meta's **StyleX** (`@stylexjs/stylex`) and **Astryx Design System** (`@astryxdesign/core`, `@astryxdesign/theme-neutral`). Zero runtime CSS-in-JS injection ensures rock-solid 60 FPS performance.
3. **Keyboard-First Ergonomics**: Data stewards processing thousands of candidate items daily can navigate, inspect, approve, reject, or edit entirely via single-key shortcuts without touching the mouse.
4. **Transparent Explainability**: Visual attribute diffing highlights matches in mint green, acceptable tolerances in warm peach, and fatal safety mismatches in crimson wine.
5. **Accessibility & Contrast**: Strict compliance with WCAG 2.1 Level AA (minimum 4.5:1 text contrast, prominent focus rings, ARIA roles for screen readers).

---

## 2. StyleX Design Tokens (`tokens.stylex.ts`)

```typescript
import * as stylex from "@stylexjs/stylex";

export const tokens = stylex.defineVars({
  // Humanto Sovereign Industrial Color Sequence
  colorAction: "#E94344", // Terracotta Red: Primary interactive triggers, prominent action buttons
  colorConflict: "#9B121E", // Crimson Wine: Fatal safety mismatches (pressure/size discrepancy)
  colorHighlight: "#F1CC9D", // Sandstone Peach: Borderline review indicator (70% - 91% match)
  colorVerified: "#5F978E", // Petroleum Sage: Validated engineering standards & verified ONMC codes
  colorAnchor: "#593C32", // Deep Umber: Grounded borders, technical metadata labels
  colorApproved: "#A5D7C9", // Soft Mint: High-confidence automated match (>= 92%)

  // Surface & Canvas Colors
  canvasBackground: "#F5F5F5", // Humanto warm sandstone neutral canvas
  surfaceCard: "#FFFFFF", // Crisp elevated white card surfaces
  surfaceSubtle: "#F8FAFC", // Secondary card backgrounds & table header strips
  borderSubtle: "#E2E8F0", // Delicate 1px separator lines
  borderStrong: "#CBD5E1", // Focused input container borders

  // Text Colors
  textPrimary: "#0F172A", // Slate Charcoal: Primary technical descriptions & values
  textSecondary: "#475569", // Slate Gray: Secondary specifications & plant metadata
  textMuted: "#94A3B8", // Muted Gray: Micro-labels, timestamps, column tags

  // Typography
  fontSans:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",

  // Font Sizes
  textXs: "0.75rem", // 12px
  textSm: "0.875rem", // 14px
  textBase: "1.0rem", // 16px
  textLg: "1.125rem", // 18px
  textXl: "1.25rem", // 20px
  text2Xl: "1.5rem", // 24px

  // Spacing
  space1: "0.25rem", // 4px
  space2: "0.5rem", // 8px
  space3: "0.75rem", // 12px
  space4: "1.0rem", // 16px
  space6: "1.5rem", // 24px
  space8: "2.0rem", // 32px

  // Radii
  radiusSm: "4px",
  radiusMd: "8px",
  radiusLg: "12px",
  radiusFull: "9999px",
});
```

---

## 3. Core Component Specifications

### 3.1. `MaterialDiffCard.tsx`

Side-by-side engineering comparison component displaying the raw CPSE catalog line against the candidate canonical ONMC specification:

```tsx
import React from "react";
import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";

interface AttributeRowProps {
  label: string;
  rawValue: string | number | null;
  canonicalValue: string | number | null;
  isMatch: boolean;
  isConflict: boolean;
}

const styles = stylex.create({
  card: {
    backgroundColor: tokens.surfaceCard,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: tokens.borderSubtle,
    borderRadius: tokens.radiusLg,
    padding: tokens.space4,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.space4,
    paddingBottom: tokens.space2,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: tokens.borderSubtle,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "120px 1fr 1fr",
    gap: tokens.space2,
    alignItems: "center",
  },
  rowMatch: {
    backgroundColor: "rgba(165, 215, 201, 0.15)", // Soft Mint tint
    padding: tokens.space2,
    borderRadius: tokens.radiusSm,
  },
  rowConflict: {
    backgroundColor: "rgba(155, 18, 30, 0.12)", // Crimson Wine tint
    padding: tokens.space2,
    borderRadius: tokens.radiusSm,
  },
  label: {
    fontFamily: tokens.fontSans,
    fontSize: tokens.textXs,
    fontWeight: 600,
    textTransform: "uppercase",
    color: tokens.textMuted,
  },
  valMono: {
    fontFamily: tokens.fontMono,
    fontSize: tokens.textSm,
    color: tokens.textPrimary,
  },
});

export const AttributeRow: React.FC<AttributeRowProps> = ({
  label,
  rawValue,
  canonicalValue,
  isMatch,
  isConflict,
}) => (
  <div
    {...stylex.props(
      styles.grid,
      isConflict ? styles.rowConflict : isMatch ? styles.rowMatch : null
    )}
  >
    <span {...stylex.props(styles.label)}>{label}</span>
    <span {...stylex.props(styles.valMono)}>{String(rawValue ?? "—")}</span>
    <span {...stylex.props(styles.valMono)}>
      {String(canonicalValue ?? "—")}
    </span>
  </div>
);
```

### 3.2. Asymmetric Split Layout: `ClusterReviewCockpit.tsx`

Adopts the Humanto two-column layout (`[360px Sticky Inspector | 1fr Dynamic Grid]`):

```tsx
const layoutStyles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: tokens.space6,
    maxWidth: "1800px",
    margin: "0 auto",
    padding: tokens.space6,
    minHeight: "calc(100vh - 80px)",
  },
  inspector: {
    position: "sticky",
    top: "80px",
    height: "calc(100vh - 120px)",
    overflowY: "auto",
  },
  workspace: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.space4,
  },
});
```

---

## 4. Keyboard-First Data Steward Triage Matrix

High-throughput data stewards process borderline records at speeds exceeding 1,000 items/hour using deterministic keyboard shortcuts:

| Key Binding  | Action Name      | Functional Description                                                 |
| ------------ | ---------------- | ---------------------------------------------------------------------- |
| <kbd>J</kbd> | Next Item        | Step forward to next candidate cluster in virtualized grid             |
| <kbd>K</kbd> | Previous Item    | Step backward to previous candidate cluster                            |
| <kbd>A</kbd> | Approve Match    | Confirm candidate ONMC code; merges raw item into master cluster       |
| <kbd>R</kbd> | Reject / Split   | Rejects match; flags as separate novel item requiring new ONMC minting |
| <kbd>E</kbd> | Edit Attributes  | Opens inline quick-editor modal to correct parsed parameters           |
| <kbd>N</kbd> | Mint Novel Code  | Forcibly triggers new ONMC generation with custom engineering tag      |
| <kbd>S</kbd> | Search Inventory | Jumps directly to "Search Before Buy" view with current item query     |
| <kbd>?</kbd> | Keyboard Help    | Displays full keyboard shortcut overlay modal                          |

---

## 5. Accessibility & Contrast Verification

- **Color Inviolability**: Color is never used as the sole conveyor of information. All match statuses include text labels (`MATCH`, `CONFLICT`, `REVIEW`) and distinct Lucide icons (`CheckCircle`, `AlertTriangle`, `XCircle`).
- **Focus Rings**: All interactive cards, buttons, and table rows display a crisp 2px focus ring (`outline: 2px solid #E94344; outline-offset: 2px`).
- **Dark Mode Compatibility**: Tokens automatically remap to deep charcoal slate surfaces (`#0B192C`) when operating in refinery control room low-light conditions.
