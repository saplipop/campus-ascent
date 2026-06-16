import type { ReactNode } from "react";

/**
 * Standard page header used across every dashboard route.
 * - `eyebrow`  : small uppercase label above the title
 * - `title`    : main page heading (H1)
 * - `description`: supporting copy
 * - `children` : right-aligned action buttons
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div>
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.18em] text-teal font-medium mb-2.5">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-2.5 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}