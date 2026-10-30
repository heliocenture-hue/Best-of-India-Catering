'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, ArrowLeft, Mail, Clock } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import LanguageSwitcher from './LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';

interface ThankYouViewProps {
  lang: Language;
}

export default function ThankYouView({ lang }: ThankYouViewProps) {
  const t = translations[lang].thankYou;

  useEffect(() => {
    // Make sure lead conversion was logged
    trackEvent('generate_lead', {
      source_location: 'thank_you_view',
      language: lang,
    });
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EC] text-[#1D1D19]">
      {/* Minimal Header */}
      <header className="py-4 border-b border-[#1D1D19]/10 bg-[#F8F4EC]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href={BRAND_CONFIG.routes[lang].landing} className="relative h-12 w-44">
            <Image
              src="/images/boi-logo.png"
              alt="Best of India — Restaurant Indien Paris"
              fill
              priority
              className="object-contain object-left"
            />
          </Link>
          <LanguageSwitcher currentLang={lang} variant="header" />
        </div>
      </header>

      {/* Main Thank You Card */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-[#1D1D19]/10 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#4D5720]/10 flex items-center justify-center text-[#4D5720] mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D19] tracking-tight">
              {t.title}
            </h1>
            <p className="text-lg font-bold text-[#4D5720]">
              {t.subtitle}
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#64645E] leading-relaxed">
            {t.body}
          </p>

          {/* Urgent Phone Prompt */}
          <div className="p-5 rounded-xl bg-[#F2EBDD] border border-[#1D1D19]/10 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1D1D19]">
              {t.phonePrompt}
            </p>
            <a
              href={`tel:${BRAND_CONFIG.phoneTel}`}
              onClick={() => trackEvent('click_to_call', { source_location: 'thank_you_direct' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#4D5720] text-white font-bold text-sm hover:bg-[#3b4318] transition-colors w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#FFC451]" />
              <span>{BRAND_CONFIG.phoneDisplay}</span>
            </a>
          </div>

          {/* Back Home Button */}
          <div className="pt-2">
            <Link
              href={BRAND_CONFIG.routes[lang].landing}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#F15A34] hover:text-[#d84520] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backHomeBtn}</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-[#1D1D19]/10 bg-[#F2EBDD] text-center text-xs text-[#64645E]">
        <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. {BRAND_CONFIG.address}</p>
      </footer>
    </div>
  );
}

