# Developer guide — Campus Connect

A field guide for anyone editing this codebase. Read this first.

---

## 1. The stack (and why there's no `index.html`)

This project runs on **TanStack Start** (React 19 + Vite 7 + SSR on
Cloudflare Workers). It is **not** a plain Vite SPA and it is **not**
Next.js.

Because it server-renders, there is no static `index.html`. The HTML shell
lives in JSX inside `src/routes/__root.tsx` (the `<html>`, `<head>`,
`<body>` tags). Edit that file to change the shell, favicon links, root
meta tags, fonts, or providers that must wrap every page.

## 2. Folder map

```
src/
├─ routes/                   File-based routing (TanStack)
│  ├─ __root.tsx             HTML shell + global providers
│  ├─ index.tsx              "/" — landing page
│  ├─ auth.tsx               "/auth" — sign in / sign up
│  ├─ app.tsx                "/app" layout (sidebar + topbar wrapper)
│  ├─ app.index.tsx          "/app" — Overview
│  ├─ app.students.tsx       "/app/students"
│  ├─ app.students.$id.tsx   "/app/students/:id"
│  ├─ app.analytics.tsx      "/app/analytics" (tabs inside)
│  ├─ app.reports.tsx        "/app/reports"
│  ├─ app.settings.tsx       "/app/settings"
│  ├─ sitemap[.]xml.ts       Dynamic sitemap
│  └─ README.md              Routing conventions
│
├─ components/
│  ├─ dashboard/             Page primitives (KpiCard, PageHeader, …)
│  ├─ charts/                Recharts wrappers + shared tokens
│  ├─ layout/                App shell (Sidebar, Topbar, …)
│  ├─ landing/               Marketing page sections
│  ├─ ui/                    shadcn/ui primitives (don't hand-edit)
│  ├─ app/                   ⚠ deprecated — re-export shims only
│  └─ README.md
│
├─ lib/
│  ├─ demo/
│  │  ├─ data/               Seed data (students, events, KPIs, …)
│  │  ├─ auth.ts             Client-only demo session
│  │  ├─ theme.ts            Dark / light toggle
│  │  └─ preferences.ts      Focus-mode toggle
│  ├─ utils.ts               `cn()` className helper
│  └─ api/                   Server function examples
│
├─ config/
│  └─ app.ts                 Branding constants
│
├─ hooks/
│  └─ use-mobile.tsx         Responsive breakpoint hook
│
├─ router.tsx                Router setup
├─ start.ts / server.ts      SSR entry plumbing
├─ styles.css                Tailwind v4 + design tokens
└─ routeTree.gen.ts          AUTO-GENERATED — do not edit
```

Every important folder has its own `README.md` describing what lives there
and how to extend it.

## 3. Common tasks

### Rebrand the app

1. Edit `src/config/app.ts` — `APP_NAME`, `APP_TAGLINE`, etc.
2. Edit colors / fonts in `src/styles.css` (look for the `:root` block —
   tokens are `--teal`, `--iris`, `--rose`, `--background`, etc.).
3. Swap the logo in `src/components/layout/Sidebar.tsx` and the landing
   `Nav.tsx` / `Footer.tsx`.
4. Update the favicon at `public/favicon.ico` and the meta tags in
   `src/routes/__root.tsx`.

### Add a new dashboard page

1. Create `src/routes/app.my-page.tsx` (dots = slashes — this becomes
   `/app/my-page`):
   ```tsx
   import { createFileRoute } from "@tanstack/react-router";
   import { PageHeader, Card } from "@/components/dashboard";

   export const Route = createFileRoute("/app/my-page")({
     head: () => ({
       meta: [
         { title: "My page — Campus Connect" },
         { name: "description", content: "..." },
       ],
     }),
     component: MyPage,
   });

   function MyPage() {
     return (
       <div className="space-y-10">
         <PageHeader eyebrow="Section" title="My page" description="..." />
         <Card className="p-6">Hello world</Card>
       </div>
     );
   }
   ```
2. Add it to the sidebar in `src/components/layout/Sidebar.tsx` (push a new
   entry into the `items` array). TanStack Router will fail typecheck if the
   route doesn't exist.

### Edit the seed data

Open `src/lib/demo/data/<thing>.ts` and edit the array. The page picks it
up on next refresh. See `src/lib/demo/data/README.md` for which file owns
what.

### Add a chart

1. Create `src/components/charts/MyChart.tsx`.
2. Pull colors from `./tokens` — never hard-code hex/oklch.
3. Wrap recharts in `<ResponsiveContainer width="100%" height={...}>`.
4. Re-export from `src/components/charts/index.ts`.
5. Import via `import { MyChart } from "@/components/charts"`.

### Change the nav

`src/components/layout/Sidebar.tsx` → edit the `items: NavItem[]` array.

### Toggle theme / focus mode

`useTheme()` from `@/lib/demo/theme`, `useFocusMode()` from
`@/lib/demo/preferences`. Both persist to `localStorage`.

## 4. Conventions

- **Colors**: always use design tokens (`bg-surface/40`, `text-teal`,
  `border-white/5`). Never hard-code hex / oklch values inside components.
  All tokens live in `src/styles.css`.
- **Routes**: flat dot-separated filenames in `src/routes/`. Dots become
  slashes, `$param` is a dynamic segment, `index` is the leaf.
- **Imports**:
  - `@/components/dashboard` for primitives
  - `@/components/charts` for charts
  - `@/components/layout` for shell
  - `@/lib/demo/data` for seed data
  - Old paths (`@/components/app/*`) still work via re-export shims but
    are deprecated.
- **Server vs client**: anything reading `process.env` or hitting a real
  API must live inside a `createServerFn().handler()` call. Browser-only
  APIs (`localStorage`, `window`) must be inside `useEffect` or guarded
  with `typeof window !== "undefined"`.

## 5. Running locally

The dev server runs automatically in the Lovable preview. If you clone
this elsewhere:

```bash
bun install
bun dev
```

The build / typecheck runs on every change inside Lovable — there's no
separate "go" button.

## 6. Deploying

Click **Publish** in the Lovable top bar. The app builds and deploys to
`https://campus-growth-insights.lovable.app`. There's nothing to
configure manually.

---

**Deeper docs:**
- `src/routes/README.md` — routing rules
- `src/components/README.md` — component organization
- `src/components/dashboard/README.md` — dashboard primitives reference
- `src/components/charts/README.md` — charts reference
- `src/components/layout/README.md` — app shell reference
- `src/components/landing/README.md` — landing sections reference
- `src/lib/demo/README.md` — demo runtime
- `src/lib/demo/data/README.md` — seed data reference
- `src/config/README.md` — branding config