/* =========================================================
   SCROLL HOOKS — animation lives here, never in content.
   ========================================================= */

import { RefObject, useLayoutEffect, useState } from 'react';
import { gsap, ScrollTrigger } from './scroll';
import { prefersReducedMotion } from '../anim/reduced';
import { navSections } from '../../data/manga';

/** Which chapter sits under the running head — drives aria-current. */
export function useActiveSection(): string {
  const [active, setActive] = useState('home');

  useLayoutEffect(() => {
    const onScroll = () => {
      let current = 'home';
      for (const s of navSections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
}

type RevealOptions = {
  start?: string;
  stagger?: number;
  y?: number;
  /** reveal children individually instead of as one batch */
  each?: boolean;
};

/** `plain` slides up, `stamp` presses in like a rubber stamp, `wipe` prints
    itself across the line (clip-path) — all settle at opacity 1. */
type RevealKind = 'plain' | 'stamp' | 'wipe';

const kindOf = (el: HTMLElement): RevealKind => {
  const v = el.dataset.reveal;
  return v === 'stamp' ? 'stamp' : v === 'wipe' ? 'wipe' : 'plain';
};

/** Fades/slides every [data-reveal] child in once the block is reached. */
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: RevealOptions = {},
): void {
  const { start = 'top 82%', stagger = 0.07, y = 30, each = false } = options;

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { clearProps: 'all', opacity: 1 });
      return;
    }

    /* per-kind motion — every branch finishes inside the plain slide's
       0.85s budget, so QA's 1600ms settle window still sees opacity 1.
       clearProps on completion hands the element back to CSS (so the
       card hover-lift and friends are not shadowed by inline styles). */
    const fx: Record<
      RevealKind,
      { from: gsap.TweenVars; to: gsap.TweenVars }
    > = {
      plain: {
        from: { opacity: 0, y },
        to: { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', clearProps: 'all' },
      },
      stamp: {
        from: { opacity: 0, scale: 1.55, rotate: -7 },
        to: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'back.out(1.9)',
          clearProps: 'all',
        },
      },
      wipe: {
        from: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        to: {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.7,
          delay: 0.05,
          ease: 'power4.inOut',
          clearProps: 'all',
        },
      },
    };

    const ctx = gsap.context(() => {
      const groups: Record<RevealKind, HTMLElement[]> = {
        plain: [],
        stamp: [],
        wipe: [],
      };
      targets.forEach((t) => groups[kindOf(t)].push(t));

      if (each) {
        targets.forEach((t) => {
          const k = kindOf(t);
          gsap.fromTo(t, fx[k].from, {
            ...fx[k].to,
            scrollTrigger: { trigger: t, start, once: true },
          });
        });
        return;
      }

      (Object.keys(groups) as RevealKind[]).forEach((k) => {
        const items = groups[k];
        if (!items.length) return;
        gsap.fromTo(items, fx[k].from, {
          ...fx[k].to,
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ref, start, stagger, y, each]);
}

/**
 * Layered parallax. Every [data-speed] child drifts against the scroll —
 * background 0.1x, architecture 0.2x, character 0.35x, foreground 0.5x.
 */
export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>): void {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-speed]'));
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const speed = Number(item.dataset.speed ?? 0.2);
        const amp = speed * 220;
        const scope = item.closest<HTMLElement>('[data-parallax-scope]') ?? root;
        gsap.fromTo(
          item,
          { y: -amp },
          {
            y: amp,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [ref]);
}

/** Line that draws itself as the timeline scrolls past. */
export function useDrawLine(ref: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.transform = 'scaleY(1)';
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top 70%',
          end: 'bottom 75%',
          scrub: 0.5,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [ref]);
}

/**
 * Every chapter glides into place as it enters the viewport — a scrubbed
 * y-slide + fade on the section itself, so the whole scroll path reads
 * as one continuous transition instead of hard cuts. Runs once for all
 * sections (they are static), skips the hero (own load timeline) and
 * respects reduced motion by never touching anything.
 */
export function useSectionFlow(): void {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main [data-section]'),
    ).filter((s) => s.id !== 'home');
    if (!sections.length) return;

    const ctx = gsap.context(() => {
      sections.forEach((s) => {
        gsap.fromTo(
          s,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: s,
              start: 'top 94%',
              end: 'top 65%',
              scrub: 0.4,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);
}

export function refreshScroll(): void {
  ScrollTrigger.refresh();
}
