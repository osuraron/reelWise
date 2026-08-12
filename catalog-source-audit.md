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
