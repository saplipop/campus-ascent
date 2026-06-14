// Department directory — edit codes, names, counts, and metric baselines here.
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

export const departments: Department[] = [
  { id: "d1", code: "BCA", name: "Computer Applications", students: 412, participation: 78, engagement: 82, careerIQ: 79, color: "oklch(0.82 0.14 180)" },
  { id: "d2", code: "BBA", name: "Business Administration", students: 326, participation: 71, engagement: 75, careerIQ: 73, color: "oklch(0.74 0.14 285)" },
  { id: "d3", code: "MBA", name: "Management Studies", students: 184, participation: 84, engagement: 88, careerIQ: 86, color: "oklch(0.74 0.16 15)" },
  { id: "d4", code: "CSE", name: "Computer Science Eng.", students: 538, participation: 92, engagement: 90, careerIQ: 88, color: "oklch(0.82 0.15 140)" },
  { id: "d5", code: "ECE", name: "Electronics & Comm.", students: 297, participation: 64, engagement: 68, careerIQ: 66, color: "oklch(0.78 0.14 60)" },
  { id: "d6", code: "MECH", name: "Mechanical Eng.", students: 248, participation: 58, engagement: 62, careerIQ: 61, color: "oklch(0.70 0.10 30)" },
];