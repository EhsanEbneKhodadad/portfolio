import Link from 'next/link';
import { PageIntro } from '@/components/page-intro';
export default function NotFound() {
  return <div className="content page">
    <PageIntro label="۴۰۴" title="صفحه پیدا نشد">ممکن است این صفحه جابه‌جا شده باشد یا در دسترس نباشد.</PageIntro>
    <Link className="button solid" href="/fa">بازگشت به خانه</Link>
  </div>;
}
