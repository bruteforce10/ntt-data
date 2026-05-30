import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import StartupRegistrationForm from "@/components/startup-registration-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Startup Registration — NTT Open Innovation Week",
};

export default function StartupRegistrationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Form */}
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
    </>
  );
}
