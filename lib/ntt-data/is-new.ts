const DAY_MS = 24 * 60 * 60 * 1000;
// "New": created within the last 24h.
const NEW_WINDOW_MS = DAY_MS;
// "Updated": last edited within the last 2 days.
const UPDATED_WINDOW_MS = 2 * DAY_MS;
// PocketBase stamps `updated` at creation too; only edits more than a minute
// after creation count as a genuine update.
const UPDATE_EPSILON_MS = 60 * 1000;

interface TimestampedRecord {
  created: string;
  updated: string;
}

export function isNew(
  record: TimestampedRecord,
  now: number = Date.now(),
): boolean {
  const createdMs = Date.parse(record.created);
  if (Number.isNaN(createdMs)) return false;
  return now - createdMs < NEW_WINDOW_MS;
}

export function wasRecentlyUpdated(
  record: TimestampedRecord,
  now: number = Date.now(),
): boolean {
  const createdMs = Date.parse(record.created);
  const updatedMs = record.updated ? Date.parse(record.updated) : NaN;
  if (Number.isNaN(updatedMs) || Number.isNaN(createdMs)) return false;
  // Ignore the write that happens at creation.
  if (updatedMs - createdMs <= UPDATE_EPSILON_MS) return false;
  return now - updatedMs < UPDATED_WINDOW_MS;
}

export type RowBadge =
  | { type: "new" }
  | { type: "updated"; updatedAt: string }
  | null;

/**
 * Picks the recency badge for a table row. "New" wins over "Updated" so a
 * freshly-created record isn't also flagged as edited.
 */
export function rowBadge(
  record: TimestampedRecord,
  now: number = Date.now(),
): RowBadge {
  if (isNew(record, now)) return { type: "new" };
  if (wasRecentlyUpdated(record, now)) {
    return { type: "updated", updatedAt: record.updated };
  }
  return null;
}
