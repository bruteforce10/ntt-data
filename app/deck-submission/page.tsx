import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DeckSubmissionForm from "@/components/deck-submission-form";

export const metadata: Metadata = {
  title: "Deck Submission — NTT Open Innovation Week",
};

export default function DeckSubmissionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto w-full max-w-4xl px-6 py-32">
          <h1 className="mb-8 text-center font-bold text-2xl uppercase tracking-wide text-[#154284] sm:text-3xl">
            NTT Open Innovation Week Deck Submission
          </h1>
          <DeckSubmissionForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
