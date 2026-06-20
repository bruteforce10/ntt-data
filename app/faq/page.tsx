import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import FloatingDock from "@/components/floating-dock";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "FAQ — NTT DATA Open Innovation Program",
  description:
    "Find answers to common questions about eligibility, the program timeline, and what to expect during the NTT DATA innovation sprint.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <FloatingDock />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-200 px-6 pt-28">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Link
              href="/"
              className="text-[#154284] transition-colors hover:text-[#3176E4]"
            >
              Home
            </Link>
            <ChevronRight className="size-4 text-gray-400" aria-hidden />
            <span className="text-gray-500" aria-current="page">
              FAQ&apos;s
            </span>
          </nav>
        </div>
        <Faq />
      </main>
      <Footer />
    </>
  );
}
