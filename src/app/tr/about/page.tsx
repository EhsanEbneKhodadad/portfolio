import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishAbout as default } from '@/features/turkish/pages';

const page = turkishPages['/about'];
export const metadata = pageMetadata('/tr/about', { absolute: page.title }, page.description);
