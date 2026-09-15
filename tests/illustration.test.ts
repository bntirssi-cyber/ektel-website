import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const src = readFileSync('src/components/ServiceIllustration.astro', 'utf8');

describe('ServiceIllustration', () => {
  it('covers all four kinds', () => {
    for (const k of ['repair', 'accessories', 'trade-in', 'sim']) expect(src).toContain(`kind === '${k}'`);
  });
  it('is decorative and uses one stroke width', () => {
    expect(src).toContain('aria-hidden="true"');
    expect(src).not.toMatch(/stroke-width="(?!2")/);
  });
});
