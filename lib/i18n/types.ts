export type Language = 'fr' | 'en';

export interface TranslationDictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string;
  };
  nav: {
    about: string;
    occasions: string;
    menu: string;
    whyUs: string;
    contact: string;
    ctaQuote: string;
    switchLangAria: string;
    openMenuAria: string;
    closeMenuAria: string;
  };
  hero: {
    eyebrow: string;
    h1Main: string;
    h1Italic: string;
    campaignVariants?: {
      wedding: { main: string; italic: string };
      corporate: { main: string; italic: string };
      birthday: { main: string; italic: string };
    };
    body: string;
    primaryCta: string;
    secondaryCta: string;
    trustStatement: string;
    form: {
      title: string;
      subtitle: string;
      fullNameLabel: string;
      fullNamePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      eventTypeLabel: string;
      eventDateLabel: string;
      guestsLabel: string;
      guestsPlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      privacyNotice: string;
      privacyNoticeLink: string;
    };
  };
  eventOptions: {
    wedding: string;
    corporate: string;
    engagement: string;
    babyShower: string;
    reception: string;
    birthday: string;
    other: string;
  };
  authority: {
    metric1: { value: string; label: string; sub: string };
    metric2: { value: string; label: string; sub: string };
    metric3: { value: string; label: string; sub: string };
    verificationNotice: string;
  };
  about: {
    eyebrow: string;
    h2Main: string;
    h2Italic: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    highlights: Array<{ title: string; desc: string }>;
  };
  occasions: {
    eyebrow: string;
    h2Main: string;
    h2Italic: string;
    subtitle: string;
    enquireCta: string;
    customPlanningTitle: string;
    customPlanningBtn: string;
    cards: Array<{
      id: string;
      eventTypeKey: string;
      title: string;
      description: string;
      image: string;
      imageAlt: string;
      tag: string;
    }>;
  };
  testimonials: {
    eyebrow: string;
    h2Main: string;
    h2Italic: string;
    subtitle: string;
    sampleNotice: string;
    items: Array<{
      quote: string;
      author: string;
      eventContext: string;
    }>;
  };
  menu: {
    eyebrow: string;
    h2Main: string;
    h2Italic: string;
    subtitle: string;
    disclaimer: string;
    discussMenuBtn: string;
    vegetarianBadge: string;
    nonVegetarianBadge: string;
    categories: Array<{
      id: string;
      name: string;
      description: string;
      image: string;
      imageAlt: string;
      dishes: Array<{ name: string; isVeg: boolean; note?: string }>;
    }>;
  };
  whyUs: {
    h2Main: string;
    h2Italic: string;
    subtitle: string;
    ctaBtn: string;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    h2Main: string;
    h2Italic: string;
    subtitle: string;
    directTitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursDisclaimer: string;
    mapDirectionsBtn: string;
    preferCallTitle: string;
    whatsappChatBtn: string;
    form: {
      title: string;
      subtitle: string;
      fullNameLabel: string;
      emailLabel: string;
      phoneLabel: string;
      eventTypeLabel: string;
      eventDateLabel: string;
      guestsLabel: string;
      locationLabel: string;
      locationPlaceholder: string;
      dietaryLabel: string;
      dietaryOptions: {
        vegetarian: string;
        nonVegetarian: string;
        both: string;
        notSure: string;
      };
      messageLabel: string;
      messagePlaceholder: string;
      consentCheckbox: string;
      consentNotice: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successMessage: string;
      callDirectCta: string;
    };
  };
  footer: {
    statement: string;
    navigationTitle: string;
    contactTitle: string;
    openingHoursTitle: string;
    rightsReserved: string;
    privacyPolicy: string;
    legalMentions: string;
    cookieSettings: string;
  };
  whatsapp: {
    floatingTooltip: string;
    prefilledMessage: string;
  };
  mobileBar: {
    quoteBtn: string;
    callBtn: string;
  };
  backToTop: {
    ariaLabel: string;
  };
  cookieConsent: {
    title: string;
    message: string;
    acceptAll: string;
    rejectOptional: string;
    settings: string;
  };
  thankYou: {
    title: string;
    subtitle: string;
    body: string;
    phonePrompt: string;
    backHomeBtn: string;
  };
}

