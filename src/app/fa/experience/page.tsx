import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianExperience as default } from '@/features/persian/pages';

const page = persianPages['/experience'];
export const metadata = pageMetadata('/fa/experience', { absolute: page.title }, page.description);
