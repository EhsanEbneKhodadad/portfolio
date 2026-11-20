import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
export default function NotFound() {
  return <div className="content page">
    <PageIntro label="404" title="Sayfa bulunamadı">Bu sayfa taşınmış olabilir veya kullanılamıyor.</PageIntro>
    <Link className="button solid" href="/tr">Ana sayfaya dön</Link>
  </div>;
}
