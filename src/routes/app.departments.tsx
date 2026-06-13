import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { Card, CardHeader, PageHeader, Pill, ProgressRing } from "@/components/app/ui";
import { DepartmentBars } from "@/components/app/charts";
import { departments } from "@/lib/demo/data";

export const Route = createFileRoute("/app/departments")({
  head: () => ({ meta: [{ title: "Departments — Campus Connect" }] }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Department analytics"
        title="Departments"
        description="Side-by-side benchmarking across participation, engagement, and CareerIQ scores."
      />

      <Card className="p-1 mb-6">
        <CardHeader title="Department comparison" description="BCA, BBA, MBA, CSE, ECE, MECH" />
        <div className="px-2 pb-4">
          <DepartmentBars data={departments} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {departments.map((d) => (
          <Card key={d.id} className="p-5 hover:bg-surface/60 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-xl grid place-items-center text-xs font-semibold"
                  style={{ background: `color-mix(in oklab, ${d.color} 20%, transparent)`, color: d.color }}
                >
                  {d.code}
                </div>
                <div>
                  <p className="text-sm font-semibold">{d.name}</p>
                  <p className="text-[11px] text-muted-foreground">{d.students} students</p>
                </div>
              </div>
              <Pill tone={d.careerIQ >= 80 ? "teal" : d.careerIQ >= 70 ? "iris" : "rose"}>
                {d.careerIQ >= 80 ? "Elite" : d.careerIQ >= 70 ? "Rising" : "At risk"}
              </Pill>
            </div>
            <div className="flex items-center justify-around py-4 border-y border-white/5">
              <ProgressRing value={d.participation} label="Part" size={64} />
              <ProgressRing value={d.engagement} label="Eng" size={64} />
              <ProgressRing value={d.careerIQ} label="CIQ" size={64} />
            </div>
            <div className="pt-4 text-xs text-muted-foreground flex items-center gap-2">
              <Building2 className="size-3.5" />
              <span>{d.code} averages {d.engagement}% weekly engagement</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}