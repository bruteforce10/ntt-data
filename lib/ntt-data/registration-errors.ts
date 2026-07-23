/**
 * Shared helpers that turn a failed registration submit into a human-readable
 * explanation of the CAUSE, never a bare HTTP status code.
 *
 * Used by app/api/ntt-data/route.ts (server: flatten PocketBase field errors)
 * and components/startup-registration-form.tsx (client: describe the failure).
 */

const SUPPORT_EMAIL = "openinnovation@ntt-startupchallenge.com";

export type RegistrationErrorPayload = {
  message?: string;
  errors?: Record<string, string>;
} | null;

/**
 * PocketBase rejections nest per-field failures under `data`, e.g.
 * `{ email: { code: "validation_invalid_email", message: "…" } }`.
 * Flatten that to `field → message`, dropping entries without a usable text.
 */
export function flattenPocketBaseFieldErrors(
  data: unknown,
): Record<string, string> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};

  const flattened: Record<string, string> = {};
  for (const [field, value] of Object.entries(data as Record<string, unknown>)) {
    if (!value || typeof value !== "object") continue;
    const message = (value as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      flattened[field] = message;
    }
  }
  return flattened;
}

/**
 * Explains why a registration submit failed. `status` is the HTTP status of
 * the response, or `null` when the request never got a response (network
 * failure). `payload` is the parsed JSON error body, or `null` when the body
 * was missing or not JSON (e.g. Vercel's own 413 page).
 */
export function describeRegistrationSubmitError(
  status: number | null,
  payload: RegistrationErrorPayload,
): string {
  if (status === null) {
    return "We couldn't reach the server — the request never arrived. Please check your internet connection and try again.";
  }

  if (status === 413) {
    return "The submission was rejected because it exceeds the 4.5 MB upload limit. Please attach a smaller PDF and try again.";
  }

  const fieldErrors = payload?.errors ?? {};
  const fieldEntries = Object.entries(fieldErrors);
  if (fieldEntries.length > 0) {
    const fieldDetails = fieldEntries
      .map(([field, message]) => `${field.replaceAll("_", " ")}: ${message}`)
      .join(" · ");
    return `${payload?.message || "Some fields were rejected"} — ${fieldDetails}`;
  }

  if (payload?.message) {
    return status >= 500
      ? `${payload.message} (server error ${status})`
      : payload.message;
  }

  if (status >= 500) {
    return `The server hit an unexpected problem (error ${status}) and your registration was NOT saved. Please try again in a few minutes, or email ${SUPPORT_EMAIL} if it keeps happening.`;
  }

  return `The server could not accept the submission (error ${status}). Please review your details and try again, or contact ${SUPPORT_EMAIL}.`;
}
