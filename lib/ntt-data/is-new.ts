const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export function isNew(
  record: { created: string; updated: string },
  now: number = Date.now(),
): boolean {
  const createdMs = Date.parse(record.created);
  const updatedMs = record.updated ? Date.parse(record.updated) : NaN;
  const latest = isNaN(updatedMs) ? createdMs : Math.max(createdMs, updatedMs);
  return now - latest < TWENTY_FOUR_HOURS_MS;
}
