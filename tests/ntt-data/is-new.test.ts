import { describe, it, expect } from "vitest";

import { isNew, wasRecentlyUpdated, rowBadge } from "@/lib/ntt-data/is-new";

const NOW = Date.parse("2026-06-27T12:00:00Z");

describe("isNew", () => {
  it("is true when created within the last 24h", () => {
    expect(
      isNew(
        { created: "2026-06-27T00:00:01Z", updated: "2026-06-27T00:00:01Z" },
        NOW,
      ),
    ).toBe(true);
  });

  it("is false when created is older than 24h, even if recently updated", () => {
    expect(
      isNew(
        { created: "2026-01-01T00:00:00Z", updated: "2026-06-27T06:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });

  it("is false when created is older than 24h", () => {
    expect(
      isNew(
        { created: "2026-06-25T00:00:00Z", updated: "2026-06-25T00:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });

  it("is false exactly at the 24h boundary", () => {
    expect(
      isNew(
        { created: "2026-06-26T12:00:00Z", updated: "2026-06-26T12:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });
});

describe("wasRecentlyUpdated", () => {
  it("is true when updated well after creation and within 2 days", () => {
    expect(
      wasRecentlyUpdated(
        { created: "2026-01-01T00:00:00Z", updated: "2026-06-26T06:00:00Z" },
        NOW,
      ),
    ).toBe(true);
  });

  it("is false when updated equals created (creation write only)", () => {
    expect(
      wasRecentlyUpdated(
        { created: "2026-06-27T06:00:00Z", updated: "2026-06-27T06:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });

  it("is false when the update is older than 2 days", () => {
    expect(
      wasRecentlyUpdated(
        { created: "2026-01-01T00:00:00Z", updated: "2026-06-24T12:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });

  it("is false exactly at the 2-day boundary", () => {
    expect(
      wasRecentlyUpdated(
        { created: "2026-01-01T00:00:00Z", updated: "2026-06-25T12:00:00Z" },
        NOW,
      ),
    ).toBe(false);
  });

  it("is false when updated is empty", () => {
    expect(
      wasRecentlyUpdated(
        { created: "2026-06-27T11:00:00Z", updated: "" },
        NOW,
      ),
    ).toBe(false);
  });
});

describe("rowBadge", () => {
  it("returns 'new' for a freshly created record even if it was edited (New wins)", () => {
    expect(
      rowBadge(
        { created: "2026-06-27T00:00:00Z", updated: "2026-06-27T10:00:00Z" },
        NOW,
      ),
    ).toEqual({ type: "new" });
  });

  it("returns 'updated' with the timestamp for an older record edited within 2 days", () => {
    expect(
      rowBadge(
        { created: "2026-01-01T00:00:00Z", updated: "2026-06-26T06:00:00Z" },
        NOW,
      ),
    ).toEqual({ type: "updated", updatedAt: "2026-06-26T06:00:00Z" });
  });

  it("returns null when neither new nor recently updated", () => {
    expect(
      rowBadge(
        { created: "2026-01-01T00:00:00Z", updated: "2026-01-01T00:00:00Z" },
        NOW,
      ),
    ).toBeNull();
  });
});
