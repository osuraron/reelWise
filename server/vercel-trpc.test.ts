import { describe, expect, it } from "vitest";
import { resolveVercelTrpcPath } from "./vercel-trpc";

describe("Vercel tRPC route path", () => {
  it("uses Vercel catch-all query segments for a tRPC procedure", () => {
    expect(resolveVercelTrpcPath({ query: { trpc: ["catalogue.discover"] } })).toBe("catalogue.discover");
  });

  it("falls back to parsing the incoming tRPC URL", () => {
    expect(resolveVercelTrpcPath({ url: "/api/trpc/catalogue.credits?batch=1" })).toBe("catalogue.credits");
  });
});
