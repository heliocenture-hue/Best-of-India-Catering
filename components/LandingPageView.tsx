'use client';

import { Language } from '@/lib/i18n/types';
import SiteHeader from './SiteHeader';
import HeroCatering from './HeroCatering';
import AuthorityStrip from './AuthorityStrip';
import AboutBrand from './AboutBrand';
import OccasionCards from './OccasionCards';
import Testimonials from './Testimonials';
import CateringMenu from './CateringMenu';
import WhyChooseUs from './WhyChooseUs';
import ContactSection from './ContactSection';
import SiteFooter from './SiteFooter';
import FloatingWhatsApp from './FloatingWhatsApp';
import MobileStickyCTA from './MobileStickyCTA';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';
import JsonLd from './JsonLd';

interface LandingPageViewProps {
  lang: Language;
}

export default function LandingPageView({ lang }: LandingPageViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#1D1D19] selection:bg-[#FFC451] selection:text-[#1D1D19]">
      <JsonLd lang={lang} />

      {/* SECTION 01 — Sticky Navigation Header */}
      <SiteHeader lang={lang} />

      <main className="flex-1">
        {/* SECTION 02 — Hero Section with Catering Positioning and Lead Form */}
        <HeroCatering lang={lang} />

        {/* SECTION 03 — Authority Numbers Strip */}
        <AuthorityStrip lang={lang} />

        {/* SECTION 04 — About Best of India / Catering Introduction */}
        <AboutBrand lang={lang} />

        {/* SECTION 05 — Who We Serve — Event Catering Categories */}
        <OccasionCards lang={lang} />

        {/* SECTION 06 — Customer Testimonials */}
        <Testimonials lang={lang} />

        {/* SECTION 07 — Sample Catering Menu */}
        <CateringMenu lang={lang} />

        {/* SECTION 08 — Why Choose Best of India */}
        <WhyChooseUs lang={lang} />

        {/* SECTION 09 — Final Enquiry Section with Form, Map & Contacts */}
        <ContactSection lang={lang} />
      </main>

      {/* SECTION 10 — Minimal Branded Footer */}
      <SiteFooter lang={lang} />

      {/* Persistent Conversion & Utility Elements */}
      <FloatingWhatsApp lang={lang} />
      <MobileStickyCTA lang={lang} />
      <BackToTop lang={lang} />
      <CookieConsent lang={lang} />
    </div>
  );
}

