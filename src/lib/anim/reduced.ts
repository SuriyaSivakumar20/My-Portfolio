/* Respect the user's motion preferences across the OS. */

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const reducedMotionQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

export function listenToMotionPreference(cb: (reduced: boolean) => void): () => void {
  if (!window.matchMedia) return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}

/**
 * Animation duration helper — scales duration down when motion is reduced.
 * Use this in anime.js calls instead of hardcoded durations.
 */
export function animationDuration(baseMs: number): number {
  if (prefersReducedMotion()) return 0;
  return baseMs;
}
