import { useState, type ReactNode } from 'react';
import { useI18n } from '../hooks/useI18n';
import { Navigation } from '../sections/Navigation';
import { Footer } from '../sections/Footer';
import { LegalDialog } from '../components/LegalDialog';
import { MobileActionBar } from '../components/MobileActionBar';

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [legal, setLegal] = useState<'privacy' | 'terms' | null>(null);
  return (
    <>
      <a href="#main" className="skip-link">
        {t.a11y.skip}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <Navigation />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer onLegal={setLegal} />
      <MobileActionBar />
      <LegalDialog doc={legal} onClose={() => setLegal(null)} />
    </>
  );
}
