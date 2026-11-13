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
    <PageIntro label={<Link href="/writing">← Writing</Link>} title={article.title}>
      <time dateTime={article.date}>{articleDate.format(new Date(article.date))}</time> · {minutes} min read
    </PageIntro>
    <div className="prose markdown"><Markdown skipHtml>{article.content}</Markdown></div>
  </article>;
}
