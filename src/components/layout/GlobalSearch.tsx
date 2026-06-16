import { Link } from "@tanstack/react-router";
import { Building2, Calendar, Search, Target, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { departments, events, students } from "@/lib/demo/data";

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) {
      return {
        students: students.slice(0, 4),
        events: events.slice(0, 3),
        departments: departments.slice(0, 3),
        skills: [] as { name: string }[],
      };
    }
    const skillSet = new Set<string>();
    students.forEach((s) => s.skills.forEach((sk) => {
      if (sk.name.toLowerCase().includes(term)) skillSet.add(sk.name);
    }));
    return {
      students: students.filter((s) => s.name.toLowerCase().includes(term) || s.email.includes(term)).slice(0, 6),
      events: events.filter((e) => e.title.toLowerCase().includes(term) || e.category.toLowerCase().includes(term)).slice(0, 5),
      departments: departments.filter((d) => d.code.toLowerCase().includes(term) || d.name.toLowerCase().includes(term)),
      skills: Array.from(skillSet).slice(0, 6).map((name) => ({ name })),
    };
  }, [q]);

  if (!open) return null;

  const empty =
    results.students.length === 0 &&
    results.events.length === 0 &&
    results.departments.length === 0 &&
    results.skills.length === 0;

  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm animate-fade-up" onClick={onClose}>
      <div className="mx-auto mt-24 max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-2xl border border-white/10 bg-surface shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 h-14 border-b border-white/5">
            <Search className="size-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search students, events, skills, departments..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="text-[10px] font-mono text-muted-foreground">ESC</span>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {empty ? (
              <EmptyResults q={q} />
            ) : (
              <>
                <ResultGroup label="Students" icon={User}>
                  {results.students.map((s) => (
                    <Link
                      key={s.id}
                      to="/app/students/$id"
                      params={{ id: s.id }}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="size-7 rounded-full text-[10px] grid place-items-center font-semibold" style={{ background: `oklch(0.6 0.12 ${s.avatarHue})` }}>
                        {s.name.slice(0, 1)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm truncate">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{s.department} · Year {s.year}</p>
                      </div>
                      <span className="text-xs text-teal">{s.careerIQ}</span>
                    </Link>
                  ))}
                </ResultGroup>
                <ResultGroup label="Events" icon={Calendar}>
                  {results.events.map((e) => (
                    <Link key={e.id} to="/app/analytics" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="size-7 rounded-md bg-iris/20 border border-iris/30 grid place-items-center">
                        <Calendar className="size-3.5 text-iris" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm truncate">{e.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{e.category} · {e.date}</p>
                      </div>
                      <span className="text-xs text-teal">{e.successScore}</span>
                    </Link>
                  ))}
                </ResultGroup>
                <ResultGroup label="Departments" icon={Building2}>
                  {results.departments.map((d) => (
                    <Link key={d.id} to="/app/analytics" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="size-7 rounded-md grid place-items-center text-[10px] font-semibold" style={{ background: `color-mix(in oklab, ${d.color} 20%, transparent)`, color: d.color }}>
                        {d.code}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm truncate">{d.name}</p>
                        <p className="text-[11px] text-muted-foreground">{d.students} students</p>
                      </div>
                    </Link>
                  ))}
                </ResultGroup>
                {results.skills.length > 0 && (
                  <ResultGroup label="Skills" icon={Target}>
                    {results.skills.map((s) => (
                      <Link key={s.name} to="/app/analytics" onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Target className="size-3.5 text-teal" />
                        <span className="text-sm">{s.name}</span>
                      </Link>
                    ))}
                  </ResultGroup>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultGroup({ label, icon: Icon, children }: { label: string; icon: typeof User; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="size-3" />
        {label}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function EmptyResults({ q }: { q: string }) {
  return (
    <div className="text-center py-14">
      <div className="mx-auto size-14 rounded-full bg-surface-2 grid place-items-center mb-3">
        <Search className="size-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No results for "{q}"</p>
      <p className="text-xs text-muted-foreground mt-1">Try a student name, event title, or skill.</p>
    </div>
  );
}