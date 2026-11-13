# Ehsan EbneKhodadad · Portfolio

Next.js App Router, TypeScript, and local content. Use Node.js 24.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview, set `SITE_URL`, run `npm run build`, then run `npm start`.
Production builds require `SITE_URL` to be the public HTTP(S) origin with no path, query, or fragment. For local production testing, set `SITE_URL=https://portfolio.example` in your shell. Use the real origin for deployment.

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

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

Set `BROWSER_EXECUTABLE` to a local Chromium browser path to use it for the browser suite.

TickCar needs a confirmed personal role and outcome for a fuller case study. The résumé does not supply project screenshots or published articles. The résumé PDF remains outside the application.
