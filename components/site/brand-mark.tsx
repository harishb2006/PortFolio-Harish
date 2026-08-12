"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Logo tile for an organisation. Falls back to the first letter until the
 * image file exists, so the layout never shows a broken image.
 */
export function BrandMark({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        "box-sm grid h-12 w-12 shrink-0 place-items-center overflow-hidden",
        className,
      )}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span
          className="text-[17px] font-semibold text-zinc-400"
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}
