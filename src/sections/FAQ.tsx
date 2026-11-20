import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

export function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section section--ivory faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <header className="faq__head">
          <p className="eyebrow" data-reveal>
            {t.faq.eyebrow}
          </p>
          <h2 id="faq-title" className="h-section" data-reveal>
            {t.faq.title}
          </h2>
        </header>
        <div className="faq__list" data-reveal="fade">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `faq-q-${i}`;
            const panelId = `faq-a-${i}`;
            return (
              <div key={i} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3 className="faq__q">
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <Plus size={20} className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={btnId} className="faq__a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
