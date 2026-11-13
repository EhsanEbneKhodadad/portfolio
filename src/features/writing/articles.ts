import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export function readPublishedArticles(directory = join(process.cwd(), 'content', 'writing')) {
  let entries;
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && /\.md$/i.test(entry.name))
    .flatMap(({ name }) => {
      const slug = name.slice(0, -3);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error('Invalid article filename: ' + name);
      }
      const { content, data } = matter(readFileSync(join(directory, name), 'utf8'));
      if (data.draft === true) return [];
      const { title, summary, date, draft } = data;
      if (draft !== false || typeof title !== 'string' || !title.trim() ||
          typeof summary !== 'string' || !summary.trim() || !content.trim() ||
          typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
        throw new Error('Invalid published article metadata: ' + name);
      }
      return [{ slug, title, summary, date, content }];
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

const writingDirectory = process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
  ? join(process.cwd(), 'tests', 'fixtures', 'writing')
  : undefined;

export const articles = readPublishedArticles(writingDirectory);
export const articleDate = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });
