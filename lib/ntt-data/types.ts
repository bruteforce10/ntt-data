export type NttDataFileField = "pick_deck" | "company_description_pdf";

export interface NttDataRecord {
  collectionId: string;
  collectionName: string;
  id: string;
  full_name: string;
  email: string;
  phone_number: number | string;
  job_title: string;
  startup_name: string;
  website: string;
  business_mode: string;
  country: string;
  city: string;
  company_address: string;
  problem_statement: string;
  did_you_hear_about_us: string;
  pick_deck: string;
  funding_stage: string;
  company_description_pdf: string;
  company_description: string;
  created: string;
  updated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
