import { notFound } from 'next/navigation';
import { getArticles } from '@/features/writing/articles';
import { Article } from '@/features/writing/writing';
import { pageMetadata } from '@/lib/seo';
const locale = 'tr';
const entries = getArticles(locale);
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return entries.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = entries.find(entry => entry.slug === slug);
  if (!article) notFound();
  const metadata = pageMetadata('/tr/writing/' + slug, article.title, article.summary);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article', publishedTime: article.date } };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = entries.find(entry => entry.slug === slug);
  if (!article) notFound();
  return <Article article={article} locale={locale} />;
}
