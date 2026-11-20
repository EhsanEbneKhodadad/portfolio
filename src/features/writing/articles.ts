import type { Locale } from '../../lib/i18n';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

function collectArticles(list: () => import('node:fs').Dirent[], read: (name: string) => string) {
  let entries;
  try {
    entries = list();
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
      const { content, data } = matter(read(name));
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

export function readPublishedArticles(directory: string) {
  return collectArticles(
    () => readdirSync(/*turbopackIgnore: true*/ directory, { withFileTypes: true }),
    (name) => readFileSync(/*turbopackIgnore: true*/ join(directory, name), 'utf8'),
  );
}

export const articles = process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
  ? collectArticles(
    () => readdirSync(join(process.cwd(), 'tests/fixtures/writing'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'tests/fixtures/writing', name), 'utf8'),
  )
  : collectArticles(
    () => readdirSync(join(process.cwd(), 'content/writing'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'content/writing', name), 'utf8'),
  );


const articlesFA = process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
  ? collectArticles(
    () => readdirSync(join(process.cwd(), 'tests/fixtures/writing/fa'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'tests/fixtures/writing/fa', name), 'utf8'),
  )
  : collectArticles(
    () => readdirSync(join(process.cwd(), 'content/writing/fa'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'content/writing/fa', name), 'utf8'),
  );

const articlesTR = process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
  ? collectArticles(
    () => readdirSync(join(process.cwd(), 'tests/fixtures/writing/tr'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'tests/fixtures/writing/tr', name), 'utf8'),
  )
  : collectArticles(
    () => readdirSync(join(process.cwd(), 'content/writing/tr'), { withFileTypes: true }),
    (name) => readFileSync(join(process.cwd(), 'content/writing/tr', name), 'utf8'),
  );

export function matchTranslations(source: typeof articles, translations: typeof articles, locale: Locale) {
  const bySlug = new Map(translations.map(article => [article.slug, article]));
  return source.map(article => {
    const translation = bySlug.get(article.slug);
    if (!translation) throw new Error('Missing ' + locale + ' translation for published article: ' + article.slug);
    return { ...translation, date: article.date };
  });
}

const articlesByLocale = {
  en: articles,
  fa: matchTranslations(articles, articlesFA, 'fa'),
  tr: matchTranslations(articles, articlesTR, 'tr'),
};

export function getArticles(locale: Locale) {
  return articlesByLocale[locale];
}
