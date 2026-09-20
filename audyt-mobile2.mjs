// Druga tura: wysokosci sekcji na telefonie + dokladna lista malych celow dotyku.
import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 12'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.goto('https://superirek.pl/', { waitUntil: 'networkidle', timeout: 60000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(600);

const dane = await page.evaluate(() => {
  const sekcje = [];
  document.querySelectorAll('header, section, footer').forEach((el) => {
    const r = el.getBoundingClientRect();
    sekcje.push({
      id: el.id || el.className.split(' ')[0] || el.tagName.toLowerCase(),
      wys: Math.round(r.height),
      ekranow: (r.height / window.innerHeight).toFixed(1),
    });
  });

  const sciezka = (el) => {
    const czesci = [];
    let e = el;
    for (let i = 0; i < 3 && e && e.tagName !== 'BODY'; i++) {
      czesci.unshift(e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className ? '.' + e.className.split(' ')[0] : ''));
      e = e.parentElement;
    }
    return czesci.join(' > ');
  };

  const male = [];
  document.querySelectorAll('a, button, summary, input').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.height < 44) male.push({ sciezka: sciezka(el), tekst: (el.textContent || '').trim().slice(0, 26), wys: Math.round(r.height) });
  });

  const galeria = document.querySelectorAll('#galeria img').length;
  return { sekcje, male, galeria, calosc: document.body.scrollHeight };
});

console.log('Wysokość strony:', dane.calosc, 'px = ', (dane.calosc / 844).toFixed(1), 'ekranów\n');
console.log('SEKCJE (390px):');
dane.sekcje.sort((a, b) => b.wys - a.wys).forEach((s) => console.log(`  ${String(s.wys).padStart(6)}px  ${String(s.ekranow).padStart(4)} ekr.  ${s.id}`));
console.log('\nZdjęć w galerii widocznych na starcie:', dane.galeria);
console.log('\nCELE DOTYKU PONIŻEJ 44px:');
const grupy = {};
dane.male.forEach((m) => { (grupy[m.sciezka] = grupy[m.sciezka] || []).push(m); });
Object.entries(grupy).forEach(([k, v]) => console.log(`  ${v.length}x  ${v[0].wys}px  ${k}  np. "${v[0].tekst}"`));

await browser.close();
