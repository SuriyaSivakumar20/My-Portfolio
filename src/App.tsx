import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SystemBackground from './components/os/SystemBackground';
import Cursor from './components/os/Cursor';
import BootSequence from './components/os/BootSequence';
import SystemShell, { NavTarget } from './components/os/SystemShell';
import CommandPanel from './components/os/CommandPanel';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Stack from './components/sections/Stack';
import Skills from './components/sections/Skills';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import { links, sections } from './data/content';
import { prefersReducedMotion } from './lib/anim/reduced';

const PATH_TO_SECTION: Record<string, string> = {
  '/': 'top',
  '/about': 'about',
  '/experience': 'experience',
  '/projects': 'projects',
  '/stack': 'stack',
  '/skills': 'skills',
  '/achievements': 'career',
  '/contact': 'contact',
  '/resume': 'resume',
};

const BOOT_FLAG = 'suriya_os_ready';

function readBootFlag(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(BOOT_FLAG) === '1';
  } catch {
    return false;
  }
}

function writeBootFlag() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(BOOT_FLAG, '1');
  } catch {
    /* private browsing / quota — boot just plays again */
  }
}

export default function App() {
  const [booted, setBooted] = useState(() => readBootFlag());
  const [commandOpen, setCommandOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const scrollTo = useCallback((id: string) => {
    const reduced = prefersReducedMotion();
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const navigateTo = useCallback(
    (id: string) => {
      if (id === 'resume') {
        window.open(links.resume, '_blank', 'noopener');
        return;
      }
      if (id === 'github') {
        window.open(links.github, '_blank', 'noopener');
        return;
      }
      if (id === 'linkedin') {
        window.open(links.linkedin, '_blank', 'noopener');
        return;
      }
      if (id === 'email') {
        window.location.href = links.email;
        return;
      }
      const known = sections.some((s) => s.id === id);
      if (known) scrollTo(id);
      setMenuOpen(false);
    },
    [scrollTo],
  );

  const openCommand = useCallback(() => setCommandOpen(true), []);

  // Global "/" opens the command interface (unless typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Deep-link scroll once booted
  useEffect(() => {
    if (!booted) return;
    const t = window.setTimeout(() => {
      const pathKey = PATH_TO_SECTION[location.pathname];
      if (pathKey === 'resume') {
        window.open(links.resume, '_blank', 'noopener');
        return;
      }
      if (pathKey) scrollTo(pathKey);
    }, 650);
    return () => window.clearTimeout(t);
  }, [booted, location.pathname, scrollTo]);

  // Lock scroll while the command panel is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', commandOpen || menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [commandOpen, menuOpen]);

  const navTargets: NavTarget[] = [
    { id: 'top', label: 'Home', primary: false },
    { id: 'about', label: 'About', primary: true },
    { id: 'experience', label: 'Experience', primary: true },
    { id: 'projects', label: 'Projects', primary: true },
    { id: 'stack', label: 'Stack', primary: true },
    { id: 'skills', label: 'Skills', primary: false },
    { id: 'career', label: 'Education & Awards', primary: false },
    { id: 'contact', label: 'Contact', primary: true },
  ];

  return (
    <div className="relative min-h-screen text-[var(--ink)]">
      <SystemBackground />
      <Cursor />
      {!booted && (
        <BootSequence
          onComplete={() => {
            setBooted(true);
            writeBootFlag();
          }}
        />
      )}

      <SystemShell
        booted={booted}
        navTargets={navTargets}
        onNavigate={navigateTo}
        onCommand={openCommand}
        onMenuToggle={(open) => setMenuOpen(open)}
      />

      <CommandPanel open={commandOpen} onClose={() => setCommandOpen(false)} onNavigate={navigateTo} />

      <main className="relative z-10">
        <Hero booted={booted} onCommand={openCommand} onNavigate={navigateTo} />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}