import type { MetadataRoute } from 'next';
import { mainRoutes, writingRoute } from '@/content/routes';
import { projects } from '@/content/projects';
import { articles } from '@/features/writing/articles';
import { getSiteOrigin } from '@/lib/site-origin';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production');
  const paths = [
    ...mainRoutes.map(({ href }) => href),
    ...projects.map(({ slug }) => '/projects/' + slug),
    ...(articles.length ? [writingRoute.href, ...articles.map(({ slug }) => writingRoute.href + '/' + slug)] : []),
  ];
  return paths.map((path) => ({ url: new URL(path, origin).href }));
}
