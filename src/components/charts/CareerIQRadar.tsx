import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { TEAL, axisStroke, tooltipStyle } from "./tokens";

export function CareerIQRadar({ data }: { data: { axis: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="oklch(1 0 0 / 0.08)" />
        <PolarAngleAxis dataKey="axis" stroke={axisStroke} fontSize={10} />
        <Radar name="Score" dataKey="value" stroke={TEAL} fill={TEAL} fillOpacity={0.25} strokeWidth={2} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}