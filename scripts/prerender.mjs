/**
 * Prerender PELNEJ TRESCI stron.
 *
 * Aplikacja jest czystym SPA: bot bez JavaScriptu dostaje <div id="root"></div>
 * i 1 slowo tresci (audyt 2026-08-25). Skrypt uruchamia zbudowana aplikacje
 * w Chromium, przewija strone (zeby framer-motion odslonil sekcje whileInView),
 * normalizuje style animacji (opacity/transform) i zapisuje kompletny HTML:
 *  - '/'            -> nadpisuje dist/index.html
 *  - '/cennik' itd. -> dist/cennik.html (serwuje je regula w .htaccess)
 * React startuje z tego samego pliku i renderuje ten sam widok, wiec uzytkownik
 * nie widzi roznicy; roboty dostaja tresc od razu.
 *
 * Uruchamiane po `npm run build` przez `npm run prerender` (build:deploy).
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PORT = 4181;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(DIST, urlPath);
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(DIST, 'index.html');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

/** Trasy z sitemap.xml - jedna lista prawdy. */
function readRoutes() {
  const xml = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/superirek\.pl(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
}

// index.html sprzed prerenderu - '/' nadpisuje index.html, wiec czytamy raz.
const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

const routes = readRoutes();
const failed = [];
let written = 0;

for (const route of routes) {
  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    // Przewin cala strone, zeby whileInView odpalil kazda sekcje
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const html = await page.evaluate(() => {
      // Normalizacja animacji: nic nie moze zostac zapisane jako niewidoczne
      document.querySelectorAll('#root *').forEach((el) => {
        const cs = getComputedStyle(el);
        if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
        if (cs.transform !== 'none') el.style.transform = 'none';
      });
      return '<!doctype html>\n' + document.documentElement.outerHTML;
    });

    if (!/<h1/i.test(html)) throw new Error('brak <h1> po renderze');

    const outFile =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, `${route.replace(/^\//, '')}.html`);
    fs.writeFileSync(outFile, html, 'utf8');
    written += 1;
    console.log(`[prerender] ${route} -> ${path.basename(outFile)} (${Math.round(html.length / 1024)} KB)`);
  } catch (error) {
    failed.push(`${route} -> ${error.message}`);
  }
}

await browser.close();
server.close();

console.log(`[prerender] Zapisano ${written} z ${routes.length} tras`);
if (failed.length) {
  console.error(`[prerender] Nie udalo sie:\n  ${failed.join('\n  ')}`);
  process.exitCode = 1;
}
