import { RefObject, useEffect, useRef, useState } from 'react';

interface InViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useInView<T extends Element = HTMLElement>(
  options: InViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { once = true, threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}