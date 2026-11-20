export const locales = ['en', 'fa', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const languageNames: Record<Locale, string> = { en: 'English', fa: 'فارسی', tr: 'Türkçe' };
export const translatedPaths = ['/', '/about', '/projects', '/skills', '/experience', '/contact', '/writing'] as const;

export function localizedPath(path: string, locale: Locale) {
  return locale === 'en' ? path : '/' + locale + (path === '/' ? '' : path);
}

export function translationPath(path: string) {
  const englishPath = /^\/(fa|tr)$/.test(path) ? '/' : path.replace(/^\/(fa|tr)(?=\/)/, '');
  const translated = translatedPaths.some(route => route === englishPath) ||
    /^\/(projects|writing)\/[^/]+$/.test(englishPath);
  return translated ? englishPath : null;
}

export function pathLocale(path: string): Locale {
  const segment = path.split('/')[1];
  return locales.find(locale => locale === segment) ?? 'en';
}
