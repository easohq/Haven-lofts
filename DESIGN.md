# Haven Lofts design brief

Read this before changing the site, whether you're a person or an AI. It keeps every edit on-brand.

## The idea

A boho modern vintage salon in Lakeville, Minnesota, owned by Sarah and Leah. By appointment only.
The site is built around the salon's own photos (`public/photos/`, listed in `src/data/photos.ts`): olive walls,
walnut slats, woven pendants, cognac leather, mustard velvet, black accent walls and brass. Editorial and unhurried, like a print magazine spread, never like a software template.

## Reference

- The salon poster (`public/haven-lofts-poster.jpg`): script logo, gold ring, gold arrow.
- The salon photos: the palette, the mood and most of the page. The visitor should feel they have walked in before
  they arrive: hero = the lounge, then a walk through the door (welcome, lounge, suites, wash), the services shown in
  the room each one happens in, the spray tan room with its own neon, and the lounge again in the footer.
- New photos: export with the same warm grade (see `src/data/photos.ts`), at 640/1280/2048 on the short edge, WebP,
  and give each a plain, specific alt text. Never show the bathroom, screenshots, stock or AI images.

## The feel

Evening in the salon: lamplit, green, warm. Made with care and nice to look at, but welcoming, never
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

Never use purple, blue or bright neon colours, or gradients as decoration. The one exception is the salon's own pink neon, which appears only in its photo. Dark bands use `--noir` (the spray tan room's walls).

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

## Photography (`src/components/Photo.tsx`)

- Every photo uses `<Photo>`: responsive WebP, lazy, cropped by its box, and it opens the full-screen viewer
  (arrow keys, swipe, Escape) that steps through all the photos in walking order.
- Photos are the decoration. No drawn ornaments over or around them; the arch shape echoes the salon's arched mirror.
- Text sits on a photo only in the hero, over its darker lower edge with a scrim.
- The floral wallpaper photo is the one texture, used as the strip that opens the spray tan room.

## Motion

Slow and soft: `--ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), 500–1800ms. The hero photo settles in like eyes
adjusting to the room. Photos reveal with a soft upward wipe and settle from a slight zoom, and large ones drift a
little slower than the page (scroll timelines, where supported). In Services the photo on the left cross-fades to
the room for the service in view. Buttons lift; themes cross-fade.

## Interaction

- Feedback lands on the press, not the release: buttons scale to 0.97 (icon buttons 0.92) within 90ms.
- The nav is a frosted layer (`.nav-material`) the page scrolls under. Its soft edge appears only once content is
  beneath it, and the current section's link carries a gold underline (`aria-current`).
- On phones the booking sheet follows the finger 1:1 from its top edge, resists when pulled up, and decides on release
  from where the flick is heading (momentum projection), springing back or away at the finger's own speed. It can be
  caught mid-motion. Built in `src/components/Drawer.tsx` with `motion` springs.
- Reduced motion keeps the feedback but drops the travel: reveals and drawers cross-fade instead of sliding, and the
  room decor stops moving. Reduced transparency makes the frosted bars solid; higher contrast adds edges.
