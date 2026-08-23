import { describe, expect, it, vi } from "vitest";
import { clearTmdbCache, discoverLiveTitles, mapLiveCredits } from "./tmdb";

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

  it("maps main cast and accurate movie or series lead credits", () => {
    const details = {
      created_by: [{ name: "Series Creator" }],
      credits: {
        crew: [{ name: "Film Director", job: "Director" }],
        cast: [{ name: "Second Lead", order: 1 }, { name: "First Lead", order: 0 }, { name: "First Lead", order: 2 }],
      },
    };

    expect(mapLiveCredits(details, "movie")).toEqual({ primaryRole: "Director", primaryNames: ["Film Director"], cast: ["First Lead", "Second Lead"] });
    expect(mapLiveCredits({ credits: {} }, "show")).toEqual({ primaryRole: "Created by", primaryNames: [], cast: [] });
    expect(mapLiveCredits(details, "show")).toEqual({ primaryRole: "Created by", primaryNames: ["Series Creator"], cast: ["First Lead", "Second Lead"] });
  });

  it("reports a clear failure when TMDB is unavailable", async () => {
    const originalFetch = globalThis.fetch;
    clearTmdbCache();
    globalThis.fetch = vi.fn().mockResolvedValue(new Response(null, { status: 503 }));

    await expect(discoverLiveTitles("show")).rejects.toThrow("TMDB discovery failed with 503");

    globalThis.fetch = originalFetch;
  });
});
