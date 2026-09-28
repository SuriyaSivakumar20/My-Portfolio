/* Headless QA shots: viewport screenshots at every section plus a full-page
   plate, console errors and an overflow check.
   Usage: node scripts/shots.cjs [baseUrl] [width] [height]            */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

const BASE = process.argv[2] || 'http://localhost:5173/';
const W = Number(process.argv[3] || 1920);
const H = Number(process.argv[4] || 1080);
const OUT = path.join(__dirname, '..', '.ref', 'shots', `${W}x${H}`);

const CHROME =
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: W, height: H } });

  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: path.join(OUT, '00-hero.png') });

  for (const id of SECTIONS) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 40);
    }, id);
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(OUT, `${id}.png`) });
  }

  // the page-turn band that sits above each chapter
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 210);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(OUT, 'turn.png') });

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const wide = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
        wide.push(
          `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} [${Math.round(r.left)},${Math.round(r.right)}]`,
        );
      }
    });
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      height: doc.scrollHeight,
      overflowing: wide.slice(0, 14),
      total: wide.length,
    };
  });

  await page.screenshot({ path: path.join(OUT, 'full.png'), fullPage: true });

  console.log(JSON.stringify({ metrics, errors: errors.slice(0, 20) }, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
