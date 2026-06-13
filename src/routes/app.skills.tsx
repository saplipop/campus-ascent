import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Target } from "lucide-react";
import { Card, CardHeader, PageHeader, Pill } from "@/components/app/ui";
import { SkillGapBars } from "@/components/app/charts";
import { skillGaps, trendingSkills } from "@/lib/demo/data";

const goals = [
  { id: "sde", name: "Software Development", required: ["React", "TypeScript", "System Design", "DevOps", "Cloud", "Data Structures"] },
  { id: "data", name: "Data Analytics", required: ["SQL", "Python", "Statistics", "Tableau", "Data Modeling", "Excel"] },
  { id: "ux", name: "UI/UX Design", required: ["Figma", "User Research", "Prototyping", "Design Systems", "Motion", "Accessibility"] },
  { id: "biz", name: "Business Development", required: ["Negotiation", "Public Speaking", "CRM", "Market Research", "Financial Modeling"] },
  { id: "sec", name: "Cyber Security", required: ["Networking", "Linux", "Cryptography", "Penetration Testing", "OWASP"] },
  { id: "mkt", name: "Digital Marketing", required: ["SEO", "Analytics", "Copywriting", "Paid Ads", "Brand Strategy"] },
];

const ownedSkills = new Set(["React", "TypeScript", "Python", "SQL", "Figma", "Networking"]);

export const Route = createFileRoute("/app/skills")({
  head: () => ({ meta: [{ title: "Skills & Gaps — Campus Connect" }] }),
  component: SkillsPage,
});

function SkillsPage() {
  const [goalId, setGoalId] = useState(goals[0].id);
  const goal = goals.find((g) => g.id === goalId)!;
  const have = goal.required.filter((s) => ownedSkills.has(s));
  const missing = goal.required.filter((s) => !ownedSkills.has(s));

  return (
    <div>
      <PageHeader
        eyebrow="Skill intelligence"
        title="Skills & gap analysis"
        description="Compare student skill profiles against the requirements of real industry career paths."
      />

      <Card className="p-5 mb-6">
        <p className="text-xs text-muted-foreground mb-3">Select a career goal</p>
        <div className="flex flex-wrap gap-2">
          {goals.map((g) => (
            <button
              key={g.id}
              onClick={() => setGoalId(g.id)}
              className={`px-4 h-9 rounded-full text-xs font-medium border transition-colors ${
                goalId === g.id
                  ? "bg-teal/15 border-teal/50 text-teal"
                  : "bg-background/40 border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <CardHeader title={`Skills you have for ${goal.name}`} description={`${have.length} of ${goal.required.length} requirements met`} />
          <div className="flex flex-wrap gap-2 px-1">
            {have.length === 0 ? (
              <p className="text-xs text-muted-foreground">No matching skills yet — explore the recommendations below.</p>
            ) : (
              have.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-teal/15 text-teal text-xs border border-teal/30">
                  ✓ {s}
                </span>
              ))
            )}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader title="Skills you're missing" description="Industry-critical for this career path" />
          <div className="flex flex-wrap gap-2 px-1">
            {missing.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-rose/15 text-rose text-xs border border-rose/30">
                ✗ {s}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <CardHeader title="Largest institutional skill gaps" description="Most critical missing competencies" />
          <SkillGapBars data={skillGaps} />
        </Card>

        <Card className="p-5">
          <CardHeader title="Trending skills" description="Highest growth this quarter" />
          <div className="space-y-3">
            {trendingSkills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span>{s.name}</span>
                  <span className="text-teal">+{s.delta}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal to-iris" style={{ width: `${s.delta * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <CardHeader title="Recommended for you" description="Personalized learning paths based on your goal" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {missing.slice(0, 6).map((s, i) => (
            <div key={s} className="rounded-xl border border-white/5 bg-background/40 p-4 hover:bg-background/70 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="size-8 rounded-lg bg-gradient-to-br from-teal/20 to-iris/10 border border-white/10 grid place-items-center">
                  {i % 2 === 0 ? <Target className="size-4 text-teal" /> : <Sparkles className="size-4 text-iris" />}
                </div>
                <Pill tone="teal">{["Workshop", "Certification", "Bootcamp"][i % 3]}</Pill>
              </div>
              <p className="text-sm font-medium">Master {s}</p>
              <p className="text-xs text-muted-foreground mt-1">8-week intensive curated to close this gap fast.</p>
              <button className="mt-4 text-xs text-teal flex items-center gap-1 hover:underline">
                Enroll students <ArrowRight className="size-3" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}