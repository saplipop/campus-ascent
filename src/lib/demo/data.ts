// Realistic demo data for Campus Connect Analytics.
// Pure data — no I/O. Deterministic so charts look stable across renders.

export type Department = {
  id: string;
  code: "BCA" | "BBA" | "MBA" | "CSE" | "ECE" | "MECH";
  name: string;
  students: number;
  participation: number;
  engagement: number;
  careerIQ: number;
  color: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  department: Department["code"];
  year: 1 | 2 | 3 | 4;
  avatarHue: number;
  careerIQ: number;
  pulse: number;
  skills: { name: string; level: number }[];
  certifications: { name: string; issuer: string; date: string }[];
  achievements: string[];
  goal: string;
  timeline: TimelineEntry[];
};

export type TimelineEntry = {
  date: string; // YYYY-MM
  kind: "workshop" | "hackathon" | "certification" | "internship" | "leadership" | "competition";
  title: string;
  org: string;
  impact: number; // 1..10
};

export type EventItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  organizer: string;
  registrations: number;
  attendance: number;
  completion: number;
  satisfaction: number; // 0..5
  successScore: number; // 0..100
};

export type Notification = {
  id: string;
  kind: "growth" | "cert" | "dept" | "reminder";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const departments: Department[] = [
  { id: "d1", code: "BCA", name: "Computer Applications", students: 412, participation: 78, engagement: 82, careerIQ: 79, color: "oklch(0.82 0.14 180)" },
  { id: "d2", code: "BBA", name: "Business Administration", students: 326, participation: 71, engagement: 75, careerIQ: 73, color: "oklch(0.74 0.14 285)" },
  { id: "d3", code: "MBA", name: "Management Studies", students: 184, participation: 84, engagement: 88, careerIQ: 86, color: "oklch(0.74 0.16 15)" },
  { id: "d4", code: "CSE", name: "Computer Science Eng.", students: 538, participation: 92, engagement: 90, careerIQ: 88, color: "oklch(0.82 0.15 140)" },
  { id: "d5", code: "ECE", name: "Electronics & Comm.", students: 297, participation: 64, engagement: 68, careerIQ: 66, color: "oklch(0.78 0.14 60)" },
  { id: "d6", code: "MECH", name: "Mechanical Eng.", students: 248, participation: 58, engagement: 62, careerIQ: 61, color: "oklch(0.70 0.10 30)" },
];

const firstNames = ["Aarav", "Ananya", "Vihaan", "Diya", "Kabir", "Isha", "Rohan", "Meera", "Arjun", "Sara", "Ved", "Priya", "Karthik", "Nisha", "Yash", "Anika", "Dev", "Tara", "Rahul", "Zara"];
const lastNames = ["Sharma", "Patel", "Iyer", "Khan", "Reddy", "Singh", "Mehta", "Verma", "Nair", "Bose", "Joshi", "Kapoor", "Das", "Rao", "Banerjee"];

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pick<T>(arr: T[], r: () => number) {
  return arr[Math.floor(r() * arr.length)];
}

const skillPool = [
  "React", "Python", "SQL", "Figma", "Public Speaking", "Leadership",
  "Data Analysis", "AWS", "Machine Learning", "UI Design", "Marketing",
  "Project Mgmt", "TypeScript", "Cybersecurity", "Negotiation",
];

const certPool = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "Meta UI Design", issuer: "Meta" },
  { name: "PMP Foundations", issuer: "PMI" },
  { name: "CompTIA Security+", issuer: "CompTIA" },
  { name: "TensorFlow Developer", issuer: "Google" },
];

const goals = [
  "Software Development", "Data Analytics", "UI/UX Design",
  "Business Development", "Cyber Security", "Digital Marketing",
];

function makeTimeline(r: () => number): TimelineEntry[] {
  return [
    { date: "2025-02", kind: "workshop", title: "Cloud Foundations Workshop", org: "AWS Campus", impact: 6 },
    { date: "2025-05", kind: "hackathon", title: "SpringHack 2025", org: "Campus Code Club", impact: 8 },
    { date: "2025-09", kind: "certification", title: pick(certPool, r).name, org: "Coursera", impact: 7 },
    { date: "2026-01", kind: "internship", title: "Product Intern", org: "Northwind Labs", impact: 9 },
    { date: "2026-04", kind: "leadership", title: "Student Council Lead", org: "Campus Connect", impact: 8 },
  ];
}

export const students: Student[] = Array.from({ length: 24 }).map((_, i) => {
  const r = rand(1000 + i * 17);
  const dept = departments[Math.floor(r() * departments.length)];
  const name = `${pick(firstNames, r)} ${pick(lastNames, r)}`;
  const skills = Array.from({ length: 6 }).map(() => ({
    name: pick(skillPool, r),
    level: Math.floor(50 + r() * 50),
  }));
  const certs = Array.from({ length: 2 + Math.floor(r() * 3) }).map(() => {
    const c = pick(certPool, r);
    return { ...c, date: `2025-${String(1 + Math.floor(r() * 12)).padStart(2, "0")}` };
  });
  return {
    id: `s${i + 1}`,
    name,
    email: name.toLowerCase().replace(" ", ".") + "@campus.edu",
    department: dept.code,
    year: (1 + Math.floor(r() * 4)) as 1 | 2 | 3 | 4,
    avatarHue: Math.floor(r() * 360),
    careerIQ: Math.floor(58 + r() * 38),
    pulse: Math.floor(50 + r() * 45),
    skills,
    certifications: certs,
    achievements: [
      "Winner — SpringHack 2025",
      "Top 10 — National Coding Olympiad",
      "Best Speaker — TEDx Campus",
    ].slice(0, 1 + Math.floor(r() * 3)),
    goal: pick(goals, r),
    timeline: makeTimeline(r),
  };
});

export const events: EventItem[] = [
  { id: "e1", title: "SpringHack 2025", category: "Hackathon", date: "2025-05-14", organizer: "Code Club", registrations: 412, attendance: 386, completion: 92, satisfaction: 4.7, successScore: 94 },
  { id: "e2", title: "Cloud Foundations Workshop", category: "Workshop", date: "2025-02-21", organizer: "AWS Campus", registrations: 248, attendance: 221, completion: 88, satisfaction: 4.5, successScore: 89 },
  { id: "e3", title: "TEDx Campus Connect", category: "Talk", date: "2025-09-09", organizer: "Student Council", registrations: 612, attendance: 588, completion: 97, satisfaction: 4.9, successScore: 96 },
  { id: "e4", title: "AI Bootcamp", category: "Bootcamp", date: "2025-11-02", organizer: "AI Society", registrations: 192, attendance: 174, completion: 84, satisfaction: 4.4, successScore: 87 },
  { id: "e5", title: "Product Design Sprint", category: "Workshop", date: "2026-01-18", organizer: "Design Guild", registrations: 156, attendance: 142, completion: 90, satisfaction: 4.6, successScore: 90 },
  { id: "e6", title: "Cyber Defense Drill", category: "Competition", date: "2026-03-04", organizer: "Sec Society", registrations: 98, attendance: 82, completion: 78, satisfaction: 4.2, successScore: 81 },
];

export const notifications: Notification[] = [
  { id: "n1", kind: "growth", title: "Engagement up 12%", body: "Student engagement increased across CSE this week.", time: "2h", unread: true },
  { id: "n2", kind: "cert", title: "New certification recorded", body: "Ananya Sharma completed AWS Cloud Practitioner.", time: "5h", unread: true },
  { id: "n3", kind: "dept", title: "Department milestone", body: "MBA crossed an 86 CareerIQ average for the first time.", time: "1d", unread: false },
  { id: "n4", kind: "reminder", title: "Upcoming: AI Bootcamp", body: "Starts in 3 days · 192 registered students.", time: "1d", unread: false },
];

// Time-series for the overview dashboard
export const pulseSeries = Array.from({ length: 12 }).map((_, i) => {
  const r = rand(42 + i);
  return {
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    pulse: Math.floor(55 + i * 2 + r() * 8),
    careerIQ: Math.floor(60 + i * 1.6 + r() * 6),
    participation: Math.floor(58 + i * 1.4 + r() * 10),
  };
});

export const heatmapWeeks = 16;
export const heatmapDays = 7;
export function heatmapValue(week: number, day: number) {
  return Math.abs(Math.sin(week * 1.7 + day * 3.1 + 0.7));
}

export const overviewKpis = {
  totalStudents: 2005,
  activeStudents: 1742,
  pulse: 78.4,
  careerIQ: 81.2,
  eventSuccess: 89.6,
  skillProgress: 73.8,
};

export const trendingSkills = [
  { name: "Cloud Architecture", delta: 24 },
  { name: "Data Analytics", delta: 18 },
  { name: "AI / ML", delta: 16 },
  { name: "UI Design", delta: 12 },
  { name: "Product Mgmt", delta: 9 },
];

export const skillGaps = [
  { name: "DevOps", gap: 32 },
  { name: "System Design", gap: 28 },
  { name: "Public Speaking", gap: 22 },
  { name: "Negotiation", gap: 18 },
];

export function getStudent(id: string) {
  return students.find((s) => s.id === id);
}