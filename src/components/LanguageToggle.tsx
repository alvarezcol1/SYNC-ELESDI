import { useI18n } from '../hooks/useI18n';
import { LANGS } from '../translations/types';

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-toggle ${className}`} role="group" aria-label={t.a11y.language}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          className="lang-toggle__btn"
          aria-pressed={lang === l}
          lang={l}
          onClick={() => setLang(l)}
        >
          <span aria-hidden="true">{l.toUpperCase()}</span>
          <span className="visually-hidden">{l === 'en' ? 'English' : 'Español'}</span>
        </button>
      ))}
      <span className="lang-toggle__thumb" data-lang={lang} aria-hidden="true" />
    </div>
  );
}
