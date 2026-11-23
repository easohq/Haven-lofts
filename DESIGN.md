---
name: Haven Lofts
description: A two-owner, by-appointment salon in Lakeville, styled after its own lounge, coffee bar and black mirror wall.
colors:
  warm-white: "#F3EEE6"
  linen: "#E7DFD1"
  surface: "#FBF8F3"
  ink: "#1D1B18"
  ink-soft: "#4F4A42"
  forest: "#3E4A37"
  forest-deep: "#2F3829"
  noir: "#1D1B18"
  brass: "#B08A50"
  brass-ink: "#765726"
  brass-light: "#D8BC86"
  cognac: "#8A4A26"
  sage: "#8A8F6E"
  walnut-1: "#7A5333"
  walnut-2: "#9A6C42"
  walnut-3: "#5B3C24"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(3.75rem, 11vw, 9.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(3.25rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "2.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Albert Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Albert Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
rounded:
  thumb: "14px"
  sleeve-sm: "20px"
  sleeve: "28px"
  pill: "999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  section: "96px"
  section-lg: "144px"
  container: "88rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-brass:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-cream:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 1.4rem"
    height: "3rem"
  icon-button:
    rounded: "{rounded.pill}"
    size: "2.75rem"
  owner-panel-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sleeve}"
    padding: "32px"
  owner-panel-forest:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.sleeve}"
    padding: "32px"
  booking-panel:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.ink}"
    padding: "20px"
---

# Design System: Haven Lofts

## Overview

**Creative North Star: "The Living Room Sleeve"**

Haven Lofts is styled after the salon itself: the lounge, the coffee bar and the black mirror wall by the door. Calm warm-white walls and linen carry most of the page; the lounge's deep green feature wall and the mirror wall's black fill whole sections; brass, like the sconces and the gold mirror, is the one accent. The real salon photos sit in rounded sleeves with a warm-white rim and carry the page; nothing decorative competes with them. The hero is the lounge photo, large, beside the name.

Density is low and the scale is big: one huge Gloock headline per section, a short paragraph, pills. Nothing is drawn over the rooms; the real photos and the quiet walls carry the mood. The system rejects the loud colour-block look the owners turned down and the darkened-photo "BOOK NOW" salon template.

Light and dark both ship. In the evening theme the white walls go near-black, while the green wall and the brass stay.

**Key Characteristics:**
- Mostly warm white and linen; whole sections in lounge green (hero, visit) or mirror-wall black (services, spray tan, footer).
- Brass is the single accent: brass pills, bullets, the nav underline, the arrow.
- Photos are sleeves: 28px corners and a 10px warm-white rim.
- No decorative shapes, bars, gradients, glass or resting shadows (checked with the taste skill's lint and inspector).
- One display face, one text face; pills for every action.
- Real salon photos only.

## Colors

Quiet warm-white walls, one deep green, one black, brass details; every colour is a CSS variable on `:root`, redefined under `[data-theme='dark']`.

### Primary
- **Lounge Green** (forest): the hero and visit fields, Leah's owner panel, the services photo panel, the photo placeholder (forest-deep). Text on it is warm white. Dark theme: #34402F.

### Secondary
- **Mirror-Wall Black** (noir): the services, spray tan and footer fields; the same value as the ink, so the primary pill is black. Dark theme: #121110.
- **Brass** (brass): the brass pill, list bullets, the nav underline, the gold arrow, the tab and grab-handle tints in the booking drawer. A fill, never small text.

### Tertiary
- **Cognac Leather** (cognac): link-hover underline and text caret; #D99A6E in dark.
- **Sage** (sage): defined as a token, not yet used on the page.
- **Walnut** (walnut-1): the scrollbar thumb only (walnut-2 and walnut-3 are spare tokens).

### Neutral
- **Warm White** (warm-white): the page, the sleeve rims, the cream pill, and all text on green and black. Dark page: #1B1A17.
- **Linen** (linen): the Sara and Leah section and the booking drawer's inset panels. Dark: #24221E.
- **Surface** (surface): Sara's owner panel. Dark: #2C2924.
- **Ink** (ink) and **Ink Soft** (ink-soft): text on light walls; secondary text.
- **Brass Ink** (brass-ink): labels, icons and focus rings on light walls; becomes brass-light in dark.
- **Brass Light** (brass-light): labels and focus rings on green and black; the primary pill in dark theme.

### Named Rules
**The Quiet Walls Rule.** Warm white and linen carry most of the page; only green and black fill whole sections. Brass, cognac and walnut are details, never fields.

**The One Accent Rule.** Brass is the only accent colour. Small text never sits in plain brass: use brass-ink on light walls (lowest pair 5.02:1 on linen) and brass-light on green and black (lowest 5.12:1 on forest).

**The Own Room Rule.** Each owner's panel opens on her own suite's photo and takes its colour from that room: Sara's quiet white room makes a light panel, Leah's gallery wall over the mustard velvet sofa makes a green one.

## Typography

**Display Font:** Gloock (with Georgia, serif)
**Body Font:** Albert Sans (with system-ui, -apple-system, sans-serif)

**Character:** Gloock is a soft, heavy 70s serif set tight and huge; Albert Sans is a plain, friendly sans that stays out of its way. Gloock is loaded at its single 400 weight; Albert Sans at 400 to 700.

### Hierarchy
- **Display** (400, clamp(3.75rem, 11vw, 9.5rem), 0.92, -0.02em): the hero's two-line "Haven / Lofts" only.
- **Headline** (400, clamp(3.25rem, 7vw, 6rem) to clamp(3.5rem, 8vw, 7rem), 0.92): one per section; balanced wrapping.
- **Title** (400, 2rem to 2.5rem, or clamp(3rem, 5vw, 4.5rem) for owner names, line-height 1, -0.01em): service names, owner names, drawer titles, the phone number in the booking drawer.
- **Body** (400 to 500, 1.0625rem base, 1.125 to 1.25rem lead, 1.55 to 1.6): paragraphs, max-width about 28 to 36rem; pretty wrapping.
- **Label** (700, 0.9375rem, sentence case): small labels inside a section, such as "Call or text Sara". Brass-ink on light, brass-light on dark.

### Named Rules
**The Two Faces Rule.** Gloock for display, Albert Sans for everything else, nothing else.

**The Sentence-Case Label Rule.** Labels are sentence case, never tracked capitals, and never sit above a heading as a kicker.

## Layout

A centred container of 88rem with side gutters of 20px, 32px from 640px and 48px from 1024px. Content sits on a 12-column grid from 1024px (typically a 6/5 or 5/7 split with an offset) and collapses to one column below. Sections pad 96px top and bottom on phones and 144px from 1024px. The nav is 72px tall and sticky; sections scroll in with a 4rem margin.

On phones the photo leads: the hero sleeve comes before the headline. The space section is a sideways snap-scrolling strip of sleeves with no visible scrollbar. The services section pins its green photo panel beside the list from 1024px. Sara and Leah sit side by side from 768px. The booking drawer is a right-hand panel (max 460px) on wider screens and a bottom sheet with 28px top corners under 640px; a sticky phone booking bar steps aside whenever an in-page Book button is on screen.

**The No-Ornament Rule.** The photos are the decoration. No stripes, discs, blobs, gradients or drawn ornaments; space, a step in wall colour and scale do the work.

## Elevation & Depth

Flat by default. Depth comes from the walls changing colour and the warm-white rim round each sleeve.

### Shadow Vocabulary
- **Sleeve rim** (`outline: 10px solid var(--rim)`): the warm-white frame on every large photo; 6px in the room grid (`.sleeve-thin`). A rim, not a shadow.
- **Nav scrolled** (`box-shadow: 0 10px 24px -18px rgb(0 0 0 / 0.5)`): appears only once the page scrolls.
- **Drawer** (`box-shadow: -40px 0 80px -40px rgb(0 0 0 / 0.45)`; sheet: `0 -30px 60px -30px rgb(0 0 0 / 0.45)`): the booking drawer and menu.

The nav and the phone booking bar are solid page colour (no blur) and carry the theme-switching logo. The phone bar slides away while you scroll down and returns when you scroll up, reach the end, or no other Book button is on screen.

**The Flat Field Rule.** Panels, buttons and sections carry no drop shadow. Only the nav (once scrolled) and the drawers lift.

## Shapes

Three shapes: the sleeve (soft square corners, 28px; 20px for inset photos; 14px for drawer thumbnails), the pill (999px) for every button and icon button, and the circle, used only for owner portraits and brass list bullets. Borders are almost absent: only the dotted leader between a service and its price.

## Components

### Buttons
Tactile pills that lift a little and press in.
- **Shape:** full pill (999px), 3.5rem tall, 1.9rem side padding, bold Albert Sans; the small size is 3rem with 1.4rem padding.
- **Primary:** black with warm-white text (brass-light with black text in dark). The nav, drawer and Sara's panel use it.
- **Brass:** brass with black text, the main call on green and black fields ("Book with Sara" in the hero, services, spray tan, footer, directions).
- **Cream:** warm white with dark text, the second call on green ("Book with Leah", Leah's panel, call and text in the visit section).
- **Forest:** green with warm-white text; defined and available.
- **Ghost:** 9% ink tint, 15% on hover; secondary actions in the booking drawer (Text, Email, Instagram, Copy, Directions).
- **Hover / Active:** lift 2px over 550ms on the house ease `cubic-bezier(0.22, 1, 0.36, 1)`, scale to 0.97 on press. The brass arrow inside takes the pill's text colour and slides 5px right on hover.
- **In-page Book buttons carry `data-cta`**; the nav, menu and phone-bar Book buttons do not, so the phone bar can step aside when one is on screen.

### Icon Buttons
44px tinted circles (9% ink on light, 14% warm white on dark), lift 1px on hover, scale 0.92 on press. Theme toggle, menu, close, strip arrows.

### Cards / Containers
- **Owner panels:** 28px corners, 20 to 32px padding. Each opens on her own suite's photo as a 20px sleeve with a caption, then a round portrait, the name in Gloock, a label, brass bullets and a pill at the foot. Sara's panel is surface with a black pill; Leah's is forest with a cream pill.
- **Services photo panel:** a forest panel with 28px corners holding a 20px inset sleeve that cross-fades as the list scrolls.
- **Booking panels:** linen insets, square, inside the drawer.

### Navigation
Sticky solid bar in the page colour, 72px, the theme-switching script logo at left, bold ink links with a 3px rounded brass underline that grows from the centre (40% on hover, full for the current section). Under 1024px a menu drawer lists the sections in Gloock at 3rem.

### Booking Drawer
The single booking path. A tablist chooses Sara or Leah (selected tab tinted 25% brass); each owner shows "Book online" when a booking link exists, otherwise call and text, with the phone number in Gloock, Call / Text / Copy pills, then email and Instagram. Opens from the right (600ms), or rises as a bottom sheet on phones with a brass grab handle.

### The Lounge Photo (signature)
The hero is the real lounge photo filling the right half of the first screen (on phones it comes first). On load it settles from a 1.1 scale over 2.2s; with reduced motion it simply appears.


## Do's and Don'ts

### Do:
- **Do** keep warm white and linen as the main walls, and give whole sections only to lounge green or mirror-wall black.
- **Do** keep brass as the one accent, and set small text in brass-ink on light walls and brass-light on green and black.
- **Do** set every photo as a sleeve: 28px corners and the 10px warm-white rim.
- **Do** open each owner's panel on her own suite's photo, coloured after that room (Sara light, Leah green).
- **Do** spell the owner's name "Sara", never "Sarah".
- **Do** use only the salon's real photos from `public/photos/`.
- **Do** put `data-cta` on every in-page Book button, and route every booking through the booking drawer (call, text, or the owner's own booking link).
- **Do** ship both themes, and honour reduced motion (no travel, no settle) and higher contrast (outlined ghost and icon buttons, ruled nav).
- **Do** keep every text pair at 4.5:1 or better.
- **Do** use the house ease `cubic-bezier(0.22, 1, 0.36, 1)` for movement.

### Don't:
- **Don't** use renders or AI images, and never show the bathroom.
- **Don't** invent hours or prices.
- **Don't** fill a section with brass, cognac, walnut, mustard or any other loud colour block.
- **Don't** use any face besides Gloock and Albert Sans.
- **Don't** add decorative shapes, stripes, gradients, glass or resting shadows; the photos are the decoration.
- **Don't** put tracked uppercase kickers or eyebrows above headings.
- **Don't** draw decoration over the rooms; the real photos and the walls carry the mood.
- **Don't** darken a photo behind a headline for the hero.
