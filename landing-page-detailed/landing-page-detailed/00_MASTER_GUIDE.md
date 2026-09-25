# NUMM Landing Page – COMPLETE DETAILED INSTRUCTIONS

### For Antigravity / Older Tools (Step-by-step, no assumptions)

**Project**: National Unified Material Master (NUMM)  
**Problem Statement**: SIH 26099 – Ministry of Petroleum & Natural Gas  
**Style Inspiration**: Optimizely landing page (clean SaaS, bold headlines, logo cloud, feature cards, metrics, CTAs)

---

## 1. Overall Page Structure (Top to Bottom)

The landing page must contain these sections in this exact order:

1. Navigation Bar (sticky)
2. Hero Section
3. Logo Cloud / Trust Bar
4. Problem → Solution Cards (3 cards)
5. Big Metrics / Social Proof Section
6. Feature Deep Dive (4 features)
7. Standards & Integrations Bar
8. Final Call-To-Action Section
9. Footer

---

## 2. Global Design Rules (Must Follow)

### Colors (use exact hex codes)

- Primary Button / Accent: `#E94344` (Terracotta)
- Dark Text: `#141414`
- Secondary Text: `#4A4A4A`
- Soft Background: `#F8F7F5`
- White: `#FFFFFF`
- Border: `#E5E2DE`
- Petroleum Sage (secondary accent): `#5F978E`

### Fonts

- Headlines: Bold, system font or Inter, large size
- Body text: Regular weight, 16px–18px
- Code / technical: Monospace font

### Spacing

- Section vertical padding: 80px top and bottom on desktop
- Maximum content width: 1200px centered
- Card gap: 24px or 32px

### Effects (use these consistently)

- Fade-in + slight upward movement when section enters viewport
- Buttons: slight scale up on hover (1.03x) + soft shadow
- Cards: soft shadow that becomes stronger on hover
- Smooth scroll behavior for the whole page

---

## 3. Images & Visual Assets Needed

You will need the following images/icons. If real images are not available, use solid color placeholders or Lucide icons.

| Image Name                | Where to Use               | Description / Recommendation                                                                | Size Suggestion |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------- | --------------- |
| hero-background           | Hero section background    | Very light abstract industrial pattern or soft gradient from white to very light terracotta | 1920×1080       |
| dashboard-preview         | Hero right side (optional) | Clean screenshot of NUMM dashboard or search result                                         | 600×400         |
| icon-database             | Problem card 1             | Database / catalog icon (Lucide: Database)                                                  | 48×48           |
| icon-shield               | Problem card 2             | Shield / safety icon (Lucide: ShieldCheck)                                                  | 48×48           |
| icon-layers               | Problem card 3             | Layers / surplus icon (Lucide: Layers)                                                      | 48×48           |
| icon-code                 | Feature 1                  | Code / ONMC icon                                                                            | 40×40           |
| icon-safety               | Feature 2                  | Safety gate icon                                                                            | 40×40           |
| icon-transfer             | Feature 3                  | Transfer / stock icon                                                                       | 40×40           |
| icon-audit                | Feature 4                  | Audit / lock icon                                                                           | 40×40           |
| logo-iocl, logo-ongc etc. | Logo cloud                 | Text badges are preferred if real logos unavailable                                         | –               |

**Important**: If you cannot add real images, use colored circles or Lucide React icons. Do not leave empty spaces.

---

## 4. Animation / Effect Rules for Every Section

Apply these effects:

- **On page load (Hero)**: Headline fades in, then subtext, then buttons (staggered 0.15s delay)
- **On scroll into view (all other sections)**:
  - Opacity from 0 → 1
  - TranslateY from 30px → 0
  - Duration: 0.6 seconds
  - Ease: ease-out
- **Cards on hover**:
  - TranslateY -4px
  - Shadow increases
  - Duration 0.25s
- **Buttons on hover**:
  - Scale 1.03
  - Slight brightness increase

---

## 5. How to Use These Files

Read the files in this order:

1. `00_MASTER_GUIDE.md` (this file)
2. `01_NAVBAR.md`
3. `02_HERO.md`
4. `03_LOGO_CLOUD.md`
5. `04_PROBLEM_SOLUTION.md`
6. `05_METRICS.md`
7. `06_FEATURES.md`
8. `07_STANDARDS.md`
9. `08_FINAL_CTA.md`
10. `09_FOOTER.md`
11. `10_COMPLETE_COPY.md` (all text in one place)

Each file contains:

- Exact layout description
- Exact text content to write
- Exact image to place
- Exact effect to apply
- Color and spacing details

Follow every instruction literally.
