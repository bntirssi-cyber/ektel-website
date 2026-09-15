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
  locationHint: 'Bahnhof Hamburg-Altona · Ebene 1 · Ausgang Ottenser Hauptstraße',
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
  hoursNote: 'Sonn- und Feiertage 10:00–18:00 Uhr', // ⚠︎ BITTE PRÜFEN (bahnhof.de; Verzeichnisse nennen 09–21 Uhr)
  reviewCountLabel: 'über 800 Google-Bewertungen',
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
