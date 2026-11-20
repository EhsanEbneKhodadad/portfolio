import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { LanguageSwitcher } from '@/components/language-switcher';
import { mainRoutes, writingRoute } from '@/content/routes';
import { profile } from '@/content/profile';
import { fa } from '@/content/fa';
import { tr } from '@/content/tr';
import { identities } from '@/content/locales';
import { shellText } from '@/content/shell';
import { writingCopy } from '@/features/writing/copy';
import { localizedPath, type Locale } from '@/lib/i18n';

export function SiteLayout({ children, locale, fontClassName }: { children: React.ReactNode; locale: Locale; fontClassName?: string }) {
  const { name } = identities[locale];
  const text = shellText[locale];
  const routeList = [...mainRoutes, writingRoute];
  const translatedLabels = { fa: fa.nav, tr: tr.nav };
  const navigation = locale === 'en'
    ? routeList
    : routeList.map((route, index) => ({ href: localizedPath(route.href, locale), label: route.href === '/writing' ? writingCopy[locale].label : translatedLabels[locale][index] }));
  return <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'} className={fontClassName}>
    <body>
      <a className="skip" href="#main">{text.skip}</a>
      <header className="site-header shell">
        <Link className="brand" href={localizedPath('/', locale)}>{name}</Link>
        <SiteNav items={navigation} locale={locale} />
        <LanguageSwitcher locale={locale} />
        <Link className="button solid header-contact" href={localizedPath('/contact', locale)}>{text.contact}</Link>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
      <footer className="site-footer content">
        <Link href={localizedPath('/', locale)}>{name}</Link>
        <nav aria-label={text.professional}>
          {profile.social.map(({ label, href }) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label === 'GitHub' ? text.github : text.linkedin}</a>)}
          <a href={'mailto:' + profile.email}>{text.email}</a>
        </nav>
      </footer>
    </body>
  </html>;
}
