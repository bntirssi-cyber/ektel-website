# Brand Guidelines v1.0 — EKTEL Mobilfunk & Smartphones

> Last updated: 2026-09-16 (Rot-Rebrand)
> Status: Draft (Website-Launch). **Überholt:** Das ursprüngliche Hamburg-Blau war der impeccable-Direction-Contract-Vorschlag; der Kunde hat am 2026-09-16 explizit auf das reale Ladenschild-Rot umgeswitcht — site-weit, nicht nur das Logo. Diese Datei ist **Input**, die Laufzeit-Tokens leben in `src/styles/global.css`.

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | Ladenschild-Rot #E2001A (`--color-accent-600`) |
| Secondary Color | Dunkelrot #AA0013 (`--color-accent-700`, Hover) |
| Primary Font | Funnel Display (Display) / Funnel Sans (Body) |
| Voice | Nahbar, direkt, hanseatisch-nüchtern, hilfsbereit |
| Untere Seitenhälfte | Dunkles Liquid Glass auf `.surface-dark` (nahezu Schwarz + roter Glow) statt hellem Himmel |

---

## 1. Brand Voice

### Anrede & Ton
- **Anrede:** Sie. Durchgängig auf der ganzen Site, auch im Formular.
- **Tonspektrum:** Formal ←●———→ Casual (leicht links der Mitte). Einfach, nicht technisch. Ernst, aber nicht steif. Zurückhaltend statt expressiv.

### Persönlichkeitsmerkmale

| Trait | Bedeutung | Do | Don't |
|-------|-----------|----|-------|
| Nahbar | Wir sprechen wie ein guter Nachbar am Tresen | „Kommen Sie einfach vorbei – wir schauen uns das an." | „Unser Expertenteam evaluiert Ihr Endgerät." |
| Direkt | Kurze Sätze, aktive Verben, konkrete Handlung | „Jetzt anrufen", „Route planen" | „Absenden", „Mehr erfahren →" |
| Ehrlich | Nur, was wir belegen können | „Preis nach kurzer Diagnose – auf Anfrage." | „Beste Preise Hamburgs!", „Reparatur in 30 Minuten garantiert" |
| Hilfsbereit | Wir erklären ohne Fachchinesisch | „Wir richten die SIM für Sie ein." | „Provisionierung des eSIM-Profils" |

### Kontext-Anpassung

| Kontext | Tonverschiebung | Beispiel |
|---------|-----------------|----------|
| Hero / CTA | Entschlossen, knapp | „Handy kaputt? Wir helfen – alles an einem Ort." |
| Leistungen | Erklärend, ruhig | „Display, Akku, Ladebuchse: ehrliche Einschätzung vorab." |
| Formular / Fehler | Empathisch, lösungsorientiert | „Bitte Telefonnummer oder E-Mail angeben, damit wir Sie erreichen." |
| Impressum / Datenschutz | Formal, juristisch korrekt | „Angaben gemäß § 5 DDG" |

### Sprachregeln
- Sentence case in Überschriften und Buttons (keine VERSALIEN, keine Eyebrow-Labels).
- Keine Superlative, keine Zeitversprechen („am selben Tag"), keine Preise, keine erfundenen Zitate oder Sternwerte.
- „über 800 Google-Bewertungen" ist die einzige Zahl, die wir nennen.
- Deutsche Typografie: „…" Anführungszeichen, Gedankenstrich –, geschütztes Leerzeichen vor „Uhr" und Einheiten.

---

## 2. Messaging Framework

### Positionierung (bestätigt)
1. **Alles an einem Ort** – Reparatur, Verkauf, Ankauf, SIM & Tarife, Hilfe bei Einstellungen.
2. **Über 800 Google-Bewertungen** – sozialer Beweis als Zahl + Link, kein Sternwert.

### Messaging-Säulen

| Säule | Kernbotschaft | Belege |
|-------|---------------|--------|
| Alles an einem Ort | Ein Laden für alles rund ums Smartphone | Leistungsliste (Verzeichnisse) |
| Vertrauen | Über 800 Menschen haben uns bewertet | FlinkFix/Google-Zahl |
| Erreichbarkeit | Im Bahnhof Altona, sieben Tage die Woche | bahnhof.de Öffnungszeiten (⚠︎ bestätigen) |
| Ehrlichkeit | Einschätzung vorab, Preis auf Anfrage | Produktprinzip 2 |

### Tagline-Kandidaten
- „Alles rund ums Smartphone – im Bahnhof Altona."
- „Reparatur, Verkauf, Ankauf. Ein Laden."

---

## 3. Color Palette

### Primary

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Ladenschild-Rot | #E2001A | rgb(226,0,26) | CTAs, Links, Akzentflächen, Illustrationen, Icons |
| Dunkelrot | #AA0013 | rgb(170,0,19) | Hover, aktive Navigation |

### Neutral, hell (Header/Hero/`/leistungen`, `/kontakt`)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Sky 50 | #F3F8FD | rgb(243,248,253) | Seitenhintergrund |
| Sky 100 | #E3EEFA | rgb(227,238,250) | Footer, Flächen |
| Sky 200 | #C6DCF3 | rgb(198,220,243) | Borders |
| Ink 900 | #0F1B2D | rgb(15,27,45) | Überschriften, Fließtext |
| Ink 700 | #2A3950 | rgb(42,57,80) | Sekundärtext |
| Ink 500 | #55647A | rgb(85,100,122) | Hinweise, Captions |

### Dunkel (`.surface-dark`, Startseite ab „Was wir für Sie tun")

| Name | Hex/Value | Usage |
|------|-----------|-------|
| Grund | #150708 → #1B0A0C Verlauf | Seitenhintergrund unten |
| Roter Glow | rgba(226,0,26,0.20–0.30) | Drei unscharfe Radial-Gradients, keine Blur-Filter nötig |
| Ink 900 (dunkel) | #F7EEEF | Überschriften/Fließtext auf dunklem Grund (lokale Token-Überschreibung) |
| Ink 700 (dunkel) | #D8C4C7 | Sekundärtext auf dunklem Grund |
| Ink 500 (dunkel) | #AC9295 | Hinweise auf dunklem Grund |

### Semantic

| State | Hex | Usage |
|-------|-----|-------|
| Geöffnet | #1B8A5A | Öffnungs-Badge |
| Geschlossen / Fehler | #946200 | Badge geschlossen, Formularfehler (bewusst Bernstein statt Rostrot, um Verwechslung mit dem neuen Marken-Rot zu vermeiden) |

### Accessibility
- Ink 900 auf Sky 50: ≈ 15:1 (AAA). Weiß auf Ladenschild-Rot: ≈ 5.2:1 (AA). Ink 900 (dunkel, #F7EEEF) auf `.surface-dark`-Grund (#150708): > 14:1 (AAA).

---

## 4. Typography

```css
--font-display: "Funnel Display Variable", ui-sans-serif, system-ui, sans-serif;
--font-body: "Funnel Sans Variable", ui-sans-serif, system-ui, sans-serif;
```

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | clamp(40px, 6vw, 68px) | 36px | 700 | 1.05 |
| H2 | 36px | 28px | 700 | 1.15 |
| H3 | 24px | 22px | 700 | 1.25 |
| Body | 17px | 17px | 400 | 1.55 |
| Small | 14px | 14px | 400–600 | 1.5 |

- Fonts werden lokal gebündelt (`@fontsource-variable/*`), keine Google-Fonts-Requests.
- Zeilenlänge 65–75 Zeichen (`.prose-measure`).

---

## 5. Logo Usage

- **Echte Wortmarke seit 2026-09-16** (Kunden-Foto der Ladenfront): „EKTEL" in Rot `#E2001A` (`--color-brand-red`), fett, serifenlos, Versalien, ohne Bildzeichen — siehe `docs/logo-brief.md` für Details und Vorbehalt zum exakten Farbwert.
- Umgesetzt in `src/components/Logo.astro` (Wortmarke), `public/favicon.svg` (rotes Monogramm für Kleindarstellung), `scripts/make-og.mjs` (Social-Preview).
- **Update 2026-09-16:** Der UI-Akzent ist nicht mehr auf das Logo begrenzt — der Kunde wollte das rote Ladenschild site-weit. CTAs, Links, Icons und Illustrations-Akzente laufen jetzt auf demselben Rot wie die Wortmarke (siehe Farbpalette oben).
- Mindesthöhe 20 px, Schutzraum = Zeilenhöhe der Wortmarke.
- Nicht: verzerren, Schatten, Verläufe, andere Rottöne als `--color-brand-red`.

---

## 6. Bildsprache

- Keine Fotos, keine KI-Bilder. Vier inline SVG-Illustrationen (Reparatur, Zubehör, Ankauf, SIM), Strich 2 px, runde Enden, genau eine blaue Akzentfläche je Motiv, Sky-200-Wolke als Grund.
- Icons: nie Emoji; nur SVG mit `aria-hidden`.
