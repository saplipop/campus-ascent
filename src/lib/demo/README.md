# Demo runtime

Browser-side helpers that simulate auth, theming, and user preferences.
They store state in `localStorage` so the demo feels persistent without a
real backend.

| File | Hook / API | Purpose |
| --- | --- | --- |
| `auth.ts`         | `useDemoSession()`, `getSession()`, `setSession()`, `clearSession()` | Tiny client-only auth. Routes under `/app` redirect to `/auth` when no session. |
| `theme.ts`        | `useTheme()` → `{ mode, toggle }`                                    | Toggles the `dark` class on `<html>`. Wired into Topbar. |
| `preferences.ts`  | `useFocusMode()` → `{ focus, toggle }`                               | Hides secondary panels on Overview when enabled. |
| `data/`           | see `data/README.md`                                                 | All seed data. |

## Replacing with a real backend

- **Auth**: swap `auth.ts` for the real SDK (e.g. Lovable Cloud / Supabase).
  Keep `useDemoSession()`'s return shape so the rest of the app keeps working.
- **Theme / preferences**: fine to keep client-only — these are UI prefs.