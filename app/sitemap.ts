import { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND_CONFIG.siteUrl;

  return [
    {
      url: `${baseUrl}/fr/traiteur-indien-paris`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/traiteur-indien-paris`,
          en: `${baseUrl}/en/indian-catering-paris`,
        },
      },
    },
    {
      url: `${baseUrl}/en/indian-catering-paris`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/traiteur-indien-paris`,
          en: `${baseUrl}/en/indian-catering-paris`,
        },
      },
    },
  ];
}

