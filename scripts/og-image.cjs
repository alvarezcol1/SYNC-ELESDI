/**
 * Regenerates public/og-image.jpg (1200×630) from the live hero.
 * Usage: start `npm run dev`, then `node scripts/og-image.cjs [url]`.
 * Requires Playwright with a Chromium build (`npx playwright install chromium`).
 * Re-run after the official logo/photography are added.
 */
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const url = process.argv[2] || 'http://localhost:5173/';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addStyleTag({
    content: `.nav,.hero__scroll,.scroll-progress,.hero__ctas{display:none!important}
      .hero{min-height:630px!important}.hero__content{padding-top:120px!important}`,
  });
  await page.waitForTimeout(3200); // let entrance animations and callouts finish
  await page.screenshot({
    path: path.join(__dirname, '..', 'public', 'og-image.jpg'),
    type: 'jpeg',
    quality: 86,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await browser.close();
  console.log('Wrote public/og-image.jpg');
})();
