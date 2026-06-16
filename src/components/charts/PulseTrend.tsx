import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TEAL, IRIS, axisStroke, gridStroke, tooltipStyle } from "./tokens";

export function PulseTrend({
  data,
}: {
  data: { month: string; pulse: number; careerIQ: number; participation: number }[];
}) {
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
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="month" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area type="monotone" dataKey="pulse" stroke={TEAL} strokeWidth={2} fill="url(#pulseG)" />
        <Area type="monotone" dataKey="careerIQ" stroke={IRIS} strokeWidth={2} fill="url(#iqG)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}