'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';
import LegalModal from './LegalModal';
import { trackEvent } from '@/lib/analytics';

interface SiteFooterProps {
  lang: Language;
}

export default function SiteFooter({ lang }: SiteFooterProps) {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;
  const currentYear = new Date().getFullYear();

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'legal'>('privacy');

  const openLegal = (type: 'privacy' | 'legal') => {
    setLegalModalType(type);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-[#1D1D19] text-[#F8F4EC] pt-16 pb-24 sm:pb-16 border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Statement (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="relative h-12 w-48"
              style={{ position: 'relative', height: '48px', width: '192px', maxWidth: '100%' }}
            >
              <Image
                src="/images/boi-logo-white.png"
                alt="Best of India — Restaurant Indien & Traiteur Paris"
                fill
                className="object-contain object-left"
                sizes="192px"
              />
            </div>

            <p className="text-sm text-[#F8F4EC]/75 leading-relaxed max-w-sm">
              {t.statement}
            </p>

            <div className="pt-2">
              <LanguageSwitcher currentLang={lang} variant="footer" />
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FFC451]">
              {t.navigationTitle}
            </h4>
            <ul className="space-y-2 text-sm text-[#F8F4EC]/80">
              <li>
                <a href="#about" className="hover:text-[#FFC451] transition-colors">
                  {nav.about}
                </a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-[#FFC451] transition-colors">
                  {nav.occasions}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#FFC451] transition-colors">
                  {nav.menu}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#FFC451] transition-colors">
                  {nav.whyUs}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFC451] transition-colors">
                  {nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#FFC451]">
              {t.contactTitle}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#F8F4EC]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFC451] shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFC451] shrink-0" />
                <a
                  href={`tel:${BRAND_CONFIG.phoneTel}`}
                  onClick={() => trackEvent('click_to_call', { source_location: 'footer' })}
                  className="hover:text-[#FFC451] transition-colors font-medium"
                >
                  {BRAND_CONFIG.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFC451] shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  onClick={() => trackEvent('click_email', { source_location: 'footer' })}
                  className="hover:text-[#FFC451] transition-colors font-medium"
                >
                  {BRAND_CONFIG.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFC451] shrink-0" />
                <span>{BRAND_CONFIG.openingHoursDisplay[lang]}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F4EC]/60">
          <p>
            © {currentYear} {BRAND_CONFIG.name}. {t.rightsReserved}
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => openLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.privacyPolicy}
            </button>
            <button
              type="button"
              onClick={() => openLegal('legal')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.legalMentions}
            </button>
            <button
              type="button"
              onClick={() => {
                const banner = document.getElementById('cookie-consent-banner');
                if (banner) banner.classList.remove('hidden');
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.cookieSettings}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Legal / Privacy Dialog Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        type={legalModalType}
        lang={lang}
        onClose={() => setLegalModalOpen(false)}
      />
    </footer>
  );
}

