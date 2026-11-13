import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { getSiteOrigin } from '@/lib/site-origin';

export function absoluteUrl(path: string) {
  return new URL(path, getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')).href;
}

export function isPreview() {
  return process.env.VERCEL_ENV === 'preview' || process.env.SITE_PREVIEW === '1';
}

export function pageMetadata(path: string, title: string | { absolute: string }, description: string, indexable = true): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = typeof title === 'string' ? title : title.absolute;
  const index = indexable && !isPreview();
  const image = { url: absoluteUrl('/social-preview.png'), width: 1200, height: 630, alt: profile.name + ' · ' + profile.role };
  return {
    title,
    description,
    alternates: indexable ? { canonical: url } : undefined,
    robots: { index, follow: !isPreview() },
    openGraph: { url, title: socialTitle, description, siteName: profile.name, type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title: socialTitle, description, images: [image.url] },
  };
}
