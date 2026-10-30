'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { trackEvent, getAttributionData } from '@/lib/analytics';
import { BRAND_CONFIG } from '@/lib/config';

interface HeroLeadFormProps {
  lang: Language;
  initialEventType?: string;
  onSuccessCustom?: () => void;
}

const COUNTRY_CODES = [
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

export default function HeroLeadForm({ lang, initialEventType = '' }: HeroLeadFormProps) {
  const router = useRouter();
  const t = translations[lang].hero.form;
  const eventOptions = translations[lang].eventOptions;

  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(initialEventType || 'wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for custom event when user clicks "Enquire Now" on an event card
  useEffect(() => {
    const handleSelectEvent = (e: CustomEvent<{ eventType: string }>) => {
      if (e.detail?.eventType) {
        setEventType(e.detail.eventType);
        const formElem = document.getElementById('hero-form');
        if (formElem) {
          formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    window.addEventListener('boi_select_event' as unknown as keyof WindowEventMap, handleSelectEvent as EventListener);
    return () => {
      window.removeEventListener('boi_select_event' as unknown as keyof WindowEventMap, handleSelectEvent as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!fullName.trim()) {
      setErrorMessage(lang === 'fr' ? 'Veuillez renseigner votre nom complet.' : 'Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 6) {
      setErrorMessage(lang === 'fr' ? 'Veuillez saisir un numéro de téléphone valide.' : 'Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    const attribution = getAttributionData();

    try {
      const fullPhoneNumber = `${countryCode} ${phone}`.trim();
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone: fullPhoneNumber,
          email: email.trim() || undefined,
          eventType,
          eventDate: eventDate || undefined,
          guestCount: guestCount || undefined,
          sourceForm: 'hero',
          language: lang,
          landingPagePath: window.location.pathname,
          consentGiven: true,
          honeypot,
          ...attribution,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      // Track successful lead conversion
      trackEvent('generate_lead', {
        lead_id: data.leadId,
        source_form: 'hero',
        event_type: eventType,
        language: lang,
      });
      trackEvent('hero_form_submit', {
        lead_id: data.leadId,
        event_type: eventType,
        language: lang,
      });

      setSubmitted(true);

      // Redirect to localized thank-you page after 1.5 seconds
      setTimeout(() => {
        router.push(BRAND_CONFIG.routes[lang].thankYou);
      }, 1400);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting form';
      setErrorMessage(
        lang === 'fr'
          ? 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous joindre par téléphone.'
          : 'An error occurred during submission. Please try again or call us directly.'
      );
      console.error('[HeroForm Submit Error]', msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="hero-form"
        className="w-full bg-white rounded-xl shadow-lg border border-[#1D1D19]/10 p-6 md:p-8 flex flex-col items-center justify-center text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-[#4D5720]/10 flex items-center justify-center text-[#4D5720]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#1D1D19]">
          {lang === 'fr' ? 'Merci ! Votre demande est reçue.' : 'Thank You! Enquiry Received.'}
        </h3>
        <p className="text-sm text-[#64645E] max-w-sm">
          {lang === 'fr'
            ? 'Nous préparons votre devis traiteur personnalisé. Vous allez être redirigé vers la confirmation...'
            : 'We are preparing your personalized proposal. Redirecting to confirmation...'}
        </p>
      </div>
    );
  }

  return (
    <div
      id="hero-form"
      className="w-full bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-[#1D1D19]/10 p-5 sm:p-6 md:p-7 relative transition-all"
    >
      {/* Visual top indicator */}
      <div className="absolute -top-3 left-6 bg-[#4D5720] text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#FFC451]" />
        <span>{lang === 'fr' ? 'Devis Gratuit & Sans Engagement' : 'Free Catering Quotation'}</span>
      </div>

      <div className="mb-5 pt-1">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D19] tracking-tight">
          {t.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64645E] mt-1 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="boi_verification_code"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="hero-name" className="block text-xs font-semibold text-[#1D1D19] mb-1">
            {t.fullNameLabel}
          </label>
          <input
            id="hero-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t.fullNamePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm placeholder:text-[#64645E]/60 focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
          />
        </div>

        {/* Phone with Country Code */}
        <div>
          <label htmlFor="hero-phone" className="block text-xs font-semibold text-[#1D1D19] mb-1">
            {t.phoneLabel}
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              aria-label="Country Code"
              className="px-2.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/60 text-xs font-medium text-[#1D1D19] focus:bg-white focus:border-[#F15A34] transition-all shrink-0 cursor-pointer"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              id="hero-phone"
              type="tel"
              required
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm placeholder:text-[#64645E]/60 focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
            />
          </div>
        </div>

        {/* Email & Event Type 2-col on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-email" className="block text-xs font-semibold text-[#1D1D19] mb-1">
              {t.emailLabel}
            </label>
            <input
              id="hero-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm placeholder:text-[#64645E]/60 focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
            />
          </div>

          <div>
            <label htmlFor="hero-event-type" className="block text-xs font-semibold text-[#1D1D19] mb-1">
              {t.eventTypeLabel}
            </label>
            <select
              id="hero-event-type"
              required
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all cursor-pointer"
            >
              <option value="wedding">{eventOptions.wedding}</option>
              <option value="corporate">{eventOptions.corporate}</option>
              <option value="engagement">{eventOptions.engagement}</option>
              <option value="babyShower">{eventOptions.babyShower}</option>
              <option value="reception">{eventOptions.reception}</option>
              <option value="birthday">{eventOptions.birthday}</option>
              <option value="other">{eventOptions.other}</option>
            </select>
          </div>
        </div>

        {/* Event Date & Guest count */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-date" className="block text-xs font-semibold text-[#1D1D19] mb-1">
              {t.eventDateLabel}
            </label>
            <input
              id="hero-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-xs sm:text-sm focus:bg-white focus:border-[#F15A34] transition-all cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="hero-guests" className="block text-xs font-semibold text-[#1D1D19] mb-1">
              {t.guestsLabel}
            </label>
            <input
              id="hero-guests"
              type="number"
              min="5"
              max="5000"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder={t.guestsPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm placeholder:text-[#64645E]/60 focus:bg-white focus:border-[#F15A34] transition-all"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3.5 px-4 rounded-lg bg-[#F15A34] text-white font-bold text-sm tracking-wide shadow-md hover:bg-[#d84520] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.submittingBtn}</span>
            </>
          ) : (
            <span>{t.submitBtn}</span>
          )}
        </button>

        {/* Privacy Note */}
        <div className="pt-1 text-center">
          <p className="text-[11px] text-[#64645E] leading-tight">
            {t.privacyNotice}{' '}
            <a
              href="#contact"
              className="underline hover:text-[#1D1D19] transition-colors"
            >
              {lang === 'fr' ? 'RGPD conforme' : 'GDPR compliant'}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

