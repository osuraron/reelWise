# Reelwise QA Notes

- TypeScript check passed with no errors.
- Production build passed with Vite and esbuild.
- Desktop visual check at 1280px follows the Soft Signal direction: parchment background, editorial serif headline, left navigation rail, framed recommendation card, right-side rationale note, and restrained signal-red actions.
- Mobile visual check at 390px keeps the format tabs, recommendation card, watched and skip controls, rationale note, shelf, and archive entry point usable in a single-column layout.
- Live preview smoke test passed: clicking “I watched this” moved Past Lives into the archive, refreshed the recommendation to Perfect Days, changed the archive count to 1, and updated the signal summary with Romance and Drama.
- Temporary browser localStorage test data was cleared after the smoke test so the app opens clean for the user.
- One non-blocking build warning remains: the generated paper texture is an absolute runtime asset URL and is intentionally left unresolved at build time; the live preview resolves it correctly.
