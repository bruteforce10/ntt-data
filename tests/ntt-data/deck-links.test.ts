import { describe, it, expect } from "vitest";

import { PROBLEM_DECKS } from "@/lib/problem-decks";
import {
  normalizeLinkUrl,
  collectDeckLinks,
  prefillLinks,
} from "@/lib/ntt-data/deck-links";

describe("normalizeLinkUrl", () => {
  it("keeps a well-formed https URL", () => {
    expect(normalizeLinkUrl("https://drive.google.com/file/d/abc")).toBe(
      "https://drive.google.com/file/d/abc",
    );
  });

  it("keeps an http URL", () => {
    expect(normalizeLinkUrl("http://example.com/deck")).toBe(
      "http://example.com/deck",
    );
  });

  it("prepends https:// when the scheme is omitted", () => {
    expect(normalizeLinkUrl("drive.google.com/file/d/abc")).toBe(
      "https://drive.google.com/file/d/abc",
    );
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeLinkUrl("  https://1drv.ms/x  ")).toBe("https://1drv.ms/x");
  });

  it("returns null for empty or whitespace-only input", () => {
    expect(normalizeLinkUrl("")).toBeNull();
    expect(normalizeLinkUrl("   ")).toBeNull();
  });

  it("rejects non-http(s) schemes (javascript:, data:, file:)", () => {
    expect(normalizeLinkUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeLinkUrl("data:text/html,<script>")).toBeNull();
    expect(normalizeLinkUrl("file:///etc/passwd")).toBeNull();
  });

  it("rejects a bare word with no dotted host", () => {
    expect(normalizeLinkUrl("mydeck")).toBeNull();
  });
});

describe("collectDeckLinks", () => {
  const f1 = PROBLEM_DECKS[0].field; // PO_01
  const f2 = PROBLEM_DECKS[1].field; // PO_02
  const selected = new Set<string>([f1, f2]);

  it("returns the normalized links for selected problems", () => {
    const result = collectDeckLinks(
      [{ field: f1, url: "drive.google.com/a" }],
      selected,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.links).toHaveLength(1);
      expect(result.links[0].deck.field).toBe(f1);
      expect(result.links[0].deck.linkField).toBe(`${f1}_link`);
      expect(result.links[0].url).toBe("https://drive.google.com/a");
    }
  });

  it("skips blank url entries (untouched fallback boxes)", () => {
    const result = collectDeckLinks(
      [
        { field: f1, url: "   " },
        { field: f2, url: "https://1drv.ms/x" },
      ],
      selected,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.links.map((l) => l.deck.field)).toEqual([f2]);
    }
  });

  it("ignores unknown fields", () => {
    const result = collectDeckLinks(
      [{ field: "PO_99", url: "https://x.com/a" }],
      selected,
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.links).toHaveLength(0);
  });

  it("rejects a link for a problem the user did not select", () => {
    const notSelected = PROBLEM_DECKS[5].field; // PO_06
    const result = collectDeckLinks(
      [{ field: notSelected, url: "https://x.com/a" }],
      selected,
    );
    expect(result.ok).toBe(false);
  });

  it("rejects a malformed link", () => {
    const result = collectDeckLinks(
      [{ field: f1, url: "javascript:alert(1)" }],
      selected,
    );
    expect(result.ok).toBe(false);
  });

  it("keeps the last entry when a field is repeated", () => {
    const result = collectDeckLinks(
      [
        { field: f1, url: "https://x.com/first" },
        { field: f1, url: "https://x.com/second" },
      ],
      selected,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.links).toHaveLength(1);
      expect(result.links[0].url).toBe("https://x.com/second");
    }
  });

  it("returns an empty list for non-array input", () => {
    const result = collectDeckLinks(null, selected);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.links).toEqual([]);
  });
});

describe("prefillLinks", () => {
  const d1 = { id: PROBLEM_DECKS[0].id };
  const d2 = { id: PROBLEM_DECKS[1].id };

  it("seeds links keyed by deck.id for problems that have a prior link", () => {
    const seed = prefillLinks([
      { deck: d1, link: "https://drive.google.com/a" },
      { deck: d2, link: "https://1drv.ms/x" },
    ]);
    expect(seed).toEqual({
      [d1.id]: "https://drive.google.com/a",
      [d2.id]: "https://1drv.ms/x",
    });
  });

  it("omits problems with an empty or whitespace-only link", () => {
    const seed = prefillLinks([
      { deck: d1, link: "" },
      { deck: d2, link: "   " },
    ]);
    expect(seed).toEqual({});
  });

  it("trims the stored link", () => {
    const seed = prefillLinks([{ deck: d1, link: "  https://x.com/a  " }]);
    expect(seed[d1.id]).toBe("https://x.com/a");
  });

  it("returns an empty object for no problems", () => {
    expect(prefillLinks([])).toEqual({});
  });
});
