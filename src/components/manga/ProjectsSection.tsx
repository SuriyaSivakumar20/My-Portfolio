import SectionShell from './SectionShell';
import SectionHeader from './SectionHeader';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/manga';

export default function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      art={{
        src: '/art/art-projects.webp',
        alt: 'Manga illustration of Suriya beside a wall of numbered project panels',
      }}
    >
      <SectionHeader
        n="04"
        kicker="My work"
        title="Projects"
        accentLast
        aside={
          <>
          </>
        }
      />

      <div className="mt-11 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </SectionShell>
  );
}
