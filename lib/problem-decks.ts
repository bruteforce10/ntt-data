import { SITE_CONTENT } from "@/lib/site-content";

/**
 * PocketBase file-field names on the ntt_data collection, one per
 * problemOverview item. site-content ids use the same "PO_01" format
 * (PocketBase field names cannot contain "-").
 */
export const PROBLEM_DECK_FIELDS = [
  "PO_01", "PO_02", "PO_03", "PO_04", "PO_05",
  "PO_06", "PO_07", "PO_08", "PO_09", "PO_10",
  "PO_11", "PO_12",
] as const;

export type ProblemDeckField = (typeof PROBLEM_DECK_FIELDS)[number];

/**
 * Companion text fields storing a pasted deck link (Google Drive, OneDrive,
 * etc.), one per problem. Used as a fallback when the file upload fails.
 */
export type ProblemDeckLinkField = `${ProblemDeckField}_link`;

export const PROBLEM_DECK_LINK_FIELDS: readonly ProblemDeckLinkField[] =
  PROBLEM_DECK_FIELDS.map((field) => `${field}_link` as ProblemDeckLinkField);

export interface ProblemDeck {
  /** site-content id, e.g. "PO_01" (same value as the PocketBase field) */
  id: string;
  /** PocketBase file field, e.g. "PO_01" */
  field: ProblemDeckField;
  /** PocketBase text field for the fallback link, e.g. "PO_01_link" */
  linkField: ProblemDeckLinkField;
  title: string;
  logoLabel: string;
}

const FIELD_SET = new Set<string>(PROBLEM_DECK_FIELDS);

export function isProblemDeckField(value: string): value is ProblemDeckField {
  return FIELD_SET.has(value);
}

export const PROBLEM_DECKS: readonly ProblemDeck[] =
  SITE_CONTENT.problemOverview.items.map((item) => {
    const field = item.id.replace(/-/g, "_");
    if (!isProblemDeckField(field)) {
      throw new Error(
        `problemOverview item id "${item.id}" has no matching PocketBase deck field`,
      );
    }
    return {
      id: item.id,
      field,
      linkField: `${field}_link` as ProblemDeckLinkField,
      title: item.title,
      logoLabel: (item as { logoLabel?: string }).logoLabel ?? "",
    };
  });

/**
 * Registration submissions store the SELECTED problem titles joined with
 * ", " in the problem_statement column. Titles never contain each other, so
 * substring inclusion recovers the selection; results keep canonical PO order.
 */
export function matchProblemDecks(
  problemStatement: string,
): readonly ProblemDeck[] {
  if (!problemStatement) return [];
  return PROBLEM_DECKS.filter((deck) =>
    problemStatement.includes(deck.title),
  );
}
