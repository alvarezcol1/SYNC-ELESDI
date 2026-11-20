import { Compass, MessagesSquare, Network, Truck, UserRound } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

const ICONS = [Compass, MessagesSquare, Network, Truck, UserRound];

export function WhyEffective() {
  const { t } = useI18n();
  return (
    <section className="section section--ivory why" aria-labelledby="why-title">
      <div className="why__pattern" aria-hidden="true" />
      <div className="container why__grid">
        <div className="why__lead">
          <p className="eyebrow" data-reveal>
            {t.why.eyebrow}
          </p>
          <h2 id="why-title" className="why__title display" data-reveal>
            {t.why.title}
          </h2>
          <p className="why__statement" data-reveal>
            {t.why.statement}
          </p>
        </div>
        <ol className="why__list">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item.title} className="why__item" data-reveal style={{ ['--reveal-i' as string]: i % 2 }}>
                <span className="why__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="why__item-title">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p>{item.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
