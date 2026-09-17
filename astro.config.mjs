import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://ektel-altona.de', // ⚠︎ BITTE PRÜFEN: finale Domain
  base: process.env.BASE_PATH ?? '/', // gesetzt auf einen Unterpfad nur für Subpath-Hosting (z. B. GitHub Pages)
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
