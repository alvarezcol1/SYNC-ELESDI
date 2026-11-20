import { useEffect } from 'react';

/**
 * One shared IntersectionObserver for every `[data-reveal]` element.
 * Elements get `is-visible` once and are then unobserved. CSS owns the motion,
 * and the reduced-motion stylesheet makes revealed and unrevealed identical.
 * Re-scans when `key` changes (e.g. language switch re-renders text).
 */
export function useReveal(key?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
