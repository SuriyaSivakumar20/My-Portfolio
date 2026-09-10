import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Reveal from '../../lib/anim/Reveal';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { stackGroups, experience } from '../../data/content';

/**
 * Skills — a terminal-style explorer. Groups render as a directory
 * tree; the side panel lists currently-active tooling.
 */
export default function Skills() {
  const treeRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const tree = treeRef.current;
    if (!tree) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const lines = Array.from(tree.querySelectorAll<HTMLElement>('[data-tree-line]'));
          anime({
            targets: lines,
            opacity: [0, 1],
            translateX: [-14, 0],
            delay: anime.stagger(34),
            duration: 420,
            easing: 'easeOutQuad',
          });
          io.disconnect();
        });
      },
      { threshold: 0.25 },
    );
    io.observe(tree);
    return () => io.disconnect();
  }, [reduced]);

  const activeInternship = experience.find((e) => e.current);

  return (
    <section id="skills" data-section className="relative py-28 md:py-40">
      <div className="px-5 sm:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>05</span> / SKILLS — EXPLORER
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
              $ tree ./engineering — DEPTH 1
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.35fr,0.65fr] gap-10">
          {/* Directory tree */}
          <Reveal delay={120} y={24}>
            <div
              ref={treeRef}
              className="border border-[#161c24] bg-[#0a0d11] font-mono text-[13px] leading-[1.9] p-5 sm:p-7 overflow-x-auto"
              aria-label="Skill directory tree"
            >
              <div className="os-label mb-5" style={{ fontSize: 10 }} data-tree-line>
                <span className="text-[var(--accent)]">suriya@os</span>
                <span className="text-[var(--ink-faint)]"> ~ $ </span>
                <span className="text-[var(--ink)]">tree ./stack --depth 1</span>
              </div>
              <div data-tree-line>
                <span className="text-[var(--accent)]">STACK</span>
                <span className="text-[var(--ink-faint)]">/</span>
              </div>
              {stackGroups.map((group, gi) => {
                const isLastGroup = gi === stackGroups.length - 1;
                return (
                  <div key={group.id}>
                    <div data-tree-line>
                      <span className="text-[var(--ink-faint)]">
                        {isLastGroup ? ' └──' : ' ├──'}
                      </span>{' '}
                      <span className="text-[var(--ink)] font-semibold">{group.label}/</span>
                    </div>
                    {group.items.map((item, ii) => {
                      const isLastItem = ii === group.items.length - 1;
                      return (
                        <div key={item} data-tree-line>
                          <span className="text-[var(--ink-faint)]">
                            {isLastGroup ? '     ' : ' │   '}
                            {isLastItem ? '└──' : '├──'}─
                          </span>{' '}
                          <span className="text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors">
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div data-tree-line className="mt-2">
                <span className="text-[var(--ink-faint)]">{stackGroups.length} groups · {stackGroups.reduce((n, g) => n + g.items.length, 0)} technologies</span>
              </div>
            </div>
          </Reveal>

          {/* Side panel */}
          <div className="space-y-4">
            <Reveal delay={200} y={22}>
              <div className="border border-[#161c24] bg-[var(--surface)]/50">
                <div className="px-5 py-3 border-b border-[#161c24] flex items-center justify-between">
                  <span className="os-label" style={{ color: 'var(--accent)' }}>ENABLED NOW</span>
                  <span className="os-label" style={{ fontSize: 10 }}>
                    {activeInternship?.company.split('—')[0].trim().toUpperCase()}
                  </span>
                </div>
                <div className="px-5 py-4 flex flex-wrap gap-2">
                  {activeInternship?.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--accent)] border border-[var(--accent-line)] bg-[var(--accent-soft)] px-3 py-1.5"
                    >
                      ● {t}
                    </span>
                  ))}
                </div>
                <p className="px-5 pb-4 text-[12px] leading-[1.7] text-[var(--ink-muted)]">
                  Working daily in production backend systems at CaratLane (A Tata Product).
                </p>
              </div>
            </Reveal>

            <Reveal delay={280} y={22}>
              <div className="border border-[#161c24] bg-[var(--surface)]/50">
                <div className="px-5 py-3 border-b border-[#161c24]">
                  <span className="os-label" style={{ color: 'var(--accent)' }}>DEPLOY PATHS</span>
                </div>
                <div className="px-5 py-4 space-y-2">
                  {[
                    ['VERCEL', 'suriyasivakumar20.vercel.app'],
                    ['GITHUB PAGES', 'SuriyaSivakumar20.github.io'],
                    ['AI / ML APIs', 'Python · TensorFlow · Flask'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-3">
                      <span className="os-label" style={{ fontSize: 9 }}>{k}</span>
                      <span className="font-mono text-[11px] text-[var(--ink-muted)]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={360} y={22}>
              <div className="border border-[#161c24] bg-[var(--surface)]/50 px-5 py-4">
                <p className="font-mono text-[12px] leading-[1.8] text-[var(--ink-muted)]">
                  <span className="text-[var(--accent)]">10+</span> merged open-source PRs ·
                  <span className="text-[var(--accent)]"> 6+</span> shipped projects ·
                  <span className="text-[var(--accent)]"> 4+</span> freelance deliveries
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}