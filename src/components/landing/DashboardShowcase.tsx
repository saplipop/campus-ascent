const tabs = [
  { id: "growth", label: "Growth Analytics" },
  { id: "career", label: "CareerIQ" },
  { id: "pulse", label: "Campus Pulse" },
  { id: "events", label: "Event Intelligence" },
  { id: "dept", label: "Departments" },
];

export function DashboardShowcase() {
  return (
    <section id="platform" className="py-28 px-6 border-t border-white/5 relative overflow-hidden">
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-iris/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-4">Platform</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            One observatory. Every signal.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Switch between modules without losing context. The same student
            journey, viewed through different intelligence lenses.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                i === 0
                  ? "bg-foreground text-background border-foreground"
                  : "bg-surface/40 border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface/30 p-3 shadow-2xl">
          <div className="rounded-2xl bg-background/80 border border-white/5 p-6 md:p-8 grid grid-cols-12 gap-4">
            {/* Left: Radar */}
            <div className="col-span-12 lg:col-span-5 rounded-xl border border-white/5 bg-surface/40 p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">CareerIQ Radar</p>
              <p className="text-2xl font-semibold mb-1">Alex Rivera</p>
              <p className="text-xs text-muted-foreground mb-6">Computer Science · Year 3</p>
              <RadarChart />
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Overall</p>
                  <p className="text-xl font-semibold text-teal">82.4</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Percentile</p>
                  <p className="text-xl font-semibold">94th</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Trend</p>
                  <p className="text-xl font-semibold text-teal">+12%</p>
                </div>
              </div>
            </div>

            {/* Right: Heatmap + activity */}
            <div className="col-span-12 lg:col-span-7 space-y-4">
              <div className="rounded-xl border border-white/5 bg-surface/40 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">Campus Engagement Heatmap</p>
                    <p className="text-sm mt-1">Last 12 weeks · 84 active days</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span>Less</span>
                    {[0.1, 0.25, 0.45, 0.7, 1].map((o) => (
                      <span key={o} className="size-2.5 rounded-sm bg-teal" style={{ opacity: o }} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
                <Heatmap />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-surface/40 p-5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Top Skill Gaps</p>
                  <ul className="space-y-2 text-sm">
                    {[
                      { s: "Cloud Architecture", v: "−18%" },
                      { s: "Data Ops", v: "−12%" },
                      { s: "Public Speaking", v: "−9%" },
                    ].map((g) => (
                      <li key={g.s} className="flex justify-between">
                        <span>{g.s}</span>
                        <span className="text-rose">{g.v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/5 bg-surface/40 p-5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Recommended Next</p>
                  <ul className="space-y-2 text-sm">
                    {[
                      "AWS Solutions Architect",
                      "Toastmasters Club",
                      "Hack-the-Cloud Sprint",
                    ].map((r) => (
                      <li key={r} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-teal" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RadarChart() {
  const axes = ["Technical", "Comms", "Leadership", "Certs", "Consistency", "Participation"];
  const values = [0.88, 0.62, 0.75, 0.9, 0.7, 0.82];
  const cx = 100, cy = 100, r = 75;
  const angle = (i: number) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (i: number, v: number) => [cx + Math.cos(angle(i)) * r * v, cy + Math.sin(angle(i)) * r * v];
  const poly = values.map((v, i) => point(i, v).join(",")).join(" ");
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[260px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth="0.5"
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.5" />;
      })}
      <polygon points={poly} fill="oklch(0.82 0.14 180 / 0.25)" stroke="oklch(0.82 0.14 180)" strokeWidth="1.2" />
      {values.map((v, i) => {
        const [x, y] = point(i, v);
        return <circle key={i} cx={x} cy={y} r="2" fill="oklch(0.82 0.14 180)" />;
      })}
      {axes.map((label, i) => {
        const [x, y] = point(i, 1.2);
        return (
          <text key={label} x={x} y={y} fontSize="7" textAnchor="middle" dominantBaseline="middle" fill="oklch(0.68 0.018 260)">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

function Heatmap() {
  // 7 rows (days), 12 cols (weeks)
  const seed = (r: number, c: number) => Math.abs(Math.sin(r * 9.7 + c * 3.3));
  return (
    <div className="grid grid-rows-7 grid-flow-col gap-1.5">
      {Array.from({ length: 7 * 12 }).map((_, i) => {
        const r = i % 7;
        const c = Math.floor(i / 7);
        const v = seed(r, c);
        return (
          <div
            key={i}
            className="aspect-square rounded-[3px] bg-teal"
            style={{ opacity: 0.08 + v * 0.85 }}
          />
        );
      })}
    </div>
  );
}