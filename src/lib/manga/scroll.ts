/* =========================================================
   SCROLL ENGINE
   Lenis drives the wheel, GSAP's ticker drives Lenis, and
   ScrollTrigger reads Lenis. One loop, no fighting.
   ========================================================= */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { prefersReducedMotion } from '../anim/reduced';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let detach: (() => void) | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

/** Boots smooth scrolling. Returns a cleanup fn. Safe to call twice. */
export function startScroll(): () => void {
  if (detach) return detach;
  if (typeof window === 'undefined') return () => undefined;

  const reduced = prefersReducedMotion();

  if (!reduced) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    detach = () => {
      gsap.ticker.remove(raf);
      lenis?.off('scroll', onScroll);
      lenis?.destroy();
      lenis = null;
      detach = null;
    };
  } else {
    detach = () => {
      detach = null;
    };
  }

  // images land after first paint and change every section's height
  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);

  const prev = detach;
  detach = () => {
    window.removeEventListener('load', onLoad);
    prev?.();
  };
  return detach;
}

/** Smooth-scroll to a section id (used by the nav + hero CTAs). */
export function scrollToSection(id: string, offset = 0): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis && !prefersReducedMotion()) {
    // Lenis already honours the section's scroll-margin-top (96px, clears the nav)
    lenis.scrollTo(el, { offset, duration: 1.35 });
    return;
  }
  const margin =
    parseFloat(window.getComputedStyle(el).scrollMarginTop || '0') || 0;
  const top = el.getBoundingClientRect().top + window.scrollY - margin + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export { gsap, ScrollTrigger };
