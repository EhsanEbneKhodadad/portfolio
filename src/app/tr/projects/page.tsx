import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishProjects as default } from '@/features/turkish/pages';

const page = turkishPages['/projects'];
export const metadata = pageMetadata('/tr/projects', { absolute: page.title }, page.description);
