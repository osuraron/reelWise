import { describe, expect, it } from "vitest";
import { formatRating, getRecommendation, type TasteProfile, type Title } from "./recommendations";

const profile: TasteProfile = {
  favoriteIds: [],
  genres: ["Sci-fi"],
  tags: ["philosophical"],
  completedAt: "2026-08-12T00:00:00.000Z",
};

const catalogue: Title[] = [
  { id: "drama", format: "movie", title: "Drama", year: 2024, runtime: "1h 40m", genres: ["Drama"], tags: ["warm"], description: "", reason: "", palette: "", accent: "" },
  { id: "science", format: "movie", title: "Science", year: 2024, runtime: "1h 40m", genres: ["Sci-fi"], tags: ["philosophical"], description: "", reason: "", palette: "", accent: "" },
];

describe("seeded recommendations", () => {
  it("prioritizes titles aligned to onboarding taste signals", () => {
    expect(getRecommendation("movie", [], [], undefined, catalogue, profile)?.id).toBe("science");
  });
});

describe("rating presentation", () => {
  it("formats usable catalogue ratings and omits unavailable values", () => {
    expect(formatRating(7.46)).toBe("7.5");
    expect(formatRating()).toBeNull();
    expect(formatRating(0)).toBeNull();
  });
});
