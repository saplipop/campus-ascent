import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "./Card";

/** Friendly empty state with optional CTA. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="p-14 text-center">
      <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center mb-5">
        <Icon className="size-7 text-teal" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}