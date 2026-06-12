import { Navbar } from "@/components/navbar";
import FloatingDock from "@/components/floating-dock";
import Hero from "@/components/hero";
import About from "@/components/about";
import Benefit from "@/components/benefit";
import ProgramOverview from "@/components/program-overview";
import Countdown from "@/components/countdown";
import ProblemOverview from "@/components/problem-overview";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <FloatingDock />
      <Hero />
      <About />
      <Benefit />
      <ProgramOverview />
      <Countdown />
      <ProblemOverview />
      <Faq />
      <Footer />
    </main>
  );
}
