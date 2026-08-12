import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Entrance animation, pure CSS. No JS dependency, so content is never
 * stuck at opacity 0 if hydration is slow or scripts fail — it just
 * settles in. Deliberately short and low-travel.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("reveal", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
