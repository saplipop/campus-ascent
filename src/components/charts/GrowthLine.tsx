import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TEAL, axisStroke, gridStroke, tooltipStyle } from "./tokens";

export function GrowthLine({ data }: { data: { month: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="month" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="value" stroke={TEAL} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}