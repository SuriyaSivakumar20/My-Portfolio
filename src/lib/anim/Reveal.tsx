import {
  CSSProperties,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import anime from 'animejs';
import { useInView } from './useInView';
import { prefersReducedMotion } from './reduced';

interface RevealProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Vertical offset to travel on enter (px). */
  y?: number;
  /** Horizontal offset to travel on enter (px). */
  x?: number;
  /** Start scale. */
  scale?: number;
  delay?: number;
  duration?: number;
  easing?: string;
  once?: boolean;
  /** When false, the block stays visible even after leaving view. */
  visibleOnLeave?: boolean;
  instant?: boolean;
  /** When provided, the reveal waits until active === true AND in view. */
  active?: boolean;
}

/**
 * Reveal — single source of truth for enter-on-scroll animation.
 * Uses Anime.js for the transition; reduces to plain static content
 * when the user prefers reduced motion.
 */
export default function Reveal({
  as: Tag = 'div',
  className,
  style,
  children,
  y = 24,
  x = 0,
  scale = 1,
  delay = 0,
  duration = 900,
  easing = 'cubicBezier(0.16, 1, 0.3, 1)',
  once = true,
  visibleOnLeave = false,
  instant = false,
  active,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ once, threshold: 0.12 });
  const reduced = prefersReducedMotion();
  const firedRef = useRef(false);
  const shouldRun = typeof active === 'boolean' ? active && inView : inView;
  const isStatic = reduced || instant;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isStatic) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.willChange = 'auto';
      return;
    }

    if (shouldRun) {
      if (once && firedRef.current && !visibleOnLeave) return;
      firedRef.current = true;
      anime.remove(el);
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [y, 0],
        translateX: [x, 0],
        scale: [scale, 1],
        delay,
        duration,
        easing,
        begin: () => {
          el.style.willChange = 'transform, opacity';
        },
        complete: () => {
          el.style.willChange = 'auto';
        },
      });
    } else if (visibleOnLeave && firedRef.current) {
      anime.remove(el);
      anime({
        targets: el,
        opacity: 0,
        translateY: y,
        translateX: x,
        scale,
        duration: 500,
        easing: 'easeOutQuad',
      });
    }
  }, [shouldRun, isStatic, once, visibleOnLeave, y, x, scale, delay, duration, easing, ref, active, inView]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: isStatic ? 1 : 0,
        transform: isStatic ? 'none' : `translateY(${y}px) translateX(${x}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}