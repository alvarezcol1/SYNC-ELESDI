# EFFECTIVE INSURANCE AGENCY

Replacement website for **EFFECTIVE Insurance Agency LLC** (Dallas, Texas) —
creative concept *Intelligent Protection in Motion*. A single-page, bilingual
(EN/ES) React + TypeScript + Vite site for commercial transportation insurance.

> **Status:** built and tested locally; **not deployed**. The existing domain
> `effectiveinsure.com` and its DNS have not been touched.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

Node 18+ (built and tested with Node 22).

## Before launch — items that need the agency

| Item | Status | Where |
|------|--------|-------|
| Official logo | **Missing** — temporary wordmark with visible "TEMP LOGO" badge | `src/assets/brand/README.md` |
| Licensed photography | **Missing** — original SVG plates used meanwhile; drop-in slots ready | `src/assets/photos/README.md` |
| Form backend | Optional — WhatsApp handoff works today | `VITE_FORM_ENDPOINT` below |
| Privacy Policy / Terms | Placeholders (dialog) pending legal review | `legal` keys in `src/translations/*.ts` |
| Brand colors | Approximated from the brief; confirm against logo | `src/styles/tokens.css` |
| Licensing / disclosures | Generic agency disclosures only — add license numbers or state-required wording once confirmed | `footer.disclosures` in translations |
| Domain & hosting | Choose host; deploy only after approval | see *Deployment* |

## Contact form behaviour

The form validates name, phone (10–15 digits), optional email, business type,
base state (New York is rejected with an explanation), and insurance interest.

- **Default (no backend):** on submit it opens WhatsApp (`wa.me/15126785342`)
  with all details prefilled and URL-encoded, then shows a screen that says
  plainly the message *is not delivered until the visitor presses send in
  WhatsApp*. It never claims a message was sent.
- **With a backend:** set `VITE_FORM_ENDPOINT` (e.g. Formspree, Basin, or your
  own serverless function) in `.env`. The form then POSTs JSON
  `{ name, phone, email, businessType, state, interest, message, language, source }`
  and only shows "Request received" on an HTTP 2xx response; otherwise it shows
  an error with phone/WhatsApp alternatives. A hidden honeypot field drops bots.

Copy `.env.example` to `.env` to configure. `VITE_*` values are public — never
put secrets there.

## Architecture

```
src/
  App.tsx                 section order
  main.tsx                entry, fonts, providers
  layouts/SiteLayout.tsx  skip link, nav, footer, mobile action bar, legal dialog
  sections/               Navigation, Hero, Solutions, WhoWeServe, WhyEffective,
                          HowItWorks, About, FAQ, Contact, Footer
  components/             Button, Logo, LanguageToggle, NeuralField (canvas),
                          MediaFrame (photo-or-SVG slot), LegalDialog, …
  components/visuals/     TruckSilhouette, HeroScene, Schematics, SegmentScenes
  translations/           en.ts (source of truth), es.ts, types.ts
  data/                   site facts, solution metadata, photo manifest
  hooks/                  i18n, reveal-on-scroll, scroll state, tilt, …
  lib/                    WhatsApp URL builder, US states, interest events
  styles/                 tokens.css, base.css, components.css, sections.css
public/                   robots.txt, sitemap.xml, favicon.svg, og-image.jpg
scripts/og-image.cjs      regenerates the social share image
```

**Bilingual:** all visible text lives in `src/translations/`. `es.ts` is typed
against the English dictionary, so a missing or extra key fails the build.
English is default; the choice is saved per browser and shareable as `?lang=es`.
`<html lang>`, title, meta description and `og:locale` follow the language.

**Content rules baked in:** EFFECTIVE is described as an agency, never the
carrier. No testimonials, statistics, licenses, ratings, partner logos,
guarantees, instant quotes, or 24/7 claims. No nationwide claim; New York is
excluded. Auto liability vs. general liability is explained explicitly.
Structured data (`index.html`) contains only facts from the brief.

**Motion:** CSS-driven reveals and scene animation; a 2D-canvas network layer
that pauses off-screen and on hidden tabs. `prefers-reduced-motion` removes
all animation, shows all content immediately, and freezes the canvas. No WebGL
or animation libraries. Runtime dependencies: `react`, `react-dom`,
`lucide-react`, and self-hosted variable fonts (Archivo, Inter).

## Verified (local, production build)

- TypeScript strict: no errors. Browser console: no errors or warnings.
- Lighthouse — desktop: 100 / 100 / 100 / 100; mobile: 95 performance,
  100 accessibility / best practices / SEO (LCP 2.0 s throttled, CLS 0).
- axe-core (WCAG 2.2 AA + best practices): 0 violations, EN desktop and ES mobile.
- Automated Playwright run (62 checks): navigation, active section indicator,
  tabs + keyboard, FAQ, solution CTA → form preselect, form validation (EN/ES),
  NY exclusion, WhatsApp URL encoding, honest handoff state, legal dialog,
  language switch / persistence / no untranslated strings, mobile menu (focus,
  Esc, scroll lock), no horizontal overflow, reduced-motion behaviour.

Not verified here: real devices / Safari, and that WhatsApp opens on a phone
(the generated `wa.me` link was checked, not the app).

## Deployment (not done — requires approval)

`dist/` is a static site; any static host works (Netlify, Vercel, Cloudflare
Pages, S3 + CloudFront). Build command `npm run build`, output `dist`. Point
`effectiveinsure.com` at it **only after** the site is reviewed and approved.
Canonical, hreflang, sitemap and OG URLs already assume
`https://effectiveinsure.com/`.

## Repository notes

`docs/legacy/sync-elesdi-brief.txt` was previously `Index.html` at the repo
root: it contained a plain-text prompt for an unrelated "Sync Elesdi" project,
not HTML. It was moved (not deleted) because `Index.html` collides with Vite's
`index.html` on case-insensitive file systems (macOS, Windows).
