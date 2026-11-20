import Link from 'next/link';
import { absoluteUrl } from '@/lib/seo';
import { StructuredData } from './structured-data';

export function Breadcrumbs({ items, label = 'Breadcrumb' }: { items: { name: string; href: string }[]; label?: string }) {
  return <>
    <nav aria-label={label} className="eyebrow">
      {items.map(({ name, href }, index) => <span key={href}>
        {index > 0 && <span aria-hidden="true"> / </span>}
        {index === items.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}
      </span>)}
    </nav>
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: items.map(({ name, href }, index) => ({
        '@type': 'ListItem', position: index + 1, name, item: absoluteUrl(href),
      })),
    }} />
  </>;
}
