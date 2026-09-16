# Design-Notizen (frontend-design, zwei Pässe) — EKTEL

_2026-09-16. Pass 1 = Token-/Layout-Plan, Pass 2 = Anti-Default-Review mit Änderungen. Der verbindliche Direction-Contract liegt im impeccable Surface-Brief (`.impeccable/`), nicht hier._

## Subjekt

Ein Handyladen **im Bahnhof Hamburg-Altona**, Ebene 1. Die Welt des Subjekts: Bahnhofshalle, Anzeigetafeln, Pendlerstrom, gesprungene Displays in der Hand, der weite norddeutsche Himmel über dem Bahnhofsvorplatz. Der Auftraggeber hat die Bildwelt gesetzt: **animierter Wolkenhimmel (Vanta CLOUDS) + Liquid-Glass-Panels**. Aufgabe der Site: Anruf/Route in einem Viewport, ganzes Angebot zeigen, korrekte Zeiten und Lage.

## Pass 1 — Plan

### Color (Basis-Palette, 6 Werte)
| Name | Hex | Rolle |
|---|---|---|
| Sky 50 | #F3F8FD | Seitengrund unterhalb des Heros |
| Sky 200 | #C6DCF3 | Linien, Illustrationswolken, Trennungen |
| Ink 900 | #0F1B2D | Text, Überschriften (kein getöntes Schwarz als „Schwarz", sondern echtes Tintenblau) |
| Hamburg-Blau | #0E5FB5 | **einziger Akzent**: CTAs, Links, eine Fläche je Illustration |
| Geöffnet | #1B8A5A | Statuspunkt „geöffnet" |
| Geschlossen | #B4462B | Statuspunkt „geschlossen", Formularfehler |

Glas-Material: Weiß mit 62 % (Frosted) bzw. 10–28 % (Balanced) Deckung, 1 px heller Rand, innere 1 px Lichtkante oben, weicher Schatten `0 18px 50px -24px rgba(15,27,45,.35)`.

### Type
- **Display: Funnel Display Variable** (300–800), Gewicht 700 für H1/H2, 600 für H3. Enge Zeilenhöhe (1.05 im H1), leicht negatives Tracking (−0.01em). Die Rundungen der Funnel-Formen antworten auf die Wolken; die Schrift ist selten genug, um nicht nach Template zu lesen.
- **Body: Funnel Sans Variable** — dieselbe Familie, damit die Site aus einem Guss wirkt; 17 px, Zeilenhöhe 1.55, Maß ≤ 68 ch.
- Zwei Rollen, eine Familie → keine Konkurrenz. Keine Mono-Labels, keine Versal-Eyebrows.

### Layout (linksbündig, 12 Spalten, max 72 rem)
Startseite:
```
┌──────────────────────────── Himmel (Vanta, 88dvh) ─────────────────────────────┐
│ [Glas-Header: Wortmarke        Start Leistungen Kontakt   (Jetzt anrufen)]       │
│                                                                                  │
│ ┌────────── Frosted, Sp. 1–7 ─────────────┐                                      │
│ │ ● Jetzt geöffnet · bis 20:30 Uhr        │                                      │
│ │ Handy kaputt? Wir helfen –              │      ┌── Balanced, Sp. 9–12 ──┐      │
│ │ alles an einem Ort.                     │      │ über 800               │      │
│ │ Reparatur, Verkauf, Ankauf, SIM …       │      │ Google-Bewertungen     │      │
│ │ (Jetzt anrufen) (Route planen)          │      │ Bahnhof Altona, Ebene 1│      │
│ └─────────────────────────────────────────┘      └────────────────────────┘      │
└──────────────────────────────────────────────────────────────────────────────────┘
  Was wir für Sie tun
  ┌───── Reparatur (7 Sp., Illustration links) ─────┐ ┌─ Verkauf & Zubehör (5) ─┐
  └─────────────────────────────────────────────────┘ └─────────────────────────┘
  ┌─ Ankauf (5) ───────────┐ ┌───── SIM & Tarife (7, Illustration links) ────────┐
  └────────────────────────┘ └───────────────────────────────────────────────────┘
  ── über 800 Bewertungen ── 7 Tage die Woche ── Direkt im Bahnhof ──  (dl, Linien oben)
  ┌ Frosted: So finden Sie uns | Adresse, Ebene 1 … | (040 … anrufen) (Öffnungszeiten) ┐
```
Leistungen: Titel + Anker-Chips, dann vier Frosted-Panels im Wechsel Illustration links/rechts.
Kontakt: 5/7-Raster — links Frosted-Panel (Adresse, Anruf, Öffnungszeiten-Tabelle, Anfahrt), rechts Karte hinter Consent; darunter Frosted-Panel mit Formular (max 42 rem).

Ausrichtung: **linksbündig, Flattersatz**, nie zentriert (außer Illustrationen in ihren Flächen). Der Hero-Text sitzt unten links wie eine Anzeigetafel, der Proof-Panel kleiner und tiefer rechts — zwei „Tafeln" auf verschiedenen Höhen, keine Symmetrie.

### Principles
1. **Der Himmel ist die einzige selbstlaufende Bewegung.** Die Signatur-Interaktion – die scroll-gescrubbte Explosionsansicht des Telefons (Frame-Sequenz auf Canvas, sticky, drei Textstufen Display → Akku & Ladebuchse → Platine) – bewegt sich ausschließlich mit dem Scroll. Kein Scroll-Reveal, kein Hover-Lift; Buttons wechseln Farbe in 150 ms.
2. **Glas hat einen Job:** Es ist das Material der Tafeln, die vor dem Himmel schweben. Unter dem Hero liegt ein statischer, leicht bewölkter CSS-Himmel (Radial-Gradients), damit Frosted-Panels dort noch als Material lesen, ohne zweiten Canvas.
3. **Tafeln sind ungleich:** 7/5- und 5/7-Spalten, unterschiedliche Höhen, Illustration nur bei den großen.
4. **Wahrheit vor Wirkung:** keine Preise, keine Zitate, kein Sternwert, kein „am selben Tag".
5. **Ein Tipp zum Ziel:** Anruf und Route in jedem Viewport erreichbar (Header-CTA, Hero, Abschluss-Panel).

## Pass 2 — Anti-Default-Review

| Prüfpunkt | Erster Reflex | Änderung & Grund |
|---|---|---|
| Palette | Blau + Orange-CTA (ui-ux-pro-max-Vorschlag) | **Orange gestrichen.** Blau/Orange ist das Standard-Komplementärpaar für „Service-Sites". CTAs sitzen ohnehin auf weißem Frosted-Glas, dort trägt Hamburg-Blau allein. |
| Display-Schrift | Bricolage Grotesque | **Funnel Display.** Bricolage ist inzwischen ein häufiger „distinkter Default"; Funnel Display ist seltener, geometrisch-rund (passt zu Wolken/Glas) und stammt aus der Datenbank-Suche. Body wird Funnel Sans statt Figtree – eine Familie statt zwei ähnlicher Grotesken. |
| Hero | Großes Panel links, Stat-Karte rechts auf gleicher Höhe | Proof-Panel **kleiner, tiefer gesetzt, andere Glasstufe** (Balanced statt Frosted) → zwei Tafeln statt Zwei-Spalten-Template. Keine „große Zahl + kleines Label"-Kachel; die Zahl steht als Satz („über 800 Google-Bewertungen"). |
| Leistungs-Teaser | 4 gleiche Karten | 7/5 – 5/7 wechselnd, nur die großen mit Illustration; keine Nummerierung (keine Sequenz). |
| Chrome | Eyebrow „LEISTUNGEN", `→` auf Buttons, „A · B · C"-Meta | Alles entfernt. Der Öffnungs-Badge nutzt den Mittelpunkt einmalig als Trenner zwischen Status und Uhrzeit – das ist Inhalt (Status · Zeit), kein Meta-String. |
| Motion | GSAP-Scroll-Reveal aus dem Design-System-Output | Verworfen; Vanta ist der eine Moment. |
| Schwarz | #111-Ton | Ink 900 #0F1B2D ist bewusst tintenblau, passend zum Himmel, kein „getöntes Schwarz". |
| Copy | „Absenden", „Mehr erfahren" | „Anfrage senden", „Mehr zu Reparatur"; Buttons benennen die Handlung. |

Was bleibt bewusst „gewöhnlich": Sticky-Header, Skip-Link, Standard-Formularlayout mit sichtbaren Labels — hier ist Konvention Nutzerfreundlichkeit, keine Dekoration.

## Nachtrag: Telefon-Video (Kundenwunsch, 2026-09-16)
Zwei Clips in `header/` zeigen dieselbe Sequenz (Smartphone öffnet sich in Display, Akku, Platinen; 1920×1080, 9,8 s, dunkelgrauer Studiogrund). Erst `tech header background anination.mp4` (30 fps) gewählt, auf Kundenwunsch (2026-09-16) auf `cd2264868a0e4e79a0b92a602801d499.mp4` (60 fps, doppelte Framezahl) umgestellt – spürbar flüssiger beim Scrubben. Frames per OpenCV extrahiert (WebP, Desktop 1280 px / Mobile 720 px), lazy geladen mit begrenzter Parallelität; `prefers-reduced-motion` zeigt das Endbild statisch.

**Überarbeitung (2026-09-16, Kundenfeedback):** Video ist jetzt der volle Hero (nicht mehr eine kleine Box darunter) – Kopfzeile überlappt es direkt, `--header-h` wird live per ResizeObserver gemessen statt geraten, damit keine Lücke zum Seitenhintergrund entsteht. Der Hero-Text liegt ohne Glas-Panel direkt auf dem Video (nur ein Scrim-Verlauf für Kontrast) – die Glas-Optik bleibt allen anderen Flächen der Site vorbehalten. Eine kurze Catchline ergänzt die Headline; die dreistufige Bauteil-Liste (Display/Akku/Platine) wurde für die aufgeräumte Optik aus dem Hero entfernt.

**Drittes Video (2026-09-16, Kunden-Upload):** `a7e11ac7189d4fc2ac921d95e6f3e2d8.mp4` (1920×1080, 48 fps, ~4 s) ersetzt die vorigen zwei Kandidaten als Quelle – hellerer Studiogrund statt dunkelgrau. Entsprechend umgestellt: Hero-Text von Weiß-auf-Dunkel auf Ink-900-auf-Hell, Scrim von dunklem auf helles Weiß-Vignette (`rgba(255,255,255,…)` statt `rgba(10,12,16,…)`), `.screen`-Platzhalterfarbe von Dunkelgrau auf Hellgrau/Weiß, OG-Bild-Panel bekommt einen weichen Schlagschatten statt eines hellen Rahmens (sonst auf dem jetzt hellen Grund unsichtbar). `OpenBadge`s `plain`-Variante nutzt jetzt `currentColor` statt festem Weiß, damit sie sich in jeden Hintergrund einfügt. Verworfen: Freistellen des Telefons (ohne Matting-Modell nicht sauber); `<video currentTime>`-Scrubbing (ruckelt ohne Keyframe pro Bild).

**Echte Wortmarke + Video-Qualität (2026-09-16, Kundenfeedback):** Der Kunde schickte ein Foto der Ladenfront: „EKTEL" steht dort rot, fett, serifenlos, ohne Icon. Der erfundene blau-mit-Icon-Platzhalter ist entfernt; `Logo.astro` rendert jetzt die rote Wortmarke (`--color-brand-red: #E2001A`, geschätzt aus dem Foto), das Favicon ein rotes Monogramm (Wortmarke wäre bei 16 px unlesbar), das OG-Bild zieht nach. Der UI-Akzent (Buttons, Links, Status-Punkt) bleibt bewusst Hamburg-Blau aus dem Direction-Contract — nur die Marke selbst ist rot, keine Site-weite Umfärbung. Zusätzlich auf Wunsch „Video-Qualität nicht verschlechtern": Frames laufen jetzt in voller Quellbreite (Desktop 1920 px statt 1280 px, Mobile 960 px statt 720 px) bei WebP-Qualität 92 statt 80; Payload steigt von ~1,9 MB auf ~5,5 MB (Desktop-Set), bleibt dank priorisiertem Lazy-Loading (Task 12) vertretbar.

## Vollständiger Rebrand + reale Bewertungen + dunkle untere Hälfte (2026-09-16, Kundenfeedback)

Vier zusammenhängende Änderungen in einer Runde:

**1. Site-weiter Rot-Rebrand.** `--color-accent-600/700` in `src/styles/global.css` laufen jetzt auf dem Logo-Rot `#E2001A`/`#AA0013` statt Hamburg-Blau — dieselbe Vorgabe wie die Wortmarke, jetzt konsequent auf CTAs, Links, Illustrations-Akzente, Status-Punkte übertragen (löst die vorige „nur Logo rot, UI bleibt blau"-Entscheidung ab; der Kunde wollte explizit das ganze Design). `--color-closed-600` von Rostrot auf Bernstein (`#946200`) gewechselt, damit „geschlossen" nicht mit dem neuen Marken-Rot verwechselt wird.

**2. Echte Google-Bewertungen.** Live von Google Maps abgerufen (nicht mehr die ältere FlinkFix-Schätzung „über 800"): **5,0 ★, 1.243 Rezensionen** (1.232×5★/2×4★/4×3★/4×1★), Adresse „Etage 0" (weicht von bahnhof.de „Ebene 1" ab → als offene Frage geflaggt, `shop.floorHint`). Einziges wörtliches Zitat der ganzen Site (Copyright-Budget: 1 Zitat < 15 Wörter/Antwort) ist der von Google selbst hervorgehobene Kurzausschnitt, attribuiert als „Google-Rezension", kein zugeordneter Name. `ReviewsPanel.astro` neu: großer Rating-Wert mit Count-up-Animation (`data-count-to`, `src/scripts/scroll-reveal.ts`), 5 Sterne, Zitat-Karte, Link direkt zu Google. Nebenbei aufgefallen: eine echte Rezension spricht von „Herr Eker" — „Inhaberin" in Impressum/Datenschutz war eine unbelegte Geschlechtsannahme, jetzt neutral ohne Titel.

**3. Hero radikal vereinfacht.** Nur noch Headline + zwei Buttons, kein Badge, kein Fülltext („Text minimieren", Kundenwunsch). Schrift sehr groß (`clamp(2.25rem,6vw,4.75rem)`), linksbündig ab dem Bildschirmrand. **Falle:** `max-w-[Nch]` auf dem äußeren Wrapper statt auf dem `<h1>` selbst gesetzt → `ch` bezog sich auf die Basis-Schriftgröße (17 px) statt auf die 76-px-Headline, Zeilenumbruch nach 2 Wörtern, Text lief oben aus dem Viewport. Fix: `max-w-[18ch]` direkt am `<h1>`, dort korrekt relativ zu dessen eigener Schriftgröße.

**4. Untere Hälfte: dunkles Liquid Glass mit rotem Glow statt hellem Himmel.** Der Wolkenhintergrund (Vanta) passte laut Kunde nicht zu Rot und wurde komplett entfernt (`CloudSky.astro`, `vanta-hero.ts`, `vanta.d.ts` gelöscht, `vanta`+`three`+`@types/three` deinstalliert — spart ~600 KB, die vorher ungenutzt mitliefen, da der Hero längst das Foto-Scrubbing statt Vanta nutzt). Ab der Sektion „Was wir für Sie tun" bis zur TrustStrip liegt jetzt `.surface-dark`: nahezu schwarzer Grund mit drei unscharfen roten Radial-Glows (kein Blur-Filter nötig, Weichzeichnung kommt vom Gradientenverlauf selbst). Die Karten darauf sind dunkles Liquid Glass (`.glass-dark-frosted`/`-balanced`, liquid-glass-ui-Skill „Frosted"-Stufe, dunkel abgestimmt): heller Tint bei niedriger Deckkraft, damit der rote Glow sichtbar durchscheint, plus rot getönte Unterkante (`--lqd-rim-lo`). Sekundär-Buttons site-weit (`Menü`, `Route planen`, `Öffnungszeiten & Anfahrt`) sind jetzt dunkle Glas-Pills mit rotem Schein-Schatten (`.btn-ghost` neu definiert) — funktioniert sowohl auf dem hellen Hero-Video als auch auf `.surface-dark`, weil die Pille ihre eigene dunkle Füllung mitbringt statt auf einen belebten Hintergrund angewiesen zu sein. Karten-Hover neu: `.card-hover` hebt 6 px an, skaliert leicht, roter Leuchtschatten (`box-shadow` mit `rgba(226,0,26,…)`), respektiert `prefers-reduced-motion`.

Die Token-Umschalt-Technik: `.surface-dark` überschreibt `--color-ink-900/700/500` und `--color-sky-200` lokal — bestehende Tailwind-Klassen wie `text-ink-700`/`border-sky-200` kompilieren zu `color: var(--color-ink-700)` usw. und flippen dadurch automatisch auf hell-auf-dunkel, ohne dass jede Komponente einzeln angefasst werden musste.

**Generierte Fotos (Higgsfield `marketing_studio_image`).** Die drei Leistungen ohne echtes Foto (Verkauf & Zubehör, Ankauf, SIM & Tarife) bekamen passende Produktfotos generiert (`scripts/import-photos.mjs` lädt aus `~/Downloads`, hier direkt aus den Higgsfield-Ergebnis-URLs bezogen und mit sharp auf ≤1200 px/JPEG q84 komprimiert): Zubehör-Auslage, Geräteübergabe am Tresen, SIM-Karten-Einsetzen — bewusst ohne Logos/Text/erkennbare Gesichter, im selben ruhigen Studio-Look wie die drei echten Reparatur-Fotos. `ServiceTile.astro` rendert jetzt für alle drei ein Foto statt der SVG-Illustration (Bild-Zoom bei Hover); `ServiceIllustration.astro` bleibt als Komponente bestehen, wird auf der Startseite aber nicht mehr eingebunden (noch genutzt auf `/leistungen`).

## Was ich ausprobiert und verworfen habe
- Vanta als **fixierter Ganzseiten-Himmel** (Glas überall echt): verworfen wegen Dauer-Rendering auf Mobilgeräten und Rams-Prinzip 9; stattdessen statischer CSS-Himmel unter dem Hero.
- **Fallblatt-Animation** („Anzeigetafel") für den Öffnungs-Badge: zweiter Motion-Moment, verworfen.
