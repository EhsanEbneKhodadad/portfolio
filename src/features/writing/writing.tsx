import { Breadcrumbs } from '@/components/breadcrumbs';
import { StructuredData } from '@/components/structured-data';
import { profile } from '@/content/profile';
import { absoluteUrl } from '@/lib/seo';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { PageIntro } from '@/components/page-intro';
import { articles, articleDate } from './articles';

export function Writing() {
  return <div className="content page">
    <PageIntro label="Writing" title="Engineering notes">Notes on building web products, debugging, and design trade-offs.</PageIntro>
    {articles.length === 0 && <p>No articles have been published yet.</p>}
    {articles.map((article) => <article className="split-row" key={article.slug}>
      <time className="eyebrow" dateTime={article.date}>{articleDate.format(new Date(article.date))}</time>
      <div><h2><Link href={'/writing/' + article.slug}>{article.title} <span aria-hidden="true">↗</span></Link></h2><p>{article.summary}</p></div>
    </article>)}
  </div>;
}

export function Article({ article }: { article: (typeof articles)[number] }) {
  const minutes = Math.max(1, Math.ceil(article.content.trim().split(/\s+/).length / 220));
  return <article className="content page article">
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
      description: article.summary, datePublished: article.date, url: absoluteUrl('/writing/' + article.slug),
      image: absoluteUrl('/social-preview.png'),
      author: { '@type': 'Person', name: profile.name, url: absoluteUrl('/about'), '@id': absoluteUrl('/about#person') },
    }} />
    <PageIntro label={<Breadcrumbs items={[{ name: 'Writing', href: '/writing' }, { name: article.title, href: '/writing/' + article.slug }]} />} title={article.title}>
      <Link href="/about">{profile.name}</Link> ·
      <time dateTime={article.date}>{articleDate.format(new Date(article.date))}</time> · {minutes} min read
    </PageIntro>
    <div className="prose markdown"><Markdown skipHtml components={{
      a: ({ href, title, children }) => {
        const site = absoluteUrl('/');
        const url = href ? URL.parse(href, site) : null;
        const external = url && /^https?:$/.test(url.protocol) && url.origin !== new URL(site).origin;
        return <a href={href} title={title} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{children}</a>;
      },
    }}>{article.content}</Markdown></div>
  </article>;
}
