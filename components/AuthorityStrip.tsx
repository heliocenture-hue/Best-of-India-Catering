'use client';

import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';

interface AuthorityStripProps {
  lang: Language;
}

export default function AuthorityStrip({ lang }: AuthorityStripProps) {
  const t = translations[lang].authority;
  const cfg = BRAND_CONFIG.authorityMetrics;

  const metrics = [
    {
      value: cfg.years || t.metric1.value,
      label: t.metric1.label,
      sub: t.metric1.sub,
    },
    {
      value: cfg.clients || t.metric2.value,
      label: t.metric2.label,
      sub: t.metric2.sub,
    },
    {
      value: cfg.peopleServed || t.metric3.value,
      label: t.metric3.label,
      sub: t.metric3.sub,
    },
  ];

  return (
    <section className="bg-[#4D5720] text-white py-12 md:py-16 relative overflow-hidden">
      {/* Subtle organic background texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #FFC451 1px, transparent 1px), radial-gradient(circle at 80% 50%, #FFC451 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-4 ${
                index !== 0 ? 'pt-6 md:pt-0' : ''
              }`}
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#FFC451] tracking-tight font-sans">
                {item.value}
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#F8F4EC] mt-2">
                {item.label}
              </div>
              <p className="text-xs sm:text-sm text-[#F8F4EC]/75 mt-1 max-w-xs leading-relaxed">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Small verification note for compliance */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-white/50 italic">
            * {t.verificationNotice}
          </p>
        </div>
      </div>
    </section>
  );
}

