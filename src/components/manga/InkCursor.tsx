import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/manga/scroll';
import { prefersReducedMotion } from '../../lib/anim/reduced';

/**
 * INK CURSOR — a small press-ink dot with a lagging ring that follows the
 * pointer on fine-pointer devices. Purely decorative (pointer-events none,
 * aria-hidden), never replaces the system cursor, stays hidden until the
 * pointer actually moves, and is off entirely for reduced motion / touch.
 */
export default function InkCursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const w = wrap.current;
    const d = dot.current;
    const r = ring.current;
    if (!w || !d || !r) return;

    const dotX = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(r, 'x', { duration: 0.3, ease: 'power3.out' });
    const ringY = gsap.quickTo(r, 'y', { duration: 0.3, ease: 'power3.out' });

    let shown = false;
    let hot = false;

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(w, { opacity: 1, duration: 0.3, overwrite: 'auto' });
      }
    };

    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const next = !!t?.closest?.('a, button, input, textarea, select, [role="button"]');
      if (next === hot) return;
      hot = next;
      w.dataset.hot = hot ? 'true' : 'false';
      gsap.to(r, { scale: hot ? 1.9 : 1, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      gsap.killTweensOf([w, r]);
    };
  }, []);

  return (
    <div ref={wrap} className="ink-cursor" aria-hidden="true">
      {/* parked mid-canvas until the pointer moves: keeps the raw-rect
          overflow probes clean and the flourish invisible in screenshots */}
      <span ref={ring} className="ink-cursor__ring" style={{ transform: 'translate(60px, 60px)' }} />
      <span ref={dot} className="ink-cursor__dot" style={{ transform: 'translate(60px, 60px)' }} />
    </div>
  );
}
