import { expect, test } from '@playwright/test';

test('public pages, case studies, sitemap, and unknown URLs', async ({ page, request }) => {
  for (const path of ['/', '/about', '/projects', '/skills', '/experience', '/contact', '/writing']) {
    expect((await page.goto(path))?.status(), path).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }

  await page.goto('/projects');
  await page.getByRole('link', { name: 'View case study for DEN Auction' }).click();
  await expect(page.getByRole('heading', { name: 'DEN Auction', exact: true })).toBeVisible();
  await expect(page.getByText('Query response times dropped from over 3 seconds to under 1 second.')).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }))
    .toHaveAttribute('aria-current', 'location');

  for (const path of ['/projects/missing', '/writing/missing', '/missing']) {
    expect((await page.goto(path))?.status(), path).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
  }
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('/projects/den-auction</loc>');
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

test('hero responds to pointer movement, returns to rest, and supports keyboard and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const hero = page.getByRole('group', { name: 'Explore the application stack' });
  const layers = hero.getByRole('button');
  const bounds = await hero.boundingBox();
  if (!bounds) throw new Error('Missing hero');
  await page.mouse.move(bounds.x + bounds.width * .6, bounds.y + bounds.height * .52);
  await expect(layers.nth(1)).toHaveAttribute('data-active', 'true');
  await expect.poll(() => layers.first().locator('.plane').evaluate((el) => getComputedStyle(el).transform)).not.toBe('matrix(1, 0, 0, 1, 0, 0)');
  await page.mouse.move(0, 0);
  await expect(layers.first()).toHaveAttribute('data-active', 'true');
  await expect(layers.first().locator('.plane')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await layers.nth(2).focus();
  await page.keyboard.press('Enter');
  await expect(layers.nth(2)).toHaveAttribute('aria-pressed', 'true');
  await expect(layers.nth(2).locator('.plane')).toHaveCSS('transform', 'none');
});

test('touch can select a stack layer', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  try {
    await page.goto('/');
    const data = page.getByRole('button', { name: /^Data:/ });
    await data.tap();
    await expect(data).toHaveAttribute('aria-pressed', 'true');
  } finally {
    await page.close();
  }
});

test('writing visibility follows published content, and draft routes return 404', async ({ page, request }) => {
  const withFixtures = process.env.TEST_WRITING_FIXTURES === '1';
  await page.goto('/writing');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveCount(withFixtures ? 1 : 0);
  await expect(page.getByRole('link', { name: /Published test article/ })).toHaveCount(withFixtures ? 1 : 0);
  expect((await request.get('/writing/qa-draft')).status()).toBe(404);
  if (withFixtures) {
    await page.getByRole('link', { name: /Published test article/ }).click();
    await expect(page.getByRole('heading', { name: 'Published test article' })).toBeVisible();
  }
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).not.toContain('qa-draft');
  expect(xml.includes('/writing/qa-published</loc>')).toBe(withFixtures);
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
  test('the stack artwork and labels fit inside their panel at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const stack = page.getByRole('group', { name: 'Explore the application stack' });
    const panel = await stack.boundingBox();
    if (!panel) throw new Error('Missing stack panel');
    const layers = await stack.getByRole('button').all();
    expect(layers).toHaveLength(3);
    let previousBottom = panel.y;
    for (const layer of layers) {
      const row = await layer.boundingBox();
      if (!row) throw new Error('Missing stack layer');
      expect(row.y).toBeGreaterThanOrEqual(previousBottom - 1);
      previousBottom = row.y + row.height;
      for (const selector of ['.plane', '.layer-name', '.layer-tools']) {
        const box = await layer.locator(selector).boundingBox();
        if (!box) throw new Error('Missing ' + selector);
        expect(box.x).toBeGreaterThanOrEqual(panel.x);
        expect(box.x + box.width).toBeLessThanOrEqual(panel.x + panel.width + 1);
        expect(box.y + box.height).toBeLessThanOrEqual(panel.y + panel.height + 1);
      }
    }
    if (width === 1440) expect(panel.y + panel.height).toBeLessThanOrEqual(900);
  });
}
