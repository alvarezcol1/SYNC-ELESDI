import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';
import { useScrollState } from '../hooks/useScrollState';
import { useActiveSection } from '../hooks/useActiveSection';
import { Logo } from '../components/Logo';
import { LanguageToggle } from '../components/LanguageToggle';
import { ButtonLink } from '../components/Button';
import { site } from '../data/site';

const SECTION_IDS = ['home', 'solutions', 'serve', 'about', 'contact'] as const;

export function Navigation() {
  const { t } = useI18n();
  const scrolled = useScrollState();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'solutions', label: t.nav.solutions },
    { id: 'serve', label: t.nav.serve },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  // Mobile sheet: lock scroll, close on Escape, keep focus inside, restore focus.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sheet?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const focusables = [toggleRef.current, ...Array.from(sheet.querySelectorAll<HTMLElement>('a, button'))].filter(Boolean) as HTMLElement[];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  // Close the sheet if the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar">
        <a href="#home" className="nav__brand" aria-label={`EFFECTIVE Insurance Agency — ${t.nav.home}`}>
          <Logo />
        </a>

        <nav className="nav__links" aria-label={t.a11y.primaryNav}>
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="nav__link" aria-current={active === l.id ? 'location' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <LanguageToggle className="nav__lang" />
          <ButtonLink href="#contact" variant="primary" className="nav__cta">
            {t.nav.quote}
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={sheetRef} className="nav__sheet" hidden={!open}>
        <nav aria-label={t.a11y.primaryNav}>
          <ul className="nav__sheet-links">
            {links.map((l, i) => (
              <li key={l.id} style={{ ['--i' as string]: i }}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} aria-current={active === l.id ? 'location' : undefined}>
                  <span className="nav__sheet-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__sheet-foot">
          <LanguageToggle />
          <ButtonLink href="#contact" onClick={() => setOpen(false)}>
            {t.nav.quote}
          </ButtonLink>
          <a href={site.phoneHref} className="nav__sheet-phone">
            <Phone size={16} aria-hidden="true" /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
