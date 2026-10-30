'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import { trackEvent } from '@/lib/analytics';

interface FloatingWhatsAppProps {
  lang: Language;
}

export default function FloatingWhatsApp({ lang }: FloatingWhatsAppProps) {
  const [isHovered, setIsHovered] = useState(false);
  const t = translations[lang].whatsapp;

  const prefilled = encodeURIComponent(t.prefilledMessage);
  const waUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${prefilled}`;

  const handleClick = () => {
    trackEvent('click_whatsapp', {
      source_location: 'floating_button',
      language: lang,
    });
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-40 flex items-center group">
      {/* Tooltip on hover/focus */}
      <div
        className={`hidden md:block absolute right-16 bg-[#1D1D19] text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 pointer-events-none ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        {t.floatingTooltip}
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1D1D19] rotate-45" />
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={t.floatingTooltip}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 ring-4 ring-white/50 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
      </a>
    </div>
  );
}

