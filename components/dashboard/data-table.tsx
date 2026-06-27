"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  flexRender,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type PaginationState,
  type Column,
} from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  SlidersHorizontalIcon,
  SearchIcon,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { COLUMN_META_BY_KEY } from "@/lib/ntt-data/columns-config";
import type { NttDataRecord } from "@/lib/ntt-data/types";
import { resolveExportRows } from "@/lib/ntt-data/export-selection";
import { recordsToAoa, downloadXlsx } from "@/lib/ntt-data/export-xlsx";
import { columns } from "./columns";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

const EXPORT_KEYS: (keyof NttDataRecord)[] = [
  "full_name", "email", "phone_number", "job_title", "startup_name",
  "website", "business_mode", "country", "city", "company_address",
  "problem_statement", "did_you_hear_about_us", "pick_deck", "funding_stage",
  "company_description", "company_description_pdf", "created", "updated",
];

function ColumnFilter({ column }: { column: Column<NttDataRecord, unknown> }) {
  const meta = COLUMN_META_BY_KEY[column.id];
  const filterValue = (column.getFilterValue() as string) ?? "";

  if (!meta || meta.type === "date") return null;

  if (meta.type === "facet") {
    const options = [...column.getFacetedUniqueValues().keys()]
      .filter(Boolean)
      .sort()
      .map(String);
    return (
      <select
        value={filterValue}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
        className="mt-1 h-6 w-full rounded border border-slate-200 bg-white px-1 text-xs"
      >
        <option value="">All</option>
        {options.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      value={filterValue}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      placeholder="Filter…"
      className="mt-1 h-6 w-full rounded border border-slate-200 px-1.5 text-xs outline-none focus:border-[#3176E4]"
    />
  );
}

interface DataTableProps {
  data: NttDataRecord[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    phone_number: false,
    city: false,
    company_description_pdf: false,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: "includesString",
  });

  function handleExport() {
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    const filtered = table.getFilteredRowModel().rows.map((r) => r.original);
    const rows = resolveExportRows(selected, filtered);
    const aoa = recordsToAoa(rows, EXPORT_KEYS);
    downloadXlsx(aoa, `ntt-data-${Date.now()}.xlsx`);
  }

  const toggleableColumns = table
    .getAllColumns()
    .filter(
      (col) => col.id !== "select" && col.id !== "actions" && col.getCanHide(),
    );

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="relative max-w-xs flex-1">
          <SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns…"
            className="h-8 pl-8 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm hover:bg-slate-50 focus-visible:outline-none">
              <SlidersHorizontalIcon className="h-3.5 w-3.5" />
              View
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              </DropdownMenuGroup>
              {toggleableColumns.map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onClick={() => col.toggleVisibility(!col.getIsVisible())}
                >
                  {COLUMN_META_BY_KEY[col.id]?.label ?? col.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={handleExport}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[#3176E4] px-3 text-sm text-[#3176E4] hover:bg-[#3176E4]/5"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Export Excel
          </button>
        </div>
      </div>

      {selectedCount > 0 && (
        <p className="text-xs text-slate-500">
          {selectedCount} row{selectedCount !== 1 ? "s" : ""} selected — export
          will use selected rows only
        </p>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-slate-50 hover:bg-slate-50">
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="align-top px-3 py-2">
                    {header.isPlaceholder ? null : (
                      <div>
                        <div
                          role={
                            header.column.getCanSort() ? "button" : undefined
                          }
                          tabIndex={
                            header.column.getCanSort() ? 0 : undefined
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              header.column.getToggleSortingHandler()?.(e);
                          }}
                          className={
                            header.column.getCanSort()
                              ? "flex cursor-pointer select-none items-center gap-1 text-xs font-semibold text-[#154284] hover:text-[#3176E4]"
                              : "text-xs font-semibold text-[#154284]"
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() &&
                            (header.column.getIsSorted() === "asc" ? (
                              <ArrowUpIcon className="h-3 w-3" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDownIcon className="h-3 w-3" />
                            ) : (
                              <ArrowUpDownIcon className="h-3 w-3 opacity-40" />
                            ))}
                        </div>
                        {header.column.getCanFilter() && (
                          <ColumnFilter column={header.column} />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="hover:bg-slate-50 data-[state=selected]:bg-blue-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-3 py-2 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            value={pagination.pageSize}
            onChange={(e) =>
              setPagination((p) => ({
                ...p,
                pageSize: Number(e.target.value),
                pageIndex: 0,
              }))
            }
            className="h-7 rounded border border-slate-200 px-1.5 text-xs"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()} &middot;{" "}
            {table.getFilteredRowModel().rows.length} total
          </span>
          <div className="flex items-center gap-1">
            {(
              [
                {
                  icon: ChevronsLeftIcon,
                  label: "First",
                  action: () => table.setPageIndex(0),
                  disabled: !table.getCanPreviousPage(),
                },
                {
                  icon: ChevronLeftIcon,
                  label: "Previous",
                  action: () => table.previousPage(),
                  disabled: !table.getCanPreviousPage(),
                },
                {
                  icon: ChevronRightIcon,
                  label: "Next",
                  action: () => table.nextPage(),
                  disabled: !table.getCanNextPage(),
                },
                {
                  icon: ChevronsRightIcon,
                  label: "Last",
                  action: () =>
                    table.setPageIndex(table.getPageCount() - 1),
                  disabled: !table.getCanNextPage(),
                },
              ] as const
            ).map(({ icon: Icon, label, action, disabled }) => (
              <button
                key={label}
                onClick={action}
                disabled={disabled}
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
