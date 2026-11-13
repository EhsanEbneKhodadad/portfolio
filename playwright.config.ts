import { defineConfig } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = 'http://127.0.0.1:' + port;

export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL,
    launchOptions: process.env.BROWSER_EXECUTABLE
      ? { executablePath: process.env.BROWSER_EXECUTABLE }
      : undefined,
  },
  webServer: {
    command: 'npm run start -- --hostname 127.0.0.1 --port ' + port,
    url: baseURL,
  },
});
