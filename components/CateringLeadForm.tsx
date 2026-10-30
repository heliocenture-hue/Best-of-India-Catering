'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, Loader2, PhoneCall, ShieldCheck } from 'lucide-react';
import { Language } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { trackEvent, getAttributionData } from '@/lib/analytics';
import { BRAND_CONFIG } from '@/lib/config';

interface CateringLeadFormProps {
  lang: Language;
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

export default function CateringLeadForm({ lang }: CateringLeadFormProps) {
  const router = useRouter();
  const t = translations[lang].contact.form;
  const eventOptions = translations[lang].eventOptions;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [cateringPreference, setCateringPreference] = useState('both');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Listen for custom event when user clicks "Enquire Now" on an event card
  useEffect(() => {
    const handleSelectEvent = (e: CustomEvent<{ eventType: string }>) => {
      if (e.detail?.eventType) {
        setEventType(e.detail.eventType);
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

    if (!fullName.trim()) {
      setErrorMessage(lang === 'fr' ? 'Veuillez saisir votre nom complet.' : 'Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage(lang === 'fr' ? 'Veuillez renseigner une adresse e-mail valide.' : 'Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 6) {
      setErrorMessage(lang === 'fr' ? 'Veuillez saisir un numéro de téléphone valide.' : 'Please enter a valid phone number.');
      return;
    }
    if (!consentGiven) {
      setErrorMessage(
        lang === 'fr'
          ? 'Veuillez accepter le traitement de vos coordonnées pour recevoir votre devis.'
          : 'Please accept the data processing terms to submit your enquiry.'
      );
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
          email: email.trim(),
          phone: fullPhoneNumber,
          eventType,
          eventDate: eventDate || undefined,
          guestCount: guestCount || undefined,
          eventLocation: eventLocation.trim() || undefined,
          cateringPreference,
          message: message.trim() || undefined,
          sourceForm: 'contact',
          language: lang,
          landingPagePath: window.location.pathname,
          consentGiven,
          honeypot,
          ...attribution,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Submission failed');
      }

      // Trigger analytics
      trackEvent('generate_lead', {
        lead_id: data.leadId,
        source_form: 'contact',
        event_type: eventType,
        language: lang,
      });
      trackEvent('contact_form_submit', {
        lead_id: data.leadId,
        event_type: eventType,
        language: lang,
      });

      setSubmitted(true);

      // Redirect to thank you page
      setTimeout(() => {
        router.push(BRAND_CONFIG.routes[lang].thankYou);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error submitting form';
      setErrorMessage(
        lang === 'fr'
          ? 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous joindre directement.'
          : 'An error occurred during submission. Please try again or contact us directly.'
      );
      console.error('[ContactForm Submit Error]', msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="contact-form"
        className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-[#1D1D19]/10 text-center space-y-5"
      >
        <div className="w-16 h-16 rounded-full bg-[#4D5720]/10 flex items-center justify-center text-[#4D5720] mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-[#1D1D19]">
          {t.successTitle}
        </h3>
        <p className="text-sm text-[#64645E] max-w-md mx-auto leading-relaxed">
          {t.successMessage}
        </p>

        <div className="pt-2">
          <a
            href={`tel:${BRAND_CONFIG.phoneTel}`}
            onClick={() => trackEvent('click_to_call', { source_location: 'post_submission' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4D5720] text-white text-sm font-semibold hover:bg-[#3b4318] transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-[#FFC451]" />
            <span>{t.callDirectCta} : {BRAND_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      id="contact-form"
      className="bg-white rounded-2xl p-6 sm:p-8 md:p-9 shadow-xl border border-[#1D1D19]/10"
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D5720]/10 text-[#4D5720] text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F15A34]" />
          <span>{lang === 'fr' ? 'Devis Détaillé Traiteur' : 'Detailed Catering Quotation'}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D19] tracking-tight">
          {t.title}
        </h3>
        <p className="text-sm text-[#64645E] mt-1.5">
          {t.subtitle}
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Anti-spam honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="boi_verification_token"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* 1. Full Name */}
        <div>
          <label htmlFor="final-name" className="block text-xs font-bold text-[#1D1D19] mb-1">
            {t.fullNameLabel}
          </label>
          <input
            id="final-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={lang === 'fr' ? 'ex. Marie Dupont' : 'e.g. John Smith'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
          />
        </div>

        {/* 2 & 3. Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="final-email" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.emailLabel}
            </label>
            <input
              id="final-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@exemple.fr"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
            />
          </div>

          <div>
            <label htmlFor="final-phone" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.phoneLabel}
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                aria-label="Country Code"
                className="px-2 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/60 text-xs font-medium text-[#1D1D19] focus:bg-white focus:border-[#F15A34] transition-all shrink-0 cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                id="final-phone"
                type="tel"
                required
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="06 12 34 56 78"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] focus:ring-1 focus:ring-[#F15A34] transition-all"
              />
            </div>
          </div>
        </div>

        {/* 4 & 5. Event Type & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="final-event-type" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.eventTypeLabel}
            </label>
            <select
              id="final-event-type"
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

          <div>
            <label htmlFor="final-date" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.eventDateLabel}
            </label>
            <input
              id="final-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* 6 & 7. Guests & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="final-guests" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.guestsLabel}
            </label>
            <input
              id="final-guests"
              type="number"
              min="5"
              max="5000"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              placeholder="ex. 100"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] transition-all"
            />
          </div>

          <div>
            <label htmlFor="final-location" className="block text-xs font-bold text-[#1D1D19] mb-1">
              {t.locationLabel}
            </label>
            <input
              id="final-location"
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              placeholder={t.locationPlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] transition-all"
            />
          </div>
        </div>

        {/* 8. Catering Preference */}
        <div>
          <label htmlFor="final-preference" className="block text-xs font-bold text-[#1D1D19] mb-1">
            {t.dietaryLabel}
          </label>
          <select
            id="final-preference"
            value={cateringPreference}
            onChange={(e) => setCateringPreference(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] transition-all cursor-pointer"
          >
            <option value="both">{t.dietaryOptions.both}</option>
            <option value="vegetarian">{t.dietaryOptions.vegetarian}</option>
            <option value="nonVegetarian">{t.dietaryOptions.nonVegetarian}</option>
            <option value="notSure">{t.dietaryOptions.notSure}</option>
          </select>
        </div>

        {/* 9. Message */}
        <div>
          <label htmlFor="final-message" className="block text-xs font-bold text-[#1D1D19] mb-1">
            {t.messageLabel}
          </label>
          <textarea
            id="final-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePlaceholder}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#1D1D19]/20 bg-[#F8F4EC]/40 text-[#1D1D19] text-sm focus:bg-white focus:border-[#F15A34] transition-all resize-y"
          />
        </div>

        {/* 10. Privacy Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#F15A34] border-[#1D1D19]/20 focus:ring-[#F15A34] cursor-pointer"
            />
            <span className="text-xs text-[#64645E] leading-snug">
              {t.consentCheckbox}{' '}
              <span className="block text-[11px] text-[#64645E]/80 mt-0.5">
                {t.consentNotice}
              </span>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-lg bg-[#F15A34] text-white font-extrabold text-base tracking-wide shadow-lg hover:bg-[#d84520] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t.submittingBtn}</span>
            </>
          ) : (
            <span>{t.submitBtn}</span>
          )}
        </button>
      </form>
    </div>
  );
}

