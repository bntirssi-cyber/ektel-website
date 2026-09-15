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
Zwei Clips in `header/` zeigen dieselbe Sequenz (Smartphone öffnet sich in Display, Akku, Platinen; 1920×1080, 9,8 s, dunkelgrauer Studiogrund). Gewählt: `tech header background anination.mp4` (30 fps, höhere Bitrate, minimal schärfer). Umsetzung als **„Bildschirm im Schaufenster"**: dunkler, glasgerahmter Panel direkt unter dem Hero, damit der dunkle Grund die helle Seite nicht kippt; Frames per OpenCV extrahiert (WebP, Desktop 1280 px / Mobile 720 px), lazy geladen; `prefers-reduced-motion` zeigt das Endbild statisch. Verworfen: Freistellen des Telefons (dunkles Gerät vor dunkelgrauem Grund – ohne Matting-Modell nicht sauber); `<video currentTime>`-Scrubbing (ruckelt ohne Keyframe pro Bild).

## Was ich ausprobiert und verworfen habe
- Vanta als **fixierter Ganzseiten-Himmel** (Glas überall echt): verworfen wegen Dauer-Rendering auf Mobilgeräten und Rams-Prinzip 9; stattdessen statischer CSS-Himmel unter dem Hero.
- **Fallblatt-Animation** („Anzeigetafel") für den Öffnungs-Badge: zweiter Motion-Moment, verworfen.
