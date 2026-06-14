import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardHeader, PageHeader, Pill } from "@/components/app/ui";
import { DepartmentBars, EngagementHeatmap, SkillGapBars } from "@/components/app/charts";
import { departments, events, skillGaps, trendingSkills } from "@/lib/demo/data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Campus Connect" }] }),
  component: AnalyticsPage,
});

type Tab = "performance" | "skills" | "engagement";
const TABS: { id: Tab; label: string }[] = [
  { id: "performance", label: "Performance" },
  { id: "skills", label: "Skills" },
  { id: "engagement", label: "Engagement" },
];

function AnalyticsPage() {
  const [tab, setTab] = useState<Tab>("performance");
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Institutional analytics"
        description="Performance, skills, and engagement — all in one place."
      />

      <div className="inline-flex p-1 rounded-xl bg-surface/40 border border-white/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 h-9 rounded-lg text-xs font-medium transition-colors ${
              tab === t.id ? "bg-teal text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "performance" && <PerformanceTab />}
      {tab === "skills" && <SkillsTab />}
      {tab === "engagement" && <EngagementTab />}
    </div>
  );
}

function PerformanceTab() {
  return (
    <Card className="p-1">
      <CardHeader
        title="Department comparison"
        description="Participation, engagement and CareerIQ across departments"
        action={
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-teal" />Participation</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-iris" />Engagement</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-rose" />CareerIQ</span>
          </div>
        }
      />
      <div className="px-2 pb-4">
        <DepartmentBars data={departments} />
      </div>
      <div className="border-t border-white/5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {departments.map((d) => (
          <div key={d.id} className="p-4 border-r last:border-r-0 border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.code}</p>
            <p className="text-base font-semibold mt-1">{d.careerIQ}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{d.students} students</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SkillsTab() {
  const top5 = trendingSkills.slice(0, 5);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="p-5">
        <CardHeader title="Top 5 skills" description="Highest growth this quarter" />
        <div className="space-y-4 pt-2">
          {top5.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-xs mb-1.5">
                <span>{s.name}</span>
                <span className="text-teal">+{s.delta}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal to-iris" style={{ width: `${Math.min(s.delta * 3, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <CardHeader title="Skill gap chart" description="Biggest institutional gaps vs. industry" />
        <SkillGapBars data={skillGaps} />
      </Card>
    </div>
  );
}

function EngagementTab() {
  const totalAttendance = events.reduce((a, e) => a + e.attendance, 0);
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold">Engagement heatmap</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 16 weeks of activity · {totalAttendance.toLocaleString()} total attendance</p>
        </div>
        <Pill tone="teal">Tue afternoons peak</Pill>
      </div>
      <EngagementHeatmap />
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-4 justify-end">
        <span>Less</span>
        {[0.12, 0.3, 0.5, 0.75, 1].map((o) => (
          <span key={o} className="size-2.5 rounded-sm bg-teal" style={{ opacity: o }} />
        ))}
        <span>More</span>
      </div>
    </Card>
  );
}