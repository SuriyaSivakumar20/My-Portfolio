import { ReactNode } from 'react';

interface Props {
  n: string;
  kicker: string;
  title: string;
  /** print the final glyph in the spot colour, the way the plates do */
  accentLast?: boolean;
  aside?: ReactNode;
}

const RUNNER = ['Ideas', 'Code', 'People', 'Impact'];

/** The editorial masthead every section opens with. */
export default function SectionHeader({ n, kicker, title, accentLast, aside }: Props) {
  const head = accentLast ? (
    <>
      {title.slice(0, -1)}
      <span className="display--accent">{title.slice(-1)}</span>
    </>
  ) : (
    title
  );

  return (
    <header className="relative">
      <div className="flex items-start justify-between gap-6">
        <p className="kicker" data-reveal>
          <span className="kicker__num tnum">{n}</span>
          <span className="kicker__rule" />
          <span>{kicker}</span>
        </p>

        <div className="hidden sm:grid meta-list" aria-hidden="true" data-reveal>
          {RUNNER.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <h2 className="display display--section min-w-0" data-reveal>
          {head}
        </h2>

        {aside ? (
          <div className="lg:max-w-[38ch] lg:shrink-0 lg:pb-3" data-reveal>
            <p className="lede lg:ml-auto">{aside}</p>
            <hr className="rule rule--accent rule--short mt-4 lg:ml-auto" />
          </div>
        ) : null}
      </div>

      <hr className="rule rule--strong mt-7" />
    </header>
  );
}
