'use client';

import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';
import CateringLeadForm from './CateringLeadForm';
import LocationMap from './LocationMap';
import { trackEvent } from '@/lib/analytics';

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = translations[lang].contact;
  const whatsappMsg = encodeURIComponent(translations[lang].whatsapp.prefilledMessage);
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${whatsappMsg}`;

  const handlePhoneClick = () => {
    trackEvent('click_to_call', {
      source_location: 'contact_section_direct',
      language: lang,
    });
  };

  const handleEmailClick = () => {
    trackEvent('click_email', {
      source_location: 'contact_section_direct',
      language: lang,
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('click_whatsapp', {
      source_location: 'contact_section_card',
      language: lang,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F4EC] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5720]/10 border border-[#4D5720]/20 text-[#4D5720] text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F15A34]" />
            <span>{lang === 'fr' ? 'DEVIS & CONTACT' : 'QUOTATION & CONTACT'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D19] tracking-tight leading-tight">
            {t.h2Main}{' '}
            <span className="font-editorial-italic text-[#4D5720] font-normal block sm:inline">
              {t.h2Italic}
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#64645E] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Map (Left) + Full Enquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (5 cols): Direct Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Olive Green Branded Information Card */}
            <div className="bg-[#4D5720] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8F4EC]">
                    {t.directTitle}
                  </h3>
                  <p className="text-xs text-[#FFC451] uppercase tracking-wider font-semibold mt-1">
                    Best of India Paris 10e
                  </p>
                </div>

                <div className="space-y-4 text-sm text-[#F8F4EC]/90">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FFC451] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#FFC451] uppercase font-bold tracking-wider">
                        {t.addressLabel}
                      </div>
                      <p className="mt-0.5 font-medium leading-snug">
                        {BRAND_CONFIG.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#FFC451] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#FFC451] uppercase font-bold tracking-wider">
                        {t.phoneLabel}
                      </div>
                      <a
                        href={`tel:${BRAND_CONFIG.phoneTel}`}
                        onClick={handlePhoneClick}
                        className="mt-0.5 block font-bold text-base hover:text-[#FFC451] transition-colors"
                      >
                        {BRAND_CONFIG.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#FFC451] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#FFC451] uppercase font-bold tracking-wider">
                        {t.emailLabel}
                      </div>
                      <a
                        href={`mailto:${BRAND_CONFIG.email}`}
                        onClick={handleEmailClick}
                        className="mt-0.5 block font-medium hover:text-[#FFC451] transition-colors"
                      >
                        {BRAND_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#FFC451] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-[#FFC451] uppercase font-bold tracking-wider">
                        {t.hoursLabel}
                      </div>
                      <p className="mt-0.5 font-medium">
                        {BRAND_CONFIG.openingHoursDisplay[lang]}
                      </p>
                      <p className="text-[11px] text-white/60 mt-0.5 italic">
                        {t.hoursDisclaimer}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action Button */}
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#20ba59] transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>{t.whatsappChatBtn}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <LocationMap lang={lang} />
          </div>

          {/* Right Column (7 cols): Full Catering Lead Form */}
          <div className="lg:col-span-7">
            <CateringLeadForm lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

