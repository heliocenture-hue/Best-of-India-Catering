import type { Metadata } from 'next';
import LandingPageView from '@/components/LandingPageView';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: translations.fr.metadata.title,
  description: translations.fr.metadata.description,
  keywords: translations.fr.metadata.keywords,
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
    languages: {
      fr: `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
      en: `${BRAND_CONFIG.siteUrl}/en/indian-catering-paris`,
      'x-default': `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
    },
  },
  openGraph: {
    title: translations.fr.metadata.ogTitle,
    description: translations.fr.metadata.ogDescription,
    url: `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
    siteName: BRAND_CONFIG.name,
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/images/hero-catering-spread.webp`,
        width: 1200,
        height: 630,
        alt: 'Traiteur Indien Paris Best of India',
      },
    ],
  },
};

export default function FrenchLandingPage() {
  return <LandingPageView lang="fr" />;
}

