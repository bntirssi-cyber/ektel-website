declare module 'vanta/dist/vanta.clouds.min' {
  export interface VantaEffect {
    destroy(): void;
    resize(): void;
    renderer?: { setPixelRatio(ratio: number): void };
  }
  const CLOUDS: (options: Record<string, unknown>) => VantaEffect;
  export default CLOUDS;
}
