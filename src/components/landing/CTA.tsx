import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-28 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-teal/15 via-iris/10 to-rose/10 p-12 md:p-16 text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
            Track. Analyze. <span className="iridescent-text">Grow.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-8">
            Bring Growth Intelligence to your campus. Pilot in two weeks,
            insights from day one.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button className="group h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
              Request institutional demo
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="h-11 px-5 rounded-full border border-white/10 bg-surface/40 text-sm font-medium hover:bg-surface transition-colors">
              Talk to our team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}