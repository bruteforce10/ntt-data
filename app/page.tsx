import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import FloatingDock from "@/components/floating-dock";
import Hero from "@/components/hero";
import About from "@/components/about";
import Benefit from "@/components/benefit";
import Countdown from "@/components/countdown";
import ProblemOverview from "@/components/problem-overview";
import Roadmap from "@/components/roadmap";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "NTT DATA",
    url: SITE_URL,
    logo: `${SITE_URL}/Logo/GlobalLogo_NTTDATA_FutureBlue_RGB.png`,
    email: "openinnovation@ntt-startupchallenge.com",
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <FloatingDock />
      <Hero />
      <About />
      <Benefit />
      <ProblemOverview />
      <Roadmap />
      <Countdown />
      <Faq />
      <Footer />
    </main>
  );
}
