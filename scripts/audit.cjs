/* Layout audit: per-section overflow, tiny type, clipped text, unloaded
   images, font loading. Run at several viewports.
   Usage: node scripts/audit.cjs [width] [height]                       */
const { chromium } = require('playwright-core');

const CHROME = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const W = Number(process.argv[2] || 390);
const H = Number(process.argv[3] || 844);
const BASE = process.argv[4] || 'http://localhost:5173/';
const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(2200);

  const report = {};
  for (const id of SECTIONS) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60);
    }, id);
    await page.waitForTimeout(700);

    report[id] = await page.evaluate(() => {
      const clipped = (el) => {
        let n = el.parentElement;
        while (n && n !== document.documentElement) {
          const s = getComputedStyle(n);
          if (/(hidden|clip|auto|scroll)/.test(s.overflowX)) return true;
          n = n.parentElement;
        }
        return false;
      };
      const over = [];
      const tiny = [];
      const clippedText = [];
      const dead = [];
      document.querySelectorAll('main *, footer *').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width < 6 || r.height < 6) return;
        const inView = r.bottom > 0 && r.top < window.innerHeight;
        if (!inView) return;
        if (!clipped(el) && (r.right > window.innerWidth + 1 || r.left < -1)) {
          over.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} ${Math.round(r.left)}→${Math.round(r.right)}`);
        }
        const s = getComputedStyle(el);
        const fs = parseFloat(s.fontSize);
        const hasText = Array.from(el.childNodes).some(
          (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
        );
        if (hasText && fs < 12) tiny.push(`${fs}px "${el.textContent.trim().slice(0, 24)}"`);
        if (hasText && el.scrollWidth > el.clientWidth + 2 && s.overflow !== 'visible') {
          clippedText.push(`${el.textContent.trim().slice(0, 28)} (${el.scrollWidth}>${el.clientWidth})`);
        }
        if (el.tagName === 'IMG' && !el.complete) dead.push(el.getAttribute('src'));
      });
      return { over, tiny, clippedText, dead };
    });
  }

  const global = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    fontsBlack: document.fonts.check('16px "Archivo Black"'),
    fontsBody: document.fonts.check('16px "Archivo"'),
    badImages: Array.from(document.images)
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src),
  }));

  console.log(JSON.stringify({ viewport: `${W}x${H}`, global, report, errors }, null, 1));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
