# Charts

Every chart is its own file. They all share `tokens.ts` so colors stay in
sync with the rest of the design system.

| File | Component | Used by |
| --- | --- | --- |
| `PulseTrend.tsx`        | `<PulseTrend>`        | Combined pulse + CareerIQ + participation area chart. |
| `GrowthLine.tsx`        | `<GrowthLine>`        | Overview page student growth trend. |
| `DepartmentBars.tsx`    | `<DepartmentBars>`    | Analytics → Performance tab. |
| `CareerIQRadar.tsx`     | `<CareerIQRadar>`     | Student detail page skill radar. |
| `SkillGapBars.tsx`      | `<SkillGapBars>`      | Analytics → Skills tab. |
| `EngagementHeatmap.tsx` | `<EngagementHeatmap>` | Analytics → Engagement tab. |
| `tokens.ts`             | constants             | Shared colors, axis stroke, tooltip style. |

## Importing

```tsx
import { GrowthLine, DepartmentBars } from "@/components/charts";
```

The legacy path `@/components/app/charts` still works (re-export shim) but
is deprecated. Prefer the new path.

## Adding a chart

1. Create `src/components/charts/MyChart.tsx`.
2. Pull colors from `./tokens` — never hard-code hex/oklch values.
3. Wrap recharts in a `<ResponsiveContainer width="100%" height={...}>`.
4. Re-export from `index.ts` and add a row to the table above.