import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/manga/scroll';
import { prefersReducedMotion } from '../../lib/anim/reduced';

/**
 * The sheet everything is printed on: paper photo, press distress,
 * halftone, grain and a vignette — plus the dashed orange spine that
 * runs down the whole document so the six sections read as one page.
 */
export default function MangaBackground() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion()) return;

    // the sheet drifts a touch slower than the content: background = 0.1x
    const tween = gsap.to(el, {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    ScrollTrigger.refresh();
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <>
      <div ref={stage} className="paper-stage" aria-hidden="true">
        <div className="paper-stage__photo" />
        <div className="paper-stage__distress" />
        <div className="paper-stage__halftone" />
        <div className="paper-stage__grain" />
        <div className="paper-stage__vignette" />
      </div>
      <div className="spine" aria-hidden="true" />
    </>
  );
}
