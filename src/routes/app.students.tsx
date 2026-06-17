import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Download, Filter, Pencil, Plus, RotateCcw, Search, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Card, EmptyState, PageHeader, Pill, StudentFormDialog } from "@/components/dashboard";
import { departments } from "@/lib/demo/data";
import type { Student } from "@/lib/demo/data/students";
import { studentActions, useStudents } from "@/lib/demo/store";
import { downloadCSV } from "@/lib/demo/csv";

const STATUSES = ["All", "High Performer", "Active", "At Risk"] as const;
type StatusFilter = (typeof STATUSES)[number];

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  dept: fallback(z.string(), "ALL").default("ALL"),
  status: fallback(z.enum(["All", "High Performer", "Active", "At Risk"]), "All").default("All"),
  sort: fallback(z.enum(["careerIQ", "name", "pulse"]), "careerIQ").default("careerIQ"),
});

export const Route = createFileRoute("/app/students")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Students — Campus Connect" },
      { name: "description", content: "Browse student profiles, growth journeys, and personalized CareerIQ analytics across every department." },
      { property: "og:title", content: "Students — Campus Connect" },
      { property: "og:description", content: "Profiles, growth journeys, and CareerIQ analytics for every student." },
      { property: "og:url", content: "https://campus-growth-insights.lovable.app/app/students" },
    ],
    links: [{ rel: "canonical", href: "https://campus-growth-insights.lovable.app/app/students" }],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  const navigate = useNavigate({ from: "/app/students" });
  const { q, dept, status, sort } = Route.useSearch();
  const students = useStudents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);

  type S = { q: string; dept: string; status: StatusFilter; sort: "careerIQ" | "name" | "pulse" };
  const set = (patch: Partial<S>) =>
    navigate({ search: (prev: S) => ({ ...prev, ...patch }) });

  const list = useMemo(() => {
    const filtered = students.filter((s) => {
      if (dept !== "ALL" && s.department !== dept) return false;
      if (status !== "All" && s.status !== status) return false;
      if (!q) return true;
      const term = q.toLowerCase();
      return s.name.toLowerCase().includes(term) || s.goal.toLowerCase().includes(term);
    });
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "pulse") return b.pulse - a.pulse;
      return b.careerIQ - a.careerIQ;
    });
  }, [students, q, dept, status, sort]);

  const counts = useMemo(() => ({
    All: students.length,
    "High Performer": students.filter((s) => s.status === "High Performer").length,
    Active: students.filter((s) => s.status === "Active").length,
    "At Risk": students.filter((s) => s.status === "At Risk").length,
  }), [students]);

  const onDelete = (s: Student) => {
    if (!confirm(`Remove ${s.name}? This only affects the demo session.`)) return;
    studentActions.remove(s.id);
    toast.success(`Removed ${s.name}`, {
      action: { label: "Undo", onClick: () => studentActions.add({ name: s.name, email: s.email, department: s.department, year: s.year, goal: s.goal, careerIQ: s.careerIQ }) },
    });
  };

  const onEdit = (s: Student) => {
    setEditing(s);
    setDialogOpen(true);
  };

  const exportList = () => {
    downloadCSV(`students-${new Date().toISOString().slice(0, 10)}`, list.map((s) => ({
      id: s.id, name: s.name, email: s.email, department: s.department,
      year: s.year, goal: s.goal, careerIQ: s.careerIQ, pulse: s.pulse, status: s.status,
    })));
    toast.success(`Exported ${list.length} students`);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Student intelligence"
        title="Students"
        description="Profiles, growth journeys, and personalized analytics for every student in your institution."
      >
        <button
          onClick={exportList}
          className="h-9 px-3 rounded-lg border border-white/10 bg-surface/40 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface transition-colors inline-flex items-center gap-1.5"
        >
          <Download className="size-3.5" />
          Export
        </button>
        <button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all inline-flex items-center gap-1.5"
        >
          <Plus className="size-3.5" />
          Add student
        </button>
      </PageHeader>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => set({ status: s })}
            className={`px-3 h-8 rounded-full text-[11px] font-medium border transition-colors ${
              status === s
                ? "bg-teal/15 border-teal/40 text-teal"
                : "border-white/10 text-muted-foreground hover:text-foreground"
            }`}
          >
            {s} <span className="opacity-60 ml-1">{counts[s]}</span>
          </button>
        ))}
      </div>

      <Card className="p-3 mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-background/40 border border-white/10 flex-1 min-w-[200px]">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => set({ q: e.target.value })}
            placeholder="Search by name or goal..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Filter className="size-3.5 text-muted-foreground" />
          <select
            value={dept}
            onChange={(e) => set({ dept: e.target.value })}
            className="h-9 px-3 rounded-lg bg-background/40 border border-white/10 text-xs text-foreground outline-none cursor-pointer hover:bg-background/70"
          >
            <option value="ALL">All departments</option>
            {departments.map((d) => (
              <option key={d.code} value={d.code}>{d.code} — {d.name}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => set({ sort: e.target.value as "careerIQ" | "name" | "pulse" })}
            className="h-9 px-3 rounded-lg bg-background/40 border border-white/10 text-xs text-foreground outline-none cursor-pointer hover:bg-background/70"
          >
            <option value="careerIQ">Sort: CareerIQ</option>
            <option value="name">Sort: Name</option>
            <option value="pulse">Sort: Pulse</option>
          </select>
          {(q || dept !== "ALL" || status !== "All") && (
            <button
              onClick={() => set({ q: "", dept: "ALL", status: "All" })}
              className="h-9 px-3 rounded-lg text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <RotateCcw className="size-3" /> Clear
            </button>
          )}
        </div>
        <span className="text-[11px] text-muted-foreground ml-auto">{list.length} of {students.length}</span>
      </Card>

      {list.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students match this filter"
          description="Try clearing your search or selecting a different department."
          action={
            <button onClick={() => set({ q: "", dept: "ALL", status: "All" })} className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium">
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((s) => (
            <div
              key={s.id}
              className="group relative rounded-2xl border border-white/5 bg-surface/40 p-5 hover:bg-surface/70 hover:border-white/15 transition-all"
            >
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(s)}
                  aria-label={`Edit ${s.name}`}
                  className="size-7 rounded-md bg-background/60 border border-white/10 grid place-items-center text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="size-3" />
                </button>
                <button
                  onClick={() => onDelete(s)}
                  aria-label={`Delete ${s.name}`}
                  className="size-7 rounded-md bg-background/60 border border-white/10 grid place-items-center text-muted-foreground hover:text-rose"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
              <Link
                to="/app/students/$id"
                params={{ id: s.id }}
                className="block"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-11 rounded-full grid place-items-center text-sm font-semibold text-background"
                      style={{ background: `oklch(0.7 0.13 ${s.avatarHue})` }}
                    >
                      {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{s.department} · Year {s.year}</p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">CareerIQ</p>
                    <p className="text-4xl font-semibold text-teal leading-none mt-1">{s.careerIQ}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{s.certifications.length} certs · {s.goal}</span>
                </div>
                <StatusBadge status={s.status} />
              </Link>
            </div>
          ))}
        </div>
      )}

      <StudentFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editing={editing}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: "High Performer" | "Active" | "At Risk" }) {
  const map = {
    "High Performer": { tone: "teal" as const, dot: "🟢" },
    Active: { tone: "iris" as const, dot: "🔵" },
    "At Risk": { tone: "rose" as const, dot: "🟡" },
  };
  const m = map[status];
  return (
    <Pill tone={m.tone}>
      <span className="mr-1">{m.dot}</span>
      {status}
    </Pill>
  );
}