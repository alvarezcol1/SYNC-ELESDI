import { useEffect, useState } from 'react';
import { useI18n } from '../hooks/useI18n';
import { whatsappUrl } from '../lib/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * Small-screen conversion bar: appears once the hero has scrolled away and
 * hides while the contact section is on screen (the form is already there).
 */
export function MobileActionBar() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('home');
    const contact = document.getElementById('contact');
    if (!hero || !contact) return;
    let pastHero = false;
    let inContact = false;
    const sync = () => setShow(pastHero && !inContact);
    // "Past the hero" once less than 25% of it remains on screen.
    const heroIo = new IntersectionObserver(
      ([e]) => {
        pastHero = e.intersectionRatio < 0.25;
        sync();
      },
      { threshold: [0, 0.25, 0.5] },
    );
    const contactIo = new IntersectionObserver(([e]) => {
      inContact = e.isIntersecting;
      sync();
    });
    heroIo.observe(hero);
    contactIo.observe(contact);
    return () => {
      heroIo.disconnect();
      contactIo.disconnect();
    };
  }, []);

  return (
    <div className={`action-bar ${show ? 'is-shown' : ''}`} aria-hidden={!show}>
      <a href="#contact" className="action-bar__quote" tabIndex={show ? 0 : -1}>
        {t.nav.quote}
      </a>
      <a
        href={whatsappUrl(t.contact.whatsappDefault)}
        target="_blank"
        rel="noopener noreferrer"
        className="action-bar__wa"
        tabIndex={show ? 0 : -1}
        aria-label={`WhatsApp ${t.a11y.opensWhatsApp}`}
      >
        <WhatsAppIcon size={22} />
      </a>
    </div>
  );
}
