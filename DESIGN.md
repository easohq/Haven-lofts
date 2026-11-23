---
name: Haven Lofts
description: A two-owner, by-appointment salon in Lakeville, set as its own 1970s living room.
colors:
  cream: "#F4E8CC"
  cream-deep: "#EBD9AE"
  cream-surface: "#FAF1DC"
  espresso: "#24180F"
  espresso-soft: "#5A4330"
  mustard: "#D4A62A"
  olive: "#4B5236"
  olive-deep: "#3A4029"
  walnut: "#5E3A20"
  cognac: "#9C4422"
  cognac-stripe: "#B4522A"
  gold-ink: "#6E4A12"
  gold-light: "#F0CF6E"
  vinyl: "#120C07"
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
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-olive:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-gold:
    backgroundColor: "{colors.mustard}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "0 1.9rem"
    height: "3.5rem"
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.espresso}"
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
  stylist-card-walnut:
    backgroundColor: "{colors.walnut}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sleeve}"
    padding: "48px"
  stylist-card-olive:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sleeve}"
    padding: "48px"
  booking-panel:
    backgroundColor: "{colors.cream-deep}"
    textColor: "{colors.espresso}"
    padding: "20px"
---

# Design System: Haven Lofts

## Overview

**Creative North Star: "The Living Room Sleeve"**

Haven Lofts is drawn as its own 1970s living room, built from the salon's real materials laid down as big flat fields: mustard velvet, olive wall, walnut, cognac leather. Each section of the page is one of those fields, edge to edge, and the real salon photos sit on them like album covers in rounded sleeves with a cream rim. A black record with a mustard label is the one decorative object; it slides out of the hero sleeve and peeks out of the room sleeves.

Density is low and the scale is big: one huge Gloock headline per section, a short paragraph, pills. Nothing is drawn on top of the rooms; the real photos and the flat colour carry the mood. The system rejects the cream-and-serif salon template and the darkened-photo "BOOK NOW" hero.

Light and dark both ship. In the evening theme the cream rooms go espresso while the mustard, olive and walnut fields stay themselves, a shade deeper.

**Key Characteristics:**
- Whole sections are flat colour fields: mustard (hero, stylists, visit), olive (the space), cognac (services), walnut (spray tan), espresso (footer).
- Photos are sleeves: 28px corners and a 10px cream rim.
- One signature stripe (cognac, walnut, olive with thin cream rules) placed once inside each major section.
- One display face, one text face; pills for every action.
- Real salon photos only.

## Colors

Warm, saturated 1970s fields on cream and espresso; every colour is a CSS variable on `:root`, redefined under `[data-theme='dark']`.

### Primary
- **Mustard Velvet** (mustard): the field that owns the hero, the stylists section, the visit section, the nav bar, the services photo frame and the gold buttons. Text on it is always espresso. Dark theme deepens it to #C99A22.

### Secondary
- **Olive Wall** (olive): the space section field, the second stylist card, the "Book with Leah" pill. Olive Deep (#3A4029) is its shade. Dark theme: #3A4029.
- **Walnut** (walnut): the spray tan field, the first stylist card, the scrollbar thumb, the middle stripe. Dark theme: #4A2E19.

### Tertiary
- **Cognac Leather** (cognac): the services section field (`--cognac-field`, #7E361A in dark), the text caret and link-hover underline (`--cognac`, lightened to #E08A5C in dark so it reads on espresso). Cognac Stripe (cognac-stripe) is the brighter top band of the stripe only.

### Neutral
- **Cream** (cream): the light page background, the sleeve rims and stripe rules, and all text on olive, walnut, cognac and espresso fields.
- **Cream Deep** (cream-deep): alternate background and the booking drawer's inset panels.
- **Cream Surface** (cream-surface): map placeholder surface.
- **Espresso** (espresso): body ink, primary pills, the footer field, and the label colour on mustard. Dark page background is #1C140C.
- **Espresso Soft** (espresso-soft): secondary text on cream.
- **Gold Ink** (gold-ink): small labels, icons and the focus ring on cream; in dark it becomes gold-light.
- **Gold Light** (gold-light): labels and focus rings on dark fields; the primary pill in dark theme.
- **Vinyl** (vinyl): the record only.

### Named Rules
**The Field Rule.** A section is one flat field of one material colour, edge to edge. Do not tint, gradient or overlay a field.

**The Espresso On Mustard Rule.** Anything set on mustard (labels, nav links, icons, focus rings) uses espresso ink. Walnut text on mustard failed contrast.

**The Cream Price Rule.** On the cognac services field, prices and body text are cream (5.29:1 light, 7.10:1 dark). Gold-light on cognac is 4.25:1 and fails; never use it for text there.

## Typography

**Display Font:** Gloock (with Georgia, serif)
**Body Font:** Albert Sans (with system-ui, -apple-system, sans-serif)

**Character:** Gloock is a soft, heavy 70s serif set tight and huge like a record title; Albert Sans is a plain, friendly sans that stays out of its way. Gloock is loaded at its single 400 weight; Albert Sans at 400 to 700.

### Hierarchy
- **Display** (400, clamp(3.75rem, 11vw, 9.5rem), 0.92, -0.02em): the hero's two-line "Haven / Lofts" only.
- **Headline** (400, clamp(3.25rem, 7vw, 6rem) to clamp(3.5rem, 8vw, 7rem), 0.92): one per section; balanced wrapping.
- **Title** (400, 2rem to 2.5rem, or clamp(3rem, 5vw, 4.5rem) for stylist names, line-height 1, -0.01em): service names, stylist names, drawer titles, the phone number in the booking drawer.
- **Body** (400 to 500, 1.0625rem base, 1.125 to 1.25rem lead, 1.55 to 1.6): paragraphs, max-width about 28 to 36rem; pretty wrapping.
- **Label** (700, 0.9375rem, sentence case): small section-internal labels such as "Call or text Sara". Gold ink on cream, espresso on mustard, gold-light on dark fields.

### Named Rules
**The Two Faces Rule.** Gloock for display, Albert Sans for everything else, nothing else.

**The Sentence-Case Label Rule.** Labels are sentence case, never tracked capitals, and never sit above a heading as a kicker.

## Layout

A centred container of 88rem with side gutters of 20px, 32px from 640px and 48px from 1024px. Content sits on a 12-column grid at 1024px and up (typically a 6/5 or 5/7 split with an offset), collapsing to one column below. Sections pad 96px top and bottom on phones and 144px from 1024px. The nav is 72px tall and sticky; sections scroll in with a 4rem margin.

On phones the photo leads (the hero sleeve comes before the headline). The space section is a sideways snap-scrolling strip of sleeves without a visible scrollbar. The services section pins its mustard photo frame beside the list from 1024px. The booking drawer is a right-hand panel (max 460px) on wider screens and a bottom sheet with 28px top corners under 640px.

**The Stripe Placement Rule.** The stripe runs once per major section, inside it (behind a sleeve, or bleeding off one side), never as a section border or divider.

## Elevation & Depth

Flat by default. Depth comes from the colour fields, the cream rim around each sleeve, and the record tucked behind its sleeve.

### Shadow Vocabulary
- **Sleeve rim** (`box-shadow: 0 0 0 10px var(--rim)`): the cream frame on every large photo; 6px in the room strip. A rim, not a shadow.
- **Nav scrolled** (`box-shadow: 0 10px 24px -18px rgb(0 0 0 / 0.5)`): appears only once the page scrolls.
- **Drawer** (`box-shadow: -40px 0 80px -40px rgb(0 0 0 / 0.45)`; sheet: `0 -30px 60px -30px rgb(0 0 0 / 0.45)`): the booking drawer and menu.

The nav and the sheet's top bar are translucent mustard (94 to 95%) with a background blur; with reduced transparency they turn solid mustard.

**The Flat Field Rule.** Cards, buttons and fields carry no drop shadow. Only the nav (once scrolled) and the drawers lift.

## Shapes

Three shapes: the sleeve (soft square corners, 28px; 20px for inset photos; 14px for drawer thumbnails), the pill (999px) for every button and icon button, and the circle. The record is the one decorative circle; stylist portraits and mustard list bullets are also round. Borders are almost absent: the dotted leader between a service and its price, and the stripe's cream rules.

## Components

### Buttons
Tactile pills that lift a little and press in.
- **Shape:** full pill (999px), 3.5rem tall, 1.9rem side padding, bold Albert Sans; the small size is 3rem with 1.4rem padding.
- **Primary:** espresso with cream text (gold-light with espresso text in dark). Used for "Book with Sara" and the main call in each context.
- **Olive:** olive with cream text, for the second stylist's pill beside the primary.
- **Gold:** mustard with espresso text, the call on dark fields (services, spray tan, footer).
- **Cream:** cream with espresso text, on the stylist cards.
- **Ghost:** 9% ink tint, 15% on hover; secondary actions in the booking drawer (Text, Email, Instagram, Copy, Directions).
- **Hover / Active:** lift 2px over 550ms on the house ease `cubic-bezier(0.22, 1, 0.36, 1)`, scale to 0.97 on press. The gold arrow inside slides 5px right on hover.
- **Every in-page Book button carries `data-cta`** (the always-visible top bar and menu buttons do not, or the phone booking bar would never show).

### Icon Buttons
44px tinted circles (9% ink, 10% espresso on mustard, 14% cream on dark), lift 1px on hover, scale 0.92 on press. Theme toggle, menu, close, strip arrows.

### Cards / Containers
- **Stylist cards:** walnut and olive alternating, 28px corners, 28 to 48px padding, cream text, a round portrait, mustard bullets, a cream pill at the foot. Sara and Leah sit side by side for comparison.
- **Services photo frame:** a mustard field with 28px corners holding a 20px inset sleeve that cross-fades as the list scrolls.
- **Booking panels:** cream-deep insets, square, inside the drawer.

### Navigation
Sticky mustard bar, 72px, translucent with blur, the real script logo at left, bold espresso links with a 3px rounded underline that grows from the centre (40% on hover, full for the current section). Under 1024px a menu drawer lists the sections in Gloock at 3rem.

### Booking Drawer
The single booking path. A tablist chooses Sara or Leah; each stylist shows "Book online" when a booking URL exists, otherwise call and text, with the phone number in Gloock, Call / Text / Copy pills, then email and Instagram. Opens from the right (600ms), or rises as a bottom sheet on phones with a grab handle.

### The Record (signature)
A vinyl disc drawn in CSS: fine repeating grooves and a mustard label. In the hero it slides out of the sleeve's right edge on load (1400ms) and turns once every 14s; in the room strip each record peeks 34% out on hover or focus, and on touch screens when its sleeve snaps into place. With reduced motion it sits still, half out.

### The Stripe (signature)
Three stacked bands, cognac stripe, walnut, olive, separated and edged by thin cream rules so all three read on a field of the same colour.

## Do's and Don'ts

### Do:
- **Do** fill whole sections with one material colour (mustard, olive, walnut, cognac, espresso) and keep mustard on at least a third of the page.
- **Do** set every photo as a sleeve: 28px corners and the 10px cream rim.
- **Do** use espresso ink for all text and focus rings on mustard, and cream for text and prices on the cognac field.
- **Do** spell the owner's name "Sara", never "Sarah".
- **Do** use only the salon's real photos from `public/photos/`.
- **Do** put `data-cta` on every in-page Book button (never the top bar's) and route every booking through the booking drawer (call, text, or the stylist's own booking link).
- **Do** ship both themes, and honour reduced motion (no travel, record still and half out), reduced transparency (solid mustard nav) and higher contrast (outlined ghost and icon buttons, ruled nav).
- **Do** use the house ease `cubic-bezier(0.22, 1, 0.36, 1)` for movement.

### Don't:
- **Don't** use renders or AI images, and never show the bathroom.
- **Don't** invent hours, prices or reviews.
- **Don't** set gold-light text on the cognac field (4.25:1), or walnut text on mustard.
- **Don't** use any face besides Gloock and Albert Sans.
- **Don't** use the stripe more than once per section or as a border or divider.
- **Don't** put tracked uppercase kickers or eyebrows above headings.
- **Don't** draw decoration over the rooms (ivy, pendants, candles, neon script); the real photos and the fields carry the mood.
- **Don't** darken a photo behind a headline for the hero.
