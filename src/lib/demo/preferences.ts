import { useEffect, useState } from "react";
import { appConfig } from "@/config/app";

const FOCUS_KEY = "cca.focus.v1";
const INST_KEY = "cca.institution.v1";

export function useFocusMode() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(localStorage.getItem(FOCUS_KEY) === "1");
    const onChange = () => setOn(localStorage.getItem(FOCUS_KEY) === "1");
    window.addEventListener("cca:focus", onChange);
    return () => window.removeEventListener("cca:focus", onChange);
  }, []);
  const toggle = () => {
    const next = !on;
    localStorage.setItem(FOCUS_KEY, next ? "1" : "0");
    setOn(next);
    window.dispatchEvent(new Event("cca:focus"));
  };
  return { focus: on, toggle };
}

export function useInstitution() {
  const [name, setNameState] = useState(appConfig.defaults.institution);
  useEffect(() => {
    const v = localStorage.getItem(INST_KEY);
    if (v) setNameState(v);
  }, []);
  const setName = (v: string) => {
    localStorage.setItem(INST_KEY, v);
    setNameState(v);
  };
  return { name, setName };
}