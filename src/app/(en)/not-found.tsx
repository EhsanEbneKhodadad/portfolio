import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';

export default function NotFound() {
  return <div className="content page">
    <PageIntro label="404" title="Page not found">This page may have moved or is unavailable.</PageIntro>
    <Link className="button solid" href="/">Back to home <span aria-hidden="true">→</span></Link>
  </div>;
}
