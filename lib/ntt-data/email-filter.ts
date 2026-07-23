/**
 * Builds a PocketBase filter that matches a registration email
 * case-insensitively.
 *
 * PocketBase's `=` operator compares text case-sensitively, so a registrant
 * stored as "John.Doe@Example.COM" would never match the lowercase email they
 * later type into the deck-submission gate. The `:lower` field modifier
 * lowercases the STORED value; we lowercase the input to match.
 */
export function buildEmailLookupFilter(email: string): string {
  const normalized = email.toLowerCase().replace(/'/g, "\\'");
  return `email:lower='${normalized}'`;
}
