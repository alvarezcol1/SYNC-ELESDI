import { useI18n } from '../hooks/useI18n';
import { ButtonLink } from '../components/Button';
import { NeuralField } from '../components/NeuralField';
import { HeroScene, type Callout } from '../components/visuals/HeroScene';
import { MediaFrame } from '../components/MediaFrame';

/**
 * Callout anchor points in the HeroScene viewBox (1600×900), measured on the
 * mirrored truck (translate(2109 535) scale(-0.95 0.95)). Label order:
 * liability (front), physical damage (cab), cargo (trailer), umbrella (above).
 */
const ANCHORS: Omit<Callout, 'label'>[] = [
  { x: 935, y: 701, ly: 560 },
  { x: 1088, y: 697, ly: 406 },
  { x: 1311, y: 677, ly: 456 },
  { x: 1400, y: 563, ly: 366 },
];

export function Hero() {
  const { t } = useI18n();
  const [liability, cargo, physical, umbrella] = t.hero.nodes;
  const labels = [liability, physical, cargo, umbrella];
  const callouts: Callout[] = ANCHORS.map((a, i) => ({ ...a, label: labels[i] }));

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__stage" aria-hidden="false">
        <MediaFrame
          slot="hero"
          alt={t.hero.sceneLabel}
          priority
          className="hero__media"
          fallback={<HeroScene callouts={callouts} label={t.hero.sceneLabel} />}
        />
        <NeuralField className="hero__network" density={0.5} maxNodes={70} linkDistance={140} />
        <div className="hero__grain" aria-hidden="true" />
      </div>

      <div className="hero__content container">
        <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title" className="hero__title display">
          <span className="hero__line">
            <span>{t.hero.titleLine1}</span>
          </span>
          <span className="hero__line hero__line--accent">
            <span>{t.hero.titleLine2}</span>
          </span>
        </h1>
        <p className="hero__body">{t.hero.body}</p>
        <div className="hero__ctas">
          <ButtonLink href="#contact" variant="primary">
            {t.hero.ctaPrimary}
          </ButtonLink>
          <ButtonLink href="#solutions" variant="ghost" icon={false}>
            {t.hero.ctaSecondary}
          </ButtonLink>
        </div>
      </div>

      <a href="#solutions" className="hero__scroll">
        <span className="hero__scroll-track" aria-hidden="true">
          <span className="hero__scroll-dot" />
        </span>
        <span className="hero__scroll-label">{t.hero.scroll}</span>
      </a>
    </section>
  );
}
