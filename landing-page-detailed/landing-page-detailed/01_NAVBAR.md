# 01 – Navigation Bar (Sticky)

## Purpose

Top bar that stays visible while scrolling. Clean and institutional.

## Layout Details

- Position: Sticky top
- Height: 72px
- Background: White (`#FFFFFF`)
- Bottom border: 1px solid `#E5E2DE`
- Content max-width: 1200px, centered
- Display: Flex, space-between, vertical center

## Left Side

- Text: **NUMM**
- Font size: 20px
- Font weight: 800 (Extra Bold)
- Color: `#141414`
- Optional small subtitle under it (very small): “National Unified Material Master”

## Right Side – Buttons

Two buttons side by side with 12px gap:

1. **Secondary Button**
   - Text: “Architecture”
   - Style: Transparent background, text color `#141414`, border 1px solid `#E5E2DE`
   - Padding: 10px 20px
   - Border radius: 6px

2. **Primary Button**
   - Text: “Enter Dashboard”
   - Background: `#E94344`
   - Text color: White
   - Padding: 10px 24px
   - Border radius: 6px
   - Font weight: 600

## Effect

- When user scrolls down more than 20px → add soft shadow under the navbar
- Buttons: on hover scale slightly (1.03) and primary button becomes a bit darker

## Image

- No image needed in navbar

## Mobile Behavior

- On small screens: Show only “NUMM” logo on left and “Enter Dashboard” button on right. Hide “Architecture” button or put it in a simple menu.
