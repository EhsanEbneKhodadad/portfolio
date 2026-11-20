'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { shellText } from '@/content/shell';
import { localizedPath } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export function SiteNav({ items, locale = 'en' }: { items: { href: string; label: string }[]; locale?: Locale }) {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} items={items} locale={locale} />;
}

function Navigation({ pathname, items, locale }: { pathname: string; items: { href: string; label: string }[]; locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-area" onKeyDown={(event) => {
      if (open && event.key === 'Escape') {
        setOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    }}>
      <button className="button menu-toggle" id="menu-toggle" type="button" aria-controls="site-nav"
        aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? shellText[locale].close : shellText[locale].menu}
      </button>
      <nav id="site-nav" aria-label={shellText[locale].navigation} data-open={open}>
        {items.map(({ href, label }) => {
          const active = pathname === href || (href !== localizedPath('/', locale) && pathname.startsWith(href + '/'));
          return <Link key={href} href={href} data-active={active}
            aria-current={active ? (pathname === href ? 'page' : 'location') : undefined}
            onClick={() => setOpen(false)}>{label}</Link>;
        })}
      </nav>
    </div>
  );
}
