import type { Metadata } from 'next';
import LandingPageView from '@/components/LandingPageView';
import { translations } from '@/lib/i18n/translations';
import { BRAND_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: translations.en.metadata.title,
  description: translations.en.metadata.description,
  keywords: translations.en.metadata.keywords,
  alternates: {
    canonical: `${BRAND_CONFIG.siteUrl}/en/indian-catering-paris`,
    languages: {
      en: `${BRAND_CONFIG.siteUrl}/en/indian-catering-paris`,
      fr: `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
      'x-default': `${BRAND_CONFIG.siteUrl}/fr/traiteur-indien-paris`,
    },
  },
  openGraph: {
    title: translations.en.metadata.ogTitle,
    description: translations.en.metadata.ogDescription,
    url: `${BRAND_CONFIG.siteUrl}/en/indian-catering-paris`,
    siteName: BRAND_CONFIG.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BRAND_CONFIG.siteUrl}/images/hero-catering-spread.webp`,
        width: 1200,
        height: 630,
        alt: 'Authentic Indian Catering in Paris - Best of India',
      },
    ],
  },
};

export default function EnglishLandingPage() {
  return <LandingPageView lang="en" />;
}

