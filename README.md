# EKTEL Mobilfunk & Smartphones – Website

Statische Website für den Handyladen im Bahnhof Hamburg-Altona. Astro 7 · Tailwind 4 · TypeScript · Vitest.

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:4321
npm test           # Vitest (Öffnungszeiten, Formularvalidierung, Illustrationen, Tokens)
npm run build      # astro check + Build nach dist/
npm run preview
```

Weitere Scripts: `npm run og` (OG-Bild neu rendern), `npm run frames` (Frames aus `header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4` neu extrahieren, Quelle in `scripts/extract-frames.py`; benötigt Python + OpenCV).

## Konfiguration (`.env`, siehe `.env.example`)

| Variable | Zweck |
|---|---|
| `SITE_URL` | Finale Domain (Canonical, Sitemap, OG-URLs) |
| `PUBLIC_FORM_ENDPOINT` | Formular-Endpoint (z. B. Formspree). Leer = das Formular öffnet das E-Mail-Programm (mailto). |

## Wo was steht

- **Alle Ladenfakten** (Adresse, Telefon, Öffnungszeiten, Leistungen, Marken): `src/data/shop.ts` – einzige Quelle.
- Design-Tokens & Glas-Material: `src/styles/global.css` (`@theme` + `--lq-*`).
- Hero (scroll-gescrubbtes Telefon): `src/components/ScrollPhoneHero.astro`, `src/scripts/scroll-phone.ts`, Frames in `public/phone/`.
- Wolkenhimmel (Vanta): `src/components/CloudSky.astro`, `src/scripts/vanta-hero.ts`.
- Logo-Platzhalter: `src/components/Logo.astro`, Favicon `public/favicon.svg`.
- Design-Entscheidungen: `PRODUCT.md`, `DESIGN.md`, `docs/`, `.impeccable/surfaces/`.

## Offene Punkte (⚠︎ BITTE PRÜFEN)

- [ ] **Öffnungszeiten** bestätigen: bahnhof.de nennt Mo–Sa 08:30–20:30, So/Feiertag 10–18; Branchenverzeichnisse nennen 09–21 Uhr (`shop.hours`, `shop.hoursNote`).
- [ ] **E-Mail-Adresse** eintragen (`shop.email`; aktuell Platzhalter `info@ektel-altona.de`).
- [ ] **USt-IdNr.** im Impressum eintragen oder Abschnitt entfernen (`src/pages/impressum.astro`).
- [ ] **Hoster** (und ggf. Formular-Dienstleister) in `src/pages/datenschutz.astro` eintragen.
- [ ] **Zahlungsarten**: bahnhof.de nennt nur Bar – Kartenzahlung? (aktuell nicht erwähnt).
- [ ] **ÖPNV-Linien** in `shop.transit` prüfen.
- [ ] **Finale Domain** setzen (`SITE_URL`, `public/robots.txt`).
- [ ] **Echtes Logo** liefern und `src/components/Logo.astro` + `public/favicon.svg` ersetzen.
- [ ] **Leistungsdetails** prüfen (Datenrettung, eSIM, Ankauf defekter Geräte – aus Verzeichnissen abgeleitet).
- [ ] Optional: echte Ladenfotos statt der SVG-Illustrationen in `ServiceTile.astro` / `leistungen.astro`.

## Deployment

`npm run build` erzeugt `dist/` – auf jeden statischen Host hochladen (Netlify, Vercel, IONOS, Strato …). Keine Server-Logik nötig. Hinweis: `ektel.de` steht laut domainname.de zum Verkauf.
