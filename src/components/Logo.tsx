import { useI18n } from '../hooks/useI18n';

/**
 * TEMPORARY PLACEHOLDER — NOT THE OFFICIAL LOGO.
 *
 * The approved EFFECTIVE logo was not available in the repository. This is a
 * plain typographic wordmark so layouts can be reviewed; it deliberately does
 * not imitate any logo artwork. Replace it by adding the official file at
 * `src/assets/brand/logo.svg` (light-on-dark version) and rendering it here.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  return (
    <span className="logo" data-placeholder="logo" title={t.a11y.logoPlaceholder}>
      <span className="logo__word">EFFECTIVE</span>
      {!compact && <span className="logo__sub">Insurance Agency</span>}
      <span className="logo__temp" aria-hidden="true">
        Temp logo
      </span>
      <span className="visually-hidden">{t.a11y.logoPlaceholder}</span>
    </span>
  );
}
