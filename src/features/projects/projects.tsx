import { Breadcrumbs } from '@/components/breadcrumbs';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { projectsFa } from '@/content/fa';
import { projectsTr } from '@/content/tr';
import { localizedPath } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { projects, findProject } from '@/content/projects';

import Image from 'next/image';
import mozayedegarScreenshot from './screenshots/mozayedegar.png';
import synapsScreenshot from './screenshots/synaps-ai.png';
import tickcarScreenshot from './screenshots/tickcar.png';

const projectLists = { en: projects, fa: projectsFa, tr: projectsTr };
const labels = {
  en: { selected: 'Selected work', projects: 'Projects', intro: 'The products I’ve worked on and the engineering behind them.', empty: 'No projects have been published yet.', study: 'View case study', for: ' for ', capabilities: 'Project capabilities', role: 'Role', problem: 'Problem', solution: 'Solution', impact: 'Impact', visit: 'Visit project', breadcrumb: 'Breadcrumb', screenshot: 'Website screenshot of ' },
  fa: { selected: 'کارهای منتخب', projects: 'پروژه‌ها', intro: 'محصولاتی که روی آن‌ها کار کرده‌ام و جزئیات فنی آن‌ها.', empty: 'هنوز پروژه‌ای منتشر نشده است.', study: 'بررسی پروژه', for: ' برای ', capabilities: 'قابلیت‌های پروژه', role: 'نقش', problem: 'مسئله', solution: 'راهکار', impact: 'نتیجه', visit: 'مشاهده وب‌سایت', breadcrumb: 'مسیر صفحه', screenshot: 'نمای وب‌سایت ' },
  tr: { selected: 'Seçili çalışmalar', projects: 'Projeler', intro: 'Üzerinde çalıştığım ürünler ve teknik ayrıntıları.', empty: 'Henüz yayımlanmış proje yok.', study: 'Projeyi incele', for: ' — ', capabilities: 'Proje özellikleri', role: 'Rol', problem: 'Sorun', solution: 'Çözüm', impact: 'Sonuç', visit: 'Web sitesini ziyaret et', breadcrumb: 'Sayfa yolu', screenshot: 'Web sitesi ekran görüntüsü — ' },
};

const screenshots = new Map([
  ['mozayedegar', { src: mozayedegarScreenshot, alt: 'Mozayedegar homepage with featured auction listings', fa: 'صفحه اصلی مزایده‌گر با آگهی‌های ویژه مزایده', tr: 'Öne çıkan açık artırma ilanlarıyla Mozayedegar ana sayfası' }],
  ['synaps-ai', { src: synapsScreenshot, alt: 'Synaps AI English homepage in dark mode', fa: 'صفحه اصلی انگلیسی Synaps AI در حالت تیره', tr: 'Karanlık modda Synaps AI İngilizce ana sayfası' }],
  ['tickcar', { src: tickcarScreenshot, alt: 'TickCar Persian homepage showing its vehicle inspection services', fa: 'صفحه اصلی فارسی TickCar که خدمات کارشناسی خودرو را نشان می‌دهد', tr: 'Araç ekspertiz hizmetlerini gösteren TickCar Farsça ana sayfası' }],
]);

function ProjectScreenshot({ slug, locale = 'en' }: { slug: string; locale?: Locale }) {
  const screenshot = screenshots.get(slug);
  if (!screenshot) return null;

  return <Image className="project-screenshot" src={screenshot.src} alt={locale === 'en' ? screenshot.alt : screenshot[locale]}
    sizes="(max-width: 1100px) 90vw, 960px" />;
}

type Project = NonNullable<ReturnType<typeof findProject>>;

function Capabilities({ project, locale = 'en' }: { project: Project; locale?: Locale }) {
  return <div className="panel capabilities">
    <h3 className="eyebrow">{labels[locale].capabilities}</h3>
    <dl>{project.capabilities.map(([name, detail]) => <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>)}</dl>
  </div>;
}

export function Projects({ locale = 'en' }: { locale?: Locale }) {
  const text = labels[locale];
  const list = projectLists[locale];
  const base = localizedPath('/projects', locale) + '/';
  return <div className="content page">
    <PageIntro label={text.selected} title={text.projects}>{text.intro}</PageIntro>
    {list.length === 0 && <p>{text.empty}</p>}
    <div className="project-list">
      {list.map((project) => <article className="panel project-card" key={project.slug}>
        <div>
          <p className="eyebrow">{project.stack.join(' · ')}</p>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
          <Link className="button" href={base + project.slug}>{text.study} <span aria-hidden="true">→</span><span className="sr-only">{text.for}{project.name}</span></Link>
        </div>
        <Capabilities project={project} locale={locale} />
        <ProjectScreenshot slug={project.slug} locale={locale} />
      </article>)}
    </div>
  </div>;
}

export function ProjectDetail({ project, locale = 'en' }: { project: Project; locale?: Locale }) {
  const text = labels[locale];
  const base = localizedPath('/projects', locale);
  const sections = [
    [text.role, project.role],
    [text.problem, project.problem],
    [text.solution, project.solution],
    [text.impact, project.impact],
  ];
  return <article className="content page detail">
    <PageIntro label={<Breadcrumbs label={text.breadcrumb} items={[{ name: text.projects, href: base }, { name: project.name, href: base + '/' + project.slug }]} />} title={project.name}>{project.summary}</PageIntro>
    <div className="actions project-actions">
      <a className="button" href={project.url} target="_blank" rel="noopener noreferrer">{text.visit} <span aria-hidden="true">↗</span></a>
      <p className="eyebrow">{project.stack.join(' · ')}</p>
    </div>
    <ProjectScreenshot slug={project.slug} locale={locale} />
    <Capabilities project={project} locale={locale} />
    <div className="case-sections">
      {sections.map(([heading, copy]) => copy && <section className="split-row" key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}
    </div>
  </article>;
}
