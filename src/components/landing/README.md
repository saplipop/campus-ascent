# Landing sections

Each marketing section is its own file so designers can swap one without
touching the others. They're composed in `Landing.tsx` and rendered by
`src/routes/index.tsx`.

| File | Section |
| --- | --- |
| `Nav.tsx`               | Top navigation. |
| `Hero.tsx`              | Above-the-fold hero with CTAs. |
| `Stats.tsx`             | Headline metrics strip. |
| `ProblemSolution.tsx`   | "Before / after" comparison. |
| `Benefits.tsx`          | Feature grid. |
| `DashboardShowcase.tsx` | Animated product preview. |
| `Testimonials.tsx`      | Customer quotes. |
| `CTA.tsx`               | Final call-to-action band. |
| `Footer.tsx`            | Site footer. |
| `Landing.tsx`           | Composes the page top-to-bottom. |

## Reordering or removing sections

Edit `Landing.tsx` — it's just a vertical stack of `<Section />` imports.
Remove an import, the section disappears.