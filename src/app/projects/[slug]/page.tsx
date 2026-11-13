import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { findProject, projects } from '@/content/projects';
import { ProjectDetail } from '@/features/projects/projects';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  const title = project.slug === 'den-auction'
    ? 'DEN Auction Elasticsearch Case Study'
    : project.name + ' Engineering Case Study';
  return pageMetadata('/projects/' + project.slug, title, project.summary);
}
export default async function Page({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
