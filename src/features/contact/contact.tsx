import { PageIntro } from '@/components/page-intro';
import { profile } from '@/content/profile';

export function Contact() {
  return <div className="content page">
    <PageIntro label="Contact" title="Let’s talk.">Have a project or role in mind? Send me a note.</PageIntro>
    <div className="actions contact-links">
      <a className="button solid" href={'mailto:' + profile.email}>{profile.email}</a>
      {profile.social.map(({ href, label }) => <a className="button" href={href} key={href}>{label} <span aria-hidden="true">↗</span></a>)}
    </div>
  </div>;
}
