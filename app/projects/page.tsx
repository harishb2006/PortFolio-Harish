import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Box, Eyebrow, Chip } from "@/components/site/card";
import { Reveal } from "@/components/site/reveal";
import { ProjectGrid } from "@/components/site/project-grid";
import { nowBuilding } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Harish B — agentic AI systems, retrieval pipelines and full-stack platforms.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <h1 className="sr-only">Work</h1>

      {/* ------------------------------------------------ Building now */}
      <Reveal className="pt-8 sm:pt-12">
        <Box tone="dark" className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow className="text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent breathe" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Building now
            </Eyebrow>
            <span className="text-[11.5px] font-medium text-white/45">
              {nowBuilding.status}
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="tighter max-w-xl text-[clamp(1.6rem,3.8vw,2.5rem)] font-semibold leading-[1.08]">
                {nowBuilding.title}
              </h2>
              <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/60">
                {nowBuilding.note}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {nowBuilding.tags.map((tag) => (
                <Chip key={tag} tone="dark">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        </Box>
      </Reveal>

      <div className="mt-10">
        <Reveal delay={0.05}>
          <ProjectGrid />
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <Box className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <h2 className="tight text-[20px] font-semibold sm:text-[24px]">
            Happy to walk through any of these.
          </h2>
          <Link
            href="/connect"
            className="press group inline-flex shrink-0 items-center gap-2 rounded-xs bg-ink px-5 py-3 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-accent"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Box>
      </Reveal>
    </div>
  );
}
