import { useRef, useState } from 'react';
import anime from 'animejs';
import Reveal from '../../lib/anim/Reveal';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { projects, Project } from '../../data/content';
import ProjectModal from './ProjectModal';

/**
 * Projects — rendered as running processes. Hovering a row expands it
 * and swaps the system preview on the right; clicking opens a full
 * process detail modal.
 */
export default function Projects() {
  const [hovered, setHovered] = useState<number>(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const previewMetaRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  const swapPreview = (i: number) => {
    setHovered(i);
    if (reduced) return;
    const img = previewImgRef.current;
    const meta = previewMetaRef.current;
    if (img) {
      anime.remove(img);
      anime({
        targets: img,
        opacity: [0.15, 1],
        scale: [1.04, 1],
        duration: 300,
        easing: 'easeOutExpo',
      });
    }
    if (meta) {
      anime.remove(meta);
      anime({
        targets: meta,
        translateY: [10, 0],
        opacity: [0.2, 1],
        duration: 220,
        delay: 30,
        easing: 'easeOutQuad',
      });
    }
  };

  const active = projects[hovered];

  return (
    <section id="projects" data-section className="relative py-28 md:py-40 overflow-hidden">
      {/* Oversized background index reacts to hover */}
      <div
        className="pointer-events-none absolute top-40 right-[-2vw] select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-semibold leading-none tracking-[-0.03em] text-transparent"
          style={{
            fontSize: 'clamp(160px, 26vw, 380px)',
            WebkitTextStroke: '1px rgba(99,211,242,0.07)',
            color: 'transparent',
          }}
        >
          {String(active.index).padStart(2, '0')}
        </span>
      </div>

      <div className="px-5 sm:px-10 relative z-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>03</span> / PROJECTS — RUNNING PROCESSES
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
              {projects.length} PROCESSES · CLICK TO INSPECT
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1.25fr,0.75fr] gap-10 lg:gap-16">
          {/* Process rows */}
          <div className="border-t border-[#161c24]">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} y={22}>
                <button
                  type="button"
                  data-cursor="view"
                  onMouseEnter={() => swapPreview(i)}
                  onClick={() => setSelected(p)}
                  className={`group w-full text-left border-b border-[#161c24] py-6 transition-colors duration-300 ${
                    hovered === i ? 'bg-[var(--surface)]/50' : 'bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-[12px] tabular-nums transition-colors duration-200 ${
                        hovered === i ? 'text-[var(--accent)]' : 'text-[var(--ink-faint)]'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`font-display font-medium tracking-[-0.01em] transition-all duration-300 text-[clamp(19px,3vw,32px)] ${
                        hovered === i ? 'text-[var(--ink-strong)] translate-x-2' : 'text-[var(--ink)]'
                      }`}
                    >
                      {p.title}
                    </h3>
                    <span
                      className={`ml-auto shrink-0 font-mono text-[10px] tracking-[0.16em] ${
                        p.status === 'LIVE' ? 'text-[var(--ok)]' : 'text-[var(--ink-muted)]'
                      }`}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                          p.status === 'LIVE' ? 'bg-[var(--ok)] os-pulse' : 'bg-[#3d454f]'
                        }`}
                      />
                      {p.status}
                    </span>
                    <span
                      className={`text-[var(--accent)] transition-transform duration-300 ${
                        hovered === i ? 'translate-x-1 opacity-100' : 'opacity-40'
                      }`}
                    >
                      →
                    </span>
                  </div>

                  {/* Expanded metadata on hover (desktop) / always partial */}
                  <div
                    className={`grid transition-all duration-300 overflow-hidden ${
                      hovered === i ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-l-2 border-[var(--accent-line)] pl-4 ml-[26px]">
                        <span className="os-label" style={{ fontSize: 10 }}>{p.domain}</span>
                        <span className="os-label" style={{ fontSize: 10, opacity: 0.6 }}>
                          {p.tagline.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-3 ml-[26px] pl-4 text-[13.5px] leading-[1.7] text-[var(--ink-muted)] max-w-[60ch]">
                        {p.description}
                      </p>
                      <div className="mt-3 ml-[26px] pl-4 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <span key={t} className="os-label text-[9.5px] border border-[#1c232c] px-2 py-0.5" style={{ fontSize: 9.5 }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}

            <Reveal delay={120} className="mt-8">
              <p className="os-label" style={{ fontSize: 10, opacity: 0.45 }}>
                CLICK A PROCESS FOR FULL SPEC — PROBLEM · SOLUTION · RESULTS
              </p>
            </Reveal>
          </div>

          {/* Persistent system preview (desktop) */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={160} y={24}>
                <div className="border border-[#161c24] bg-[var(--surface)]/50">
                  <div className="px-4 py-2.5 border-b border-[#161c24] flex items-center justify-between">
                    <span className="os-label" style={{ color: 'var(--accent)' }}>SYS.PREVIEW</span>
                    <span className="os-label" style={{ fontSize: 10 }}>
                      PROC-{String(active.index).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#0a0d11]">
                    <img
                      ref={previewImgRef}
                      src={active.image}
                      alt={active.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090b] via-transparent to-transparent" />
                  </div>
                  <div ref={previewMetaRef} className="px-4 py-4">
                    <div className="os-label mb-2" style={{ fontSize: 10, opacity: 0.6 }}>
                      {active.domain}
                    </div>
                    <h4 className="font-display text-[20px] font-medium text-[var(--ink-strong)] tracking-[-0.01em]">
                      {active.title}
                    </h4>
                    <p className="mt-2 text-[12px] leading-[1.65] text-[var(--ink-muted)] line-clamp-3">
                      {active.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {active.stack.slice(0, 4).map((t) => (
                        <span key={t} className="os-label text-[9px] border border-[#1c232c] px-2 py-0.5" style={{ fontSize: 9 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={260} y={20}>
                <div className="mt-6 flex items-center justify-between px-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)]">
                    HOVER ROWS TO SWAP PREVIEW
                  </span>
                  <span className="os-label" style={{ fontSize: 10, color: 'var(--accent)' }}>
                    {String(active.index).padStart(2, '0')}/{projects.length}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}