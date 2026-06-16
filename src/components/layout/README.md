# App shell layout

Everything that wraps the dashboard pages. Mounted once in
`src/routes/app.tsx` and shared by every route under `/app/*`.

| File | Component | What it owns |
| --- | --- | --- |
| `Sidebar.tsx`            | `<Sidebar>`            | Collapsible left nav. Edit the `items` array at the top to change nav links. |
| `Topbar.tsx`             | `<Topbar>`             | Sticky header with search trigger, focus toggle, theme toggle, notifications. |
| `GlobalSearch.tsx`       | `<GlobalSearch>`       | ⌘K command-palette search across students / events / departments / skills. |
| `NotificationsPanel.tsx` | `<NotificationsPanel>` | Right-side slide-over notifications drawer. |

## Importing

```tsx
import { Sidebar, Topbar } from "@/components/layout";
```

The legacy path `@/components/app/{Sidebar,Topbar,…}` still works (re-export
shim) but is deprecated.

## Changing the nav

Open `Sidebar.tsx` and edit the `items: NavItem[]` array. Each entry needs
a route that exists in `src/routes/` — TanStack Router is type-safe, so a
broken `to` value fails typecheck.