'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Utensils, Info, ArrowRight, Leaf } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { trackEvent } from '@/lib/analytics';

interface CateringMenuProps {
  lang: Language;
}

export default function CateringMenu({ lang }: CateringMenuProps) {
  const t = translations[lang].menu;
  const [activeTab, setActiveTab] = useState<string>('starters');

  const handleDiscussClick = () => {
    trackEvent('cta_get_quote', {
      cta_location: 'menu_section_discuss',
      language: lang,
    });
    const formElem = document.getElementById('contact-form') || document.getElementById('hero-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeCategory = t.categories.find((c) => c.id === activeTab) || t.categories[0];

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#F8F4EC] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase mb-4">
            <Utensils className="w-3.5 h-3.5 text-[#F15A34]" />
            <span>{t.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D19] tracking-tight leading-tight">
            {t.h2Main}{' '}
            <span className="font-editorial-italic text-[#4D5720] font-normal">
              {t.h2Italic}
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64645E] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {t.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#4D5720] text-white shadow-md'
                  : 'bg-[#F2EBDD] text-[#1D1D19] border border-[#1D1D19]/10 hover:bg-[#ebe2cf]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Selected Category Feature Display (2-column editorial card) */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#1D1D19]/10 grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Visual Photograph (5 cols) */}
          <div
            className="lg:col-span-5 relative min-h-[300px] lg:min-h-[480px] bg-[#E3DDD0]"
            style={{ position: 'relative', width: '100%', minHeight: '340px', overflow: 'hidden' }}
          >
            <Image
              src={activeCategory.image}
              alt={activeCategory.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span className="text-xs uppercase font-bold tracking-widest text-[#FFC451]">
                Best of India Paris
              </span>
              <h3 className="text-xl font-bold mt-1 text-white">
                {activeCategory.name}
              </h3>
            </div>
          </div>

          {/* Dishes List & Descriptions (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-extrabold text-[#1D1D19]">
                  {activeCategory.name}
                </h3>
                <p className="text-sm text-[#64645E] mt-1.5 leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              {/* Dishes list */}
              <div className="divide-y divide-[#1D1D19]/10">
                {activeCategory.dishes.map((dish, idx) => (
                  <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#1D1D19]">
                          {dish.name}
                        </span>
                        {dish.isVeg ? (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200"
                            title={t.vegetarianBadge}
                          >
                            <Leaf className="w-2.5 h-2.5" />
                            <span>{t.vegetarianBadge}</span>
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center text-[10px] font-semibold text-[#8B3A2B] bg-[#FDF0ED] px-2 py-0.5 rounded-full border border-[#F5C7BD]"
                            title={t.nonVegetarianBadge}
                          >
                            {t.nonVegetarianBadge}
                          </span>
                        )}
                      </div>
                      {dish.note && (
                        <p className="text-xs text-[#64645E] italic">
                          {dish.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action inside card */}
            <div className="mt-8 pt-5 border-t border-[#1D1D19]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleDiscussClick}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#F15A34] text-white text-sm font-bold shadow-md hover:bg-[#d84520] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>{t.discussMenuBtn}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <div className="text-xs text-[#64645E] flex items-center gap-1.5 text-center sm:text-right">
                <Info className="w-4 h-4 text-[#4D5720] shrink-0" />
                <span>
                  {lang === 'fr'
                    ? 'Menus sur-mesure disponibles sur devis'
                    : 'Bespoke menus available upon consultation'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Menu Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#F2EBDD] border border-[#1D1D19]/10 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#4D5720] mt-0.5 shrink-0" />
          <p className="text-xs text-[#64645E] leading-relaxed">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

