// Audyt mobile-first superirek.pl: przewijanie w bok, cele dotyku, rozmiary tekstu,
// obrazy ponad potrzeby, pola formularza (zoom na iOS).
import { chromium, devices } from 'playwright';

const STRONY = [
  ['/', 'strona główna'],
  ['/cennik', 'cennik'],
  ['/montaz-mebli-raciborz', 'montaż mebli'],
];
const SZEROKOSCI = [320, 360, 390, 430];
const BAZA = 'https://superirek.pl';

const browser = await chromium.launch();

for (const [sciezka, nazwa] of STRONY) {
  console.log(`\n=== ${nazwa} (${sciezka}) ===`);
  for (const szer of SZEROKOSCI) {
    const ctx = await browser.newContext({
      ...devices['iPhone 12'],
      viewport: { width: szer, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(BAZA + sciezka, { waitUntil: 'networkidle', timeout: 60000 });
    // przewin, zeby odpalic animacje whileInView
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    const wynik = await page.evaluate((szer) => {
      const d = document.documentElement;
      const poziom = d.scrollWidth - szer;

      // co wystaje poza ekran
      const wystaje = [];
      document.querySelectorAll('body *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > szer + 1 || r.left < -1) {
          const st = getComputedStyle(el);
          if (st.position === 'fixed') return;
          wystaje.push({
            tag: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').filter(Boolean).slice(0, 2).join('.') : ''),
            lewo: Math.round(r.left),
            prawo: Math.round(r.right),
          });
        }
      });

      // cele dotyku ponizej 44 px
      const male = [];
      document.querySelectorAll('a, button, summary, input, [role="button"]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.height < 44 || r.width < 44) {
          male.push({
            tag: el.tagName.toLowerCase(),
            tekst: (el.textContent || '').trim().slice(0, 30),
            wym: `${Math.round(r.width)}x${Math.round(r.height)}`,
          });
        }
      });

      // tekst mniejszy niz 14 px
      const drobny = [];
      document.querySelectorAll('p, li, span, td, label, figcaption, small').forEach((el) => {
        if (!el.textContent.trim()) return;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 14) drobny.push({ tag: el.tagName.toLowerCase(), px: fs, tekst: el.textContent.trim().slice(0, 28) });
      });

      // pola formularza < 16 px = iOS przybliza ekran przy kliknieciu
      const zoomIOS = [];
      document.querySelectorAll('input, textarea, select').forEach((el) => {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 16) zoomIOS.push({ tag: el.tagName.toLowerCase(), px: fs });
      });

      // obrazy podawane wiekszymi niz wyswietlane
      const obrazy = [];
      document.querySelectorAll('img').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!el.naturalWidth || r.width === 0) return;
        const nadmiar = el.naturalWidth / (r.width * devicePixelRatio);
        if (nadmiar > 2) obrazy.push({ src: el.currentSrc.split('/').pop(), natur: el.naturalWidth, pokaz: Math.round(r.width), krotnosc: nadmiar.toFixed(1) });
      });

      return { poziom, wystaje: wystaje.slice(0, 6), male, drobny: drobny.slice(0, 6), zoomIOS, obrazy, wysokosc: document.body.scrollHeight };
    }, szer);

    const uniq = (arr, k) => [...new Map(arr.map((x) => [x[k], x])).values()];
    console.log(`\n-- ${szer}px | wysokość strony ${wynik.wysokosc}px`);
    console.log(`   przewijanie w bok: ${wynik.poziom > 0 ? 'TAK, o ' + wynik.poziom + 'px  <-- BŁĄD' : 'nie'}`);
    if (wynik.wystaje.length) console.log('   wystaje poza ekran:', JSON.stringify(wynik.wystaje));
    const maleU = uniq(wynik.male, 'tekst');
    console.log(`   cele dotyku < 44px: ${maleU.length}`, maleU.slice(0, 6).map((m) => `${m.tekst || m.tag}[${m.wym}]`).join(', '));
    console.log(`   tekst < 14px: ${wynik.drobny.length}`, wynik.drobny.slice(0, 3).map((d) => `${d.px}px "${d.tekst}"`).join(' | '));
    if (wynik.zoomIOS.length) console.log('   pola < 16px (iOS zoom):', JSON.stringify(wynik.zoomIOS));
    if (wynik.obrazy.length) console.log('   obrazy za duże:', JSON.stringify(wynik.obrazy.slice(0, 4)));

    await ctx.close();
  }
}

await browser.close();
