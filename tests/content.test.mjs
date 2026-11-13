import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('a published article appears while drafts and unknown slugs are excluded', async () => {
  const { readPublishedArticles } = await import('../src/features/writing/articles.ts');
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-test-'));
  try {
    for (const [slug, draft] of [['visible', false], ['private', true]]) {
      writeFileSync(join(directory, slug + '.md'), [
        '---', 'title: Writing test', 'summary: A test article', 'date: "2025-01-01"',
        'draft: ' + draft, '---', 'Article body',
      ].join('\n'));
    }
    assert.deepEqual(readPublishedArticles(directory).map(({ slug }) => slug), ['visible']);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('each résumé project has a unique stable detail slug', async () => {
  const { projects } = await import('../src/content/projects.ts');
  assert.deepEqual(projects.map(({ slug }) => slug), ['den-auction', 'synaps-ai', 'tickcar']);
});

test('a missing writing directory is empty and an invalid directory still errors', async () => {
  const { readPublishedArticles } = await import('../src/features/writing/articles.ts');
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-test-'));
  try {
    assert.deepEqual(readPublishedArticles(join(directory, 'missing')), []);
    const file = join(directory, 'file');
    writeFileSync(file, '');
    assert.throws(() => readPublishedArticles(file), { code: 'ENOTDIR' });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
