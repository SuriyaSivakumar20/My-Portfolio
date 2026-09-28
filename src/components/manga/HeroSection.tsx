import { useLayoutEffect, useRef } from 'react';
import { scrollToSection, gsap } from '../../lib/manga/scroll';
import { prefersReducedMotion } from '../../lib/anim/reduced';

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

  /* Subtle entrance animation on load */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero__artwork-wrap',
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out' }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      data-section
      ref={root}
      className="hero relative h-[100svh] min-h-[100svh] w-full overflow-hidden bg-[var(--paper)]"
    >
      {/* Hidden H1 for SEO & screen reader accessibility */}
      <h1 className="sr-only">
        Suriya Sivakumar — Full Stack Engineer, Problem Solver & Lifelong Learner
      </h1>

      {/* Main Artwork Stage: fills 100% of viewport edge-to-edge with no excess layout borders */}
      <div
        ref={artworkRef}
        className="hero__artwork-wrap absolute inset-0 w-full h-full overflow-hidden"
      >
        <img
          src="/art/home.png"
          alt="Suriya Sivakumar - Portfolio Artwork Plate"
          className="hero__artwork w-full h-full object-cover object-center select-none pointer-events-none"
          loading="eager"
          decoding="async"
        />

        {/* Minimal sleek scroll down indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            onClick={() => scrollToSection('about')}
            className="group flex flex-col items-center gap-1.5 p-2 text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--ink-3)] hover:text-[var(--accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Scroll to About section"
          >
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">Scroll</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce text-[var(--accent)]"
              aria-hidden="true"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="seam" aria-hidden="true" />
    </section>
  );
}

