import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

const publicDir = './public';

function getFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...getFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const images = getFiles(publicDir).filter(f => /\.(png|jpe?g)$/i.test(f));

for (const src of images) {
  const ext = extname(src);
  const webpPath = join(dirname(src), basename(src, ext) + '.webp');
  try {
    await sharp(src).webp({ quality: 82 }).toFile(webpPath);
    unlinkSync(src);
    console.log(`✓ ${src} → webp`);
  } catch (e) {
    console.error(`✗ ${src}: ${e.message}`);
  }
}

console.log(`\nGotowe: ${images.length} plików.`);
