import { useCallback, useEffect, useMemo, useRef } from 'react';
import anime from 'animejs';
import Reveal from '../../lib/anim/Reveal';
import { prefersReducedMotion } from '../../lib/anim/reduced';
import { stackGroups, builds, languages, skillIndex } from '../../data/content';

interface Relation {
  [tech: string]: string[];
}

function buildRelations(): Relation {
  const rendered = Array.from(skillIndex);
  const rel: Record<string, Set<string>> = {};
  rendered.forEach((t) => (rel[t] = new Set()));
  builds.forEach((b) => {
    const present = b.techs.filter((t) => rendered.includes(t));
    present.forEach((t) => {
      present.forEach((o) => {
        if (o !== t) rel[t].add(o);
      });
    });
  });
  const out: Relation = {};
  Object.entries(rel).forEach(([k, v]) => (out[k] = Array.from(v)));
  return out;
}

export default function Stack() {
  const relations = useMemo(buildRelations, []);
  const nodesRef = useRef<Record<string, HTMLElement | null>>({});
  const readoutRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  const spotlight = useCallback(
    (tech: string | null) => {
      if (reduced) return;
      const related = tech ? relations[tech] ?? [] : [];
      const all = Object.keys(nodesRef.current);

      const targetsOut = all.filter((t) => tech && t !== tech && !related.includes(t));
      const targetsIn = all.filter((t) => tech && (t === tech || related.includes(t)));

      anime.remove(targetsOut.map((t) => nodesRef.current[t]!).filter(Boolean));
      anime.remove(targetsIn.map((t) => nodesRef.current[t]!).filter(Boolean));

      anime({
        targets: targetsOut.map((t) => nodesRef.current[t]!).filter(Boolean),
        opacity: tech ? 0.18 : 1,
        duration: 260,
        easing: 'easeOutQuad',
      });
      anime({
        targets: targetsIn.map((t) => nodesRef.current[t]!).filter(Boolean),
        opacity: 1,
        duration: 260,
        delay: 40,
        easing: 'easeOutQuad',
      });

      const readout = readoutRef.current;
      if (readout) {
        anime.remove(readout);
        anime({
          targets: readout,
          opacity: [0.25, 1],
          translateY: [6, 0],
          duration: 320,
          easing: 'easeOutQuad',
        });
      }
    },
    [reduced, relations],
  );

  useEffect(() => spotlight(null), [spotlight]);

  return (
    <section id="stack" data-section className="relative py-28 md:py-40">
      <div className="px-5 sm:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <Reveal y={14}>
            <div className="os-label">
              <span style={{ color: 'var(--accent)' }}>04</span> / STACK — SYSTEM MAP
            </div>
          </Reveal>
          <Reveal y={14} delay={80}>
            <div className="os-label hidden sm:block" style={{ opacity: 0.5 }}>
              HOVER A NODE TO TRACE CONNECTIONS
            </div>
          </Reveal>
        </div>

        {/* Relationship readout */}
        <Reveal delay={100} className="mb-12">
          <div
            ref={readoutRef}
            className="border-l-2 border-[var(--accent-line)] bg-[var(--surface)]/40 px-5 py-3.5 flex flex-wrap items-center gap-x-6 gap-y-1"
          >
            <span className="os-label" style={{ fontSize: 10, color: 'var(--accent)' }} id="stack-readout">
              LIVE TRACE
            </span>
            <span className="font-mono text-[12px] text-[var(--ink-muted)]">
              Hover a technology to see the builds it appears with.
            </span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#161c24] border border-[#161c24]">
          {stackGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 90} className="bg-[#0b0e12]">
              <div className="h-full bg-[#0b0e12] hover:bg-[#0f141b] transition-colors duration-300">
                <div className="px-5 py-4 border-b border-[#161c24] flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-[13px] tracking-[0.18em] text-[var(--ink-strong)]">{group.label}</h3>
                    <span className="os-label mt-1 block" style={{ fontSize: 9.5, opacity: 0.45 }}>
                      {group.sys}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--ink-faint)]">
                    0{gi + 1}
                  </span>
                </div>

                <div className="px-5 py-5">
                  <ul className="space-y-1">
                    {group.items.map((item) => {
                      const rel = relations[item] ?? [];
                      return (
                        <li key={item}>
                          <button
                            type="button"
                            ref={(el) => {
                              nodesRef.current[item] = el;
                            }}
                            data-skill-node
                            onMouseEnter={() => spotlight(item)}
                            onFocus={() => spotlight(item)}
                            onMouseLeave={() => spotlight(null)}
                            onBlur={() => spotlight(null)}
                            className="group w-full flex items-center justify-between gap-3 border-l border-[#1c232c] px-3 py-2 text-left transition-colors hover:border-[var(--accent)]"
                            style={{ opacity: 1 }}
                          >
                            <span className="font-mono text-[13px] text-[var(--ink)] group-hover:text-[var(--accent)] font-medium">
                              {item}
                            </span>
                            <span
                              className="os-label hidden sm:block"
                              style={{ fontSize: 8.5, opacity: 0 }}
                            >
                              {rel.length > 0 ? `${rel.length} LINK${rel.length > 1 ? 'S' : ''}` : ''}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Languages registers */}
        <Reveal delay={120} className="mt-14">
          <div className="border border-[#161c24]">
            <div className="px-5 py-3 border-b border-[#161c24] flex items-center justify-between">
              <span className="os-label" style={{ color: 'var(--accent)' }}>
                LANGUAGE REGISTERS
              </span>
              <span className="os-label hidden sm:block" style={{ fontSize: 10 }}>
                RELATIVE PROFICIENCY
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {languages.map((lang, i) => (
                <div
                  key={lang.name}
                  className="px-5 py-4 flex items-center gap-4 odd:bg-[#0b0e12]"
                >
                  <span className="w-10 font-mono text-[10px] text-[var(--ink-faint)]">REG{i}</span>
                  <span className="font-mono text-[13px] text-[var(--ink-strong)] w-28 shrink-0">{lang.name}</span>
                  <div className="flex-1 flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 10 }).map((_, tick) => (
                      <span
                        key={tick}
                        className="h-[14px] w-[6px]"
                        style={{
                          background: tick < Math.round(lang.level / 10)
                            ? 'var(--accent)'
                            : '#1a2027',
                          opacity: tick < Math.round(lang.level / 10) ? 0.35 + (tick / 16) : 1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[12px] text-[var(--ink)] tabular-nums w-9 text-right">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}