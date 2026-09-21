# Design System & Aesthetic Specification (DESIGN.md)

## National Unified Material Master (NUMM) Framework

_Synthesized from Humanto Aesthetic Reference (`https://www.landingfolio.com/inspiration/post/humanto`)_  
**Version**: 2.2.0 (Enterprise Industrial UI)

---

## 1. Aesthetic Vision & Design Philosophy

The National Unified Material Master (NUMM) Framework breaks away from the drab, sterile, bureaucratic look typical of legacy government software. Drawing direct inspiration from **Humanto** (featured on Landingfolio), NUMM fuses **warm editorial aesthetics** with **high-density industrial engineering clarity**.

### Visual Pillars:

1. **Warm Sovereign Industrial Atmosphere**: Replaces cold sterile blues and grays with an organic, grounded color palette anchored by terracotta crimson, muted petroleum sage, warm sandstone, and deep umber.
2. **Asymmetric Sticky Split-Layout**: Directly adopts Humanto’s responsive two-column architecture (`[380px Sticky Inspector | 1fr Dynamic Workspace]`) for catalog triage and attribute comparison.
3. **Ambient Gradient Glows**: Soft, multi-stop blurred gradient backdrops (`opacity-30 blur-xl filter`) subtlely illuminate critical inspection cards and high-confidence match summaries.
4. **Editorial Typography & Scannability**: Pairs bold, clean metric numerals with uppercase micro-labels and monospace engineering specs (`JetBrains Mono`).
5. **Astryx & StyleX Precision**: Zero-runtime CSS-in-JS architecture implemented strictly via `@astryxdesign/core`, `@astryxdesign/theme-neutral`, and `@stylexjs/stylex`.

---

## 2. Color Palette & Token Matrix

Directly synthesized from the Humanto color sequence, tailored for energy sector public procurement:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           HUMANTO COLOR SEQUENCE                          │
│                                                                           │
│  [#E94344]     [#9B121E]     [#F1CC9D]     [#5F978E]     [#593C32]     [#A5D7C9] │
│  Terracotta   Crimson Wine   Sandstone    Petroleum Sage  Deep Umber   Soft Mint  │
│  (Action)     (Conflict)     (Highlight)  (Verified)     (Text Anchor) (Approved) │
└───────────────────────────────────────────────────────────────────────────┘
```

### StyleX Token Definitions (`humanto.stylex.ts`)

```typescript
import * as stylex from "@stylexjs/stylex";

export const humantoPalette = stylex.defineVars({
  // Humanto Core Accents
  terracottaRed: "#E94344", // Primary high-impact accents, interactive CTA triggers
  crimsonWine: "#9B121E", // Severe conflict alerts, pressure mismatches, brand anchor
  sandstonePeach: "#F1CC9D", // Warm card highlights, borderline review indicator
  petroleumSage: "#5F978E", // Verified oil & gas commodities, primary navigation active state
  deepUmber: "#593C32", // Muted secondary headings, grounded borders
  softMint: "#A5D7C9", // High-confidence match badges, surplus available tints

  // Ambient Glow Gradient Stops
  glowGradient:
    "linear-gradient(90deg, #E94344 0%, #9B121E 20%, #F1CC9D 40%, #5F978E 60%, #593C32 80%, #A5D7C9 100%)",

  // Canvas & Surfaces
  canvasBackground: "#F5F5F5", // Humanto soft stone neutral backdrop
  surfaceCard: "#FFFFFF", // Crisp elevated white card surfaces
  surfaceSubtle: "#F8FAFC", // Table header strips & secondary drawers
  borderSubtle: "#E5E7EB", // Delicate container hairline borders
  borderStrong: "#CBD5E1", // Active input focus boundaries

  // Text Hierarchy
  textPrimary: "#0F172A", // High-contrast slate charcoal for headings & values
  textSecondary: "#4B5563", // Body descriptions & explanations
  textMuted: "#9CA3AF", // Micro-labels, timestamps, metadata
});
```

---

## 3. UI Component Architecture

### 3.1. Ambient Glow Banner (`GlowBanner.tsx`)

```tsx
import React from "react";
import * as stylex from "@stylexjs/stylex";
import { humantoPalette } from "./humanto.stylex";

const styles = stylex.create({
  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    backgroundColor: humantoPalette.surfaceCard,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: humantoPalette.borderSubtle,
    padding: "24px 32px",
  },
  glowBackdrop: {
    position: "absolute",
    top: "-50%",
    left: "-20%",
    width: "140%",
    height: "200%",
    backgroundImage: humantoPalette.glowGradient,
    opacity: 0.15,
    filter: "blur(48px)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
});

export const GlowBanner: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.glowBackdrop)} />
    <div {...stylex.props(styles.content)}>{children}</div>
  </div>
);
```

### 3.2. Two-Column Asymmetric Review Cockpit

Adopts the Humanto split architecture:

- **Left Column (`380px` Sticky)**: The Inspector Card displaying the currently focused item with full side-by-side attribute deltas, safety flags, and keyboard shortcuts.
- **Right Column (`1fr` Dynamic)**: Virtualized TanStack data grid listing the queue of candidate duplicate clusters with match confidence badges.

```tsx
const cockpitStyles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: "24px",
    alignItems: "start",
    maxWidth: "1800px",
    margin: "0 auto",
    padding: "24px",
  },
  stickyInspector: {
    position: "sticky",
    top: "24px",
    maxHeight: "calc(100vh - 48px)",
    overflowY: "auto",
  },
  tableWorkspace: {
    backgroundColor: humantoPalette.surfaceCard,
    borderRadius: "12px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: humantoPalette.borderSubtle,
    overflow: "hidden",
  },
});
```

---

## 4. Typography & Data Presentation Rules

1. **Engineering Codes**: All ONMC codes, MESC numbers, UNSPSC identifiers, and SAP material numbers must be rendered in `fontMono` (`JetBrains Mono`) with subtle letter-spacing and background chips (`#F1F5F9`).
2. **Numeric Precision**: Dimensions are formatted to exact engineering tolerances:
   - Imperial sizes: exactly 2 decimal places with double-quote (`2.00"`).
   - Metric sizes: integer millimeters with NB (`50mm NB`).
   - Pressure ratings: standard pound rating (`Class 150`, `Class 300`).
3. **Micro-Labels**: Attribute headers (e.g. `METALLURGY`, `END CONNECTION`, `NOMINAL BORE`) use uppercase `textXs` (12px), bold font weight (600), and `textMuted` color.
