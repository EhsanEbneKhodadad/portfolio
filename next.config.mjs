const buildWorkers = process.env.NEXT_BUILD_WORKERS === undefined
  ? undefined
  : Number(process.env.NEXT_BUILD_WORKERS);
if (buildWorkers !== undefined && (!Number.isSafeInteger(buildWorkers) || buildWorkers < 1)) {
  throw new Error('NEXT_BUILD_WORKERS must be a positive safe integer.');
}

/** @type {import('next').NextConfig} */
const config = {
  ...(buildWorkers !== undefined ? { experimental: { cpus: buildWorkers } } : {}),
  ...(process.env.NEXT_STANDALONE === '1' ? { output: 'standalone' } : {}),
  ...(process.env.PORTFOLIO_BROWSER_FIXTURES === '1'
    ? { distDir: '.next-browser' }
    : { outputFileTracingExcludes: { '/*': ['./tests/fixtures/**/*'] } }),
};

export default config;
