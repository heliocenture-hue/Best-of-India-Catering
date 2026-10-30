'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, UtensilsCrossed, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import HeroLeadForm from './HeroLeadForm';
import { trackEvent } from '@/lib/analytics';

interface HeroCateringProps {
  lang: Language;
}

export default function HeroCatering({ lang }: HeroCateringProps) {
  const t = translations[lang].hero;

  const [h1Main, setH1Main] = useState(t.h1Main);
  const [h1Italic, setH1Italic] = useState(t.h1Italic);
  const [initialEventType, setInitialEventType] = useState('wedding');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const campaign = urlParams.get('campaign')?.toLowerCase();

    if (campaign === 'wedding' && t.campaignVariants?.wedding) {
      setH1Main(t.campaignVariants.wedding.main);
      setH1Italic(t.campaignVariants.wedding.italic);
      setInitialEventType('wedding');
    } else if (campaign === 'corporate' && t.campaignVariants?.corporate) {
      setH1Main(t.campaignVariants.corporate.main);
      setH1Italic(t.campaignVariants.corporate.italic);
      setInitialEventType('corporate');
    } else if (campaign === 'birthday' && t.campaignVariants?.birthday) {
      setH1Main(t.campaignVariants.birthday.main);
      setH1Italic(t.campaignVariants.birthday.italic);
      setInitialEventType('birthday');
    }
  }, [lang, t]);

  const handleMenuClick = () => {
    trackEvent('view_catering_menu', {
      source: 'hero_secondary_cta',
      language: lang,
    });
  };

  const keyPointers = [
    {
      icon: CheckCircle2,
      text: lang === 'fr' ? 'Spécialités du Chettinad & du Sud de l’Inde' : 'Chettinad & South Indian authentic cuisine',
    },
    {
      icon: ShieldCheck,
      text: lang === 'fr' ? 'Épices fraîchement moulues & recettes traditionnelles' : 'Freshly ground spices & heritage recipes',
    },
    {
      icon: MapPin,
      text: lang === 'fr' ? 'Traiteur sur-mesure à Paris & Île-de-France' : 'Tailored catering across Paris & Île-de-France',
    },
  ];

  return (
    <section className="relative bg-[#F8F4EC] pt-8 pb-14 sm:pb-20 md:py-20 lg:py-24 overflow-hidden border-b border-[#1D1D19]/5">
      {/* Subtle warm ambient lighting */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full bg-[#FFC451]/12 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[40vw] h-[40vw] rounded-full bg-[#4D5720]/5 blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (7 cols): Editorial Headline, Supporting Copy, Value Points, Action CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F15A34]" />
              <span>{t.eyebrow}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-extrabold text-[#1D1D19] tracking-tight leading-[1.08]">
              {h1Main}{' '}
              <span className="block font-editorial-italic text-[#4D5720] mt-1.5 font-normal">
                {h1Italic}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#64645E] leading-relaxed max-w-2xl">
              {t.body}
            </p>

            {/* Key Service Highlights */}
            <div className="pt-1 pb-1 space-y-2.5">
              {keyPointers.map((p, idx) => {
                const IconComp = p.icon;
                return (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-[#1D1D19]">
                    <IconComp className="w-4 h-4 text-[#4D5720] shrink-0" />
                    <span>{p.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Conversion CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#hero-form"
                onClick={() =>
                  trackEvent('cta_get_quote', {
                    cta_location: 'hero_primary',
                    language: lang,
                  })
                }
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[#F15A34] text-white text-base font-bold shadow-md hover:bg-[#d84520] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>{t.primaryCta}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#menu"
                onClick={handleMenuClick}
                className="inline-flex items-center justify-center px-6 py-4 rounded-lg bg-[#F2EBDD] text-[#1D1D19] border border-[#1D1D19]/15 text-sm sm:text-base font-semibold hover:bg-[#ebe2cf] transition-all cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 mr-2 text-[#4D5720]" />
                <span>{t.secondaryCta}</span>
              </a>
            </div>

            {/* Trust statement */}
            <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm text-[#64645E]">
              <span className="w-2 h-2 rounded-full bg-[#4D5720]" />
              <span>{t.trustStatement}</span>
            </div>
          </div>

          {/* Right Column (5 cols): Focused Hero Lead Form Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroLeadForm lang={lang} initialEventType={initialEventType} />
          </div>
        </div>
      </div>
    </section>
  );
}
