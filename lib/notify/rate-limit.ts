export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

interface Bucket {
  count: number;
  expiresAt: number;
}

/**
 * Per-instance and reset by cold starts on serverless, so this is a speed bump
 * against crude abuse rather than a guarantee. Accepted deliberately: a real
 * limiter would mean a Redis dependency this project does not otherwise need.
 */
const buckets = new Map<string, Bucket>();

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.expiresAt <= now) buckets.delete(key);
  }
}

/** Returns true when the request is allowed, false when the key is over budget. */
export function consumeRateLimit(
  key: string,
  now: number = Date.now(),
): boolean {
  sweepExpired(now);

  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) return false;

  buckets.set(key, { ...bucket, count: bucket.count + 1 });
  return true;
}

/** Test-only: clears all buckets so cases stay isolated. */
export function resetRateLimit(): void {
  buckets.clear();
}
