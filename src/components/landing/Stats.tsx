import { useEffect, useRef, useState } from "react";

const stats = [
  { v: 124000, suffix: "+", label: "Students Tracked" },
  { v: 12, suffix: "M", label: "Activities Monitored" },
  { v: 410, suffix: "K", label: "Certifications Recorded" },
  { v: 92, suffix: "%", label: "Engagement Growth" },
  { v: 280, suffix: "+", label: "Departments Analyzed" },
];

export function Stats() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Platform impact by the numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight iridescent-text">
              <Counter value={s.v} />
              {s.suffix}
            </div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
              {s.label}
            </p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
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
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.floor(value * eased));
              if (p < 1) requestAnimationFrame(tick);
              else setN(value);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  const display = value >= 1000 ? Math.round(n / (value >= 1000000 ? 1000000 : 1000)) : n;
  return <span ref={ref}>{value >= 1000 ? display : n}</span>;
}