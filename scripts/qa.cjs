/* QA pass: console errors, nav, mobile menu, contact form submit.
   Usage: node scripts/qa.cjs [width] [height]                          */
const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const W = Number(process.argv[2] || 390);
const H = Number(process.argv[3] || 844);
const BASE = process.argv[4] || 'http://localhost:5173/';

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(2200);

  /* mobile menu */
  if (W < 768) {
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `.ref/shots/qa-menu-${W}.png` });
    await page.locator('div.fixed.inset-0 button', { hasText: 'Projects' }).first().click();
    await page.waitForTimeout(1600);
    const afterNav = await page.evaluate(() => window.scrollY);
    console.log('mobile nav scrollY:', afterNav);
  } else {
    await page.click('nav >> text=Projects');
    await page.waitForTimeout(1600);
    console.log('desktop nav scrollY:', await page.evaluate(() => window.scrollY));
  }

  /* contact form → mailto */
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  });
  await page.waitForTimeout(900);
  await page.fill('input[name="name"]', 'QA Bot');
  await page.fill('input[name="email"]', 'qa@example.com');
  await page.fill('input[name="subject"]', 'Hello');
  await page.fill('textarea[name="message"]', 'Testing the form.');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1200);
  const status = await page.textContent('[role="status"]');
  console.log('form status:', status);

  /* every section is reachable and has content */
  const sections = await page.evaluate(() =>
    ['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((id) => {
      const el = document.getElementById(id);
      return { id, h: el ? Math.round(el.getBoundingClientRect().height) : 0 };
    }),
  );
  console.log('sections:', JSON.stringify(sections));
  console.log('errors:', JSON.stringify(errors));

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
