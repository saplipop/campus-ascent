import { Bell, Calendar, GraduationCap, TrendingUp, X } from "lucide-react";
import { notifications } from "@/lib/demo/data";

const iconFor = {
  growth: TrendingUp,
  cert: GraduationCap,
  dept: Bell,
  reminder: Calendar,
} as const;

export function NotificationsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full sm:w-[400px] bg-surface border-l border-white/10 shadow-2xl flex flex-col animate-fade-up"
      >
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-5">
          <div>
            <h2 className="text-sm font-semibold">Notifications</h2>
            <p className="text-[11px] text-muted-foreground">
              {notifications.filter((n) => n.unread).length} unread
            </p>
          </div>
          <button onClick={onClose} className="size-8 rounded-lg hover:bg-white/5 grid place-items-center text-muted-foreground">
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((n) => {
            const Icon = iconFor[n.kind];
            return (
              <div
                key={n.id}
                className={`p-3 rounded-xl border transition-colors ${n.unread ? "border-teal/20 bg-teal/5" : "border-white/5 bg-background/40"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`size-8 rounded-lg grid place-items-center shrink-0 ${n.unread ? "bg-teal/15 text-teal" : "bg-white/5 text-muted-foreground"}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-medium">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-white/5 p-3">
          <button className="w-full h-9 rounded-lg text-xs font-medium hover:bg-white/5 transition-colors">
            Mark all as read
          </button>
        </div>
      </aside>
    </div>
  );
}