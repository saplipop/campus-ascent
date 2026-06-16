import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import { clearSession, useDemoSession } from "@/lib/demo/auth";
import { useNavigate } from "@tanstack/react-router";

type NavItem = { to: string; label: string; icon: typeof Users; exact?: boolean };
const items: NavItem[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/students", label: "Students", icon: Users },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user } = useDemoSession();

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <aside
      className={`hidden md:flex sticky top-0 h-screen flex-col border-r border-white/5 bg-surface/40 backdrop-blur-md transition-[width] duration-300 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
    >
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        <Link to="/app" className="flex items-center gap-2 min-w-0">
          <div className="size-7 shrink-0 rounded-lg bg-gradient-to-br from-teal to-iris grid place-items-center">
            <Sparkles className="size-3.5 text-background" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span className="font-semibold tracking-tight truncate">Campus Connect</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((it) => {
          const active = isActive(it.to, it.exact);
          return (
            <Link
              key={it.to}
              to={it.to as "/app"}
              className={`flex items-center gap-3 h-9 px-3 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-teal/15 text-teal"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <it.icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{it.label}</span>}
              {!collapsed && active && (
                <span className="ml-auto size-1.5 rounded-full bg-teal" />
              )}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-3 rounded-xl border border-white/5 bg-background/40 p-3">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="size-3.5 text-teal" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Pulse this week
            </span>
          </div>
          <p className="text-lg font-semibold">78.4 <span className="text-xs text-teal">+3.1%</span></p>
          <div className="h-1 mt-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal to-iris" style={{ width: "78%" }} />
          </div>
        </div>
      )}

      <div className="border-t border-white/5 p-3 space-y-2">
        {!collapsed && user && (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="size-8 rounded-full bg-gradient-to-br from-teal/40 to-iris/30 border border-white/10 grid place-items-center text-[11px] font-semibold">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.role}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            clearSession();
            navigate({ to: "/auth", search: { mode: "login" } });
          }}
          className={`flex items-center gap-3 h-9 ${collapsed ? "justify-center" : "px-3"} w-full rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors`}
        >
          <LogOut className="size-4" />
          {!collapsed && <span>Sign out</span>}
        </button>
        <button
          onClick={onToggle}
          className={`flex items-center gap-3 h-9 ${collapsed ? "justify-center" : "px-3"} w-full rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors`}
        >
          {collapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}