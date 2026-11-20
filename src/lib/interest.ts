import type { SolutionId } from '../data/solutions';

/**
 * Lets any "Ask about this coverage" link pre-select the quote form's
 * interest field without prop drilling or a state library.
 */
const EVENT = 'effective:interest';

export function requestInterest(id: SolutionId) {
  window.dispatchEvent(new CustomEvent<SolutionId>(EVENT, { detail: id }));
}

export function onInterest(cb: (id: SolutionId) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<SolutionId>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
