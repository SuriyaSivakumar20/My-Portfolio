import { useEffect } from 'react';
import MangaBackground from './components/manga/MangaBackground';
import Nav from './components/manga/Nav';
import HeroSection from './components/manga/HeroSection';
import AboutSection from './components/manga/AboutSection';
import ExperienceSection from './components/manga/ExperienceSection';
import ProjectsSection from './components/manga/ProjectsSection';
import SkillsSection from './components/manga/SkillsSection';
import ContactSection from './components/manga/ContactSection';
import ScrollTransition from './components/manga/ScrollTransition';
import MotionFx from './components/manga/MotionFx';
import InkCursor from './components/manga/InkCursor';
import { startScroll } from './lib/manga/scroll';
import { useSectionFlow } from './lib/manga/hooks';
import { navSections, projects, sectionIndex } from './data/manga';
import { siteMeta } from './data/content';

/** Old hash-less URLs (/about, /projects …) still land on the right chapter. */
const PATH_TO_SECTION: Record<string, string> = Object.fromEntries(
  sectionIndex.map((s) => [`/${s.id === 'home' ? '' : s.id}`, s.id]),
);

export default function App() {
  /* one scroll engine for the whole document */
  useEffect(() => startScroll(), []);

  /* every chapter slides + fades in on the way down the scroll path */
  useSectionFlow();

  /* deep links: map the path to a chapter once layout has settled */
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const target = PATH_TO_SECTION[path];
    /* home is where every load already starts — scrolling to it would move
       the sequential focus starting point past the skip link and header   */
    if (!target || target === 'home') return;
    const id = window.setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ block: 'start' });
    }, 60);
    return () => window.clearTimeout(id);
  }, []);

  /* structured data for the project panels (kept in sync with manga.ts) */
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-suriya', 'projects');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects by Suriya Sivakumar',
      description: siteMeta.description,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.title,
          description: p.summary ?? p.subtitle ?? p.pending ?? undefined,
          keywords: p.stack.join(', '),
          ...(p.live ? { url: p.live } : {}),
          author: { '@type': 'Person', '@id': 'https://suriyasivakumar20.vercel.app/#person' },
        },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="relative min-h-screen text-[var(--ink)]">
      <MangaBackground />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <MotionFx />
      <InkCursor />

      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <HeroSection />
        <ScrollTransition n="02" to={navSections[1].label} />

        <AboutSection />
        <ScrollTransition n="03" to={navSections[2].label} />

        <ExperienceSection />
        <ScrollTransition n="04" to={navSections[3].label} />

        <ProjectsSection />
        <ScrollTransition n="05" to={navSections[4].label} />

        <SkillsSection />
        <ScrollTransition n="06" to={navSections[5].label} />

        <ContactSection />
      </main>
    </div>
  );
}
