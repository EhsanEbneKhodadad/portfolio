import { notFound } from 'next/navigation';
import { projectsFa } from '@/content/fa';
import { ProjectDetail } from '@/features/projects/projects';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projectsFa.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const match = projectsFa.find(project => project.slug === slug);
  if (!match) notFound();
  return pageMetadata('/fa/projects/' + slug, { absolute: (slug === 'mozayedegar' ? 'مطالعه موردی Elasticsearch در mozayedegar.com' : match.name + ' مطالعه موردی مهندسی') + ' · احسان ابن خداداد' }, match.summary);
}
export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const project = projectsFa.find(project => project.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} locale="fa" />;
}
