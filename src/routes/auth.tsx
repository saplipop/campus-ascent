import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { passwordStrength, setSession, type DemoUser } from "@/lib/demo/auth";

const search = z.object({
  mode: fallback(z.enum(["login", "signup"]), "login").default("login"),
});

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: zodValidator(search),
  head: () => ({
    meta: [
      { title: "Sign in — Campus Connect Analytics" },
      { name: "description", content: "Access the Campus Connect Analytics demo." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <AuthShowcase />
      <div className="flex items-center justify-center px-6 py-12 relative">
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-gradient-to-br from-teal to-iris grid place-items-center">
              <Sparkles className="size-3 text-background" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">Campus Connect</span>
          </Link>
        </div>
        <div className="w-full max-w-md glass rounded-3xl p-8 shadow-2xl animate-fade-up">
          <Tabs mode={mode} />
          {mode === "login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

function Tabs({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="mb-6">
      <div className="inline-flex rounded-full border border-white/10 bg-background/40 p-1 text-xs font-medium">
        <Link
          to="/auth"
          search={{ mode: "login" }}
          className={`px-4 py-1.5 rounded-full transition-colors ${mode === "login" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          Sign in
        </Link>
        <Link
          to="/auth"
          search={{ mode: "signup" }}
          className={`px-4 py-1.5 rounded-full transition-colors ${mode === "signup" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

function AuthShowcase() {
  return (
    <div className="hidden lg:flex relative overflow-hidden bg-surface/30 border-r border-white/5">
      <div aria-hidden className="absolute -top-32 -left-32 size-[500px] bg-teal/20 blur-[120px] rounded-full" />
      <div aria-hidden className="absolute bottom-0 right-0 size-[400px] bg-iris/15 blur-[120px] rounded-full" />
      <div aria-hidden className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative flex flex-col justify-between p-12 w-full">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="size-7 rounded-lg bg-gradient-to-br from-teal to-iris grid place-items-center">
            <Sparkles className="size-3.5 text-background" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight">Campus Connect</span>
        </Link>

        <div className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-teal font-medium mb-3">
              Live demo dashboard
            </p>
            <h2 className="text-3xl font-semibold tracking-tight leading-tight max-w-md">
              Track. Analyze.{" "}
              <span className="iridescent-text">Grow.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-sm">
              Sign in with any credentials — this is a fully populated demo
              environment showcasing the Campus Connect Analytics product.
            </p>
          </div>

          <div className="glass rounded-2xl p-5 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Campus Pulse — last 12 months
              </span>
              <span className="text-[10px] text-teal flex items-center gap-1">
                <TrendingUp className="size-3" /> +18%
              </span>
            </div>
            <Sparkline />
            <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
              <Stat label="Pulse" value="78.4" />
              <Stat label="CareerIQ" value="81.2" />
              <Stat label="Events" value="89.6" />
            </div>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Campus Connect Analytics
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

function Sparkline() {
  const pts = [22, 28, 35, 31, 44, 48, 52, 60, 58, 70, 74, 86];
  const w = 100, h = 32;
  const step = w / (pts.length - 1);
  const max = 100;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.14 180)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.82 0.14 180)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#sg)" />
      <path d={d} fill="none" stroke="oklch(0.82 0.14 180)" strokeWidth="0.8" />
    </svg>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@campus.edu");
  const [password, setPassword] = useState("Demo1234!");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password of 4+ characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user: DemoUser = {
        name: email.split("@")[0].replace(/\b\w/g, (m) => m.toUpperCase()),
        email,
        role: "Administrator",
        institution: "Lakeside Institute of Technology",
      };
      setSession(user);
      navigate({ to: "/app" });
    }, 600);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to your Campus Connect workspace.
        </p>
      </div>
      <Field label="Email address">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 rounded-lg bg-background/60 border border-white/10 px-3 text-sm outline-none focus:border-teal/60 transition-colors"
          autoComplete="email"
        />
      </Field>
      <Field label="Password">
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 rounded-lg bg-background/60 border border-white/10 px-3 pr-10 text-sm outline-none focus:border-teal/60 transition-colors"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </Field>
      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="accent-teal"
          />
          Remember me
        </label>
        <a href="#" className="text-teal hover:underline">Forgot password?</a>
      </div>
      {error && <p className="text-xs text-rose">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 rounded-lg bg-teal text-background font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
        {!loading && <ArrowRight className="size-4" />}
      </button>
      <SocialDivider />
      <SocialButtons />
    </form>
  );
}

function SignupForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState<DemoUser["role"]>("Administrator");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  const strength = useMemo(() => passwordStrength(pw), [pw]);
  const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const nameOk = name.trim().length >= 2;
  const matches = pw.length > 0 && pw === pw2;
  const formValid = nameOk && emailOk && institution.length >= 2 && strength >= 2 && matches && agree;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) return;
    setDone(true);
    setTimeout(() => {
      setSession({ name, email, role, institution });
      navigate({ to: "/app" });
    }, 900);
  };

  if (done) {
    return (
      <div className="text-center py-6 animate-fade-up">
        <div className="mx-auto size-14 rounded-full bg-teal/20 grid place-items-center mb-4">
          <Check className="size-7 text-teal" strokeWidth={3} />
        </div>
        <h2 className="text-xl font-semibold">Workspace ready</h2>
        <p className="text-sm text-muted-foreground mt-1">Loading your demo dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create your workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Spin up a personalized demo of Campus Connect.
        </p>
      </div>
      <Field label="Full name" valid={name.length === 0 ? undefined : nameOk}>
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </Field>
      <Field label="Email address" valid={email.length === 0 ? undefined : emailOk}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      </Field>
      <Field label="Institution name">
        <input value={institution} onChange={(e) => setInstitution(e.target.value)} className={inputCls} placeholder="Lakeside Institute of Technology" />
      </Field>
      <Field label="Role">
        <div className="grid grid-cols-3 gap-2">
          {(["Administrator", "Faculty", "Student Coordinator"] as const).map((r) => (
            <button
              type="button"
              key={r}
              onClick={() => setRole(r)}
              className={`h-9 rounded-lg text-xs font-medium border transition-colors ${role === r ? "bg-teal/15 border-teal/50 text-teal" : "bg-background/40 border-white/10 text-muted-foreground hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </Field>
      <Field label="Password">
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={`${inputCls} pr-10`}
          />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <PasswordStrength score={strength} />
      </Field>
      <Field label="Confirm password" valid={pw2.length === 0 ? undefined : matches}>
        <input type={show ? "text" : "password"} value={pw2} onChange={(e) => setPw2(e.target.value)} className={inputCls} />
      </Field>
      <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-teal mt-0.5" />
        I agree to the{" "}
        <a href="#" className="text-teal hover:underline">terms of service</a> and{" "}
        <a href="#" className="text-teal hover:underline">privacy policy</a>.
      </label>
      <button
        type="submit"
        disabled={!formValid}
        className="w-full h-10 rounded-lg bg-teal text-background font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create workspace
        <ArrowRight className="size-4" />
      </button>
      <SocialDivider />
      <SocialButtons />
    </form>
  );
}

const inputCls =
  "w-full h-10 rounded-lg bg-background/60 border border-white/10 px-3 text-sm outline-none focus:border-teal/60 transition-colors";

function Field({ label, children, valid }: { label: string; children: React.ReactNode; valid?: boolean }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        {valid === true && <Check className="size-3 text-teal" />}
        {valid === false && <span className="text-[10px] text-rose">Invalid</span>}
      </div>
      {children}
    </div>
  );
}

function PasswordStrength({ score }: { score: number }) {
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-rose", "bg-rose", "bg-yellow-500", "bg-teal", "bg-teal"];
  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i < score ? colors[score] : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{labels[score]}</p>
    </div>
  );
}

function SocialDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">or continue with</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" className="h-10 rounded-lg border border-white/10 bg-background/40 text-xs font-medium hover:bg-background transition-colors flex items-center justify-center gap-2">
        <GoogleIcon /> Google
      </button>
      <button type="button" className="h-10 rounded-lg border border-white/10 bg-background/40 text-xs font-medium hover:bg-background transition-colors flex items-center justify-center gap-2">
        <span className="text-base">🎓</span> SSO
      </button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path fill="#EA4335" d="M12 11v3.2h4.5c-.2 1.2-1.4 3.5-4.5 3.5-2.7 0-4.9-2.3-4.9-5s2.2-5 4.9-5c1.6 0 2.6.7 3.2 1.2l2.2-2.1C15.9 5.5 14.1 4.7 12 4.7 7.7 4.7 4.2 8.1 4.2 12.4S7.7 20 12 20c6.9 0 8.4-5.9 8.4-8.9 0-.6-.1-1-.2-1.1H12z" />
    </svg>
  );
}

// Avoid unused warnings on the optional-effects pattern.
void useEffect;