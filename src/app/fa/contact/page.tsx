import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianContact as default } from '@/features/persian/pages';

const page = persianPages['/contact'];
export const metadata = pageMetadata('/fa/contact', { absolute: page.title }, page.description);
