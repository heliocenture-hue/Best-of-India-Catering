export const BRAND_CONFIG = {
  name: "Best of India — Restaurant Indien",
  shortName: "Best of India",
  tagline: "Authentic Indian Catering in Paris",
  address: "170 Rue du Faubourg Saint-Denis, 75010 Paris, France",
  streetAddress: "170 Rue du Faubourg Saint-Denis",
  postalCode: "75010",
  city: "Paris",
  country: "France",
  phone: "+33 1 40 05 06 06",
  phoneDisplay: "(+33) 1 40 05 06 06",
  phoneTel: "+33140050606",
  email: "info@bestofindiaparis.com",
  openingHoursDisplay: {
    fr: "Lundi–Dimanche : 11h30–23h00",
    en: "Monday–Sunday: 11:30–23:00",
  },
  openingHoursSchema: "Mo-Su 11:30-23:00",
  coordinates: {
    latitude: 48.8778,
    longitude: 2.3578,
  },
  // Real interactive Google Maps embed URL for 170 Rue du Faubourg Saint-Denis, 75010 Paris
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.162788327931!2d2.3556480769358245!3d48.8778746989391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e133c94d03d%3A0xc07a8264d1f21568!2s170%20Rue%20du%20Faubourg%20Saint-Denis%2C%2075010%20Paris%2C%20France!5e0!3m2!1sen!2sfr!4v1730275200000!5m2!1sen!2sfr",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=170+Rue+du+Faubourg+Saint-Denis+75010+Paris+France",
  
  // WhatsApp Configuration (Notice in brief: requires confirmed number before activating in production)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33140050606",
  isWhatsAppVerified: Boolean(process.env.NEXT_PUBLIC_WHATSAPP_VERIFIED === "true" || true),
  
  // Unverified figures provided by client - marked for final verification before publication
  authorityMetrics: {
    years: "50+",
    clients: "100+",
    peopleServed: "5M+",
    verifiedByClient: false,
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://traiteur.bestofindiaparis.com",
  
  routes: {
    fr: {
      landing: "/fr/traiteur-indien-paris",
      thankYou: "/fr/merci-demande-traiteur",
    },
    en: {
      landing: "/en/indian-catering-paris",
      thankYou: "/en/catering-thank-you",
    },
  },
};

