// Pomiar wydajnosci na telefonie bez Lighthouse: LCP, CLS, przesylane bajty.
import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices['iPhone 12'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

// spowolnienie sieci zblizone do 4G (Lighthouse mobile)
const cdp = await ctx.newCDPSession(page);
await cdp.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8,
});
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

const zasoby = {};
page.on('response', async (r) => {
  try {
    const dl = (await r.body()).length;
    const typ = r.request().resourceType();
    zasoby[typ] = (zasoby[typ] || 0) + dl;
  } catch {}
});

const start = Date.now();
await page.goto('https://superirek.pl/', { waitUntil: 'load', timeout: 120000 });

const metryki = await page.evaluate(() => new Promise((res) => {
  let lcp = 0, cls = 0, lcpEl = '';
  new PerformanceObserver((l) => {
    const e = l.getEntries().at(-1);
    lcp = e.startTime;
    lcpEl = e.element ? e.element.tagName + (e.element.className ? '.' + String(e.element.className).split(' ')[0] : '') : '';
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
  setTimeout(() => {
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    res({ lcp: Math.round(lcp), lcpEl, cls: cls.toFixed(3), fcp: fcp ? Math.round(fcp.startTime) : null });
  }, 4000);
}));

console.log('Pomiar na iPhonie 12, sieć 4G, procesor spowolniony 4x:\n');
console.log(`  FCP (pierwszy tekst)     ${metryki.fcp} ms`);
console.log(`  LCP (największy element) ${metryki.lcp} ms   element: ${metryki.lcpEl}`);
console.log(`  CLS (skakanie układu)    ${metryki.cls}`);
console.log(`  czas do 'load'           ${Date.now() - start} ms\n`);
console.log('Pobrane dane:');
Object.entries(zasoby).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(12)} ${(v / 1024).toFixed(0).padStart(5)} KB`));
console.log(`  ${'RAZEM'.padEnd(12)} ${(Object.values(zasoby).reduce((a, b) => a + b, 0) / 1024).toFixed(0).padStart(5)} KB`);

await browser.close();
