/**
 * Animated 3D gradient (@firecms/neat) behind the dark liquid-glass section.
 * Config supplied by the client (Neat editor export), trimmed to the keys this
 * package version's NeatConfig actually accepts — a handful of editor-only
 * fields (secondaryWave*, prismEdge*, textureMode, bakeEdgeSoftness) aren't in
 * this release's type and were dropped; every one of them was disabled/zero in
 * the client's export anyway, so the look is unchanged.
 *
 * Lazy: only loads/runs the WebGL library once the section scrolls into view,
 * and tears it down when it leaves or the tab is hidden. `.surface-dark`'s own
 * CSS radial-gradient stays underneath as the reduced-motion / pre-load fallback.
 */
import type { NeatConfig, NeatGradient as NeatGradientCtor } from '@firecms/neat';

const section = document.querySelector<HTMLElement>('.surface-dark');
const canvas = section?.querySelector<HTMLCanvasElement>('[data-neat-canvas]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

const config: NeatConfig = {
  colors: [
    { color: '#AD612E', enabled: true },
    { color: '#19191B', enabled: false },
    { color: '#3A0C0C', enabled: true },
    { color: '#AF2424', enabled: true },
    { color: '#46161B', enabled: true },
    { color: '#FF9090', enabled: true },
  ],
  speed: 4,
  horizontalPressure: 4,
  verticalPressure: 3,
  waveFrequencyX: 0,
  waveFrequencyY: 0,
  waveAmplitude: 0,
  shadows: 2,
  highlights: 7,
  colorBrightness: 1,
  colorSaturation: 8,
  wireframe: false,
  antialias: false,
  colorBlending: 5,
  backgroundColor: '#FF0000',
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0,
  resolution: 0.45,
  yOffset: 2793.600128173828,
  yOffsetWaveMultiplier: 1.5,
  yOffsetColorMultiplier: 1.8,
  yOffsetFlowMultiplier: 2,
  flowDistortionA: 5,
  flowDistortionB: 7.7,
  flowScale: 2.6,
  flowEase: 0.36,
  flowEnabled: false,
  enableProceduralTexture: false,
  transparentTextureVoid: false,
  textureVoidLikelihood: 0.22,
  textureVoidWidthMin: 120,
  textureVoidWidthMax: 150,
  textureBandDensity: 1.9,
  textureColorBlending: 0.12,
  textureSeed: 333,
  textureEase: 0.75,
  proceduralBackgroundColor: '#D0DBFB',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
  shapeType: 'plane',
  shapeRotationX: 0,
  shapeRotationY: 0,
  shapeRotationZ: 0,
  shapeAutoRotateSpeedX: 0,
  shapeAutoRotateSpeedY: 0,
  sphereRadius: 15,
  torusRadius: 15,
  torusTube: 5,
  cylinderRadius: 10,
  cylinderHeight: 40,
  planeBend: 0,
  planeTwist: 0,
  silhouetteFade: 0.25,
  cylinderFade: 0.08,
  ribbonFade: 0.05,
  flatShading: true,
  cameraLock: true,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  cameraRotationX: 0,
  cameraRotationY: 0,
  cameraRotationZ: 0,
  cameraZoom: 1,
};

if (section && canvas && !reduce.matches) {
  let gradient: NeatGradientCtor | null = null;
  let loading = false;
  let visible = false;
  let onScroll: (() => void) | null = null;

  async function start() {
    if (gradient || loading || !canvas) return;
    loading = true;
    try {
      const { NeatGradient } = await import('@firecms/neat');
      if (!visible || document.hidden) return; // left the viewport while the chunk loaded
      gradient = new NeatGradient({ ref: canvas, ...config });
      onScroll = () => {
        if (gradient) gradient.yOffset = window.scrollY;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    } finally {
      loading = false;
    }
  }

  function stop() {
    if (onScroll) {
      window.removeEventListener('scroll', onScroll);
      onScroll = null;
    }
    gradient?.destroy();
    gradient = null;
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible && !document.hidden) start();
      else stop();
    },
    { threshold: 0.05, rootMargin: '200px 0px' },
  );
  io.observe(section);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (visible) start();
  });

  reduce.addEventListener('change', (ev) => {
    if (ev.matches) {
      io.disconnect();
      stop();
    }
  });
}
