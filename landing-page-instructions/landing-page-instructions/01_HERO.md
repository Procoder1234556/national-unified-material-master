# 01 – Hero Section

**Optimizely Reference**: Large bold headline “You’re free to grow” + short benefit subtext + single strong CTA + social proof line.

---

## Layout
- Full-width, generous top padding (120–160px desktop)
- Centered content (max-width ~720–800px for text)
- Optional subtle background pattern or soft gradient (very light terracotta → white)
- Optional right-side or background product visual (dashboard mock / material code visualization) – keep secondary

## Content Spec

### Eyebrow (small uppercase label)
```
SIH 26099  ·  Ministry of Petroleum & Natural Gas
```

### Headline (H1)
```
One Nation.
One Material Code.
```
or the stronger outcome version:
```
Stop losing ₹4,200 Cr
to fragmented material codes.
```

**Recommended primary headline**:
```
Unify India’s energy procurement.
```

### Sub-headline
```
NUMM is the AI-powered National Unified Material Master that harmonizes 
messy CPSE catalogs into a single sovereign standard — ONMC — 
with zero false-positive safety mismatches.
```

### Primary CTA
- Text: **Enter Dashboard** or **Launch Live Demo**
- Style: Solid terracotta `#E94344`, white text, large padding, slight shadow
- Secondary CTA (optional): “Watch 5-min Pitch” (outline / ghost)

### Trust Line (below CTAs)
```
Trusted by the vision of MoPNG · Built for IOCL · ONGC · BPCL · HPCL · GAIL · OIL
```

## Visual Notes
- Keep hero clean. Avoid clutter.
- If showing a product image: prefer a clean dashboard screenshot or animated “messy codes → ONMC” transformation.
- Mobile: Stack CTA buttons, reduce headline size gracefully.

## Implementation Notes (React)
- Use the existing `LandingPage` component as base.
- Make the primary button trigger `onEnterDashboard()`.
- Add a subtle fade-in animation on load (Framer Motion already in project).