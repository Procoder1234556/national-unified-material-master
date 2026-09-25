# 02 – Hero Section (Most Important)

## Purpose

First thing the user sees. Must explain the value in under 5 seconds.

## Layout Details

- Full width
- Min-height: 85vh or at least 620px
- Background: White or very soft gradient (`#FFFFFF` to `#F8F7F5`)
- Content: Centered vertically and horizontally
- Max text width: 780px
- Padding: 120px top, 80px bottom

## Exact Content to Write (Copy-Paste)

### Eyebrow (small text above headline)

```
SIH 26099  ·  Ministry of Petroleum & Natural Gas
```

- Font size: 13px
- Font weight: 600
- Letter spacing: 0.08em
- Color: `#E94344`
- Text transform: Uppercase

### Main Headline (H1)

```
Unify India’s energy procurement.
```

- Font size: 56px (desktop), 36px (mobile)
- Font weight: 800
- Line height: 1.1
- Color: `#141414`
- Margin bottom: 24px

### Sub-headline

```
NUMM is the AI-powered National Unified Material Master that turns fragmented CPSE catalogs into one sovereign standard — ONMC — with zero false-positive safety mismatches.
```

- Font size: 18px
- Line height: 1.6
- Color: `#4A4A4A`
- Max width: 640px
- Margin bottom: 40px

### Buttons (side by side, 16px gap)

1. Primary Button
   - Text: **Enter Live Demo**
   - Background: `#E94344`
   - Text: White
   - Padding: 16px 32px
   - Border radius: 8px
   - Font weight: 600
   - Font size: 16px

2. Secondary Button
   - Text: **Watch 5-min Pitch**
   - Background: Transparent
   - Border: 1px solid `#E5E2DE`
   - Text color: `#141414`
   - Same padding and radius

### Trust Line (below buttons)

```
Built for IOCL · ONGC · BPCL · HPCL · GAIL · OIL · EIL · NRL
```

- Font size: 14px
- Color: `#6B6B6B`
- Margin top: 32px

## Image Recommendation

- Optional right side or background: Soft dashboard preview image named `dashboard-preview`
- If no image: Keep pure text hero (cleaner and safer for older tools)
- Background image (if used): very light abstract industrial pattern or soft gradient only

## Effects (must implement)

1. On page load:
   - Eyebrow appears first (opacity 0 → 1)
   - Then headline (delay 0.15s)
   - Then sub-headline (delay 0.3s)
   - Then buttons (delay 0.45s)
2. Buttons on hover: scale 1.03 + soft shadow
3. Whole hero has very subtle fade-in

## Mobile

- Stack buttons vertically
- Reduce headline to 32–36px
- Reduce top padding to 80px
