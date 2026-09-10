import { useEffect, useRef } from 'react';
import TextReveal from '../../lib/anim/TextReveal';
import Reveal from '../../lib/anim/Reveal';
import anime from 'animejs';
import { profile, links } from '../../data/content';

interface HeroProps {
  booted: boolean;
  onCommand: () => void;
  onNavigate: (id: string) => void;
}

/**
 * SURIYA.OS — system boot hero. Massive editorial typography,
 * released in sequence once the boot sequence hands over.
 */
export default function Hero({ booted, onCommand, onNavigate }: HeroProps) {
  const live = booted;
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!live || !scrollRef.current) return;
    anime({
      targets: scrollRef.current,
      opacity: [0, 1],
      duration: 900,
      delay: 1600,
      easing: 'easeOutQuad',
    });
  }, [live]);

  return (
    <section id="top" data-section className="relative min-h-[100svh] flex flex-col justify-end md:justify-center pt-24 pb-16 md:pt-16">
      {/* Top-left technical meta */}
      <Reveal active={live} y={0} delay={200} className="absolute top-20 left-5 sm:left-10 md:top-24 lg:top-28">
        <div className="os-label">
          <span style={{ color: 'var(--accent)' }}>⌁</span> SURIYA.OS — USER PROFILE
        </div>
      </Reveal>
      <Reveal active={live} y={0} delay={260} className="absolute top-20 right-5 sm:right-10 md:top-24 lg:top-28 hidden md:block">
        <div className="os-label">
          BUILD V1.0.0 · EST 2022
        </div>
      </Reveal>

      <div className="relative z-10 px-5 sm:px-10">
        <div className="grid md:grid-cols-[1fr,320px] gap-10 items-end">
          {/* Headline */}
          <div>
            <TextReveal
              as="h1"
              active={live}
              text="SURIYA"
              className="block font-display font-semibold leading-[0.9] tracking-[-0.03em] text-[clamp(56px,11.5vw,170px)] text-[var(--ink-strong)]"
              stagger={38}
              duration={750}
              delay={340}
              from="up"
            />
            <TextReveal
              as="h1"
              active={live}
              text="SIVAKUMAR"
              className="block font-display font-semibold leading-[0.9] tracking-[-0.03em] text-[clamp(36px,7.4vw,112px)]"
              charClassName="hero-stroke"
              stagger={30}
              duration={720}
              delay={620}
              from="up"
            />
          </div>

          {/* Profile spec */}
          <div className="hidden md:block pb-2">
            <Reveal active={live} delay={1050} x={0}>
              <div className="border border-[#161c24] bg-[var(--surface)]/60">
                <div className="px-4 py-2.5 border-b border-[#161c24] flex items-center justify-between">
                  <span className="os-label" style={{ color: 'var(--accent)' }}>PROFILE</span>
                  <span className="os-label" style={{ fontSize: 10 }}>SPEC-01</span>
                </div>
                <dl className="px-4 py-1 divide-y divide-[#131920]">
                  {[
                    ['NAME', profile.name.toUpperCase()],
                    ['ROLE', 'SOFTWARE ENGINEER'],
                    ['STATUS', profile.status.toUpperCase()],
                    ['LOCATION', 'PONDICHERRY, INDIA'],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[86px,1fr] py-2 gap-2">
                      <dt className="os-label" style={{ fontSize: 10, paddingTop: 3 }}>{k}</dt>
                      <dd className="font-mono text-[12px] text-[var(--ink)] tracking-[0.04em]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="px-4 py-3 border-t border-[#161c24]">
                  <span className="os-label" style={{ fontSize: 10 }}>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--ok)] mr-2 os-pulse" />
                    {profile.available ? 'OPEN TO FREELANCE WORK' : 'BUSY'}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Statement */}
        <div className="mt-10 md:mt-14 max-w-3xl">
          <Reveal active={live} delay={1180} y={16}>
            <div className="os-label mb-4" style={{ color: 'var(--accent)' }}>
              {profile.role.toUpperCase()}
            </div>
          </Reveal>
          <Reveal active={live} delay={1240} y={16}>
            <p className="font-display text-[clamp(20px,3vw,34px)] font-medium text-[var(--ink)] leading-[1.15] tracking-[-0.01em]">
              {profile.subline}
            </p>
          </Reveal>
          <Reveal active={live} delay={1300} y={16}>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.75] text-[var(--ink-muted)]">
              {profile.tagline}
            </p>
          </Reveal>

          {/* Actions */}
          <Reveal active={live} delay={1400} y={16}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onCommand}
                className="group inline-flex items-center gap-3 border border-[var(--accent-line)] bg-[var(--accent-soft)] px-5 py-3 font-mono text-[12px] tracking-[0.14em] uppercase text-[var(--accent)] transition-colors hover:bg-[rgba(99,211,242,0.18)]"
              >
                <span className="origin-left transition-transform duration-200 group-hover:translate-x-1">▸</span> OPEN COMMAND
              </button>
              <a
                href={links.email}
                className="inline-flex items-center gap-3 px-5 py-3 border border-[#1c232c] font-mono text-[12px] tracking-[0.14em] uppercase text-[var(--ink-muted)] hover:text-[var(--ink-strong)] hover:border-[var(--line-strong)] transition-colors"
                data-cursor="open"
              >
                CONTACT
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom meta row */}
      <div className="absolute bottom-6 left-5 sm:left-10 right-5 sm:right-10 flex items-end justify-between">
        <span className="os-label hidden sm:block" style={{ fontSize: 10, opacity: 0.55 }}>
          CS ENGINEER · CLASS OF 2026
        </span>
        <button
          ref={scrollRef}
          type="button"
          onClick={() => onNavigate('about')}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] hover:text-[var(--accent)] transition-colors"
          style={{ opacity: 0 }}
        >
          <span>Scroll to explore</span>
          <span className="inline-block w-px h-5 self-center bg-[var(--ink-muted)]" />
          <span style={{ color: 'var(--accent)' }}>▾</span>
        </button>
      </div>
    </section>
  );
}