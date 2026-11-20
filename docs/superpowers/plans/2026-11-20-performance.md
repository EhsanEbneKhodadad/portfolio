# Portfolio performance fixes

Goal: Remove unnecessary locale-font downloads and prioritize the hero portrait while preserving all languages and browser behavior.

Architecture: Keep the existing Next.js layouts and client controls. Convert existing licensed variable fonts to WOFF2 without removing glyphs. Disable automatic cross-layout font preloads; CSS loads the font used by the active locale. Use eager, high-priority hero images as recommended by the installed Next.js documentation.

Constraints: Work in D:\PersonalProjects\portfolio. No staging or commits for this task. Keep language coverage and font licenses. Do not remove framework polyfills or runtime code without compatibility evidence.

- [x] Run baseline lint, types, unit and browser tests; investigate failures.
- [x] Add cold-load regression checks for locale-specific WOFF2 requests and portrait priority; confirm they fail before fixes.
- [x] Convert fonts, update locale layouts, and prioritize all three hero portraits.
- [x] Run production browser suite, lint, typecheck, unit tests, and normal production build.
- [x] Inspect optimized production requests and run local desktop/mobile Lighthouse checks. Report local results separately from live deployment.

Verification: baseline lint/types, 6 unit tests and 21 browser tests passed. The 3 new performance checks failed on missing image priority, then all 24 passed after the fixes. Normal production build passed. Font glyph orders and variable axes match the originals.

Ruling: preserve framework runtime/polyfills because the unused/legacy JavaScript warning targets Next.js code, with no application dependency that can be safely removed.

Additional test-environment fix: default Playwright Chromium was absent; downloading it returned a regional 403. Added local Windows installed-Chrome fallback, preserving explicit overrides and CI defaults. Standard npm run test:browser passed all 24 checks without BROWSER_EXECUTABLE; lint and typecheck passed again.

Local production Lighthouse (not deployed-network measurements): English desktop 100; English mobile 96; Persian mobile 94; Turkish mobile 90. Accessibility, best practices and SEO 100 throughout. English loaded no fonts, Persian only Vazirmatn WOFF2, Turkish only SourceSans3 WOFF2. Font files reduced from 241328/646340 to 110976/169808 bytes. Reports: OS temp portfolio-lighthouse-fixed-20261120.
