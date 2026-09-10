import Reveal from '../../lib/anim/Reveal';
import TextReveal from '../../lib/anim/TextReveal';
import { profile, links, funFacts } from '../../data/content';

const PARAGRAPHS = [
  'I\u2019m a Computer Science Engineering student at Pondicherry who discovered a love for AI during my first-year ML assignment — a spam classifier that actually worked. That moment led me to build 6+ projects, win a national hackathon selection, and land an internship at CaratLane (A Tata Product) while still in college.',
  'My focus is on building AI systems that solve real problems: from a resume screener that reduced hiring time by 70%, to a phishing detector with 96% accuracy. I\u2019ve worked end-to-end — from model training in Python/TensorFlow to deploying React front-ends on Vercel.',
  'Outside of code, I run workshops, conduct motivation sessions for juniors, and explore the freelance space where I pair good software with real business outcomes. I believe clean code and clear communication are equally important.',
];

const META: { label: string; value: string; link?: string }[] = [
  { label: 'LOCATION', value: profile.location },
  { label: 'FOCUS', value: 'AI systems · Backend · Automation' },
  { label: 'CURRENTLY', value: 'Software Developer Intern @ CaratLane (A Tata Product)' },
  { label: 'DEGREE', value: 'B.Tech CSE · Manakula Vinayagar Institute of Technology' },
  { label: 'CLASS', value: '2026 · CGPA 8.4/10' },
  { label: 'EMAIL', value: links.emailRaw, link: links.email },
];

export default function About() {
  return (
    <section id="about" data-section className="relative py-28 md:py-40">
      <div className="px-5 sm:px-10">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>01</span> / ABOUT — IDENTITY
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>PROFILE.READ</div>
          </Reveal>
        </div>

        {/* Editorial statement */}
        <Reveal delay={120}>
          <h2 className="os-heading text-[clamp(30px,5.6vw,74px)] max-w-5xl">
            <TextReveal
              as="span"
              text="A CS ENGINEER WHO"
              delay={140}
              stagger={16}
            />{' '}
            <TextReveal
              as="span"
              className="text-[var(--accent)]"
              text="SHIPS AI,"
              delay={300}
              stagger={16}
            />{' '}
            <TextReveal
              as="span"
              text="AUTOMATION AND"
              delay={440}
              stagger={16}
            />{' '}
            <TextReveal
              as="span"
              className="text-[var(--accent)]"
              text="FULL-STACK"
              delay={620}
              stagger={16}
            />{' '}
            <TextReveal as="span" text="SYSTEMS." delay={760} stagger={16} />
          </h2>
        </Reveal>

        {/* Body grid */}
        <div className="grid lg:grid-cols-[1fr,360px] gap-12 lg:gap-20 mt-16 md:mt-24">
          <div className="space-y-8">
            {PARAGRAPHS.map((p, i) => (
              <Reveal key={i} delay={140 + i * 110} y={20}>
                <p className="text-[15px] md:text-[16px] leading-[1.8] text-[var(--ink-muted)] border-l border-[#1c232c] pl-5">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={500} y={16}>
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-4 py-2.5 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
                >
                  ↗ GitHub —— github.com/SuriyaSivakumar20
                </a>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-4 py-2.5 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
                >
                  ↗ LinkedIn
                </a>
                <a
                  href={links.resume}
                  data-cursor="open"
                  className="font-mono text-[11px] tracking-[0.14em] uppercase border border-[#1c232c] px-4 py-2.5 text-[var(--ink-muted)] hover:text-[var(--accent)] hover:border-[var(--accent-line)] transition-colors"
                >
                  ↗ Resume / CV
                </a>
              </div>
            </Reveal>
          </div>

          {/* Metadata spec card */}
          <Reveal delay={260} y={26}>
            <div className="border border-[#161c24] bg-[var(--surface)]/60 lg:sticky lg:top-24">
              <div className="px-5 py-3 border-b border-[#161c24] flex items-center justify-between">
                <span className="os-label" style={{ color: 'var(--accent)' }}>METADATA</span>
                <span className="os-label" style={{ fontSize: 10 }}>IDENTITY</span>
              </div>
              <dl className="divide-y divide-[#131920]">
                {META.map((m) => (
                  <div key={m.label} className="grid grid-cols-[110px,1fr] gap-3 px-5 py-3.5">
                    <dt className="os-label" style={{ fontSize: 10, paddingTop: 3 }}>{m.label}</dt>
                    <dd>
                      {m.link ? (
                        <a href={m.link} data-cursor="open" className="font-mono text-[12px] leading-relaxed text-[var(--ink)] hover:text-[var(--accent)] transition-colors">
                          {m.value}
                        </a>
                      ) : (
                        <span className="font-mono text-[12px] leading-relaxed text-[var(--ink)]">{m.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Records / fun facts */}
        <div className="grid md:grid-cols-3 border border-[#161c24] mt-16 md:mt-24">
          {funFacts.map((f, i) => (
            <Reveal key={f.title} delay={i * 120} className={i > 0 ? 'md:border-l md:border-[#161c24]' : ''}>
              <div className="h-full bg-[var(--surface)]/40 p-7 group hover:bg-[var(--surface-3)]/60 transition-colors">
                <div className="flex items-center justify-between mb-5">
                  <span className="os-label" style={{ color: 'var(--accent)' }}>
                    REC-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="os-label" style={{ fontSize: 10, opacity: 0.4 }}>LOG</span>
                </div>
                <h3 className="font-mono text-[13px] tracking-[0.12em] text-[var(--ink-strong)] mb-3">{f.title}</h3>
                <p className="text-[13px] leading-[1.7] text-[var(--ink-muted)]">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}