/** @type {import('next').NextConfig} */
const config = {
  ...(process.env.NEXT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  ...(process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
    ? { distDir: '.next-browser' }
    : { outputFileTracingExcludes: { '/*': ['./tests/fixtures/**/*'] } }),
};

export default config;
