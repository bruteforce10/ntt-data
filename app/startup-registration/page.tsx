import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import StartupRegistrationDock from "@/components/startup-registration-dock";
import Footer from "@/components/footer";
import StartupRegistrationForm from "@/components/startup-registration-form";

// --- COMING SOON placeholder imports (disabled) ---
// import { Home } from "lucide-react";
// import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Startup Registration",
  description:
    "Register your startup for the NTT DATA Open Innovation Program and pitch your solution to real business challenges from NTT DATA and its partners.",
  alternates: {
    canonical: "/startup-registration",
  },
};

export default function StartupRegistrationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-32">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm font-medium"
          >
            <Link
              href="/"
              className="text-[#154284] transition-colors hover:text-[#3176E4]"
            >
              Home
            </Link>
            <ChevronRight className="size-4 text-gray-400" aria-hidden />
            <span className="text-gray-500" aria-current="page">
              Startup Registration
            </span>
          </nav>
          <StartupRegistrationForm />
        </div>
      </main>
      <Footer />
      {/* Spacer so the fixed full-width dock doesn't cover the footer. */}
      <div className="h-24" aria-hidden />
      <StartupRegistrationDock />
    </>
  );

  /*
   * --- COMING SOON placeholder — temporarily disabled. ---
   * To restore: comment out the active return above, uncomment this block,
   * and re-enable the COMING SOON imports (Home, Button) at the top.
   *
   * return (
   *   <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-linear-to-b from-white via-white to-[#154284]/5 px-6 text-center">
   *     <span className="mb-5 inline-flex items-center rounded-full border border-[#0070C0]/20 bg-[#0070C0]/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#0070C0] uppercase sm:text-sm">
   *       Startup Registration
   *     </span>
   *     <h1 className="bg-linear-to-br from-[#154284] via-[#0070C0] to-[#3176E4] bg-clip-text text-6xl font-extrabold tracking-tight text-transparent uppercase sm:text-7xl lg:text-8xl">
   *       Coming Soon
   *     </h1>
   *     <p className="mt-6 max-w-xl text-base text-gray-600 sm:text-lg">
   *       Startup registration is on its way. This page will be available soon —
   *       please check back later.
   *     </p>
   *     <Button
   *       nativeButton={false}
   *       render={<Link href="/" />}
   *       className="mt-10 h-12 gap-2 rounded-full bg-[#3176E4] px-8 text-base font-semibold text-white shadow-lg shadow-[#3176E4]/20 transition-colors hover:bg-[#3176E4]/90"
   *     >
   *       <Home className="size-5" aria-hidden />
   *       Back to Home
   *     </Button>
   *   </main>
   * );
   */
}
