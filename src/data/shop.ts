import type { WeekHours } from '../lib/opening-hours';

export type IllustrationKind = 'repair' | 'accessories' | 'trade-in' | 'sim';
export interface Service {
  slug: string;
  title: string;
  summary: string;
  bullets: readonly string[];
  illustration: IllustrationKind;
}

const weekday = { open: '08:30', close: '20:30' };

/** Einzige Quelle für alle Ladenfakten. Zeilen mit ⚠︎ bitte vom Inhaber bestätigen. */
export const shop = {
  name: 'EKTEL Mobilfunk & Smartphones',
  shortName: 'EKTEL',
  owner: 'Aysun Eker',
  street: 'Paul-Nevermann-Platz 12',
  zip: '22765',
  city: 'Hamburg',
  district: 'Altona',
  locationHint: 'Bahnhof Hamburg-Altona · Ausgang Ottenser Hauptstraße',
  floorHint: 'Ebene 1', // ⚠︎ BITTE PRÜFEN – bahnhof.de sagt „Ebene 1", Google-Maps-Eintrag sagt „Etage 0"; welche Angabe stimmt?
  phone: '+494039903730',
  phoneDisplay: '040 399 037 30',
  email: 'info@ektel-altona.de', // ⚠︎ BITTE PRÜFEN – E-Mail nicht öffentlich belegt
  geo: { lat: 53.5526, lng: 9.9354 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=EKTEL+Mobilfunk+%26+Smartphones+Paul-Nevermann-Platz+12+22765+Hamburg',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Paul-Nevermann-Platz+12,+22765+Hamburg&output=embed',
  hours: {
    mon: weekday, tue: weekday, wed: weekday, thu: weekday, fri: weekday, sat: weekday,
    sun: { open: '10:00', close: '18:00' },
  } satisfies WeekHours,
  hoursShort: 'Mo–Sa 08:30–20:30 Uhr · So 10:00–18:00 Uhr',
  hoursNote: 'Sonn- und Feiertage 10:00–18:00 Uhr', // Mo–Sa 08:30–20:30 durch bahnhof.de UND den echten Google-Eintrag bestätigt (2026-09-16); nur die Sonntagszeit stammt bislang nur von bahnhof.de
  // Live von Google Maps abgerufen (2026-09-16): „EKTEL Mobilfunk & Smartphones", 5,0 ★, 1.243 Rezensionen (1.232×5★, 2×4★, 4×3★, 4×1★).
  reviewRating: 5.0,
  reviewCount: 1243,
  reviewCountLabel: '1.243 Google-Bewertungen',
  reviewRatingLabel: '5,0 von 5 Sternen',
  // Einziges wörtliches Zitat auf der Site (Copyright-Budget), gekürzt aus dem hervorgehobenen
  // Ausschnitt, den Google selbst auf der Profilseite anzeigt – ohne zugeordneten Namen.
  reviewQuote: 'Sehr guter Laden, ehrliche und kompetente Beratung, schneller und guter Service.',
  reviewQuoteSource: 'Google-Rezension',
  brands: ['Samsung', 'Apple', 'Sony'],
  transit: [
    'S-Bahn S1, S3, S5 – Bahnhof Altona', // ⚠︎ BITTE PRÜFEN
    'Regional- und Fernverkehr – Bahnhof Altona',
    'Bus 1, 2, 15, 20, 25, 37, 111, 150, 250, 283 – Bf. Altona', // ⚠︎ BITTE PRÜFEN
  ],
  services: [
    {
      slug: 'reparatur',
      title: 'Reparatur',
      summary: 'Display, Akku, Ladebuchse, Wasserschaden – ehrliche Einschätzung vorab, Preis nach kurzer Diagnose.',
      bullets: ['Display- und Glaswechsel', 'Akkutausch', 'Ladebuchse & Mikrofon', 'Wasserschaden-Reinigung', 'Software & Datenrettung', 'Preis nach kurzer Diagnose – auf Anfrage'],
      illustration: 'repair',
    },
    {
      slug: 'verkauf',
      title: 'Verkauf & Zubehör',
      summary: 'Neue und geprüfte gebrauchte Smartphones, Tablets und das passende Zubehör.',
      bullets: ['Samsung, Apple, Sony und weitere Marken', 'Hüllen, Panzerglas, Ladegeräte, Kopfhörer', 'Beratung ohne Fachchinesisch'],
      illustration: 'accessories',
    },
    {
      slug: 'ankauf',
      title: 'Ankauf',
      summary: 'Altes Gerät abgeben, faires Angebot mitnehmen – direkt vor Ort.',
      bullets: ['Bewertung in wenigen Minuten', 'Auszahlung sofort', 'Auch defekte Geräte auf Anfrage'],
      illustration: 'trade-in',
    },
    {
      slug: 'sim-tarife',
      title: 'SIM & Tarife',
      summary: 'SIM-Karten, Prepaid, Tarifwechsel und Hilfe bei Internet-Einstellungen.',
      bullets: ['Prepaid- und Vertragstarife', 'eSIM & Einrichtung', 'Datenübertragung aufs neue Gerät'],
      illustration: 'sim',
    },
  ] satisfies Service[],
} as const;
