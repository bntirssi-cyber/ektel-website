import { shop } from '../data/shop';
import { getOpenStatus, nowInHamburg } from '../lib/opening-hours';

for (const badge of document.querySelectorAll<HTMLElement>('[data-open-badge]')) {
  const { open, label } = getOpenStatus(nowInHamburg(), shop.hours);
  const text = badge.querySelector<HTMLElement>('[data-label]');
  const dot = badge.querySelector<HTMLElement>('[data-dot]');
  if (!text || !dot) continue;
  text.textContent = label;
  dot.classList.remove('bg-ink-500');
  dot.classList.add(open ? 'bg-open-600' : 'bg-closed-600');
}
