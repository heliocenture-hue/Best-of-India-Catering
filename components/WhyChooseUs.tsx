'use client';

import { Sparkles, HeartHandshake, Award, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { trackEvent } from '@/lib/analytics';

interface WhyChooseUsProps {
  lang: Language;
}

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const t = translations[lang].whyUs;

  const icons = [Flame, Award, HeartHandshake, ShieldCheck];

  const handleCtaClick = () => {
    trackEvent('cta_get_quote', {
      cta_location: 'why_choose_us',
      language: lang,
    });
    const formElem = document.getElementById('contact-form') || document.getElementById('hero-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#4D5720] text-white relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC451] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'NOTRE ENGAGEMENT' : 'OUR COMMITMENT'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8F4EC] tracking-tight leading-tight">
              {t.h2Main}{' '}
              <span className="font-editorial-italic text-[#FFC451] font-normal block sm:inline">
                {t.h2Italic}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#F8F4EC]/85 leading-relaxed">
              {t.subtitle}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleCtaClick}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-[#F15A34] text-white font-bold text-sm shadow-lg hover:bg-[#d84520] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>{t.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of 4 Culinary Differentiators (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.values.map((val, idx) => {
              const IconComp = icons[idx] || Sparkles;
              return (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm p-6 sm:p-7 rounded-xl border border-white/15 hover:border-[#FFC451]/50 hover:bg-white/[0.13] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FFC451]/20 border border-[#FFC451]/40 flex items-center justify-center text-[#FFC451] mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F8F4EC] mb-2 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-sm text-[#F8F4EC]/75 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

