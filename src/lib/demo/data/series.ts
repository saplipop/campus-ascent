// Time-series and chart data sources.

function rand(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; };
}

export const pulseSeries = Array.from({ length: 12 }).map((_, i) => {
  const r = rand(42 + i);
  return {
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    pulse: Math.floor(55 + i * 2 + r() * 8),
    careerIQ: Math.floor(60 + i * 1.6 + r() * 6),
    participation: Math.floor(58 + i * 1.4 + r() * 10),
  };
});

// Monthly student growth — single trend used on Overview.
export const studentGrowth = pulseSeries.map((p) => ({ month: p.month, value: p.careerIQ }));

export const heatmapWeeks = 16;
export const heatmapDays = 7;

export const trendingSkills = [
  { name: "Cloud Architecture", delta: 24 },
  { name: "Data Analytics", delta: 18 },
  { name: "AI / ML", delta: 16 },
  { name: "UI Design", delta: 12 },
  { name: "Product Mgmt", delta: 9 },
];

export const skillGaps = [
  { name: "DevOps", gap: 32 },
  { name: "System Design", gap: 28 },
  { name: "Public Speaking", gap: 22 },
  { name: "Negotiation", gap: 18 },
];