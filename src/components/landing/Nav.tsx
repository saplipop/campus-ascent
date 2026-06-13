import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/70">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-gradient-to-br from-teal to-iris grid place-items-center shadow-lg shadow-teal/20">
            <Sparkles className="size-3.5 text-background" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight">Campus Connect</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
          <a href="#intelligence" className="hover:text-foreground transition-colors">Intelligence</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </button>
          <button className="h-9 px-4 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
            Request demo
          </button>
        </div>
      </div>
    </nav>
  );
}