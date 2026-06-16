import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TEAL, IRIS, ROSE, axisStroke, gridStroke, tooltipStyle } from "./tokens";

export function DepartmentBars({
  data,
}: {
  data: { code: string; participation: number; engagement: number; careerIQ: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="code" stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke={axisStroke} fontSize={10} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Bar dataKey="participation" fill={TEAL} radius={[4, 4, 0, 0]} />
        <Bar dataKey="engagement" fill={IRIS} radius={[4, 4, 0, 0]} />
        <Bar dataKey="careerIQ" fill={ROSE} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}