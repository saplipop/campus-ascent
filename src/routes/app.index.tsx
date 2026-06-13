import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  Calendar,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  Card,
  CardHeader,
  KpiCard,
  PageHeader,
  Pill,
  ProgressRing,
} from "@/components/app/ui";
import {
  CareerIQRadar,
  DepartmentBars,
  EngagementHeatmap,
  PulseTrend,
} from "@/components/app/charts";
import {
  departments,
  notifications,
  overviewKpis,
  pulseSeries,
  trendingSkills,
} from "@/lib/demo/data";
import { useDemoSession } from "@/lib/demo/auth";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — Campus Connect" }] }),
  component: Overview,
});

function Overview() {
  const { user } = useDemoSession();
  const radarData = [
    { axis: "Technical", value: 88 },
    { axis: "Comms", value: 72 },
    { axis: "Leadership", value: 78 },
    { axis: "Certs", value: 90 },
    { axis: "Consistency", value: 74 },
    { axis: "Participation", value: 82 },
  ];

  return (
    <div>
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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Total Students" value={overviewKpis.totalStudents} icon={Users} delta={4.2} />
        <KpiCard label="Active" value={overviewKpis.activeStudents} icon={Activity} delta={6.1} tone="iris" />
        <KpiCard label="Campus Pulse" value={overviewKpis.pulse} icon={Sparkles} suffix="%" delta={3.1} />
        <KpiCard label="CareerIQ" value={overviewKpis.careerIQ} icon={Award} suffix="%" delta={5.4} tone="iris" />
        <KpiCard label="Event Success" value={overviewKpis.eventSuccess} icon={Calendar} suffix="%" delta={2.8} tone="rose" />
        <KpiCard label="Skill Progress" value={overviewKpis.skillProgress} icon={Target} suffix="%" delta={7.9} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-1">
          <CardHeader
            title="Campus Pulse & CareerIQ"
            description="Year-to-date growth across both intelligence indices"
            action={
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-teal" /> Pulse</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-iris" /> CareerIQ</span>
              </div>
            }
          />
          <div className="px-2 pb-4">
            <PulseTrend data={pulseSeries} />
          </div>
        </Card>

        <Card className="p-1">
          <CardHeader title="CareerIQ Radar" description="Institutional skill blend" />
          <div className="px-2 pb-4">
            <CareerIQRadar data={radarData} />
          </div>
          <div className="grid grid-cols-3 border-t border-white/5 divide-x divide-white/5">
            <div className="p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Score</p>
              <p className="text-base font-semibold text-teal">81.2</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Percentile</p>
              <p className="text-base font-semibold">88th</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Trend</p>
              <p className="text-base font-semibold text-teal">+5.4%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-1">
          <CardHeader
            title="Department performance"
            description="Compare participation, engagement and CareerIQ"
            action={
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-teal" /> Participation</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-iris" /> Engagement</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-rose" /> CareerIQ</span>
              </div>
            }
          />
          <div className="px-2 pb-4">
            <DepartmentBars data={departments} />
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1">Trending skills</h3>
          <p className="text-xs text-muted-foreground mb-5">Highest growth across active students</p>
          <div className="space-y-3">
            {trendingSkills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span>{s.name}</span>
                  <span className="text-teal">+{s.delta}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal to-iris" style={{ width: `${s.delta * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold">Campus engagement heatmap</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 16 weeks of activity across 7 days</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>Less</span>
              {[0.12, 0.3, 0.5, 0.75, 1].map((o) => (
                <span key={o} className="size-2.5 rounded-sm bg-teal" style={{ opacity: o }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <EngagementHeatmap />
          <p className="text-[11px] text-muted-foreground mt-4">
            Strongest engagement window: <span className="text-foreground">Tuesday afternoons</span>.
            Lowest dip: <span className="text-foreground">Friday late evenings</span>.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1">Recent activity</h3>
          <p className="text-xs text-muted-foreground mb-5">Most recent platform signals</p>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-3 text-sm">
                <div className="size-7 rounded-lg bg-teal/15 text-teal grid place-items-center shrink-0">
                  <GraduationCap className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{n.title}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{n.body}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold">Readiness rings</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Top departments by composite CareerIQ</p>
          </div>
          <Link to="/app/departments" className="text-xs text-teal flex items-center gap-1 hover:underline">
            View all <ChevronRight className="size-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {departments.map((d) => (
            <div key={d.id} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-colors">
              <ProgressRing value={d.careerIQ} label="CIQ" />
              <div>
                <p className="text-xs font-medium">{d.code}</p>
                <p className="text-[10px] text-muted-foreground">{d.students} students</p>
              </div>
              <Pill tone={d.careerIQ >= 80 ? "teal" : d.careerIQ >= 70 ? "iris" : "rose"}>
                {d.careerIQ >= 80 ? "Elite" : d.careerIQ >= 70 ? "Rising" : "At risk"}
              </Pill>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}