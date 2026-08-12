"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import { Box, Chip } from "@/components/site/card";
import { profile, projects, type Project } from "@/lib/data";

const filters = ["All", "AI", "Full-Stack", "Web"] as const;
type Filter = (typeof filters)[number];

export function ProjectGrid() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active],
  );

  return (
    <>
      {/* Filter bar — segmented, like a row of joined boxes */}
      <div className="box inline-flex flex-wrap p-1">
        {filters.map((filter) => {
          const isActive = filter === active;
          const count =
            filter === "All"
              ? projects.length
              : projects.filter((p) => p.category === filter).length;

          return (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className="relative px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300"
            >
              {isActive && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute inset-0 bg-ink"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-ink"
                }`}
              >
                {filter}
                <span
                  className={`ml-1.5 font-mono text-[10px] ${
                    isActive ? "text-white/50" : "text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid. Cards carry no mount animation on purpose — an `initial`
          opacity would be serialised into the SSR markup and leave the grid
          blank until hydration. `layout` only animates repositioning. */}
      <motion.div layout className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((project, i) => (
          <motion.div
            key={project.slug}
            layout
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <ProjectCard project={project} index={i + 1} />
          </motion.div>
        ))}

        {/* Fills the odd slot and gives the grid a natural end */}
        <motion.div key="more" layout className="h-full">
          <GitHubCard />
        </motion.div>
      </motion.div>
    </>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const primary = project.live || project.github;

  return (
    <Box hover className="shift-accent group flex h-full flex-col">
      {/* Header — numbered index butts against the card edge */}
      <div className="flex items-start gap-4 p-5 pb-4 sm:p-6 sm:pb-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center bg-ink text-[13px] font-semibold text-white transition-colors duration-300 group-hover:bg-accent">
          {index}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="tight text-[18px] font-semibold leading-tight">
            {primary ? (
              <a
                href={primary}
                target="_blank"
                rel="noreferrer"
                className="stretch-link transition-colors duration-300 group-hover:text-accent"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="mt-0.5 text-[13px] text-zinc-500">{project.subtitle}</p>
        </div>

        <span className="shrink-0 font-mono text-[11px] text-zinc-400">
          {project.year}
        </span>
      </div>

      <div className="px-5 pb-5 sm:px-6">
        <p className="text-[13.5px] leading-relaxed text-zinc-600">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="rule mt-auto flex items-center gap-2 px-5 py-3.5 sm:px-6">
        <span className="eyebrow text-zinc-400">{project.category}</span>

        <div className="relative z-2 ml-auto flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="press box-sm inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-zinc-600 transition-colors duration-300 hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="press inline-flex items-center gap-1.5 rounded-xs bg-ink px-3 py-1.5 text-[12px] font-medium text-white transition-colors duration-300 hover:bg-accent"
            >
              Live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            !project.github && (
              <span className="text-[12px] text-zinc-400">Private repo</span>
            )
          )}
        </div>
      </div>
    </Box>
  );
}

function GitHubCard() {
  return (
    <Box
      hover
      tone="dark"
      className="shift-accent group flex h-full min-h-[200px] flex-col justify-between p-5 sm:p-6"
    >
      <span className="grid h-10 w-10 place-items-center border border-white/25 text-white transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
        <Github className="h-5 w-5" />
      </span>

      <div>
        <h3 className="tight text-[18px] font-semibold">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="stretch-link transition-colors duration-300 group-hover:text-accent"
          >
            More on GitHub
          </a>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-white/55">
          Experiments, half-builds and the rest
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </p>
      </div>
    </Box>
  );
}
