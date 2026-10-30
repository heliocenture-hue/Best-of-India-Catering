'use client';

import { Quote, Sparkles } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';

interface TestimonialsProps {
  lang: Language;
}

export default function Testimonials({ lang }: TestimonialsProps) {
  const t = translations[lang].testimonials;

  return (
    <section className="py-20 md:py-28 bg-[#F8F4EC] border-t border-b border-[#1D1D19]/10 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Trust Narrative (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F15A34]" />
              <span>{t.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D19] tracking-tight leading-tight">
              {t.h2Main}{' '}
              <span className="font-editorial-italic text-[#4D5720] font-normal block sm:inline">
                {t.h2Italic}
              </span>
            </h2>

            <p className="text-base text-[#64645E] leading-relaxed">
              {t.subtitle}
            </p>

            {/* Development / Compliance badge */}
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded bg-[#E3DDD0] text-[#64645E] text-[11px] font-medium tracking-wide">
                ℹ️ {t.sampleNotice}
              </span>
            </div>
          </div>

          {/* Right Column: 3 Editorial Testimonial Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-7 rounded-xl border border-[#1D1D19]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#FFC451] mb-3 opacity-90" />
                  <p className="text-sm sm:text-base text-[#1D1D19] leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1D1D19]/10">
                  <div className="text-xs font-bold text-[#1D1D19]">
                    {item.author}
                  </div>
                  <div className="text-[11px] text-[#64645E] mt-0.5">
                    {item.eventContext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

