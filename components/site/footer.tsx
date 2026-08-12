import Link from "next/link";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pb-10 pt-16 sm:px-6">
      <div className="flex flex-col gap-4 border-t border-ink/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-zinc-500">
          <span className="font-medium text-ink">{profile.name}</span> ·{" "}
          {profile.location}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-zinc-500">
          <Link href="/projects" className="transition-colors hover:text-ink">
            Work
          </Link>
          <Link href="/connect" className="transition-colors hover:text-ink">
            Contact
          </Link>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
