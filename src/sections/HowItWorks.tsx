import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

/**
 * Four steps laid along a "route". The route fills as each step enters the
 * reading zone; steps already passed stay lit.
 */
export function HowItWorks() {
  const { t } = useI18n();
  const [reached, setReached] = useState(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.step);
          setReached((r) => Math.max(r, i));
        }
      },
      { rootMargin: '0px 0px -30% 0px', threshold: 0.6 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = t.process.steps;
  const fill = reached < 0 ? 0 : (reached + 1) / steps.length;

  return (
    <section className="section process" aria-labelledby="process-title">
      <div className="container">
        <header className="section-head process__head">
          <p className="eyebrow" data-reveal>
            {t.process.eyebrow}
          </p>
          <h2 id="process-title" className="h-section" data-reveal>
            {t.process.title}
          </h2>
        </header>

        <div className="route" style={{ ['--fill' as string]: fill }}>
          <div className="route__track" aria-hidden="true">
            <span className="route__fill" />
          </div>
          <ol className="route__steps">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-step={i}
                className={`route__step ${i <= reached ? 'is-reached' : ''}`}
              >
                <span className="route__node" aria-hidden="true">
                  <span />
                </span>
                <span className="route__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="route__title">
                  <span className="visually-hidden">{String(i + 1).padStart(2, '0')} — </span>
                  {s.title}
                </h3>
                <p className="route__body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className="process__note" data-reveal>
          <Info size={18} aria-hidden="true" />
          <span>{t.process.note}</span>
        </p>
      </div>
    </section>
  );
}
