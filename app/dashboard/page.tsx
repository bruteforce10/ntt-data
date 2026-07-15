import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { fetchAllRecords } from "@/lib/ntt-data/pocketbase";
import type { NttDataRecord } from "@/lib/ntt-data/types";
import { DataTable } from "@/components/dashboard/data-table";
import { EmailTable } from "@/components/dashboard/email-table";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  let records: NttDataRecord[] = [];
  let fetchError: string | null = null;
  try {
    records = await fetchAllRecords();
  } catch (err) {
    fetchError = String(err);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#154284]">
              NTT Data — Registrations
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              {session.user.email}
            </p>
          </div>
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-12 px-6 py-6">
        {fetchError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Failed to load registrations: {fetchError}
          </div>
        ) : (
          <>
            <DataTable data={records} />

            <section>
              <h2 className="text-lg font-semibold text-[#154284]">
                Email Automation
              </h2>
              <p className="mb-4 mt-0.5 text-xs text-slate-500">
                Manually trigger the registration-confirmation email (pitch-deck
                upload link) for any participant.
              </p>
              <EmailTable data={records} />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
