import { StructuredData } from '@/components/structured-data';
import { absoluteUrl } from '@/lib/seo';
import portrait from '@/features/home/portrait.webp';
import { PageIntro } from '@/components/page-intro';
import { profile } from '@/content/profile';

export function About() {
  return <div className="content page">
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'ProfilePage', url: absoluteUrl('/about'),
      mainEntity: { '@type': 'Person', '@id': absoluteUrl('/about#person'), name: profile.name,
        jobTitle: profile.role, image: absoluteUrl(portrait.src), sameAs: profile.social.map(({ href }) => href) },
    }} />
    <PageIntro label="About" title={'Hi, I’m ' + profile.name + '.'}>{profile.bio}</PageIntro>
    <div className="prose">
      <p>I started in frontend development and moved into full-stack work, designing REST APIs, database schemas, and automated deployment pipelines. My work has included auction search, multilingual products, and asynchronous AI processing.</p>
      <p>I build reusable components, test critical workflows, and keep long-running jobs separate from application requests. I also mentor developers through code reviews and architecture discussions.</p>
      <p className="eyebrow">Based in {profile.location} · Open to relocation</p>
      <h2>Education</h2>
      <p>Bachelor of Science in Computer Science, University of Tabriz · 2019–2023. Full merit-based academic scholarship.</p>
      <p>English · B2 (Upper-Intermediate)</p>
    </div>
  </div>;
}
