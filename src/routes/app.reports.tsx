import { createFileRoute } from "@tanstack/react-router";
import { Award, Building2, Calendar, Download, FileText, Sparkles, Target, Users } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/app/ui";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Campus Connect" }] }),
  component: ReportsPage,
});

const reports = [
  { icon: Users, title: "Student Growth Report", desc: "Per-student CareerIQ trajectory across the term.", tag: "Most popular" },
  { icon: Building2, title: "Department Performance", desc: "Side-by-side analytics for every department.", tag: "Updated weekly" },
  { icon: Calendar, title: "Event Effectiveness", desc: "Attendance, completion, and satisfaction per event." },
  { icon: Sparkles, title: "Engagement Pulse", desc: "Weekly engagement heatmap and trend lines." },
  { icon: Target, title: "Skill Gap Briefing", desc: "Top missing skills vs. industry benchmarks." },
  { icon: Award, title: "Career Readiness Summary", desc: "Senior-class readiness for placement season." },
];

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Reports & insights"
        title="Generate professional reports"
        description="Beautifully formatted PDFs and shareable dashboards ready for faculty and stakeholders."
      >
        <button className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all flex items-center gap-2">
          <Download className="size-3.5" />
          Export all
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {reports.map((r) => (
          <Card key={r.title} className="p-5 hover:bg-surface/60 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="size-10 rounded-xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center">
                <r.icon className="size-5 text-teal" />
              </div>
              {r.tag && <Pill tone="teal">{r.tag}</Pill>}
            </div>
            <p className="text-sm font-semibold">{r.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
            <div className="mt-5 flex items-center gap-2">
              <button className="h-8 px-3 rounded-lg bg-foreground text-background text-[11px] font-medium hover:opacity-90 transition-opacity">
                Generate
              </button>
              <button className="h-8 px-3 rounded-lg border border-white/10 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
                Preview
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="size-4 text-teal" />
          <h3 className="text-sm font-semibold">Custom report builder</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-5 max-w-md">
          Compose a report from any combination of metrics, time ranges, and
          departments. Output as PDF, CSV, or shareable dashboard link.
        </p>
        <button className="h-9 px-4 rounded-lg border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors">
          Open builder
        </button>
      </Card>
    </div>
  );
}

// re-export the named component so TanStack picks it up via `component:`
function _alias() { return null; }
void _alias;