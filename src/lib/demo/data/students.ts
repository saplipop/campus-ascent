// Student dataset generator.
// Tweak `STUDENT_COUNT`, name pools, skill pool and cert pool below.
import { departments, type Department } from "./departments";

export type TimelineEntry = {
  date: string;
  kind: "workshop" | "hackathon" | "certification" | "internship" | "leadership" | "competition";
  title: string;
  org: string;
  impact: number;
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
  status: "High Performer" | "Active" | "At Risk";
  timeline: TimelineEntry[];
};

const STUDENT_COUNT = 24;

const firstNames = ["Aarav","Ananya","Vihaan","Diya","Kabir","Isha","Rohan","Meera","Arjun","Sara","Ved","Priya","Karthik","Nisha","Yash","Anika","Dev","Tara","Rahul","Zara"];
const lastNames = ["Sharma","Patel","Iyer","Khan","Reddy","Singh","Mehta","Verma","Nair","Bose","Joshi","Kapoor","Das","Rao","Banerjee"];

const skillPool = ["React","Python","SQL","Figma","Public Speaking","Leadership","Data Analysis","AWS","Machine Learning","UI Design","Marketing","Project Mgmt","TypeScript","Cybersecurity","Negotiation"];

const certPool = [
  { name: "AWS Cloud Practitioner", issuer: "Amazon" },
  { name: "Google Data Analytics", issuer: "Google" },
  { name: "Meta UI Design", issuer: "Meta" },
  { name: "PMP Foundations", issuer: "PMI" },
  { name: "CompTIA Security+", issuer: "CompTIA" },
  { name: "TensorFlow Developer", issuer: "Google" },
];

const goals = ["Software Development","Data Analytics","UI/UX Design","Business Development","Cyber Security","Digital Marketing"];

function rand(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; };
}
function pick<T>(arr: T[], r: () => number) { return arr[Math.floor(r() * arr.length)]; }

function makeTimeline(r: () => number): TimelineEntry[] {
  return [
    { date: "2025-02", kind: "workshop", title: "Cloud Foundations Workshop", org: "AWS Campus", impact: 6 },
    { date: "2025-05", kind: "hackathon", title: "SpringHack 2025", org: "Campus Code Club", impact: 8 },
    { date: "2025-09", kind: "certification", title: pick(certPool, r).name, org: "Coursera", impact: 7 },
    { date: "2026-01", kind: "internship", title: "Product Intern", org: "Northwind Labs", impact: 9 },
    { date: "2026-04", kind: "leadership", title: "Student Council Lead", org: "Campus Connect", impact: 8 },
  ];
}

function statusFor(careerIQ: number): Student["status"] {
  if (careerIQ >= 82) return "High Performer";
  if (careerIQ >= 68) return "Active";
  return "At Risk";
}

export const students: Student[] = Array.from({ length: STUDENT_COUNT }).map((_, i) => {
  const r = rand(1000 + i * 17);
  const dept = departments[Math.floor(r() * departments.length)];
  const name = `${pick(firstNames, r)} ${pick(lastNames, r)}`;
  const skills = Array.from({ length: 6 }).map(() => ({ name: pick(skillPool, r), level: Math.floor(50 + r() * 50) }));
  const certs = Array.from({ length: 2 + Math.floor(r() * 3) }).map(() => {
    const c = pick(certPool, r);
    return { ...c, date: `2025-${String(1 + Math.floor(r() * 12)).padStart(2, "0")}` };
  });
  const careerIQ = Math.floor(58 + r() * 38);
  return {
    id: `s${i + 1}`,
    name,
    email: name.toLowerCase().replace(" ", ".") + "@campus.edu",
    department: dept.code,
    year: (1 + Math.floor(r() * 4)) as 1 | 2 | 3 | 4,
    avatarHue: Math.floor(r() * 360),
    careerIQ,
    pulse: Math.floor(50 + r() * 45),
    skills,
    certifications: certs,
    achievements: ["Winner — SpringHack 2025","Top 10 — National Coding Olympiad","Best Speaker — TEDx Campus"].slice(0, 1 + Math.floor(r() * 3)),
    goal: pick(goals, r),
    status: statusFor(careerIQ),
    timeline: makeTimeline(r),
  };
});

export function getStudent(id: string) {
  return students.find((s) => s.id === id);
}