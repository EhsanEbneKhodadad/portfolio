import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishContact as default } from '@/features/turkish/pages';

const page = turkishPages['/contact'];
export const metadata = pageMetadata('/tr/contact', { absolute: page.title }, page.description);
