import type { ReactNode } from "react";

/** Small status badge. Use `tone` to convey meaning. */
export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "teal" | "iris" | "rose";
}) {
  const cls = {
    default: "bg-white/5 text-muted-foreground border-white/10",
    teal: "bg-teal/15 text-teal border-teal/30",
    iris: "bg-iris/15 text-iris border-iris/30",
    rose: "bg-rose/15 text-rose border-rose/30",
  }[tone];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${cls}`}
    >
      {children}
    </span>
  );
}