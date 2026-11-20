import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';

const configUrl = new URL('../next.config.mjs', import.meta.url).href;
function loadConfig(workerCount) {
  const env = { ...process.env, CIRCLE_NODE_TOTAL: '39' };
  delete env.NEXT_BUILD_WORKERS;
  if (workerCount !== undefined) env.NEXT_BUILD_WORKERS = workerCount;
  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e',
    `const { default: config } = await import(${JSON.stringify(configUrl)}); console.log(JSON.stringify(config));`,
  ], { env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
}

test('an explicit build worker cap overrides large-host worker detection', () => {
  assert.equal(loadConfig('1').experimental?.cpus, 1);
  assert.equal(loadConfig('2').experimental?.cpus, 2);
});

test('ordinary builds retain Next.js default worker detection', () => {
  assert.equal(loadConfig().experimental?.cpus, undefined);
});

test('invalid build worker caps fail clearly instead of enabling automatic fan-out', () => {
  for (const count of ['', '0', '-1', '1.5', 'invalid', 'Infinity', '9007199254740992']) {
    assert.throws(() => loadConfig(count), error => {
      assert.match(error.stderr, /NEXT_BUILD_WORKERS must be a positive safe integer/);
      return true;
    }, count);
  }
});
