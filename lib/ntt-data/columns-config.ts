import type { NttDataRecord } from "./types";

export type ColumnType = "text" | "number" | "email" | "url" | "file" | "date" | "facet";

export interface ColumnMeta {
  key: keyof NttDataRecord;
  label: string;
  type: ColumnType;
}

export const COLUMN_META: ColumnMeta[] = [
  { key: "full_name", label: "Full Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone_number", label: "Phone Number", type: "text" },
  { key: "job_title", label: "Job Title", type: "text" },
  { key: "startup_name", label: "Startup Name", type: "text" },
  { key: "website", label: "Website", type: "url" },
  { key: "business_mode", label: "Business Mode", type: "facet" },
  { key: "country", label: "Country", type: "facet" },
  { key: "city", label: "City", type: "text" },
  { key: "company_address", label: "Company Address", type: "text" },
  { key: "problem_statement", label: "Problem Statement", type: "text" },
  { key: "did_you_hear_about_us", label: "How Did You Hear About Us", type: "text" },
  { key: "pick_deck", label: "Pitch Deck", type: "file" },
  { key: "funding_stage", label: "Funding Stage", type: "facet" },
  { key: "company_description_pdf", label: "Company Description PDF", type: "file" },
  { key: "company_description", label: "Company Description", type: "text" },
  { key: "created", label: "Created At", type: "date" },
  { key: "updated", label: "Updated At", type: "date" },
];

export const COLUMN_META_BY_KEY = Object.fromEntries(
  COLUMN_META.map((m) => [m.key, m]),
) as Record<string, ColumnMeta>;
