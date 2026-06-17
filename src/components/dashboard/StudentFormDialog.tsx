import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { departments } from "@/lib/demo/data";
import type { Student } from "@/lib/demo/data/students";
import { studentActions, type NewStudentInput } from "@/lib/demo/store";
import { toast } from "sonner";

const GOALS = [
  "Software Development",
  "Data Analytics",
  "UI/UX Design",
  "Business Development",
  "Cyber Security",
  "Digital Marketing",
];

export function StudentFormDialog({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing?: Student | null;
}) {
  const [form, setForm] = useState<NewStudentInput>({
    name: "",
    email: "",
    department: "CSE",
    year: 1,
    goal: GOALS[0],
    careerIQ: 75,
  });

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        name: editing.name,
        email: editing.email,
        department: editing.department,
        year: editing.year,
        goal: editing.goal,
        careerIQ: editing.careerIQ,
      });
    } else {
      setForm({
        name: "",
        email: "",
        department: "CSE",
        year: 1,
        goal: GOALS[0],
        careerIQ: 75,
      });
    }
  }, [open, editing]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    if (editing) {
      studentActions.update(editing.id, form);
      toast.success(`Updated ${form.name}`);
    } else {
      studentActions.add(form);
      toast.success(`Added ${form.name}`);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit student" : "Add student"}
      description="Demo data — changes persist for the current session."
    >
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
            placeholder="Ananya Sharma"
            autoFocus
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
            placeholder="ananya@campus.edu"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Department">
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value as NewStudentInput["department"] })}
              className="input"
            >
              {departments.map((d) => (
                <option key={d.code} value={d.code}>{d.code} — {d.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Year">
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) as NewStudentInput["year"] })}
              className="input"
            >
              {[1, 2, 3, 4].map((y) => <option key={y} value={y}>Year {y}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Career goal">
          <select
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            className="input"
          >
            {GOALS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label={`CareerIQ — ${form.careerIQ}`}>
          <input
            type="range"
            min={40}
            max={99}
            value={form.careerIQ}
            onChange={(e) => setForm({ ...form, careerIQ: Number(e.target.value) })}
            className="w-full accent-teal"
          />
        </Field>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-white/10 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-9 px-4 rounded-lg bg-teal text-background text-xs font-medium hover:brightness-110 transition-all"
          >
            {editing ? "Save changes" : "Add student"}
          </button>
        </div>
      </form>

      <style>{`
        .input {
          width: 100%;
          height: 2.25rem;
          padding: 0 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid color-mix(in oklab, white 10%, transparent);
          background: color-mix(in oklab, var(--color-background, #000) 40%, transparent);
          font-size: 0.875rem;
          color: inherit;
          outline: none;
        }
        .input:focus { border-color: color-mix(in oklab, white 30%, transparent); }
      `}</style>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}