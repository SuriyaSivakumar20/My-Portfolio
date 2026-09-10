import { links } from '../../data/content';

export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32 border-t border-[#161c24]">
      <div className="px-5 sm:px-10 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <div className="font-mono text-[12px] tracking-[0.18em] text-[var(--ink-strong)] mb-1.5">
            SURIYA.OS <span className="text-[var(--accent)]">v1.0.0</span>
          </div>
          <p className="font-mono text-[11px] text-[var(--ink-faint)] tracking-[0.08em]">
            © {new Date().getFullYear()} {`SURIYA SIVAKUMAR`} — ALL RIGHTS RESERVED
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={links.resume}
            data-cursor="open"
            className="os-label border border-[#1c232c] px-3 py-2 hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
          >
            RESUME / CV
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="os-label border border-[#1c232c] px-3 py-2 hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
          >
            GITHUB
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="os-label border border-[#1c232c] px-3 py-2 hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)]">
          PRESS <span className="text-[var(--accent)]">/</span> FOR COMMANDS
        </div>
      </div>
    </footer>
  );
}