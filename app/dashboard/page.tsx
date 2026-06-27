import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="min-h-screen bg-white p-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#154284]">Dashboard</h1>
        <SignOutButton />
      </header>
      <p className="mt-6 text-slate-600">
        Signed in as {session.user.email}
      </p>
    </main>
  );
}
