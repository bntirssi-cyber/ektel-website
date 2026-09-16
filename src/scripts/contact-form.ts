import { validateInquiry, type InquiryInput } from '../lib/validate-inquiry';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const show = (el: HTMLElement | null, text: string) => {
    if (!el) return;
    el.textContent = text;
    el.classList.remove('hidden');
  };
  const clearErrors = () => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((p) => {
      p.textContent = '';
      p.classList.add('hidden');
    });
    form.querySelectorAll('input, textarea').forEach((i) => i.removeAttribute('aria-invalid'));
  };

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form)) as unknown as InquiryInput;
    const { ok, errors } = validateInquiry(data);
    clearErrors();

    if (!ok) {
      if (errors.website) return; // Honeypot: still schweigen
      for (const [field, msg] of Object.entries(errors)) {
        show(form.querySelector<HTMLElement>(`[data-error-for="${field}"]`), msg ?? '');
        form.querySelector(`[name="${field}"]`)?.setAttribute('aria-invalid', 'true');
      }
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      const body = `Name: ${data.name}\nTelefon: ${data.phone}\nE-Mail: ${data.email}\nGerät: ${data.device}\n\n${data.message}`;
      window.location.href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent('Reparaturanfrage über die Website')}&body=${encodeURIComponent(body)}`;
      show(status, 'Ihr E-Mail-Programm öffnet sich mit der Anfrage.');
      return;
    }

    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    if (submit?.disabled) return; // Doppel-Submit verhindern
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Wird gesendet …';
    }
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(status, 'Vielen Dank – wir melden uns so schnell wie möglich.');
    } catch {
      show(status, `Senden fehlgeschlagen – Ihre Eingaben bleiben erhalten. Rufen Sie uns gern an: ${form.dataset.phone}`);
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Anfrage senden';
      }
    }
  });
}
