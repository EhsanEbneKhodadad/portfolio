import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishSkills as default } from '@/features/turkish/pages';

const page = turkishPages['/skills'];
export const metadata = pageMetadata('/tr/skills', { absolute: page.title }, page.description);
