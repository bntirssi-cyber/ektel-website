export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export interface DayHours { open: string; close: string }
export type WeekHours = Record<DayKey, DayHours | null>;
export interface OpenStatus { open: boolean; label: string }

const ORDER: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export const DAY_NAMES: Record<DayKey, string> = {
  mon: 'Montag', tue: 'Dienstag', wed: 'Mittwoch', thu: 'Donnerstag', fri: 'Freitag', sat: 'Samstag', sun: 'Sonntag',
};

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

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
