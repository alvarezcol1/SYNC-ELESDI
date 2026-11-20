import { useI18n } from './hooks/useI18n';
import { useReveal } from './hooks/useReveal';
import { SiteLayout } from './layouts/SiteLayout';
import { Hero } from './sections/Hero';
import { Solutions } from './sections/Solutions';
import { WhoWeServe } from './sections/WhoWeServe';
import { WhyEffective } from './sections/WhyEffective';
import { HowItWorks } from './sections/HowItWorks';
import { About } from './sections/About';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';

export default function App() {
  const { lang } = useI18n();
  useReveal(lang);
  return (
    <SiteLayout>
      <Hero />
      <Solutions />
      <WhoWeServe />
      <WhyEffective />
      <HowItWorks />
      <About />
      <FAQ />
      <Contact />
    </SiteLayout>
  );
}
