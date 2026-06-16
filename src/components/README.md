# Components

Grouped by purpose. Each folder owns one concern and has its own README.

| Folder | Purpose |
| --- | --- |
| `dashboard/` | Reusable dashboard primitives (`PageHeader`, `KpiCard`, `Card`, `Pill`, `EmptyState`, `ProgressRing`, `AnimatedNumber`). |
| `charts/`    | Recharts wrappers + shared color tokens. |
| `layout/`    | App shell — `Sidebar`, `Topbar`, `GlobalSearch`, `NotificationsPanel`. |
| `landing/`   | Marketing site sections (Hero, Stats, Testimonials, Footer, …). |
| `ui/`        | shadcn/ui primitives (Button, Input, Tabs, …). Do not edit by hand. |
| `app/`       | **Deprecated.** Re-export shims pointing at `dashboard/`, `charts/`, and `layout/`. Kept so existing imports don't break — new code should use the new paths. |

## Where do I put a new component?

- One-off, used by a single route? Keep it inside that route file.
- Used by 2+ dashboard pages? Add it to `dashboard/`.
- It's a chart? Add it to `charts/`.
- It's part of the marketing site? Add it to `landing/`.