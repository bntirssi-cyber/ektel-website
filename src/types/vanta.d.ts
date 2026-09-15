declare module 'vanta/dist/vanta.clouds.min' {
  export interface VantaEffect {
    destroy(): void;
    resize(): void;
    renderer?: { setPixelRatio(ratio: number): void };
  }
  export type VantaFactory = (options: Record<string, unknown>) => VantaEffect;
  const mod: { default?: VantaFactory | { default?: VantaFactory } } | undefined;
  export default mod;
}

interface Window {
  VANTA?: { CLOUDS?: import('vanta/dist/vanta.clouds.min').VantaFactory };
  _vantaEffect?: { default?: import('vanta/dist/vanta.clouds.min').VantaFactory };
}
