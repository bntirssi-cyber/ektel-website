const section = document.querySelector<HTMLElement>('[data-scroll-phone]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

if (section && !reduce.matches) {
  const canvas = section.querySelector<HTMLCanvasElement>('[data-canvas]');
  const screen = section.querySelector<HTMLElement>('.screen');
  const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-step]'));
  const ctx = canvas?.getContext('2d');
  const total = Number(section.dataset.frames ?? 80);

  if (canvas && ctx && screen) {
    const set = window.matchMedia('(min-width: 768px)').matches ? 'desktop' : 'mobile';
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

    function draw(i: number) {
      const img = images[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx!.drawImage(img, 0, 0, canvas!.width, canvas!.height);
      drawn = i;
      screen!.dataset.ready = '';
    }

    function load() {
      if (loading) return;
      loading = true;
      for (let i = 0; i < total; i++) {
        const img = new Image();
        img.decoding = 'async';
        img.src = src(i);
        img.onload = () => {
          if (i === Math.round(current)) draw(i);
        };
        images.push(img);
      }
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
      target = progress() * (total - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.05) current = target;
      const idx = Math.round(current);
      if (idx !== drawn) draw(idx);
      updateSteps(progress());
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
