import { ArrowRight } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useTilt } from '../hooks/useTilt';
import { solutions, type SolutionId } from '../data/solutions';
import { SolutionPlate } from '../components/visuals/Schematics';
import { MediaFrame } from '../components/MediaFrame';
import { requestInterest } from '../lib/interest';

function SolutionCard({ id, index }: { id: SolutionId; index: number }) {
  const { t } = useI18n();
  const meta = solutions[index];
  const copy = t.solutions.items[id];
  const tilt = useTilt(4);
  const Icon = meta.icon;
  const headingId = `sol-${id}`;

  return (
    <article
      className={`sol-card sol-card--${meta.layout} sol-card--${id}`}
      aria-labelledby={headingId}
      data-reveal
      style={{ ['--reveal-i' as string]: index % 3 }}
      {...tilt}
    >
      <div className="sol-card__visual">
        <MediaFrame slot={id} alt={copy.visualLabel} fallback={<SolutionPlate id={id} label={copy.visualLabel} />} />
      </div>
      <div className="sol-card__body">
        <div className="sol-card__meta">
          <span className="sol-card__icon" aria-hidden="true">
            <Icon size={18} strokeWidth={1.6} />
          </span>
          <span className="sol-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="sol-card__tag">{copy.tag}</span>
        </div>
        <h3 id={headingId} className="sol-card__title">
          {copy.title}
        </h3>
        <p className="sol-card__short">{copy.short}</p>
        <p className="sol-card__detail">{copy.detail}</p>
        <a href="#contact" className="sol-card__cta" onClick={() => requestInterest(id)}>
          {t.solutions.cta}
          <span className="visually-hidden">: {copy.title}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <span className="sol-card__glare" aria-hidden="true" />
    </article>
  );
}

export function Solutions() {
  const { t } = useI18n();
  const d = t.solutions.distinction;
  return (
    <section id="solutions" className="section solutions" aria-labelledby="solutions-title">
      <div className="solutions__backdrop" aria-hidden="true" />
      <div className="container">
        <header className="section-head solutions__head">
          <p className="eyebrow" data-reveal>
            {t.solutions.eyebrow}
          </p>
          <h2 id="solutions-title" className="h-section" data-reveal>
            {t.solutions.title}
          </h2>
          <p className="lede" data-reveal>
            {t.solutions.intro}
          </p>
        </header>

        <div className="sol-grid">
          {solutions.map((s, i) => (
            <SolutionCard key={s.id} id={s.id} index={i} />
          ))}
        </div>

        <aside className="distinction" aria-labelledby="distinction-title" data-reveal>
          <h3 id="distinction-title" className="distinction__title">
            {d.title}
          </h3>
          <div className="distinction__split">
            <div className="distinction__side distinction__side--auto">
              <span className="distinction__label">{d.autoLabel}</span>
              <p>{d.autoText}</p>
            </div>
            <div className="distinction__divider" aria-hidden="true">
              <span />
            </div>
            <div className="distinction__side distinction__side--gl">
              <span className="distinction__label">{d.glLabel}</span>
              <p>{d.glText}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
