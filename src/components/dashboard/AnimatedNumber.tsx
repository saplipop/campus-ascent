import { useEffect, useRef, useState } from "react";

/** Number that counts up from 0 once it scrolls into view. */
export function AnimatedNumber({
  value,
  decimals = value % 1 !== 0 ? 1 : 0,
}: {
  value: number;
  decimals?: number;
}) {
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