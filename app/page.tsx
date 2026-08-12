import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";

import { Box, Eyebrow, Chip } from "@/components/site/card";
import { Reveal } from "@/components/site/reveal";
import { Avatar } from "@/components/site/avatar";
import { BrandMark } from "@/components/site/brand-mark";
import { SkillMarquee } from "@/components/site/marquee";
import { CopyEmail } from "@/components/site/copy-email";
import {
  profile,
  experience,
  education,
  marqueeSkills,
} from "@/lib/data";

export default function HomePage() {
  const job = experience[0];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      {/* ---------------------------------------------------------- Hero */}
      <section className="pb-20 pt-10 sm:pb-28 sm:pt-20">
        <Reveal>
          <h1 className="tighter text-[clamp(1.85rem,7.4vw,4.4rem)] font-semibold leading-[1.05]">
            <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Hi, I&apos;m</span>
              <Avatar className="h-9 w-9 translate-y-0.5 rounded-xl text-base sm:h-[3.4rem] sm:w-[3.4rem] sm:rounded-[20px] sm:text-2xl" />
              <span>{profile.name}.</span>
            </span>
            <br />
            <span className="text-zinc-300">I&apos;m a </span>
            <span>{profile.roleLead}</span>
            <span className="text-zinc-300"> &amp; </span>
            <br className="hidden sm:block" />
            <span className="text-accent">{profile.roleAccent}.</span>
          </h1>
        </Reveal>
      </section>

      {/* ---------------------------------------------------- Experience */}
      <Reveal>
        <Box className="p-6 sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <BrandMark
                src={job.logo}
                name={job.company}
                className="h-14 w-14"
              />
              <div className="min-w-0">
                <Eyebrow>Experience</Eyebrow>
                <h2 className="tighter mt-2 text-[clamp(1.3rem,3vw,1.85rem)] font-semibold leading-[1.15]">
                  {job.role}
                </h2>
                <p className="mt-1 text-[14px] font-medium text-zinc-500">
                  {job.company} <span className="text-zinc-300">·</span>{" "}
                  {job.org}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="box-sm px-2.5 py-1 text-[11px] font-medium text-zinc-500">
                {job.status}
              </span>
              <span className="bg-ink px-2.5 py-1 font-mono text-[11px] text-white">
                {job.period}
              </span>
            </div>
          </div>

          <p className="mt-7 max-w-2xl text-[14.5px] leading-relaxed text-zinc-600">
            {job.summary}
          </p>

          <ol className="rule mt-7 grid gap-x-8 gap-y-5 pt-6 sm:grid-cols-3">
            {job.points.map((point, i) => (
              <li key={point} className="flex gap-3">
                <span className="font-mono text-[11px] text-accent">
                  0{i + 1}
                </span>
                <p className="text-[13px] leading-relaxed text-zinc-600">
                  {point}
                </p>
              </li>
            ))}
          </ol>

          <div className="rule mt-6 flex flex-wrap items-center gap-1.5 pt-5">
            <span className="eyebrow mr-1.5 text-zinc-400">Stack</span>
            {job.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </Box>
      </Reveal>

      {/* ----------------------------------------------------- Education */}
      <Reveal delay={0.05} className="mt-4">
        <Box hover className="shift-accent group p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-center gap-4">
              <BrandMark src={education.logo} name={education.school} />
              <div className="min-w-0">
                <Eyebrow className="text-zinc-400">Education</Eyebrow>
                <a
                  href={education.url}
                  target="_blank"
                  rel="noreferrer"
                  className="stretch-link tight mt-1.5 block text-[16px] font-semibold transition-colors duration-300 group-hover:text-accent"
                >
                  {education.program}
                </a>
                <p className="mt-0.5 text-[13px] leading-snug text-zinc-500">
                  {education.detail}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:ml-auto">
              <span className="box-sm px-3 py-1.5 font-mono text-[11.5px] text-zinc-500">
                {education.period}
              </span>
              <span className="grid h-9 w-9 place-items-center bg-ink text-white transition-colors duration-300 group-hover:bg-accent">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Box>
      </Reveal>

      {/* ------------------------------------------------------- Toolkit */}
      <Reveal delay={0.1} className="mt-4">
        <Box className="flex flex-col gap-6 py-6 lg:flex-row lg:items-center">
          <div className="shrink-0 px-6 sm:px-8 lg:max-w-[240px]">
            <div className="flex items-center gap-2">
              <Eyebrow>Toolkit</Eyebrow>
              <span className="font-mono text-[11px] text-zinc-400">
                {marqueeSkills.length}
              </span>
            </div>
            <p className="tight mt-3 text-[15.5px] font-medium leading-snug">
              Typed front to back, retrieval where it earns its place.
            </p>
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <SkillMarquee />
            <SkillMarquee reverse offset={5} />
          </div>
        </Box>
      </Reveal>

      {/* ----------------------------------------------------------- CTA */}
      <Reveal delay={0.1} className="mt-4">
        <Box className="p-6 sm:p-9">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>Say hello</Eyebrow>
              <h2 className="tighter mt-4 max-w-md text-[clamp(1.4rem,3vw,2rem)] font-semibold leading-[1.12]">
                Have something worth building?
              </h2>
              <p className="mt-2.5 max-w-sm text-[14px] leading-relaxed text-zinc-500">
                Internships, freelance work or a half-formed idea.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <CopyEmail />
              <Link
                href="/connect"
                className="press inline-flex items-center gap-2 rounded-xs bg-ink px-5 py-2.5 text-[13.5px] font-medium text-white transition-colors duration-300 hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                Message
              </Link>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="press box-sm grid h-[42px] w-[42px] place-items-center text-zinc-600 transition-colors duration-300 hover:text-accent"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Box>
      </Reveal>
    </div>
  );
}
