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

Weitere Scripts: `npm run og` (OG-Bild neu rendern), `npm run frames` (Frames aus `header/a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4` neu extrahieren, Quelle in `scripts/extract-frames.py`; benötigt Python + OpenCV), `node scripts/import-photos.mjs` (Werkstattfotos aus `~/Downloads` neu importieren/komprimieren, falls der Kunde Ersatzfotos schickt).

## Konfiguration (`.env`, siehe `.env.example`)

| Variable | Zweck |
|---|---|
| `SITE_URL` | Finale Domain (Canonical, Sitemap, OG-URLs) |
| `PUBLIC_FORM_ENDPOINT` | Formular-Endpoint (z. B. Formspree). Leer = das Formular öffnet das E-Mail-Programm (mailto). |

## Wo was steht

- **Alle Ladenfakten** (Adresse, Telefon, Öffnungszeiten, Leistungen, Marken): `src/data/shop.ts` – einzige Quelle.
- Design-Tokens & Glas-Material: `src/styles/global.css` (`@theme` + `--lq-*`).
- Hero (scroll-gescrubbtes Telefon): `src/components/ScrollPhoneHero.astro`, `src/scripts/scroll-phone.ts`, Frames in `public/phone/`. Kein Vanta/Wolkenhimmel mehr (entfernt 2026-09-16, passte nicht zum roten Marken-Look).
- Dunkles Liquid Glass unten (Startseite ab „Was wir für Sie tun"): `.surface-dark`/`.glass-dark-*`/`.card-hover` in `src/styles/global.css`; Scroll-Reveal & Zahlen-Countup: `src/scripts/scroll-reveal.ts`.
- Logo: `src/components/Logo.astro` (echte rote Wortmarke, siehe `docs/logo-brief.md`), Favicon `public/favicon.svg`.
- Fotos (echt + generiert): `src/assets/img/` — drei echte Werkstattfotos (Reparatur) + drei mit Higgsfield generierte Produktfotos (Verkauf, Ankauf, SIM), Import-Script `scripts/import-photos.mjs`.
- Design-Entscheidungen: `PRODUCT.md`, `DESIGN.md`, `docs/`, `.impeccable/surfaces/`.

## Offene Punkte (⚠︎ BITTE PRÜFEN)

- [ ] **Sonntags-/Feiertagszeiten** bestätigen: Mo–Sa 08:30–20:30 ist durch bahnhof.de UND den echten Google-Maps-Eintrag doppelt bestätigt; nur die Sonntagszeit (10–18 Uhr) stammt bislang nur von bahnhof.de (`shop.hours`, `shop.hoursNote`).
- [ ] **Etage/Ebene klären**: bahnhof.de sagt „Ebene 1", der Google-Maps-Eintrag sagt „Etage 0" (`shop.floorHint`) — welche Angabe stimmt? Aktuell wird die Etage auf der Website gar nicht genannt, um nichts Falsches zu behaupten.
- [ ] **E-Mail-Adresse** eintragen (`shop.email`; aktuell Platzhalter `info@ektel-altona.de`).
- [ ] **USt-IdNr.** im Impressum eintragen oder Abschnitt entfernen (`src/pages/impressum.astro`).
- [ ] **Hoster** (und ggf. Formular-Dienstleister) in `src/pages/datenschutz.astro` eintragen.
- [ ] **Zahlungsarten**: bahnhof.de nennt nur Bar – Kartenzahlung? (aktuell nicht erwähnt).
- [ ] **ÖPNV-Linien** in `shop.transit` prüfen.
- [ ] **Finale Domain** setzen (`SITE_URL`, `public/robots.txt`).
- [ ] **Logo-Farbwert bestätigen**: Rot `#E2001A` in `src/styles/global.css` (`--color-brand-red`) ist vom Kunden-Foto geschätzt, kein Vektor-Original. Bei vorhandener Logodatei (SVG/AI/PDF) bitte nachreichen und in `src/components/Logo.astro`, `public/favicon.svg`, `scripts/make-og.mjs` austauschen — siehe `docs/logo-brief.md`.
- [ ] **Leistungsdetails** prüfen (Datenrettung, eSIM, Ankauf defekter Geräte – aus Verzeichnissen abgeleitet).
- [ ] Optional: die drei KI-generierten Produktfotos (Verkauf, Ankauf, SIM in `src/assets/img/service-*.jpg`) durch echte Ladenfotos ersetzen, sobald vorhanden (`node scripts/import-photos.mjs` anpassen).

## Deployment

`npm run build` erzeugt `dist/` – auf jeden statischen Host hochladen (Netlify, Vercel, IONOS, Strato …). Keine Server-Logik nötig. Hinweis: `ektel.de` steht laut domainname.de zum Verkauf.

**Demo-Deploy (GitHub Pages, kostenlos, dauerhaft):** [https://bntirssi-cyber.github.io/ektel-website/](https://bntirssi-cyber.github.io/ektel-website/) – Quellcode auf `main` im Repo, gebauter Stand auf dem `gh-pages`-Branch. Pages läuft von einem Unterpfad (`/ektel-website/`), deshalb setzt `astro.config.mjs` optional `base` über die Env-Var `BASE_PATH` (Default `/`, betrifft normale Builds nicht). Neu deployen:

```bash
rm -rf dist
SITE_URL="https://bntirssi-cyber.github.io/ektel-website" BASE_PATH="/ektel-website/" npm run build
npx gh-pages -d dist
```

Sobald eine echte Domain feststeht: `SITE_URL` setzen, `BASE_PATH` weglassen (Default `/`), normal bauen und auf den finalen Host hochladen.
