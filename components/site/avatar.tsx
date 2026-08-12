"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Photo tile — a white border and nothing else.
 * On hover the frame grows and the photo zooms inside it.
 */
export function Avatar({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(profile.avatar) && !failed;

  return (
    <span
      className={cn(
        "group relative inline-grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-white bg-white align-middle text-2xl",
        "transition-transform duration-500 ease-out-soft hover:z-10 hover:scale-[1.3]",
        className,
      )}
    >
      <span
        className="font-semibold tracking-tight text-zinc-400"
        aria-hidden="true"
      >
        {profile.initials}
      </span>

      {showPhoto && (
        <span className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.12]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar}
            alt={profile.name}
            onError={() => setFailed(true)}
            style={{ transform: profile.avatarFraming }}
            className="h-full w-full object-cover"
          />
        </span>
      )}
    </span>
  );
}
