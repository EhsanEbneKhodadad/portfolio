import { Breadcrumbs } from '@/components/breadcrumbs';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { projects, findProject } from '@/content/projects';

type Project = NonNullable<ReturnType<typeof findProject>>;

function Capabilities({ project }: { project: Project }) {
  return <div className="panel capabilities">
    <h3 className="eyebrow">Project capabilities</h3>
    <dl>{project.capabilities.map(([name, detail]) => <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>)}</dl>
  </div>;
}

export function Projects() {
  return <div className="content page">
    <PageIntro label="Selected work" title="Projects">The products I’ve worked on and the engineering behind them.</PageIntro>
    {projects.length === 0 && <p>No projects have been published yet.</p>}
    <div className="project-list">
      {projects.map((project) => <article className="panel project-card" key={project.slug}>
        <div>
          <p className="eyebrow">{project.stack.join(' · ')}</p>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
          <Link className="button" href={'/projects/' + project.slug}>View case study <span aria-hidden="true">→</span><span className="sr-only"> for {project.name}</span></Link>
        </div>
        <Capabilities project={project} />
      </article>)}
    </div>
  </div>;
}

export function ProjectDetail({ project }: { project: Project }) {
  const sections = [
    ['Role', project.role],
    ['Problem', project.problem],
    ['Solution', project.solution],
    ['Impact', project.impact],
  ];
  return <article className="content page detail">
    <PageIntro label={<Breadcrumbs items={[{ name: 'Projects', href: '/projects' }, { name: project.name, href: '/projects/' + project.slug }]} />} title={project.name}>{project.summary}</PageIntro>
    <div className="actions project-actions">
      <a className="button" href={project.url}>Visit project <span aria-hidden="true">↗</span></a>
      <p className="eyebrow">{project.stack.join(' · ')}</p>
    </div>
    <Capabilities project={project} />
    <div className="case-sections">
      {sections.map(([heading, copy]) => copy && <section className="split-row" key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}
    </div>
  </article>;
}
