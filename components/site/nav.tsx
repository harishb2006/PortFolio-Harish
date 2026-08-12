"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/connect", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav className="reveal box pointer-events-auto flex items-center gap-1 p-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300"
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  active ? "text-white" : "text-zinc-500 hover:text-ink"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}

        {/* Leaves the site — the browser's own PDF viewer handles it, so
            nothing is fetched until this is clicked. */}
        <span className="mx-1 h-5 w-px bg-ink/15" />
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-tight text-zinc-500 transition-colors duration-300 hover:text-accent"
        >
          Resume
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </nav>
    </header>
  );
}
