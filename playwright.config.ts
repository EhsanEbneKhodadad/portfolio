import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium, defineConfig } from '@playwright/test';

// Use installed Chrome locally if the bundled browser has not been downloaded.
const installedChrome = [process.env.PROGRAMFILES, process.env['PROGRAMFILES(X86)'], process.env.LOCALAPPDATA]
  .filter((directory): directory is string => Boolean(directory))
  .map(directory => join(directory, 'Google', 'Chrome', 'Application', 'chrome.exe'))
  .find(existsSync);
const browserExecutable = process.env.BROWSER_EXECUTABLE ?? (
  process.platform === 'win32' && !process.env.CI && !existsSync(chromium.executablePath())
    ? installedChrome
    : undefined
);

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = 'http://127.0.0.1:' + port;

export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL,
    launchOptions: browserExecutable
      ? { executablePath: browserExecutable }
      : undefined,
  },
  webServer: {
    command: 'npm run build && npm run start -- --hostname 127.0.0.1 --port ' + port,
    env: {
      PORTFOLIO_BROWSER_FIXTURES: '1',
      SITE_URL: 'https://portfolio.example',
    },
    url: baseURL,
    timeout: 180_000,
  },
});
