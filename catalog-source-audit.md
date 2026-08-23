# Catalogue Source Audit

Reelwise currently serves recommendations from a hard-coded local `titles` array in `client/src/lib/recommendations.ts`. There is no IMDb, TMDB, OMDb, or other catalogue sync configured in the project, so the recommendation pool is limited to 12 movies and 14 TV shows.

TMDB is suitable for a unified live movie and TV catalogue, but its official documentation states that developers must register for an API key. TVMaze exposes a public JSON REST API without an API key for TV show metadata, but it does not supply a corresponding movie catalogue. Therefore, a complete live solution requires a keyed catalogue provider such as TMDB, ideally accessed through a server-side integration rather than a public browser key.

Live preview verification: Reelwise loaded 72 movie titles from TMDB and changed its label to “Live catalogue.” It surfaced the live title *72 HOURS* and live shelf entries such as *Spider-Man: Brand New Day*, *The Odyssey*, and *Spider-Man: No Way Home*.

Live queue verification: passing on *72 HOURS* advanced to *Avatar Aang: The Last Airbender*. Marking that title as watched added it to the archive, updated the learned taste signal, and advanced to *Backrooms*. This confirms that local pass/watch preferences are applied to the live pool.

Implementation correction: once both TMDB discovery queries are available, the active recommendation queue now contains TMDB records only. The original starter titles remain available only for rendering older local archive entries. The preview was reloaded to apply this correction before validating the TV tab.

TV verification: the corrected TV tab now reports 60 live titles and recommends TMDB’s *Mushoku Tensei: Jobless Reincarnation*, with live shelf entries including *House of the Dragon*, *Lioness*, and *The Mentalist*. The recommendation artwork component now remounts on title change so the poster cannot remain visually stale after traversal.

Poster validation: after forcing a remount, the previous stale artwork no longer remained attached to the next title. The browser console showed no image-load errors; a final settled render check is pending to confirm the newly requested TMDB image paints as expected.

Final visual check: *Spider-Man: Into the Spider-Verse* rendered with its matching TMDB poster after the transition. The finished TV tab likewise rendered *Mushoku Tensei: Jobless Reincarnation* with its matching poster and reported 60 live series titles.

Final TV queue check: passing on *Mushoku Tensei: Jobless Reincarnation* advanced to TMDB’s *Miraculous: Tales of Ladybug & Cat Noir*, confirming continued traversal in the live TV pool. Temporary watched and passed QA state was then cleared.

Stability verification: removing the redundant live-catalogue reset effect eliminated the previous maximum-update-depth condition. A fresh reload settled on TMDB’s *72 HOURS* with a 60-title live movie pool and no new browser-console error.

Mobile QA: at a 390 × 844 viewport, the live TMDB movie card stacked poster, metadata, synopsis, and both primary actions cleanly; the Movies/TV Shows toggle remained visible, and the live shelf displayed as a readable vertical list. The layout did not clip controls or long content at the narrow breakpoint.

Watch Later verification: saving TMDB’s *72 HOURS* incremented the saved count to one, persisted the title in the new list, and advanced the active recommendation to *Avatar Aang: The Last Airbender* without marking the saved title as watched or passed.

Saved-list verification: the Watch Later view displayed *72 HOURS* with its poster, format, genres, Watch now action, and remove control. Choosing Watch now removed it from the saved list and returned it to the active recommendation view, ready to watch.

Persistence checkpoint: *72 HOURS* was saved again and the page was fully reloaded. The next inspection verifies that the saved count and Watch Later entry are restored from local browser storage.

Persistence result: after the reload, the saved count remained at one and *72 HOURS* was still kept out of the active recommendation. Reelwise instead recommended *Avatar Aang: The Last Airbender*, confirming saved titles remain in Watch Later until selected with Watch now.

Watch Later mobile QA: at 390 × 844, the Later navigation affordance and Watch later control were fully visible and comfortably tappable alongside Watched and Not for me. The live card, actions, and shelf remained vertically ordered without clipping or horizontal overflow.

Dark-theme QA: the desktop live recommendation spread retained strong hierarchy, readable metadata, visible signal-red actions, and clear poster contrast on deep charcoal surfaces. At 390 × 844, the dark mobile card, Watch Later control, why-note, and shelf remain fully legible with no clipping or loss of tap targets.

Dark Watch Later QA: the saved-list view retained readable title, metadata, poster, Watch now button, and remove control against the charcoal palette; navigation counts and active-state styling remained clear.

Onboarding verification: a fresh profile opens on the first dark-theme onboarding step with up to three favorite title choices. Selecting *Past Lives* visibly updated the selected state and the counter to one of three.

Onboarding flow verification: Continue reached the second step, which presents five mood directions. Selecting *Ideas after dark* updated its choice state and the counter to one of three while preserving the previously selected favorite.

Seed-ranking verification: completing onboarding with *Past Lives* plus *Ideas after dark* produced a live first recommendation for *Masters of the Universe*, with an 86% score and a transparent explanation citing the selected fantasy and sci-fi signal. The profile was then reloaded to confirm it persists in local browser storage.

Onboarding persistence and mobile QA: after reload, Reelwise returned directly to the seeded recommendation rather than onboarding and retained the same explanation and preference summary. At 390 × 844, the opening selection cards, progress cue, primary action, skip control, and counter remain readable and vertically accessible without horizontal overflow.

Skip-path QA setup: the temporary onboarding profile was removed in the QA browser while keeping watched and Watch Later data intact, then the page was reloaded to return to the first onboarding step.

First skip-path verification: Skip this step advanced from favorite-title selection to the mood step with no favorites selected, confirming that the first onboarding choice is optional.

Final skip-path verification: Skip for now completed onboarding with an empty persisted profile and landed on a valid live recommendation, *Avatar Aang: The Last Airbender*, with the neutral 78% explanation. Both onboarding steps are therefore optional and safe to bypass.

Final QA reset: the temporary profile was cleared after validation, and the live preview now opens again at the first onboarding step for a clean first-run experience.

Recommendation hierarchy verification: with a temporary seed profile, the live screen showed *Picked from your signal* directly above the main *One good choice* heading. The side-rail browsing copy, the “A recommendation for tonight” label, and the “More from the shelf / Keep the evening open” header copy were removed while the shelf cards remained available.

Recommendation hierarchy QA: the stripped-back layout preserved legible navigation, signal-first hierarchy, recommendation controls, and shelf cards. The temporary seed profile was cleared after review so the QA browser returns to the clean onboarding entry point.

Focused recommendation verification: with a temporary seed profile, the live layout showed only the current title card, format marker, Surprise me control, actions, Why this note, and current signal. The One good choice masthead, the Picked from your signal label, and the below-card supplemental title shelf were absent.

Focused-layout mobile QA: the latest mobile render remains vertically readable, with no horizontal overflow or layout breakage after removing the recommendation masthead and supplemental shelf.

Recommendation alignment verification: after moving the desktop Movies/TV shows control into the header, the recommendation’s Movie marker and card begin at the same vertical level as the Your room rail content, eliminating the former in-column format-control gap. The header controls, recommendation actions, Why this panel, and signal summary remain visible.

Alignment mobile QA: the mobile first-run surface remains visually stable. The format-control relocation is desktop-only, leaving the original mobile layout and its responsive control treatment intact.

Final vertical-spacing verification: reducing the desktop top padding from 48px to 28px raises the recommendation marker/card, Your room rail, and right-hand Why this panel together toward the header. A temporary preference profile rendered the live recommendation successfully, and the three areas now share the same tightened upper alignment with no overlap or lost controls. The temporary profile was cleared immediately after capture; the preview remains on clean first-run onboarding.

Composition refinement verification: the desktop recommendation grid now reserves 48px of right-side breathing room and uses a 32px card-to-note gap at wide layouts. The featured card narrowed to 669px in the captured 1280px preview, while the Why this panel shifted left and retained a clear 44px visual gap from the card. The controls, explanation, signal summary, and card contents remained fully visible; the mobile onboarding layout was unchanged.

TMDB rating verification: live discovery now maps TMDB’s `vote_average` into a one-decimal rating, rendered as a source-labelled TMDB badge at the top-right of the focused recommendation. In the validated live recommendation, the desktop badge read “TMDB 7.4” beside Surprise me; at 375px it stayed visible opposite the Movie label, above the card, without affecting the mobile action stack. Titles without a usable rating omit the badge rather than presenting a placeholder.

Credits verification: the focused live recommendation now loads credits on demand rather than expanding every catalogue discovery request. In the desktop validation, the card rendered Director “Olivia Wilde” and main cast “Seth Rogen · Olivia Wilde · Penélope Cruz” beneath the synopsis. At 375px, the same credits stacked cleanly below the synopsis and before the action controls. Movies use TMDB’s Director credit; series use TMDB’s Created by credit where present, with a director fallback. Empty credit data omits the corresponding content rather than presenting placeholder names.
