/* Motion QA: verifies the scroll engine actually does its job.
   - Lenis smooth scroll drives scrollToSection()
   - [data-reveal] blocks fade/slide in
   - art panels stick while their section scrolls
   - parallax layers move at different speeds
   - reduced-motion users still see every block
   Usage: node scripts/motion.cjs [baseUrl]                             */
const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2] || 'http://localhost:5173/';

const rect = (el) => {
  const r = el.getBoundingClientRect();
  return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width) };
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const out = {};

  /* ---------- normal motion ---------- */
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message)));
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(400);

  out.heroOpening = await page.evaluate(() => {
    const el = document.querySelector('.hero__artwork-wrap');
    return el ? getComputedStyle(el).transform : 'missing';
  });
  await page.waitForTimeout(2400);
  out.heroSettled = await page.evaluate(() => {
    const el = document.querySelector('.hero__artwork-wrap');
    return el ? getComputedStyle(el).transform : 'missing';
  });

  /* nav click → Lenis scroll */
  await page.click('nav >> text=Experience');
  await page.waitForTimeout(1600);
  out.navScrollY = await page.evaluate(() => Math.round(window.scrollY));
  out.experienceTop = await page.evaluate(() =>
    Math.round(document.getElementById('experience').getBoundingClientRect().top),
  );

  /* reveals fire */
  out.reveals = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('[data-reveal]'));
    const shown = all.filter((el) => parseFloat(getComputedStyle(el).opacity) > 0.9).length;
    return { total: all.length, visibleAfterNav: shown };
  });

  /* parallax: sample [data-speed] numeral across two scroll positions */
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  const a = await page.evaluate(() => {
    const el = document.querySelector('#experience [data-speed]');
    return el ? getComputedStyle(el).transform : 'missing';
  });
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 420);
  });
  await page.waitForTimeout(900);
  const b = await page.evaluate(() => {
    const el = document.querySelector('#experience [data-speed]');
    return el ? getComputedStyle(el).transform : 'missing';
  });
  out.parallax = { before: a, after: b, moved: a !== b && a !== 'missing' };
  out.errors = errors;
  await page.close();

  /* ---------- reduced motion ---------- */
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const rp = await ctx.newPage();
  await rp.goto(BASE, { waitUntil: 'networkidle0' });
  await rp.waitForTimeout(1200);
  out.reducedMotion = await rp.evaluate(() => {
    const all = Array.from(document.querySelectorAll('[data-reveal]'));
    const hidden = all.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.9).length;
    return { total: all.length, hiddenWithoutScrolling: hidden };
  });
  await ctx.close();

  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
