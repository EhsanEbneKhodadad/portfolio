import Image from 'next/image';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { StructuredData } from '@/components/structured-data';
import { profile } from '@/content/profile';
import { fa, skillsFa, experienceFa, projectsFa } from '@/content/fa';
import { Projects } from '@/features/projects/projects';
import { absoluteUrl, personData, websiteData } from '@/lib/seo';
import portrait from '@/features/home/portrait.webp';

export function PersianHome() {
  return <>
    <StructuredData data={websiteData('fa')} />
    <section className="hero shell" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">{fa.givenName}{' '}<span className="name-family">{fa.familyName}</span></h1>
        <p className="hero-role">{fa.role}</p>
        <p className="lead">{fa.bio}</p>
        <p className="lead hero-result">{fa.intro}</p>
        <div className="actions">
          <Link className="button solid" href="/fa/projects">مشاهده پروژه‌ها <span aria-hidden="true">←</span></Link>
          <Link className="button" href="/fa/contact">تماس با من</Link>
        </div>
      </div>
      <div className="hero-portrait">
        <Image src={portrait} alt={'پرترهٔ ' + fa.name} loading="eager" fetchPriority="high" placeholder="blur"
          sizes="(max-width: 600px) 75vw, (max-width: 850px) 340px, 420px" />
      </div>
    </section>
    <section className="content home-projects" aria-labelledby="featured-heading">
      <h2 id="featured-heading">پروژه‌های منتخب</h2>
      <ul>{projectsFa.map(({ slug, name, summary }) => <li key={slug}>
        <Link href={'/fa/projects/' + slug}>
          <strong>{name}</strong><span>{summary}</span><span className="project-arrow" aria-hidden="true">↖</span>
        </Link>
      </li>)}</ul>
    </section>
  </>;
}

export function PersianAbout() {
  return <div className="content page">
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'ProfilePage', url: absoluteUrl('/fa/about'), inLanguage: 'fa',
      mainEntity: { ...personData('fa'), image: absoluteUrl(portrait.src) },
    }} />
    <PageIntro label="درباره" title={`سلام، من ${fa.name} هستم.`}>{fa.bio}</PageIntro>
    <div className="prose">
      <p>کارم را با توسعه فرانت‌اند شروع کردم و سپس به توسعه فول‌استک رسیدم. طراحی REST API، ساختار پایگاه داده و فرایندهای استقرار خودکار بخشی از کار من است. در پروژه‌های جست‌وجوی مزایده، محصولات چندزبانه و پردازش غیرهم‌زمان هوش مصنوعی تجربه دارم.</p>
      <p>مؤلفه‌های قابل استفاده مجدد می‌سازم، مسیرهای اصلی برنامه را آزمایش می‌کنم و پردازش‌های طولانی را از درخواست‌های وب جدا نگه می‌دارم. از طریق بازبینی کد و گفت‌وگو درباره معماری، به توسعه‌دهندگان دیگر نیز کمک می‌کنم.</p>
      <p className="eyebrow">ساکن تبریز، ایران · آماده جابه‌جایی</p>
      <h2>تحصیلات</h2>
      <p>کارشناسی علوم کامپیوتر، دانشگاه تبریز · ۲۰۱۹ تا ۲۰۲۳. بورسیه کامل بر اساس شایستگی تحصیلی.</p>
      <p>انگلیسی · B2 (متوسط رو به بالا)</p>
    </div>
  </div>;
}

export function PersianSkills() {
  return <div className="content page">
    <PageIntro label="تخصص فنی" title="مهارت‌ها در سراسر پشته فناوری" />
    <div className="skill-grid">{skillsFa.map(({ title, description, tools }) => <section className="panel skill-card" key={title}>
      <h2>{title}</h2><p>{description}</p>
      <ul className="tools">{tools.map(tool => <li key={tool}><bdi>{tool}</bdi></li>)}</ul>
    </section>)}</div>
  </div>;
}

export function PersianExperience() {
  return <div className="content page">
    <PageIntro label="مسیر حرفه‌ای" title="سوابق کاری" />
    {experienceFa.map(({ company, role, location, dates, achievements }) => <section className="split-row" key={company + dates}>
      <p className="eyebrow">{dates}</p>
      <div><h2>{role} · <bdi>{company}</bdi></h2><p className="location">{location}</p>
        <ul>{achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
      </div>
    </section>)}
    <p><Link className="context-link" href="/fa/projects/synaps-ai">خط پردازش ارزیابی AWS در Synaps AI را ببینید</Link></p>
  </div>;
}

export function PersianContact() {
  return <div className="content page">
    <PageIntro label="تماس" title="بیایید گفت‌وگو کنیم.">پروژه یا موقعیت شغلی‌ای در نظر دارید؟ برایم پیام بفرستید.</PageIntro>
    <div className="actions contact-links">
      <a className="button solid" href={'mailto:' + profile.email}><bdi>{profile.email}</bdi></a>
      {profile.social.map(({ href, label }) => <a className="button" href={href} key={href} target="_blank" rel="noopener noreferrer">
        {label === 'GitHub' ? 'گیت‌هاب' : 'لینکدین'} <span aria-hidden="true">↖</span>
      </a>)}
    </div>
  </div>;
}

export function PersianProjects() {
  return <Projects locale="fa" />;
}
