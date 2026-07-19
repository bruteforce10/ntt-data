import { describe, it, expect } from "vitest";

import {
  PROBLEM_DECKS,
  PROBLEM_DECK_FIELDS,
  isProblemDeckField,
  matchProblemDecks,
} from "@/lib/problem-decks";

describe("PROBLEM_DECKS", () => {
  it("derives one entry per problemOverview item with PO_xx ids", () => {
    expect(PROBLEM_DECKS.length).toBe(10);
    expect(PROBLEM_DECKS.map((d) => d.id)).toEqual([
      "PO_01", "PO_02", "PO_03", "PO_04", "PO_05",
      "PO_06", "PO_07", "PO_08", "PO_09", "PO_10",
    ]);
  });

  it("maps every site-content id to its PocketBase field name (id === field)", () => {
    expect(PROBLEM_DECKS.map((d) => d.field)).toEqual([...PROBLEM_DECK_FIELDS]);
    expect(PROBLEM_DECKS[0].field).toBe("PO_01");
    expect(PROBLEM_DECKS[9].field).toBe("PO_10");
  });

  it("carries a non-empty title for every entry", () => {
    for (const deck of PROBLEM_DECKS) {
      expect(deck.title.length).toBeGreaterThan(0);
    }
  });

  it("has no title that is a substring of another title (matcher safety)", () => {
    for (const a of PROBLEM_DECKS) {
      for (const b of PROBLEM_DECKS) {
        if (a.id === b.id) continue;
        expect(b.title.includes(a.title)).toBe(false);
      }
    }
  });
});

describe("isProblemDeckField", () => {
  it("accepts PocketBase deck field names", () => {
    expect(isProblemDeckField("PO_01")).toBe(true);
    expect(isProblemDeckField("PO_10")).toBe(true);
  });

  it("rejects unknown or non-deck fields", () => {
    expect(isProblemDeckField("PO-01")).toBe(false); // old hyphen format is not a field

    expect(isProblemDeckField("pick_deck")).toBe(false);
    expect(isProblemDeckField("PO_11")).toBe(false);
    expect(isProblemDeckField("")).toBe(false);
  });
});

describe("matchProblemDecks", () => {
  const titleOf = (id: string) =>
    PROBLEM_DECKS.find((d) => d.id === id)!.title;

  it("finds the decks whose titles appear in a joined problem_statement", () => {
    const statement = [titleOf("PO_08"), titleOf("PO_01")].join(", ");
    const matched = matchProblemDecks(statement);
    expect(matched.map((d) => d.id)).toEqual(["PO_01", "PO_08"]);
  });

  it("returns matches in canonical PO order regardless of selection order", () => {
    const statement = [titleOf("PO_10"), titleOf("PO_02"), titleOf("PO_05")].join(", ");
    expect(matchProblemDecks(statement).map((d) => d.id)).toEqual([
      "PO_02", "PO_05", "PO_10",
    ]);
  });

  it("matches all ten when every title is present", () => {
    const statement = PROBLEM_DECKS.map((d) => d.title).join(", ");
    expect(matchProblemDecks(statement).length).toBe(10);
  });

  it("returns an empty list for empty or unrelated text", () => {
    expect(matchProblemDecks("")).toEqual([]);
    expect(matchProblemDecks("A totally unrelated sentence.")).toEqual([]);
  });
});
