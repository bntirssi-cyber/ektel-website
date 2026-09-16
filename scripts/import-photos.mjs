// One-off import: resizes/compresses the client's supplied repair-workshop photos
// (from ~/Downloads) into src/assets/img/ for Astro's <Image> optimization pipeline.
// Re-run if the client sends replacement or additional photos (update SOURCES below).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const DOWNLOADS = 'C:/Users/Bentr/Downloads';
const OUT = 'src/assets/img';
mkdirSync(OUT, { recursive: true });

const SOURCES = [
  { src: `${DOWNLOADS}/technician-antistatic-gloves-using-screwdriver-disassemble-borken-mobile-phone-going-repair-motherboard-sitting-his-workplace-laboratory-with-needed-equipment.jpg`, out: 'repair-workbench.jpg' },
  { src: `${DOWNLOADS}/Close-up-professional-photograph-of-a-re.png`, out: 'repair-microscope.jpg' },
  { src: `${DOWNLOADS}/Close-up-professional-photograph-of-a-re2.png`, out: 'repair-display.jpg' },
];

for (const { src, out } of SOURCES) {
  await sharp(src)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${out}`);
  console.log('wrote', out);
}
