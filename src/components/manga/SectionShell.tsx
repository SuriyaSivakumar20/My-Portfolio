import { ReactNode, useRef } from 'react';
import MangaPanel from './MangaPanel';
import { useReveal, useParallax } from '../../lib/manga/hooks';

interface Props {
  id: string;
  art?: { src: string; alt: string; speed?: number };
  children: ReactNode;
  /** columns when there is no illustration column */
  wide?: boolean;
}

/**
 * The repeating page frame: sticky illustration column on the left,
 * editorial content on the right, orange seam closing the page turn.
 * Owns the section's reveal + parallax so content stays declarative.
 */
export default function SectionShell({ id, art, children, wide }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useParallax(ref);

  const grid = art
    ? 'lg:grid-cols-[30%_minmax(0,1fr)]'
    : wide
      ? 'lg:grid-cols-1'
      : 'lg:grid-cols-[16%_minmax(0,1fr)]';

  return (
    <section id={id} data-section ref={ref} data-parallax-scope className="relative">
      <div className={`grid ${grid}`}>
        {art ? (
          <MangaPanel src={art.src} alt={art.alt} speed={art.speed ?? 0.35} />
        ) : (
          <div className="hidden lg:block relative" aria-hidden="true">
            <div className="sticky top-[var(--shell-h)] h-[calc(100vh-var(--shell-h))] flex items-center justify-center">
              <span className="hazard w-[26px] h-[46%] rounded-full" />
            </div>
          </div>
        )}

        <div className="min-w-0 px-5 sm:px-8 lg:px-12 py-14 lg:py-24">
          {children}
        </div>
      </div>

      <div className="seam" aria-hidden="true" />
    </section>
  );
}
