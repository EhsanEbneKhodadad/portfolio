import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { articles } from '@/features/writing/articles';
import { getSiteOrigin } from '@/lib/site-origin';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production');
  const paths = [
    '/', '/about', '/projects', '/skills', '/experience', '/contact',
    ...projects.map(({ slug }) => '/projects/' + slug),
    ...(articles.length ? ['/writing', ...articles.map(({ slug }) => '/writing/' + slug)] : []),
  ];
  return paths.map((path) => ({ url: new URL(path, origin).href }));
}
