import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishHome as default } from '@/features/turkish/pages';

const page = turkishPages['/'];
export const metadata = pageMetadata('/tr', { absolute: page.title }, page.description);
