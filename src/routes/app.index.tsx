import { createFileRoute } from "@tanstack/react-router";
import { Activity, Award, Briefcase, GraduationCap, Sparkles, TrendingUp, Users } from "lucide-react";
import { Card, CardHeader, KpiCard, PageHeader } from "@/components/app/ui";
import { GrowthLine } from "@/components/app/charts";
import { activityFeed, insights, overviewKpis, studentGrowth } from "@/lib/demo/data";
import { useFocusMode } from "@/lib/demo/preferences";
import { useDemoSession } from "@/lib/demo/auth";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — Campus Connect" }] }),
  component: Overview,
});

function Overview() {
  const { user } = useDemoSession();
  const { focus } = useFocusMode();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        title="Institutional overview"
        description="A real-time view of student development across every department."
      >
        <button className="h-9 px-4 rounded-lg border border-white/10 bg-surface/40 text-xs font-medium hover:bg-surface transition-colors">
          Last 30 days
        </button>
        <button className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all">
          Export report
        </button>
      </PageHeader>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Students" value={overviewKpis.totalStudents} icon={Users} delta={4.2} />
        <KpiCard label="Active Engagement" value={overviewKpis.activeEngagement} suffix="%" icon={Activity} delta={6.1} tone="iris" />
        <KpiCard label="Avg CareerIQ" value={overviewKpis.careerIQ} suffix="%" icon={Award} delta={5.4} />
        <KpiCard label="Placement Readiness" value={overviewKpis.placementReadiness} suffix="%" icon={Briefcase} delta={3.8} tone="rose" />
      </div>

      {/* Single trend graph */}
      <Card className="p-1">
        <CardHeader
          title="Student Growth Trend"
          description="Monthly composite CareerIQ across the institution"
          action={
            <span className="text-[10px] flex items-center gap-1.5 text-teal">
              <TrendingUp className="size-3" /> +12.4% YTD
            </span>
          }
        />
        <div className="px-2 pb-4">
          <GrowthLine data={studentGrowth} />
        </div>
      </Card>

      {!focus && (
        <>
          {/* Quick AI-style insights */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Quick insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((it) => (
                <Card key={it.id} className="p-5">
                  <div className={`size-9 rounded-xl grid place-items-center mb-4 ${
                    it.tone === "teal" ? "bg-teal/15 text-teal" : it.tone === "iris" ? "bg-iris/15 text-iris" : "bg-rose/15 text-rose"
                  }`}>
                    <Sparkles className="size-4" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{it.label}</p>
                  <p className="text-base font-semibold mt-1.5">{it.value}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold mb-1">Recent activity</h3>
            <p className="text-xs text-muted-foreground mb-5">Latest signals across campus</p>
            <ul className="space-y-3">
              {activityFeed.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <div className="size-8 rounded-lg bg-teal/15 text-teal grid place-items-center shrink-0">
                    <GraduationCap className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{a.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </div>
  );
}