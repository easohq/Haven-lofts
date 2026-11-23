# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Existing clients** of Sara and Leah, who know them already and need the salon's address and how to book at Haven Lofts.
- **New local clients** in Lakeville and the south metro who are looking for a stylist and need enough trust in Sara and Leah to make a first appointment.

Both arrive mostly to answer the same three questions: who are the stylists, what do they do, and how do I book.

## Product Purpose

The website for Haven Lofts, a hair salon at 17685 Juniper Path, Suite 204, Lakeville, MN 55044, owned by stylists Sara and Leah. It exists to turn a visit into a booked appointment with one of the two owners. Success is a visitor calling or texting the right stylist.

## Positioning

A by-appointment-only salon run by its two owners, each with about twenty years behind the chair, working one-on-one in private suites around a shared lounge. Every appointment is with an owner, never handed to a junior stylist.

## Operating Context

- Booking is by **calling or texting** the stylist directly. There is no online booking system and no booking backend; the site's job ends at a `tel:` or `sms:` link.
- By appointment only: no walk-ins, so the site must make booking ahead obvious.
- Services are priced at consultation unless a starting price is filled in.
- Deployed as a static Vite + React site through Cloudflare Pages from the `easohq/Haven-lofts` repository to the salon's domain.

## Capabilities and Constraints

- Sections: services, the space, the two stylists, location with map and directions, and a booking drawer per stylist.
- **Spray tans:** Sara and Leah each have their own spray tan tent, so spray tanning is offered alongside hair. Not yet on the site.
- **Whose suite is whose** (from the owners): Leah's suite has the gallery wall over the mustard velvet sofa (photos gallery-wall, suite-velvet, suite-slat); Sara's suite is the quiet white room with the big window (photo suite-window).
- **The house style comes from the lounge, the coffee bar and the mirror wall by the door**: warm white walls, one deep green feature wall, a black wall with brass sconces and a gold mirror, cognac leather, walnut slats, rattan shades and sage velvet. The owners found mustard and orange blocks too loud.
- **Coffee bar:** a simple coffee bar in the lounge, worth mentioning as part of the visit. Do not invent a drink menu or prices.
- Contact details (each stylist's phone, booking link, email, Instagram), service prices, the suite photo and headshots live in `src/data/salonData.ts`. A button or line appears only once its field is filled.
- **Undecided / missing:** both stylists' real phone numbers, Instagram handles, prices, headshots and a photo of a suite. Until the phone numbers exist, the booking drawer shows a "booking line is almost ready" state.
- **The weekly hours in `salonData.ts` are fake.** Never display them; real hours are not known yet.
- `INITIAL_LOFT_SPACES` in `salonData.ts` is unused leftover data.

## Brand Commitments

- Name: Haven Lofts. Tagline on the logo: "Beautifully Independent".
- The script logo in `public/haven-lofts-logo.png` and its dark-mode version `public/haven-lofts-logo-light.png`.
- The printed poster `public/haven-lofts-poster.jpg` ("By Appointment Only").
- Voice: warm, short, specific; says "you" and "we"; no marketing filler.
- Visual rules are recorded in DESIGN.md.

## Evidence on Hand

- Real photographs of the salon lounge: `public/salon-lounge.jpg`, `public/salon-slat-wall.jpg`.
- The logo files and the poster above.
- Sara's and Leah's bios and specialties in `salonData.ts`.
- `src/assets/images/*` are AI-generated renders, not the real salon; do not use them.
- The owners' concept renders of the space (arched backlit mirrors, rattan pendants, olive walls, walnut slat walls, trailing ivy, white hydrangeas, candles, a floral accent wall, a "Spray Tan" neon sign) are a **style reference only**. They are not the real salon and never go on the site.

## Audience Feel

The owners are two middle-aged moms who worked hard on a beautiful space and want clients to have a good time. The site should feel considered and well made, warm and welcoming, never exclusive, cold or high-luxury.
- **None yet:** reviews, testimonials, press, client counts or before-and-after photos. Never invent them.

## Product Principles

1. Booking is the point: every section should leave the visitor one tap from calling or texting the right stylist.
2. Real details only. A missing fact stays hidden, never filled with a placeholder or an invented number.
3. Sara and Leah are the product. Show who they are and what each does best, so a client can choose between them.
4. Serve regulars and newcomers at once: the address and how to book are always easy to find.
