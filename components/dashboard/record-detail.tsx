"use client";

import { COLUMN_META } from "@/lib/ntt-data/columns-config";
import type { NttDataRecord, NttDataFileField } from "@/lib/ntt-data/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const FILE_FIELDS = new Set<NttDataFileField>([
  "pick_deck",
  "company_description_pdf",
]);

interface RecordDetailProps {
  record: NttDataRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecordDetail({ record, open, onOpenChange }: RecordDetailProps) {
  if (!record) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[520px] sm:max-w-[520px] overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-[#154284]">
            {record.startup_name || record.full_name}
          </SheetTitle>
        </SheetHeader>
        <dl className="grid gap-4 px-4 pb-8">
          {COLUMN_META.map(({ key, label, type }) => {
            const raw = record[key];
            const isFile = FILE_FIELDS.has(key as NttDataFileField);
            const displayValue =
              raw !== undefined && raw !== null && raw !== ""
                ? String(raw)
                : null;

            return (
              <div key={key} className="grid gap-0.5">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {label}
                </dt>
                <dd className="break-words text-sm leading-relaxed text-slate-900">
                  {isFile && displayValue ? (
                    <a
                      href={`/api/ntt-data/${record.id}/file/${key}`}
                      download
                      className="text-[#0070C0] underline underline-offset-2 hover:text-[#154284]"
                    >
                      {displayValue}
                    </a>
                  ) : type === "date" && displayValue ? (
                    new Date(displayValue).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  ) : (
                    displayValue ?? (
                      <span className="text-slate-400">—</span>
                    )
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </SheetContent>
    </Sheet>
  );
}
