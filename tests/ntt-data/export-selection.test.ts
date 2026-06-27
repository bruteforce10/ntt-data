import { describe, it, expect } from "vitest";

import { resolveExportRows } from "@/lib/ntt-data/export-selection";

describe("resolveExportRows", () => {
  it("returns the selected rows when any are selected", () => {
    expect(resolveExportRows([1, 2], [1, 2, 3, 4])).toEqual([1, 2]);
  });

  it("falls back to the filtered rows when nothing is selected", () => {
    expect(resolveExportRows([], [3, 4])).toEqual([3, 4]);
  });

  it("returns a new array (no aliasing of the inputs)", () => {
    const filtered = [1, 2, 3];
    const result = resolveExportRows([], filtered);
    expect(result).toEqual(filtered);
    expect(result).not.toBe(filtered);
  });
});
