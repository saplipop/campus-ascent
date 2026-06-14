// AI-style quick insights and the live activity feed on Overview.

export type Insight = {
  id: string;
  label: string;
  value: string;
  tone: "teal" | "iris" | "rose";
};

export const insights: Insight[] = [
  { id: "i1", label: "Top performing department", value: "CSE — 88 CareerIQ", tone: "teal" },
  { id: "i2", label: "Students needing attention", value: "12 flagged this week", tone: "rose" },
  { id: "i3", label: "Most improved skill", value: "Communication +18%", tone: "iris" },
];

export type Activity = { id: string; who: string; what: string; time: string };

export const activityFeed: Activity[] = [
  { id: "a1", who: "Riya Sharma", what: "joined Hackathon 2026", time: "12m" },
  { id: "a2", who: "Aman Patel", what: "completed AWS Cloud Practitioner", time: "1h" },
  { id: "a3", who: "Meera Iyer", what: "earned 'Top Speaker' badge", time: "3h" },
  { id: "a4", who: "CSE Department", what: "passed 88 CareerIQ milestone", time: "5h" },
  { id: "a5", who: "Karthik Rao", what: "started Product Intern at Northwind", time: "1d" },
];