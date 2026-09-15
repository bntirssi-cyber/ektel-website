# EKTEL Mobilfunk & Smartphones — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Ausnahme:** Tasks 1, 4, 13, 14 enthalten User-Gates (AskUserQuestion / impeccable-Entscheidungsseite / Browser-Inspektion) und laufen **inline** in der Hauptsession, nicht in Subagenten.

**Goal:** Eine vollständige, statische, deutschsprachige Website (4 Seiten + Datenschutz) für den Handyladen EKTEL Mobilfunk & Smartphones im Bahnhof Hamburg-Altona — mit Vanta-CLOUDS-Hero, Liquid-Glass-Oberflächen und allen installierten Website-Skills in der Pipeline.

**Architecture:** Astro 5 (`output: 'static'`) + Tailwind v4 (`@tailwindcss/vite`), kein UI-Framework. Alle Fakten zum Laden leben in `src/data/shop.ts`. Ein einziges Client-Script lädt Vanta/three.js lazy als Island; alles andere ist HTML/CSS. Fonts, three.js und Vanta werden per npm gebündelt (keine Drittanfragen → DSGVO-sauber).

**Tech Stack:** Astro ^7.3 (aktuell; Plan ursprünglich 5.x), Tailwind ^4.1, TypeScript, Vitest ^3, three@0.134.0, vanta@0.5.24, @fontsource-variable/bricolage-grotesque, @fontsource-variable/figtree, @astrojs/sitemap, @astrojs/check.

**Spec:** Design-Zusammenfassung unten unter „Kontext & Spec" (wird in Task 0 nach `docs/superpowers/specs/2026-09-16-ektel-website-design.md` kopiert).

---

## Kontext & Spec

**Warum:** Der Laden hat keine Website (ektel.de ist geparkt und steht zum Verkauf). Kunden finden ihn nur über Branchenverzeichnisse. Ziel: eine schnelle, vertrauenswürdige Präsenz mit Anruf-/Anfahrt-CTAs, Leistungsübersicht, Öffnungszeiten und rechtssicheren Pflichtseiten.

**Recherchierte Fakten (Quellen: Gelbe Seiten, FlinkFix, bahnhof.de, nochoffen.de, stadtbranche.de, Cylex, meinestadt):**

| Feld | Wert | Status |
|---|---|---|
| Name | EKTEL Mobilfunk & Smartphones | gesichert |
| Inhaberin | Aysun Eker | gesichert |
| Adresse | Paul-Nevermann-Platz 12, 22765 Hamburg-Altona | gesichert |
| Lage | Bahnhof Hamburg-Altona, Ebene 1, Ausgang Ottenser Hauptstraße | gesichert (bahnhof.de) |
| Telefon | +49 40 39903730 | gesichert |
| Öffnungszeiten | Mo–Sa 08:30–20:30, So & Feiertage 10:00–18:00 | bahnhof.de (andere Verzeichnisse: 09–21) → **⚠︎ bestätigen** |
| Leistungen | Reparatur (Display u. a.), Verkauf Smartphones/Tablets/Zubehör, Ankauf, Sofortservice, SIM-Karten/Tarife, Hilfe bei Einstellungen | gesichert |
| Marken | Samsung, Apple, Sony | gesichert |
| Bewertungen | „Excellent", 818 Google-Rezensionen (FlinkFix) | Sternwert unbekannt → „über 800 Bewertungen" |
| Zahlung | Bar (bahnhof.de) | **⚠︎ Karte? bestätigen** |
| E-Mail | unbekannt | **⚠︎ Platzhalter** |
| Reparaturpreise | unbekannt | **keine Zahlen erfinden → „auf Anfrage"** |

**Entscheidungen des Users:** Astro/Vite · **keine KI-Bilder** → inline SVG-Illustrationen (lizenzfrei, kein Bild-Download; echte Fotos später austauschbar) · 4 Seiten (Start, Leistungen, Kontakt, Impressum + Datenschutz als zwei Routen) · Look „Hell & luftig: Liquid Glass über Wolken" · Ablauf A (Impeccable-Pipeline) · Formular bleibt drin.

**Seiten:**
- `/` Hero (Vanta CLOUDS + Glas-Panel, CTAs „Anrufen" / „Route planen"), Leistungs-Teaser (4 Kacheln, bewusst ungleich), Jetzt-geöffnet-Badge, Vertrauensblock (800+ Bewertungen, Lage im Bahnhof), Anfahrt-Kurzblock.
- `/leistungen` Reparatur (Display, Akku, Ladebuchse, Wasserschaden, Datenrettung, Software), Verkauf & Zubehör, Ankauf, SIM & Tarife, Sofortservice.
- `/kontakt` Adresse, Telefon, Öffnungszeiten-Tabelle, Zwei-Klick-Karte, Anfahrt (S-Bahn/Bus), Anfrageformular.
- `/impressum`, `/datenschutz`.

**Look:** Heller Himmel, Glas-Panels („Frosted" für Textpanels, „Balanced" für Kacheln), Akzent Hamburg-Blau `#0E5FB5`, Display-Font Bricolage Grotesque, Body Figtree. Bildsprache: vier inline SVG-Illustrationen (Reparatur, Zubehör, Ankauf, SIM) in einheitlichem Strich (2 px, abgerundet, Akzentblau + Ink) statt Fotos. Vanta = einziger animierter Moment. Keine SaaS-Card-Kits, keine Eyebrow-Labels, keine Gradient-Texte, keine Emoji-Icons.

**Performance/A11y:** Vanta lazy (IntersectionObserver), destroy offscreen/hidden, `prefers-reduced-motion` → statischer CSS-Himmel, Pixel-Ratio-Cap 2. Skip-Link, Fokusringe, Kontrast ≥ 4,5:1, Touch-Ziele ≥ 44 px, `min-h-dvh`. Keine Rasterbilder außer `public/og.jpg` → sehr kleines Seitengewicht.

**Skill-Zuordnung (alle Website-Skills, in Reihenfolge):**

| Task | Skill / Tool |
|---|---|
| 0 | superpowers:using-git-worktrees (nur `git init`, kein Worktree nötig) |
| 1 | impeccable `init` (PRODUCT.md) |
| 2 | ui-ux-pro-max:ui-ux-pro-max (`--design-system --persist`), ui-ux-pro-max:design (`logo/search.py` Brief) |
| 3 | ui-ux-pro-max:brand (brand-guidelines.md) |
| 4 | frontend-design:frontend-design (Token-/Layout-Plan) → impeccable new-work (`concept-seed`, `serve-question`, `surface-brief write`) |
| 5 | ui-ux-pro-max:design-system + ui-ux-pro-max:ui-styling (Tailwind-v4-`@theme`-Tokens) |
| 6, 10 | superpowers:test-driven-development |
| 7 | liquid-glass-ui (Glas-Rezepte), impeccable craft-floor |
| 7b | Scroll-Telefon (Kundenwunsch): OpenCV-Frames, Canvas-Scrubbing |
| 8 | frontend-design (Illustrationsstil), impeccable craft-floor (keine Emoji-Icons, konsistente Strichstärke) |
| 11 | ui-ux-pro-max:banner-design (OG-Bild 1200×630) |
| 12 | impeccable `harden`, `adapt`, `optimize` |
| 13 | `run`-Skill (Dev-Server + Screenshots), impeccable `detect` |
| 14 | impeccable-finish-reviewer, impeccable-documenter (DESIGN.md) |
| 15 | impeccable `audit`, claude-mem:design-is, superpowers:verification-before-completion, superpowers:requesting-code-review, code-review |

**Bekannte Skill-Konflikte & Auflösung:**
- Drei Token-Besitzer (impeccable DESIGN.md, ui-ux-pro-max MASTER.md, brand/design-system `assets/design-tokens.*`): MASTER.md und brand-guidelines sind **Inputs**; einzige Laufzeitquelle ist `src/styles/global.css` (`@theme`). `sync-brand-to-tokens.cjs` **nicht** ausführen. DESIGN.md schreibt der Documenter **nach** dem Build.
- „Glas als Dekoration" ist in craft-floor verboten → Glas wird im OWN-WORLD-Block des Direction-Contracts mit Rolle festgeschrieben (Panels schweben über dem Himmel/Wolkenfeld).
- Font-Bann (Inter/DM Sans/Space Grotesk/Playfair/Fraunces/Outfit/Plus Jakarta als Display): Suchergebnisse dagegen filtern. Fallback: Bricolage Grotesque / Figtree.
- Motion: keine GSAP-Scroll-Reveals; Vanta ist der eine Moment.
- Tailwind: **v4** (`@import "tailwindcss"`, `@theme`) — design-system-Referenz für v3 ignorieren.

---

## Global Constraints

- Sprache der Site: Deutsch, Anrede **„Sie"**, Sentence case, aktive Verben; CTAs benennen die Handlung („Jetzt anrufen", „Route planen", „Anfrage senden").
- Keine erfundenen Fakten: keine Preise, keine Sternwerte, keine wörtlichen Kundenzitate. Unbekanntes als `⚠︎ BITTE PRÜFEN` in `README.md` → „Offene Punkte" listen.
- Alle Ladenfakten ausschließlich aus `src/data/shop.ts` (kein Hardcoding in Seiten).
- Keine Drittanfragen ohne Einwilligung: Fonts/three/vanta gebündelt; Google Maps nur nach Klick.
- Node ≥ 20, Astro ^5.13, Tailwind ^4.1, three **exakt** `0.134.0`, vanta `0.5.24`.
- Craft-Floor (impeccable) gilt für jede UI-Änderung: Kontrast 4,5:1, Zeilenlänge 65–75ch, ein autorisierter Motion-Moment, themed Selection/Fokusring, keine Eyebrow-Labels, keine Gradient-Texte, kein `border-left > 1px` als Akzent, keine Emoji-Icons.
- Commits: Conventional Commits, jede Commit-Message endet mit `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- Working directory: `D:\website sales neu` (Leerzeichen im Pfad → in Shell immer quoten).

---

## Dateistruktur

```
D:\website sales neu\
├─ package.json · astro.config.mjs · tsconfig.json · vitest.config.ts · .gitignore · .env.example · README.md
├─ .claude/launch.json                 (Dev-Server für den run-Skill / Browser-Pane)
├─ PRODUCT.md                          (impeccable init, Task 1)
├─ DESIGN.md · .impeccable/            (impeccable documenter/brief/review, Tasks 4, 13, 14)
├─ design-system/ektel/MASTER.md       (ui-ux-pro-max persist, Task 2)
├─ docs/brand-guidelines.md            (brand, Task 3)
├─ docs/superpowers/specs/2026-09-16-ektel-website-design.md
├─ docs/superpowers/plans/2026-09-16-ektel-website.md
├─ public/robots.txt · public/favicon.svg · public/og.jpg
├─ scripts/make-og.mjs                 (OG-Bild-Komposition mit sharp, Task 11)
├─ src/
│  ├─ data/shop.ts                     (einzige Faktenquelle)
│  ├─ lib/opening-hours.ts             (getOpenStatus)
│  ├─ lib/validate-inquiry.ts          (validateInquiry)
│  ├─ styles/global.css                (Tailwind @theme Tokens + Glas-Klassen)
│  ├─ types/vanta.d.ts
│  ├─ layouts/BaseLayout.astro
│  ├─ components/ Logo · Header · Footer · Seo · GlassPanel · VantaHero · OpenBadge · ServiceIllustration · ServiceTile · HoursTable · MapConsent · ContactForm · TrustStrip
│  ├─ scripts/ vanta-hero.ts · open-badge.ts · map-consent.ts · contact-form.ts
│  └─ pages/ index.astro · leistungen.astro · kontakt.astro · impressum.astro · datenschutz.astro
└─ tests/ opening-hours.test.ts · validate-inquiry.test.ts
```

---

### Task 0: Repo initialisieren, Spec & Plan ablegen

**Files:**
- Create: `.gitignore`, `docs/superpowers/specs/2026-09-16-ektel-website-design.md`, `docs/superpowers/plans/2026-09-16-ektel-website.md`

- [ ] **Step 1: Git initialisieren**

```bash
cd "D:/website sales neu" && git init -b main
```

- [ ] **Step 2: `.gitignore` schreiben**

```gitignore
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
.impeccable/review/
.DS_Store
```

- [ ] **Step 3: Spec-Datei schreiben** — Inhalt = Abschnitt „Kontext & Spec" dieses Plans, 1:1 kopiert nach `docs/superpowers/specs/2026-09-16-ektel-website-design.md`.

- [ ] **Step 4: Plan kopieren** — diese Datei (`C:\Users\Bentr\.claude\plans\baue-eine-gesamte-website-curried-journal.md`) nach `docs/superpowers/plans/2026-09-16-ektel-website.md` kopieren.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "docs: add EKTEL website spec and implementation plan

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 1: impeccable `init` → PRODUCT.md (inline, User-Gate)

**Files:**
- Create: `PRODUCT.md`, `.impeccable/config.json`

- [ ] **Step 1: Skill laden und Kontext prüfen**

`Skill(skill: "impeccable:impeccable", args: "init")`, danach:

```bash
"C:\Users\Bentr\.claude\plugins\cache\impeccable\impeccable\4.3.1\skills\impeccable\scripts\impeccable.cmd" context
```
Erwartet: Directive `NO_PRODUCT_MD`.

- [ ] **Step 2: Interview führen** — `reference/init.md` folgen: 1–3 AskUserQuestion-Runden (Nutzer & Job, Mechanismus, Constraints/Assets, Stack). Vorbelegte Antworten aus der Spec anbieten: Nutzer = Pendler/Anwohner Altona mit kaputtem/altem Handy; Job = schnell Reparatur/Kauf/Ankauf im Bahnhof erledigen; Stack = Astro 5 + Tailwind 4 statisch; Assets = keine Fotos, inline SVG-Illustrationen (Task 8) + SVG-Wortmarke.

- [ ] **Step 3: PRODUCT.md schreiben** mit `<!-- impeccable:product-schema 1 -->` und den Sektionen Platform/Stack/Users/Product Purpose/Positioning/Operating Context/Capabilities/Brand Commitments/Evidence on Hand/Product Principles/Accessibility. Unter „Brand Commitments" eintragen: *„Liquid-Glass-Oberflächen über einem animierten Wolkenhimmel (Vanta CLOUDS) sind vom Auftraggeber gesetzt."* Unter „Evidence on Hand": die Faktentabelle aus der Spec.

- [ ] **Step 4: Build-Pfad festhalten** — `.impeccable/config.json`:

```json
{ "buildPath": "code" }
```
(Kein Bild-Key, keine Fotos gewünscht → code-led; Bildsprache = handgeschriebene SVG-Illustrationen.)

- [ ] **Step 5: Commit**

```bash
git add PRODUCT.md .impeccable/config.json && git commit -m "docs: add impeccable PRODUCT.md for EKTEL site

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: ui-ux-pro-max Design-System-Suche + Logo-Brief

**Files:**
- Create: `design-system/ektel/MASTER.md`, `design-system/ektel/pages/kontakt.md`, `docs/logo-brief.md`

**Produces:** Palette-/Font-/Style-Kandidaten als Input für Task 4 und 5.

- [ ] **Step 1: Skill laden** — `Skill(skill: "ui-ux-pro-max:ui-ux-pro-max")`.

- [ ] **Step 2: Design-System generieren und persistieren**

```bash
python "C:\Users\Bentr\.claude\plugins\cache\ui-ux-pro-max-skill\ui-ux-pro-max\2.13.0\.claude\skills\ui-ux-pro-max\scripts\search.py" "smartphone repair shop local service light airy glassmorphism trust Hamburg" --design-system -p "EKTEL" --variance 6 --motion 2 --density 3 --persist --output-dir "D:\website sales neu"
```
Erwartet: `design-system/ektel/MASTER.md` (Pattern, Style, Colors, Typography, Effects, Anti-Patterns). Niemals `--force`.

- [ ] **Step 3: Kontakt-Seiten-Override**

```bash
python "C:\Users\Bentr\.claude\plugins\cache\ui-ux-pro-max-skill\ui-ux-pro-max\2.13.0\.claude\skills\ui-ux-pro-max\scripts\search.py" "contact page form map opening hours local business" --design-system -p "EKTEL" --page "kontakt" --persist --output-dir "D:\website sales neu"
```

- [ ] **Step 4: Ergänzende Suchen** (Ergebnisse als Notizen unten in MASTER.md anhängen, Abschnitt „Supplementary research"):

```bash
S="C:\Users\Bentr\.claude\plugins\cache\ui-ux-pro-max-skill\ui-ux-pro-max\2.13.0\.claude\skills\ui-ux-pro-max\scripts\search.py"
python "$S" "glassmorphism light" --domain style -n 3
python "$S" "local service trust blue" --domain color -n 5
python "$S" "modern geometric grotesque friendly" --domain typography -n 5
python "$S" "grotesque variable display" --domain google-fonts -n 5
python "$S" "hero social proof local business" --domain landing -n 5
python "$S" "focus visible skip link contrast reduced motion" --domain ux -n 8
python "$S" "islands client directive script" --stack astro -n 5
python "$S" "pixel ratio reduced motion canvas visibility" --stack threejs -n 5
python "$S" "backdrop blur card" --stack html-tailwind -n 3
```
Font-Ergebnisse gegen die impeccable-Bannliste filtern (Inter, DM Sans, Space Grotesk, Playfair, Fraunces, Outfit, Plus Jakarta als Display). Bleibt nichts Brauchbares → Bricolage Grotesque (Display) / Figtree (Body) verwenden und das in MASTER.md vermerken.

- [ ] **Step 5: Logo-Brief (ui-ux-pro-max:design, keyless Teil)** — `Skill(skill: "ui-ux-pro-max:design")` laden, dann:

```bash
python "C:\Users\Bentr\.claude\plugins\cache\ui-ux-pro-max-skill\ui-ux-pro-max\2.13.0\.claude\skills\design\scripts\logo\search.py" "EKTEL mobile phone repair shop wordmark tech trust" --design-brief -p "EKTEL"
```
Ausgabe nach `docs/logo-brief.md` schreiben (Stil, Farbe, Typo-Empfehlung für die SVG-Wortmarke in Task 5). **Keine** `generate.py`-Aufrufe (kein Key).

- [ ] **Step 6: Commit**

```bash
git add design-system docs/logo-brief.md && git commit -m "docs: add ui-ux-pro-max design system research and logo brief

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Brand Guidelines (Stimme, Messaging, Farben)

**Files:**
- Create: `docs/brand-guidelines.md`

- [ ] **Step 1: Skill laden** — `Skill(skill: "ui-ux-pro-max:brand")`.

- [ ] **Step 2: Template kopieren** von `C:\Users\Bentr\.claude\plugins\cache\ui-ux-pro-max-skill\ui-ux-pro-max\2.13.0\.claude\skills\brand\templates\brand-guidelines-starter.md` nach `docs/brand-guidelines.md`.

- [ ] **Step 3: Ausfüllen** — mindestens diese Inhalte:

```markdown
## Brand Voice
- Anrede: Sie. Ton: nahbar, direkt, hanseatisch-nüchtern, keine Superlative.
- Wir sagen: „Wir reparieren Ihr Display – meist noch am selben Tag." / Wir sagen nicht: „Beste Preise Hamburgs!"
## Messaging Pillars
1. Schnell erledigt, mitten im Bahnhof Altona (Lage, Öffnungszeiten 7 Tage)
2. Reparatur mit Augenmaß (Display, Akku, Ladebuchse; ehrliche Einschätzung vorab)
3. Kaufen, verkaufen, wechseln an einem Ort (Verkauf, Ankauf, SIM/Tarife)
4. Über 800 Google-Bewertungen
## Visual Identity
- Primary: Hamburg-Blau #0E5FB5 · Deep: #0A4B90 · Ink: #0F1B2D · Sky: #F3F8FD / #E3EEFA / #C6DCF3 · Open: #1B8A5A · Closed: #B4462B
- Display: Bricolage Grotesque Variable · Body: Figtree Variable (oder die in Task 2 gewählte, nicht gebannte Paarung)
- Logo: SVG-Wortmarke „EKTEL" (Task 5), Mindesthöhe 24 px, Schutzraum = Kapitälchenhöhe
```

- [ ] **Step 4: NICHT ausführen:** `scripts/sync-brand-to-tokens.cjs` (würde zweite Token-Quelle anlegen — Konflikt mit `global.css`).

- [ ] **Step 5: Commit**

```bash
git add docs/brand-guidelines.md && git commit -m "docs: add brand guidelines (voice, messaging, palette)

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: frontend-design Plan → impeccable Concept-Roll & Direction-Contract (inline, User-Gate)

**Files:**
- Create: `.impeccable/briefs/<target>.md` (via `surface-brief write`), `docs/design-notes.md`

- [ ] **Step 1: frontend-design laden** — `Skill(skill: "frontend-design:frontend-design")`. Zwei Pässe ausführen und Ergebnis nach `docs/design-notes.md` schreiben:
  1. Token-Plan: Color (die 6 Hex aus Task 3), Type (Display/Body + Rollen: H1 clamp(2.5rem,6vw,4.5rem), Body 1.0625rem, Zeilenlänge ≤ 72ch), Layout (ASCII-Wireframe je Seite; linksbündiges Raster 12 Spalten, Hero-Panel versetzt rechts), Prinzipien (ein Motion-Moment = Wolken; Glas nur wo Himmel dahinter ist; Kacheln in zwei Größen).
  2. Anti-Default-Check gegen die Avoid-Liste (kein Card-Kit, kein Eyebrow, kein `→` auf Buttons, keine 01/02/03-Nummern) — jede Abweichung begründen.

- [ ] **Step 2: impeccable new-work starten** — `Skill(skill: "impeccable:impeccable", args: "shape")` bzw. `reference/new-work.md` folgen. Modus **Persuade**. Die 2–3 Fragen (wer muss handeln / welcher Beweis / was bleibt unangetastet) per AskUserQuestion stellen, Vorschläge: Pendler mit Display-Schaden → ruft an oder kommt vorbei; Beweis = 800+ Bewertungen + Lage im Bahnhof; unangetastet = Wolken + Glas.

- [ ] **Step 3: Concept-Seed rollen (Pflicht, kein Ersatz)**

```bash
"C:\Users\Bentr\.claude\plugins\cache\impeccable\impeccable\4.3.1\skills\impeccable\scripts\impeccable.cmd" concept-seed --scope direction --mode persuade
```

- [ ] **Step 4: Entscheidungsseite servieren**

```bash
IMP="C:\Users\Bentr\.claude\plugins\cache\impeccable\impeccable\4.3.1\skills\impeccable\scripts\impeccable.cmd"
"$IMP" serve-question --schema
"$IMP" serve-question --start --payload "C:\Users\Bentr\AppData\Local\Temp\claude\D--website-sales-neu\abb42ac6-589e-4287-836d-ee2e0db8eb3a\scratchpad\direction-question.json"
"$IMP" serve-question --wait --key <key-aus-start-output>
```
Payload enthält: gedealte Richtung, Challenger, IMPECCABLE'S PICK, Canon-Exit. Exit-Code 2 → Fallback AskUserQuestion. **Constraint an alle Kandidaten:** hell, Wolken-Hero, Glas-Panels (User-Vorgabe; „the brief wins").

- [ ] **Step 5: Direction-Contract schreiben**

```bash
"$IMP" surface-brief write "src/pages/index.astro" "docs/design-notes.md"
```
Body mit den sechs Blöcken THESIS / OWN-WORLD (Glas + Wolken mit Rolle: *„Panels schweben wie Anzeigetafeln über dem Himmel des Bahnhofsvorplatzes"*) / STORY / FIRST VIEWPORT / FORM (Seed-Key) / FINISH-Zeile. Nie in HTML kopieren.

- [ ] **Step 6: craft-floor lesen** — `C:\Users\Bentr\.claude\plugins\cache\impeccable\impeccable\4.3.1\skills\impeccable\reference\craft-floor.md` vollständig lesen (Pflicht vor jeder UI-Änderung ab Task 5).

- [ ] **Step 7: Commit**

```bash
git add .impeccable docs/design-notes.md && git commit -m "docs: record direction contract and design notes

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Astro-Scaffold, Tokens, Layout, Header/Footer/Logo

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `.env.example`, `.claude/launch.json`, `src/styles/global.css`, `src/types/vanta.d.ts`, `src/layouts/BaseLayout.astro`, `src/components/Logo.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Seo.astro`, `src/pages/index.astro` (Platzhalter), `public/robots.txt`, `public/favicon.svg`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Produces: `BaseLayout` Props `{ title: string; description: string; ogImage?: string }`; `Seo` Props gleich; CSS-Klassen `.glass-frosted`, `.glass-balanced`, `.btn-primary`, `.btn-ghost`, `.prose-measure`.

- [ ] **Step 1: Skills laden** — `Skill(skill: "ui-ux-pro-max:design-system")` und `Skill(skill: "ui-ux-pro-max:ui-styling")` (nur Tailwind-v4-`@theme`- und Responsive-/A11y-Teile anwenden; kein shadcn, kein React).

- [ ] **Step 2: package.json**

```json
{
  "name": "ektel-website",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.4.0",
    "@fontsource-variable/bricolage-grotesque": "^5.2.0",
    "@fontsource-variable/figtree": "^5.2.0",
    "@tailwindcss/vite": "^4.1.0",
    "astro": "^5.13.0",
    "tailwindcss": "^4.1.0",
    "three": "0.134.0",
    "vanta": "0.5.24"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@types/three": "0.134.0",
    "typescript": "^5.6.0",
    "vitest": "^3.2.0"
  }
}
```

```bash
cd "D:/website sales neu" && npm install
```

- [ ] **Step 3: astro.config.mjs, tsconfig.json, vitest.config.ts, .env.example, launch.json**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://ektel-altona.de', // ⚠︎ BITTE PRÜFEN: finale Domain
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

```json
// tsconfig.json
{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "src/**/*", "tests/**/*"], "exclude": ["dist"] }
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] } });
```

```dotenv
# .env.example
SITE_URL=https://ektel-altona.de
PUBLIC_FORM_ENDPOINT=            # z.B. https://formspree.io/f/xxxx — leer = mailto-Fallback
```

```json
// .claude/launch.json
{ "version": "0.0.1", "configurations": [ { "name": "ektel-dev", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 4321 } ] }
```

- [ ] **Step 4: Smoke-Test schreiben (schlägt fehl, bis Tokens existieren)**

```ts
// tests/smoke.test.ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

describe('design tokens', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  it('defines the accent color once in @theme', () => {
    expect(css).toMatch(/--color-accent-600:\s*#0E5FB5/i);
  });
  it('provides a no-backdrop-filter fallback for glass', () => {
    expect(css).toMatch(/@supports not \(backdrop-filter/);
  });
});
```

```bash
npm test
```
Erwartet: FAIL (Datei fehlt).

- [ ] **Step 5: global.css (Tokens + Glas + Buttons)**

```css
@import "tailwindcss";
@import "@fontsource-variable/bricolage-grotesque";
@import "@fontsource-variable/figtree";

@theme {
  --font-display: "Bricolage Grotesque Variable", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Figtree Variable", ui-sans-serif, system-ui, sans-serif;
  --color-sky-50: #F3F8FD;
  --color-sky-100: #E3EEFA;
  --color-sky-200: #C6DCF3;
  --color-ink-900: #0F1B2D;
  --color-ink-700: #2A3950;
  --color-ink-500: #55647A;
  --color-accent-600: #0E5FB5;
  --color-accent-700: #0A4B90;
  --color-open-600: #1B8A5A;
  --color-closed-600: #B4462B;
  --radius-panel: 1.5rem;
  --radius-tile: 1.125rem;
}

:root {
  --lq-tint-frost: rgba(255, 255, 255, 0.62);
  --lq-tint-balanced-hi: rgba(255, 255, 255, 0.28);
  --lq-tint-balanced-lo: rgba(255, 255, 255, 0.10);
  --lq-rim-hi: rgba(255, 255, 255, 0.55);
  --lq-shadow: 0 18px 50px -24px rgba(15, 27, 45, 0.35);
  color-scheme: light;
}

@layer base {
  html { font-family: var(--font-body); color: var(--color-ink-900); background: var(--color-sky-50); scroll-behavior: smooth; }
  h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.01em; text-wrap: balance; }
  ::selection { background: var(--color-accent-600); color: #fff; }
  :focus-visible { outline: 3px solid var(--color-accent-600); outline-offset: 3px; border-radius: 4px; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
}

@layer components {
  .glass-frosted {
    background: var(--lq-tint-frost);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid var(--lq-rim-hi);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.7), var(--lq-shadow);
    border-radius: var(--radius-panel);
  }
  .glass-balanced {
    background: linear-gradient(160deg, var(--lq-tint-balanced-hi), var(--lq-tint-balanced-lo));
    backdrop-filter: blur(6px) saturate(130%);
    -webkit-backdrop-filter: blur(6px) saturate(130%);
    border: 1px solid rgba(255,255,255,.45);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.6), var(--lq-shadow);
    border-radius: var(--radius-tile);
  }
  @supports not (backdrop-filter: blur(1px)) {
    .glass-frosted { background: rgba(255,255,255,.94); }
    .glass-balanced { background: rgba(255,255,255,.88); }
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: .5rem; min-height: 3rem; padding: .75rem 1.5rem;
    border-radius: 999px; background: var(--color-accent-600); color: #fff; font-weight: 600;
    transition: background-color .15s ease;
  }
  .btn-primary:hover { background: var(--color-accent-700); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: .5rem; min-height: 3rem; padding: .75rem 1.5rem;
    border-radius: 999px; border: 1px solid var(--color-ink-700); color: var(--color-ink-900); font-weight: 600;
  }
  .prose-measure { max-width: 68ch; }
}
```

```bash
npm test
```
Erwartet: PASS (2 Tests).

- [ ] **Step 6: vanta.d.ts**

```ts
// src/types/vanta.d.ts
declare module 'vanta/dist/vanta.clouds.min' {
  export interface VantaEffect {
    destroy(): void;
    resize(): void;
    renderer?: { setPixelRatio(ratio: number): void };
  }
  const CLOUDS: (options: Record<string, unknown>) => VantaEffect;
  export default CLOUDS;
}
```

- [ ] **Step 7: Logo.astro (SVG-Wortmarke, aus docs/logo-brief.md abgeleitet)**

```astro
---
interface Props { class?: string; title?: string }
const { class: cls = 'h-7', title = 'EKTEL' } = Astro.props;
---
<svg class={cls} viewBox="0 0 140 32" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="4" width="24" height="24" rx="7" fill="var(--color-accent-600)" />
  <path d="M7 11h10M7 16h8M7 21h10" stroke="#fff" stroke-width="2.4" stroke-linecap="round" />
  <text x="32" y="24" font-family="Bricolage Grotesque Variable, system-ui, sans-serif" font-weight="700" font-size="22" fill="currentColor" letter-spacing="0.5">EKTEL</text>
</svg>
```

- [ ] **Step 8: Seo.astro (Meta + JSON-LD aus shop.ts — shop.ts entsteht in Task 6; hier zunächst ohne JSON-LD, Task 6 ergänzt)**

```astro
---
interface Props { title: string; description: string; ogImage?: string }
const { title, description, ogImage = '/og.jpg' } = Astro.props;
const site = Astro.site ?? new URL('http://localhost:4321');
const canonical = new URL(Astro.url.pathname, site);
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL(ogImage, site)} />
<meta property="og:locale" content="de_DE" />
<meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 9: Header.astro (sticky, Glas, `<details>`-Menü ohne JS)**

```astro
---
import Logo from './Logo.astro';
const items = [ ['/', 'Start'], ['/leistungen', 'Leistungen'], ['/kontakt', 'Kontakt'] ];
const path = Astro.url.pathname;
---
<header class="sticky top-0 z-40 px-4 pt-3">
  <div class="glass-frosted mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
    <a href="/" class="flex items-center text-ink-900" aria-label="EKTEL – Startseite"><Logo /></a>
    <nav aria-label="Hauptnavigation" class="hidden md:flex items-center gap-6">
      {items.map(([href, label]) => (
        <a href={href} aria-current={path === href ? 'page' : undefined}
           class="py-2 font-semibold text-ink-700 hover:text-accent-700 aria-[current=page]:text-accent-700">{label}</a>
      ))}
      <a href="tel:+494039903730" class="btn-primary">Jetzt anrufen</a>
    </nav>
    <details class="md:hidden relative">
      <summary class="btn-ghost list-none cursor-pointer" aria-label="Menü öffnen">Menü</summary>
      <div class="glass-frosted absolute right-0 mt-2 flex w-56 flex-col gap-1 p-2">
        {items.map(([href, label]) => <a href={href} class="rounded-lg px-3 py-3 font-semibold hover:bg-sky-100">{label}</a>)}
        <a href="tel:+494039903730" class="btn-primary mt-1 justify-center">Jetzt anrufen</a>
      </div>
    </details>
  </div>
</header>
```
(Telefonnummer wird in Task 6 durch `shop.phone` ersetzt.)

- [ ] **Step 10: Footer.astro**

```astro
---
const year = new Date().getFullYear();
---
<footer class="mt-24 border-t border-sky-200 bg-sky-100/60 px-4 py-10 text-sm text-ink-700">
  <div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
    <div><p class="font-display text-lg font-bold text-ink-900">EKTEL Mobilfunk & Smartphones</p><p>Paul-Nevermann-Platz 12<br />22765 Hamburg-Altona</p></div>
    <div><p class="font-semibold text-ink-900">Öffnungszeiten</p><p>Mo–Sa 08:30–20:30 Uhr<br />So & Feiertage 10:00–18:00 Uhr</p></div>
    <nav aria-label="Rechtliches" class="flex flex-col gap-2"><a href="/impressum" class="hover:text-accent-700">Impressum</a><a href="/datenschutz" class="hover:text-accent-700">Datenschutz</a></nav>
  </div>
  <p class="mx-auto mt-8 max-w-6xl">© {year} EKTEL Mobilfunk & Smartphones · Inh. Aysun Eker</p>
</footer>
```
(Adresse/Zeiten werden in Task 6 aus `shop.ts` gerendert.)

- [ ] **Step 11: BaseLayout.astro**

```astro
---
import '../styles/global.css';
import Seo from '../components/Seo.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
interface Props { title: string; description: string; ogImage?: string }
const { title, description, ogImage } = Astro.props;
---
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <Seo {title} {description} {ogImage} />
  </head>
  <body class="min-h-dvh flex flex-col">
    <a href="#inhalt" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn-primary">Zum Inhalt springen</a>
    <Header />
    <main id="inhalt" class="flex-1"><slot /></main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 12: Platzhalter-Startseite, robots.txt, favicon.svg**

```astro
---
// src/pages/index.astro (wird in Task 7/9 ersetzt)
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="EKTEL Mobilfunk & Smartphones – Bahnhof Altona" description="Smartphone-Reparatur, Verkauf und Ankauf im Bahnhof Hamburg-Altona.">
  <section class="mx-auto max-w-6xl px-4 py-24"><h1 class="text-5xl font-bold">EKTEL</h1></section>
</BaseLayout>
```

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://ektel-altona.de/sitemap-index.xml
```

```svg
<!-- public/favicon.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="8" fill="#0E5FB5"/><path d="M10 11h12M10 16h9M10 21h12" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>
```

- [ ] **Step 13: Build prüfen**

```bash
npm run build
```
Erwartet: `astro check` 0 errors, `dist/index.html` existiert.

- [ ] **Step 14: Commit**

```bash
git add -A && git commit -m "feat: scaffold Astro 5 + Tailwind 4 with design tokens, layout, header/footer

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Ladendaten + Öffnungszeiten-Logik (TDD) + OpenBadge + JSON-LD

**Files:**
- Create: `src/data/shop.ts`, `src/lib/opening-hours.ts`, `src/scripts/open-badge.ts`, `src/components/OpenBadge.astro`
- Modify: `src/components/Seo.astro` (JSON-LD), `src/components/Header.astro`, `src/components/Footer.astro` (Daten aus shop.ts)
- Test: `tests/opening-hours.test.ts`

**Interfaces:**
- Produces: `shop` (Objekt, s. u.), `getOpenStatus(now: Date, hours: WeekHours): { open: boolean; label: string }`, `<OpenBadge />`.

- [ ] **Step 1: TDD-Skill laden** — `Skill(skill: "superpowers:test-driven-development")`.

- [ ] **Step 2: shop.ts**

```ts
// src/data/shop.ts
import type { WeekHours } from '../lib/opening-hours';

export type IllustrationKind = 'repair' | 'accessories' | 'trade-in' | 'sim';
export interface Service { slug: string; title: string; summary: string; bullets: readonly string[]; illustration: IllustrationKind }

const weekday = { open: '08:30', close: '20:30' };

export const shop = {
  name: 'EKTEL Mobilfunk & Smartphones',
  shortName: 'EKTEL',
  owner: 'Aysun Eker',
  street: 'Paul-Nevermann-Platz 12',
  zip: '22765',
  city: 'Hamburg',
  district: 'Altona',
  locationHint: 'Bahnhof Hamburg-Altona · Ebene 1 · Ausgang Ottenser Hauptstraße',
  phone: '+494039903730',
  phoneDisplay: '040 399 037 30',
  email: 'info@ektel-altona.de', // ⚠︎ BITTE PRÜFEN – E-Mail nicht öffentlich belegt
  geo: { lat: 53.5526, lng: 9.9354 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=EKTEL+Mobilfunk+%26+Smartphones+Paul-Nevermann-Platz+12+22765+Hamburg',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Paul-Nevermann-Platz+12,+22765+Hamburg&output=embed',
  hours: { mon: weekday, tue: weekday, wed: weekday, thu: weekday, fri: weekday, sat: weekday, sun: { open: '10:00', close: '18:00' } } satisfies WeekHours,
  hoursNote: 'Sonn- und Feiertage 10:00–18:00 Uhr', // ⚠︎ BITTE PRÜFEN (bahnhof.de; Verzeichnisse nennen 09–21 Uhr)
  reviewCountLabel: 'über 800 Google-Bewertungen',
  brands: ['Samsung', 'Apple', 'Sony'],
  transit: ['S-Bahn S1, S3, S5 – Bahnhof Altona', 'Regional- und Fernverkehr – Bahnhof Altona', 'Bus 1, 2, 15, 20, 25, 37, 111, 150, 250, 283 – Bf. Altona'],
  services: [
    { slug: 'reparatur', title: 'Reparatur', summary: 'Display, Akku, Ladebuchse, Wasserschaden – ehrliche Einschätzung vorab, meist noch am selben Tag.', bullets: ['Display- und Glaswechsel', 'Akkutausch', 'Ladebuchse & Mikrofon', 'Wasserschaden-Reinigung', 'Software & Datenrettung', 'Preis nach kurzer Diagnose – auf Anfrage'], illustration: 'repair' },
    { slug: 'verkauf', title: 'Verkauf & Zubehör', summary: 'Neue und geprüfte gebrauchte Smartphones, Tablets und das passende Zubehör.', bullets: ['Samsung, Apple, Sony und weitere Marken', 'Hüllen, Panzerglas, Ladegeräte, Kopfhörer', 'Beratung ohne Fachchinesisch'], illustration: 'accessories' },
    { slug: 'ankauf', title: 'Ankauf', summary: 'Altes Gerät abgeben, faires Angebot mitnehmen – direkt vor Ort.', bullets: ['Bewertung in wenigen Minuten', 'Auszahlung sofort', 'Auch defekte Geräte auf Anfrage'], illustration: 'trade-in' },
    { slug: 'sim-tarife', title: 'SIM & Tarife', summary: 'SIM-Karten, Prepaid, Tarifwechsel und Hilfe bei Internet-Einstellungen.', bullets: ['Prepaid- und Vertragstarife', 'eSIM & Einrichtung', 'Datenübertragung aufs neue Gerät'], illustration: 'sim' },
  ] satisfies Service[],
} as const;
```
(Bus-/S-Bahn-Linien am Bf. Altona: **⚠︎ BITTE PRÜFEN** in README listen.)

- [ ] **Step 3: Failing Test schreiben**

```ts
// tests/opening-hours.test.ts
import { describe, it, expect } from 'vitest';
import { getOpenStatus, type WeekHours } from '../src/lib/opening-hours';

const wd = { open: '08:30', close: '20:30' };
const hours: WeekHours = { mon: wd, tue: wd, wed: wd, thu: wd, fri: wd, sat: wd, sun: { open: '10:00', close: '18:00' } };

describe('getOpenStatus', () => {
  it('is open on a Tuesday at 10:00', () => {
    expect(getOpenStatus(new Date(2026, 8, 15, 10, 0), hours)).toEqual({ open: true, label: 'Jetzt geöffnet · bis 20:30 Uhr' });
  });
  it('is closed on a Tuesday at 21:00 and opens tomorrow', () => {
    expect(getOpenStatus(new Date(2026, 8, 15, 21, 0), hours)).toEqual({ open: false, label: 'Öffnet morgen um 08:30 Uhr' });
  });
  it('is closed Sunday 09:00 but opens later today', () => {
    expect(getOpenStatus(new Date(2026, 8, 20, 9, 0), hours)).toEqual({ open: false, label: 'Öffnet heute um 10:00 Uhr' });
  });
  it('is open Sunday 12:00', () => {
    expect(getOpenStatus(new Date(2026, 8, 20, 12, 0), hours).open).toBe(true);
  });
  it('names the next open day when tomorrow is closed', () => {
    const closedSun = { ...hours, sun: null };
    expect(getOpenStatus(new Date(2026, 8, 19, 21, 0), closedSun).label).toBe('Öffnet am Montag um 08:30 Uhr');
  });
});
```

```bash
npm test
```
Erwartet: FAIL — Modul `../src/lib/opening-hours` nicht gefunden.

- [ ] **Step 4: opening-hours.ts**

```ts
// src/lib/opening-hours.ts
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export interface DayHours { open: string; close: string }
export type WeekHours = Record<DayKey, DayHours | null>;
export interface OpenStatus { open: boolean; label: string }

const ORDER: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const DAY_NAMES: Record<DayKey, string> = { mon: 'Montag', tue: 'Dienstag', wed: 'Mittwoch', thu: 'Donnerstag', fri: 'Freitag', sat: 'Samstag', sun: 'Sonntag' };

const toMinutes = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export function getOpenStatus(now: Date, hours: WeekHours): OpenStatus {
  const todayKey = ORDER[now.getDay()];
  const today = hours[todayKey];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (today && nowMin >= toMinutes(today.open) && nowMin < toMinutes(today.close)) {
    return { open: true, label: `Jetzt geöffnet · bis ${today.close} Uhr` };
  }
  if (today && nowMin < toMinutes(today.open)) {
    return { open: false, label: `Öffnet heute um ${today.open} Uhr` };
  }
  for (let i = 1; i <= 7; i++) {
    const key = ORDER[(now.getDay() + i) % 7];
    const day = hours[key];
    if (day) return { open: false, label: `Öffnet ${i === 1 ? 'morgen' : `am ${DAY_NAMES[key]}`} um ${day.open} Uhr` };
  }
  return { open: false, label: 'Derzeit geschlossen' };
}

/** Aktuelle Uhrzeit in Hamburg, unabhängig von der Zeitzone des Besuchers. */
export function nowInHamburg(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
}
```

```bash
npm test
```
Erwartet: PASS (7 Tests inkl. smoke).

- [ ] **Step 5: OpenBadge.astro + open-badge.ts**

```astro
---
// src/components/OpenBadge.astro
interface Props { class?: string }
const { class: cls = '' } = Astro.props;
---
<p data-open-badge class={`inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-sm font-semibold text-ink-700 ${cls}`} aria-live="polite">
  <span data-dot class="size-2.5 rounded-full bg-ink-500" aria-hidden="true"></span>
  <span data-label>Öffnungszeiten: Mo–Sa 08:30–20:30, So 10–18 Uhr</span>
</p>
<script>import '../scripts/open-badge';</script>
```

```ts
// src/scripts/open-badge.ts
import { shop } from '../data/shop';
import { getOpenStatus, nowInHamburg } from '../lib/opening-hours';

for (const badge of document.querySelectorAll<HTMLElement>('[data-open-badge]')) {
  const { open, label } = getOpenStatus(nowInHamburg(), shop.hours);
  badge.querySelector('[data-label]')!.textContent = label;
  const dot = badge.querySelector<HTMLElement>('[data-dot]')!;
  dot.classList.remove('bg-ink-500');
  dot.classList.add(open ? 'bg-open-600' : 'bg-closed-600');
}
```

- [ ] **Step 6: Seo.astro um JSON-LD erweitern** — den folgenden Frontmatter-Teil mit dem bestehenden Frontmatter aus Task 5 zusammenführen (ein `---`-Block), das `<script>` unter die Meta-Tags setzen:

```astro
---
import { shop } from '../data/shop';
const spec = (Object.entries(shop.hours) as [string, { open: string; close: string } | null][])
  .filter(([, h]) => h)
  .map(([d, h]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' }[d], opens: h!.open, closes: h!.close }));
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'MobilePhoneStore', name: shop.name, telephone: shop.phone, url: Astro.site?.toString(),
  address: { '@type': 'PostalAddress', streetAddress: shop.street, postalCode: shop.zip, addressLocality: shop.city, addressCountry: 'DE' },
  geo: { '@type': 'GeoCoordinates', latitude: shop.geo.lat, longitude: shop.geo.lng },
  openingHoursSpecification: spec,
};
---
<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 7: Header/Footer auf shop.ts umstellen** — `tel:` → `` `tel:${shop.phone}` ``, Adresse/Zeiten aus `shop.street/zip/city`, `shop.hours.mon`, `shop.hoursNote`.

- [ ] **Step 8: Build + Tests**

```bash
npm test && npm run build
```
Erwartet: alle Tests PASS, Build ohne Fehler.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: add shop data, opening-hours logic with tests, open badge and LocalBusiness JSON-LD

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Glas-Panel, Vanta-Hero (lazy Island) und Startseiten-Hero

**Files:**
- Create: `src/components/GlassPanel.astro`, `src/components/VantaHero.astro`, `src/scripts/vanta-hero.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<GlassPanel variant="frosted" | "balanced" as="section"|"div"|"article" class>`; `<VantaHero>` mit Slot.

- [ ] **Step 1: Skills laden** — `Skill(skill: "liquid-glass-ui")` (Rezepte „Frosted"/„Balanced", Text-Shadow statt mehr Tint, Backdrop braucht Kontrast → Wolkendetail/Sonne im Vanta-Setup erhöhen) und craft-floor erneut lesen.

- [ ] **Step 2: GlassPanel.astro**

```astro
---
interface Props { variant?: 'frosted' | 'balanced'; as?: 'section' | 'div' | 'article'; class?: string }
const { variant = 'frosted', as: Tag = 'div', class: cls = '' } = Astro.props;
---
<Tag class={`${variant === 'frosted' ? 'glass-frosted' : 'glass-balanced'} ${cls}`}><slot /></Tag>
```

- [ ] **Step 3: vanta-hero.ts**

```ts
// src/scripts/vanta-hero.ts
import type { VantaEffect } from 'vanta/dist/vanta.clouds.min';

let effect: VantaEffect | null = null;
let loading = false;
let visible = false;

async function start(el: HTMLElement) {
  if (effect || loading) return;
  loading = true;
  const [{ default: CLOUDS }, THREE] = await Promise.all([import('vanta/dist/vanta.clouds.min'), import('three')]);
  effect = CLOUDS({
    el, THREE,
    mouseControls: true, touchControls: true, gyroControls: false,
    minHeight: 200.0, minWidth: 200.0,
    backgroundColor: 0xf3f8fd, skyColor: 0x8fbbea, cloudColor: 0xe6f0fb, cloudShadowColor: 0x5f8dc0,
    sunColor: 0xfff1d0, sunGlareColor: 0xffd7a0, sunlightColor: 0xfff6e8, speed: 0.8,
  });
  effect.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  el.dataset.vanta = 'on';
  loading = false;
}

function stop(el: HTMLElement) {
  effect?.destroy();
  effect = null;
  delete el.dataset.vanta;
}

export function initVantaHero() {
  const el = document.querySelector<HTMLElement>('[data-vanta-hero]');
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return; // statischer CSS-Himmel bleibt

  const io = new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    visible && !document.hidden ? start(el) : stop(el);
  }, { threshold: 0.05 });
  io.observe(el);

  document.addEventListener('visibilitychange', () => (document.hidden ? stop(el) : visible && start(el)));
  reduce.addEventListener('change', (ev) => { if (ev.matches) { io.disconnect(); stop(el); } else io.observe(el); });
}

initVantaHero();
```

- [ ] **Step 4: VantaHero.astro**

```astro
---
interface Props { class?: string }
const { class: cls = '' } = Astro.props;
---
<section data-vanta-hero class={`hero-sky relative isolate overflow-hidden ${cls}`} aria-labelledby="hero-title">
  <div class="relative z-10"><slot /></div>
</section>
<script>import '../scripts/vanta-hero';</script>
<style>
  .hero-sky { background: linear-gradient(180deg, #cfe3f8 0%, #eef5fc 60%, #f3f8fd 100%); min-height: 88dvh; }
  .hero-sky[data-vanta='on'] { background: transparent; }
  .hero-sky > canvas { position: absolute; inset: 0; z-index: 0; }
</style>
```

- [ ] **Step 5: index.astro Hero**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import VantaHero from '../components/VantaHero.astro';
import GlassPanel from '../components/GlassPanel.astro';
import OpenBadge from '../components/OpenBadge.astro';
import { shop } from '../data/shop';
---
<BaseLayout title="EKTEL Mobilfunk & Smartphones – Reparatur, Verkauf, Ankauf im Bahnhof Altona" description={`Smartphone-Reparatur, Verkauf, Ankauf und SIM-Karten direkt im Bahnhof Hamburg-Altona. ${shop.reviewCountLabel}. Mo–Sa 08:30–20:30, So 10–18 Uhr.`}>
  <VantaHero class="-mt-16 pt-16">
    <div class="mx-auto grid max-w-6xl items-end gap-8 px-4 pb-16 pt-24 md:grid-cols-12 md:pt-32">
      <GlassPanel as="div" variant="frosted" class="p-8 md:col-span-7 md:col-start-1 md:p-12">
        <OpenBadge class="mb-6" />
        <h1 id="hero-title" class="text-4xl font-bold leading-[1.05] md:text-6xl">Handy kaputt? Wir reparieren es – mitten im Bahnhof Altona.</h1>
        <p class="prose-measure mt-5 text-lg text-ink-700">Display, Akku, Ladebuchse: ehrliche Einschätzung vorab, meist noch am selben Tag fertig. Dazu Smartphones, Zubehör, Ankauf und SIM-Karten – sieben Tage die Woche.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${shop.phone}`} class="btn-primary">Jetzt anrufen</a>
          <a href={shop.mapsUrl} class="btn-ghost" rel="noopener" target="_blank">Route planen</a>
        </div>
      </GlassPanel>
      <GlassPanel as="div" variant="balanced" class="p-6 md:col-span-4 md:col-start-9">
        <p class="font-display text-3xl font-bold">{shop.reviewCountLabel}</p>
        <p class="mt-2 text-ink-700">{shop.locationHint}</p>
      </GlassPanel>
    </div>
  </VantaHero>
</BaseLayout>
```
Hinweis: Text auf Glas bekommt bei Bedarf `[text-shadow:0_1px_2px_rgba(0,0,8,.25)]` statt mehr Tint (liquid-glass-ui-Regel).

- [ ] **Step 6: Im Browser prüfen** — `Skill(skill: "run")` bzw. `mcp__Claude_Browser__preview_start` mit `name: "ektel-dev"`, dann `http://localhost:4321`. Direkt nach dem Laden Screenshot (CSS-Fallback-Himmel muss sichtbar sein, bevor Vanta lädt), 3 s warten (Filter dekodieren async), zweiter Screenshot: Wolken animieren, Panels lesbar. `javascript_tool`: `document.querySelector('[data-vanta-hero]').dataset.vanta` → `"on"`. Konsole ohne Fehler (`read_console_messages onlyErrors`). Dann `resize_window preset mobile`, Screenshot, zurück auf `desktop`.

- [ ] **Step 7: Build + Commit**

```bash
npm run build && git add -A && git commit -m "feat: add glass panel, lazy Vanta clouds hero and landing hero section

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7b: Scroll-gescrubbte Telefon-Explosionsansicht (Kundenwunsch 2026-09-16)

**Files:**
- Create: `scripts/extract-frames.py`, `public/phone/desktop/f0001.webp … f0080.webp`, `public/phone/mobile/…`, `public/phone/poster.webp`, `src/components/ScrollPhone.astro`, `src/scripts/scroll-phone.ts`
- Modify: `src/pages/index.astro` (Sektion direkt unter dem Hero)

**Quelle:** `header/tech header background anination.mp4` (1920×1080, 30 fps, 9,8 s; gewählt wegen höherer Bitrate). Beide Clips zeigen dieselbe Sequenz.

- [ ] **Step 1: Frames extrahieren (OpenCV, 80 Frames, WebP q80)**

```python
# scripts/extract-frames.py
import cv2, os, sys
SRC = 'header/tech header background anination.mp4'
N = 80
cap = cv2.VideoCapture(SRC); total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
for name, width in (('desktop', 1280), ('mobile', 720)):
    os.makedirs(f'public/phone/{name}', exist_ok=True)
    for i in range(N):
        cap.set(cv2.CAP_PROP_POS_FRAMES, round(i * (total - 1) / (N - 1)))
        ok, fr = cap.read()
        if not ok: sys.exit(f'frame {i} failed')
        h = round(fr.shape[0] * width / fr.shape[1])
        cv2.imwrite(f'public/phone/{name}/f{i+1:04d}.webp', cv2.resize(fr, (width, h), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_WEBP_QUALITY, 80])
cap.set(cv2.CAP_PROP_POS_FRAMES, total - 1); ok, fr = cap.read()
cv2.imwrite('public/phone/poster.webp', cv2.resize(fr, (1280, 720), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_WEBP_QUALITY, 82])
print('done')
```

```bash
python scripts/extract-frames.py && du -sh public/phone/desktop public/phone/mobile
```
Erwartet: 80 + 80 Dateien, Desktop-Set ≤ 4 MB.

- [ ] **Step 2: ScrollPhone.astro** — `<section>` mit `min-height: 300vh`; innen `position: sticky; top: 0; height: 100dvh` Container mit dunklem, glasgerahmtem Panel (`rounded-[var(--radius-panel)]`, `bg-[#2b2a2c]`, 1 px Lichtkante), `<canvas>` (aspect 16/9) + `<img src="/phone/poster.webp">` als noscript/reduced-motion-Fallback; daneben drei Textstufen (`data-step="0|1|2"`): „Display", „Akku & Ladebuchse", „Hauptplatine", jede mit einem Satz und Link `/leistungen#reparatur`. `aria-label="Smartphone in Einzelteilen"` am Canvas.

- [ ] **Step 3: scroll-phone.ts** — bei `prefers-reduced-motion` nichts tun (Poster bleibt). Sonst: IntersectionObserver (rootMargin 50 %) lädt das passende Set (`matchMedia('(min-width: 768px)')` → desktop) als `Image[]`, zeichnet Frame 1; `scroll`-Listener (passive) berechnet progress = (scrollY − sectionTop) / (sectionHeight − viewportHeight), clamp 0–1, Zielframe = round(progress·79); `requestAnimationFrame`-Loop lerpt den aktuellen Frame zum Ziel (Faktor 0.18) und zeichnet nur bei Änderung; `devicePixelRatio` cap 2 beim Canvas-Sizing; Textstufen: `data-active` bei progress < .33 / < .66 / sonst.

- [ ] **Step 4: Sichtprüfung** im Browser-Pane: Scrubben in beide Richtungen, Mobile 390, keine Layout-Sprünge (Canvas hat feste Aspect-Ratio), Konsole leer, Netzwerk: Frames laden erst bei Annäherung.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add scroll-scrubbed phone teardown section

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: SVG-Illustrationen (ServiceIllustration.astro)

**Files:**
- Create: `src/components/ServiceIllustration.astro`
- Test: `tests/illustration.test.ts`

**Interfaces:**
- Produces: `<ServiceIllustration kind="repair" | "accessories" | "trade-in" | "sim" class />` — dekoratives inline-SVG (`aria-hidden`), `viewBox 0 0 240 180`, Strich 2 px, Farben nur über `currentColor` + `var(--color-accent-600)` + `var(--color-sky-200)`.

- [ ] **Step 1: Stilregeln** — frontend-design + craft-floor: eine Strichstärke (2), runde Enden, keine Verläufe, kein Emoji, jede Illustration hat genau ein blaues Flächenelement (Akzent) und sonst Ink-Linien; Hintergrund-„Wolke" als Sky-200-Fläche.

- [ ] **Step 2: Failing Test** (prüft, dass jede Illustration existiert, dekorativ ist und den Strich einhält)

```ts
// tests/illustration.test.ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const src = readFileSync('src/components/ServiceIllustration.astro', 'utf8');

describe('ServiceIllustration', () => {
  it('covers all four kinds', () => {
    for (const k of ['repair', 'accessories', 'trade-in', 'sim']) expect(src).toContain(`kind === '${k}'`);
  });
  it('is decorative and uses one stroke width', () => {
    expect(src).toContain('aria-hidden="true"');
    expect(src).not.toMatch(/stroke-width="(?!2")/);
  });
});
```

```bash
npm test
```
Erwartet: FAIL — Datei fehlt.

- [ ] **Step 3: ServiceIllustration.astro**

```astro
---
interface Props { kind: 'repair' | 'accessories' | 'trade-in' | 'sim'; class?: string }
const { kind, class: cls = '' } = Astro.props;
---
<svg class={cls} viewBox="0 0 240 180" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
  <path d="M28 132c-12 0-18-10-12-19 4-6 12-7 17-4 2-12 18-16 26-8 8-9 26-6 28 6 10-1 16 9 11 17-3 5-9 8-16 8H28Z" fill="var(--color-sky-200)" stroke="none" />
  {kind === 'repair' && (<g>
    <rect x="86" y="30" width="68" height="124" rx="12" />
    <rect x="94" y="44" width="52" height="86" rx="4" fill="var(--color-accent-600)" stroke="none" />
    <path d="M110 84l-14 14M120 74l6-6M106 96l-8 8" stroke="#fff" />
    <path d="M168 62l30-30M198 32l10 10-8 8-10-10M168 62l-6 14 14-6" />
    <circle cx="120" cy="142" r="4" />
  </g>)}
  {kind === 'accessories' && (<g>
    <rect x="52" y="40" width="60" height="110" rx="12" />
    <rect x="60" y="52" width="44" height="76" rx="4" fill="var(--color-accent-600)" stroke="none" />
    <path d="M128 150c0-30 20-30 20-60 0-14 14-14 14 0v14" />
    <rect x="152" y="104" width="20" height="14" rx="3" />
    <circle cx="188" cy="60" r="12" /><circle cx="214" cy="60" r="12" /><path d="M200 60h2" />
    <path d="M188 72v20a8 8 0 0 0 8 8h10a8 8 0 0 0 8-8V72" />
  </g>)}
  {kind === 'trade-in' && (<g>
    <rect x="40" y="46" width="56" height="100" rx="10" />
    <rect x="48" y="58" width="40" height="66" rx="3" />
    <rect x="144" y="34" width="56" height="112" rx="10" />
    <rect x="152" y="46" width="40" height="78" rx="3" fill="var(--color-accent-600)" stroke="none" />
    <path d="M104 78h30l-8-8M134 78l-8 8M136 110h-30l8-8M106 110l8 8" />
  </g>)}
  {kind === 'sim' && (<g>
    <path d="M78 40h56l28 28v84a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8V48a8 8 0 0 1 8-8Z" />
    <rect x="86" y="96" width="60" height="44" rx="6" fill="var(--color-accent-600)" stroke="none" />
    <path d="M106 96v44M126 96v44M86 118h60" stroke="#fff" />
    <path d="M176 116a20 20 0 0 1 20 20M176 100a36 36 0 0 1 36 36M176 84a52 52 0 0 1 52 52" />
  </g>)}
</svg>
```

```bash
npm test
```
Erwartet: PASS.

- [ ] **Step 4: Sichtprüfung** — Dev-Server, temporär alle vier `kind`s auf `/` rendern (oder direkt in Task 9 prüfen): Illustrationen bei 240 px und 480 px Breite scharf, Akzentfläche jeweils genau eine.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceIllustration.astro tests/illustration.test.ts && git commit -m "feat: add inline SVG service illustrations

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Startseite fertigstellen + Leistungen-Seite

**Files:**
- Create: `src/components/ServiceTile.astro`, `src/components/TrustStrip.astro`, `src/pages/leistungen.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `shop.services`, `Service`-Typ, `GlassPanel`, `ServiceIllustration` (Task 8).
- Produces: `<ServiceTile service={Service} size="lg"|"md" />`, `<TrustStrip />`.

- [ ] **Step 1: ServiceTile.astro** (zwei Größen → kein uniformes Card-Kit; Illustration links bei `lg`)

```astro
---
import type { Service } from '../data/shop';
import ServiceIllustration from './ServiceIllustration.astro';
interface Props { service: Service; size?: 'lg' | 'md' }
const { service, size = 'md' } = Astro.props;
---
<article class={`glass-balanced overflow-hidden ${size === 'lg' ? 'md:col-span-7 grid md:grid-cols-2' : 'md:col-span-5'}`}>
  <div class={`flex items-center justify-center bg-white/40 text-ink-700 ${size === 'lg' ? 'p-8' : 'h-44 p-4'}`}>
    <ServiceIllustration kind={service.illustration} class={size === 'lg' ? 'w-full max-w-xs' : 'h-full'} />
  </div>
  <div class="p-6 md:p-8">
    <h3 class="text-2xl font-bold">{service.title}</h3>
    <p class="prose-measure mt-2 text-ink-700">{service.summary}</p>
    <a href={`/leistungen#${service.slug}`} class="mt-4 inline-block font-semibold text-accent-700 underline-offset-4 hover:underline">Mehr zu {service.title}</a>
  </div>
</article>
```

- [ ] **Step 2: TrustStrip.astro**

```astro
---
import { shop } from '../data/shop';
const facts = [
  [shop.reviewCountLabel, 'Bewertet von Kundinnen und Kunden aus Altona und ganz Hamburg.'],
  ['7 Tage die Woche', `Mo–Sa ${shop.hours.mon!.open}–${shop.hours.mon!.close}, So ${shop.hours.sun!.open}–${shop.hours.sun!.close} Uhr.`],
  ['Direkt im Bahnhof', shop.locationHint],
];
---
<section aria-labelledby="trust-title" class="mx-auto max-w-6xl px-4 py-16">
  <h2 id="trust-title" class="sr-only">Warum EKTEL</h2>
  <dl class="grid gap-6 md:grid-cols-3">
    {facts.map(([k, v]) => (<div class="border-t border-sky-200 pt-4"><dt class="font-display text-2xl font-bold">{k}</dt><dd class="mt-1 text-ink-700">{v}</dd></div>))}
  </dl>
</section>
```

- [ ] **Step 3: index.astro ergänzen** (unter dem Hero):

```astro
<section aria-labelledby="services-title" class="mx-auto max-w-6xl px-4 py-16">
  <h2 id="services-title" class="text-3xl font-bold md:text-4xl">Was wir für Sie tun</h2>
  <div class="mt-8 grid gap-6 md:grid-cols-12">
    <ServiceTile service={shop.services[0]} size="lg" />
    <ServiceTile service={shop.services[1]} />
    <ServiceTile service={shop.services[2]} />
    <ServiceTile service={shop.services[3]} size="lg" />
  </div>
</section>
<TrustStrip />
<section aria-labelledby="route-title" class="mx-auto max-w-6xl px-4 pb-8">
  <GlassPanel as="div" variant="frosted" class="grid gap-6 p-8 md:grid-cols-2 md:p-12">
    <div>
      <h2 id="route-title" class="text-3xl font-bold">So finden Sie uns</h2>
      <p class="mt-3 text-ink-700">{shop.street}, {shop.zip} {shop.city}<br />{shop.locationHint}</p>
    </div>
    <div class="flex flex-wrap items-start gap-3 md:justify-end">
      <a href={`tel:${shop.phone}`} class="btn-primary">{shop.phoneDisplay} anrufen</a>
      <a href="/kontakt" class="btn-ghost">Öffnungszeiten & Anfahrt</a>
    </div>
  </GlassPanel>
</section>
```
Imports für `ServiceTile`, `TrustStrip` ergänzen.

- [ ] **Step 4: leistungen.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import GlassPanel from '../components/GlassPanel.astro';
import ServiceIllustration from '../components/ServiceIllustration.astro';
import { shop } from '../data/shop';
---
<BaseLayout title="Leistungen – Reparatur, Verkauf, Ankauf, SIM | EKTEL Altona" description="Smartphone-Reparatur (Display, Akku, Ladebuchse), Verkauf, Ankauf und SIM-Karten bei EKTEL im Bahnhof Hamburg-Altona.">
  <section class="mx-auto max-w-6xl px-4 pb-8 pt-16">
    <h1 class="text-4xl font-bold md:text-5xl">Leistungen</h1>
    <p class="prose-measure mt-4 text-lg text-ink-700">Alles rund ums Smartphone an einem Ort – ohne Termin, sieben Tage die Woche.</p>
    <nav aria-label="Leistungen" class="mt-6 flex flex-wrap gap-2">
      {shop.services.map((s) => <a href={`#${s.slug}`} class="rounded-full border border-sky-200 bg-white/70 px-4 py-2 font-semibold hover:border-accent-600">{s.title}</a>)}
    </nav>
  </section>
  {shop.services.map((s, i) => (
    <section id={s.slug} aria-labelledby={`${s.slug}-title`} class="mx-auto max-w-6xl scroll-mt-24 px-4 py-10">
      <GlassPanel as="div" variant="frosted" class={`grid items-center gap-8 overflow-hidden md:grid-cols-2 ${i % 2 ? 'md:[&>figure]:order-2' : ''}`}>
        <figure class="flex h-full items-center justify-center bg-white/40 p-10 text-ink-700"><ServiceIllustration kind={s.illustration} class="w-full max-w-sm" /></figure>
        <div class="p-8 md:p-12">
          <h2 id={`${s.slug}-title`} class="text-3xl font-bold">{s.title}</h2>
          <p class="prose-measure mt-3 text-ink-700">{s.summary}</p>
          <ul class="mt-5 space-y-2">{s.bullets.map((b) => <li class="flex gap-3"><span aria-hidden="true" class="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600"></span><span>{b}</span></li>)}</ul>
          <a href={`tel:${shop.phone}`} class="btn-primary mt-8">Jetzt anrufen</a>
        </div>
      </GlassPanel>
    </section>
  ))}
  <section class="mx-auto max-w-6xl px-4 py-12">
    <p class="prose-measure text-ink-700">Preise nennen wir Ihnen nach einer kurzen Diagnose vor Ort oder am Telefon – ehrlich und ohne Überraschungen.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Build + Browser-Check** (`/` und `/leistungen`, Desktop + Mobile Screenshot; Anker-Navigation testen).

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: complete landing page sections and services page

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Kontaktseite — Öffnungszeiten, Zwei-Klick-Karte, Anfrageformular (TDD)

**Files:**
- Create: `src/lib/validate-inquiry.ts`, `src/components/HoursTable.astro`, `src/components/MapConsent.astro`, `src/scripts/map-consent.ts`, `src/components/ContactForm.astro`, `src/scripts/contact-form.ts`, `src/pages/kontakt.astro`
- Test: `tests/validate-inquiry.test.ts`

**Interfaces:**
- Produces: `validateInquiry(input: InquiryInput): { ok: boolean; errors: Partial<Record<keyof InquiryInput, string>> }`.

- [ ] **Step 1: Failing Test**

```ts
// tests/validate-inquiry.test.ts
import { describe, it, expect } from 'vitest';
import { validateInquiry } from '../src/lib/validate-inquiry';

const base = { name: 'Max Mustermann', phone: '040 123456', email: '', device: 'iPhone 13', message: 'Display gesprungen, Touch geht noch.', website: '' };

describe('validateInquiry', () => {
  it('accepts a valid inquiry with phone only', () => {
    expect(validateInquiry(base)).toEqual({ ok: true, errors: {} });
  });
  it('accepts email instead of phone', () => {
    expect(validateInquiry({ ...base, phone: '', email: 'max@example.de' }).ok).toBe(true);
  });
  it('requires a name', () => {
    expect(validateInquiry({ ...base, name: ' ' }).errors.name).toBe('Bitte geben Sie Ihren Namen an.');
  });
  it('requires phone or email', () => {
    expect(validateInquiry({ ...base, phone: '', email: '' }).errors.phone).toBe('Bitte Telefonnummer oder E-Mail angeben, damit wir Sie erreichen.');
  });
  it('requires a message of at least 10 characters', () => {
    expect(validateInquiry({ ...base, message: 'kaputt' }).errors.message).toBe('Bitte beschreiben Sie kurz das Problem (mindestens 10 Zeichen).');
  });
  it('rejects filled honeypot silently', () => {
    expect(validateInquiry({ ...base, website: 'http://spam' })).toEqual({ ok: false, errors: { website: 'spam' } });
  });
});
```

```bash
npm test
```
Erwartet: FAIL — Modul fehlt.

- [ ] **Step 2: validate-inquiry.ts**

```ts
// src/lib/validate-inquiry.ts
export interface InquiryInput { name: string; phone: string; email: string; device: string; message: string; website: string }
export interface ValidationResult { ok: boolean; errors: Partial<Record<keyof InquiryInput, string>> }

const PHONE = /^[+0-9 ()/-]{6,}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(i: InquiryInput): ValidationResult {
  if (i.website.trim() !== '') return { ok: false, errors: { website: 'spam' } };
  const errors: ValidationResult['errors'] = {};
  if (i.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.';
  if (!PHONE.test(i.phone.trim()) && !EMAIL.test(i.email.trim())) errors.phone = 'Bitte Telefonnummer oder E-Mail angeben, damit wir Sie erreichen.';
  if (i.message.trim().length < 10) errors.message = 'Bitte beschreiben Sie kurz das Problem (mindestens 10 Zeichen).';
  return { ok: Object.keys(errors).length === 0, errors };
}
```

```bash
npm test
```
Erwartet: PASS.

- [ ] **Step 3: HoursTable.astro**

```astro
---
import { shop } from '../data/shop';
import { DAY_NAMES, type DayKey } from '../lib/opening-hours';
const days = Object.keys(shop.hours) as DayKey[];
---
<table class="w-full text-left">
  <caption class="sr-only">Öffnungszeiten</caption>
  <tbody>
    {days.map((d) => { const h = shop.hours[d]; return (
      <tr class="border-t border-sky-200"><th scope="row" class="py-2 pr-4 font-semibold">{DAY_NAMES[d]}</th><td class="py-2">{h ? `${h.open}–${h.close} Uhr` : 'geschlossen'}</td></tr>
    ); })}
  </tbody>
</table>
<p class="mt-3 text-sm text-ink-500">{shop.hoursNote}</p>
```

- [ ] **Step 4: MapConsent.astro + map-consent.ts**

```astro
---
import { shop } from '../data/shop';
---
<div data-map-consent data-src={shop.mapsEmbedUrl} class="glass-balanced flex aspect-[4/3] flex-col items-center justify-center gap-4 p-6 text-center">
  <p class="prose-measure text-ink-700">Die Karte wird von Google Maps geladen. Dabei werden Daten an Google übertragen. <a href="/datenschutz#google-maps" class="underline">Mehr erfahren</a></p>
  <button type="button" data-map-load class="btn-primary">Karte laden</button>
  <a href={shop.mapsUrl} target="_blank" rel="noopener" class="text-sm underline">Oder direkt in Google Maps öffnen</a>
</div>
<script>import '../scripts/map-consent';</script>
```

```ts
// src/scripts/map-consent.ts
for (const box of document.querySelectorAll<HTMLElement>('[data-map-consent]')) {
  box.querySelector('[data-map-load]')?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = box.dataset.src!;
    iframe.title = 'Google Maps – Standort EKTEL, Paul-Nevermann-Platz 12, Hamburg';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'h-full w-full rounded-[var(--radius-tile)] border-0';
    box.replaceChildren(iframe);
    box.classList.remove('flex', 'flex-col', 'items-center', 'justify-center', 'p-6');
  });
}
```

- [ ] **Step 5: ContactForm.astro + contact-form.ts**

```astro
---
import { shop } from '../data/shop';
const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';
const fields = [
  { id: 'name', label: 'Name', type: 'text', autocomplete: 'name', required: true },
  { id: 'phone', label: 'Telefon', type: 'tel', autocomplete: 'tel', required: false },
  { id: 'email', label: 'E-Mail', type: 'email', autocomplete: 'email', required: false },
  { id: 'device', label: 'Gerät (z. B. Samsung Galaxy S23)', type: 'text', autocomplete: 'off', required: false },
];
---
<form data-contact-form data-endpoint={endpoint} data-mailto={shop.email} data-phone={shop.phoneDisplay} novalidate class="grid gap-5">
  {fields.map((f) => (
    <div class="grid gap-1.5">
      <label for={f.id} class="font-semibold">{f.label}{f.required && <span aria-hidden="true"> *</span>}</label>
      <input id={f.id} name={f.id} type={f.type} autocomplete={f.autocomplete} required={f.required} aria-describedby={`${f.id}-error`} class="min-h-12 rounded-xl border border-sky-200 bg-white/80 px-4" />
      <p id={`${f.id}-error`} data-error-for={f.id} class="hidden text-sm text-closed-600" aria-live="polite"></p>
    </div>
  ))}
  <div class="grid gap-1.5">
    <label for="message" class="font-semibold">Was ist passiert? *</label>
    <textarea id="message" name="message" rows="5" required aria-describedby="message-error" class="rounded-xl border border-sky-200 bg-white/80 px-4 py-3"></textarea>
    <p id="message-error" data-error-for="message" class="hidden text-sm text-closed-600" aria-live="polite"></p>
  </div>
  <p class="sr-only" aria-hidden="true"><label for="website">Website (bitte leer lassen)</label><input id="website" name="website" type="text" tabindex="-1" autocomplete="off" /></p>
  <p class="text-sm text-ink-500">Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Angaben zur Beantwortung der Anfrage zu. <a href="/datenschutz#kontaktformular" class="underline">Datenschutz</a></p>
  <button type="submit" class="btn-primary justify-self-start">Anfrage senden</button>
  <p data-status role="status" class="hidden font-semibold"></p>
</form>
<script>import '../scripts/contact-form';</script>
```

```ts
// src/scripts/contact-form.ts
import { validateInquiry, type InquiryInput } from '../lib/validate-inquiry';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const show = (el: HTMLElement, text: string) => { el.textContent = text; el.classList.remove('hidden'); };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form)) as unknown as InquiryInput;
    const { ok, errors } = validateInquiry(data);
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((p) => { p.textContent = ''; p.classList.add('hidden'); });
    form.querySelectorAll('input, textarea').forEach((i) => i.removeAttribute('aria-invalid'));
    if (!ok) {
      if (errors.website) return; // Honeypot: still schweigen
      for (const [field, msg] of Object.entries(errors)) {
        const p = form.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
        if (p) show(p, msg!);
        form.querySelector(`[name="${field}"]`)?.setAttribute('aria-invalid', 'true');
      }
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      const body = `Name: ${data.name}\nTelefon: ${data.phone}\nE-Mail: ${data.email}\nGerät: ${data.device}\n\n${data.message}`;
      window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent('Reparaturanfrage über die Website')}&body=${encodeURIComponent(body)}`;
      show(status, 'Ihr E-Mail-Programm öffnet sich mit der Anfrage.');
      return;
    }
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(status, 'Vielen Dank – wir melden uns so schnell wie möglich.');
    } catch {
      show(status, `Senden fehlgeschlagen. Rufen Sie uns gern an: ${form.dataset.phone}`);
    }
  });
}
```

- [ ] **Step 6: kontakt.astro**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import GlassPanel from '../components/GlassPanel.astro';
import HoursTable from '../components/HoursTable.astro';
import MapConsent from '../components/MapConsent.astro';
import ContactForm from '../components/ContactForm.astro';
import OpenBadge from '../components/OpenBadge.astro';
import { shop } from '../data/shop';
---
<BaseLayout title="Kontakt & Öffnungszeiten – EKTEL im Bahnhof Altona" description={`EKTEL Mobilfunk & Smartphones, ${shop.street}, ${shop.zip} ${shop.city}. Telefon ${shop.phoneDisplay}. Mo–Sa 08:30–20:30, So 10–18 Uhr.`}>
  <section class="mx-auto max-w-6xl px-4 pt-16">
    <h1 class="text-4xl font-bold md:text-5xl">Kontakt & Anfahrt</h1>
    <OpenBadge class="mt-4" />
  </section>
  <section class="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-12">
    <GlassPanel as="div" variant="frosted" class="p-8 md:col-span-5">
      <h2 class="text-2xl font-bold">Adresse</h2>
      <address class="mt-3 not-italic text-ink-700">{shop.name}<br />{shop.street}<br />{shop.zip} {shop.city}<br />{shop.locationHint}</address>
      <a href={`tel:${shop.phone}`} class="btn-primary mt-6">{shop.phoneDisplay} anrufen</a>
      <h2 class="mt-10 text-2xl font-bold">Öffnungszeiten</h2>
      <div class="mt-3"><HoursTable /></div>
      <h2 class="mt-10 text-2xl font-bold">Anfahrt</h2>
      <ul class="mt-3 space-y-1 text-ink-700">{shop.transit.map((t) => <li>{t}</li>)}</ul>
    </GlassPanel>
    <div class="md:col-span-7"><MapConsent /></div>
  </section>
  <section id="anfrage" class="mx-auto max-w-6xl px-4 py-10">
    <GlassPanel as="div" variant="frosted" class="p-8 md:p-12">
      <h2 class="text-3xl font-bold">Reparatur anfragen</h2>
      <p class="prose-measure mt-3 text-ink-700">Beschreiben Sie kurz Gerät und Problem – wir melden uns mit einer Einschätzung. Schneller geht es telefonisch.</p>
      <div class="mt-8 max-w-2xl"><ContactForm /></div>
    </GlassPanel>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Tests, Build, Browser-Check** — Formular ohne Eingaben absenden → Fehlermeldungen sichtbar, Fokus auf erstem Fehler; Karte laden → iframe erscheint; Mobile-Screenshot.

```bash
npm test && npm run build
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add contact page with hours, consent-gated map and validated inquiry form

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: Impressum, Datenschutz, OG-Bild (banner-design), README

**Files:**
- Create: `src/pages/impressum.astro`, `src/pages/datenschutz.astro`, `scripts/make-og.mjs`, `public/og.jpg`, `README.md`

- [ ] **Step 1: impressum.astro** (§ 5 DDG, § 18 Abs. 2 MStV)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { shop } from '../data/shop';
---
<BaseLayout title="Impressum – EKTEL Mobilfunk & Smartphones" description="Impressum und Anbieterkennzeichnung von EKTEL Mobilfunk & Smartphones, Hamburg-Altona.">
  <article class="prose-measure mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">Impressum</h1>
    <h2 class="mt-8 text-2xl font-bold">Angaben gemäß § 5 DDG</h2>
    <p>{shop.name}<br />Inhaberin: {shop.owner}<br />{shop.street}<br />{shop.zip} {shop.city}</p>
    <h2 class="mt-8 text-2xl font-bold">Kontakt</h2>
    <p>Telefon: <a href={`tel:${shop.phone}`}>{shop.phoneDisplay}</a><br />E-Mail: <a href={`mailto:${shop.email}`}>{shop.email}</a></p>
    <h2 class="mt-8 text-2xl font-bold">Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <strong>⚠︎ BITTE PRÜFEN – eintragen oder Abschnitt entfernen</strong></p>
    <h2 class="mt-8 text-2xl font-bold">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
    <p>{shop.owner}, Anschrift wie oben.</p>
    <h2 class="mt-8 text-2xl font-bold">Streitschlichtung</h2>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  </article>
</BaseLayout>
```

- [ ] **Step 2: datenschutz.astro** — Abschnitte mit Ankern: `#verantwortlicher` (Inhaberin, Adresse, Telefon, E-Mail), `#hosting` (Server-Logfiles, Art. 6 Abs. 1 lit. f DSGVO, Hoster **⚠︎ BITTE PRÜFEN**), `#kontaktformular` (Art. 6 Abs. 1 lit. b, Speicherdauer bis Erledigung; bei gesetztem `PUBLIC_FORM_ENDPOINT` Dienstleister **⚠︎ BITTE PRÜFEN**), `#google-maps` (nur nach Klick, Art. 6 Abs. 1 lit. a, Google Ireland Ltd., Datenübertragung USA, Widerruf durch Nicht-Laden), `#keine-cookies` (keine Cookies, kein Tracking, Schriften/Skripte lokal), `#rechte` (Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerde bei der Hamburgischen Beauftragten für Datenschutz und Informationsfreiheit). Gleiche Layout-Klassen wie Impressum.

- [ ] **Step 3: OG-Bild per banner-design** — `Skill(skill: "ui-ux-pro-max:banner-design")` laden (Regeln: Safe-Zone zentrale 80 %, ≤ 2 Schriften, Headline ≥ 32 px, Kontrast ≥ 4,5:1). Komposition deterministisch mit sharp (kein Browser nötig):

```js
// scripts/make-og.mjs
import sharp from 'sharp';

const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FBBEA"/><stop offset="1" stop-color="#F3F8FD"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <g fill="#FFFFFF" opacity="0.85">
    <ellipse cx="900" cy="150" rx="150" ry="52"/><ellipse cx="990" cy="120" rx="110" ry="48"/><ellipse cx="820" cy="130" rx="90" ry="40"/>
    <ellipse cx="300" cy="520" rx="200" ry="60"/><ellipse cx="430" cy="490" rx="130" ry="55"/><ellipse cx="180" cy="500" rx="110" ry="45"/>
    <ellipse cx="1050" cy="470" rx="140" ry="50"/><ellipse cx="1140" cy="440" rx="90" ry="40"/>
  </g>
  <rect x="72" y="110" width="640" height="410" rx="32" fill="rgba(255,255,255,0.74)" stroke="rgba(255,255,255,0.9)"/>
  <rect x="120" y="160" width="56" height="56" rx="16" fill="#0E5FB5"/>
  <path d="M136 178h24M136 188h18M136 198h24" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
  <text x="196" y="204" font-family="Bricolage Grotesque, Arial, sans-serif" font-size="56" font-weight="700" fill="#0F1B2D">EKTEL</text>
  <text x="120" y="290" font-family="Figtree, Arial, sans-serif" font-size="34" fill="#2A3950">Mobilfunk &amp; Smartphones</text>
  <text x="120" y="370" font-family="Figtree, Arial, sans-serif" font-size="28" font-weight="600" fill="#0E5FB5">Reparatur · Verkauf · Ankauf · SIM</text>
  <text x="120" y="440" font-family="Figtree, Arial, sans-serif" font-size="26" fill="#2A3950">Bahnhof Hamburg-Altona · 7 Tage die Woche</text>
</svg>`);

await sharp(svg).jpeg({ quality: 86 }).toFile('public/og.jpg');
console.log('public/og.jpg written');
```

```bash
npm install -D sharp@^0.33.5 && node scripts/make-og.mjs && ls -la public/og.jpg
```
Erwartet: `public/og.jpg` ≈ 40–120 KB. Ergebnis mit `Read` ansehen; Text muss vollständig in der Safe-Zone liegen. (sharp rendert SVG-Text mit Systemschriften → Arial-Fallback ist hier akzeptabel.) Script-Aufruf als `"og": "node scripts/make-og.mjs"` in `package.json` → `scripts` eintragen.

- [ ] **Step 4: README.md**

```markdown
# EKTEL Mobilfunk & Smartphones – Website

Astro 5 · Tailwind 4 · statisch. `npm install` → `npm run dev` (http://localhost:4321) · `npm test` · `npm run build` → `dist/`.

## Konfiguration
- `SITE_URL` – finale Domain (Sitemap/Canonical)
- `PUBLIC_FORM_ENDPOINT` – Formular-Endpoint (z. B. Formspree). Leer = mailto-Fallback.

## Offene Punkte (⚠︎ BITTE PRÜFEN)
- [ ] Öffnungszeiten (Quelle bahnhof.de: Mo–Sa 08:30–20:30, So/Feiertag 10–18; Verzeichnisse: 09–21)
- [ ] E-Mail-Adresse (`src/data/shop.ts` → `email`)
- [ ] USt-IdNr. im Impressum
- [ ] Hoster + ggf. Formular-Dienstleister in `/datenschutz`
- [ ] Zahlungsarten (bahnhof.de nennt nur Bar)
- [ ] ÖPNV-Linien in `shop.transit`
- [ ] Finale Domain (`SITE_URL`, `public/robots.txt`)
- [ ] Optional: echte Ladenfotos ergänzen (`src/assets/img/`, per `astro:assets` `<Image>` in `ServiceTile.astro` / `leistungen.astro` an Stelle der `ServiceIllustration`)
```

- [ ] **Step 5: Build + Commit**

```bash
npm run build && git add -A && git commit -m "feat: add legal pages, OG image and README with open items

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: impeccable harden / adapt / optimize

**Files:**
- Modify: alle `src/**` nach Befund

- [ ] **Step 1:** `Skill(skill: "impeccable:impeccable", args: "harden src/pages")` — Fokus: deutsche Textlängen (+30 %), lange Gerätenamen im Formular, leere Zustände, Fehlerzustände, Fokus-Reihenfolge im `<details>`-Menü.
- [ ] **Step 2:** `Skill(skill: "impeccable:impeccable", args: "adapt src")` — Responsiveness 360–1920 px, Hero-Panel auf 390 px, Tabellen ohne horizontales Scrollen.
- [ ] **Step 3:** `Skill(skill: "impeccable:impeccable", args: "optimize src")` — Vanta-Chunk nur auf `/`, inline-SVGs ohne redundante Attribute, keine `will-change`, `backdrop-filter` nur auf sichtbaren Panels.
- [ ] **Step 4:** Befunde umsetzen, `npm test && npm run build`.
- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "refactor: harden edge cases, responsive fixes and performance tweaks

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 13: Inspektionsrunde + `detect` (inline)

**Files:**
- Create: `.impeccable/review/desktop.png`, `.impeccable/review/mobile.png` (gitignored)

- [ ] **Step 1: Dev-Server + Screenshots** — `Skill(skill: "run")` → Browser-Pane `ektel-dev`; für `/`, `/leistungen`, `/kontakt`: Desktop (`resize_window width 1440 height 900`, 3 s warten, Screenshot) und Mobile (`preset mobile`, Screenshot). Screenshots unter `.impeccable/review/` ablegen. Konsole (`read_console_messages onlyErrors`) muss leer sein.
- [ ] **Step 2: Mechanische Prüfung**

```bash
"C:\Users\Bentr\.claude\plugins\cache\impeccable\impeccable\4.3.1\skills\impeccable\scripts\impeccable.cmd" detect --json src
```
- [ ] **Step 3:** Alle Findings + sichtbare Mängel fixen (max. eine weitere Inspektionsrunde). `npm test && npm run build`.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "fix: address inspection round and detector findings

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 14: Finish-Reviewer → Fixes → Documenter (DESIGN.md) (inline)

**Files:**
- Create: `DESIGN.md`, `.impeccable/design.json`

- [ ] **Step 1: Finish-Reviewer spawnen** — `Agent(subagent_type: "impeccable:impeccable-finish-reviewer", prompt: …)` mit: Original-Request, Antworten aus Task 1/4, Artefaktpfade (`src/pages/*.astro`, `src/components/*.astro`, `src/styles/global.css`), Screenshot-Pfade, Direction-Contract (`surface-brief read src/pages/index.astro`), craft-floor-Pfad. Erwartet: `disposition: recapture|rebuild|fix|ship` + 5 Sektionen.
- [ ] **Step 2:** Bei `fix`: umsetzen, erneut reviewen (max. 2 Runden). Bei `ship`: weiter.
- [ ] **Step 3: Documenter spawnen** — `Agent(subagent_type: "impeccable:impeccable-documenter", prompt: …)` → `DESIGN.md` (Stitch-Format: Frontmatter colors/typography/rounded/spacing/components + 8 Sektionen) **und** `.impeccable/design.json` (shadows, motion, breakpoints, `ds-`-Komponenten). Beide Dateien müssen existieren.
- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "docs: add DESIGN.md and design sidecar from shipped build

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 15: Audits, Verifikation, Code-Review, Abschluss

- [ ] **Step 1: impeccable audit** — `Skill(skill: "impeccable:impeccable", args: "audit src")` (A11y/Perf/Theming/Responsive/Integrity, P0–P3). Alle P0/P1 fixen.
- [ ] **Step 2: Rams-Audit** — `Skill(skill: "claude-mem:design-is")` mit URL `http://localhost:4321` (Dev-Server läuft). Erwartung ≥ 20/30, keine 0 bei #2/#4/#6; Prinzip #9 durch lazy Vanta + reduced-motion abgesichert. Bei REFINE-Befunden mit klarem Fix: umsetzen; sonst in README „Offene Punkte" aufnehmen.
- [ ] **Step 3: Verifikation** — `Skill(skill: "superpowers:verification-before-completion")`:

```bash
npm test && npm run build && ls dist
```
Erwartet: Tests PASS, `dist/index.html`, `dist/leistungen/index.html`, `dist/kontakt/index.html`, `dist/impressum/index.html`, `dist/datenschutz/index.html`, `dist/sitemap-index.xml`, `dist/og.jpg`.

```bash
npm run preview
```
Preview im Browser-Pane: alle 5 Routen laden, Konsole leer, Formularvalidierung greift, Karte lädt nach Klick, Vanta läuft auf `/`.

- [ ] **Step 4: Code-Review** — `Skill(skill: "superpowers:requesting-code-review")`, dann `Skill(skill: "code-review", args: "medium")`. Befunde nach `superpowers:receiving-code-review` prüfen und umsetzen.
- [ ] **Step 5: Abschluss-Commit**

```bash
git add -A && git commit -m "chore: finalize EKTEL website after audits and review

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 6: Übergabe** — Dem User: Dev-URL, `README.md` → Offene Punkte, Hinweis auf Hosting-Optionen (Netlify/Vercel/IONOS: `npm run build` → `dist/` hochladen) und dass `ektel.de` derzeit zum Verkauf steht.

---

## Verifikation (Ende-zu-Ende)

1. `npm test` → alle Vitest-Suites grün (smoke, opening-hours, illustration, validate-inquiry).
2. `npm run build` → `astro check` 0 Fehler, 5 HTML-Routen + Sitemap + OG in `dist/`.
3. Browser-Pane (`.claude/launch.json` → `ektel-dev`): Desktop 1440 & Mobile 390 Screenshots aller Seiten; Konsole fehlerfrei; Vanta animiert, pausiert bei Tabwechsel (`document.hidden`), CSS-Himmel bei `prefers-reduced-motion`.
4. Formular: leer absenden → 3 Fehlermeldungen + Fokus; gültig ohne Endpoint → mailto öffnet.
5. Karte: erst Consent-Box, nach Klick iframe.
6. impeccable `detect`, `audit`, Finish-Reviewer `ship`, `DESIGN.md` + `.impeccable/design.json` vorhanden; design-is ≥ 20/30.
7. Keine Netzwerkanfrage an Dritte vor Karten-Klick (Browser-Pane `read_network_requests`: nur `localhost`).
