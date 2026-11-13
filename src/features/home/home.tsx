import Link from 'next/link';
import { profile } from '@/content/profile';
import { HeroStack } from './hero-stack';

export function Home() {
  return <section className="hero shell">
    <div className="hero-copy">
      <p className="eyebrow hero-name">{profile.name}</p>
      <h1>I build software<br className="desktop-break" /> from the pixel <span>to the database.</span></h1>
      <p className="eyebrow hero-role">{profile.role}</p>
      <p className="lead">{profile.bio}</p>
      <div className="actions">
        <Link className="button solid" href="/projects">View projects <span aria-hidden="true">→</span></Link>
        <Link className="button" href="/contact">Contact me</Link>
      </div>
      <dl className="hero-facts">
        <div><dt>Based in</dt><dd>{profile.location}</dd></div>
        <div><dt>Focus</dt><dd>Product engineering</dd></div>
        <div><dt>Experience</dt><dd>{profile.experience}</dd></div>
      </dl>
    </div>
    <HeroStack />
  </section>;
}
