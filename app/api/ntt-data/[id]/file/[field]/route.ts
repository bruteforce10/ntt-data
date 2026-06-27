import { auth } from "@/auth";
import { getRecord, fetchRecordFile } from "@/lib/ntt-data/pocketbase";
import type { NttDataRecord, NttDataFileField } from "@/lib/ntt-data/types";

const FILE_FIELDS = new Set<NttDataFileField>(["pick_deck", "company_description_pdf"]);

type Params = { id: string; field: string };

export async function GET(_req: Request, ctx: { params: Promise<Params> }) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id, field } = await ctx.params;

  if (!FILE_FIELDS.has(field as NttDataFileField)) {
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
