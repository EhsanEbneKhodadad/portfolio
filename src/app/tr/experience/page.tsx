import { pageMetadata } from '@/lib/seo';
import { turkishPages } from '@/content/tr';
export { TurkishExperience as default } from '@/features/turkish/pages';

const page = turkishPages['/experience'];
export const metadata = pageMetadata('/tr/experience', { absolute: page.title }, page.description);
