import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Filter, Search, Users } from "lucide-react";
import { Card, EmptyState, PageHeader, Pill } from "@/components/app/ui";
import { departments, students } from "@/lib/demo/data";

export const Route = createFileRoute("/app/students")({
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
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<string>("ALL");

  const list = useMemo(() => {
    return students.filter((s) => {
      if (dept !== "ALL" && s.department !== dept) return false;
      if (!q) return true;
      return s.name.toLowerCase().includes(q.toLowerCase()) || s.goal.toLowerCase().includes(q.toLowerCase());
    });
  }, [q, dept]);

  return (
    <div>
      <PageHeader
        eyebrow="Student intelligence"
        title="Students"
        description="Profiles, growth journeys, and personalized analytics for every student in your institution."
      />

      <Card className="p-3 mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-background/40 border border-white/10 flex-1 min-w-[200px]">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or goal..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Filter className="size-3.5 text-muted-foreground" />
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className="h-9 px-3 rounded-lg bg-background/40 border border-white/10 text-xs text-foreground outline-none cursor-pointer hover:bg-background/70"
          >
            <option value="ALL">All departments</option>
            {departments.map((d) => (
              <option key={d.code} value={d.code}>{d.code} — {d.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {list.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No students match this filter"
          description="Try clearing your search or selecting a different department."
          action={
            <button onClick={() => { setQ(""); setDept("ALL"); }} className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium">
              Clear filters
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {list.map((s) => (
            <Link
              key={s.id}
              to="/app/students/$id"
              params={{ id: s.id }}
              className="group rounded-2xl border border-white/5 bg-surface/40 p-5 hover:bg-surface/70 hover:border-white/15 transition-all"
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
          ))}
        </div>
      )}
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

function _unused_FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 h-7 rounded-full text-[11px] font-medium border transition-colors ${
        active ? "bg-teal/15 border-teal/40 text-teal" : "border-white/10 text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}