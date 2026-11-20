import { pageMetadata } from '@/lib/seo';
import { persianPages } from '@/content/fa';
export { PersianSkills as default } from '@/features/persian/pages';

const page = persianPages['/skills'];
export const metadata = pageMetadata('/fa/skills', { absolute: page.title }, page.description);
