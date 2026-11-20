import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past `threshold` and publishes scroll
 * position as CSS custom properties (`--scroll-y`, `--scroll-progress`) on
 * <html>, throttled to one write per animation frame. Parallax layers read
 * those variables in CSS, so React does not re-render on scroll.
 */
export function useScrollState(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty('--scroll-y', String(Math.round(y)));
      root.style.setProperty('--scroll-progress', (y / max).toFixed(4));
      setScrolled(y > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [threshold]);
  return scrolled;
}
