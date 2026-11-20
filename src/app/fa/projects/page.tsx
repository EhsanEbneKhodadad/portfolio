import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianProjects as default } from '@/features/persian/pages';

const page = persianPages['/projects'];
export const metadata = pageMetadata('/fa/projects', { absolute: page.title }, page.description);
