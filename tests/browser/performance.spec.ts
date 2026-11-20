import { expect, test } from '@playwright/test';

for (const [locale, path, font] of [
  ['en', '/', null],
  ['fa', '/fa', 'Vazirmatn'],
  ['tr', '/tr', 'SourceSans3'],
] as const) {
  test(locale + ' cold load downloads only its own compressed font and prioritizes the portrait', async ({ page }) => {
    const fontRequests: string[] = [];
    page.on('request', request => {
      if (request.resourceType() === 'font') fontRequests.push(request.url());
    });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const portrait = page.locator('.hero-portrait img');
    await expect(portrait).toHaveAttribute('fetchpriority', 'high');
    await expect(portrait).toHaveAttribute('loading', 'eager');
    await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    expect(fontRequests).toHaveLength(font ? 1 : 0);
    if (font) {
      expect(fontRequests[0]).toContain(font);
      expect(new URL(fontRequests[0]).pathname).toMatch(/\.woff2$/);
      expect(await page.evaluate(() => [...document.fonts].some(face => face.status === 'loaded'))).toBe(true);
    }
  });
}
