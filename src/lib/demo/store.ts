// In-memory mutable store for students & generated reports.
// Subscribers re-render via useSyncExternalStore.
import { useSyncExternalStore } from "react";
import { students as seedStudents, type Student } from "./data/students";

type Listener = () => void;

function createStore<T>(initial: T) {
  let state = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    set: (updater: (s: T) => T) => {
      state = updater(state);
      listeners.forEach((l) => l());
    },
    subscribe: (l: Listener) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

// ----- Students -----
const studentsStore = createStore<Student[]>([...seedStudents]);

export function useStudents(): Student[] {
  return useSyncExternalStore(
    studentsStore.subscribe,
    studentsStore.get,
    studentsStore.get,
  );
}

export function useStudent(id: string): Student | undefined {
  return useStudents().find((s) => s.id === id);
}

function statusFor(careerIQ: number): Student["status"] {
  if (careerIQ >= 82) return "High Performer";
  if (careerIQ >= 68) return "Active";
  return "At Risk";
}

export type NewStudentInput = {
  name: string;
  email: string;
  department: Student["department"];
  year: Student["year"];
  goal: string;
  careerIQ: number;
};

export const studentActions = {
  add(input: NewStudentInput) {
    const id = `s${Date.now()}`;
    const student: Student = {
      id,
      name: input.name,
      email: input.email,
      department: input.department,
      year: input.year,
      avatarHue: Math.floor(Math.random() * 360),
      careerIQ: input.careerIQ,
      pulse: 60 + Math.floor(Math.random() * 30),
      skills: [
        { name: "Communication", level: 60 + Math.floor(Math.random() * 30) },
        { name: "Problem Solving", level: 60 + Math.floor(Math.random() * 30) },
      ],
      certifications: [],
      achievements: [],
      goal: input.goal,
      status: statusFor(input.careerIQ),
      timeline: [],
    };
    studentsStore.set((s) => [student, ...s]);
    return student;
  },
  update(id: string, patch: Partial<NewStudentInput>) {
    studentsStore.set((arr) =>
      arr.map((s) => {
        if (s.id !== id) return s;
        const next = { ...s, ...patch } as Student;
        if (patch.careerIQ !== undefined) next.status = statusFor(patch.careerIQ);
        return next;
      }),
    );
  },
  remove(id: string) {
    studentsStore.set((arr) => arr.filter((s) => s.id !== id));
  },
  reset() {
    studentsStore.set(() => [...seedStudents]);
  },
};

// ----- Reports -----
export type GeneratedReport = {
  id: string;
  title: string;
  kind: string;
  rows: number;
  generatedAt: string;
};

const reportsStore = createStore<GeneratedReport[]>([]);

export function useReports(): GeneratedReport[] {
  return useSyncExternalStore(
    reportsStore.subscribe,
    reportsStore.get,
    reportsStore.get,
  );
}

export const reportActions = {
  add(r: Omit<GeneratedReport, "id" | "generatedAt">) {
    const item: GeneratedReport = {
      ...r,
      id: `r${Date.now()}`,
      generatedAt: new Date().toISOString(),
    };
    reportsStore.set((arr) => [item, ...arr].slice(0, 20));
    return item;
  },
  remove(id: string) {
    reportsStore.set((arr) => arr.filter((r) => r.id !== id));
  },
};