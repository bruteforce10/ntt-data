import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import StartupRegistrationForm from "@/components/startup-registration-form";

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
          <StartupRegistrationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
