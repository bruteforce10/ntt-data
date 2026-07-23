import { describe, it, expect } from "vitest";

import { buildEmailLookupFilter } from "@/lib/ntt-data/email-filter";

describe("buildEmailLookupFilter", () => {
  it("matches case-insensitively via the :lower modifier with a lowercased input", () => {
    // Registrants stored with mixed-case emails must be found when they type
    // the lowercase form (PocketBase `=` compares case-sensitively).
    expect(buildEmailLookupFilter("John.Doe@Example.COM")).toBe(
      "email:lower='john.doe@example.com'",
    );
  });

  it("passes an already-lowercase email through unchanged", () => {
    expect(buildEmailLookupFilter("user@example.com")).toBe(
      "email:lower='user@example.com'",
    );
  });

  it("escapes single quotes so the filter cannot be broken out of", () => {
    expect(buildEmailLookupFilter("o'brien@example.com")).toBe(
      "email:lower='o\\'brien@example.com'",
    );
  });
});
