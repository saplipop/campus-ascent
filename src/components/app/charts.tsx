import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TEAL = "oklch(0.82 0.14 180)";
const IRIS = "oklch(0.74 0.14 285)";
const ROSE = "oklch(0.74 0.16 15)";

const tooltipStyle = {
  background: "oklch(0.20 0.014 260)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 8,
  fontSize: 12,
  color: "oklch(0.97 0.005 260)",
};

export function PulseTrend({ data }: { data: { month: string; pulse: number; careerIQ: number; participation: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="pulseG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity={0.4} />
            <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="iqG" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={IRIS} stopOpacity={0.3} />
            <stop offset="100%" stopColor={IRIS} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
        <XAxis dataKey="month" stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="pulse" stroke={TEAL} strokeWidth={2} fill="url(#pulseG)" />
        <Area type="monotone" dataKey="careerIQ" stroke={IRIS} strokeWidth={2} fill="url(#iqG)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DepartmentBars({ data }: { data: { code: string; participation: number; engagement: number; careerIQ: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
        <XAxis dataKey="code" stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="participation" fill={TEAL} radius={[4, 4, 0, 0]} />
        <Bar dataKey="engagement" fill={IRIS} radius={[4, 4, 0, 0]} />
        <Bar dataKey="careerIQ" fill={ROSE} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CareerIQRadar({ data }: { data: { axis: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
        <PolarAngleAxis dataKey="axis" stroke="oklch(0.68 0.018 260)" fontSize={10} />
        <Radar name="Score" dataKey="value" stroke={TEAL} fill={TEAL} fillOpacity={0.25} strokeWidth={2} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function GrowthLine({ data }: { data: { month: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
        <XAxis dataKey="month" stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="value" stroke={TEAL} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SkillGapBars({ data }: { data: { name: string; gap: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
        <XAxis type="number" stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" stroke="oklch(0.68 0.018 260)" fontSize={10} tickLine={false} axisLine={false} width={110} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="gap" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === 0 ? ROSE : i === 1 ? "oklch(0.78 0.14 60)" : IRIS} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EngagementHeatmap({ weeks = 16, days = 7 }: { weeks?: number; days?: number }) {
  return (
    <div className="grid grid-flow-col gap-1.5" style={{ gridTemplateRows: `repeat(${days}, minmax(0, 1fr))` }}>
      {Array.from({ length: weeks * days }).map((_, i) => {
        const w = Math.floor(i / days);
        const d = i % days;
        const v = Math.abs(Math.sin(w * 1.7 + d * 3.1 + 0.7));
        return (
          <div
            key={i}
            className="aspect-square rounded-[3px] bg-teal transition-transform hover:scale-125"
            style={{ opacity: 0.07 + v * 0.88 }}
            title={`Week ${w + 1} · ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][d]}`}
          />
        );
      })}
    </div>
  );
}