import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { IRIS, ROSE, AMBER, axisStroke, gridStroke, tooltipStyle } from "./tokens";

export function SkillGapBars({ data }: { data: { name: string; gap: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
        <XAxis type="number" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} width={110} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="gap" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === 0 ? ROSE : i === 1 ? AMBER : IRIS} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}