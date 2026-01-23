# QA Checklist (GitHub Pages) — Webisko/multiserwis-kutno

This repo is deployed to GitHub Pages under a base path:

- `/multiserwis-kutno/`

Vite is configured with:
- `base: '/multiserwis-kutno/'` in production
- `build.outDir = 'docs'`

Use this checklist after any change that could affect UI, assets, routing, or deployment.

---

## A. Local checks (before pushing)

1. Install deps (once):
   - `npm install`

2. Production build succeeds:
   - `npm run build`

3. Preview the production build locally:
   - `npm run preview`
   - Open the preview URL and do a quick smoke test (see section C).

---

## B. GitHub Pages checks (after deploy)

Open the deployed site (GitHub Pages URL) and verify:

1. **Home page loads**
   - No blank page.
   - No infinite loading.

2. **Assets load correctly**
   - Open DevTools → Network → refresh
   - Verify no `404` for `.js`, `.css`, images, fonts.

3. **Styles and icons render**
   - Layout looks correct (CSS loaded).
   - Icons/images appear.

4. **Console is clean**
   - DevTools → Console
   - No critical errors (red) during page load and basic interactions.

5. **Navigation sanity**
   - Click a few key navigation paths and buttons.
   - Verify expected content appears and links do not break.

6. **Refresh behavior (only if you use client-side routing)**
   - Navigate to a non-home route
   - Press F5 / reload
   - Confirm it still loads (GitHub Pages often needs special handling for SPA routing).

7. **Responsiveness**
   - DevTools device toolbar: test a narrow width (mobile).
   - Ensure no obvious layout break.

---

## C. “Most common GitHub Pages breakages” (what this catches)

- Wrong base path (assets requested from `/assets/...` instead of `/multiserwis-kutno/assets/...`)
- Build output not in `docs/`
- Broken relative links
- SPA refresh 404s