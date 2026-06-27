"use client";

import { useState } from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import {
  MoreHorizontalIcon,
  DownloadIcon,
  EyeIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { isNew } from "@/lib/ntt-data/is-new";
import type { NttDataRecord } from "@/lib/ntt-data/types";
import { RecordDetail } from "./record-detail";

function FileCell({
  recordId,
  field,
  filename,
}: {
  recordId: string;
  field: string;
  filename: string;
}) {
  if (!filename) return <span className="text-slate-400">—</span>;
  return (
    <a
      href={`/api/ntt-data/${recordId}/file/${field}`}
      download
      className="text-xs text-[#0070C0] underline underline-offset-2 hover:text-[#154284]"
    >
      {filename}
    </a>
  );
}

function RowActions({ row }: { row: Row<NttDataRecord> }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const record = row.original;

  return (
    <>
      <RecordDetail
        record={record}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-slate-100 focus-visible:outline-none"
          aria-label="Row actions"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setDetailOpen(true)}>
            <EyeIcon className="h-3.5 w-3.5" /> View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {record.pick_deck ? (
            <DropdownMenuItem
              onClick={() =>
                window.open(`/api/ntt-data/${record.id}/file/pick_deck`)
              }
            >
              <DownloadIcon className="h-3.5 w-3.5" /> Pitch Deck
            </DropdownMenuItem>
          ) : null}
          {record.company_description_pdf ? (
            <DropdownMenuItem
              onClick={() =>
                window.open(
                  `/api/ntt-data/${record.id}/file/company_description_pdf`,
                )
              }
            >
              <DownloadIcon className="h-3.5 w-3.5" /> Company PDF
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const columns: ColumnDef<NttDataRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(!!checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    size: 40,
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex min-w-[140px] items-center gap-1.5">
        <span>{row.original.full_name}</span>
        {isNew(row.original) && <Badge variant="new">New</Badge>}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="text-xs">{String(getValue() ?? "")}</span>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    enableGlobalFilter: false,
    cell: ({ getValue }) => (
      <span className="text-xs">{String(getValue() ?? "")}</span>
    ),
  },
  {
    accessorKey: "startup_name",
    header: "Startup",
  },
  {
    accessorKey: "business_mode",
    header: "Business Mode",
  },
  {
    accessorKey: "funding_stage",
    header: "Funding Stage",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "pick_deck",
    header: "Pitch Deck",
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <FileCell
        recordId={row.original.id}
        field="pick_deck"
        filename={row.original.pick_deck}
      />
    ),
  },
  {
    accessorKey: "company_description_pdf",
    header: "Company PDF",
    enableSorting: false,
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <FileCell
        recordId={row.original.id}
        field="company_description_pdf"
        filename={row.original.company_description_pdf}
      />
    ),
  },
  {
    accessorKey: "created",
    header: "Registered",
    enableGlobalFilter: false,
    cell: ({ getValue }) => {
      const v = getValue() as string;
      return v ? new Date(v).toLocaleDateString("id-ID") : "—";
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <RowActions row={row} />,
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    size: 48,
  },
];
