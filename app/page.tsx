import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Benefit from "@/components/benefit";
import ProgramOverview from "@/components/program-overview";
import Countdown from "@/components/countdown";
import ProblemOverview from "@/components/problem-overview";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Benefit />
      <ProgramOverview />
      <Countdown />
      <ProblemOverview />
      <Footer />
    </main>
  );
}
