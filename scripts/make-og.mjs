// Builds public/og.jpg (1200×630) from a mid-teardown frame + frosted panel + wordmark.
// Banner rules applied: central 80 % safe zone, ≤ 2 typefaces, one message, ≥ 4.5:1 contrast.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const frame = 'public/phone/desktop/f0045.webp';

const base = await sharp(frame).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer();

const panel = { x: 72, y: 96, w: 600, h: 438, r: 32 };

// Soft drop shadow so the panel separates from the now-light backdrop (no dark
// studio ground to rely on for contrast, unlike the earlier video source).
const shadow = await sharp({
  create: { width: panel.w + 80, height: panel.h + 80, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: Buffer.from(`<svg width="${panel.w + 80}" height="${panel.h + 80}"><rect x="40" y="44" width="${panel.w}" height="${panel.h}" rx="${panel.r}" fill="rgba(15,27,45,0.28)"/></svg>`) }])
  .blur(22)
  .png()
  .toBuffer();

// Frosted panel: blur the region under the panel, then lay a translucent white plate on it.
const blurred = await sharp(base)
  .extract({ left: panel.x, top: panel.y, width: panel.w, height: panel.h })
  .blur(18)
  .toBuffer();

const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" rx="${panel.r}" fill="rgba(255,255,255,0.82)" stroke="rgba(15,27,45,0.12)"/>
  <rect x="120" y="150" width="56" height="56" rx="16" fill="#0E5FB5"/>
  <path d="M136 168h24M136 178h18M136 188h24" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>
  <text x="196" y="194" font-family="Funnel Display, Arial, sans-serif" font-size="52" font-weight="700" fill="#0F1B2D">EKTEL</text>
  <text x="120" y="272" font-family="Funnel Sans, Arial, sans-serif" font-size="30" fill="#2A3950">Mobilfunk &amp; Smartphones</text>
  <text x="120" y="352" font-family="Funnel Display, Arial, sans-serif" font-size="40" font-weight="700" fill="#0F1B2D">Handy kaputt? Wir helfen –</text>
  <text x="120" y="400" font-family="Funnel Display, Arial, sans-serif" font-size="40" font-weight="700" fill="#0F1B2D">alles an einem Ort.</text>
  <text x="120" y="470" font-family="Funnel Sans, Arial, sans-serif" font-size="24" font-weight="600" fill="#0E5FB5">Reparatur · Verkauf · Ankauf · SIM</text>
  <text x="120" y="506" font-family="Funnel Sans, Arial, sans-serif" font-size="22" fill="#2A3950">Bahnhof Hamburg-Altona · 7 Tage die Woche</text>
</svg>`);

await sharp(base)
  .composite([
    { input: shadow, left: panel.x - 40, top: panel.y - 40 },
    { input: await sharp(blurred).composite([{ input: Buffer.from(`<svg width="${panel.w}" height="${panel.h}"><rect width="${panel.w}" height="${panel.h}" rx="${panel.r}" fill="#fff"/></svg>`), blend: 'dest-in' }]).png().toBuffer(), left: panel.x, top: panel.y },
    { input: overlay },
  ])
  .jpeg({ quality: 86 })
  .toFile('public/og.jpg');

console.log('public/og.jpg written');
