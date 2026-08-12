# Reelwise QA Notes

- TypeScript check passed with no errors.
- Production build passed with Vite and esbuild.
- Desktop visual check at 1280px follows the Soft Signal direction: parchment background, editorial serif headline, left navigation rail, framed recommendation card, right-side rationale note, and restrained signal-red actions.
- Mobile visual check at 390px keeps the format tabs, recommendation card, watched and skip controls, rationale note, shelf, and archive entry point usable in a single-column layout.
- Live preview smoke test passed: clicking “I watched this” moved Past Lives into the archive, refreshed the recommendation to Perfect Days, changed the archive count to 1, and updated the signal summary with Romance and Drama.
- Temporary browser localStorage test data was cleared after the smoke test so the app opens clean for the user.
- One non-blocking build warning remains: the generated paper texture is an absolute runtime asset URL and is intentionally left unresolved at build time; the live preview resolves it correctly.

## Skip-flow bug investigation

The live preview reproduced the reported interaction from a clean archive. Clicking “Not for me” did persist the pass state and changed the recommendation from Past Lives to Perfect Days, but the implementation waits 120ms before updating `currentId`. That delayed state handoff is unnecessarily fragile and can make a click appear unresponsive if a timer is interrupted or multiple actions are taken quickly. The fix will update the next title immediately while retaining the short visual transition.

The fixed build passed TypeScript and production build checks. The live preview was reset and confirmed to start with Past Lives and an empty archive, ready for the final skip-flow test.

Final interaction verification passed: “Not for me” immediately changed Past Lives to Perfect Days and displayed the “Passed for now” feedback. “I watched this” then added Perfect Days to the archive, incremented the archive count to 1, updated the taste signal, and advanced to After Yang. Temporary browser state will be cleared before delivery.

## Variety expansion investigation

The updated live preview now reports 12 movie titles and 14 TV show titles. The movie tab loaded Anatomy of a Fall, while the TV tab loaded Field Notes and displayed additional series such as The Bear, Slow Horses, and Station Eleven, confirming the catalog expansion is live.

Repeated TV traversal test passed: passing on Field Notes moved to Severance, then passing on Severance moved to Slow Horses. The shelf updated to remove passed titles and reveal other unseen series, confirming the new pool-first traversal is working.

Movie traversal test also advanced cleanly: Anatomy of a Fall moved to Past Lives on pass, and the UI still shows a 12-title movie catalog. Additional passes will continue through the newly added titles rather than stopping at the original five-title set.

Completed movie traversal test passed: after passing on Anatomy of a Fall, Past Lives, and Perfect Days, the recommendation advanced to The Holdovers. The catalog is no longer limited to the original repeat loop.
