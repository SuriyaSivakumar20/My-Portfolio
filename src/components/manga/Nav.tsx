import { useCallback, useEffect, useRef, useState } from 'react';
import { navSections } from '../../data/manga';
import { scrollToSection } from '../../lib/manga/scroll';
import { useActiveSection } from '../../lib/manga/hooks';

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

      <header className="shell px-5 sm:px-8 lg:px-12" data-solid={solid}>
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 min-h-[40px] group"
          aria-label="Back to top"
        >
          <span className="block w-3.5 h-3.5 bg-[var(--accent)] rotate-45 transition-transform duration-500 group-hover:rotate-[135deg]" />
          <span className="font-display text-[15px] tracking-[0.16em] uppercase">
            Suriya
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7 ml-auto mr-7">
          {LINKS.map((s) => (
            <button
              key={s.id}
              className="nav-link"
              data-active={active === s.id}
              aria-current={active === s.id ? 'location' : undefined}
              onClick={() => go(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button className="btn btn--primary btn--sm" onClick={() => go('contact')}>
            <span>Contact</span>
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>

        <button
          ref={toggleRef}
          className="md:hidden ml-auto flex flex-col justify-center gap-[5px] min-h-[40px] p-2 -mr-2"
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
          <p className="label mt-8">{navSections.length} sections · one page</p>
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
