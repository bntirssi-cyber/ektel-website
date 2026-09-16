/**
 * One shared reveal grammar for the lower page: fade + rise on first scroll into view.
 * Elements opt in with `data-reveal`; `data-reveal-group` sets --reveal-i on each child
 * automatically for a wave/stagger. Respects prefers-reduced-motion (CSS already renders
 * the final state there; this script still marks elements visible so nothing depends on JS).
 */
for (const group of document.querySelectorAll<HTMLElement>('[data-reveal-group]')) {
  Array.from(group.children).forEach((child, i) => {
    (child as HTMLElement).style.setProperty('--reveal-i', String(i));
  });
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Counts a number up from 0 once its element enters view; final digits stay real text otherwise. */
function countUp(el: HTMLElement) {
  const to = Number(el.dataset.countTo);
  const decimals = Number(el.dataset.countDecimals ?? '0');
  const suffix = el.dataset.countSuffix ?? '';
  if (!Number.isFinite(to) || reduceMotion) return;
  const format = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const duration = 900;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - p) * (1 - p) * (1 - p); // ease-out-cubic
    el.textContent = format(to * eased);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = format(to);
  };
  requestAnimationFrame(tick);
}

const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (targets.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-visible', '');
          entry.target.querySelectorAll<HTMLElement>('[data-count-to]').forEach(countUp);
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );
  targets.forEach((el) => io.observe(el));
}
