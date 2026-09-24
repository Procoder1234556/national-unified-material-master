# 09 – Implementation Checklist & Priority

## Recommended Build Order (for maximum SIH impact)

1. **Hero** – strongest headline + primary CTA (do this first)
2. **Logo / Trust bar** – instant credibility
3. **Problem → Solution cards** (3 cards)
4. **Big metrics row** (₹4,200 Cr etc.)
5. **Feature deep-dive** (2–4 key capabilities)
6. **Standards / Integrations bar**
7. **Final CTA**
8. **Footer**

## Technical Notes (existing codebase)

- Component: `frontend/src/components/LandingPage.tsx`
- Design tokens: `tokens.stylex.ts` + `humanto.stylex.ts`
- Icons: `lucide-react` already available
- Animation: `framer-motion` already in package.json
- Entry point: `onEnterDashboard` prop already exists in `App.tsx`

## Quick Wins
- Replace current landing content with the copy from these files
- Keep the existing color system (terracotta / crimson / sage)
- Make every primary button call `onEnterDashboard`
- Ensure mobile layout is clean (stack cards, reduce font sizes)

## What to Avoid
- Too many animations
- Overly playful illustrations
- Generic startup language (“revolutionize”, “disrupt”)
- Cluttered hero
- Missing MoPNG / SIH branding

## Final Test Before SIH
- [ ] Page loads in < 2 seconds
- [ ] Primary CTA works on mobile and desktop
- [ ] Looks premium on 1366×768 and 1920×1080
- [ ] Judges can understand the value proposition in < 8 seconds
- [ ] Clear path into the working dashboard / demo mode

---

**Result Goal**  
A landing page that feels like a real MoPNG-backed enterprise product — clean, confident, and ready for the next stage of the Smart India Hackathon.