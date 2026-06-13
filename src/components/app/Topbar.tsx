import { Bell, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { GlobalSearch } from "./GlobalSearch";
import { NotificationsPanel } from "./NotificationsPanel";
import { useTheme } from "@/lib/demo/theme";
import { notifications } from "@/lib/demo/data";

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { mode, toggle } = useTheme();
  const unread = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-background/70 backdrop-blur-md flex items-center px-4 lg:px-6 gap-3">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 h-9 px-3 rounded-lg border border-white/10 bg-surface/40 text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors flex-1 max-w-md"
        >
          <Search className="size-4" />
          <span className="truncate">Search students, events, skills...</span>
          <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border border-white/10 bg-background/40">
            ⌘K
          </span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggle}
            className="size-9 rounded-lg border border-white/10 bg-surface/40 grid place-items-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            onClick={() => setNotifOpen(true)}
            className="relative size-9 rounded-lg border border-white/10 bg-surface/40 grid place-items-center text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-rose text-[9px] font-semibold grid place-items-center text-background">
                {unread}
              </span>
            )}
          </button>
        </div>
      </header>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}