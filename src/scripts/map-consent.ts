for (const box of document.querySelectorAll<HTMLElement>('[data-map-consent]')) {
  box.querySelector('[data-map-load]')?.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = box.dataset.src ?? '';
    iframe.title = 'Google Maps – Standort EKTEL, Paul-Nevermann-Platz 12, Hamburg';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.className = 'h-full w-full rounded-[var(--radius-tile)] border-0';
    box.replaceChildren(iframe);
    box.classList.remove('flex', 'flex-col', 'items-center', 'justify-center', 'p-6', 'gap-4');
  });
}
