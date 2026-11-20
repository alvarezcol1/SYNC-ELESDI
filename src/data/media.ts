/**
 * Photography manifest.
 *
 * Drop a licensed photo into `src/assets/photos/` named after its slot
 * (e.g. `hero.webp`, `cargo.avif`, `serve-owner.jpg`) and it replaces the
 * designed SVG plate automatically — no code changes. Alt text comes from the
 * translation files, so it stays bilingual.
 *
 * Only add images whose usage rights are verified; record the source and
 * license in `src/assets/photos/CREDITS.md`. See that folder's README for the
 * shot list and recommended dimensions.
 */
const files = import.meta.glob('../assets/photos/*.{avif,webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const bySlot = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
  const slot = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  // Prefer modern formats when several exist for the same slot.
  if (!bySlot.has(slot) || /\.(avif|webp)$/.test(path)) bySlot.set(slot, url);
}

export type PhotoSlot =
  | 'hero'
  | 'autoLiability'
  | 'cargo'
  | 'physicalDamage'
  | 'generalLiability'
  | 'workersComp'
  | 'umbrella'
  | 'serve-owner'
  | 'serve-company'
  | 'serve-fleet'
  | 'about';

export function photo(slot: PhotoSlot): string | undefined {
  return bySlot.get(slot);
}
