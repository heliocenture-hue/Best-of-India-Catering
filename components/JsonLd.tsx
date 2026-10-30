import { Language } from '@/lib/i18n/types';
import { BRAND_CONFIG } from '@/lib/config';

interface JsonLdProps {
  lang: Language;
}

export default function JsonLd({ lang }: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'FoodEstablishment'],
    name: BRAND_CONFIG.name,
    alternateName: 'BOI Paris',
    image: `${BRAND_CONFIG.siteUrl}/images/hero-catering-spread.webp`,
    url: `${BRAND_CONFIG.siteUrl}${BRAND_CONFIG.routes[lang].landing}`,
    telephone: BRAND_CONFIG.phoneTel,
    email: BRAND_CONFIG.email,
    servesCuisine: ['Indian', 'South Indian', 'Chettinad'],
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND_CONFIG.streetAddress,
      addressLocality: BRAND_CONFIG.city,
      postalCode: BRAND_CONFIG.postalCode,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BRAND_CONFIG.coordinates.latitude,
      longitude: BRAND_CONFIG.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:30',
        closes: '23:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'fr' ? 'Services Traiteur Indien' : 'Indian Catering Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Traiteur Mariage Indien Paris' : 'Indian Wedding Catering Paris',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Traiteur Événement Entreprise Paris' : 'Corporate Indian Catering Paris',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: lang === 'fr' ? 'Traiteur Réception & Fiançailles Paris' : 'Reception & Engagement Catering Paris',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

