import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

describe('design tokens', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  it('defines the accent color once in @theme', () => {
    expect(css).toMatch(/--color-accent-600:\s*#0E5FB5/i);
  });
  it('provides a no-backdrop-filter fallback for glass', () => {
    expect(css).toMatch(/@supports not \(backdrop-filter/);
  });
});
