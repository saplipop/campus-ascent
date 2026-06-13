import { useEffect, useState } from "react";

const KEY = "cca.theme.v1";
type Mode = "dark" | "light";

function getStored(): Mode {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem(KEY) as Mode) || "dark";
}

function apply(mode: Mode) {
  const root = document.documentElement;
  root.classList.toggle("light", mode === "light");
  root.dataset.theme = mode;
}

export function useTheme() {
  const [mode, setMode] = useState<Mode>("dark");
  useEffect(() => {
    const m = getStored();
    setMode(m);
    apply(m);
  }, []);
  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    localStorage.setItem(KEY, next);
    apply(next);
  };
  return { mode, toggle };
}