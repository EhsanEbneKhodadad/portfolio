import { Breadcrumbs } from '@/components/breadcrumbs';
import { StructuredData } from '@/components/structured-data';
import { identities } from '@/content/locales';
import { localizedPath, translationPath, type Locale } from '@/lib/i18n';
import { writingCopy } from './copy';
import { absoluteUrl } from '@/lib/seo';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { PageIntro } from '@/components/page-intro';
import { articles, getArticles } from './articles';

function dateFormatter(locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'fa' ? 'fa-IR-u-ca-gregory' : locale, { dateStyle: 'medium', timeZone: 'UTC' });
}

export function Writing({ locale = 'en' }: { locale?: Locale }) {
  const text = writingCopy[locale];
  const entries = getArticles(locale);
  const base = localizedPath('/writing', locale);
  const articleDate = dateFormatter(locale);
  return <div className="content page">
    <PageIntro label={text.label} title={text.title}>{text.intro}</PageIntro>
    {entries.length === 0 && <p>{text.empty}</p>}
    {entries.map((article) => <article className="split-row" key={article.slug}>
      <time className="eyebrow" dateTime={article.date}>{articleDate.format(new Date(article.date))}</time>
      <div><h2><Link href={base + '/' + article.slug}>{article.title} <span aria-hidden="true">↗</span></Link></h2><p>{article.summary}</p></div>
    </article>)}
  </div>;
}

export function Article({ article, locale = 'en' }: { article: (typeof articles)[number]; locale?: Locale }) {
  const text = writingCopy[locale];
  const identity = identities[locale];
  const base = localizedPath('/writing', locale);
  const about = localizedPath('/about', locale);
  const articleDate = dateFormatter(locale);
  const minutes = Math.max(1, Math.ceil(article.content.trim().split(/\s+/).length / 220));
  return <article className="content page article">
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
      description: article.summary, datePublished: article.date, url: absoluteUrl(base + '/' + article.slug), inLanguage: locale,
      image: absoluteUrl('/social-preview.png'),
      author: { '@type': 'Person', name: identity.name, url: absoluteUrl(about), '@id': absoluteUrl('/about#person') },
    }} />
    <PageIntro label={<Breadcrumbs label={text.breadcrumb} items={[{ name: text.label, href: base }, { name: article.title, href: base + '/' + article.slug }]} />} title={article.title}>
      <Link href={about}>{identity.name}</Link> ·
      <time dateTime={article.date}>{articleDate.format(new Date(article.date))}</time> · {minutes} {text.minutes}
    </PageIntro>
    <div className="prose markdown"><Markdown skipHtml components={{
      a: ({ href, title, children }) => {
        const site = absoluteUrl('/');
        const url = href ? URL.parse(href, site) : null;
        const external = url && /^https?:$/.test(url.protocol) && url.origin !== new URL(site).origin;
        const absolutePath = href?.startsWith('/') || /^https?:/.test(href ?? '');
        const translatedPath = absolutePath && url && !external ? translationPath(url.pathname) : null;
        const destination = translatedPath && url ? localizedPath(translatedPath, locale) + url.search + url.hash : href;
        return <a href={destination} title={title} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a>;
      },
    }}>{article.content}</Markdown></div>
  </article>;
}
