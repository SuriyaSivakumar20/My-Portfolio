import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { Project } from '../../data/content';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [rendered, setRendered] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (project) {
      setRendered(true);
      document.body.classList.add('no-scroll');
      const t = window.setTimeout(() => {
        if (reduced) return;
        const panel = panelRef.current;
        if (panel) {
          anime.remove(panel);
          anime({
            targets: panel,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.985, 1],
            duration: 420,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          });
          const parts = panel.querySelectorAll<HTMLElement>('[data-modal-part]');
          anime({
            targets: parts,
            opacity: [0, 1],
            translateY: [14, 0],
            delay: anime.stagger(50, { start: 150 }),
            duration: 420,
            easing: 'easeOutQuad',
          });
        }
      }, 20);
      window.setTimeout(() => closeRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }

    if (rendered) {
      const panel = panelRef.current;
      if (panel) {
        anime.remove(panel);
        anime({
          targets: panel,
          opacity: [1, 0],
          translateY: [0, 16],
          duration: reduced ? 0 : 200,
          easing: 'easeInQuad',
          complete: () => {
            setRendered(false);
            document.body.classList.remove('no-scroll');
          },
        });
      } else {
        setRendered(false);
        document.body.classList.remove('no-scroll');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, rendered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!rendered || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[75] bg-[#04060a]/80 backdrop-blur-[3px] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl max-h-[86vh] overflow-y-auto border border-[#232b36] bg-[#0a0d11] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-[#0a0d11]/95 backdrop-blur border-b border-[#161c24]"
          data-modal-part
        >
          <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--accent)]">
            PROCESS {String(project.index).padStart(2, '0')} — INSPECT
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="os-label border border-[#1c232c] px-3 py-1.5 hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
            aria-label="Close"
          >
            ESC / CLOSE
          </button>
        </div>

        <div className="px-5 sm:px-8 py-6 sm:py-8">
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden mb-7 bg-[#0a0d11]" data-modal-part>
            <img src={project.image} alt="" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d11] via-[#0a0d11]/20 to-transparent" />
          </div>

          <div data-modal-part>
            <h3 className="font-display text-[clamp(26px,5vw,44px)] font-semibold tracking-[-0.02em] text-[var(--ink-strong)] leading-none">
              {project.title}
            </h3>
            <p className="os-label mt-2" style={{ color: 'var(--accent)' }}>
              {project.tagline.toUpperCase()}
            </p>
          </div>

          {/* Meta strip */}
          <div className="grid grid-cols-2 sm:flex gap-px bg-[#161c24] border border-[#161c24] mt-7" data-modal-part>
            {project.facts.map((f) => (
              <div key={f.label} className="bg-[#0d1117] px-4 py-3 flex-1">
                <div className="os-label mb-1" style={{ fontSize: 9, opacity: 0.55 }}>{f.label}</div>
                <div className="font-mono text-[12px] text-[var(--ink-strong)]">{f.value}</div>
              </div>
            ))}
            <div className="bg-[#0d1117] px-4 py-3 flex-1">
              <div className="os-label mb-1" style={{ fontSize: 9, opacity: 0.55 }}>STACK</div>
              <div className="font-mono text-[12px] text-[var(--ink)]">{project.stack.join(' · ')}</div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8" data-modal-part>
            <div className="os-label mb-3" style={{ color: 'var(--accent)' }}>DESCRIPTION</div>
            <p className="text-[15px] leading-[1.8] text-[var(--ink)]">{project.description}</p>
          </div>

          {/* Problem / Solution / Results */}
          {project.problem && (
            <div className="mt-7" data-modal-part>
              <div className="os-label mb-3" style={{ fontSize: 10 }}>PROBLEM</div>
              <p className="text-[14px] leading-[1.75] text-[var(--ink-muted)]">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="mt-7" data-modal-part>
              <div className="os-label mb-3" style={{ fontSize: 10 }}>SOLUTION</div>
              <p className="text-[14px] leading-[1.75] text-[var(--ink-muted)]">{project.solution}</p>
            </div>
          )}
          {project.results && (
            <div className="mt-7 flex items-center gap-3" data-modal-part>
              <span className="os-label" style={{ fontSize: 10 }}>RESULT</span>
              <span className="font-mono text-[13px] text-[var(--ok)]">{project.results}</span>
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-10 pt-6 border-t border-[#161c24] flex flex-wrap items-center gap-3" data-modal-part>
            {project.status === 'LIVE' && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="inline-flex items-center gap-2 border border-[var(--accent-line)] bg-[var(--accent-soft)] px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--accent)] hover:bg-[rgba(99,211,242,0.18)] transition-colors"
              >
                ↗ LIVE DEMO
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-[#1c232c] font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ink-muted)] hover:text-[var(--ink-strong)] transition-colors"
            >
              CLOSE PROCESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}