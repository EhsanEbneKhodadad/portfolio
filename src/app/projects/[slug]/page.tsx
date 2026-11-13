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
  return { title: project.name, description: project.summary };
}
export default async function Page({ params }: Props) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
