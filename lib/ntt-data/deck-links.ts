import { PROBLEM_DECKS, type ProblemDeck } from "@/lib/problem-decks";

/**
 * Normalize a user-pasted deck link into a safe, storable URL.
 *
 * Loose by design (participants paste Drive/OneDrive/Dropbox links in many
 * shapes) but the result must be a usable http(s) URL so it is safe to persist
 * and render as a clickable link in the dashboard:
 *  - trims; empty input -> null
 *  - prepends "https://" when the scheme is omitted ("drive.google.com/..")
 *  - rejects any non-http(s) scheme (blocks javascript:, data:, file:, ..)
 *  - requires a dotted host so a bare word doesn't become "https://word"
 *
 * @returns the normalized href, or null when the value can't be used.
 */
export function normalizeLinkUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (!url.hostname.includes(".")) return null;

  return url.toString();
}

export interface DeckLink {
  deck: ProblemDeck;
  url: string;
}

export type CollectLinksResult =
  | { ok: true; links: DeckLink[] }
  | { ok: false; message: string };

/**
 * Validate raw `{ field, url }` link entries against the problems the
 * registrant actually selected, mirroring the pitch-deck upload validation:
 *  - a blank url is skipped (an untouched fallback box)
 *  - an unknown field is ignored (stale client / renamed problem)
 *  - a link for a problem the user did not select is rejected
 *  - a malformed url is rejected
 *
 * Later entries for the same field win. Callers append each returned link to
 * the PocketBase form under `deck.linkField`.
 */
export function collectDeckLinks(
  rawLinks: unknown,
  selectedFields: ReadonlySet<string>,
): CollectLinksResult {
  const entries = Array.isArray(rawLinks) ? rawLinks : [];
  const byField = new Map<string, DeckLink>();

  for (const raw of entries) {
    const field = String((raw as { field?: unknown })?.field ?? "");
    const rawUrl = String((raw as { url?: unknown })?.url ?? "").trim();
    if (!rawUrl) continue;

    const deck = PROBLEM_DECKS.find((d) => d.field === field);
    if (!deck) continue;

    if (!selectedFields.has(deck.field)) {
      return {
        ok: false,
        message: `"${deck.title}": add a link only for a problem statement you selected.`,
      };
    }

    const url = normalizeLinkUrl(rawUrl);
    if (!url) {
      return {
        ok: false,
        message: `"${deck.title}": that link doesn't look like a valid URL. Include the full https:// address.`,
      };
    }

    byField.set(deck.field, { deck, url });
  }

  return { ok: true, links: [...byField.values()] };
}

/**
 * Seed the editable link state from previously-submitted deck links so a
 * returning registrant sees (and can edit) the link already on file instead of
 * an empty box. Keyed by `deck.id` to match the form's `links` state; problems
 * with no prior link are omitted so they render blank. Links are trimmed.
 *
 * Only the deck-submission flow has prior links to prefill (it looks the
 * registration up by email); fast-track creates/upserts blindly, so it has no
 * source to prefill from.
 */
export function prefillLinks(
  problems: ReadonlyArray<{ deck: { id: string }; link: string }>,
): Record<string, string> {
  const seed: Record<string, string> = {};
  for (const { deck, link } of problems) {
    const trimmed = link.trim();
    if (trimmed) seed[deck.id] = trimmed;
  }
  return seed;
}
