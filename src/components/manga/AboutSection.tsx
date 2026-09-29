import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import { about } from '../../data/manga';

export default function AboutSection() {
  return (
    <SectionShell
      id="about"
      art={{ src: '/art/art-about.webp', alt: 'Manga portrait of Suriya against a burnt-orange ink block' }}
    >
      <SectionHeader
        n="02"
        kicker="About me"
        title="About"
        accentLast
        aside={
          <>
            CS engineering student, class of 2026, shipping production code
            and open to freelance collaborations.
          </>
        }
      />

      <p className="mt-9 text-[1.05rem] leading-[1.75] text-[var(--ink-2)] max-w-[64ch]" data-reveal>
        <span className="float-left font-display text-[3.6rem] leading-[0.78] mr-3 mt-1.5 text-[var(--accent)]">
          {about.intro.slice(0, 1)}
        </span>
        {about.intro.slice(1)}
      </p>

      <div className="mt-11 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {about.blocks.map((b, i) => (
          <article key={b.label} className="panel panel--hatched p-6 pt-9" data-reveal>
            <span className={`panel__tab ${i === 1 ? 'panel__tab--accent' : ''}`}>
              <span className="tnum">{`0${i + 1}`}</span>
            </span>

            <p className="label label--accent">{b.label}</p>
            <h3 className="display text-[clamp(1.35rem,2.3vw,1.8rem)] mt-2.5">{b.value}</h3>
            <p className="label mt-1.5 tnum">{b.meta}</p>

            <hr className="rule my-4" />
            <ul className="grid gap-2">
              {b.lines.map((l) => (
                <li key={l} className="body-copy text-[0.86rem] leading-relaxed">
                  {l}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-11" data-reveal>
        <div className="flex items-center gap-4">
          <p className="label label--ink">Interests</p>
          <hr className="rule flex-1" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {about.interests.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
