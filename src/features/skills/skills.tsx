import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { skills } from '@/content/skills';

export function Skills() {
  return <div className="content page">
    <PageIntro label="Technical expertise" title="Skills across the stack" />
    <div className="skill-grid">
      {skills.map(({ title, description, tools }) => <section className="panel skill-card" key={title}>
        <h2>{title}</h2><p>{description}</p>
        <ul className="tools">{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
      </section>)}
    </div>
    <p><Link className="context-link" href="/projects/den-auction">See Elasticsearch in practice at mozayedegar.com</Link></p>
  </div>;
}
