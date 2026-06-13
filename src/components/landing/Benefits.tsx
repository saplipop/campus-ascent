import {
  Activity,
  Award,
  Building2,
  Calendar,
  Sparkles,
  Target,
} from "lucide-react";

const items = [
  {
    icon: Activity,
    title: "Student Growth Tracking",
    desc: "Visualize each student's development across semesters — workshops, internships, certifications, all in one growth timeline.",
  },
  {
    icon: Award,
    title: "Career Readiness Intelligence",
    desc: "Proprietary CareerIQ score blends skills, consistency, and leadership into a single readiness benchmark.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    desc: "Compare current student skills against industry demand for the careers they actually want to pursue.",
  },
  {
    icon: Sparkles,
    title: "Engagement Analytics",
    desc: "Campus Pulse Index quantifies engagement velocity with heatmaps revealing high and low participation periods.",
  },
  {
    icon: Calendar,
    title: "Event Effectiveness",
    desc: "Score every workshop and competition by attendance, completion, satisfaction, and downstream skill impact.",
  },
  {
    icon: Building2,
    title: "Department Performance",
    desc: "Benchmark departments across participation, engagement, and CareerIQ to spot leaders and gaps.",
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-28 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-4">Capabilities</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Intelligence for every stakeholder
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Six modules that turn raw academic activity into decisions students,
            faculty, and administrators can act on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="group relative rounded-2xl border border-white/5 bg-surface/30 p-6 hover:bg-surface/60 hover:border-white/10 transition-all duration-300"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                <it.icon className="size-5 text-teal" />
              </div>
              <h3 className="font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}