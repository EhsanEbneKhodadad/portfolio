import Image from 'next/image';
import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
import { StructuredData } from '@/components/structured-data';
import { profile } from '@/content/profile';
import { tr, skillsTr, experienceTr, projectsTr } from '@/content/tr';
import { Projects } from '@/features/projects/projects';
import { absoluteUrl, personData, websiteData } from '@/lib/seo';
import portrait from '@/features/home/portrait.webp';

export function TurkishHome() {
  return <>
    <StructuredData data={websiteData('tr')} />
    <section className="hero shell" aria-labelledby="home-title">
      <div className="hero-copy">
        <h1 id="home-title">{tr.name}</h1>
        <p className="hero-role">{tr.role}</p>
        <p className="lead">{tr.bio}</p>
        <p className="lead hero-result">{tr.intro}</p>
        <div className="actions">
          <Link className="button solid" href="/tr/projects">Projeleri görüntüle <span aria-hidden="true">→</span></Link>
          <Link className="button" href="/tr/contact">Benimle iletişime geçin</Link>
        </div>
      </div>
      <div className="hero-portrait">
        <Image src={portrait} alt={tr.name + ' portresi'} preload placeholder="blur"
          sizes="(max-width: 600px) 75vw, (max-width: 850px) 340px, 420px" />
      </div>
    </section>
    <section className="content home-projects" aria-labelledby="featured-heading">
      <h2 id="featured-heading">Öne çıkan projeler</h2>
      <ul>{projectsTr.map(({ slug, name, summary }) => <li key={slug}>
        <Link href={'/tr/projects/' + slug}>
          <strong>{name}</strong><span>{summary}</span><span className="project-arrow" aria-hidden="true">↗</span>
        </Link>
      </li>)}</ul>
    </section>
  </>;
}

export function TurkishAbout() {
  return <div className="content page">
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'ProfilePage', url: absoluteUrl('/tr/about'), inLanguage: 'tr',
      mainEntity: { ...personData('tr'), image: absoluteUrl(portrait.src) },
    }} />
    <PageIntro label="Hakkımda" title={`Merhaba, ben ${tr.name}.`}>{tr.bio}</PageIntro>
    <div className="prose">
      <p>Frontend geliştirme ile başladım ve daha sonra full stack geliştirmeye geçtim. REST API’leri, veritabanı şemaları ve otomatik dağıtım süreçleri tasarlıyorum. Açık artırma araması, çok dilli ürünler ve asenkron yapay zekâ işleme projelerinde çalıştım.</p>
      <p>Yeniden kullanılabilir bileşenler geliştiriyor, kritik akışları test ediyor ve uzun süren işleri web isteklerinden ayrı tutuyorum. Kod incelemeleri ve mimari tartışmalar yoluyla diğer geliştiricilere de rehberlik ediyorum.</p>
      <p className="eyebrow">Tebriz, İran’da yaşıyorum · Taşınmaya açığım</p>
      <h2>Eğitim</h2>
      <p>Bilgisayar Bilimi Lisansı, Tebriz Üniversitesi · 2019–2023. Akademik başarıya dayalı tam burs.</p>
      <p>İngilizce · B2 (Orta-üstü)</p>
    </div>
  </div>;
}

export function TurkishSkills() {
  return <div className="content page">
    <PageIntro label="Teknik uzmanlık" title="Tüm katmanlardaki beceriler" />
    <div className="skill-grid">{skillsTr.map(({ title, description, tools }) => <section className="panel skill-card" key={title}>
      <h2>{title}</h2><p>{description}</p>
      <ul className="tools">{tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    </section>)}</div>
  </div>;
}

export function TurkishExperience() {
  return <div className="content page">
    <PageIntro label="Kariyer" title="İş deneyimi" />
    {experienceTr.map(({ company, role, location, dates, achievements }) => <section className="split-row" key={company + dates}>
      <p className="eyebrow">{dates}</p>
      <div><h2>{role} · {company}</h2><p className="location">{location}</p>
        <ul>{achievements.map(achievement => <li key={achievement}>{achievement}</li>)}</ul>
      </div>
    </section>)}
    <p><Link className="context-link" href="/tr/projects/synaps-ai">Synaps AI’daki AWS değerlendirme hattını görün</Link></p>
  </div>;
}

export function TurkishContact() {
  return <div className="content page">
    <PageIntro label="İletişim" title="Konuşalım.">Aklınızda bir proje veya iş pozisyonu mu var? Bana bir mesaj gönderin.</PageIntro>
    <div className="actions contact-links">
      <a className="button solid" href={'mailto:' + profile.email}>{profile.email}</a>
      {profile.social.map(({ href, label }) => <a className="button" href={href} key={href} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>)}
    </div>
  </div>;
}

export function TurkishProjects() {
  return <Projects locale="tr" />;
}
