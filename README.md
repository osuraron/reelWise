# Reelwise

**Reelwise** is a focused movie and TV recommendation room. It combines live TMDB discovery with a lightweight local preference model, then presents one considered recommendation at a time rather than an endless browsing grid.

The interface is deliberately cinematic and minimal: a near-black visual system, warm editorial typography, restrained red accents, and a recommendation-first layout. A viewer can choose between movies and TV shows, record what they have watched, defer titles for later, and pass on titles without losing them permanently.

## Product features

| Area | What Reelwise provides |
|---|---|
| **Live discovery** | Movie and TV pools are fetched server-side from TMDB discovery endpoints, cached briefly, and kept separate by format. |
| **Personalized ranking** | Recommendations blend watched-title genres and tags with the onboarding taste profile. |
| **Onboarding signal** | A two-step opening flow captures favorite titles and viewing directions to make the first recommendation less random. |
| **Watched archive** | Marking a title watched saves it locally and excludes it from future active recommendations. |
| **Passed titles** | “Not for me” titles move to the back of the queue rather than disappearing permanently. |
| **Watch later** | Saved titles remain in a persistent Watch Later list until the viewer chooses to watch them. |
| **Title context** | The focused card can show the TMDB community rating, director or series creator, and principal cast. |
| **Responsive design** | The recommendation experience, onboarding, archive, and saved list are designed for desktop and mobile layouts. |
| **Resilient fallback** | If the live catalogue is temporarily unavailable, the app uses a small built-in catalogue so the experience remains usable. |

> TMDB data is requested from the server side so the TMDB key is never placed in the client bundle. See TMDB’s API documentation for provider terms and attribution requirements.[1]

## Technology stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 7, Wouter, React Query, Tailwind CSS 4 |
| **UI** | Radix UI primitives, Lucide icons, Sonner notifications, custom editorial CSS |
| **API contract** | tRPC 11 with SuperJSON and Zod validation |
| **Local server** | Node.js, Express 4, tRPC Express middleware |
| **Data access** | TMDB API, Drizzle ORM, MySQL-compatible database support |
| **Identity and storage** | Manus OAuth integration and S3-compatible storage helpers for the managed environment |
| **Testing and quality** | Vitest, TypeScript `--noEmit`, Vite production build, esbuild server bundle |
| **Package manager** | pnpm 10 |
| **Vercel support** | Vercel catch-all tRPC function at `api/trpc/[...trpc].ts` for the live catalogue and credits routes |

## Architecture

```text
React client
  └─ React Query + tRPC client (/api/trpc)
       ├─ Local recommendation state
       │    └─ watched / passed / watch-later / taste profile in localStorage
       └─ Server-side catalogue procedures
            ├─ TMDB discovery: movies and TV shows
            ├─ TMDB detail + credits lookup
            └─ 15-minute in-memory cache

Local runtime: Express + tRPC
Vercel runtime: api/trpc/[...trpc].ts serverless function
```

The ranking model is intentionally understandable. Watched titles and onboarding choices contribute genre and tag signals; fresh unseen titles are prioritized, while passed titles return only after newer choices have been considered. The browser keeps personal viewing state in local storage, so no sign-in is necessary for the core recommendation flow.

## Getting started

### Prerequisites

Use **Node.js 22.x** and **pnpm 10.x**. You also need a TMDB API key for live discovery.

```bash
git clone https://github.com/osuraron/reelWise.git
cd reelWise
pnpm install --frozen-lockfile --prod=false
```

Create local environment configuration without committing it. At minimum, add the private TMDB key:

```bash
TMDB_API_KEY=your_tmdb_api_key
```

Then start the development server:

```bash
pnpm dev
```

The development server starts the Express/tRPC runtime and Vite integration together.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Run the local development server. |
| `pnpm test` | Run the Vitest suite. |
| `pnpm check` | Run TypeScript checking without emitting files. |
| `pnpm build` | Build the Vite client and bundle the Node server. |
| `pnpm start` | Run the built Node server locally. |
| `pnpm db:push` | Generate and apply Drizzle database migrations when database schema changes are needed. |
| `pnpm format` | Format project files with Prettier. |

Before opening a pull request or deploying, run:

```bash
pnpm test && pnpm check && pnpm build
```

## Environment variables

| Variable | Scope | Required for |
|---|---|---|
| `TMDB_API_KEY` | **Server only** | Live movie and TV discovery, ratings, credits, director/creator, and cast data. |
| `DATABASE_URL` | Server only | Database-backed application features where enabled. |
| `JWT_SECRET` | Server only | Session handling in the managed Express runtime. |
| `VITE_ANALYTICS_ENDPOINT` | Client build (optional) | Analytics script loading when configured. |
| `VITE_ANALYTICS_WEBSITE_ID` | Client build (optional) | Analytics script loading when configured. |

Never expose `TMDB_API_KEY`, `DATABASE_URL`, or `JWT_SECRET` as `VITE_*` variables. Values prefixed with `VITE_` are included in the browser build.

## Vercel deployment

Reelwise includes compatibility work for Vercel. Use these project settings:

| Vercel setting | Value |
|---|---|
| **Node.js Version** | `22.x` |
| **Install Command** | `pnpm install --frozen-lockfile --prod=false` |
| **Build Command** | `pnpm run build` |
| **Environment Variable** | Add `TMDB_API_KEY` as a private value for **Production** and **Preview**. |

The repository’s `pnpm-workspace.yaml` explicitly approves the trusted `esbuild` and `@tailwindcss/oxide` native build scripts required during a Vercel installation. The Vercel API function forwards `/api/trpc/catalogue.discover` and `/api/trpc/catalogue.credits` to the shared tRPC router, so deployed recommendations use live TMDB results when `TMDB_API_KEY` is configured.

For step-by-step deployment troubleshooting, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

## Project structure

```text
api/trpc/[...trpc].ts      Vercel serverless tRPC entrypoint
client/src/pages/Home.tsx  Main recommendation experience and local viewing state
client/src/lib/            Ranking model, client types, and tests
client/src/index.css       Near-black cinema visual system
server/tmdb.ts             Server-only TMDB discovery and credits helpers
server/routers.ts          tRPC procedures
server/vercel-trpc.ts      Vercel route path normalization helper
server/_core/              Express, OAuth, environment, and managed-runtime infrastructure
drizzle/                   Database schema and migrations
VERCEL_DEPLOYMENT.md       Detailed Vercel build and runtime notes
```

## License

This project is distributed under the [MIT License](./package.json).

## References

[1]: https://developer.themoviedb.org/docs/getting-started "TMDB API documentation"
