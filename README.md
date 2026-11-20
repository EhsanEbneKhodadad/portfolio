# Ehsan EbneKhodadad · Portfolio

Next.js App Router, TypeScript, and local content. Use Node.js 24.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview, copy `.env.example` to `.env.local`, run `npm run build`, then run `npm start`.
Production builds require `SITE_URL` to be the public HTTP(S) origin with no path, query, or fragment. The sample environment file uses `https://ebnekhodadad.ir`. Update it if the deployment origin changes.

## Update content

- Edit `src/content/profile.ts` for the name, short bio, contact details, and professional links. Edit `src/features/about/about.tsx` for the longer bio and education.
- Edit `src/content/experience.ts` and `src/content/skills.ts` for the experience and skills pages.
- Add a record in `src/content/projects.ts` with a unique, lowercase, hyphenated slug. The list, case study, and sitemap update on rebuild. Include role and impact when supported.
- Add a Markdown file to `content/writing/`. The filename becomes the URL slug. Set `draft: false` and rebuild to publish. Use the following frontmatter with a quoted date.

```md
---
title: "Article title"
summary: "One sentence about the article."
date: "2026-11-13"
draft: true
---

Article text.
```

**Keep private drafts outside the public repository.** Use a local folder outside the checkout or a private repository. The `draft: true` flag hides an article from the site, while anyone with access to the repository can read committed Markdown, including its Git history. Copy an article into `content/writing/` when it is ready to share.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

The browser suite builds with controlled articles from `tests/fixtures/writing/` in a separate `.next-browser/` directory. Set `PLAYWRIGHT_PORT` if port 3100 is occupied.

On local Windows runs, the suite uses installed Google Chrome if Playwright's bundled Chromium is missing. CI continues to use the bundled browser. Set `BROWSER_EXECUTABLE` to explicitly select a local Chromium browser path.

TickCar needs a confirmed personal role and outcome for a fuller case study. The résumé does not supply project screenshots or published articles. The résumé PDF remains outside the application.

## Search and deployment

Use the preferred HTTPS origin for SITE_URL. Configure HTTP and alternate-host redirects at the hosting provider. Set SITE_PREVIEW=1 before building nonproduction previews to emit noindex on public routes and omit the sitemap entries. Vercel preview builds are detected automatically.


## Docker / Hamravesh

The multi-stage Dockerfile uses Node 24 Alpine from HamDocker, Hamravesh's npm mirror, and its Alpine package mirror. The final image runs Next.js standalone as the non-root node user and listens on 0.0.0.0:3000. No database is required.

Build and run:

```sh
docker build --build-arg SITE_URL=https://ebnekhodadad.ir -t portfolio:latest .
docker run -d --name portfolio --restart unless-stopped -p 127.0.0.1:3000:3000 portfolio:latest
```

The local port binding is intended for a reverse proxy on the same server. Terminate HTTPS at the proxy. For Hamravesh, select this Dockerfile and configure the application's HTTP port as 3000; the platform handles routing and HTTPS. Run command is already set by the image.

SITE_URL is a **build argument** because canonical URLs and metadata are prerendered. Rebuild when changing the public domain; changing only a container environment variable is insufficient. For preview images, also pass --build-arg SITE_PREVIEW=1. Runtime PORT may be overridden; the image's health check follows it.

Mirror defaults (override with docker build --build-arg NAME=value):

- NODE_IMAGE=hub.hamdocker.ir/library/node:24-alpine
- NPM_REGISTRY=https://repo.hmirror.ir/npm/
- ALPINE_MIRROR=https://repo.hmirror.ir/apk

The npm install explicitly replaces registry hosts from the lockfile and keeps integrity verification. Mirrors must contain the locked package versions and selected Node image tag. Official fallback values are node:24-alpine, https://registry.npmjs.org/, and https://dl-cdn.alpinelinux.org/alpine respectively.

Local .env files, .npmrc credentials, dependencies, test fixtures, and old builds are excluded by .dockerignore. Public assets, optimized static files, and writing content are included in the runtime image. Keep private drafts outside the repository as described above.

Mirror reference: [Hamravesh registry and package mirrors](https://hamravesh.com/blog/container-registry-mirroring-and-caching/).
