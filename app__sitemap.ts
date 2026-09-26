import type { MetadataRoute } from 'next';
import { getServiceSlugs } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/doctors',
    '/services',
    '/before-after',
    '/testimonials',
    '/appointment',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const serviceSlugs = await getServiceSlugs();
  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${siteConfig.siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
