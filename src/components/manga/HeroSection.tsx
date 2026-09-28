import { useLayoutEffect, useRef } from 'react';
import { hero } from '../../data/manga';
import { scrollToSection, gsap } from '../../lib/manga/scroll';
import { useParallax } from '../../lib/manga/hooks';
import { prefersReducedMotion } from '../../lib/anim/reduced';

const LEAVES = [
  { left: '62%', dur: 15, delay: 0, scale: 1 },
  { left: '74%', dur: 19, delay: 4, scale: 0.8 },
  { left: '86%', dur: 17, delay: 9, scale: 1.15 },
  { left: '30%', dur: 22, delay: 12, scale: 0.7 },
];

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  /* layered drift: block 0.2, forests 0.5, figure 0.35 — all settle at
     y=0 on load (mid-point of the scrub), so the cover opens as drawn   */
  useParallax(root);

  /* Full-page figure: the box runs from the stage top down to the fold
     (measured — never guessed), so the WHOLE drawing prints and nothing
     is cut at the sheet edge. The caption rail's real height is what
     decides it, so it stays exact on every fold.                        */
  useLayoutEffect(() => {
    const el = root.current;
    const stage = el?.querySelector<HTMLElement>('.hero__stage');
    if (!el || !stage) return;

    const apply = () => {
      const h = Math.round(
        el.getBoundingClientRect().bottom - stage.getBoundingClientRect().top,
      );
      el.style.setProperty('--hero-fig', `${Math.max(0, h)}px`);
    };
    apply();

    /* font swaps and caption reflows move the stage top — watch it */
    const ro = new ResizeObserver(apply);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  /* The video opens inside a giant wordmark and pulls back. Same move:
     the type starts oversized and settles into the layout. */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero__wordmark', {
        scale: 4.6,
        yPercent: 18,
        transformOrigin: '50% 50%',
        duration: 1.55,
      })
        .from(
          '.hero__character',
          { yPercent: 16, opacity: 0, duration: 1.15, ease: 'power3.out' },
          '-=1.05',
        )
        .from(
          /* yPercent, never y: parallax owns the px channel on these */
          '.hero__block, .hero__forest',
          { opacity: 0, yPercent: 8, duration: 1, stagger: 0.09 },
          '-=0.95',
        )
        .from(
          '.hero__line',
          { y: 26, opacity: 0, duration: 0.7, stagger: 0.075, ease: 'power3.out' },
          '-=0.85',
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      data-section
      ref={root}
      className="hero relative min-h-[100svh] overflow-hidden flex flex-col pt-[calc(var(--shell-h)+14px)]"
    >
      {/* ---------------- background furniture ---------------- */}
      <img
        src="/art/orange-block.webp"
        alt=""
        aria-hidden="true"
        data-speed="0.2"
        className="hero__block absolute select-none pointer-events-none
                   left-[4vw] top-[16%] max-lg:top-[30%] w-[22vw] max-w-[300px] h-[64%]
                   object-cover opacity-95"
      />
      <img
        src="/art/forest-l.webp"
        alt=""
        aria-hidden="true"
        data-speed="0.5"
        className="hero__forest absolute left-0 bottom-0 w-[24vw] max-w-[330px] pointer-events-none"
      />
      <img
        src="/art/forest-r.webp"
        alt=""
        aria-hidden="true"
        data-speed="0.5"
        className="hero__forest absolute right-0 bottom-0 w-[34vw] max-w-[520px] pointer-events-none"
      />

      {/* ---------------- top rail ---------------- */}
      <div className="hero__intro relative z-30 px-5 sm:px-8 lg:px-12 flex items-start justify-between gap-6">
        <div>
          <p className="kicker hero__line">
            <span className="kicker__num tnum">01</span>
            <span className="kicker__rule" />
            <span>{hero.kicker}</span>
          </p>
          <ul className="hero__tags mt-4 grid gap-1.5 hero__line">
            {hero.tagsLeft.map((t) => (
              <li key={t} className="label label--ink flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__aside flex flex-col items-end gap-3">
          <div className="hero__meta meta-list hero__line" aria-hidden="true">
            {hero.tagsRight.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <span className="hero__barcode hero__line block w-24 h-7 opacity-80" aria-hidden="true" />
        </div>
      </div>

      {/* ---------------- stage ---------------- */}
      <div className="hero__stage relative flex-1 min-h-0">
        {/* character sits in front of the type, exactly like the plate */}
        <img
          src="/art/hero-character.webp"
          alt="Ink illustration of Suriya, drawn in manga style"
          data-speed="0.35"
          className="hero__character absolute z-20 pointer-events-none select-none"
        />

        <span className="bracket bracket--tl hero__line absolute z-30 left-[5vw] top-[6%]" />
        <span className="bracket bracket--br hero__line absolute z-30 right-[6vw] bottom-[4%]" />

        <div className="hero__wordbox absolute inset-0 z-10 flex items-center justify-center max-lg:items-start max-lg:pt-1 px-5 sm:px-8 lg:px-12">
          <h1
            className="hero__wordmark wordmark wordmark--textured text-center
                       text-[clamp(3.4rem,17vw,15.5rem)] w-full"
          >
            {hero.wordmark}
          </h1>
        </div>

        {/* right-hand running list, straight off the plate */}
        <ul className="hero__foot-right hero__line absolute z-30 right-[5vw] top-1/2 -translate-y-1/2
                       hidden md:grid lg:flex lg:flex-wrap lg:justify-end lg:top-[2%] lg:translate-y-0
                       gap-2 lg:gap-x-4 lg:gap-y-1 text-right">
          {hero.footRight.map((t) => (
            <li key={t} className="label label--ink">
              {t}
            </li>
          ))}
        </ul>

        <p
          className="hero__line absolute z-30 left-[1vw] bottom-[16%] hidden lg:block label"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {hero.footLeft.join(' · ')}
        </p>
      </div>

      {/* ---------------- bottom rail ---------------- */}
      <div className="hero__bottom relative z-30 px-5 sm:px-8 lg:px-12 pb-8 pt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-7">
        <div className="hero__caption panel hero-caption max-w-[500px] p-5 pr-7">
          <p className="hero__role display text-[clamp(1.1rem,2vw,1.55rem)] hero__line">
            {hero.role}
          </p>
          <hr className="hero__rule rule rule--accent rule--short my-3 hero__line" />
          <p className="hero__lead body-copy hero__line text-[0.88rem]">{hero.lead}</p>

          <div className="hero__cta mt-5 flex flex-wrap gap-3 hero__line">
            <button className="btn btn--primary btn--sm" onClick={() => scrollToSection('projects')}>
              <span>View projects</span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
            <button className="btn btn--sm" onClick={() => scrollToSection('about')}>
              <span>About me</span>
            </button>
          </div>
        </div>

        <div className="hero__scroll relative self-start lg:self-end">
          <button
            onClick={() => scrollToSection('about')}
            className="hero__line panel hero-tag flex items-center gap-3 label min-h-[40px] hover:text-[var(--accent-dark)] transition-colors"
          >
            <span>{hero.scrollNote}</span>
            <span className="w-9 h-[1.5px] bg-[var(--ink)]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* drifting leaves — the plate's foreground layer */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden="true">
        {LEAVES.map((l, i) => (
          <span
            key={i}
            className="leaf"
            style={{
              left: l.left,
              animationName: 'leaf-drift',
              animationDuration: `${l.dur}s`,
              animationDelay: `${l.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              width: `${22 * l.scale}px`,
              height: `${13 * l.scale}px`,
            }}
          />
        ))}
      </div>

      <div className="seam" aria-hidden="true" />
    </section>
  );
}
