# Logo-Brief: EKTEL

## Aktueller Stand (2026-09-16) — echtes Logo vom Kunden geliefert

Der Kunde hat ein Foto der Ladenfront im Bahnhof Altona geschickt: Über dem Eingang steht die Wortmarke **„EKTEL"** in Rot, fett, serifenlos, in Versalien, ohne begleitendes Bildzeichen. Das ist die reale, im Alltag sichtbare Marke — nicht der frühere Platzhalter unten.

**Umsetzung** (`src/components/Logo.astro`, `public/favicon.svg`, `scripts/make-og.mjs`):
- Wortmarke „EKTEL" in `Funnel Display Variable`, Schnitt 800 (fetter als der Rest der Site, um die kräftige Schildschrift nachzuzeichnen), Rot `#E2001A` (Token `--color-brand-red` / `--brand-red` in `src/styles/global.css`).
- Kein Icon/Bildzeichen mehr in der Wortmarke — das Foto zeigt nur Text.
- Favicon: rotes, abgerundetes Quadrat mit weißem Monogramm (drei Striche), da die Wortmarke bei 16 px nicht lesbar wäre.
- Der übrige UI-Akzent (Buttons, Links, „Jetzt geöffnet"-Punkt) bleibt bewusst **Hamburg-Blau** — das war die im impeccable-Direction-Contract festgelegte Bildsprache für die Website-Oberfläche selbst und ist von der realen Laden-Rotmarke getrennt zu behandeln. Falls der Kunde die Website komplett auf Rot umstellen möchte, ist das eine eigene Entscheidung (würde den Direction-Contract ändern) und noch nicht umgesetzt.

**⚠︎ BITTE PRÜFEN:** Der Rotton `#E2001A` ist aus dem Foto geschätzt (kein Vektor-Original, keine Pantone-Angabe vorhanden). Falls der Kunde eine exakte Logodatei (SVG/AI/PDF) oder einen Farbwert hat, bitte nachreichen und in `src/styles/global.css` (`--color-brand-red`) sowie `scripts/make-og.mjs` austauschen.

---

## Frühere Recherche (vor dem Kunden-Foto, zur Referenz)

_Quelle: ui-ux-pro-max `design/scripts/logo/search.py --design-brief` (keyless Teil), 2026-09-16._

- **Stil:** Wordmark (Typographie), monochrom, niedrige Komplexität, "custom modified typeface, kerning adjustments" – passt zu "established brands / name recognition".
- **Branche Telekommunikation:** Symbole Signalwelle / Verbindungsknoten; Stimmung "connected, reliable"; vermeiden: veraltet, schwer, unverbunden.
- **Palette "Arctic Blue":** Primär #0C4A6E · Sekundär #0369A1 · Akzent #0EA5E9 · Hintergrund #F0F9FF – "cool, professional, clean, trust".
- Abgelehnt: "Modern Abstract Gradient Tech" (Verläufe verstoßen gegen craft-floor), Script-Wordmark (Fashion).

Der damalige Platzhalter (blaues Icon-Quadrat + blaue Wortmarke) ist durch die echte rote Wortmarke oben ersetzt.
