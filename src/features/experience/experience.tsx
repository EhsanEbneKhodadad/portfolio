import { PageIntro } from '@/components/page-intro';
import { experience } from '@/content/experience';

export function Experience() {
  return <div className="content page">
    <PageIntro label="Career" title="Experience" />
    {experience.map(({ company, role, dates, location, achievements }) => <section className="split-row" key={company + dates}>
      <p className="eyebrow">{dates}</p>
      <div>
        <h2>{role} · {company}</h2>
        <p className="location">{location}</p>
        <ul>{achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
      </div>
    </section>)}
  </div>;
}
