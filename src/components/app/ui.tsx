import { type LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-widest text-teal font-medium mb-2">{eyebrow}</p>
        )}
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{description}</p>
        )}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-surface/40 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-5 pb-3">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}

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
    <Card className="p-5 hover:bg-surface/60 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <div className={`size-8 rounded-lg grid place-items-center ${toneCls}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-2xl md:text-3xl font-semibold">
        {prefix}
        <AnimatedNumber value={value} />
        {suffix}
      </div>
      {delta !== undefined && (
        <div className="mt-2 flex items-center gap-1 text-xs">
          {delta >= 0 ? (
            <TrendingUp className="size-3 text-teal" />
          ) : (
            <TrendingDown className="size-3 text-rose" />
          )}
          <span className={delta >= 0 ? "text-teal" : "text-rose"}>
            {delta >= 0 ? "+" : ""}{delta}%
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </Card>
  );
}

export function AnimatedNumber({ value, decimals = value % 1 !== 0 ? 1 : 0 }: { value: number; decimals?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const dur = 900;
            const tick = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(value * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setN(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const formatted = n.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
  return <span ref={ref}>{formatted}</span>;
}

export function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "teal" | "iris" | "rose";
}) {
  const cls = {
    default: "bg-white/5 text-muted-foreground border-white/10",
    teal: "bg-teal/15 text-teal border-teal/30",
    iris: "bg-iris/15 text-iris border-iris/30",
    rose: "bg-rose/15 text-rose border-rose/30",
  }[tone];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${cls}`}>
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto size-14 rounded-2xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center mb-4">
        <Icon className="size-6 text-teal" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );
}

export function ProgressRing({
  value,
  size = 80,
  stroke = 6,
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="oklch(0.82 0.14 180)"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-semibold">{value}</span>
        {label && <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}