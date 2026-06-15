import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Moon, Sun } from "lucide-react";
import { Card, PageHeader } from "@/components/app/ui";
import { useTheme } from "@/lib/demo/theme";
import { useInstitution } from "@/lib/demo/preferences";
import { clearSession, useDemoSession } from "@/lib/demo/auth";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Campus Connect" },
      { name: "description", content: "Personalize your Campus Connect workspace — theme, institution name, and account preferences." },
      { property: "og:title", content: "Settings — Campus Connect" },
      { property: "og:description", content: "Personalize your Campus Connect workspace preferences." },
      { property: "og:url", content: "https://campus-growth-insights.lovable.app/app/settings" },
    ],
    links: [{ rel: "canonical", href: "https://campus-growth-insights.lovable.app/app/settings" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { mode, toggle } = useTheme();
  const { name, setName } = useInstitution();
  const { user } = useDemoSession();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader
        eyebrow="Settings"
        title="Workspace preferences"
        description="Personalize your Campus Connect workspace."
      />

      <Card className="p-6">
        <h3 className="text-sm font-semibold">Appearance</h3>
        <p className="text-xs text-muted-foreground mt-1">Switch between dark and light mode.</p>
        <button
          onClick={toggle}
          className="mt-5 flex items-center gap-3 h-10 px-4 rounded-lg border border-white/10 bg-background/40 text-sm hover:bg-background/70 transition-colors"
        >
          {mode === "dark" ? <Moon className="size-4 text-teal" /> : <Sun className="size-4 text-teal" />}
          <span>{mode === "dark" ? "Dark mode" : "Light mode"}</span>
          <span className="ml-2 text-[11px] text-muted-foreground">Click to toggle</span>
        </button>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold">Institution name</h3>
        <p className="text-xs text-muted-foreground mt-1">Displayed on reports and headers.</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-5 w-full h-10 px-4 rounded-lg bg-background/40 border border-white/10 text-sm outline-none focus:border-teal/50"
        />
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold">Account</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Signed in as <span className="text-foreground">{user?.email ?? "—"}</span>
        </p>
        <button
          onClick={() => {
            clearSession();
            navigate({ to: "/auth", search: { mode: "login" } });
          }}
          className="mt-5 flex items-center gap-2 h-10 px-4 rounded-lg border border-rose/30 bg-rose/10 text-rose text-sm font-medium hover:bg-rose/15 transition-colors"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </Card>
    </div>
  );
}