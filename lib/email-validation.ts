/**
 * Shared by the public notify-subscription endpoint and the registration form.
 * Deliberately permissive: the goal is to catch typos, not to enforce RFC 5322.
 * Real deliverability is proven only by a message actually being delivered.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trims and lowercases so the same address never varies by case or padding. */
export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Does not trim — callers normalize first. Keeping this strict preserves the
 * exact behaviour startup-registration-form.tsx had before extraction.
 */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}
