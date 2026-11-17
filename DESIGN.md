# Haven Lofts design brief

Read this before changing the site, whether you're a person or an AI. It keeps every edit on-brand.

## The idea

A boho modern vintage salon in Lakeville, Minnesota, owned by Sarah and Leah. By appointment only.
The site should feel like the lounge in `public/salon-lounge.jpg`: warm walnut, cognac leather, olive walls,
soft light. Editorial and unhurried, like a print magazine spread, never like a software template.

## Reference

- The salon poster (`public/haven-lofts-poster.jpg`): script logo, gold ring, gold arrow.
- The lounge photo: the palette and the mood.
- The owners' concept renders of the space (kept outside the repo, never shown on the site): arched mirrors
  backlit in warm light, woven rattan dome pendants, olive walls, walnut slat walls, trailing ivy, white
  hydrangeas, candles, a floral accent wall and a "Spray Tan" neon sign. The decor below is drawn from them.

## The feel

Evening in the salon: candlelit, green, warm. Made with care and nice to look at, but welcoming, never
exclusive or high-luxury. The owners are two moms who built a beautiful space and want people to have a good time.

## Colors (all in `src/index.css`, light and dark)

| Role | Light | Dark | Use |
|---|---|---|---|
| Background | cream `#F6EFE4` | olive-black `#1A1C15` | page |
| Alternate | sand `#EADFCB` | espresso `#241F19` | Services, footer |
| Ink | espresso `#2B211C` | champagne `#F0E6D3` | text |
| Olive | `#4F5638` | `#2C3122` | the owners section |
| **Gold (the one accent)** | `#B8893B` | `#D4AA5E` | arrows, labels, the round seal, the gold button |
| Cognac | `#9A4F2E` | `#D9946A` | prices and link hovers, never buttons |

Never use purple, blue or bright neon colours, or gradients as decoration. Decor colours are listed under Decor.

## Type

- Headings: Cormorant Garamond, `.display` class, weight 500. One face and one colour per heading: no italic or coloured accent word. The words carry the emphasis.
- Body: Albert Sans, 18px, line height 1.6, in the full ink colour (soft ink only for small notes).
- Small labels: `.label`, sentence case at 15px in gold, placed under or beside a heading, never above it. No tracked capitals, no eyebrow labels, no star or sprig ornaments.
- No Inter, no emoji, no all-caps sentences.

## Shapes: three, and only three

1. **Pill or circle** (`999px`): buttons, icon buttons, the round seal.
2. **Arch** (`.arch`): photos and portraits.
3. **Square**: cards, drawers, the map.

Surfaces are told apart by a step in background colour (bg, bg-alt, surface, olive), never by gold outlines, hairline rules, card shadows or wavy dividers. Shadows only on drawers, which really float. No other corner radius.

## Spacing

Tailwind's scale only (multiples of 4px). Sections breathe: 96–192px top and bottom on desktop. Lay sections out
asymmetrically (offset headers, staggered columns, overlapping images); avoid rows of identical centered cards.

## Components

- Buttons: `.btn` plus `.btn-primary` (main action), `.btn-gold` (on olive) or `.btn-ghost`; `.btn-sm` for small.
  A main action carries `<GoldArrow />`. Hover lifts the button; buttons are flat, one fill colour, no gradients or glows.
- Every in-page "Book" button gets `data-cta`, so the phone's sticky bar hides while it's visible.
- Drawers use `<Drawer>` (booking concierge, phone menu).

## Content rules

- Real details only. Phone numbers, booking links, emails, Instagram handles, prices and headshots live in
  `src/data/salonData.ts`; each button or line appears only once its field is filled. Never ship placeholders.
- Pictures: real photos of the salon or of Sarah and Leah. No stock photos, no AI-generated people.
- Copy: warm, short, specific. Say "you" and "we". No marketing filler ("seamless", "elevate", "unlock").
- Errors and empty states say what happened and what to do next (see the booking drawer and `public/404.html`).

## Decor (`src/components/Decor.tsx`)

Drawn from the salon's own materials, always `aria-hidden`, never clickable, and coloured only from the decor
tokens in `src/index.css` (`--glow`, `--leaf*`, `--bloom`, `--rattan*`, `--walnut*`, `--candle`):

- `<Ivy>`: trailing heart-leaf vines hanging from a section's top edge. Keep them off text: on phones only the
  strands at the edges away from the copy show.
- `<Pendant>`: a woven rattan dome with its pool of warm light (the one place a radial gradient is allowed).
- `<SlatWall>`: walnut slats behind the upper part of Services, faded at the edges, never behind body text.
- `<FloralWall>`: the hydrangea accent wall, used only behind the spray tan band.
- `<Candles>`: small flickering candles, at most one cluster per screen.
- `.arch-glow`: the warm rim of light around arched photos and portraits, like the backlit mirrors.
- `.neon`: the Sacramento script neon sign, used once, for "Spray Tan". Its glow is the one text shadow allowed.

Decor supports the content; it never sits on top of a headline or paragraph.

## Motion

Slow and soft: `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), 500–1000ms. Fade-up reveals on scroll, lifting
buttons, a cross-fade when switching themes. The room itself moves gently: ivy and pendants sway, candle flames
flicker, the arch and pendant light breathe. The signature moment is the neon sign buzzing on when the spray tan
band scrolls into view. Everything turns off for visitors who choose reduced motion.
