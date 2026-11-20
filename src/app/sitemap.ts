import type { MetadataRoute } from 'next';
import { mainRoutes, writingRoute } from '@/content/routes';
import { articles } from '@/features/writing/articles';
import { projects } from '@/content/projects';
import { locales, localizedPath } from '@/lib/i18n';
import { languageAlternates, absoluteUrl, isPreview } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview()) return [];
  const paths = [
    ...mainRoutes.map(({ href }) => href),
    ...projects.map(({ slug }) => '/projects/' + slug),
    ...(articles.length ? [writingRoute.href] : []),
  ];
  return [
    ...paths.flatMap((path) => {
      const languages = languageAlternates(path);
      const translations = languages ? locales.map(locale => localizedPath(path, locale)) : [path];
      return translations.map(route => ({
        url: absoluteUrl(route),
        ...(languages ? { alternates: { languages } } : {}),
      }));
    }),
    ...articles.flatMap(({ slug, date }) => locales.map(locale => ({
      url: absoluteUrl(localizedPath(writingRoute.href + '/' + slug, locale)),
      lastModified: date,
      alternates: { languages: languageAlternates(writingRoute.href + '/' + slug) },
    }))),
  ];
}
