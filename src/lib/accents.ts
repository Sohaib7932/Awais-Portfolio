import type { Accent } from "@/data/portfolio";

/* Tailwind can't build class names dynamically, so each accent maps to
   complete, literal class strings. */

export const accentText: Record<Accent, string> = {
  purple: "text-primary",
  cyan: "text-tertiary",
  blue: "text-secondary",
};

export const accentBg: Record<Accent, string> = {
  purple: "bg-primary",
  cyan: "bg-tertiary",
  blue: "bg-secondary",
};

export const accentChip: Record<Accent, string> = {
  purple: "bg-primary/20 text-primary border-primary/30",
  cyan: "bg-tertiary/20 text-tertiary border-tertiary/30",
  blue: "bg-secondary/20 text-secondary border-secondary/30",
};

/* Backdrop used when a project has no artwork of its own yet */
export const accentBackdrop: Record<Accent, string> = {
  purple:
    "bg-surface-low bg-[radial-gradient(circle_at_50%_35%,rgba(132,43,210,0.55),transparent_65%)]",
  cyan: "bg-surface-low bg-[radial-gradient(circle_at_50%_35%,rgba(0,158,185,0.5),transparent_65%)]",
  blue: "bg-surface-low bg-[radial-gradient(circle_at_50%_35%,rgba(5,102,217,0.5),transparent_65%)]",
};

export const accentHoverBtn: Record<Accent, string> = {
  purple: "hover:bg-primary hover:text-on-primary",
  cyan: "hover:bg-tertiary hover:text-on-tertiary",
  blue: "hover:bg-secondary hover:text-on-secondary",
};
