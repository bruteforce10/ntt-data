import { describe, it, expect } from "vitest";

import { isNew } from "@/lib/ntt-data/is-new";

const NOW = Date.parse("2026-06-27T12:00:00Z");

describe("isNew", () => {
  it("is true when created within the last 24h", () => {
    expect(
      isNew({ created: "2026-06-27T00:00:01Z", updated: "2026-06-27T00:00:01Z" }, NOW),
    ).toBe(true);
  });

  it("is true when updated within 24h even if created is older", () => {
    expect(
      isNew({ created: "2026-01-01T00:00:00Z", updated: "2026-06-27T06:00:00Z" }, NOW),
    ).toBe(true);
  });

  it("is false when both created and updated are older than 24h", () => {
    expect(
      isNew({ created: "2026-06-25T00:00:00Z", updated: "2026-06-25T00:00:00Z" }, NOW),
    ).toBe(false);
  });

  it("is false exactly at the 24h boundary", () => {
    expect(
      isNew({ created: "2026-06-26T12:00:00Z", updated: "2026-06-26T12:00:00Z" }, NOW),
    ).toBe(false);
  });

  it("handles an empty updated value by falling back to created", () => {
    expect(isNew({ created: "2026-06-27T11:00:00Z", updated: "" }, NOW)).toBe(true);
  });
});
