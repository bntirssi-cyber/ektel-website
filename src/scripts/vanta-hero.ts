import type { VantaEffect, VantaFactory } from 'vanta/dist/vanta.clouds.min';

let effect: VantaEffect | null = null;
let loading = false;
let visible = false;

async function start(el: HTMLElement) {
  if (effect || loading) return;
  loading = true;
  try {
    const [mod, THREE] = await Promise.all([
      import('vanta/dist/vanta.clouds.min'),
      import('three'),
    ]);
    // Vanta ships a UMD bundle: depending on the bundler it lands as a default export,
    // a nested default, or only on window.VANTA — resolve whichever is present.
    const exported: unknown = (mod as { default?: unknown } | undefined)?.default;
    const nested: unknown = exported && typeof exported === 'object' ? (exported as { default?: unknown }).default : undefined;
    const candidates: unknown[] = [exported, nested, window.VANTA?.CLOUDS, window._vantaEffect?.default];
    const CLOUDS = candidates.find((c): c is VantaFactory => typeof c === 'function');
    if (!CLOUDS) throw new Error('Vanta CLOUDS factory not found');
    if (!visible || document.hidden) return; // left the viewport while loading
    effect = CLOUDS({
      el,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      backgroundColor: 0xf3f8fd,
      skyColor: 0x8fbbea,
      cloudColor: 0xe6f0fb,
      cloudShadowColor: 0x5f8dc0,
      sunColor: 0xfff1d0,
      sunGlareColor: 0xffd7a0,
      sunlightColor: 0xfff6e8,
      speed: 0.8,
    });
    effect.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.dataset.vanta = 'on';
  } catch (err) {
    console.error('[vanta] failed', err);
  } finally {
    loading = false;
  }
}

function stop(el: HTMLElement) {
  effect?.destroy();
  effect = null;
  delete el.dataset.vanta;
}

export function initVantaHero() {
  const el = document.querySelector<HTMLElement>('[data-vanta-hero]');
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible && !document.hidden && !reduce.matches) start(el);
      else stop(el);
    },
    { threshold: 0.05 },
  );

  const sync = () => {
    if (reduce.matches) {
      io.disconnect();
      stop(el);
    } else {
      io.observe(el);
    }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(el);
    else if (visible && !reduce.matches) start(el);
  });
  reduce.addEventListener('change', sync);
  sync();
}

initVantaHero();
