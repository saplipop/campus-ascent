import { ArrowRight, Play, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden grid-pattern">
      {/* Ambient gradient */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-teal/15 blur-[140px] rounded-full pointer-events-none" />
      <div aria-hidden className="absolute top-40 right-10 w-[400px] h-[400px] bg-iris/15 blur-[120px] rounded-full pointer-events-none" />
      <div aria-hidden className="absolute top-60 left-10 w-[300px] h-[300px] bg-rose/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-surface/60 text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-8 animate-fade-up">
            <span className="size-1.5 rounded-full bg-teal animate-pulse" />
            Introducing Growth Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance max-w-[22ch] mb-6 animate-fade-up [animation-delay:80ms]">
            Transform Student Activities into{" "}
            <span className="iridescent-text">Growth Intelligence</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-[58ch] text-pretty mb-10 animate-fade-up [animation-delay:160ms]">
            Go beyond attendance. Measure career readiness, map emerging skill
            gaps, and visualize student development with an observatory-grade
            analytics platform built for modern institutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 animate-fade-up [animation-delay:240ms]">
            <button className="group h-11 px-5 rounded-full bg-teal text-background text-sm font-medium flex items-center gap-2 shadow-lg shadow-teal/25 hover:brightness-110 transition-all">
              Request institutional demo
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button className="h-11 px-5 rounded-full border border-white/10 bg-surface/60 text-sm font-medium flex items-center gap-2 hover:bg-surface transition-colors">
              <Play className="size-3.5 fill-foreground" />
              Watch product tour
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground animate-fade-up [animation-delay:320ms]">
            Trusted by 48+ institutions · No credit card · Pilot in 2 weeks
          </p>
        </div>

        {/* Floating analytics preview */}
        <div className="relative mt-24 max-w-5xl mx-auto animate-fade-up [animation-delay:400ms]">
          <HeroPreview />

          {/* Floating glass cards */}
          <div className="hidden md:block absolute -top-10 -left-8 lg:-left-16 w-56 glass rounded-2xl p-5 shadow-2xl animate-float-y">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-3">
              CareerIQ Score
            </p>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-semibold">82.4</span>
              <span className="text-[11px] text-teal font-medium mb-1.5 inline-flex items-center gap-0.5">
                <TrendingUp className="size-3" /> +12%
              </span>
            </div>
            <div className="flex gap-1 items-end h-10">
              {[30, 50, 40, 70, 55, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-teal/70 rounded-sm"
                  style={{ height: `${h}%`, opacity: 0.4 + (i / 7) * 0.6 }}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-16 -translate-y-1/2 w-60 glass rounded-2xl p-5 shadow-2xl animate-float-y [animation-delay:1s]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium">Skill Distribution</span>
              <span className="text-[10px] text-muted-foreground">Live</span>
            </div>
            <div className="space-y-3">
              <SkillBar label="Leadership" value={94} color="bg-rose" />
              <SkillBar label="Technical" value={76} color="bg-teal" />
              <SkillBar label="Communication" value={68} color="bg-iris" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-medium mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-surface/40 p-3 shadow-2xl overflow-hidden">
      <div className="rounded-xl bg-background/80 border border-white/5 overflow-hidden">
        {/* Window chrome */}
        <div className="h-9 border-b border-white/5 flex items-center px-4 gap-2">
          <div className="size-2.5 rounded-full bg-rose/60" />
          <div className="size-2.5 rounded-full bg-yellow-500/40" />
          <div className="size-2.5 rounded-full bg-teal/60" />
          <div className="ml-4 text-[10px] text-muted-foreground font-mono">
            campus-connect.app / overview
          </div>
        </div>

        <div className="p-6 grid grid-cols-12 gap-4">
          {/* KPIs */}
          <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "Active Students", v: "12,482", d: "+8.2%" },
              { l: "Certifications", v: "4,102", d: "+14%" },
              { l: "Engagement", v: "68.4%", d: "+3.1%" },
              { l: "Campus Pulse", v: "Healthy", d: "Stable" },
            ].map((k) => (
              <div key={k.l} className="rounded-lg border border-white/5 bg-surface/40 p-3">
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
                <p className="text-lg font-semibold mt-1">{k.v}</p>
                <p className="text-[10px] text-teal mt-0.5">{k.d}</p>
              </div>
            ))}
          </div>

          {/* Chart row */}
          <div className="col-span-12 md:col-span-8 rounded-lg border border-white/5 bg-surface/40 p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-medium">Campus Pulse — last 90 days</p>
              <p className="text-[10px] text-muted-foreground">Live</p>
            </div>
            <MiniAreaChart />
          </div>
          <div className="col-span-12 md:col-span-4 rounded-lg border border-white/5 bg-surface/40 p-4">
            <p className="text-xs font-medium mb-3">Top Departments</p>
            <div className="space-y-3">
              {[
                { d: "Computer Science", v: 92, c: "bg-teal" },
                { d: "Business Admin", v: 84, c: "bg-iris" },
                { d: "Mechanical Eng.", v: 71, c: "bg-rose" },
              ].map((r) => (
                <div key={r.d}>
                  <div className="flex justify-between text-[10px] mb-1 text-muted-foreground">
                    <span>{r.d}</span><span className="text-foreground">{r.v}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${r.c}`} style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniAreaChart() {
  const points = [12, 28, 22, 40, 38, 55, 48, 62, 70, 65, 78, 72, 88, 82, 95];
  const max = 100;
  const w = 100, h = 40;
  const step = w / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.14 180)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.82 0.14 180)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#grad)" />
      <path d={path} fill="none" stroke="oklch(0.82 0.14 180)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}