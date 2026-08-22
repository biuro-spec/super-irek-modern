import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';

const tasks = [
  { src: 'public/assets/branding/super-irek-branding-logo.webp', width: 240 },
  { src: 'public/assets/branding/super-irek-naprawy-domowe.webp', width: 360 },
  { src: 'public/assets/branding/super-irek-fachowiec-w-locie.webp', width: 800 },
  { src: 'public/assets/branding/webstudio-logo-v2.webp', width: 160 },
];

for (const { src, width } of tasks) {
  const input = readFileSync(src);
  const meta = await sharp(input).metadata();
  if (meta.width <= width) {
    console.log(`⏭  ${src} (${meta.width}px — już OK)`);
    continue;
  }
  const buf = await sharp(input).resize({ width }).webp({ quality: 82 }).toBuffer();
  writeFileSync(src, buf);
  console.log(`✓ ${src}: ${meta.width}px → ${width}px`);
}
console.log('Gotowe.');
