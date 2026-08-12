# Reelwise — Design Direction

## Three Possible Approaches

### Theme Name: Midnight Repertory
Very Brief Intro: A dark, cinematic interface with editorial typography, warm film-grain texture, and restrained amber accents. It treats each recommendation like a carefully selected screening.
Probability: 0.07

### Theme Name: Soft Signal
Very Brief Intro: A pale, tactile interface inspired by gallery catalogues and printed ticket stubs, pairing chalky neutrals with one sharp tomato-red signal color. It feels calm, collected, and quietly premium.
Probability: 0.04

### Theme Name: Afterglow Index
Very Brief Intro: A bold, art-directed system built around oversized poster crops, electric cobalt blocks, and playful kinetic transitions. It feels like an experimental film journal rather than a utility.
Probability: 0.08

## Chosen Direction: Soft Signal

### Design Movement
Contemporary editorial minimalism with references to Swiss print systems, independent cinema programmes, and tactile paper ephemera. The interface should feel like a small, beautifully designed film journal that happens to make a decision for you.

### Core Principles
1. **Quiet confidence:** use generous negative space, restrained ornament, and a clear visual hierarchy instead of decorative overload.
2. **Editorial contrast:** pair a warm, expressive display face with a practical grotesk for metadata and controls.
3. **Tactile clarity:** use paper-like surfaces, hairline rules, subtle grain, and understated shadows to create depth without glossy UI effects.
4. **A useful point of view:** recommendations should feel opinionated and specific, with concise reasoning that tells the user why this title is here.

### Color Philosophy
The foundation is a warm parchment field rather than stark white, making the app feel human and print-like. Charcoal ink provides authority and contrast. A signature signal red is reserved for the decision moment, watched-state changes, active tab, and small moments of emphasis. Muted moss and clay tones can support secondary metadata, but never compete with the recommendation.

### Layout Paradigm
An asymmetric editorial spread: a narrow left rail for the product mark and archive, a broad recommendation stage, and a right-side “why this” note that behaves like a margin annotation. On smaller screens the rail collapses into a compact header, while the recommendation remains visually dominant. Avoid a generic centered dashboard; let the main title and poster crop create a natural reading path.

### Signature Elements
1. A thin red “signal line” that travels through the header, active tabs, and recommendation reasoning.
2. Small uppercase editorial labels with generous tracking, like a cinema programme.
3. Poster artwork framed like a print object: slight offset, quiet shadow, and a caption-like metadata strip.

### Interaction Philosophy
Every action should feel reversible and legible. “I watched this” moves the title into the archive with a small, satisfying paper-slip motion and immediately refreshes the recommendation. “Not for me” skips without judgment. Hover states should reveal context, not decoration; focus states should be visible and warm.

### Animation
Use short, physical transitions under 260ms. Recommendation changes use a soft crossfade with a 6px horizontal settle, not a theatrical card flip. The watched action briefly compresses the poster frame and sends a narrow red signal line toward the archive count. Archive items enter in 40ms staggered increments. Respect `prefers-reduced-motion` by keeping state changes instant and preserving opacity changes only when helpful.

### Typography System
Use **DM Serif Display** for the large recommendation title and section headlines, giving the product a distinctive literary voice. Use **DM Sans** for navigation, metadata, controls, and body copy. Headlines should use tight line-height and normal or medium weight; metadata should be uppercase, 0.14em tracking, and 11–12px. Keep body copy between 14–16px with a comfortable 1.55 line-height.

### Brand Essence
A personal watchlist with a point of view, for people who want one great thing to watch next without browsing forever.

Personality adjectives: **discerning, calm, human**.

### Brand Voice
Headlines and CTAs should sound like a friend with impeccable taste: concise, specific, and lightly editorial. Avoid generic product language and hype.

Example lines:
- “One good choice for tonight.”
- “You liked the slow burn. Try this.”

### Wordmark & Logo
The mark is a simple signal glyph: a vertical cinema-frame bracket interrupted by one horizontal red line, suggesting both a film strip and a decision marker. The wordmark should be set in DM Serif Display with a custom red signal slash between “Reel” and “wise”; the graphic mark itself should remain legible without text and work as a favicon.

### Signature Brand Color
**Signal Red — `#D94F3D`**. It is warm enough to feel human and archival, but distinct enough to mark the app’s moments of decision. Use it sparingly so every red accent means “this is the next thing to do.”

## Implementation Notes

- Frontend-only persistence uses `localStorage` so the watched archive survives reloads without requiring sign-in.
- The recommendation engine scores unseen titles against watched genres, tone tags, and format preferences, then applies a small freshness and diversity adjustment.
- Seed content is intentionally curated, not presented as live catalog data. The UI will clearly communicate that the current collection is the app’s starter library.
- The main interface will support separate **Movies** and **TV shows** tabs, an archive view, “I watched this,” “Not for me,” and “Surprise me” actions.

## Style Decisions

- Prefer a warm editorial light theme over dark neon or generic dashboard styling.
- Treat the recommendation as the hero, not a browsing grid.
- Use red only for actions, active states, and the app’s signature signal line.
