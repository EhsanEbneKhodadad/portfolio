import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianAbout as default } from '@/features/persian/pages';

const page = persianPages['/about'];
export const metadata = pageMetadata('/fa/about', { absolute: page.title }, page.description);
