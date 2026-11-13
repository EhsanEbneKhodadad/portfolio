import { articles } from '@/features/writing/articles';
import { pageMetadata } from '@/lib/seo';
export { Writing as default } from '@/features/writing/writing';

export const metadata = pageMetadata('/writing', 'Engineering Notes', 'Engineering notes on search, web development, and asynchronous systems.', articles.length > 0);
