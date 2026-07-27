import type { NttDataRecord } from "./types";
import { COLUMN_META_BY_KEY } from "./columns-config";
import {
  isProblemDeckField,
  type ProblemDeckLinkField,
} from "@/lib/problem-decks";

type RecordKey = keyof NttDataRecord;

function fileUrl(origin: string, id: string, field: string): string {
  return `${origin}/api/ntt-data/${id}/file/${field}`;
}

function cellValue(
  record: NttDataRecord,
  key: RecordKey,
  origin: string,
): string | number {
  // Company Description is one combined column: when a PDF was uploaded export
  // the download link, otherwise the plain-text description.
  if (key === "company_description") {
    if (record.company_description_pdf) {
      return fileUrl(origin, record.id, "company_description_pdf");
    }
    return record.company_description ?? "";
  }

  // Per-problem deck columns combine the file's download link and the pasted
  // fallback link into ONE cell, mirroring the dashboard: "<download> - <link>"
  // when both exist, otherwise whichever is present ("" when neither).
  if (isProblemDeckField(key)) {
    const link = record[`${key}_link` as ProblemDeckLinkField];
    const parts: string[] = [];
    if (record[key]) parts.push(fileUrl(origin, record.id, key));
    if (typeof link === "string" && /^https?:\/\//i.test(link)) {
      parts.push(link);
    }
    return parts.join(" - ");
  }

  const v = record[key];
  if (v === undefined || v === null || v === "") return "";

  // File fields only store the uploaded filename; export a usable download link
  // instead of the bare filename.
  if (COLUMN_META_BY_KEY[key]?.type === "file") {
    return fileUrl(origin, record.id, key);
  }

  return v as string | number;
}

export function recordsToAoa(
  records: NttDataRecord[],
  keys: RecordKey[],
  origin = "",
): (string | number)[][] {
  const headers = keys.map((k) => COLUMN_META_BY_KEY[k]?.label ?? String(k));
  const rows = records.map((r) => keys.map((k) => cellValue(r, k, origin)));
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
