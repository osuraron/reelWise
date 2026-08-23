import { describe, expect, it, vi } from "vitest";
import { clearTmdbCache, discoverLiveTitles } from "./tmdb";

describe("TMDB configuration", () => {
  it("authenticates with the configured server-side API key", async () => {
    const apiKey = process.env.TMDB_API_KEY;
    expect(apiKey).toBeTruthy();

    const response = await fetch(
      `https://api.themoviedb.org/3/configuration?api_key=${encodeURIComponent(apiKey ?? "")}`,
    );

    expect(response.ok).toBe(true);
    const payload = (await response.json()) as { images?: { secure_base_url?: string } };
    expect(payload.images?.secure_base_url).toMatch(/^https:\/\//);
  }, 15_000);

  it("returns a broad live movie discovery pool", async () => {
    const titles = await discoverLiveTitles("movie");
    expect(titles.length).toBeGreaterThan(40);
    expect(titles.every((title) => title.id.startsWith("tmdb-movie-"))).toBe(true);
    expect(titles.some((title) => Boolean(title.poster))).toBe(true);
    expect(titles.every((title) => typeof title.rating === "number" && title.rating > 0 && title.rating <= 10)).toBe(true);
  }, 20_000);

  it("reports a clear failure when TMDB is unavailable", async () => {
    const originalFetch = globalThis.fetch;
    clearTmdbCache();
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 503 }));

    await expect(discoverLiveTitles("show")).rejects.toThrow("TMDB discovery failed with 503");

    globalThis.fetch = originalFetch;
  });
});
