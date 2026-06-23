import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import FloatingDock from "@/components/floating-dock";
import Footer from "@/components/footer";
import DeckSubmissionForm from "@/components/deck-submission-form";

export const metadata: Metadata = {
  title: "Deck Submission — NTT Open Innovation Program",
};

export default function DeckSubmissionPage() {
  return (
    <>
      <Navbar />
      <FloatingDock />
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto w-full max-w-4xl px-6 py-32">
          <h1 className="mb-8 text-center font-bold text-2xl uppercase tracking-wide text-[#154284] sm:text-3xl">
            NTT Open Innovation Program Deck Submission
          </h1>
          <Suspense fallback={null}>
            <DeckSubmissionForm />
          </Suspense>
        </section>
      </main>
      <Footer />
    </>
  );
}
