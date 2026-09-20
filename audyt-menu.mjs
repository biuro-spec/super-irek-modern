// Sprawdzenie menu na telefonie: otwarcie, rozwijana lista usług, cele dotyku,
// czy wszystko mieści się na ekranie i czy pasek kontaktu nie zasłania pozycji.
import { chromium, devices } from 'playwright';

const SP = 'C:/Users/LIFE-R~1/AppData/Local/Temp/claude/e--antigravity/0354d09c-5d0b-4a58-a268-87a378fe9297/scratchpad/';
const browser = await chromium.launch();

for (const [szer, wys] of [[360, 780], [390, 844]]) {
  const ctx = await browser.newContext({ ...devices['iPhone 12'], viewport: { width: szer, height: wys }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto('https://superirek.pl/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);

  console.log(`\n=== ${szer}x${wys} ===`);

  // 1. otwarcie menu
  await page.click('.menu-toggle');
  await page.waitForTimeout(700);
  if (szer === 390) await page.screenshot({ path: SP + 'menu-otwarte.png' });

  const poOtwarciu = await page.evaluate(() => {
    const menu = document.querySelector('.nav-links');
    const r = menu.getBoundingClientRect();
    const pozycje = [...menu.querySelectorAll(':scope > li')].map((li) => {
      const el = li.querySelector('a, button') || li;
      const rr = el.getBoundingClientRect();
      return { tekst: el.textContent.trim().slice(0, 22), wys: Math.round(rr.height), gora: Math.round(rr.top), widoczny: rr.top >= 0 && rr.bottom <= innerHeight };
    });
    return {
      menuNaEkranie: Math.round(r.left) + '..' + Math.round(r.right) + ' (ekran 0..' + innerWidth + ')',
      szerokoscMenu: Math.round(r.width),
      przewijalne: menu.scrollHeight > menu.clientHeight,
      pozycje,
      zasloniete: pozycje.filter((p) => !p.widoczny).length,
    };
  });
  console.log('  menu zajmuje:', poOtwarciu.menuNaEkranie, '| szerokość', poOtwarciu.szerokoscMenu + 'px');
  console.log('  pozycje:', poOtwarciu.pozycje.map((p) => `${p.tekst}[${p.wys}px]`).join(', '));
  console.log('  poza ekranem:', poOtwarciu.zasloniete, '| menu przewijalne:', poOtwarciu.przewijalne);

  // 2. rozwiniecie listy uslug
  await page.click('.nav-dropdown-toggle');
  await page.waitForTimeout(600);
  if (szer === 390) await page.screenshot({ path: SP + 'menu-uslugi.png' });

  const poRozwinieciu = await page.evaluate(() => {
    const menu = document.querySelector('.nav-links');
    const lista = document.querySelector('.nav-dropdown-menu');
    const st = getComputedStyle(lista);
    const poz = [...lista.querySelectorAll('a')].map((a) => {
      const r = a.getBoundingClientRect();
      return { tekst: a.textContent.trim().slice(0, 22), wys: Math.round(r.height), dol: Math.round(r.bottom), widoczny: r.top >= 0 && r.bottom <= innerHeight };
    });
    return {
      widoczna: st.display !== 'none' && st.visibility !== 'hidden',
      ile: poz.length,
      poz,
      poza: poz.filter((p) => !p.widoczny).length,
      calaWysokoscMenu: menu.scrollHeight,
      ekran: innerHeight,
      przewijalne: menu.scrollHeight > menu.clientHeight,
    };
  });
  console.log('  lista usług widoczna:', poRozwinieciu.widoczna, '| pozycji:', poRozwinieciu.ile);
  console.log('  ', poRozwinieciu.poz.map((p) => `${p.tekst}[${p.wys}px]${p.widoczny ? '' : ' <-POZA EKRANEM'}`).join(', '));
  console.log('  wysokość treści menu:', poRozwinieciu.calaWysokoscMenu, 'px | ekran:', poRozwinieciu.ekran, 'px | przewijalne:', poRozwinieciu.przewijalne);
  if (poRozwinieciu.poza) console.log('  !!! poza ekranem:', poRozwinieciu.poza, 'pozycji');

  // 3. czy klikniecie w pozycje zamyka menu i przenosi
  await page.click('.nav-dropdown-menu a');
  await page.waitForTimeout(1200);
  const po = await page.evaluate(() => ({ url: location.pathname, menuOtwarte: document.querySelector('.nav-links').classList.contains('active') }));
  console.log('  po kliknięciu w usługę:', po.url, '| menu zamknięte:', !po.menuOtwarte);

  await ctx.close();
}

await browser.close();
