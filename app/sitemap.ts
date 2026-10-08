import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';
import { articles } from '@/data/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const now = new Date();

  const core = ['', '/our-work', '/about', '/resources', '/contact', '/privacy', '/terms'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.6,
    }),
  );

  const servicePages = [
    ...services.map((s) => s.route),
    '/asset-management',
    '/brand-strategy',
    '/get-started',
  ].map(
    (route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }),
  );

  const articlePages = articles.map((a) => ({
    url: `${base}/resources/${a.slug}`,
    lastModified: new Date(a.updated + 'T00:00:00Z'),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...core, ...servicePages, ...articlePages];
}
