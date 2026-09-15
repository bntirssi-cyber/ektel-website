# EKTEL Mobilfunk & Smartphones — Website Design Spec

_Stand: 2026-09-16. Aus dem Brainstorming abgeleitet; Implementierungsplan: docs/superpowers/plans/2026-09-16-ektel-website.md_

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

