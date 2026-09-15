# Brand Guidelines v1.0 — EKTEL Mobilfunk & Smartphones

> Last updated: 2026-09-16
> Status: Draft (Website-Launch). Farben/Schriften werden durch den impeccable Direction-Contract finalisiert; diese Datei ist **Input**, die Laufzeit-Tokens leben in `src/styles/global.css`.

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | Hamburg-Blau #0E5FB5 |
| Secondary Color | Deep Blue #0A4B90 |
| Primary Font | Bricolage Grotesque (Display) / Figtree (Body) — Kandidat: Funnel Display |
| Voice | Nahbar, direkt, hanseatisch-nüchtern, hilfsbereit |

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
| Hamburg-Blau | #0E5FB5 | rgb(14,95,181) | CTAs, Links, Akzentflächen in Illustrationen |
| Deep Blue | #0A4B90 | rgb(10,75,144) | Hover, aktive Navigation |

### Neutral (Sky / Ink)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Sky 50 | #F3F8FD | rgb(243,248,253) | Seitenhintergrund |
| Sky 100 | #E3EEFA | rgb(227,238,250) | Footer, Flächen |
| Sky 200 | #C6DCF3 | rgb(198,220,243) | Borders, Illustrationswolken |
| Ink 900 | #0F1B2D | rgb(15,27,45) | Überschriften, Fließtext |
| Ink 700 | #2A3950 | rgb(42,57,80) | Sekundärtext |
| Ink 500 | #55647A | rgb(85,100,122) | Hinweise, Captions |

### Semantic

| State | Hex | Usage |
|-------|-----|-------|
| Geöffnet | #1B8A5A | Öffnungs-Badge |
| Geschlossen / Fehler | #B4462B | Badge geschlossen, Formularfehler |

### Optionaler CTA-Akzent (Entscheidung im Direction-Contract)
- Signal-Orange #EA580C (aus ui-ux-pro-max „Professional blue + urgent orange") – nur wenn Blau-auf-Himmel für CTAs zu wenig absetzt. Wenn genutzt: ausschließlich für den primären CTA, nie für Text.

### Accessibility
- Ink 900 auf Sky 50: ≈ 15:1 (AAA). Weiß auf Hamburg-Blau: ≈ 6.4:1 (AA). Ink 700 auf Glas (≥ 62 % Weiß über Himmel): muss im Build gemessen werden (Ziel ≥ 4.5:1).

---

## 4. Typography

```css
--font-display: "Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif; /* Kandidat: "Funnel Display Variable" */
--font-body: "Figtree Variable", ui-sans-serif, system-ui, sans-serif;
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

- Echtes Logo existiert (Inhaber) → **nachreichen**. Bis dahin SVG-Wortmarke `src/components/Logo.astro` (siehe `docs/logo-brief.md`).
- Mindesthöhe 24 px, Schutzraum = Höhe des Bildzeichens, monochrom über `currentColor`.
- Nicht: verzerren, Schatten, Verläufe, andere Farben als Hamburg-Blau/Ink/Weiß.

---

## 6. Bildsprache

- Keine Fotos, keine KI-Bilder. Vier inline SVG-Illustrationen (Reparatur, Zubehör, Ankauf, SIM), Strich 2 px, runde Enden, genau eine blaue Akzentfläche je Motiv, Sky-200-Wolke als Grund.
- Icons: nie Emoji; nur SVG mit `aria-hidden`.
