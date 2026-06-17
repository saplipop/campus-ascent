import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Activity, Award, Briefcase, Download, GraduationCap, Sparkles, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { Card, CardHeader, KpiCard, PageHeader } from "@/components/dashboard";
import { GrowthLine } from "@/components/charts";
import { activityFeed, insights, overviewKpis, studentGrowth } from "@/lib/demo/data";
import { useStudents } from "@/lib/demo/store";
import { downloadCSV } from "@/lib/demo/csv";
import { useFocusMode } from "@/lib/demo/preferences";
import { useDemoSession } from "@/lib/demo/auth";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — Campus Connect" },
      { name: "description", content: "Real-time institutional overview: KPIs, student growth trends, and AI insights across every department." },
      { property: "og:title", content: "Overview — Campus Connect" },
      { property: "og:description", content: "Real-time institutional KPIs, student growth trends, and AI insights." },
      { property: "og:url", content: "https://campus-growth-insights.lovable.app/app" },
    ],
    links: [{ rel: "canonical", href: "https://campus-growth-insights.lovable.app/app" }],
  }),
  component: Overview,
});

function Overview() {
  const { user } = useDemoSession();
  const { focus } = useFocusMode();
  const allStudents = useStudents();
  const [range, setRange] = useState<"7d" | "30d" | "90d" | "ytd">("30d");

  // Live KPI derivation from the mutable store + range multiplier
  const liveKpis = useMemo(() => {
    const mult = range === "7d" ? 0.92 : range === "30d" ? 1 : range === "90d" ? 1.05 : 1.12;
    const avg = (k: keyof (typeof allStudents)[number], fallback: number) => {
      if (!allStudents.length) return fallback;
      const v = allStudents.reduce((a, s) => a + (s[k] as number), 0) / allStudents.length;
      return Math.round(v * 10) / 10;
    };
    return {
      totalStudents: allStudents.length || overviewKpis.totalStudents,
      activeEngagement: Math.round(avg("pulse", overviewKpis.activeEngagement) * mult * 10) / 10,
      careerIQ: Math.round(avg("careerIQ", overviewKpis.careerIQ) * mult * 10) / 10,
      placementReadiness: Math.round(overviewKpis.placementReadiness * mult * 10) / 10,
    };
  }, [allStudents, range]);

  const trend = useMemo(() => {
    const slice = range === "7d" ? 3 : range === "30d" ? 6 : range === "90d" ? 9 : 12;
    return studentGrowth.slice(-slice);
  }, [range]);

  const exportOverview = () => {
    downloadCSV(`overview-${range}-${new Date().toISOString().slice(0, 10)}`, [
      { metric: "Total Students", value: liveKpis.totalStudents, range },
      { metric: "Active Engagement %", value: liveKpis.activeEngagement, range },
      { metric: "Avg CareerIQ", value: liveKpis.careerIQ, range },
      { metric: "Placement Readiness %", value: liveKpis.placementReadiness, range },
    ]);
    toast.success("Overview exported", { description: `overview-${range}.csv` });
  };

  const RANGES: { id: typeof range; label: string }[] = [
    { id: "7d", label: "7d" },
    { id: "30d", label: "30d" },
    { id: "90d", label: "90d" },
    { id: "ytd", label: "YTD" },
  ];

  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        title="Institutional overview"
        description="A real-time view of student development across every department."
      >
        <div className="inline-flex p-1 rounded-lg bg-surface/40 border border-white/10">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3 h-7 rounded-md text-[11px] font-medium transition-colors ${
                range === r.id ? "bg-teal text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          onClick={exportOverview}
          className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all inline-flex items-center gap-1.5"
        >
          <Download className="size-3.5" />
          Export
        </button>
      </PageHeader>

      {/* 4 KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <Link to="/app/students" className="block">
          <KpiCard label="Total Students" value={liveKpis.totalStudents} icon={Users} delta={4.2} />
        </Link>
        <Link to="/app/analytics" className="block">
          <KpiCard label="Active Engagement" value={liveKpis.activeEngagement} suffix="%" icon={Activity} delta={6.1} tone="iris" />
        </Link>
        <Link to="/app/analytics" className="block">
          <KpiCard label="Avg CareerIQ" value={liveKpis.careerIQ} suffix="%" icon={Award} delta={5.4} />
        </Link>
        <Link to="/app/students" search={{ status: "High Performer" }} className="block">
          <KpiCard label="Placement Readiness" value={liveKpis.placementReadiness} suffix="%" icon={Briefcase} delta={3.8} tone="rose" />
        </Link>
      </div>

      {/* Single trend graph */}
      <Card className="p-2">
        <CardHeader
          title="Student Growth Trend"
          description={`Monthly composite CareerIQ — ${range.toUpperCase()}`}
          action={
            <span className="text-[10px] flex items-center gap-1.5 text-teal">
              <TrendingUp className="size-3" /> +12.4% YTD
            </span>
          }
        />
        <div className="px-3 pb-5">
          <GrowthLine data={trend} />
        </div>
      </Card>

      {!focus && (
        <>
          {/* Quick AI-style insights */}
          <section className="space-y-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                Quick insights
              </h2>
              <span className="text-[11px] text-muted-foreground">Updated just now</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {insights.map((it) => {
                const linkProps =
                  it.id === "i1"
                    ? { to: "/app/students" as const, search: { dept: "CSE" as const } }
                    : it.id === "i2"
                    ? { to: "/app/students" as const, search: { status: "At Risk" as const } }
                    : { to: "/app/analytics" as const };
                return (
                  <Link
                    key={it.id}
                    {...linkProps}
                    className="group"
                  >
                    <Card className="p-6 hover:bg-surface/60 transition-colors h-full">
                      <div className={`size-10 rounded-xl grid place-items-center mb-5 ${
                        it.tone === "teal" ? "bg-teal/15 text-teal" : it.tone === "iris" ? "bg-iris/15 text-iris" : "bg-rose/15 text-rose"
                      }`}>
                        <Sparkles className="size-4" />
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{it.label}</p>
                      <p className="text-base font-semibold mt-2 leading-snug group-hover:text-teal transition-colors">{it.value}</p>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Activity feed */}
          <Card className="p-7">
            <h3 className="text-sm font-semibold tracking-tight mb-1">Recent activity</h3>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Latest signals across campus</p>
            <ul className="space-y-4">
              {activityFeed.map((a) => (
                <li key={a.id} className="flex items-start gap-3.5">
                  <div className="size-9 rounded-lg bg-teal/15 text-teal grid place-items-center shrink-0">
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