# Haven Lofts design brief

Read this before changing the site, whether you're a person or an AI. It keeps every edit on-brand.

## The idea

A boho modern vintage salon in Lakeville, Minnesota, owned by Sarah and Leah. By appointment only.
The site should feel like the lounge in `public/salon-lounge.jpg`: warm walnut, cognac leather, olive walls,
soft light. Editorial and unhurried, like a print magazine spread, never like a software template.

## Reference

- The salon poster (`public/haven-lofts-poster.jpg`): script logo, gold ring, gold frame, spaced capitals, gold arrow.
- The lounge photo: the palette and the mood.

## Colors (all in `src/index.css`, light and dark)

| Role | Light | Dark | Use |
|---|---|---|---|
| Background | cream `#F6EFE4` | olive-black `#1A1C15` | page |
| Alternate | sand `#EADFCB` | espresso `#241F19` | Services, footer |
| Ink | espresso `#2B211C` | champagne `#F0E6D3` | text |
| Olive | `#4F5638` | `#2C3122` | the owners section |
| **Gold (the one accent)** | `#B8893B` | `#D4AA5E` | lines, frames, arrows, the gold button |
| Cognac | `#9A4F2E` | `#D9946A` | italic accent words only, never buttons |

Never use purple, blue, neon or gradients as decoration.

## Type

- Headings: Cormorant Garamond, `.display` class, weight 500. One accent word per heading in italic (`<em>`), which turns cognac.
- Body: Albert Sans, 18px, line height 1.7.
- Small labels: `.kicker` (tracked capitals on a short gold rule) above a heading, or `.label` without the rule.
- No Inter, no emoji, no all-caps sentences.

## Shapes: three, and only three

1. **Pill or circle** (`999px`): buttons, icon buttons, the round seal.
2. **Arch** (`.arch`): photos and portraits.
3. **Square**: frames, cards, drawers, the map.

Gold frames are the double rule `.double-frame` > `.double-frame-inner`. No other corner radius.

## Spacing

Tailwind's scale only (multiples of 4px). Sections breathe: 96–192px top and bottom on desktop. Lay sections out
asymmetrically (offset headers, staggered columns, overlapping images); avoid rows of identical centered cards.

## Components

- Buttons: `.btn` plus `.btn-primary` (main action), `.btn-gold` (on olive) or `.btn-ghost`; `.btn-sm` for small.
  A main action carries `<GoldArrow />`. Hover lifts the button and runs gold light around its border.
- Every in-page "Book" button gets `data-cta`, so the phone's sticky bar hides while it's visible.
- Drawers use `<Drawer>` (booking concierge, phone menu).

## Content rules

- Real details only. Phone numbers, booking links, emails, Instagram handles, prices and headshots live in
  `src/data/salonData.ts`; each button or line appears only once its field is filled. Never ship placeholders.
- Pictures: real photos of the salon or of Sarah and Leah. No stock photos, no AI-generated people.
- Copy: warm, short, specific. Say "you" and "we". No marketing filler ("seamless", "elevate", "unlock").
- Errors and empty states say what happened and what to do next (see the booking drawer and `public/404.html`).

## Motion

Slow and soft: `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), 500–1000ms. Fade-up reveals on scroll, lifting
buttons, a cross-fade when switching themes. Everything turns off for visitors who choose reduced motion.
