import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Award, Briefcase, Calendar, Code, GraduationCap, Trophy, Users } from "lucide-react";
import { Card, CardHeader, PageHeader, Pill, ProgressRing } from "@/components/app/ui";
import { CareerIQRadar, GrowthLine } from "@/components/app/charts";
import { getStudent, type Student, type TimelineEntry } from "@/lib/demo/data";

export const Route = createFileRoute("/app/students/$id")({
  loader: ({ params }) => {
    const student = getStudent(params.id);
    if (!student) throw notFound();
    return { student };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.student.name ?? "Student"} — Campus Connect` }],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-center">
      <h2 className="text-lg font-semibold">Student not found</h2>
      <Link to="/app/students" className="text-teal text-sm hover:underline mt-2 inline-block">Back to all students</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="p-10 text-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
    </div>
  ),
  component: StudentDetail,
});

function StudentDetail() {
  const { student } = Route.useLoaderData() as { student: Student };

  const radar = [
    { axis: "Technical", value: 88 },
    { axis: "Comms", value: 70 },
    { axis: "Leadership", value: 82 },
    { axis: "Certs", value: student.certifications.length * 18 },
    { axis: "Consistency", value: student.pulse },
    { axis: "Participation", value: 84 },
  ];

  const growth = Array.from({ length: 12 }).map((_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    value: Math.round(58 + i * 2.2 + Math.abs(Math.sin(i + student.id.length)) * 5),
  }));

  return (
    <div>
      <Link to="/app/students" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="size-3" /> All students
      </Link>

      <PageHeader title={student.name} description={`${student.department} · Year ${student.year} · Goal: ${student.goal}`}>
        <Pill tone="teal">CareerIQ {student.careerIQ}</Pill>
        <Pill tone="iris">Pulse {student.pulse}</Pill>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5 lg:col-span-1 flex flex-col items-center text-center">
          <div
            className="size-20 rounded-full grid place-items-center text-2xl font-semibold text-background mb-4"
            style={{ background: `oklch(0.7 0.13 ${student.avatarHue})` }}
          >
            {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <h3 className="font-semibold">{student.name}</h3>
          <p className="text-xs text-muted-foreground">{student.email}</p>
          <div className="grid grid-cols-3 gap-4 mt-5 w-full border-t border-white/5 pt-4">
            <MiniStat label="Skills" value={student.skills.length} />
            <MiniStat label="Certs" value={student.certifications.length} />
            <MiniStat label="Awards" value={student.achievements.length} />
          </div>
        </Card>

        <Card className="p-1 lg:col-span-2">
          <CardHeader title="CareerIQ profile" description={`Overall ${student.careerIQ}% — strong in technical depth`} />
          <div className="px-2 pb-4 grid grid-cols-1 md:grid-cols-2">
            <CareerIQRadar data={radar} />
            <div className="flex flex-col justify-center gap-4 p-4">
              <Metric label="Technical" value={88} tone="teal" />
              <Metric label="Communication" value={70} tone="iris" />
              <Metric label="Leadership" value={82} tone="rose" />
              <Metric label="Certifications" value={student.certifications.length * 18} tone="teal" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2"><Code className="size-3.5 text-teal" /> Skills</h3>
          <p className="text-xs text-muted-foreground mb-4">Current proficiency</p>
          <div className="space-y-3">
            {student.skills.map((sk, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{sk.name}</span>
                  <span className="text-muted-foreground">{sk.level}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal to-iris" style={{ width: `${sk.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2"><Award className="size-3.5 text-iris" /> Certifications</h3>
          <p className="text-xs text-muted-foreground mb-4">{student.certifications.length} recorded</p>
          <ul className="space-y-3">
            {student.certifications.map((c, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-iris/15 text-iris grid place-items-center">
                  <GraduationCap className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.issuer} · {c.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2"><Trophy className="size-3.5 text-rose" /> Achievements</h3>
          <p className="text-xs text-muted-foreground mb-4">Highlights from this academic year</p>
          <ul className="space-y-2">
            {student.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="size-1.5 mt-2 rounded-full bg-rose shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-4 border-t border-white/5 grid place-items-center">
            <ProgressRing value={student.careerIQ} label="CIQ" size={88} />
          </div>
        </Card>
      </div>

      <Card className="p-5 mb-6">
        <CardHeader title="CareerIQ trend" description="12-month growth trajectory" />
        <div className="px-2 pb-2">
          <GrowthLine data={growth} />
        </div>
      </Card>

      <Card className="p-5">
        <CardHeader title="Growth timeline" description="Workshops, hackathons, certifications, internships, and leadership" />
        <Timeline entries={student.timeline} />
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-base font-semibold">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: number; tone: "teal" | "iris" | "rose" }) {
  const color = { teal: "bg-teal", iris: "bg-iris", rose: "bg-rose" }[tone];
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const iconFor: Record<string, typeof Calendar> = {
    workshop: GraduationCap,
    hackathon: Code,
    certification: Award,
    internship: Briefcase,
    leadership: Users,
    competition: Trophy,
  };
  const toneFor: Record<string, "teal" | "iris" | "rose"> = {
    workshop: "teal",
    hackathon: "iris",
    certification: "teal",
    internship: "rose",
    leadership: "iris",
    competition: "rose",
  };
  return (
    <div className="relative pl-5 mt-2">
      <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-teal via-iris to-rose opacity-50" />
      <ul className="space-y-5">
        {entries.map((entry, i) => {
          const Icon = iconFor[entry.kind];
          const tone = toneFor[entry.kind];
          return (
            <li key={i} className="relative">
              <span
                className="absolute -left-[18px] top-1.5 size-3 rounded-full ring-4 ring-background"
                style={{
                  background:
                    tone === "teal"
                      ? "oklch(0.82 0.14 180)"
                      : tone === "iris"
                      ? "oklch(0.74 0.14 285)"
                      : "oklch(0.74 0.16 15)",
                }}
              />
              <div className="rounded-xl border border-white/5 bg-background/40 p-4 hover:bg-background/70 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {entry.kind}
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">{entry.date}</span>
                </div>
                <p className="text-sm font-medium">{entry.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{entry.org}</p>
                  <Pill tone={tone}>Impact {entry.impact}/10</Pill>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}