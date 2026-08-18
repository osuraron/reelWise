import { describe, expect, it } from "vitest";
import { getRecommendation, type TasteProfile, type Title } from "./recommendations";

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

