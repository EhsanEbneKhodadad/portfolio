import { notFound } from 'next/navigation';
import { articles } from '@/features/writing/articles';
import { Article } from '@/features/writing/writing';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return { title: article.title, description: article.summary };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return <Article article={article} />;
}
