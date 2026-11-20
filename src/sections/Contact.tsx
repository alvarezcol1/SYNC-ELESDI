import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, MapPin, Languages, Phone, RotateCcw } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { site } from '../data/site';
import { solutionIds } from '../data/solutions';
import { whatsappUrl } from '../lib/whatsapp';
import { onInterest } from '../lib/interest';
import { US_STATES, EXCLUDED_STATES } from '../lib/states';
import { Button, ButtonLink } from '../components/Button';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { NeuralField } from '../components/NeuralField';

type Fields = {
  name: string;
  phone: string;
  email: string;
  businessType: string;
  state: string;
  interest: string;
  message: string;
  website: string; // honeypot — real users never see or fill this
};
type FieldName = Exclude<keyof Fields, 'website'>;
type Errors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'handoff' | 'success' | 'failure';

const EMPTY: Fields = { name: '', phone: '', email: '', businessType: '', state: '', interest: '', message: '', website: '' };
const ORDER: FieldName[] = ['name', 'phone', 'email', 'businessType', 'state', 'interest', 'message'];
const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || '';

export function Contact() {
  const { t, lang } = useI18n();
  const f = t.contact.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [handoffUrl, setHandoffUrl] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  // Pre-select interest when a solution card's CTA is used.
  useEffect(() => onInterest((id) => setValues((v) => ({ ...v, interest: id }))), []);

  // Re-validate visible errors in the new language when the language changes.
  useEffect(() => {
    setErrors((prev) => {
      const next: Errors = {};
      for (const k of Object.keys(prev) as FieldName[]) {
        const msg = validateField(k, values[k]);
        if (msg) next[k] = msg;
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Move focus to the result panel so screen-reader and keyboard users land on it.
  useEffect(() => {
    if (status === 'handoff' || status === 'success' || status === 'failure') statusRef.current?.focus();
  }, [status]);

  function validateField(name: FieldName, value: string): string | undefined {
    const v = value.trim();
    switch (name) {
      case 'name':
        if (!v) return f.errors.required;
        if (v.length < 2) return f.errors.name;
        return;
      case 'phone': {
        if (!v) return f.errors.required;
        const digits = v.replace(/\D/g, '');
        if (digits.length < 10 || digits.length > 15) return f.errors.phone;
        return;
      }
      case 'email':
        if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return f.errors.email;
        return;
      case 'businessType':
      case 'interest':
        if (!v) return f.errors.required;
        return;
      case 'state':
        if (!v) return f.errors.required;
        if (EXCLUDED_STATES.has(v)) return f.errors.state;
        return;
      case 'message':
        return;
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Fields;
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (name === 'website') return;
    // Validate live once a field has been touched, or immediately for selects (e.g. NY notice).
    if (touched[name] || e.target.tagName === 'SELECT') {
      setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
    }
  };

  const onBlur = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name as FieldName;
    if (!ORDER.includes(name)) return;
    setTouched((tc) => ({ ...tc, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, e.target.value) }));
  };

  const labelFor = {
    businessType: (k: string) => (f.businessTypes as Record<string, string>)[k] ?? k,
    interest: (k: string) =>
      k === 'notSure' ? f.interestNotSure : (t.solutions.items as Record<string, { title: string }>)[k]?.title ?? k,
    state: (k: string) => US_STATES.find(([c]) => c === k)?.[1] ?? k,
  };

  function buildWhatsAppMessage(v: Fields) {
    const L = f.whatsappFields;
    const details = [
      `${L.name}: ${v.name.trim()}`,
      `${L.phone}: ${v.phone.trim()}`,
      v.email.trim() ? `${L.email}: ${v.email.trim()}` : null,
      `${L.businessType}: ${labelFor.businessType(v.businessType)}`,
      `${L.state}: ${labelFor.state(v.state)}`,
      `${L.interest}: ${labelFor.interest(v.interest)}`,
      v.message.trim() ? `${L.message}: ${v.message.trim()}` : null,
    ].filter(Boolean);
    return [f.whatsappHeader, '', ...details].join('\n');
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    for (const k of ORDER) {
      const msg = validateField(k, values[k]);
      if (msg) next[k] = msg;
    }
    setErrors(next);
    setTouched(Object.fromEntries(ORDER.map((k) => [k, true])));
    const firstInvalid = ORDER.find((k) => next[k]);
    if (firstInvalid) {
      setShowSummary(true);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setShowSummary(false);

    // Bots fill hidden fields; silently drop without pretending anything was sent.
    if (values.website) return;

    if (ENDPOINT) {
      setStatus('submitting');
      try {
        const { website: _hp, ...payload } = values;
        void _hp;
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...payload, language: lang, source: 'website-quote-form' }),
        });
        setStatus(res.ok ? 'success' : 'failure');
      } catch {
        setStatus('failure');
      }
      return;
    }

    // No backend configured: hand off to WhatsApp with the details prefilled.
    const url = whatsappUrl(buildWhatsAppMessage(values));
    setHandoffUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
    setStatus('handoff');
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus('idle');
    setHandoffUrl('');
  }

  const field = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-err` : undefined,
  });

  const Err = ({ name }: { name: FieldName }) =>
    errors[name] ? (
      <p id={`${uid}-${name}-err`} className="field__error">
        <AlertCircle size={14} aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  const defaultWa = whatsappUrl(t.contact.whatsappDefault);
  const done = status === 'handoff' || status === 'success';

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <NeuralField className="contact__network" density={0.35} maxNodes={50} linkDistance={160} />
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="eyebrow" data-reveal>
            {t.contact.eyebrow}
          </p>
          <h2 id="contact-title" className="contact__title display" data-reveal>
            {t.contact.title}
          </h2>
          <p className="lede" data-reveal>
            {t.contact.intro}
          </p>

          <div className="contact__channels" data-reveal>
            <a href={site.phoneHref} className="channel channel--phone">
              <span className="channel__icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <span className="channel__text">
                <span className="channel__label">{t.contact.phoneLabel}</span>
                <span className="channel__value">{site.phoneDisplay}</span>
              </span>
            </a>
            <a href={defaultWa} target="_blank" rel="noopener noreferrer" className="channel channel--whatsapp">
              <span className="channel__icon" aria-hidden="true">
                <WhatsAppIcon size={20} />
              </span>
              <span className="channel__text">
                <span className="channel__label">{t.contact.whatsappLabel}</span>
                <span className="channel__value">{t.contact.whatsappCta}</span>
              </span>
              <span className="visually-hidden">{t.a11y.opensWhatsApp}</span>
            </a>
          </div>

          <dl className="contact__facts" data-reveal>
            <div>
              <dt>
                <MapPin size={16} aria-hidden="true" />
                {t.contact.locationLabel}
              </dt>
              <dd>{t.contact.location}</dd>
            </div>
            <div>
              <dt>
                <Languages size={16} aria-hidden="true" />
                {t.contact.languagesLabel}
              </dt>
              <dd>{t.contact.languages}</dd>
            </div>
          </dl>
        </div>

        <div className="contact__panel" data-reveal="scale">
          <div className="contact__panel-edge" aria-hidden="true" />
          {done || status === 'failure' ? (
            <div ref={statusRef} tabIndex={-1} className={`form-result form-result--${status}`} role="status" aria-live="polite">
              {status === 'failure' ? (
                <AlertCircle size={36} aria-hidden="true" className="form-result__icon" />
              ) : (
                <CheckCircle2 size={36} aria-hidden="true" className="form-result__icon" />
              )}
              <h3>{status === 'handoff' ? f.handoff.title : status === 'success' ? f.success.title : f.failure.title}</h3>
              <p>{status === 'handoff' ? f.handoff.body : status === 'success' ? f.success.body : f.failure.body}</p>
              {status === 'handoff' && (
                <>
                  <p className="form-result__hint">{f.handoff.popupBlocked}</p>
                  <ButtonLink href={handoffUrl} target="_blank" rel="noopener noreferrer" variant="whatsapp" icon={<WhatsAppIcon />}>
                    {f.handoff.retry}
                    <span className="visually-hidden"> {t.a11y.opensWhatsApp}</span>
                  </ButtonLink>
                </>
              )}
              {status === 'failure' ? (
                <Button type="button" variant="ghost" onClick={() => setStatus('idle')} icon={<RotateCcw size={16} />}>
                  {f.submitEndpoint}
                </Button>
              ) : (
                <button type="button" className="form-result__reset" onClick={reset}>
                  {status === 'handoff' ? f.handoff.reset : f.success.reset}
                </button>
              )}
            </div>
          ) : (
            <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-labelledby={`${uid}-title`}>
              <div className="form__head">
                <h3 id={`${uid}-title`} className="form__title">
                  {f.title}
                </h3>
                <p className="form__hint">{f.requiredHint}</p>
              </div>

              {showSummary && Object.values(errors).some(Boolean) && (
                <p className="form__summary" role="alert">
                  <AlertCircle size={16} aria-hidden="true" />
                  {f.errors.summary}
                </p>
              )}

              <div className="form__grid">
                <div className="field field--full">
                  <label htmlFor={`${uid}-name`}>
                    {f.name} <span aria-hidden="true">*</span>
                  </label>
                  <input type="text" autoComplete="name" required {...field('name')} />
                  <Err name="name" />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-phone`}>
                    {f.phone} <span aria-hidden="true">*</span>
                  </label>
                  <input type="tel" inputMode="tel" autoComplete="tel" required {...field('phone')} />
                  <Err name="phone" />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-email`}>{f.email}</label>
                  <input type="email" inputMode="email" autoComplete="email" {...field('email')} />
                  <Err name="email" />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-businessType`}>
                    {f.businessType} <span aria-hidden="true">*</span>
                  </label>
                  <select required {...field('businessType')}>
                    <option value="">{f.select}</option>
                    {Object.entries(f.businessTypes).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <Err name="businessType" />
                </div>
                <div className="field">
                  <label htmlFor={`${uid}-state`}>
                    {f.state} <span aria-hidden="true">*</span>
                  </label>
                  <select required autoComplete="address-level1" {...field('state')}>
                    <option value="">{f.select}</option>
                    {US_STATES.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <Err name="state" />
                </div>
                <div className="field field--full">
                  <label htmlFor={`${uid}-interest`}>
                    {f.interest} <span aria-hidden="true">*</span>
                  </label>
                  <select required {...field('interest')}>
                    <option value="">{f.select}</option>
                    {solutionIds.map((id) => (
                      <option key={id} value={id}>
                        {t.solutions.items[id].title}
                      </option>
                    ))}
                    <option value="notSure">{f.interestNotSure}</option>
                  </select>
                  <Err name="interest" />
                </div>
                <div className="field field--full">
                  <label htmlFor={`${uid}-message`}>{f.message}</label>
                  <textarea rows={4} maxLength={1200} placeholder={f.messagePlaceholder} {...field('message')} />
                </div>
                <div className="field field--hp" aria-hidden="true">
                  <label htmlFor={`${uid}-website`}>Website</label>
                  <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
                </div>
              </div>

              <p className="form__consent">{f.consent}</p>
              <Button
                type="submit"
                variant={ENDPOINT ? 'primary' : 'whatsapp'}
                className="form__submit"
                disabled={status === 'submitting'}
                icon={ENDPOINT ? undefined : <WhatsAppIcon />}
              >
                {status === 'submitting' ? f.submitting : ENDPOINT ? f.submitEndpoint : f.submit}
                {!ENDPOINT && <span className="visually-hidden"> {t.a11y.opensWhatsApp}</span>}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
