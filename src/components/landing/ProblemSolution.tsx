import { Check, X } from "lucide-react";

export function ProblemSolution() {
  return (
    <section id="intelligence" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-4">The shift</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto text-balance">
            Legacy systems record history.{" "}
            <span className="text-muted-foreground">We map the future.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/5 bg-surface/30 p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-6">
              Traditional platforms
            </p>
            <h3 className="text-xl font-semibold mb-6">Track participation</h3>
            <ul className="space-y-3">
              {[
                "Stores attendance records",
                "Issues participation certificates",
                "Counts event registrations",
                "No insight into actual growth",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 size-5 rounded-full bg-white/5 grid place-items-center shrink-0">
                    <X className="size-3" />
                  </span>
                  <span className="line-through opacity-70">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-teal/20 bg-gradient-to-br from-teal/10 via-iris/5 to-transparent p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-64 bg-teal/20 blur-3xl rounded-full" />
            <div className="relative">
              <p className="text-xs uppercase tracking-widest text-teal font-medium mb-6">
                Campus Connect
              </p>
              <h3 className="text-xl font-semibold mb-6">Measure growth</h3>
              <ul className="space-y-3">
                {[
                  "CareerIQ score per student",
                  "Skill gap intelligence vs market",
                  "Engagement heatmaps & trends",
                  "Personalized growth recommendations",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 size-5 rounded-full bg-teal text-background grid place-items-center shrink-0">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}