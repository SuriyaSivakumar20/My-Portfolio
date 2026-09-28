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

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      if (each) {
        targets.forEach((t) => {
          gsap.to(t, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: t, start, once: true },
          });
        });
      } else {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
        });
      }
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
          { y: 56, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: s,
              start: 'top 96%',
              end: 'top 46%',
              scrub: 0.6,
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
