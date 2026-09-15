---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/leistungen.astro","src/pages/kontakt.astro"]
---

# Surface brief: Startseite `/` (und Grundsystem für alle Routen)

## Scope & Modus
Persuade. Startseite als Ladenscheibe; Leistungen/Kontakt/Impressum/Datenschutz erben das System.

## Publikum, Job, Aktion, Beweis, Constraints
Pendler und Anwohner in Altona mit Handy-Problem; Job: „Kann EKTEL das, wann offen, wo genau?" → Aktion: **Anruf oder Besuch** (Formular sekundär). Beweis: über 800 Google-Bewertungen (nur Zahl + Link), Lage Ebene 1 Bahnhof Altona, 7 Tage geöffnet. Constraints: keine Preise, keine Zitate, kein Sternwert, kein Zeitversprechen; Sie-Anrede; hell; Apple-Zurückhaltung; nichts Technisches/Gaming.

## Direction contract

THESIS: Die Website ist die Ladenscheibe im Bahnhof: alles Wichtige klebt sichtbar auf dem Glas, dahinter der Himmel über Altona. Sie verweigert die Kategorie-Anordnung „Hero-Foto + drei gleiche Karten + Sterne-Widget" und jedes Aufklappen, Karussell oder Scroll-Reveal.

OWN-WORLD: Hamburg-Blau #0E5FB5 als einziger Akzent, Ink #0F1B2D, Sky #F3F8FD/#C6DCF3, Status-Grün #1B8A5A / -Rost #B4462B. Zwei Glasstufen: Frosted (62 % Weiß, 16 px Blur, 1 px Lichtkante) für Tafeln mit Text, Balanced (10–28 % Weiß, 6 px Blur) für Kacheln. Funnel Display 700 / Funnel Sans 400. Inline-SVG-Illustrationen, 2-px-Strich, Tiefe nur durch Überlappung flacher Flächen, genau eine blaue Fläche je Motiv. Panels ungleich groß (7/5, 5/7), echte Überlappungen (Header über Hero, Proof-Tafel über Hero-Kante). Ein dunkler „Bildschirm im Schaufenster" als einzige dunkle Fläche: das gescrubbte Telefon-Video, glasgerahmt.

STORY: Der Besucher versteht in einem Blick, dass hier alles rund ums Smartphone an einem Ort erledigt wird, glaubt es wegen 800+ Bewertungen und der Lage im Bahnhof, sieht beim Scrollen das Telefon sich in Display/Akku/Platine öffnen (= wir kennen das Innenleben) und ruft an oder kommt vorbei.

FIRST VIEWPORT: Glas-Header (Wortmarke, 3 Links, „Jetzt anrufen"). Darunter Vanta-Wolkenhimmel 88 dvh. Unten links Frosted-Tafel Sp. 1–7: Türschild-Status „Jetzt geöffnet · bis 20:30 Uhr", H1 „Handy kaputt? Wir helfen – alles an einem Ort." (clamp 40–68 px), ein Absatz, primär „Jetzt anrufen" (blau, links), sekundär „Route planen" (Ghost). Tiefer rechts Balanced-Tafel Sp. 9–12, überlappt die Hero-Unterkante: „über 800 Google-Bewertungen", „Bahnhof Altona · Ebene 1". Primäre Aktion = Anrufen, im Lesefluss erste Schaltfläche.

FORM: „Schaufenster im Bahnhof" – Kandidat 6 meiner geordneten Liste (1 Leitsystem, 2 Anzeigetafel, 3 HVV-Netz, 4 Explosionszeichnung, 5 Fahrkarte, 6 Schaufenster, 7 Glas-Literal). Seed key **7b396588**, mode persuade, assigned. Raises: z-Ordnung als Überlappung (Sticker), eine Standardaktion je Viewport (Installer), strenge Zeilenbänder (Film), Tiefe ohne Schattierung (Papercut), Deep-Links je Leistung (HyperCard), Zustände als Text (Terminal). Signatur-Interaktion: **scroll-gescrubbte Explosionsansicht des Telefons** (Frame-Sequenz auf Canvas, sticky 300 vh, drei Textstufen Display → Akku & Ladebuchse → Platine, jede verlinkt auf /leistungen#reparatur); Motion-Grammatik: nur der Himmel läuft von selbst, das Telefon bewegt sich ausschließlich mit dem Scroll, Buttons wechseln Farbe in 150 ms, sonst nichts.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unentschieden
E-Mail, USt-ID, Hoster, Kartenzahlung, exakte Öffnungszeiten (bahnhof.de vs. Verzeichnisse), echtes Logo.
