import { ElementType, useEffect, useMemo, useRef } from 'react';
import anime from 'animejs';
import { useInView } from './useInView';
import { prefersReducedMotion } from './reduced';

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  from?: 'up' | 'down' | 'fade';
  ariaLabel?: string;
  /** When provided, the reveal waits for active === true (e.g. after boot). */
  active?: boolean;
}

/**
 * TextReveal — splits text into per-character masks and reveals them
 * in sequence with Anime.js. The full string is kept for assistive tech
 * and SEO via a visually-hidden element.
 */
export default function TextReveal({
  text,
  as: Tag = 'span',
  className,
  charClassName,
  delay = 0,
  stagger = 20,
  duration = 420,
  from = 'up',
  ariaLabel,
  active,
}: TextRevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ once: true, threshold: 0.2 });
  const reduced = prefersReducedMotion();
  const played = useRef(false);

  const words = useMemo(() => text.split(/(\s+)/).filter(Boolean), [text]);
  const hiddenTranslate = from === 'up' ? '110%' : from === 'down' ? '-110%' : '0';
  const hiddenOpacity = from === 'fade' ? 0 : 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const shouldRun = typeof active === 'boolean' ? active && inView : inView;
    if (shouldRun && !played.current) {
      played.current = true;
      const targets = el.querySelectorAll<HTMLElement>('[data-char]');
      anime({
        targets,
        translateY: [hiddenTranslate, '0%'],
        opacity: [hiddenOpacity, 1],
        delay: anime.stagger(stagger, { start: delay, from: 'center' }),
        duration,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
  }, [inView, reduced, delay, stagger, duration, hiddenTranslate, hiddenOpacity, ref, active]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={ariaLabel ?? text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) =>
          /^\s+$/.test(word) ? (
            <span key={wi} style={{ display: 'inline-block', width: '0.28em' }} />
          ) : (
            <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((ch, ci) => (
                <span
                  key={ci}
                  className="char-mask"
                  data-char
                  style={{ transform: `translateY(${hiddenTranslate})`, opacity: hiddenOpacity }}
                >
                  <span className={charClassName}>{ch}</span>
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}