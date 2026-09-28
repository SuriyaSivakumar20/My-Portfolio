import { useEffect } from 'react';
import { gsap } from '../../lib/manga/scroll';
import { prefersReducedMotion } from '../../lib/anim/reduced';

/**
 * VELOCITY FX — the sheet reacts to how fast it is being read.
 *
 * 1. Ink speed-lines flare across the viewport while the page moves and
 *    clear the instant it rests (fixed overlay, decorative only).
 * 2. The whole content column leans a couple of degrees into the scroll
 *    and snaps back flat at rest — the classic print-magazine whip.
 *
 * Driven off actual scroll deltas on the gsap ticker (never Lenis state),
 * so every value provably returns to zero the moment scrolling stops.
 * Animation logic only — no content, no layout, no focusables.
 */
const LINES: { top: string; left: string; w: string; accent?: boolean }[] = [
  { top: '9%', left: '52%', w: '30vw' },
  { top: '17%', left: '64%', w: '24vw', accent: true },
  { top: '27%', left: '2%', w: '23vw' },
  { top: '38%', left: '56%', w: '34vw' },
  { top: '47%', left: '5%', w: '27vw', accent: true },
  { top: '58%', left: '47%', w: '31vw' },
  { top: '68%', left: '63%', w: '27vw' },
  { top: '78%', left: '1%', w: '30vw', accent: true },
  { top: '87%', left: '54%', w: '26vw' },
  { top: '94%', left: '71%', w: '19vw' },
];

export default function MotionFx() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const main = document.getElementById('main');
    if (!main) return;

    const skewTo = gsap.quickTo(main, 'skewY', { duration: 0.4, ease: 'power3.out' });
    const flareTo = gsap.quickTo('.streaks', 'opacity', { duration: 0.35, ease: 'power2.out' });
    const driftTo = gsap.quickTo('.streaks', 'x', { duration: 0.55, ease: 'power2.out' });

    let lastY = window.scrollY;
    let vel = 0;
    let prevSkew = 0;
    let prevFlare = -1;
    let prevDrift = 0;

    const tick = () => {
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;

      /* smoothed |px/frame|, hard-zeroed when a frame reports no motion */
      const ad = Math.abs(d);
      vel += (ad - vel) * (ad > vel ? 0.45 : 0.12);
      if (vel < 0.06) vel = 0;

      const flare = Math.min(1, vel / 34);
      const skew = d === 0 || vel === 0 ? 0 : Math.max(-2.2, Math.min(2.2, d * 0.16));
      const drift = d === 0 || vel === 0 ? 0 : -Math.sign(d) * Math.min(150, vel * 2.4);

      /* change-gated calls — but a zero target always lands, so the rest
         state is exactly 0 (identity transform, opacity 0), never a
         sub-threshold residue                                          */
      if (skew === 0 ? prevSkew !== 0 : Math.abs(skew - prevSkew) > 0.02) {
        skewTo(skew);
        prevSkew = skew;
      }
      if (flare === 0 ? prevFlare !== 0 : Math.abs(flare - prevFlare) > 0.012) {
        flareTo(flare * 0.55);
        prevFlare = flare;
      }
      if (drift === 0 ? prevDrift !== 0 : Math.abs(drift - prevDrift) > 0.5) {
        driftTo(drift);
        prevDrift = drift;
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.set(main, { skewY: 0 });
      gsap.set('.streaks', { opacity: 0, x: 0 });
    };
  }, []);

  return (
    <div className="streaks" aria-hidden="true">
      {LINES.map((l, i) => (
        <span
          key={i}
          className={`streak${l.accent ? ' streak--accent' : ''}`}
          style={{ top: l.top, left: l.left, width: l.w }}
        />
      ))}
    </div>
  );
}
