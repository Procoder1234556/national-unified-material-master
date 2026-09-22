// ponytail: Humanto Sovereign Industrial design tokens.
// Upgrade path: add @stylexjs/rollup-plugin to vite.config.ts when full StyleX compilation is enabled.

export const rawTokens = {
  // Humanto Sovereign Industrial Color Sequence
  colorAction: "#E94344", // Terracotta Red: Primary triggers, prominent action buttons
  colorConflict: "#9B121E", // Crimson Wine: Fatal safety mismatches (pressure/size discrepancy)
  colorHighlight: "#F1CC9D", // Sandstone Peach: Borderline review indicator (70% - 91% match)
  colorVerified: "#5F978E", // Petroleum Sage: Validated engineering standards & verified ONMC
  colorAnchor: "#593C32", // Deep Umber: Grounded borders, technical metadata labels
  colorApproved: "#A5D7C9", // Soft Mint: High-confidence automated match (>= 92%)

  // Surface & Canvas Colors
  canvasBackground: "#F5F5F5", // Humanto warm sandstone neutral canvas
  surfaceCard: "#FFFFFF", // Crisp elevated white card surfaces
  surfaceSubtle: "#F8FAFC", // Secondary card backgrounds & table headers
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
};

export const tokens = rawTokens;
