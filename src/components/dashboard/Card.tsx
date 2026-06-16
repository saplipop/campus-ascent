import type { ReactNode } from "react";

/** Surface container. Tailwind classes live here so colors stay tokenized. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/5 bg-surface/40 ${className}`}>
      {children}
    </div>
  );
}

/** Title row for a Card. Optional right-aligned action slot. */
export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between p-6 pb-4">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}