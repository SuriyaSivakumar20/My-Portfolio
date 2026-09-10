import { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs';
import { prefersReducedMotion } from '../../lib/anim/reduced';

export interface NavTarget {
  id: string;
  label: string;
  primary?: boolean;
}

interface SystemShellProps {
  booted: boolean;
  navTargets: NavTarget[];
  onNavigate: (id: string) => void;
  onCommand: () => void;
  onMenuToggle: (open: boolean) => void;
}

/**
 * SystemShell — the fixed top indicator bar.
 * Minimal by design: SURIYA.OS • ONLINE, primary sections,
 * a command trigger and a "more" menu.
 */
export default function SystemShell({
  booted,
  navTargets,
  onNavigate,
  onCommand,
  onMenuToggle,
}: SystemShellProps) {
  const shellRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Entrance once boot completes
  useEffect(() => {
    if (!booted || !shellRef.current) return;
    anime({
      targets: shellRef.current,
      translateY: [-24, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
    });
  }, [booted]);

  // Bar background once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy over sections
  useEffect(() => {
    if (!booted) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.3] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [booted]);

  const primary = navTargets.filter((t) => t.primary);

  const toggleMenu = useCallback(() => {
    setMenuOpen((o) => {
      const next = !o;
      onMenuToggle(next);
      return next;
    });
  }, [onMenuToggle]);

  useEffect(() => {
    const mq = prefersReducedMotion();
    const overlay = menuRef.current;
    if (!overlay) return;
    if (menuOpen) {
      overlay.style.display = 'block';
      anime({
        targets: overlay,
        opacity: [0, 1],
        duration: mq ? 0 : 260,
        easing: 'easeOutQuad',
      });
    } else if (overlay.style.display === 'block') {
      anime({
        targets: overlay,
        opacity: [1, 0],
        duration: mq ? 0 : 200,
        easing: 'easeInQuad',
        complete: () => {
          overlay.style.display = 'none';
        },
      });
    }
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) toggleMenu();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, toggleMenu]);

  /* menu link stagger */
  useEffect(() => {
    if (!menuOpen) return;
    const links = Array.from(document.querySelectorAll<HTMLElement>('[data-menu-link]'));
    if (prefersReducedMotion()) {
      links.forEach((l) => (l.style.opacity = '1'));
      return;
    }
    anime({
      targets: links,
      opacity: [0, 1],
      translateY: [14, 0],
      delay: anime.stagger(40),
      duration: 450,
      easing: 'easeOutQuad',
    });
  }, [menuOpen]);

  const renderLinks = () => (
    <ul className="divide-y divide-[#161c24]">
      {navTargets.map((t, i) => (
        <li key={t.id} style={{ opacity: 0 }} data-menu-link>
          <button
            type="button"
            onClick={() => {
              toggleMenu();
              onNavigate(t.id);
            }}
            className="group w-full flex items-baseline justify-between py-3.5 text-left"
          >
            <span
              className={`font-display text-[clamp(20px,6vw,30px)] font-medium ${
                active === t.id ? 'text-[var(--accent)]' : 'text-[var(--ink-strong)]'
              } group-hover:text-[var(--accent)] transition-colors`}
            >
              {t.label}
            </span>
            <span className="os-label" style={{ opacity: 0.5 }}>
              0{i + 1}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <header
        ref={shellRef}
        className="fixed inset-x-0 top-0 z-50"
        style={{ opacity: 0 }}
      >
        <div
          className={`flex items-center justify-between px-5 sm:px-10 h-16 transition-colors duration-300 border-b ${
            scrolled ? 'bg-[#07090b]/85 backdrop-blur border-[#161c24]' : 'bg-transparent border-transparent'
          }`}
        >
          {/* Identity */}
          <button
            type="button"
            onClick={() => onNavigate('top')}
            className="group flex items-center gap-3 font-mono text-[12px] tracking-[0.18em] text-[var(--ink-strong)]"
          >
            <span className="font-semibold">SURIYA.OS</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-[var(--ink-muted)]">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--ok)] os-pulse"
                style={{ boxShadow: '0 0 8px rgba(94,230,140,0.8)' }}
              />
              ONLINE
            </span>
          </button>

          {/* Primary nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {primary.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onNavigate(t.id)}
                className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 border-b ${
                  active === t.id
                    ? 'text-[var(--accent)] border-[var(--accent)]'
                    : 'text-[var(--ink-muted)] border-transparent hover:text-[var(--ink-strong)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onCommand}
              className="hidden sm:flex items-center gap-2 border border-[#1c232c] px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
              aria-label="Open command interface (press /)"
            >
              <span className="text-[var(--accent)]">&gt;_</span> COMMAND
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="p-2 border border-[#1c232c] text-[var(--ink-muted)] hover:text-[var(--ink-strong)] hover:border-[var(--line-strong)] transition-colors"
            >
              <span className="block font-mono text-[10px] tracking-widest">
                {menuOpen ? 'CLOSE' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#07090b]/96 backdrop-blur-sm"
        style={{ display: 'none', opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        <div className="min-h-full flex items-center justify-center px-6">
          <div className="w-full max-w-xl">
            <div className="os-label mb-8">
              SURIYA.OS <span style={{ color: 'var(--accent)' }}>/ NAVIGATE</span>
            </div>
            {renderLinks()}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => { toggleMenu(); onNavigate('resume'); }}
                className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-3 py-2 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
              >
                ↗ Resume
              </button>
              <button
                type="button"
                onClick={() => { toggleMenu(); onNavigate('github'); }}
                className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-3 py-2 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
              >
                ↗ GitHub
              </button>
              <button
                type="button"
                onClick={() => { toggleMenu(); onNavigate('linkedin'); }}
                className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-3 py-2 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
              >
                ↗ LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}