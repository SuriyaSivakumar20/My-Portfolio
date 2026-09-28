import { SkillGroup } from '../../data/manga';

interface Props {
  group: SkillGroup;
}

/**
 * A numbered toolbox card: the category as a masthead, the technologies as
 * rectangular ink tiles. No proficiency percentages — they were never
 * published anywhere, so nothing is invented here.
 */
export default function SkillCard({ group }: Props) {
  return (
    <article className="panel panel--hover relative p-6 pt-11" data-reveal>
      <span className="panel__tab panel__tab--accent">
        <span className="tnum">{group.index}</span>
      </span>

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="display text-[clamp(1.15rem,1.7vw,1.4rem)] uppercase tracking-[0.02em]">
          {group.title}
        </h3>
        <span className="label tnum shrink-0">{group.items.length} items</span>
      </div>

      <p className="body-copy mt-2 text-[0.85rem] italic text-[var(--ink-3)]">
        {group.blurb}
      </p>

      <hr className="rule rule--strong mt-4 mb-4" />

      <ul className="flex flex-wrap gap-2" aria-label={group.title}>
        {group.items.map((item) => (
          <li key={item} className="skill-tile">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
