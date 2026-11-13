import assert from 'node:assert/strict';
import { test } from 'node:test';

test('only development can use the default localhost origin', async () => {
  const { getSiteOrigin } = await import('../src/lib/site-origin.ts');
  assert.equal(getSiteOrigin(undefined, false), 'http://localhost:3000');
  assert.throws(() => getSiteOrigin(undefined, true), /SITE_URL/);
});

test('production requires an HTTP(S) origin for a non-loopback host', async () => {
  const { getSiteOrigin } = await import('../src/lib/site-origin.ts');
  assert.equal(getSiteOrigin('https://portfolio.example/', true), 'https://portfolio.example');
  for (const value of ['invalid', 'ftp://portfolio.example', 'https://portfolio.example/path',
    'https://portfolio.example/?q=x', 'https://portfolio.example/#x', 'https://user@portfolio.example',
    'http://localhost:3000', 'http://127.0.0.1', 'http://[::1]']) {
    assert.throws(() => getSiteOrigin(value, true), /SITE_URL/, value);
  }
});
