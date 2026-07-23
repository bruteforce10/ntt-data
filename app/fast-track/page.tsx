import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import FloatingDock from "@/components/floating-dock";
import Footer from "@/components/footer";
import FastTrackForm from "@/components/fast-track-form";

export const metadata: Metadata = {
  title: "Fast-Track Submission",
  description:
    "Register and submit your pitch deck for the NTT DATA Open Innovation Program in one step: enter your email, choose your problem statements, and upload your deck.",
  alternates: {
    canonical: "/fast-track",
  },
};

export default function FastTrackPage() {
  return (
    <>
      <Navbar />
      <FloatingDock />
      <main className="min-h-dvh bg-gray-50">
        <section className="mx-auto w-full max-w-3xl px-6 py-32">
          <h1 className="mb-2 text-center font-bold text-2xl uppercase tracking-wide text-[#154284] sm:text-3xl">
            Fast-Track Submission
          </h1>
          <p className="mb-8 text-center text-sm text-gray-600">
            Register and submit your pitch deck in one step.
          </p>
          <FastTrackForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
