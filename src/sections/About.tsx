import { useI18n } from '../hooks/useI18n';
import { NeuralField } from '../components/NeuralField';

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <NeuralField className="about__network" density={0.28} maxNodes={40} linkDistance={170} signals={false} />
      <div className="container about__grid">
        <div className="about__intro">
          <p className="eyebrow" data-reveal>
            {t.about.eyebrow}
          </p>
          <h2 id="about-title" className="h-section" data-reveal>
            {t.about.title}
          </h2>
          {t.about.paragraphs.map((p) => (
            <p key={p} className="about__para" data-reveal>
              {p}
            </p>
          ))}
        </div>

        <div className="about__side">
          <figure className="about__mission" data-reveal="scale">
            <figcaption className="about__mission-label">{t.about.missionLabel}</figcaption>
            <blockquote>
              <p>{t.about.mission}</p>
            </blockquote>
          </figure>

          <dl className="spec" data-reveal>
            {t.about.facts.map((f) => (
              <div key={f.label} className="spec__row">
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            <div className="spec__row spec__row--coords" aria-hidden="true">
              <dt>N 32.7767°</dt>
              <dd>W 96.7970°</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
