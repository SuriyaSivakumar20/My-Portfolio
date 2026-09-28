import { useRef } from 'react';
import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import { timeline } from '../../data/manga';
import { useDrawLine } from '../../lib/manga/hooks';

export default function ExperienceSection() {
  const fill = useRef<HTMLSpanElement>(null);
  useDrawLine(fill);

  return (
    <SectionShell
      id="experience"
      art={{ src: '/art/art-experience.webp', alt: 'Manga illustration of Suriya looking off into the distance' }}
    >
      <SectionHeader
        n="03"
        kicker="My journey"
        title="Experience"
        accentLast
        aside={
          <>
            Turning ideas into real-world products through hands-on experience, continuous
            learning and collaboration.
          </>
        }
      />

      <div className="tl mt-12">
        <span className="tl__rail" aria-hidden="true" />
        <span className="tl__fill" ref={fill} aria-hidden="true" />

        <div className="grid gap-11">
          {timeline.map((e) => (
            <article key={e.id} className="tl__item" data-reveal>
              <span
                className={`tl__dot ${e.current ? 'tl__dot--live' : ''}`}
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                <span className="label label--accent tnum">{e.date}</span>
                <span className="label">{e.place}</span>
              </div>

              <div className="mt-3 flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="display text-[clamp(1.3rem,2.5vw,2rem)]">{e.role}</h3>
                  <p className="label label--ink mt-2.5">{e.company}</p>

                  <p className="body-copy mt-3.5 max-w-[64ch]">{e.summary}</p>

                  <ul className="tick-list mt-4">
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>

                <aside className="xl:w-[236px] shrink-0 panel p-4 pt-5">
                  <p className="label label--ink">{e.panelTitle}</p>
                  <hr className="rule mt-3" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
