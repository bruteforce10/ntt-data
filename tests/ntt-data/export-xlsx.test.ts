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

  it("renders file fields as a download link, not the bare filename", () => {
    const aoa = recordsToAoa([record], ["pick_deck"], "https://app.test");
    expect(aoa[1]).toEqual(["https://app.test/api/ntt-data/r1/file/pick_deck"]);
  });

  it("renders missing values as an empty string", () => {
    const aoa = recordsToAoa([record], ["city"]);
    expect(aoa[1]).toEqual([""]);
  });

  describe("company_description column", () => {
    it("exports the PDF download link when a description file was uploaded", () => {
      const withPdf = {
        ...record,
        company_description_pdf: "profile.pdf",
        company_description: "",
      } as NttDataRecord;
      const aoa = recordsToAoa(
        [withPdf],
        ["company_description"],
        "https://app.test",
      );
      expect(aoa[1]).toEqual([
        "https://app.test/api/ntt-data/r1/file/company_description_pdf",
      ]);
    });

    it("exports the plain text when there is no PDF", () => {
      const withText = {
        ...record,
        company_description_pdf: "",
        company_description: "We build robots.",
      } as NttDataRecord;
      const aoa = recordsToAoa([withText], ["company_description"]);
      expect(aoa[1]).toEqual(["We build robots."]);
    });
  });
});
