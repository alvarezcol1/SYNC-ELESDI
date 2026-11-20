import { site } from '../data/site';

/** Build a wa.me deep link with a fully URI-encoded prefilled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
