import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import SkillCard from './SkillCard';
import { skillGroups } from '../../data/manga';

export default function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      art={{
        src: '/art/art-skills.webp',
        alt: 'Manga illustration of Suriya reviewing a wall of tool tiles',
      }}
    >
      <SectionHeader
        n="05"
        kicker="My toolbox"
        title="Skills"
        accentLast
        aside={
          <>
            Five drawers: languages, frameworks, platforms, databases and the
            practices around them.
          </>
        }
      />

      <div className="mt-11 grid gap-6 md:grid-cols-2">
        {skillGroups.map((g, i) => (
          <div key={g.id} className={i === 0 ? 'md:col-span-2' : undefined}>
            <SkillCard group={g} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
