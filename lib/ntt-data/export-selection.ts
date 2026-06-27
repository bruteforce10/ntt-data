export function resolveExportRows<T>(selected: T[], filtered: T[]): T[] {
  if (selected.length > 0) return [...selected];
  return [...filtered];
}
