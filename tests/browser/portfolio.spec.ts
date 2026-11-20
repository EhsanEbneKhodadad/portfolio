import { expect, test } from '@playwright/test';

test('public pages, case studies, sitemap, and unknown URLs', async ({ page, request }) => {
  for (const path of ['/', '/about', '/projects', '/skills', '/experience', '/contact', '/writing']) {
    expect((await page.goto(path))?.status(), path).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }

  await page.goto('/projects');
  await page.getByRole('link', { name: 'View case study for mozayedegar.com' }).click();
  await expect(page.getByRole('heading', { name: 'mozayedegar.com', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Visit project/ })).toHaveAttribute('href', 'https://mozayedegar.com');
  await expect(page.getByText(/Query response times for Elasticsearch search dropped from over 3 seconds to under 1 second/)).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }))
    .toHaveAttribute('aria-current', 'location');

  for (const path of ['/projects/missing', '/writing/missing', '/missing']) {
    expect((await page.goto(path))?.status(), path).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  }
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('/projects/mozayedegar</loc>');
});

for (const width of [1440, 768, 390]) {
  test('main routes fit within ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/about', '/projects', '/projects/tickcar', '/skills', '/experience', '/contact', '/writing']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(width);
    }
  });
}

test('mobile navigation opens, closes on Escape, and follows links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const menu = page.getByRole('button', { name: 'Menu' });
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'About' }).focus();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await nav.getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(nav).toBeHidden();
});

test('published writing is discoverable and draft routes return 404', async ({ page, request }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await nav.getByRole('link', { name: 'Writing' }).click();
  await expect(page.getByRole('link', { name: /Draft test article/ })).toHaveCount(0);
  await page.getByRole('link', { name: /Published test article/ }).click();
  await expect(page.getByRole('heading', { name: 'Published test article' })).toBeVisible();
  expect((await request.get('/writing/qa-draft')).status()).toBe(404);

  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).not.toContain('qa-draft');
  expect(xml).toContain('/writing/qa-published</loc>');
});

test('leaving through the brand resets the mobile menu on browser Back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/about');
  await page.getByRole('button', { name: 'Menu' }).click();
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeVisible();
  await page.locator('.brand').click();
  await expect(page).toHaveURL(/\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/about$/);
  await expect(nav).toBeHidden();
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
});

test('contact exposes email and professional links without a phone number', async ({ page }) => {
  await page.goto('/contact');
  const main = page.getByRole('main');
  await expect(main.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(main.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(main.getByRole('link', { name: 'GitHub' })).toBeVisible();
  await expect(main.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
});

for (const width of [1440, 768, 390]) {
  test('the portrait and featured projects render at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const portrait = page.getByRole('img', { name: 'Portrait of Ehsan EbneKhodadad' });
    await expect(portrait).toBeVisible();
    await expect.poll(() => portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await expect(page.getByRole('heading', { name: 'Ehsan EbneKhodadad' })).toBeVisible();
    const projects = page.getByRole('region', { name: 'Featured projects' });
    await expect(projects.getByRole('link')).toHaveCount(3);
    await expect(projects.getByRole('link', { name: /mozayedegar\.com/ })).toHaveAttribute('href', '/projects/mozayedegar');
  });
}

test('public pages use unique metadata and canonical URLs listed in the sitemap', async ({ page, request }) => {
  const origin = 'https://portfolio.example';
  const xml = await (await request.get('/sitemap.xml')).text();
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain('Sitemap: ' + origin + '/sitemap.xml');
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const routes = ['/', '/about', '/projects', '/skills', '/experience', '/contact',
    '/projects/mozayedegar', '/projects/synaps-ai', '/projects/tickcar', '/writing', '/writing/qa-published'];
  for (const route of routes) {
    expect((await page.goto(route))?.status()).toBe(200);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(new URL(canonical ?? '').href).toBe(origin + route);
    expect(xml).toContain('<loc>' + origin + route + '</loc>');
    titles.add(await page.title());
    descriptions.add(await page.locator('meta[name="description"]').getAttribute('content') ?? '');
  }
  expect(titles.size).toBe(routes.length);
  expect(descriptions.size).toBe(routes.length);
  expect(descriptions.has('')).toBeFalsy();
  expect((await request.get('/social-preview.png')).ok()).toBeTruthy();
});
