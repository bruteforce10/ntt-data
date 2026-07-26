"use client";

import { useState } from "react";
import type { ColumnDef, Row } from "@tanstack/react-table";
import {
  MoreHorizontalIcon,
  DownloadIcon,
  EyeIcon,
  Link2Icon,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DASHBOARD_TIME_ZONE } from "@/lib/ntt-data/columns-config";
import { rowBadge } from "@/lib/ntt-data/is-new";
import { PROBLEM_DECKS } from "@/lib/problem-decks";
import type { NttDataRecord } from "@/lib/ntt-data/types";
import { RecordDetail } from "./record-detail";

function TextCell({ value }: { value: string }) {
  if (!value) return <span className="text-slate-400">—</span>;
  return (
    <span title={value} className="block max-w-[220px] truncate text-xs">
      {value}
    </span>
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
          {PROBLEM_DECKS.flatMap((deck) =>
            record[deck.field]
              ? [
                  <DropdownMenuItem
                    key={deck.field}
                    onClick={() =>
                      window.open(
                        `/api/ntt-data/${record.id}/file/${deck.field}`,
                      )
                    }
                  >
                    <DownloadIcon className="h-3.5 w-3.5" /> {deck.id} Deck
                  </DropdownMenuItem>,
                ]
              : [],
          )}
          {record.pick_deck ? (
            <DropdownMenuItem
              onClick={() =>
                window.open(`/api/ntt-data/${record.id}/file/pick_deck`)
              }
            >
              <DownloadIcon className="h-3.5 w-3.5" /> Pitch Deck (Legacy)
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
    cell: ({ row }) => {
      const badge = rowBadge(row.original);
      return (
        <div className="flex min-w-[140px] items-center gap-1.5">
          <span>{row.original.full_name}</span>
          {badge?.type === "new" && <Badge variant="new">New</Badge>}
          {badge?.type === "updated" && (
            <Badge
              variant="updated"
              title={`Updated ${new Date(badge.updatedAt).toLocaleString(
                "id-ID",
                { timeZone: DASHBOARD_TIME_ZONE },
              )}`}
            >
              Updated{" "}
              {new Date(badge.updatedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                timeZone: DASHBOARD_TIME_ZONE,
              })}
            </Badge>
          )}
        </div>
      );
    },
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
    accessorKey: "company_address",
    header: "Company Address",
    cell: ({ getValue }) => <TextCell value={String(getValue() ?? "")} />,
  },
  {
    accessorKey: "problem_statement",
    header: "Problem Statement",
    cell: ({ getValue }) => <TextCell value={String(getValue() ?? "")} />,
  },
  {
    accessorKey: "did_you_hear_about_us",
    header: "How Did You Hear About Us",
    cell: ({ getValue }) => <TextCell value={String(getValue() ?? "")} />,
  },
  ...PROBLEM_DECKS.map(
    (deck): ColumnDef<NttDataRecord> => ({
      accessorKey: deck.field,
      header: () => (
        <Tooltip>
          <TooltipTrigger className="cursor-help underline decoration-dotted underline-offset-4">
            {deck.id}
          </TooltipTrigger>
          <TooltipContent>{deck.title}</TooltipContent>
        </Tooltip>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      cell: ({ row }) => {
        const rec = row.original;
        const fileName = rec[deck.field];
        const link = rec[deck.linkField];
        const hasLink = typeof link === "string" && /^https?:\/\//i.test(link);
        if (!fileName && !hasLink) {
          return <span className="text-slate-400">—</span>;
        }
        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap text-xs">
            {fileName ? (
              <a
                href={`/api/ntt-data/${rec.id}/file/${deck.field}`}
                download
                title={fileName}
                className="text-[#0070C0] underline underline-offset-2 hover:text-[#154284]"
              >
                Download
              </a>
            ) : null}
            {fileName && hasLink ? (
              <span className="text-slate-400">-</span>
            ) : null}
            {hasLink ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={link}
                className="inline-flex items-center gap-0.5 text-[#0070C0] underline underline-offset-2 hover:text-[#154284]"
              >
                <Link2Icon className="size-3" aria-hidden />
                Akses Link
              </a>
            ) : null}
          </div>
        );
      },
    }),
  ),
  {
    accessorKey: "company_description",
    header: "Company Description",
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const pdf = row.original.company_description_pdf;
      if (pdf) {
        return (
          <a
            href={`/api/ntt-data/${row.original.id}/file/company_description_pdf`}
            download
            title={pdf}
            className="text-xs whitespace-nowrap text-[#0070C0] underline underline-offset-2 hover:text-[#154284]"
          >
            PDF
          </a>
        );
      }
      return <TextCell value={row.original.company_description} />;
    },
  },
  {
    accessorKey: "created",
    header: "Registered",
    enableGlobalFilter: false,
    cell: ({ getValue }) => {
      const v = getValue() as string;
      return v
        ? new Date(v).toLocaleDateString("id-ID", {
            timeZone: DASHBOARD_TIME_ZONE,
          })
        : "—";
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
