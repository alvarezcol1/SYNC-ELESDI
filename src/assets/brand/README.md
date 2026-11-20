# Brand assets — ACTION REQUIRED

The official EFFECTIVE logo was **not available** when this site was built.

Currently in use (temporary, clearly labeled):
- `src/components/Logo.tsx` — plain typographic wordmark with a visible
  "TEMP LOGO" badge. It intentionally does not imitate any logo artwork.
- `public/favicon.svg` — generic "E" monogram.

To install the official logo:
1. Add the approved files here, ideally `logo.svg` (light-on-dark) and
   `logo-dark.svg` (dark-on-light), plus a square `mark.svg` for the favicon.
2. In `Logo.tsx`, import the SVG and render it in place of the wordmark; delete
   the `.logo__temp` badge.
3. Replace `public/favicon.svg` and regenerate `public/og-image.jpg`
   (`node scripts/og-image.cjs` with the dev server running).
4. Sample the logo's exact navy / blue / red and update the `--brand-*` tokens in
   `src/styles/tokens.css`; every component derives from them.
