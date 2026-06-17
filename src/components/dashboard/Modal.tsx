import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

/** Lightweight centered modal. Closes on backdrop click or Escape. */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const widthCls = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-3xl" }[size];

  return (
    <div
      className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm grid place-items-start pt-20 px-4 animate-fade-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${widthCls} rounded-2xl border border-white/10 bg-surface shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5">
          <div>
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="size-8 rounded-lg border border-white/10 grid place-items-center text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}