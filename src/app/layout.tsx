import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { profile } from '@/content/profile';
import { articles } from '@/features/writing/articles';
import { getSiteOrigin } from '@/lib/site-origin';
import './globals.css';

export const metadata: Metadata = {
  title: { default: profile.name + ' · ' + profile.role, template: '%s · ' + profile.name },
  description: profile.bio,
  metadataBase: new URL(getSiteOrigin(process.env.SITE_URL, process.env.NODE_ENV === 'production')),
};

const navigation = [
  { href: '/', label: 'Home' }, { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' }, { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  ...(articles.length ? [{ href: '/writing', label: 'Writing' }] : []),
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <body>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header shell">
        <Link className="brand" href="/">{profile.name}</Link>
        <SiteNav items={navigation} />
        <Link className="button solid header-contact" href="/contact">Get in touch</Link>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer content">
        <Link href="/">{profile.name}</Link>
        <nav aria-label="Professional links">
          {profile.social.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
          <a href={'mailto:' + profile.email}>Email</a>
        </nav>
      </footer>
    </body>
  </html>;
}
