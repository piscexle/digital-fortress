import { appConfig } from '@/config/appConfig';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile'],
    },
    sitemap: `${appConfig.url}/sitemap.xml`,
    host: appConfig.url,
  };
}

/**
 * User-Agent: *
Allow: /

Host: https://thietkesata.com

Sitemap: https://thietkesata.com/sitemap.xml
 */
