import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Star, Trophy, Users } from "lucide-react";
import { Card, CardHeader, KpiCard, PageHeader, Pill, ProgressRing } from "@/components/app/ui";
import { events } from "@/lib/demo/data";

export const Route = createFileRoute("/app/events")({
  head: () => ({ meta: [{ title: "Events — Campus Connect" }] }),
  component: EventsPage,
});

function EventsPage() {
  const total = events.length;
  const avgSuccess = Math.round(events.reduce((a, e) => a + e.successScore, 0) / total);
  const totalAttendance = events.reduce((a, e) => a + e.attendance, 0);
  const avgSat = (events.reduce((a, e) => a + e.satisfaction, 0) / total).toFixed(2);

  const ranked = [...events].sort((a, b) => b.successScore - a.successScore);

  return (
    <div>
      <PageHeader
        eyebrow="Event intelligence"
        title="Events"
        description="Every workshop, hackathon, and bootcamp — scored for participation, completion, and satisfaction."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Events run" value={total} icon={Calendar} delta={12} />
        <KpiCard label="Attendance" value={totalAttendance} icon={Users} delta={8.4} tone="iris" />
        <KpiCard label="Avg success" value={avgSuccess} suffix="%" icon={Trophy} delta={4.2} />
        <KpiCard label="Avg rating" value={Number(avgSat)} icon={Star} delta={2.1} tone="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Event success rankings" description="Sorted by composite event success score" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-white/5">
                  <th className="text-left font-medium py-3 px-2">Event</th>
                  <th className="text-left font-medium py-3 px-2">Category</th>
                  <th className="text-right font-medium py-3 px-2">Registered</th>
                  <th className="text-right font-medium py-3 px-2">Attended</th>
                  <th className="text-right font-medium py-3 px-2">Completion</th>
                  <th className="text-right font-medium py-3 px-2">Rating</th>
                  <th className="text-right font-medium py-3 px-2">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ranked.map((e, i) => (
                  <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}</span>
                        <div>
                          <p className="font-medium">{e.title}</p>
                          <p className="text-[10px] text-muted-foreground">{e.organizer} · {e.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2"><Pill>{e.category}</Pill></td>
                    <td className="py-3 px-2 text-right">{e.registrations}</td>
                    <td className="py-3 px-2 text-right">{e.attendance}</td>
                    <td className="py-3 px-2 text-right">{e.completion}%</td>
                    <td className="py-3 px-2 text-right">{e.satisfaction.toFixed(1)} ★</td>
                    <td className="py-3 px-2 text-right font-semibold text-teal">{e.successScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1">Top performers</h3>
          <p className="text-xs text-muted-foreground mb-5">Highest impact this term</p>
          <div className="space-y-4">
            {ranked.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-4">
                <ProgressRing value={e.successScore} size={64} />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{e.title}</p>
                  <p className="text-[10px] text-muted-foreground">{e.attendance} attended</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}