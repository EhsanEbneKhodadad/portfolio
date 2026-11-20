import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianHome as default } from '@/features/persian/pages';

const page = persianPages['/'];
export const metadata = pageMetadata('/fa', { absolute: page.title }, page.description);
