'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function SiteNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} items={items} />;
}

function Navigation({ pathname, items }: { pathname: string; items: { href: string; label: string }[] }) {
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
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="site-nav" aria-label="Main navigation" data-open={open}>
        {items.map(({ href, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
          return <Link key={href} href={href} data-active={active}
            aria-current={active ? (pathname === href ? 'page' : 'location') : undefined}
            onClick={() => setOpen(false)}>{label}</Link>;
        })}
      </nav>
    </div>
  );
}
