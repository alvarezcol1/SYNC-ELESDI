import { Phone } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { Logo } from '../components/Logo';
import { LanguageToggle } from '../components/LanguageToggle';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { site } from '../data/site';
import { solutionIds } from '../data/solutions';
import { whatsappUrl } from '../lib/whatsapp';
import { requestInterest } from '../lib/interest';

export function Footer({ onLegal }: { onLegal: (doc: 'privacy' | 'terms') => void }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__horizon" aria-hidden="true" />
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__tagline">{t.footer.tagline}</p>
            <LanguageToggle />
          </div>

          <nav className="footer__col" aria-label={t.a11y.footerNav}>
            <h2 className="footer__heading">{t.footer.explore}</h2>
            <ul>
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#solutions">{t.nav.solutions}</a></li>
              <li><a href="#serve">{t.nav.serve}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#faq">{t.faq.eyebrow}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">{t.footer.solutions}</h2>
            <ul>
              {solutionIds.map((id) => (
                <li key={id}>
                  <a href="#contact" onClick={() => requestInterest(id)}>
                    {t.solutions.items[id].title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__heading">{t.footer.contact}</h2>
            <ul className="footer__contact">
              <li>
                <a href={site.phoneHref}>
                  <Phone size={15} aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappUrl(t.contact.whatsappDefault)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={15} /> WhatsApp
                  <span className="visually-hidden"> {t.a11y.opensWhatsApp}</span>
                </a>
              </li>
              <li className="footer__muted">{t.contact.location}</li>
            </ul>
          </div>
        </div>

        <section className="footer__disclosures" aria-labelledby="disclosures-title">
          <h2 id="disclosures-title" className="footer__heading">
            {t.footer.disclosureTitle}
          </h2>
          {t.footer.disclosures.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </section>

        <div className="footer__bottom">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <div className="footer__legal">
            <button type="button" onClick={() => onLegal('privacy')}>
              {t.footer.privacy}
            </button>
            <button type="button" onClick={() => onLegal('terms')}>
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
