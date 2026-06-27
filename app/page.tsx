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
import { HOME_FAQ } from "@/lib/home-faq";

export default function Home() {
  return (
    <main>
      <Navbar />
      <FloatingDock />
      <Hero />
      <About />
      <Benefit />
      <ProblemOverview />
      <Roadmap />
      <Countdown />
      <Faq content={HOME_FAQ} />
      <Footer />
    </main>
  );
}
