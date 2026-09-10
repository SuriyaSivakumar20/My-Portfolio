import Reveal from '../../lib/anim/Reveal';
import { education, achievements, certifications } from '../../data/content';

/**
 * Education & Achievements — historical EVENT LOG.
 */
export default function Achievements() {
  return (
    <section id="career" data-section className="relative py-28 md:py-40">
      <div className="px-5 sm:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>06</span> / EDUCATION & ACHIEVEMENTS — EVENT LOG
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
              {achievements.length} LOGGED EVENTS
            </div>
          </Reveal>
        </div>

        {/* Education */}
        <div className="grid md:grid-cols-2 gap-px bg-[#161c24] border border-[#161c24] mb-16">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 120} className="bg-[#0b0e12]">
              <div className="h-full bg-[#0b0e12] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className="os-label" style={{ color: 'var(--accent)' }}>EDU-0{i + 1}</span>
                  <span className="os-label" style={{ fontSize: 10, opacity: 0.5 }}>{edu.period}</span>
                </div>
                <h3 className="font-display text-[clamp(20px,2.6vw,28px)] font-medium tracking-[-0.01em] text-[var(--ink-strong)] leading-[1.1]">
                  {edu.degree}
                </h3>
                <p className="font-mono text-[12px] text-[var(--ink-muted)] mt-2">{edu.institution}</p>
                <p className="mt-4 text-[12.5px] leading-[1.7] text-[var(--ink-muted)]">{edu.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {edu.courses.map((c) => (
                    <span key={c} className="os-label text-[9px] border border-[#1c232c] px-2 py-1" style={{ fontSize: 9 }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Event log */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#161c24] border border-[#161c24]">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={(i % 3) * 110 + Math.floor(i / 3) * 60} className="bg-[#0b0e12]">
              <article className="group h-full flex flex-col bg-[#0b0e12] hover:bg-[#0f141b] transition-colors duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ filter: 'grayscale(0.45)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0)')}
                      onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(0.45)')}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#10151b] flex items-center justify-center">
                      <span className="os-label" style={{ fontSize: 10 }}>NO CAPTURE</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e12] via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="os-label" style={{ fontSize: 9, color: 'var(--accent)' }}>
                      {a.meta}
                    </span>
                    <span className="os-label" style={{ fontSize: 9, opacity: 0.5 }}>{a.date}</span>
                  </div>
                  <h4 className="font-display text-[18px] font-medium tracking-[-0.01em] text-[var(--ink-strong)] leading-[1.15] mb-3">
                    {a.title}
                  </h4>
                  <p className="text-[12.5px] leading-[1.7] text-[var(--ink-muted)]">{a.description}</p>
                  <span className="os-label mt-auto pt-4" style={{ fontSize: 9, opacity: 0.4 }}>
                    LOG-{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal delay={120} className="mt-16">
          <div className="border border-[#161c24]">
            <div className="px-5 py-3.5 border-b border-[#161c24] flex items-center justify-between">
              <span className="os-label" style={{ color: 'var(--accent)' }}>CERTIFICATIONS / TRAINING</span>
              <span className="os-label hidden sm:block" style={{ fontSize: 10 }}>{certifications.length} RECORDS</span>
            </div>
            <div className="grid md:grid-cols-2 gap-x-10">
              {certifications.map((c, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-[#131920]">
                  <span className="font-mono text-[10px] text-[var(--ink-faint)] mt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[12.5px] leading-[1.65] text-[var(--ink-muted)]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}