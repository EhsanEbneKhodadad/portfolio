/** @type {import('next').NextConfig} */
const config = {
  ...(process.env.PORTFOLIO_BROWSER_FIXTURES === '1' && { distDir: '.next-browser' }),
};

export default config;
