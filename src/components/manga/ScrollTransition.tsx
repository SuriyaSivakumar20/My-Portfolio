import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/manga/scroll';
import { prefersReducedMotion } from '../../lib/anim/reduced';

interface Props {
  n: string;
  to: string;
}

/**
 * The page-turn between chapters: hazard tape, then the next section's name
 * running past like a press ticker. It scrolls with the document (scrubbed),
 * so the eye is carried from one panel into the next instead of hitting a
 * hard cut.
 */
export default function ScrollTransition({ n, to }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const sweep = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    const tr = track.current;
    const sw = sweep.current;
    if (!el || !tr || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tr,
        { xPercent: 4 },
        {
          xPercent: -34,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
      /* the accent rule draws itself across the gutter on entry */
      if (sw) {
        gsap.fromTo(
          sw,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 40%',
              scrub: 0.5,
            },
          },
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const words = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div ref={root} className="turn relative select-none" aria-hidden="true">
      <span ref={sweep} className="turn__sweep" />
      <span className="turn__tape" />
      <div className="turn__mask">
        <div ref={track} className="turn__track">
          {words.map((i) => (
            <span key={i} className="turn__word">
              <span className="tnum">{n}</span>
              <span className="turn__sep">◆</span>
              <span>{to}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
