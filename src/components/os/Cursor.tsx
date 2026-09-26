import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { animationDuration, prefersReducedMotion } from '../../lib/anim/reduced';

type CursorState = 'default' | 'view' | 'open' | 'text';

const LABEL: Record<CursorState, string> = {
  default: '',
  view: 'VIEW',
  open: 'OPEN',
  text: 'TEXT',
};

/**
 * Custom desktop cursor. Position is tracked with a minimal rAF lerp;
 * state transitions (hover grow + label) are driven by Anime.js.
 * Disabled on touch / coarse-pointer devices and under reduced motion.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const root = rootRef.current!;

    const base = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...base };
    let raf = 0;
    let state: CursorState = 'default';
    let scaleAnim: ReturnType<typeof anime> | null = null;

    const apply = (sx: number, sy: number) => {
      dot.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${sx}px, ${sy}px) translate(-50%, -50%)`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const loop = () => {
      base.x = lerp(base.x, target.x, 0.22);
      base.y = lerp(base.y, target.y, 0.22);
      apply(base.x, base.y);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setState = (next: CursorState) => {
      if (state === next) return;
      state = next;
      if (scaleAnim) scaleAnim.pause();
      const grow = next !== 'default';
      scaleAnim = anime({
        targets: { s: grow ? 1 : 0, v: grow ? 1 : 0 },
        s: grow ? 0.9 : 1,
        v: grow ? 1 : 0,
        duration: animationDuration(320),
        easing: grow ? 'easeOutExpo' : 'easeInOutQuad',
        update: (a) => {
          const v = Number(a.animations[0].currentValue);
          const lv = Number(a.animations[1].currentValue);
          ring.style.width = `${42 + v * 34}px`;
          ring.style.height = `${42 + v * 34}px`;
          ring.style.background = state === 'view'
            ? 'rgba(99, 211, 242, 0.08)'
            : state === 'text'
            ? 'rgba(94, 230, 140, 0.08)'
            : 'rgba(99, 211, 242, 0.04)';
          ring.style.borderColor = state === 'default'
            ? 'rgba(99, 211, 242, 0.55)'
            : 'rgba(99, 211, 242, 0.9)';
          label.textContent = LABEL[state];
          label.style.opacity = String(lv);
        },
      });
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
      root.dataset.visible = 'true';
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const el = t.closest('[data-cursor] , a, button, input, textarea, select') as HTMLElement | null;
      if (el) {
        const cursorType = el.dataset.cursor;
        if (cursorType === 'view') setState('view');
        else if (cursorType === 'open') setState('open');
        else if (t.closest('input, textarea, select')) setState('text');
        else setState('open');
      } else {
        setState('default');
      }
    };

    const onOut = () => {
      root.dataset.visible = 'false';
      setState('default');
    };

    const onDown = () => {
      if (scaleAnim) scaleAnim.pause();
      anime({
        targets: dot,
        scale: 0.6,
        duration: animationDuration(120),
        easing: 'easeOutQuad',
      });
      // Click ripple — keyframes live in index.css (.os-cursor-ripple)
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--accent);
        opacity: 0.6;
        z-index: 9998;
        transform: translate(-50%, -50%) scale(0);
      `;
      ripple.style.left = `${target.x}px`;
      ripple.style.top = `${target.y}px`;
      ripple.style.animation = 'os-cursor-ripple 0.5s ease-out forwards';
      document.documentElement.appendChild(ripple);
      // Clean up after animation
      setTimeout(() => ripple.remove(), 500);
    };
    const onUp = () => {
      anime({
        targets: dot,
        scale: 1,
        duration: animationDuration(200),
        easing: 'easeOutQuad',
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onOut);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (scaleAnim) scaleAnim.pause();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="os-cursor" data-visible="false" aria-hidden="true">
      <div ref={ringRef} className="os-cursor-ring">
        <span ref={labelRef} className="os-cursor-label" />
      </div>
      <div ref={dotRef} className="os-cursor-dot" />
    </div>
  );
}
