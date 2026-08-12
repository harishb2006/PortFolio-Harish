import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The hard-edged surface every panel is built from.
 * `tone="dark"` inverts it — use sparingly, one or two per page.
 */
export function Box({
  children,
  className,
  hover = false,
  tone = "light",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tone?: "light" | "dark";
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Tag
      className={cn(
        "relative",
        tone === "dark" ? "box-dark" : "box",
        hover && "shift",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Small uppercase accent label that names a block. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("eyebrow inline-flex items-center gap-1.5 text-accent", className)}
    >
      {children}
    </span>
  );
}

/** Numbered square index, as on the awards rows. */
export function NumBadge({
  n,
  tone = "dark",
  className,
}: {
  n: number | string;
  tone?: "dark" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center text-[13px] font-semibold text-white",
        tone === "accent" ? "bg-accent" : "bg-ink",
        className,
      )}
    >
      {n}
    </span>
  );
}

/** Outlined tech / tag chip. */
export function Chip({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[2px] px-2.5 py-1 text-[11px] font-medium tracking-tight",
        tone === "dark"
          ? "border border-white/30 text-white/80"
          : "border border-ink/20 text-zinc-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
