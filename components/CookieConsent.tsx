'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

interface CookieConsentProps {
  lang: Language;
}

export default function CookieConsent({ lang }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const t = translations[lang].cookieConsent;

  useEffect(() => {
    const consent = localStorage.getItem('boi_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateConsentMode = (granted: boolean) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    localStorage.setItem('boi_cookie_consent', 'granted');
    updateConsentMode(true);
    setVisible(false);
  };

  const handleRejectOptional = () => {
    localStorage.setItem('boi_cookie_consent', 'denied');
    updateConsentMode(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent-banner"
      className="fixed bottom-0 sm:bottom-4 inset-x-0 sm:inset-x-auto sm:right-4 sm:max-w-md z-50 p-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
      role="region"
      aria-label={t.title}
    >
      <div className="bg-[#1D1D19] text-[#F8F4EC] p-5 rounded-2xl shadow-2xl border border-white/10 relative">
        <button
          type="button"
          onClick={handleRejectOptional}
          className="absolute top-3 right-3 text-white/60 hover:text-white"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-[#FFC451]" />
          <h4 className="text-sm font-bold text-[#F8F4EC]">{t.title}</h4>
        </div>

        <p className="text-xs text-[#F8F4EC]/75 leading-relaxed mb-4">
          {t.message}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-lg bg-[#F15A34] text-white text-xs font-bold hover:bg-[#d84520] transition-colors"
          >
            {t.acceptAll}
          </button>
          <button
            type="button"
            onClick={handleRejectOptional}
            className="flex-1 py-2 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
          >
            {t.rejectOptional}
          </button>
        </div>
      </div>
    </div>
  );
}

