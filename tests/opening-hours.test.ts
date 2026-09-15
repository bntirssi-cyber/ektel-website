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
