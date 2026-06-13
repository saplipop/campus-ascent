import { Sparkles } from "lucide-react";

const cols = [
  { title: "Platform", links: ["Growth Analytics", "CareerIQ", "Campus Pulse", "Event Intelligence", "Department Analytics"] },
  { title: "Resources", links: ["Documentation", "Case Studies", "Research", "Changelog", "Help Center"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Privacy", "Security"] },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-7 rounded-lg bg-gradient-to-br from-teal to-iris grid place-items-center">
              <Sparkles className="size-3.5 text-background" strokeWidth={2.5} />
            </div>
            <span className="font-semibold tracking-tight">Campus Connect</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            The intelligent growth layer for modern educational institutions.
            Track. Analyze. Grow.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h5 className="text-xs font-semibold mb-4 uppercase tracking-wider">{c.title}</h5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Campus Connect Analytics. Built for growth.
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          v1.0 · All systems operational
        </p>
      </div>
    </footer>
  );
}