import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteLayout } from '@/components/site-layout';
import { tr } from '@/content/tr';
import { getSiteOrigin } from '@/lib/site-origin';
import '../globals.css';

const sourceSans = localFont({
  src: '../../fonts/SourceSans3.woff2', variable: '--font-locale',
  weight: '200 900', display: 'swap', preload: false,
});
export const metadata: Metadata = {
  title: { default: tr.name + ' | ' + tr.role, template: '%s | ' + tr.name },
  description: tr.bio,
  metadataBase: new URL(getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="tr" fontClassName={sourceSans.variable}>{children}</SiteLayout>;
}
