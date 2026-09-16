export interface InquiryInput { name: string; phone: string; email: string; device: string; message: string; website: string }
export interface ValidationResult { ok: boolean; errors: Partial<Record<keyof InquiryInput, string>> }

const PHONE = /^[+0-9 ()/-]{6,}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(i: InquiryInput): ValidationResult {
  if (i.website.trim() !== '') return { ok: false, errors: { website: 'spam' } };
  const errors: ValidationResult['errors'] = {};
  if (i.name.trim().length < 2) errors.name = 'Bitte geben Sie Ihren Namen an.';
  if (!PHONE.test(i.phone.trim()) && !EMAIL.test(i.email.trim())) {
    errors.phone = 'Bitte Telefonnummer oder E-Mail angeben, damit wir Sie erreichen.';
  }
  if (i.message.trim().length < 10) errors.message = 'Bitte beschreiben Sie kurz das Problem (mindestens 10 Zeichen).';
  return { ok: Object.keys(errors).length === 0, errors };
}
