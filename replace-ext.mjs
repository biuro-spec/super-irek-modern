import { readFileSync, writeFileSync } from 'fs';

const files = ['src/App.jsx', 'index.html'];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  // match .png/.jpg/.jpeg before any quote char or end of string in attribute
  const updated = content.replace(/\.(png|jpe?g)(?=["'`\s])/g, '.webp');
  writeFileSync(file, updated, 'utf8');
  const count = (content.match(/\.(png|jpe?g)(?=["'`\s])/g) || []).length;
  console.log(`✓ ${file} — ${count} zamian`);
}
