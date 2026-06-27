import "server-only";

import type { NttDataRecord } from "./types";

function pbUrl(): string {
  const url = process.env.POCKETBASE_URL;
  if (!url) throw new Error("POCKETBASE_URL is not set");
  return url.replace(/\/$/, "");
}

function pbHeaders(): Record<string, string> {
  const token = process.env.POCKETBASE_SUPERUSER_TOKEN;
  if (!token) throw new Error("POCKETBASE_SUPERUSER_TOKEN is not set");
  return { Authorization: token, "Content-Type": "application/json" };
}

export async function fetchAllRecords(): Promise<NttDataRecord[]> {
  const base = pbUrl();
  const url = `${base}/api/collections/ntt_data/records?perPage=500&sort=-created`;
  const res = await fetch(url, {
    headers: pbHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`PocketBase fetchAll failed: ${res.status}`);
  const json = await res.json();
  return (json.items ?? []) as NttDataRecord[];
}

export async function getRecord(id: string): Promise<NttDataRecord> {
  const base = pbUrl();
  const url = `${base}/api/collections/ntt_data/records/${encodeURIComponent(id)}`;
  const res = await fetch(url, { headers: pbHeaders() });
  if (!res.ok) throw new Error(`PocketBase getRecord failed: ${res.status}`);
  return res.json() as Promise<NttDataRecord>;
}

export async function fetchRecordFile(
  recordId: string,
  filename: string,
): Promise<Response> {
  const base = pbUrl();
  const url = `${base}/api/files/ntt_data/${encodeURIComponent(recordId)}/${encodeURIComponent(filename)}`;
  return fetch(url, { headers: pbHeaders() });
}
