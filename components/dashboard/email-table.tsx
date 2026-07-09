"use client";

import { useMemo, useState } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MailIcon,
  RefreshCwIcon,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { NttDataRecord } from "@/lib/ntt-data/types";

const PAGE_SIZE = 25;

type SendStatus = "sending" | "sent" | "error";

function SendButton({
  status,
  onClick,
}: {
  status: SendStatus | undefined;
  onClick: () => void;
}) {
  if (status === "sending") {
    return (
      <Button size="sm" disabled className="bg-[#3176E4] text-white">
        <Loader2Icon className="animate-spin" /> Sending…
      </Button>
    );
  }
  if (status === "sent") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={onClick}
        className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
      >
        <CheckIcon /> Sent — resend?
      </Button>
    );
  }
  if (status === "error") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={onClick}
        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
      >
        <RefreshCwIcon /> Failed — retry
      </Button>
    );
  }
  return (
    <Button
      size="sm"
      onClick={onClick}
      className="bg-[#3176E4] text-white hover:bg-[#3176E4]/90"
    >
      <MailIcon /> Send Email
    </Button>
  );
}

interface EmailTableProps {
  data: NttDataRecord[];
}

export function EmailTable({ data }: EmailTableProps) {
  const [query, setQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, SendStatus>>({});
  const [pending, setPending] = useState<NttDataRecord | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) =>
      [r.full_name, r.email, r.startup_name, r.problem_statement].some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pageIndex, pageCount - 1);
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  async function confirmSend() {
    const record = pending;
    if (!record) return;
    setPending(null);
    setStatuses((s) => ({ ...s, [record.id]: "sending" }));
    try {
      const res = await fetch(`/api/ntt-data/${record.id}/send-email`, {
        method: "POST",
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      setStatuses((s) => ({ ...s, [record.id]: "sent" }));
    } catch {
      setStatuses((s) => ({ ...s, [record.id]: "error" }));
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative max-w-xs">
        <SearchIcon className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPageIndex(0);
          }}
          placeholder="Search name, email, startup…"
          className="h-8 pl-8 text-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              {["Full Name", "Email", "Startup", "Problem Statement", "Registered", "Send Registration Email"].map(
                (label) => (
                  <TableHead
                    key={label}
                    className="px-3 py-2 text-xs font-semibold text-[#154284]"
                  >
                    {label}
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((record) => (
                <TableRow key={record.id} className="hover:bg-slate-50">
                  <TableCell className="min-w-[140px] px-3 py-2 text-sm">
                    {record.full_name}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-xs">
                    {record.email}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-sm">
                    {record.startup_name}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-xs">
                    <span
                      title={record.problem_statement}
                      className="block max-w-[260px] truncate"
                    >
                      {record.problem_statement || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="px-3 py-2 text-xs">
                    {record.created
                      ? new Date(record.created).toLocaleDateString("id-ID")
                      : "—"}
                  </TableCell>
                  <TableCell className="px-3 py-2">
                    <SendButton
                      status={statuses[record.id]}
                      onClick={() => setPending(record)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-slate-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <span>
          Page {page + 1} of {pageCount} &middot; {filtered.length} total
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous"
            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            aria-label="Next"
            className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Dialog
        open={!!pending}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#154284]">
              Send registration email?
            </DialogTitle>
            <DialogDescription>
              The registration-confirmation email (with the pitch-deck upload
              link) will be sent to this participant.
            </DialogDescription>
          </DialogHeader>
          {pending && (
            <dl className="grid gap-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Name</dt>
                <dd className="font-medium">{pending.full_name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Startup</dt>
                <dd className="font-medium">{pending.startup_name}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-slate-500">Email</dt>
                <dd className="break-all font-medium text-[#0070C0]">
                  {pending.email}
                </dd>
              </div>
            </dl>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button
              onClick={confirmSend}
              className="bg-[#3176E4] text-white hover:bg-[#3176E4]/90"
            >
              <MailIcon /> Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
