import type { MetadataRoute } from 'next';
import { mainRoutes, writingRoute } from '@/content/routes';
import { projects } from '@/content/projects';
import { articles } from '@/features/writing/articles';
import { absoluteUrl, isPreview } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview()) return [];
  const paths = [
    ...mainRoutes.map(({ href }) => href),
    ...projects.map(({ slug }) => '/projects/' + slug),
    ...(articles.length ? [writingRoute.href] : []),
  ];
  return [
    ...paths.map((path) => ({ url: absoluteUrl(path) })),
    ...articles.map(({ slug, date }) => ({ url: absoluteUrl(writingRoute.href + '/' + slug), lastModified: date })),
  ];
}
