import { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/fr/merci-demande-traiteur', '/en/catering-thank-you'],
      },
    ],
    sitemap: `${BRAND_CONFIG.siteUrl}/sitemap.xml`,
  };
}

