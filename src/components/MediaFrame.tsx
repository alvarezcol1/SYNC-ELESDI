import type { ReactNode } from 'react';
import { photo, type PhotoSlot } from '../data/media';

/**
 * Renders a licensed photo for `slot` when one exists in src/assets/photos,
 * otherwise the designed SVG fallback. Keeps one aspect box either way so
 * swapping assets never shifts layout (no CLS).
 */
export function MediaFrame({
  slot,
  alt,
  fallback,
  className = '',
  priority = false,
}: {
  slot: PhotoSlot;
  alt: string;
  fallback: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const src = photo(slot);
  return (
    <div className={`media-frame ${className}`} data-has-photo={src ? 'true' : 'false'}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchpriority: 'high' } : {})}
        />
      ) : (
        fallback
      )}
    </div>
  );
}
