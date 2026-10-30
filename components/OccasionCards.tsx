'use client';

import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { trackEvent } from '@/lib/analytics';

interface OccasionCardsProps {
  lang: Language;
}

export default function OccasionCards({ lang }: OccasionCardsProps) {
  const t = translations[lang].occasions;

  const handleCardClick = (eventTypeKey: string, occasionTitle: string) => {
    trackEvent('cta_get_quote', {
      cta_location: 'occasion_card',
      occasion: occasionTitle,
      event_type: eventTypeKey,
      language: lang,
    });

    // Dispatch custom event to notify forms to select this event type
    const event = new CustomEvent('boi_select_event', {
      detail: { eventType: eventTypeKey },
    });
    window.dispatchEvent(event);

    // Scroll smoothly to contact form or hero form
    const target = document.getElementById('contact-form') || document.getElementById('hero-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="occasions" className="py-20 md:py-28 bg-[#F2EBDD] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#F15A34]" />
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

        {/* 6 Image-Led Occasion Cards (3x2 Desktop Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.cards.map((card) => (
            <div
              key={card.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#1D1D19]/10 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(card.eventTypeKey, card.title)}
            >
              {/* Image Container with Subtle Zoom on Hover */}
              <div
                className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#E3DDD0]"
                style={{ position: 'relative', width: '100%', height: '256px', overflow: 'hidden' }}
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[#1D1D19]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wider">
                  {card.tag}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-[#1D1D19] group-hover:text-[#F15A34] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#64645E] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-5 pt-4 border-t border-[#1D1D19]/5 flex items-center text-sm font-bold text-[#F15A34] group-hover:translate-x-1 transition-all duration-200">
                  <span>{t.enquireCta}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section End Custom CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#1D1D19]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-[#1D1D19]">
              {t.customPlanningTitle}
            </h3>
            <p className="text-sm text-[#64645E]">
              {lang === 'fr'
                ? 'Mariages mixtes, réceptions d’ambassade, galas et événements associatifs sur mesure.'
                : 'Custom menus for diplomatic galas, multicultural weddings, and community celebrations.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleCardClick('other', 'Custom Event')}
            className="shrink-0 px-6 py-3 rounded-lg bg-[#4D5720] text-white font-bold text-sm hover:bg-[#3b4318] transition-colors cursor-pointer"
          >
            {t.customPlanningBtn}
          </button>
        </div>
      </div>
    </section>
  );
}

