import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { links } from '../../data/content';

type Run = () => void;

interface Command {
  name: string;
  hint: string;
  run: Run;
}

export default function CommandPanel({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [rendered, setRendered] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closedByRef = useRef(false);

  const reduced = prefersReducedMotion();

  const commands: Command[] = [
    { name: 'home', hint: 'Return to the top', run: () => onNavigate('top') },
    { name: 'about', hint: 'Identity / profile', run: () => onNavigate('about') },
    { name: 'experience', hint: 'System log / work history', run: () => onNavigate('experience') },
    { name: 'projects', hint: 'Running processes', run: () => onNavigate('projects') },
    { name: 'stack', hint: 'Technical stack overview', run: () => onNavigate('stack') },
    { name: 'skills', hint: 'Skill explorer', run: () => onNavigate('skills') },
    { name: 'achievements', hint: 'Education & event log', run: () => onNavigate('career') },
    { name: 'contact', hint: 'Open a channel', run: () => onNavigate('contact') },
    { name: 'resume', hint: 'Download resume.pdf', run: () => onNavigate('resume') },
    { name: 'github', hint: 'Open GitHub ↗', run: () => window.open(links.github, '_blank') },
    { name: 'linkedin', hint: 'Open LinkedIn ↗', run: () => window.open(links.linkedin, '_blank') },
    { name: 'email', hint: 'suriyasivakumar08@gmail.com', run: () => window.location.href = links.email },
    { name: 'help', hint: 'Show all available commands', run: () => setQuery('') },
  ];

  const filtered = query.trim()
    ? commands.filter((c) =>
        (c.name + ' ' + c.hint).toLowerCase().includes(query.trim().toLowerCase()),
      )
    : commands;

  // Open / close orchestration
  useEffect(() => {
    if (open) {
      closedByRef.current = false;
      setRendered(true);
      setQuery('');
      setCursor(0);
      document.body.classList.add('no-scroll');
      const t = window.setTimeout(() => inputRef.current?.focus(), reduced ? 0 : 80);
      const panel = panelRef.current;
      if (panel) {
        anime.remove(panel);
        anime({
          targets: panel,
          opacity: [0, 1],
          translateY: [-18, 0],
          scale: [0.985, 1],
          duration: reduced ? 0 : 360,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        });
      }
      return () => window.clearTimeout(t);
    }
    if (rendered) {
      const panel = panelRef.current;
      if (panel) {
        anime.remove(panel);
        anime({
          targets: panel,
          opacity: [1, 0],
          translateY: [0, -12],
          duration: reduced ? 0 : 220,
          easing: 'easeInQuad',
          complete: () => setRendered(false),
        });
      } else {
        setRendered(false);
      }
      document.body.classList.remove('no-scroll');
      if (!closedByRef.current) inputRef.current?.blur();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, rendered]);

  // Animate filtered list
  useEffect(() => {
    if (!open || !listRef.current) return;
    const items = Array.from(listRef.current.querySelectorAll<HTMLElement>('[data-cmd]'));
    if (reduced) {
      items.forEach((i) => (i.style.opacity = '1'));
      return;
    }
    anime({
      targets: items,
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(18, { start: 40 }),
      duration: 260,
      easing: 'easeOutQuad',
    });
  }, [filtered, open, reduced]);

  useEffect(() => setCursor(0), [query]);

  const close = () => {
    closedByRef.current = true;
    onClose();
  };

  const runCommand = (cmd: Command) => {
    cmd.run();
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = filtered[cursor];
      if (cmd) runCommand(cmd);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!rendered) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-[#05070a]/70 backdrop-blur-[2px] px-4 pt-[13vh]"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command interface"
    >
      <div
        ref={panelRef}
        className="w-full max-w-xl border border-[#232b36] bg-[#0a0d11] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        style={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#161c24]">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-[var(--ink-muted)]">
            <span className="w-2 h-2 rounded-full bg-[#2a333e]" />
            <span className="w-2 h-2 rounded-full bg-[#2a333e]" />
            <span style={{ color: 'var(--accent)' }}>▸ SURIYA.OS / COMMAND</span>
          </div>
          <span className="os-label" style={{ fontSize: 10, opacity: 0.6 }}>
            ESC
          </span>
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#161c24]">
          <span className="font-mono text-[15px] text-[var(--accent)]">&gt;_</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            type="text"
            placeholder="type a command… e.g. projects"
            aria-label="Command input"
            className="flex-1 bg-transparent border-none outline-none font-mono text-[15px] text-[var(--ink-strong)] placeholder:text-[#3d454f]"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[44vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="px-4 py-4 font-mono text-[12px] text-[var(--ink-faint)]">
              no command found for “{query}”
            </p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.name}
              type="button"
              data-cmd
              onClick={() => runCommand(cmd)}
              onMouseEnter={() => setCursor(i)}
              className={`group flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-100 ${
                i === cursor ? 'bg-[#101722]' : 'bg-transparent'
              }`}
            >
              <span
                className={`font-mono text-[14px] ${
                  i === cursor ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                }`}
              >
                {i === cursor && <span className="mr-2">{'→'}</span>}
                {cmd.name}
              </span>
              <span className="os-label" style={{ fontSize: 10, opacity: 0.55 }}>
                {cmd.hint}
              </span>
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-[#161c24] flex items-center justify-between">
          <span className="os-label" style={{ fontSize: 10, opacity: 0.5 }}>
            ↑↓ SELECT · ENTER RUN
          </span>
          <span className="os-label" style={{ fontSize: 10, opacity: 0.5 }}>
            {filtered.length} CMD
          </span>
        </div>
      </div>
    </div>
  );
}