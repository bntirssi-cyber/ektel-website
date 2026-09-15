# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 5 (static output) + Tailwind CSS 4 via `@tailwindcss/vite`, TypeScript, Vitest. No UI framework; one client script for the Vanta.js CLOUDS hero. Fonts, three.js (0.134.0) and vanta (0.5.24) are bundled via npm — no third-party requests before user consent. Deploy target: any static host (Netlify/Vercel/IONOS); final domain undecided (ektel.de is parked/for sale).

## Users

Primary: commuters and residents in and around Hamburg-Altona whose smartphone has a problem (cracked display, dead battery, charging port) or who need a device, accessories, or a SIM card quickly. Situation: on the way through Altona station, often on a phone with a damaged screen. Job: find out fast whether EKTEL can help, what it roughly involves, when the shop is open, and where exactly it is inside the station — then call or walk in.

Secondary (confirmed as part of the offer, not the primary job): people selling a used device (Ankauf) and customers needing SIM cards, tariffs, or help with settings.

## Product Purpose

Give EKTEL Mobilfunk & Smartphones its first website. It exists because customers currently find the shop only through directory listings (Gelbe Seiten, FlinkFix, bahnhof.de). Success: a visitor on a phone reaches a call or route action within one viewport, understands the full range of services, and finds correct opening hours and the exact location inside the station.

## Positioning

Two claims confirmed by the owner-side answers:

1. **Everything in one place** — repair, sales (phones, tablets, accessories), trade-in (Ankauf), SIM cards/tariffs, and help with settings under one roof.
2. **Over 800 Google reviews** — social proof stated as a count and a link; the star rating is not known and must not be stated.

Not claimed: same-day repair promises, best-price claims, or the station location as a differentiator (it is a fact, not the positioning).

## Operating Context

- Physical shop: Paul-Nevermann-Platz 12, 22765 Hamburg-Altona; inside Hamburg-Altona station, level 1, exit Ottenser Hauptstraße (source: bahnhof.de).
- Phone: +49 40 39903730.
- Opening hours (bahnhof.de): Mon–Sat 08:30–20:30, Sun & public holidays 10:00–18:00. Other directories list 09:00–21:00 — **unconfirmed, flagged for the owner**.
- Payment: cash confirmed by bahnhof.de; card acceptance unknown — **flagged**.
- Brands sold/serviced per directories: Samsung, Apple, Sony. Others unconfirmed.
- Visitors arrive via Google search/Maps on mobile; many read the site on a damaged screen.

## Capabilities and Constraints

- Pages: Start, Leistungen, Kontakt (with hours, consent-gated Google Maps embed, inquiry form), Impressum, Datenschutz.
- Inquiry form posts to a configurable endpoint (`PUBLIC_FORM_ENDPOINT`); without one it falls back to `mailto:`.
- All shop facts live in `src/data/shop.ts` — the single place to correct data.
- No prices are published (prices given after diagnosis / on request). No invented testimonials, ratings, benchmarks.
- Legal pages require the owner to fill: e-mail address, USt-IdNr. (if any), hosting provider.
- Language: German, formal address ("Sie").

## Brand Commitments

- Name: EKTEL Mobilfunk & Smartphones (owner: Aysun Eker).
- **A real logo exists but was not supplied yet.** The site ships an SVG wordmark in `src/components/Logo.astro` as a placeholder; swap it for the real logo when provided.
- Binding visual constraint volunteered by the client: a Vanta.js CLOUDS animated sky in the hero with "liquid glass" (frosted, translucent) panels on top; a light, airy look.
- Binding reference named by the client: **Apple design language** (Liquid Glass materials, restraint, generous whitespace, product-like presentation). No "apple-design" skill is installed; it is applied through the liquid-glass-ui skill and Apple HIG principles.
- Formal "Sie" address and a sober tone are untouchable. A technical/gaming look (neon, dark panels, jargon) is explicitly wrong for this brand.

## Evidence on Hand

- Directory facts listed above (address, phone, hours, services, brands).
- FlinkFix: "Excellent", 818 Google reviews, trust score 98 — used only as "über 800 Google-Bewertungen".
- No photos, no customer quotes, no price list, no logo file on hand. Future work must not fabricate any of these.

## Product Principles

1. Reachability first: call and route actions are always one tap away.
2. Say only what is true — no prices, ratings, or quotes we cannot back.
3. Show the whole offer, not just repair — "everything in one place" is the claim.
4. Correct facts live in one file; the site never contradicts the directory listings.
5. Fast and private: no third-party requests without consent, small payload, works on a cracked screen.

## Accessibility & Inclusion

Readers may be on damaged displays or in a hurry: minimum 16 px body text, 4.5:1 contrast on all glass panels, 44 px touch targets, visible focus, skip link, `prefers-reduced-motion` honored (animated sky replaced by a static gradient).
