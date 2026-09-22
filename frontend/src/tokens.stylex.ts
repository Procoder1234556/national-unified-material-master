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
  radiusSm: "6px",
  radiusMd: "10px",
  radiusLg: "14px",
  radiusXl: "18px",
  radiusFull: "9999px",

  // Shadows
  shadowSubtle: "0 2px 6px rgba(15, 23, 42, 0.04)",
  shadowCard: "0 4px 14px rgba(15, 23, 42, 0.05)",
  shadowElevated: "0 10px 25px -3px rgba(15, 23, 42, 0.08)",
  shadowGlowPeach: "0 0 35px -5px rgba(241, 204, 157, 0.45)",
  shadowGlowMint: "0 0 30px -5px rgba(165, 215, 201, 0.4)",
  shadowGlowWine: "0 0 30px -5px rgba(155, 18, 30, 0.25)",

  // Humanto Ambient Gradients
  glowAmbientHero:
    "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(241, 204, 157, 0.35) 0%, rgba(233, 67, 68, 0.06) 45%, transparent 80%)",
  glowAmbientBottom:
    "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(241, 204, 157, 0.25) 0%, transparent 70%)",
  darkVaultBg: "#171412",
  darkVaultCard: "#221E1B",
  darkVaultBorder: "#342C27",
};

export const tokens = rawTokens;
