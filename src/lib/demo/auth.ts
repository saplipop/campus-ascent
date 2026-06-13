import { useEffect, useState } from "react";

const KEY = "cca.session.v1";

export type DemoUser = {
  name: string;
  email: string;
  role: "Administrator" | "Faculty" | "Student Coordinator";
  institution: string;
};

export function getSession(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function setSession(user: DemoUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("cca:session"));
}

export function clearSession() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("cca:session"));
}

export function useDemoSession() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getSession());
    setReady(true);
    const onChange = () => setUser(getSession());
    window.addEventListener("cca:session", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("cca:session", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { user, ready };
}

export function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++;
  return Math.min(score, 4); // 0..4
}