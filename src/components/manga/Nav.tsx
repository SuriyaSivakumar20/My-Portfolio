import { useCallback, useEffect, useRef, useState } from 'react';
import { navSections } from '../../data/manga';
import { scrollToSection } from '../../lib/manga/scroll';
import { useActiveSection } from '../../lib/manga/hooks';
import AmbientAudio from './AmbientAudio';

const LINKS = navSections.filter((s) => s.id !== 'contact');

export default function Nav() {
  const active = useActiveSection();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  /* closing always hands focus back to the menu button */
  const dismiss = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const go = useCallback(
    (id: string) => {
      setOpen(false);
      toggleRef.current?.focus();
      scrollToSection(id);
    },
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* the sheet is a dialog: background is inert while it is open, and the
     closed sheet is inert so its links never take focus                */
  useEffect(() => {
    const bg = [
      document.getElementById('main'),
      document.querySelector('footer'),
      document.querySelector('.scroll-progress'),
    ];
    const set = (el: Element | null, on: boolean) => {
      if (!el) return;
      if (on) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    };
    bg.forEach((el) => set(el, open));
    set(sheetRef.current, !open);
    if (open) firstLinkRef.current?.focus();
    return () => bg.forEach((el) => set(el, false));
  }, [open]);

  /* Escape closes; Tab cycles inside header + sheet only */
  useEffect(() => {
    if (!open) return;
    const SCOPE = 'header button, header a, [data-menu-scope] button, [data-menu-scope] a';
    const focusables = () =>
      [...document.querySelectorAll<HTMLElement>(SCOPE)].filter(
        (el) => el.getClientRects().length > 0 && !el.closest('[inert]'),
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const cur = document.activeElement as HTMLElement | null;
      if (!cur || !list.includes(cur)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && cur === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dismiss]);

  const progress = useScrollProgress();

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className="shell !h-14 px-5 sm:px-8 lg:px-12" data-solid={solid}>
        <button
          onClick={() => go('home')}
          className="flex items-center min-h-[36px] group text-left"
          aria-label="Back to top"
        >
          <span className="font-display text-[12px] sm:text-[13px] tracking-[0.2em] uppercase font-black text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
            Suriya Sivakumar
          </span>
        </button>

        <div className="hidden md:flex items-center mx-auto">
          <nav className="flex items-center gap-6 px-6 py-1 rounded-full bg-[var(--paper)]/85 backdrop-blur-md border border-[var(--ink)]/15 shadow-sm">
            {LINKS.map((s) => (
              <button
                key={s.id}
                className="nav-link !py-1 text-[12px]"
                data-active={active === s.id}
                aria-current={active === s.id ? 'location' : undefined}
                onClick={() => go(s.id)}
              >
                {s.label}
              </button>
            ))}
            <button
              className="btn btn--primary !py-1.5 !px-4 !text-[11px] rounded-full"
              onClick={() => go('contact')}
            >
              <span>Contact</span>
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </nav>
        </div>

        {/* Right side controls: Download Résumé + Ambient audio */}
        <div className="hidden md:flex items-center justify-end gap-2 w-[220px]">
          <a
            href="/Suriya_S_Resume.pdf"
            download="Suriya_S_Resume.pdf"
            className="btn btn--primary !py-1.5 !px-4 !text-[11px] rounded-full inline-flex items-center justify-center gap-1.5 no-underline leading-none"
            aria-label="Download resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span style={{ lineHeight: 1 }}>Resume</span>
          </a>
          <AmbientAudio variant="nav" />
        </div>

        {/* Mobile controls: Audio toggle & hamburger button */}
        <div className="flex md:hidden items-center gap-1.5 ml-auto">
          <AmbientAudio variant="compact" />
          <button
            ref={toggleRef}
            className="flex flex-col justify-center gap-[5px] min-h-[40px] p-2 -mr-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className="block w-6 h-[2px] bg-[var(--ink)] transition-transform duration-300"
              style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}
            />
            <span
              className="block w-6 h-[2px] bg-[var(--ink)] transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[2px] bg-[var(--accent)] transition-transform duration-300"
              style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
            />
          </button>
        </div>
      </header>

      {/* mobile sheet — modal dialog, background is inert while open */}
      <div
        ref={sheetRef}
        id="site-menu"
        data-menu-scope=""
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-0 z-50 md:hidden transition-opacity duration-300"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          background: 'var(--paper)',
        }}
      >
        <div className="h-full flex flex-col justify-center px-8 gap-1">
          {navSections.map((s, i) => (
            <button
              key={s.id}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={() => go(s.id)}
              aria-current={active === s.id ? 'location' : undefined}
              className="group flex items-baseline gap-4 py-3 border-b border-[var(--rule)] text-left"
            >
              <span className="label label--accent tnum">{`0${i + 1}`}</span>
              <span className="display text-[clamp(2rem,11vw,3.2rem)] group-hover:text-[var(--accent)] transition-colors">
                {s.label}
              </span>
            </button>
          ))}

          <a
            href="/Suriya_S_Resume.pdf"
            download="Suriya_S_Resume.pdf"
            className="btn btn--primary !py-3 !px-6 !text-[13px] rounded-full inline-flex items-center justify-center gap-2 no-underline mt-6 w-fit leading-none"
            aria-label="Download my resume"
            onClick={() => setOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span style={{ lineHeight: 1 }}>Download Resume</span>
          </a>

          <div className="mt-6">
            <AmbientAudio variant="drawer" />
          </div>

          <p className="label mt-6">{navSections.length} sections · one page</p>
        </div>
      </div>
    </>
  );
}

function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}
