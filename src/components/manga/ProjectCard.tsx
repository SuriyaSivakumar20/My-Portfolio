import { MangaProject } from '../../data/manga';

interface Props {
  project: MangaProject;
}

/**
 * One manga panel per project. Real builds get a description, stack and
 * links; slots with no published detail stay visibly open (see manga.ts).
 */
export default function ProjectCard({ project }: Props) {
  const pending = Boolean(project.pending);

  return (
    <article
      className={`panel panel--hover relative flex flex-col p-6 pt-11 ${
        pending ? 'panel--hatched opacity-[0.92]' : ''
      }`}
      data-reveal
    >
      <span className={`panel__tab ${pending ? '' : 'panel__tab--accent'}`}>
        <span className="tnum">{project.index}</span>
      </span>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="display text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.05] break-words">
            {project.title}
          </h3>
          {project.subtitle ? (
            <p className="label label--accent mt-2">{project.subtitle}</p>
          ) : null}
        </div>

        {project.date ? (
          <span className="label tnum shrink-0 text-right">{project.date}</span>
        ) : null}
      </div>

      <hr className="rule rule--strong mt-4" />

      {pending ? (
        <p className="body-copy mt-4 text-[0.88rem] italic">{project.pending}</p>
      ) : (
        <>
          {project.summary ? (
            <p className="body-copy mt-4 text-[0.93rem]">{project.summary}</p>
          ) : null}

          {project.bullets?.length ? (
            <ul className="tick-list mt-4">
              {project.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </>
      )}

      <div className="mt-auto pt-6">
        {project.stack.length ? (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        ) : (
          <p className="label">Stack — to be documented</p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          {project.github ? (
            <a
              className="btn btn--sm"
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>GitHub</span>
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}

          {project.live ? (
            <a
              className="btn btn--sm btn--primary"
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>Live demo</span>
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : null}

          {!project.github && !project.live ? (
            <span className="label label--accent">Link pending</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
