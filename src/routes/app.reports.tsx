import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Building2, Download, Eye, Users } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Campus Connect" },
      { name: "description", content: "Generate and export student performance, department summary, and placement readiness reports for stakeholders." },
      { property: "og:title", content: "Reports — Campus Connect" },
      { property: "og:description", content: "Generate student performance, department, and placement readiness reports." },
      { property: "og:url", content: "https://campus-growth-insights.lovable.app/app/reports" },
    ],
    links: [{ rel: "canonical", href: "https://campus-growth-insights.lovable.app/app/reports" }],
  }),
  component: ReportsPage,
});

const reports = [
  { icon: Users, title: "Student Performance Report", desc: "Per-student CareerIQ trajectory across the term." },
  { icon: Building2, title: "Department Summary", desc: "Side-by-side analytics for every department." },
  { icon: Briefcase, title: "Placement Readiness Report", desc: "Senior-class readiness for placement season." },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports"
        title="Generate institutional reports"
        description="Beautifully formatted reports ready to share with faculty and stakeholders."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((r) => (
          <Card key={r.title} className="p-6 hover:bg-surface/60 transition-colors">
            <div className="size-11 rounded-xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center mb-5">
              <r.icon className="size-5 text-teal" />
            </div>
            <p className="text-base font-semibold">{r.title}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{r.desc}</p>
            <div className="mt-6 flex items-center gap-2">
              <button className="flex-1 h-9 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all flex items-center justify-center gap-1.5">
                <Download className="size-3.5" />
                Generate
              </button>
              <button className="h-9 px-3 rounded-lg border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors flex items-center gap-1.5">
                <Eye className="size-3.5" />
                Preview
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}