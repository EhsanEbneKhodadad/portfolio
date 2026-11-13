export function getSiteOrigin(value: string | undefined, production: boolean): string {
  if (!value && !production) return 'http://localhost:3000';

  const url = value && /^https?:\/\/[^/?#\\]+\/?$/i.test(value)
    ? URL.parse(value)
    : null;
  const host = url?.hostname.replace(/\.$/, '');
  const local = host === 'localhost' || host?.endsWith('.localhost') ||
    host?.startsWith('127.') && /^127\.(?:\d+\.){2}\d+$/.test(host) ||
    host === '0.0.0.0' || host === '[::]' || host === '[::1]' ||
    host?.startsWith('[::ffff:7f');

  if (!url || url.username || url.password || (production && local)) {
    throw new Error('Set SITE_URL to the public HTTP(S) origin of the portfolio, for example https://portfolio.example.');
  }

  return url.origin;
}
