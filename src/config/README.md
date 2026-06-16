# App config

Branding and per-environment constants. Edit these to rebrand the demo —
no other files need to change.

| File | Exports |
| --- | --- |
| `app.ts` | `APP_NAME`, `APP_TAGLINE`, `APP_DESCRIPTION`, `SUPPORT_EMAIL`, etc. |

## Adding a new config value

1. Add `export const MY_VALUE = "..."` to `app.ts`.
2. Import via `import { MY_VALUE } from "@/config/app"`.
3. Never hard-code brand strings inside components — pull from here so
   rebranding is one file edit.