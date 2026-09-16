const section = document.querySelector<HTMLElement>('[data-scroll-phone]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

if (section && !reduce.matches) {
  const canvas = section.querySelector<HTMLCanvasElement>('[data-canvas]');
  const screen = section.querySelector<HTMLElement>('.screen');
  const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
  const ctx = canvas?.getContext('2d');
  const total = Number(section.dataset.frames ?? 80);
  const wide = window.matchMedia('(min-width: 768px)');

  if (canvas && ctx && screen) {
    const set = wide.matches ? 'desktop' : 'mobile';
    const images: HTMLImageElement[] = [];
    let loading = false;
    let current = 0;
    let target = 0;
    let drawn = -1;
    let raf = 0;
    let running = false;

    const src = (i: number) => `/phone/${set}/f${String(i + 1).padStart(4, '0')}.webp`;

    function sizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        drawn = -1;
      }
    }

    /**
     * Draws the frame like `object-fit: cover`, but keeps the phone (frame centre)
     * at `focusX` of the viewport so it sits beside the text panel on wide screens.
     * The uncovered strip on the far side is filled by stretching the frame's edge
     * pixels (the studio backdrop is a smooth gradient, so the seam is invisible).
     */
    function drawCover(img: HTMLImageElement) {
      const cw = canvas!.width;
      const ch = canvas!.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const focusX = wide.matches ? 0.62 : 0.5;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      const x = Math.round(focusX * cw - w / 2);
      const y = Math.round((ch - h) / 2);
      if (x > 0) ctx!.drawImage(img, 0, 0, 2, ih, 0, y, x + 1, h);
      if (x + w < cw) ctx!.drawImage(img, iw - 2, 0, 2, ih, x + w - 1, y, cw - (x + w) + 1, h);
      ctx!.drawImage(img, x, y, w, h);
    }

    function draw(i: number) {
      const img = images[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      drawCover(img);
      drawn = i;
      screen!.dataset.ready = '';
    }

    /** Lädt die Frames in Scroll-Reihenfolge mit begrenzter Parallelität, damit das LCP nicht leidet. */
    function load() {
      if (loading) return;
      loading = true;
      for (let i = 0; i < total; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          if (i === Math.round(current)) draw(i);
        };
        images.push(img);
      }
      let next = 0;
      const startNext = () => {
        if (next >= total) return;
        const img = images[next++];
        img.addEventListener('load', startNext, { once: true });
        img.addEventListener('error', startNext, { once: true });
        img.src = src(next - 1);
      };
      for (let k = 0; k < 6; k++) startNext();
    }

    function progress() {
      const rect = section!.getBoundingClientRect();
      const range = section!.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / range));
    }

    function updateSteps(p: number) {
      const active = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
      steps.forEach((el, i) => {
        if (i === active) el.dataset.active = '';
        else delete el.dataset.active;
      });
    }

    function tick() {
      const p = progress();
      target = p * (total - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.05) current = target;
      const idx = Math.round(current);
      if (idx !== drawn) draw(idx);
      updateSteps(p);
      raf = running ? requestAnimationFrame(tick) : 0;
    }

    function start() {
      if (running) return;
      running = true;
      load();
      sizeCanvas();
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    updateSteps(0);
    new IntersectionObserver(
      (entries) => (entries.some((e) => e.isIntersecting) ? start() : stop()),
      { rootMargin: '600px 0px' },
    ).observe(section);

    new ResizeObserver(() => {
      sizeCanvas();
      if (drawn >= 0) draw(Math.round(current));
    }).observe(canvas);

    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }
}
