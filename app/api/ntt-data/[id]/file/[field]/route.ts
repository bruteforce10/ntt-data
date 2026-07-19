import { auth } from "@/auth";
import { getRecord, fetchRecordFile } from "@/lib/ntt-data/pocketbase";
import { NTT_DATA_FILE_FIELDS } from "@/lib/ntt-data/columns-config";
import type { NttDataRecord, NttDataFileField } from "@/lib/ntt-data/types";

const FILE_FIELDS = new Set<string>(NTT_DATA_FILE_FIELDS);

type Params = { id: string; field: string };

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, field } = await ctx.params;

  if (!FILE_FIELDS.has(field)) {
    return new Response("Not Found", { status: 404 });
  }

  let record: NttDataRecord;
  try {
    record = await getRecord(id);
  } catch {
    return new Response("Not Found", { status: 404 });
  }

  const filename = record[field as NttDataFileField];
  if (!filename) {
    return new Response("Not Found", { status: 404 });
  }

  const pbRes = await fetchRecordFile(id, filename);
  if (!pbRes.ok) {
    return new Response("Not Found", { status: 404 });
  }

  const contentType =
    pbRes.headers.get("content-type") ?? "application/octet-stream";

  return new Response(pbRes.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
