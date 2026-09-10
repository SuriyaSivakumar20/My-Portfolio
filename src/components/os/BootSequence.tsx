import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { prefersReducedMotion } from '../../lib/anim/reduced';

const BOOT_LINES = [
  'INITIALIZING SURIYA.OS  v1.0.0',
  '',
  '▸ MOUNTING PROFILE ........ ok',
  '▸ MOUNTING PROJECTS ....... ok',
  '▸ MOUNTING EXPERIENCE ..... ok',
  '▸ LOADING STACK ........... ok',
  '▸ OPENING COMMAND LINE .... ok',
  '',
  'SYSTEM READY',
];

interface BootSequenceProps {
  onComplete: () => void;
  onStart?: () => void;
}

/**
 * Cinematic boot overlay. Types the boot log in sequence, fills a
 * progress meter, then handshakes the OS shell and exits.
 * Skippable via keypress / tap to avoid harming usability.
 */
export default function BootSequence({ onComplete, onStart }: BootSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    onStart?.();
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      document.body.classList.remove('no-scroll');
      anime({
        targets: root,
        opacity: [1, 0],
        duration: 520,
        easing: 'easeInOutQuad',
        complete: () => {
          root.style.pointerEvents = 'none';
          onComplete();
        },
      });
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    document.body.classList.add('no-scroll');
    const lines = Array.from(root.querySelectorAll<HTMLElement>('[data-boot-line]'));

    const tl = anime.timeline({
      easing: 'easeOutQuad',
      complete: () => {
        finish();
      },
    });

    lines.forEach((line, i) => {
      const last = i === lines.length - 1;
      tl.add({
        targets: line,
        opacity: [0, last ? 1 : 0.82],
        translateX: [14, 0],
        duration: last ? 320 : 60,
        delay: i === 0 ? 120 : 0,
      }, `+=${last ? 120 : 60}`);
    });

    // progress meter
    const meter = root.querySelector<HTMLElement>('[data-boot-meter]');
    tl.add({
      targets: meter,
      width: ['0%', '100%'],
      duration: 900,
      easing: 'easeInOutCubic',
    }, '-=100');

    const onKey = () => finish();
    window.addEventListener('keydown', onKey, { once: true });

    return () => {
      tl.pause();
      window.removeEventListener('keydown', onKey);
    };
  }, [onComplete, onStart]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] bg-[#07090b]"
      role="dialog"
      aria-label="Loading Suriya.OS"
    >
      <div className="flex min-h-full items-center px-6 sm:px-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="os-label mb-10">
            SURIYA.OS <span style={{ color: 'var(--accent)' }}>/ BOOT SEQUENCE</span>
          </div>

          <div className="font-mono text-[13px] sm:text-[15px] leading-[1.9] text-[#9aa4b1]">
            {BOOT_LINES.map((l, i) =>
              l === '' ? (
                <div key={i} style={{ height: '0.9em' }} />
              ) : (
                <div
                  key={i}
                  data-boot-line
                  style={{ opacity: 0 }}
                  className={
                    i === BOOT_LINES.length - 1 ? 'text-[var(--accent)] font-semibold tracking-[0.2em]' : ''
                  }
                >
                  {l}
                  {i === BOOT_LINES.length - 1 && <span className="os-caret" style={{ marginLeft: 8 }} />}
                  {i === 0 && <span className="os-caret" style={{ marginLeft: 8 }} />}
                </div>
              ),
            )}
          </div>

          <div className="mt-10 w-full h-px bg-[#161c24]">
            <div data-boot-meter className="h-full" style={{ width: '0%', background: 'var(--accent)' }} />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="os-label" style={{ opacity: 0.6 }}>PRESS ANY KEY TO SKIP</span>
            <span className="os-label" style={{ opacity: 0.6 }}>PONDICHERRY · INDIA</span>
          </div>
        </div>
      </div>
    </div>
  );
}