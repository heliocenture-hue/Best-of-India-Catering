'use client';

import { Phone, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/analytics';

interface MobileStickyCTAProps {
  lang: Language;
}

export default function MobileStickyCTA({ lang }: MobileStickyCTAProps) {
  const t = translations[lang].mobileBar;

  const handleQuoteClick = () => {
    trackEvent('cta_get_quote', {
      cta_location: 'mobile_sticky_bar',
      language: lang,
    });
    const formElem = document.getElementById('hero-form') || document.getElementById('contact-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCallClick = () => {
    trackEvent('click_to_call', {
      source_location: 'mobile_sticky_bar',
      language: lang,
    });
  };

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#1D1D19]/10 px-4 py-2.5 shadow-2xl pb-safe">
      <div className="flex items-center gap-2.5">
        {/* Call button */}
        <a
          href={`tel:${BRAND_CONFIG.phoneTel}`}
          onClick={handleCallClick}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-lg bg-[#4D5720] text-white text-xs font-bold active:scale-[0.98] transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-[#FFC451]" />
          <span>{t.callBtn}</span>
        </a>

        {/* Primary Quote button */}
        <button
          type="button"
          onClick={handleQuoteClick}
          className="flex-[2] inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-[#F15A34] text-white text-xs font-extrabold tracking-wide shadow-md active:scale-[0.98] transition-transform cursor-pointer"
        >
          <span>{t.quoteBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

