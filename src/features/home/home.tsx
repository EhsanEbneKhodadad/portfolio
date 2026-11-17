import Image from 'next/image';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import portrait from './portrait.webp';

export function Home() {
  return <>
    <section className="hero shell" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="lead">{profile.bio}</p>
        <p className="lead hero-result">I’m a full-stack engineer. I work on everything from the screens people use to the systems behind them.</p>
        <div className="actions">
          <Link className="button solid" href="/projects">View projects <span aria-hidden="true">→</span></Link>
          <Link className="button" href="/contact">Contact me</Link>
        </div>
      </div>
      <div className="hero-portrait">
        <Image src={portrait} alt={'Portrait of ' + profile.name} preload placeholder="blur"
          sizes="(max-width: 600px) 75vw, (max-width: 850px) 340px, 420px" />
      </div>
    </section>
    {projects.length > 0 && <section className="content home-projects" aria-labelledby="featured-heading">
      <h2 id="featured-heading">Featured projects</h2>
      <ul>
        {projects.map(({ slug, name, summary }) => <li key={slug}>
          <Link href={'/projects/' + slug}>
            <strong>{name}</strong><span>{summary}</span><span className="project-arrow" aria-hidden="true">↗</span>
          </Link>
        </li>)}
      </ul>
    </section>}
  </>;
}
