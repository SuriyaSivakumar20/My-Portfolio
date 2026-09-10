import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import Reveal from '../../lib/anim/Reveal';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { experience } from '../../data/content';

const YEARS = ['2025–26', '2025', '2025', '2025', '2023–'];

/**
 * Experience — a system log timeline. The active entry expands as you
 * scroll; resolved entries settle quieter behind it; a year clock
 * follows the cursor of the log.
 */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const detailRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = prefersReducedMotion();

  // Scroll progress of the whole section → spine fill
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight * 0.6;
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / total));
        if (spineFillRef.current) spineFillRef.current.style.transform = `scaleY(${p})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active row detection
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '0px 0px -52% 0px', threshold: 0.01 },
    );
    detailRefs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  // Expand active / collapse the rest
  useEffect(() => {
    detailRefs.current.forEach((detail, i) => {
      if (!detail) return;
      const active = i === activeIndex;
      if (reduced) {
        detail.style.height = active ? 'auto' : '0px';
        return;
      }

      let targetH = 0;
      if (active) {
        detail.style.height = 'auto';
        targetH = detail.getBoundingClientRect().height;
        detail.style.height = '0px';
      }

      anime.remove(detail);
      anime({
        targets: detail,
        height: targetH,
        duration: active ? 340 : 240,
        easing: active ? 'cubicBezier(0.16, 1, 0.3, 1)' : 'easeInOutQuad',
        complete: () => {
          if (active) detail.style.height = 'auto';
          else detail.style.height = '0px';
        },
      });

      const kids = Array.from(detail.querySelectorAll<HTMLElement>('[data-exp-part]'));
      if (active) {
        anime.remove(kids);
        anime({
          targets: kids,
          opacity: [0, 1],
          translateY: [16, 0],
          delay: anime.stagger(25, { start: 40 }),
          duration: 280,
          easing: 'easeOutQuad',
        });
      } else {
        anime.remove(kids);
        anime({
          targets: kids,
          opacity: 0,
          translateY: 8,
          duration: 140,
          easing: 'easeInQuad',
        });
      }
    });

    const clock = clockRef.current;
    if (clock) {
      clock.textContent = YEARS[activeIndex];
      anime.remove(clock);
      anime({
        targets: clock,
        opacity: [0.15, 1],
        translateY: [10, 0],
        duration: 480,
        easing: 'easeOutExpo',
      });
    }
  }, [activeIndex, reduced]);

  return (
    <section id="experience" data-section ref={sectionRef} className="relative py-28 md:py-40">
      <div className="px-5 sm:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>02</span> / EXPERIENCE — SYSTEM LOG
            </div>
          </Reveal>
          <div className="text-right">
            <Reveal y={14} delay={80}>
              <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
                SCROLL TO TRAVERSE
              </div>
            </Reveal>
            <div className="font-mono text-[30px] md:text-[44px] text-[var(--ink-strong)] leading-none mt-2 md:mt-4">
              <span ref={clockRef} className="os-timeline-num inline-block">
                {YEARS[activeIndex]}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#161c24]" aria-hidden="true">
            <div
              ref={spineFillRef}
              className="absolute inset-0 origin-top bg-[var(--accent)]"
              style={{ transform: 'scaleY(0)', opacity: 0.7 }}
            />
          </div>

          <div className="max-w-3xl">
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                className="relative"
                style={{ marginLeft: 28 }}
                data-cursor="view"
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {/* Node marker */}
                <div
                  className="absolute -left-[34px] top-6 w-2.5 h-2.5 rounded-full border transition-colors duration-300"
                  style={{
                    background: 'var(--bg)',
                    borderColor: i === activeIndex ? 'var(--accent)' : '#232b36',
                    boxShadow: i === activeIndex ? '0 0 0 4px var(--accent-soft)' : 'none',
                  }}
                  aria-hidden="true"
                />

                {/* Compact row */}
                <div
                  className={`flex items-baseline gap-3 sm:gap-4 py-5 pt-6 pr-2 transition-opacity duration-300 ${
                    i === activeIndex ? 'opacity-100' : 'opacity-70 group-hover:opacity-90'
                  }`}
                >
                  <span className="os-label shrink-0" style={{ fontSize: 10 }}>
                    {exp.current ? <span className="text-[var(--ok)]">● CURRENT</span> : '▸ ENTRY'}
                  </span>
                  <h3 className="font-display text-[clamp(17px,2.4vw,26px)] font-medium tracking-[-0.01em] text-[var(--ink-strong)] truncate">
                    {exp.role}
                  </h3>
                  <span className="os-label ml-auto shrink-0 whitespace-nowrap" style={{ fontSize: 10, opacity: 0.7 }}>
                    {exp.period}
                  </span>
                </div>

                {/* Expandable detail */}
                <div
                  ref={(el) => {
                    detailRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="overflow-hidden"
                  style={{ height: 0 }}
                >
                  <div className="pb-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4" data-exp-part>
                      <span className="os-label" style={{ fontSize: 10 }}>ORG</span>
                      <span className="font-mono text-[13px] text-[var(--ink)]">{exp.company}</span>
                    </div>

                    <div className="flex items-center flex-wrap gap-2 mb-5" data-exp-part>
                      {exp.verbs.map((v) => (
                        <span
                          key={v}
                          className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent)] border border-[var(--accent-line)] bg-[var(--accent-soft)] px-2.5 py-1"
                        >
                          {v}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-6" data-exp-part>
                      {exp.lines.map((line, li) => (
                        <p key={li} className="text-[13.5px] leading-[1.7] text-[var(--ink-muted)]">
                          <span className="text-[var(--accent)] mr-2">·</span>
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2" data-exp-part>
                      {exp.tags.map((t) => (
                        <span
                          key={t}
                          className="os-label border border-[#1c232c] px-2.5 py-1"
                          style={{ fontSize: 9.5 }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="mt-16">
          <p className="os-label" style={{ fontSize: 10, opacity: 0.45 }}>
            REACHED END OF LOG — {experience.length} ENTRIES
          </p>
        </Reveal>
      </div>
    </section>
  );
}