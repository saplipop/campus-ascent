import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { ProblemSolution } from "./ProblemSolution";
import { Benefits } from "./Benefits";
import { DashboardShowcase } from "./DashboardShowcase";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { CTA } from "./CTA";
import { Footer } from "./Footer";

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-teal/30 selection:text-foreground">
      <Nav />
      <main>
        <Hero />
        <ProblemSolution />
        <Benefits />
        <DashboardShowcase />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}