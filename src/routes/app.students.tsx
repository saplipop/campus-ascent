import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Filter, Search, Users } from "lucide-react";
import { Card, EmptyState, PageHeader, Pill } from "@/components/app/ui";
import { departments, students } from "@/lib/demo/data";

export const Route = createFileRoute("/app/students")({
  head: () => ({ meta: [{ title: "Students — Campus Connect" }] }),
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

      <Card className="p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 px-3 h-9 rounded-lg bg-background/40 border border-white/10 flex-1 min-w-[200px]">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or goal..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Filter className="size-3 text-muted-foreground mr-1" />
          <FilterChip label="All" active={dept === "ALL"} onClick={() => setDept("ALL")} />
          {departments.map((d) => (
            <FilterChip key={d.code} label={d.code} active={dept === d.code} onClick={() => setDept(d.code)} />
          ))}
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
              <div className="flex items-start justify-between mb-4">
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
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Stat label="CareerIQ" value={s.careerIQ} accent />
                <Stat label="Pulse" value={s.pulse} />
              </div>
              <div className="flex items-center justify-between">
                <Pill tone={s.careerIQ >= 80 ? "teal" : s.careerIQ >= 70 ? "iris" : "rose"}>
                  {s.goal}
                </Pill>
                <span className="text-[10px] text-muted-foreground">{s.certifications.length} certs</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-lg bg-background/40 border border-white/5 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`text-lg font-semibold ${accent ? "text-teal" : ""}`}>{value}</p>
    </div>
  );
}