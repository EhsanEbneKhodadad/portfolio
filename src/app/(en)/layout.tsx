import type { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';
import { profile } from '@/content/profile';
import { getSiteOrigin } from '@/lib/site-origin';
import '../globals.css';
export const metadata: Metadata = {
  title: { default: profile.name + ' · ' + profile.role, template: '%s · ' + profile.name },
  description: profile.bio,
  metadataBase: new URL(getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')),
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
