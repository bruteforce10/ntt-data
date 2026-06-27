import { describe, it, expect } from "vitest";

import { recordsToAoa } from "@/lib/ntt-data/export-xlsx";
import type { NttDataRecord } from "@/lib/ntt-data/types";

const record = {
  id: "r1",
  full_name: "Jane",
  email: "j@x.io",
  pick_deck: "deck.pdf",
  created: "2026-06-27T00:00:00Z",
} as NttDataRecord;

describe("recordsToAoa", () => {
  it("emits a header row of labels then values for the selected keys", () => {
    const aoa = recordsToAoa([record], ["full_name", "email"]);
    expect(aoa[0]).toEqual(["Full Name", "Email"]);
    expect(aoa[1]).toEqual(["Jane", "j@x.io"]);
  });

  it("renders file fields as the stored filename", () => {
    const aoa = recordsToAoa([record], ["pick_deck"]);
    expect(aoa[1]).toEqual(["deck.pdf"]);
  });

  it("renders missing values as an empty string", () => {
    const aoa = recordsToAoa([record], ["city"]);
    expect(aoa[1]).toEqual([""]);
  });
});
