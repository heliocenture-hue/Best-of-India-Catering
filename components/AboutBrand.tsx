'use client';

import Image from 'next/image';
import { ChefHat, Flame, Check } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

interface AboutBrandProps {
  lang: Language;
}

export default function AboutBrand({ lang }: AboutBrandProps) {
  const t = translations[lang].about;

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8F4EC] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Catering Spread Photography (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative w-full h-[440px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-[#1D1D19]/10"
              style={{ position: 'relative', width: '100%', minHeight: '420px', overflow: 'hidden' }}
            >
              <Image
                src="/images/hero-catering-spread.webp"
                alt="Buffet traiteur indien Best of India Paris - Chafing dishes biryani et currys"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-semibold block text-sm">
                  {lang === 'fr'
                    ? 'Présentation raffinée en chafing dishes inox & cuivre'
                    : 'Refined presentation in stainless & copper chafing platters'}
                </span>
                <span className="text-white/80 text-[11px]">
                  {lang === 'fr'
                    ? 'Service traiteur indien chaud pour réceptions & mariages à Paris'
                    : 'Hot Indian catering service for receptions & weddings in Paris'}
                </span>
              </div>
            </div>

            {/* Overlapping secondary Chettinad culinary badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 w-52 sm:w-60 bg-[#4D5720] text-white p-4 rounded-xl shadow-xl border border-[#FFC451]/30 hidden sm:block">
              <div className="flex items-center gap-2 mb-1.5">
                <ChefHat className="w-5 h-5 text-[#FFC451]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFC451]">
                  Chettinad & Sud de l’Inde
                </span>
              </div>
              <p className="text-xs text-white/90 leading-snug">
                {lang === 'fr'
                  ? 'Épices fraîchement moulues & recettes traditionnelles à Paris'
                  : 'Freshly ground spices & heritage South Indian recipes in Paris'}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Storytelling & Brand Highlights (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-[#F15A34]" />
              <span>{t.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D19] tracking-tight leading-tight">
              {t.h2Main}{' '}
              <span className="font-editorial-italic text-[#4D5720] font-normal block sm:inline">
                {t.h2Italic}
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#64645E] leading-relaxed">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
              <p className="font-medium text-[#1D1D19]">{t.p4}</p>
            </div>

            {/* 3 Brand Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {t.highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-[#F2EBDD] p-4 rounded-xl border border-[#1D1D19]/10 hover:border-[#4D5720]/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#4D5720] text-[#FFC451] flex items-center justify-center mb-3">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1D1D19] leading-snug mb-1">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#64645E] leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
