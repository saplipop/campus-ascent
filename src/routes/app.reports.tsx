import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Building2, Download, Eye, FileText, Trash2, Users, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, EmptyState, Modal, PageHeader, Pill } from "@/components/dashboard";
import { departments } from "@/lib/demo/data";
import { useStudents, useReports, reportActions } from "@/lib/demo/store";
import { downloadCSV } from "@/lib/demo/csv";

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

type ReportKind = "performance" | "department" | "placement";

function ReportsPage() {
  const students = useStudents();
  const reports = useReports();
  const [preview, setPreview] = useState<{ kind: ReportKind; title: string } | null>(null);

  const builders: Record<ReportKind, () => Record<string, unknown>[]> = {
    performance: () => students.map((s) => ({
      name: s.name, department: s.department, year: s.year,
      careerIQ: s.careerIQ, pulse: s.pulse, status: s.status, goal: s.goal,
    })),
    department: () => departments.map((d) => ({
      code: d.code, name: d.name, students: d.students,
      participation: d.participation, engagement: d.engagement, careerIQ: d.careerIQ,
    })),
    placement: () => students
      .filter((s) => s.year >= 3)
      .map((s) => ({
        name: s.name, department: s.department, year: s.year,
        careerIQ: s.careerIQ, certifications: s.certifications.length,
        readiness: s.careerIQ >= 80 ? "Ready" : s.careerIQ >= 65 ? "Almost" : "Needs work",
      })),
  };

  const cards: { kind: ReportKind; icon: LucideIcon; title: string; desc: string }[] = [
    { kind: "performance", icon: Users, title: "Student Performance Report", desc: "Per-student CareerIQ trajectory across the term." },
    { kind: "department", icon: Building2, title: "Department Summary", desc: "Side-by-side analytics for every department." },
    { kind: "placement", icon: Briefcase, title: "Placement Readiness Report", desc: "Senior-class readiness for placement season." },
  ];

  const onGenerate = (kind: ReportKind, title: string) => {
    const rows = builders[kind]();
    const filename = `${kind}-report-${new Date().toISOString().slice(0, 10)}`;
    downloadCSV(filename, rows);
    reportActions.add({ kind, title, rows: rows.length });
    toast.success(`${title} generated`, { description: `${rows.length} rows exported` });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reports"
        title="Generate institutional reports"
        description="Beautifully formatted reports ready to share with faculty and stakeholders."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((r) => (
          <Card key={r.kind} className="p-6 hover:bg-surface/60 transition-colors">
            <div className="size-11 rounded-xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center mb-5">
              <r.icon className="size-5 text-teal" />
            </div>
            <p className="text-base font-semibold">{r.title}</p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{r.desc}</p>
            <p className="text-[10px] text-muted-foreground mt-3">~{builders[r.kind]().length} rows</p>
            <div className="mt-6 flex items-center gap-2">
              <button
                onClick={() => onGenerate(r.kind, r.title)}
                className="flex-1 h-9 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="size-3.5" />
                Generate
              </button>
              <button
                onClick={() => setPreview({ kind: r.kind, title: r.title })}
                className="h-9 px-3 rounded-lg border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <Eye className="size-3.5" />
                Preview
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-sm font-semibold tracking-tight">Recent reports</h3>
          <Pill tone="iris">{reports.length} generated this session</Pill>
        </div>
        {reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No reports yet"
            description="Generate a report above — it will be downloaded and listed here."
          />
        ) : (
          <ul className="divide-y divide-white/5">
            {reports.map((r) => (
              <li key={r.id} className="flex items-center gap-4 py-3">
                <div className="size-9 rounded-lg bg-teal/15 text-teal grid place-items-center">
                  <FileText className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.rows} rows · {new Date(r.generatedAt).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => reportActions.remove(r.id)}
                  aria-label="Remove from history"
                  className="size-8 rounded-md border border-white/10 grid place-items-center text-muted-foreground hover:text-rose"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.title} — preview` : ""}
        description="First 10 rows. Click Generate to download the full CSV."
        size="lg"
      >
        {preview && <PreviewTable rows={builders[preview.kind]().slice(0, 10)} />}
        {preview && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={() => { onGenerate(preview.kind, preview.title); setPreview(null); }}
              className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 inline-flex items-center gap-1.5"
            >
              <Download className="size-3.5" /> Download CSV
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function PreviewTable({ rows }: { rows: Record<string, unknown>[] }) {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">No rows.</p>;
  const headers = Object.keys(rows[0]);
  return (
    <div className="overflow-x-auto rounded-lg border border-white/5">
      <table className="w-full text-xs">
        <thead className="bg-surface/60">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left font-medium text-muted-foreground uppercase tracking-widest text-[10px] px-3 py-2">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5">
              {headers.map((h) => (
                <td key={h} className="px-3 py-2">{String(r[h])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}