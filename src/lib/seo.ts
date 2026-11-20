import type { Metadata } from 'next';
import { identities } from '@/content/locales';
import { fa } from '@/content/fa';
import { getSiteOrigin } from '@/lib/site-origin';
import { locales, localizedPath, pathLocale, translationPath, type Locale } from '@/lib/i18n';

export function absoluteUrl(path: string) {
  return new URL(path, getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')).href;
}

export function isPreview() {
  return process.env.VERCEL_ENV === 'preview' || process.env.SITE_PREVIEW === '1';
}

export function languageAlternates(path: string) {
  const englishPath = translationPath(path);
  if (englishPath === null) return undefined;
  return {
    en: absoluteUrl(englishPath),
    fa: absoluteUrl(localizedPath(englishPath, 'fa')),
    tr: absoluteUrl(localizedPath(englishPath, 'tr')),
    'x-default': absoluteUrl(englishPath),
  };
}

export function personData(locale: Locale) {
  const identity = identities[locale];
  return {
    '@type': 'Person', '@id': absoluteUrl('/about#person'),
    name: identity.name,
    alternateName: locale === 'fa' ? identities.en.name : fa.name,
    description: identity.bio,
    url: absoluteUrl(localizedPath('/about', locale)),
    jobTitle: identity.role,
    sameAs: identities.en.social.map(({ href }) => href),
  };
}

export function websiteData(locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'WebSite', '@id': absoluteUrl('/#website'),
    name: identities[locale].name,
    alternateName: locale === 'fa' ? identities.en.name : fa.name,
    url: absoluteUrl('/'), inLanguage: [...locales],
    about: { '@id': absoluteUrl('/about#person') },
  };
}

export function pageMetadata(path: string, title: string | { absolute: string }, description: string, indexable = true): Metadata {
  const locale = pathLocale(path);
  const openGraphLocales = { en: 'en_US', fa: 'fa_IR', tr: 'tr_TR' };
  const url = absoluteUrl(path);
  const socialTitle = typeof title === 'string' ? title : title.absolute;
  const index = indexable && !isPreview();
  const name = identities[locale].name;
  const image = { url: absoluteUrl('/social-preview.png'), width: 1200, height: 630, alt: name };
  return {
    title,
    description,
    alternates: indexable ? { canonical: url, languages: languageAlternates(path) } : undefined,
    robots: { index, follow: !isPreview() },
    openGraph: {
      url, title: socialTitle, description, siteName: name, type: 'website', images: [image],
      locale: openGraphLocales[locale],
      alternateLocale: languageAlternates(path) ? locales.filter(other => other !== locale).map(other => openGraphLocales[other]) : undefined,
    },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [image.url] },
  };
}
