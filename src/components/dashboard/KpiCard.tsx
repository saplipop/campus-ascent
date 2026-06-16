import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "./Card";
import { AnimatedNumber } from "./AnimatedNumber";

/** Single KPI tile. `tone` picks the accent color from the design tokens. */
export function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
  suffix,
  prefix,
  tone = "teal",
}: {
  label: string;
  value: number;
  delta?: number;
  icon: LucideIcon;
  suffix?: string;
  prefix?: string;
  tone?: "teal" | "iris" | "rose";
}) {
  const toneCls = {
    teal: "bg-teal/15 text-teal",
    iris: "bg-iris/15 text-iris",
    rose: "bg-rose/15 text-rose",
  }[tone];

  return (
    <Card className="p-6 hover:bg-surface/60 transition-colors">
      <div className="flex items-start justify-between mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <div className={`size-9 rounded-xl grid place-items-center ${toneCls}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-semibold tracking-tight leading-none">
        {prefix}
        <AnimatedNumber value={value} />
        {suffix}
      </div>
      {delta !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {delta >= 0 ? (
            <TrendingUp className="size-3.5 text-teal" />
          ) : (
            <TrendingDown className="size-3.5 text-rose" />
          )}
          <span className={delta >= 0 ? "text-teal" : "text-rose"}>
            {delta >= 0 ? "+" : ""}
            {delta}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </Card>
  );
}