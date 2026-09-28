import { ReactNode } from 'react';

interface Props {
  src: string;
  alt: string;
  /** parallax speed — 0.1 background, 0.2 architecture, 0.35 character */
  speed?: number;
  sticky?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * The illustration column: bleeds off the left edge, dissolves into the
 * paper on the right and (optionally) sticks while its section scrolls.
 * The image carries data-speed so useParallax() picks it up.
 */
export default function MangaPanel({
  src,
  alt,
  speed = 0.35,
  sticky = true,
  className = '',
  children,
}: Props) {
  return (
    <div
      className={[
        'art-panel',
        sticky ? 'art-panel--sticky' : '',
        className,
      ].join(' ')}
      aria-hidden={alt ? undefined : true}
    >
      <img
        className="art-panel__img"
        data-speed={speed}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <span className="bracket bracket--tl" />
      {children}
    </div>
  );
}
