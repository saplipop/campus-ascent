import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Sidebar, Topbar } from "@/components/layout";
import { useState } from "react";
import { getSession } from "@/lib/demo/auth";

export const Route = createFileRoute("/app")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getSession()) {
      throw redirect({ to: "/auth", search: { mode: "login" } });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 min-w-0 p-6 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}