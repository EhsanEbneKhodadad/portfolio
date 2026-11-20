import { notFound } from 'next/navigation';
import { projectsTr } from '@/content/tr';
import { ProjectDetail } from '@/features/projects/projects';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projectsTr.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const match = projectsTr.find(project => project.slug === slug);
  if (!match) notFound();
  return pageMetadata('/tr/projects/' + slug, { absolute: (slug === 'mozayedegar' ? 'mozayedegar.com Elasticsearch Vaka Çalışması' : match.name + ' Mühendislik Vaka Çalışması') + ' · Ehsan EbneKhodadad' }, match.summary);
}
export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const project = projectsTr.find(project => project.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} locale="tr" />;
}
