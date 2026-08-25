# Vercel Deployment Notes

Reelwise uses **pnpm**, Vite, and a server-side TMDB/tRPC runtime. The project now pins external builds to **Node 22.x** and explicitly includes the Linux `esbuild` platform package so Vercel has access to the compiler executable during `pnpm run build`.

In Vercel, use the following settings for this repository:

| Setting | Value |
|---|---|
| Node.js Version | `22.x` |
| Install Command | `pnpm install --frozen-lockfile --prod=false` |
| Build Command | `pnpm run build` |

> Do not use Node 24 for this project until the deployment is stable. The failed build ran on Node 24.19.0, while the project’s pinned compiler toolchain is validated on Node 22.

## Runtime compatibility

The successful build produces static client assets in `dist/public` and a Node/Express server bundle at `dist/index.js`. The current server expects a persistent Node process and server-side environment variables for TMDB, OAuth, and data services. A standard Vercel static deployment will not provide the existing Express/tRPC runtime without an additional serverless-adapter conversion.

For the current full experience, use the project’s built-in hosting, which supports custom domains. If you continue with Vercel, treat this change as a **build compatibility fix** first; the server must be converted to Vercel functions and the required private environment variables configured before a Vercel deployment can support live recommendations.

## If the compiler error persists

Redeploy with a cleared Vercel build cache after applying the settings above. If it still fails, copy the first error lines immediately before the `esbuild/bin/esbuild` stack trace; those lines contain the operating-system error needed to distinguish a missing binary from a permission or architecture issue.
