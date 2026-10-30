'use client';

// Centralized Google Analytics 4 & Google Ads conversion tracking helper

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type TrackingEventName =
  | 'generate_lead'
  | 'hero_form_submit'
  | 'contact_form_submit'
  | 'click_whatsapp'
  | 'click_to_call'
  | 'click_email'
  | 'cta_get_quote'
  | 'language_switch'
  | 'view_catering_menu';

export interface TrackingParams {
  lead_id?: string;
  event_type?: string;
  source_form?: 'hero' | 'contact';
  language?: string;
  cta_location?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

export function trackEvent(name: TrackingEventName, params: TrackingParams = {}) {
  if (typeof window === 'undefined') return;

  try {
    // Send to Google Tag Manager / GA4 gtag
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, {
        ...params,
        send_to: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      });

      // If generating a lead, also trigger Google Ads conversion if configured
      if (name === 'generate_lead' && process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID) {
        window.gtag('event', 'conversion', {
          send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
          transaction_id: params.lead_id,
        });
      }
    }

    // Push to dataLayer if present
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: name,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // Console logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${name}:`, params);
    }
  } catch (err) {
    console.warn('[Analytics Error]', err);
  }
}

// Helper to extract UTM parameters and click identifiers from URL
export function getAttributionData() {
  if (typeof window === 'undefined') {
    return {
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      utmTerm: '',
      gclid: '',
      gbraid: '',
      wbraid: '',
      referrer: '',
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  // Store in sessionStorage to preserve across subpage/hash navigation
  const source = urlParams.get('utm_source') || sessionStorage.getItem('boi_utm_source') || '';
  const medium = urlParams.get('utm_medium') || sessionStorage.getItem('boi_utm_medium') || '';
  const campaign = urlParams.get('utm_campaign') || sessionStorage.getItem('boi_utm_campaign') || '';
  const content = urlParams.get('utm_content') || sessionStorage.getItem('boi_utm_content') || '';
  const term = urlParams.get('utm_term') || sessionStorage.getItem('boi_utm_term') || '';
  const gclid = urlParams.get('gclid') || sessionStorage.getItem('boi_gclid') || '';
  const gbraid = urlParams.get('gbraid') || sessionStorage.getItem('boi_gbraid') || '';
  const wbraid = urlParams.get('wbraid') || sessionStorage.getItem('boi_wbraid') || '';

  if (urlParams.get('utm_source')) sessionStorage.setItem('boi_utm_source', source);
  if (urlParams.get('utm_medium')) sessionStorage.setItem('boi_utm_medium', medium);
  if (urlParams.get('utm_campaign')) sessionStorage.setItem('boi_utm_campaign', campaign);
  if (urlParams.get('utm_content')) sessionStorage.setItem('boi_utm_content', content);
  if (urlParams.get('utm_term')) sessionStorage.setItem('boi_utm_term', term);
  if (urlParams.get('gclid')) sessionStorage.setItem('boi_gclid', gclid);
  if (urlParams.get('gbraid')) sessionStorage.setItem('boi_gbraid', gbraid);
  if (urlParams.get('wbraid')) sessionStorage.setItem('boi_wbraid', wbraid);

  return {
    utmSource: source,
    utmMedium: medium,
    utmCampaign: campaign,
    utmContent: content,
    utmTerm: term,
    gclid: gclid,
    gbraid: gbraid,
    wbraid: wbraid,
    referrer: document.referrer || '',
  };
}

