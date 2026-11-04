export interface ServiceFormat {
  id: string;
  en: string;
  fr: string;
}

export interface LegalDetails {
  entityName: string;
  siret: string;
  director: string;
  host: string;
  hostAddress: string;
}

export interface SiteConfig {
  BRAND: string;
  PHONE_DISPLAY: string;
  PHONE_LINK: string;
  EMAIL: string;
  ADDRESS: string;
  HOURS_EN: string;
  HOURS_FR: string;
  INSTAGRAM: string;
  FACEBOOK: string;
  WEBSITE: string;
  MAP_EMBED: string;
  WHATSAPP_NUMBER: string;
  FORM_ENDPOINT: string;
  SERVICE_AREA_EN: string;
  SERVICE_AREA_FR: string;
  REPLY_TIME_EN: string;
  REPLY_TIME_FR: string;
  SERVICE_FORMATS: ServiceFormat[];
  LEGAL_DETAILS: LegalDetails;
}

export const CONFIG: SiteConfig = {
  BRAND: "Best of India",
  PHONE_DISPLAY: "+33 1 40 05 06 06",
  PHONE_LINK: "+33140050606",
  EMAIL: "info@bestofindiaparis.com",
  ADDRESS: "170 Rue du Faubourg Saint-Denis, 75010 Paris, France",
  HOURS_EN: "Monday to Sunday, 11:30 am to 11:00 pm",
  HOURS_FR: "Lundi au dimanche, 11h30 à 23h",
  INSTAGRAM: "https://www.instagram.com/bestofindia_paris/",
  FACEBOOK: "https://www.facebook.com/Restaurant.indien.bestofindia.paris",
  WEBSITE: "https://bestofindiaparis.com/en/",
  MAP_EMBED: "https://maps.google.com/maps?q=Best%20of%20India%2C%20170%20Rue%20du%20Faubourg%20Saint-Denis%2C%2075010%20Paris&t=m&z=17&output=embed&iwloc=near",

  // TODO [CONFIRM: number in international format, digits only]
  WHATSAPP_NUMBER: "33140050606",

  // TODO [CONFIRM: Web3Forms or Formspree endpoint that delivers to info@bestofindiaparis.com]
  FORM_ENDPOINT: "https://api.web3forms.com/submit",

  // TODO [CONFIRM: e.g. Paris and the Île-de-France region]
  SERVICE_AREA_EN: "Paris and the Île-de-France region",

  // TODO [CONFIRM: e.g. Paris et toute l'Île-de-France]
  SERVICE_AREA_FR: "Paris et toute l'Île-de-France",

  // TODO [CONFIRM: e.g. within 24 hours]
  REPLY_TIME_EN: "within 24 hours",

  // TODO [CONFIRM: e.g. sous 24 heures]
  REPLY_TIME_FR: "sous 24 heures",

  // TODO [CONFIRM: keep only what BOI offers: buffet, plated meal, canapés, live food stations, delivery only, service staff]
  SERVICE_FORMATS: [
    { id: "buffet", en: "Buffet", fr: "Buffet" },
    { id: "plated", en: "Plated meal", fr: "Service à l'assiette" },
    { id: "canapes", en: "Canapés", fr: "Canapés" },
    { id: "live_stations", en: "Live food stations", fr: "Animations culinaires" },
    { id: "delivery", en: "Delivery only", fr: "Livraison seule" },
    { id: "service_staff", en: "Service staff", fr: "Personnel de service" },
  ],

  // TODO [CONFIRM: legal entity name, SIRET, publication director, host]
  LEGAL_DETAILS: {
    entityName: "BEST OF INDIA",
    siret: "[CONFIRM: SIRET Number]",
    director: "Direction Best of India",
    host: "Vercel Inc. / Hostinger",
    hostAddress: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
  },
};
