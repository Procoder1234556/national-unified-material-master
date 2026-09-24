# 06 – Call-To-Action Sections

**Optimizely Reference**: Multiple CTAs throughout the page (“Let’s grow”, “Try and stop me”, final “Let’s grow”).

---

## Primary CTA Locations

### 1. Hero (most important)
- Main button: **Enter Dashboard** / **Launch Live Demo**
- Secondary: **Watch 5-minute Pitch**

### 2. Mid-page CTA (after Features or Social Proof)
**Headline**:  
```
Ready to see One Nation, One Material Code in action?
```
**Button**: Enter Live Prototype

### 3. Final CTA (before footer)
**Headline**:  
```
Unify. Standardize. Save.
```
**Subtext**:  
The sovereign material master for India’s energy CPSEs.  
Built for MoPNG. Ready for pilot.

**Primary Button**: Start Demo  
**Secondary**: View Technical Architecture

---

## Button Hierarchy
- Primary: Solid `#E94344`, white text, medium-large size
- Secondary: Outline or ghost with terracotta border/text
- Hover: slight scale or shadow lift

## Implementation Notes
- All primary CTAs should call the same `onEnterDashboard()` handler already present in `App.tsx`.
- Keep the guided demo mode accessible (the step banner you already built).