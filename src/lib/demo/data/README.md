# Demo data

All seed data for the dashboard lives here. Every page reads from these
files via `import { ... } from "@/lib/demo/data"` (the `index.ts` barrel).

Edit one file = update one slice. The shape of each export is the contract
the components depend on, so keep field names stable.

| File | Exports | Used by |
| --- | --- | --- |
| `departments.ts`   | `departments`                          | Sidebar/topbar search, Analytics → Performance tab, Students filter. |
| `students.ts`      | `students`, `Student` type             | Students list, Student detail page, Global search. |
| `events.ts`        | `events`                               | Analytics → Engagement, Global search. |
| `series.ts`        | `studentGrowth`, `pulseTrend`, `trendingSkills`, `skillGaps` | Overview trend, Analytics charts. |
| `kpis.ts`          | `overviewKpis`                         | Overview KPI cards. |
| `insights.ts`      | `insights`, `activityFeed`             | Overview quick-insights and activity feed. |
| `notifications.ts` | `notifications`                        | Topbar bell badge, NotificationsPanel drawer. |
| `index.ts`         | barrel that re-exports everything      | Every consumer. |

## Adding a field

1. Update the type in the relevant file (e.g. `students.ts`).
2. Backfill every existing record with the new field — TypeScript will tell
   you exactly where you missed.
3. If components should show it, update the consumers (search `rg "\.fieldName"`).

## Replacing demo data with real data

Each file is a plain `export const`. To wire a real backend, replace the
constant with a `useQuery` call or a TanStack Router loader — keep the
exported shape identical so consumers don't need changes.