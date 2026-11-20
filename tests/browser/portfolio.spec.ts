import { expect, test } from '@playwright/test';

test('public pages, case studies, sitemap, and unknown URLs', async ({ page, request }) => {
  for (const path of ['/', '/about', '/projects', '/skills', '/experience', '/contact']) {
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
    for (const path of ['/', '/about', '/projects', '/projects/tickcar', '/skills', '/experience', '/contact']) {
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

const localizedRoutes = ['/', '/about', '/projects', '/skills', '/experience', '/contact',
  '/projects/mozayedegar', '/projects/synaps-ai', '/projects/tickcar', '/writing', '/writing/qa-published'];
const faPath = (path: string) => '/fa' + (path === '/' ? '' : path);

test('language versions have self canonicals, reciprocal alternates and localized identity', async ({ page, request }) => {
  const origin = 'https://portfolio.example';
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const route of localizedRoutes) {
    for (const locale of ['en', 'fa', 'tr']) {
      const path = locale === 'en' ? route : '/' + locale + (route === '/' ? '' : route);
      expect((await page.goto(path))?.status(), path).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr');
      expect(new URL(await page.locator('link[rel="canonical"]').getAttribute('href') ?? '').href).toBe(origin + path);
      for (const [language, href] of [['en', route], ['fa', faPath(route)], ['tr', '/tr' + (route === '/' ? '' : route)], ['x-default', route]]) {
        expect(new URL(await page.locator('link[rel="alternate"][hreflang="' + language + '"]').getAttribute('href') ?? '').href).toBe(origin + href);
      }
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', ({ en: 'en_US', fa: 'fa_IR', tr: 'tr_TR' } as Record<string, string>)[locale]);
      expect(sitemap).toContain('<loc>' + origin + path + '</loc>');
      titles.add(await page.title());
      descriptions.add(await page.locator('meta[name="description"]').getAttribute('content') ?? '');
      if (route === '/' || route === '/about') {
        const content = await page.locator('main').innerText();
        if (locale === 'fa') {
          expect(content).toContain('احسان ابن خداداد');
          expect(await page.title()).toContain('احسان ابن خداداد');
        } else {
          expect(content).not.toContain('احسان ابن خداداد');
          expect(await page.title()).not.toContain('احسان');
        }
      }
      if (route === '/about') {
        const entity = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes =>
          nodes.map(node => JSON.parse(node.textContent ?? '{}')).find(data => data['@type'] === 'ProfilePage'));
        expect(entity.inLanguage).toBe(locale);
        expect(entity.mainEntity['@id']).toBe(origin + '/about#person');
        expect(entity.mainEntity.name).toBe(locale === 'fa' ? 'احسان ابن خداداد' : 'Ehsan EbneKhodadad');
        expect(entity.mainEntity.url).toBe(origin + path);
      }
    }
  }
  expect(titles.size).toBe(localizedRoutes.length * 3);
  expect(descriptions.size).toBe(localizedRoutes.length * 3);
  expect(descriptions.has('')).toBeFalsy();
  expect(sitemap).toContain('hreflang="fa"');

});

for (const width of [1440, 768, 390]) {
  test('Persian navigation and layout at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of localizedRoutes) {
      await page.goto(faPath(route));
      expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(width);
      await page.getByRole('button', { name: 'انتخاب زبان' }).click();
      await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', route);
      await page.keyboard.press('Escape');
      if (route === '/projects') {
        for (const image of await page.locator('img.project-screenshot').all()) {
          await image.scrollIntoViewIfNeeded();
          await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
        }
      }
    }
    await page.goto('/fa');
    if (width <= 900) {
      await page.getByRole('button', { name: 'منو', exact: true }).click();
    }
    const navigation = page.getByRole('navigation', { name: 'ناوبری اصلی' });
    await expect(navigation.getByRole('link', { name: 'خانه', exact: true })).toHaveAttribute('aria-current', 'page');
    await navigation.getByRole('link', { name: 'درباره من', exact: true }).click();
    await expect(page).toHaveURL('/fa/about');
    if (width <= 900) {
      await page.getByRole('button', { name: 'منو', exact: true }).click();
    }
    await expect(navigation.getByRole('link', { name: 'خانه', exact: true })).not.toHaveAttribute('aria-current');
    await page.getByRole('button', { name: 'انتخاب زبان' }).click();
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.getByRole('button', { name: 'Choose language' }).click();
    await page.getByRole('link', { name: 'فارسی', exact: true }).click();
    await expect(page).toHaveURL('/fa/about');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    for (const path of ['/fa/missing', '/fa/projects/missing', '/fa/writing/missing']) {
      expect((await page.goto(path))?.status()).toBe(404);
      await expect(page.getByRole('heading', { name: 'صفحه پیدا نشد' })).toBeVisible();
      await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', /noindex/);
    }
  });
}


for (const width of [1440, 768, 390]) {
  test('Turkish pages, fonts and language dropdown at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of localizedRoutes) {
      const path = '/tr' + (route === '/' ? '' : route);
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
      await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.locator('body').evaluate(element => getComputedStyle(element).getPropertyValue('--font-locale'))).toMatch(/sourceSans/i);
      await expect(page.getByRole('link', { name: 'Türkçe', exact: true })).toHaveCount(0);
      await page.getByRole('button', { name: 'Dil seçin' }).click();
      await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', route);
      await expect(page.getByRole('link', { name: 'فارسی', exact: true })).toHaveAttribute('href', faPath(route));
      await expect(page.getByRole('link', { name: 'Türkçe', exact: true })).toHaveAttribute('aria-current', 'true');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Dil seçin' })).toBeFocused();
      await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveCount(0);
    }
    await page.goto('/tr/about');
    await page.getByRole('button', { name: 'Dil seçin' }).click();
    await page.getByRole('link', { name: 'فارسی', exact: true }).click();
    await expect(page).toHaveURL('/fa/about');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('body').evaluate(element => getComputedStyle(element).getPropertyValue('--font-locale'))).toMatch(/vazirmatn/i);
    await page.getByRole('button', { name: 'انتخاب زبان' }).click();
    await page.getByRole('heading', { level: 1 }).click();
    await expect(page.getByRole('button', { name: 'انتخاب زبان' })).toHaveAttribute('aria-expanded', 'false');
    await page.getByRole('button', { name: 'انتخاب زبان' }).click();
    await page.getByRole('link', { name: 'Türkçe', exact: true }).click();
    await expect(page).toHaveURL('/tr/about');
    if (width <= 900) await page.getByRole('button', { name: 'Menü', exact: true }).click();
    const nav = page.getByRole('navigation', { name: 'Ana gezinme' });
    await expect(nav.getByRole('link', { name: 'Ana sayfa', exact: true })).not.toHaveAttribute('aria-current');
    await nav.getByRole('link', { name: 'Projeler', exact: true }).click();
    await expect(page).toHaveURL('/tr/projects');
    for (const path of ['/tr/missing', '/tr/projects/missing', '/tr/writing/missing']) {
      expect((await page.goto(path))?.status()).toBe(404);
      await expect(page.getByRole('heading', { name: 'Sayfa bulunamadı' })).toBeVisible();
    }
  });
}

test('language dropdown is keyboard accessible and closes after leaving it', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Choose language' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'English', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Türkçe', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});


test('localized home copy translates the English source without added biography', async ({ page }) => {
  const copy = {
    en: [
      'I build production web applications with React, Next.js, TypeScript, ASP.NET Core, and PostgreSQL.',
      'I’m a full-stack engineer. I work on everything from the screens people use to the systems behind them.',
    ],
    fa: [
      'با React، Next.js، TypeScript، ASP.NET Core و PostgreSQL برنامه‌های تحت وب عملیاتی می‌سازم.',
      'من مهندس فول‌استک هستم. از صفحه‌هایی که کاربران استفاده می‌کنند تا سیستم‌های پشت آن‌ها، روی همه بخش‌ها کار می‌کنم.',
    ],
    tr: [
      'React, Next.js, TypeScript, ASP.NET Core ve PostgreSQL ile üretim ortamında kullanılan web uygulamaları geliştiriyorum.',
      'Bir full stack mühendisiyim. Kullanıcıların kullandığı ekranlardan onların arkasındaki sistemlere kadar her alanda çalışıyorum.',
    ],
  };
  for (const locale of ['en', 'fa', 'tr'] as const) {
    await page.goto(locale === 'en' ? '/' : '/' + locale);
    await expect(page.locator('.hero-copy .lead')).toHaveText(copy[locale]);
  }
});




test('Writing pages remain available and display only published localized articles', async ({ page, request }) => {
  for (const [prefix, label] of [['', 'Writing'], ['/fa', 'نوشته‌ها'], ['/tr', 'Yazılar']]) {
    const response = await page.goto(prefix + '/writing');
    expect(response?.status()).toBe(200);
    await expect(page.locator('.split-row')).toHaveCount(1);
    await expect(page.locator('header.site-header a[href="' + prefix + '/writing"]')).toHaveText(label);
    await page.locator('.split-row h2 a').click();
    await expect(page).toHaveURL(prefix + '/writing/qa-published');
    await expect(page.locator('.markdown')).toBeVisible();
    expect((await request.get(prefix + '/writing/elasticsearch-auction-search')).status()).toBe(404);
    expect((await request.get(prefix + '/writing/qa-draft')).status()).toBe(404);
  }
});

for (const width of [768, 900]) {
  test('tablet header fits wider system fonts at ' + width + ' px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.addStyleTag({ content: '.site-header { font-family: Verdana, Arial, sans-serif; letter-spacing: .15px; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    await expect(menu).toBeVisible();
    await menu.click();
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav).toBeVisible();
    const bounds = await nav.boundingBox();
    expect(bounds?.x).toBeGreaterThanOrEqual(0);
    expect((bounds?.x ?? width) + (bounds?.width ?? width)).toBeLessThanOrEqual(width);
    await nav.getByRole('link', { name: 'About', exact: true }).click();
    await expect(page).toHaveURL('/about');
    await expect(nav).toBeHidden();
  });
}
