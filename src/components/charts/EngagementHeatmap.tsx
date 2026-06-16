export function EngagementHeatmap({ weeks = 16, days = 7 }: { weeks?: number; days?: number }) {
  return (
    <div
      className="grid grid-flow-col gap-1.5"
      style={{ gridTemplateRows: `repeat(${days}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: weeks * days }).map((_, i) => {
        const w = Math.floor(i / days);
        const d = i % days;
        const v = Math.abs(Math.sin(w * 1.7 + d * 3.1 + 0.7));
        return (
          <div
            key={i}
            className="aspect-square rounded-[3px] bg-teal transition-transform hover:scale-125"
            style={{ opacity: 0.07 + v * 0.88 }}
            title={`Week ${w + 1} · ${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d]}`}
          />
        );
      })}
    </div>
  );
}