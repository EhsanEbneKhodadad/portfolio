import { getArticles } from '@/features/writing/articles';
import { Writing } from '@/features/writing/writing';
import { writingCopy } from '@/features/writing/copy';
import { pageMetadata } from '@/lib/seo';
const locale = 'fa';
const text = writingCopy[locale];
export const metadata = pageMetadata('/fa/writing', text.metadataTitle, text.metadataDescription, getArticles(locale).length > 0);
export default function Page() {
  return <Writing locale={locale} />;
}
