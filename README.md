# GuguReview

A small, mobile-first review builder for Leeds City Dental Care. React, TypeScript and Vite; no backend or AI. Answers stay in memory and reset on refresh.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` checks types and creates `dist/`; `npm run preview` serves the build. `npm test` checks review generation (Node 22.6+).

`GOOGLE_REVIEW_URL` in `src/config.ts` opens the direct Leeds City Dentalcare review form, using the Place ID resolved from the official website's Google profile link (`https://g.page/leeds-city-dentalcare/review/`). Google may require sign-in first. Update this constant to change the destination. The practice name is configured in the same file.

Positive feedback follows seven questions. Negative feedback shows a contact placeholder. Multiple team members and qualities can be selected; qualities can be skipped. No answers are reflected honestly, and unspecified details, pronouns, and recommendations are never invented. The final text can be edited and copied. The Google button opens a new tab and attempts to copy the edited text; posting is done by the user on Google. Clipboard failures fall back to selecting the review for manual copying.

## Branding

Official logo: `public/brand/leeds-city-dentalcare-logo.svg`, sourced from https://www.leedscitydentalcare.co.uk/retina-images/logo.svg. Accent colours follow the practice website stylesheet: lime `#91c73f`, orange `#f26532`, grey `#5f626c`, and pale green `#f6fbef`.

## Local visual editor

The supplied editor is adapted for Vite through `local-visual-editor/vite.ts`. Run `npm run dev` and open localhost to see the **Local page editor** panel. Click **Edit page**, select outlined static text, then **Save to source**. To undo a saved change, enter Edit page again and select **Undo last source save**.

Editable components live in `src/components/`; the review app is `src/components/App.tsx`. Dynamic question text and answer arrays are intentionally not mapped by this editor. The panel and source markers are omitted from production builds; the source-writing API exists only on the local development server. Do not run the bundled Next.js installer on this Vite project.
# GuguReview
