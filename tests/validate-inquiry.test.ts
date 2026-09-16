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
