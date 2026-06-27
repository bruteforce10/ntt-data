import type { NttDataRecord } from "./types";
import { COLUMN_META_BY_KEY } from "./columns-config";

type RecordKey = keyof NttDataRecord;

export function recordsToAoa(
  records: NttDataRecord[],
  keys: RecordKey[],
): (string | number)[][] {
  const headers = keys.map((k) => COLUMN_META_BY_KEY[k]?.label ?? String(k));
  const rows = records.map((r) =>
    keys.map((k) => {
      const v = r[k];
      if (v === undefined || v === null || v === "") return "";
      return v as string | number;
    }),
  );
  return [headers, ...rows];
}

export function downloadXlsx(aoa: (string | number)[][], filename: string): void {
  import("xlsx").then((XLSX) => {
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    XLSX.writeFile(wb, filename);
  });
}
