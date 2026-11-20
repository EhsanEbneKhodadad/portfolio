import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteLayout } from '@/components/site-layout';
import { fa } from '@/content/fa';
import { getSiteOrigin } from '@/lib/site-origin';
import '../globals.css';

const vazirmatn = localFont({
  src: '../../fonts/Vazirmatn.woff2', variable: '--font-locale',
  weight: '100 900', display: 'swap', preload: false,
});

export const metadata: Metadata = {
  title: { default: fa.name + ' | ' + fa.role, template: '%s | ' + fa.name },
  description: fa.bio,
  metadataBase: new URL(getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="fa" fontClassName={vazirmatn.variable}>{children}</SiteLayout>;
}
