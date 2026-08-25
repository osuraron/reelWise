# Vercel Deployment Notes

Reelwise uses **pnpm**, Vite, and a server-side TMDB/tRPC runtime. The project now pins external builds to **Node 22.x**, explicitly includes the Linux `esbuild` platform package, and approves the trusted `esbuild` and `@tailwindcss/oxide` install scripts through `pnpm-workspace.yaml`. The workspace file declares the repository root as its sole package, which lets pnpm read the approval list in CI. This lets Vercel install the native build binaries needed by `pnpm run build`.

In Vercel, use the following settings for this repository:

| Setting | Value |
|---|---|
| Node.js Version | `22.x` |
| Install Command | `pnpm install --frozen-lockfile --prod=false` |
| Build Command | `pnpm run build` |

> Do not use Node 24 for this project until the deployment is stable. The failed build ran on Node 24.19.0, while the project’s pinned compiler toolchain is validated on Node 22. The next Vercel install should no longer show `Ignored build scripts: @tailwindcss/oxide, esbuild`; this project approves only those two trusted native build dependencies.

## Asset compatibility

The former Manus-hosted paper texture has been replaced with a compact inline CSS grain treatment. It no longer relies on the `/manus-storage/...` path, so Vite can bundle the app without the prior texture-resolution warning.

## Source verification in Vercel

Set Vercel’s **Production Branch** to the branch that contains the latest `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `client/index.html`, and `client/src/index.css` changes. Keep the **Root Directory** at the repository root unless the Git repository stores Reelwise in a subfolder.

On a deployment details page, compare the deployed commit with the newest Git commit that includes those files. If the build log still mentions `/manus-storage/reelwise-paper-texture_08dcbd0b.jpg` or `%VITE_ANALYTICS_ENDPOINT%`, Vercel is building an older commit or the wrong root directory; neither reference exists in the current source.

## Live catalogue API on Vercel

The project includes a Vercel catch-all serverless function at `api/trpc/[...trpc].ts`. It routes the browser’s existing `/api/trpc/catalogue.discover` and `/api/trpc/catalogue.credits` requests to the shared tRPC router, allowing live TMDB movie and TV discovery rather than the local fallback catalogue.

In Vercel **Settings → Environment Variables**, add the following for both **Production** and **Preview** environments:

| Variable | Required value |
|---|---|
| `TMDB_API_KEY` | Your existing private TMDB API key |

Do not add this key with a `VITE_` prefix and do not expose it in client-side source. Once saved, redeploy so the serverless function receives the secret.

## Remaining runtime compatibility

The successful build produces static client assets in `dist/public` and a Node/Express server bundle at `dist/index.js`. The live catalogue uses the dedicated Vercel tRPC function above. Other server features—such as the current Manus OAuth, database, storage-proxy, and notification integrations—still expect their original private runtime configuration and are not required for public TMDB discovery.

For the current full experience, built-in hosting remains the simplest option and supports custom domains. If you continue with Vercel, the live catalogue is now covered by a serverless function; configure any additional server-side features only when you intend to use them.

## If the compiler error persists

Redeploy with a cleared Vercel build cache after applying the settings above. If it still fails, copy the first error lines immediately before the `esbuild/bin/esbuild` stack trace; those lines contain the operating-system error needed to distinguish a missing binary from a permission or architecture issue.
