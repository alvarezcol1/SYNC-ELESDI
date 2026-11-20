import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Check } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { SegmentScene, type SegmentId } from '../components/visuals/SegmentScenes';
import { MediaFrame } from '../components/MediaFrame';

/** WAI-ARIA tabs: every panel stays in the DOM (crawlable), inactive ones are `hidden`. */
export function WhoWeServe() {
  const { t } = useI18n();
  const items = t.serve.items;
  const [active, setActive] = useState(0);
  // Scenes are decorative and heavy; mount each one the first time its tab opens.
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  useEffect(() => setSeen((s) => (s.has(active) ? s : new Set(s).add(active))), [active]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = active;
    if (e.key in keys) next = (active + keys[e.key] + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="serve" className="section serve" aria-labelledby="serve-title">
      <div className="container">
        <header className="section-head serve__head">
          <p className="eyebrow" data-reveal>
            {t.serve.eyebrow}
          </p>
          <h2 id="serve-title" className="h-section" data-reveal>
            {t.serve.title}
          </h2>
          <p className="lede" data-reveal>
            {t.serve.intro}
          </p>
        </header>

        <div className="serve__layout" data-reveal="fade">
          <div className="serve__tabs" role="tablist" aria-label={t.serve.eyebrow} aria-orientation="vertical">
            {items.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`serve-tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`serve-panel-${item.id}`}
                tabIndex={active === i ? 0 : -1}
                className="serve__tab"
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                <span className="serve__tab-num" aria-hidden="true">
                  {item.label}
                </span>
                <span className="serve__tab-title">{item.title}</span>
                <span className="serve__tab-bar" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="serve__panels">
            {items.map((item, i) => (
              <div
                key={item.id}
                id={`serve-panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`serve-tab-${item.id}`}
                hidden={active !== i}
                className="serve__panel"
              >
                <div className="serve__visual">
                  {seen.has(i) && (
                    <MediaFrame
                      slot={`serve-${item.id}` as 'serve-owner'}
                      alt={item.visualLabel}
                      fallback={<SegmentScene id={item.id as SegmentId} label={item.visualLabel} />}
                    />
                  )}
                  <span className="serve__visual-num" aria-hidden="true">
                    {item.label}
                  </span>
                </div>
                <div className="serve__copy">
                  <h3 className="serve__title">{item.title}</h3>
                  <p className="serve__body">{item.body}</p>
                  <ul className="serve__points">
                    {item.points.map((p) => (
                      <li key={p}>
                        <Check size={16} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
