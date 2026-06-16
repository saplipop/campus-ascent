# Dashboard primitives

Reusable building blocks for any page under `/app/*`. Each component is its
own file so you can edit one piece without scrolling past unrelated code.

| File | Component | Purpose |
| --- | --- | --- |
| `PageHeader.tsx`    | `<PageHeader>`    | Eyebrow + H1 + description + action slot. Use once at the top of every route. |
| `Card.tsx`          | `<Card>`, `<CardHeader>` | Surface container and its standard title row. |
| `KpiCard.tsx`       | `<KpiCard>`       | KPI tile with icon, big number, optional `delta`. Pick `tone="teal" \| "iris" \| "rose"`. |
| `AnimatedNumber.tsx`| `<AnimatedNumber>`| Counts up from 0 when scrolled into view. Used inside `KpiCard`. |
| `Pill.tsx`          | `<Pill>`          | Tiny status badge. |
| `EmptyState.tsx`    | `<EmptyState>`    | Illustration + copy + optional CTA when a list is empty. |
| `ProgressRing.tsx`  | `<ProgressRing>`  | Circular percentage indicator. |

## Importing

```tsx
import { PageHeader, Card, KpiCard } from "@/components/dashboard";
```

The legacy path `@/components/app/ui` still works — it re-exports from here
for backward compatibility. New code should use `@/components/dashboard`.

## Adding a new primitive

1. Create `src/components/dashboard/MyThing.tsx` with one default-shaped
   component and a short JSDoc comment.
2. Re-export it from `index.ts`.
3. Add a row to the table above.
4. Use only design tokens (`text-teal`, `bg-surface/40`, …) — never raw
   hex/oklch values. Tokens live in `src/styles.css`.