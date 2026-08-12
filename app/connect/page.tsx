import type { Metadata } from "next";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";

import { Box, Eyebrow } from "@/components/site/card";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "@harishb2006",
    href: profile.socials.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "harishb2006",
    href: profile.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "LeetCode",
    value: "harishb2006",
    href: profile.socials.leetcode,
    icon: Code2,
  },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <section className="pb-10 pt-8 sm:pt-12">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="tighter mt-5 max-w-3xl text-[clamp(2rem,5.4vw,3.2rem)] font-semibold leading-[1.08]">
            Let&apos;s build something.{" "}
            <span className="text-zinc-300">
              Tell me what you have in mind.
            </span>
          </h1>
        </Reveal>
      </section>

      <section className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <Box className="p-6 sm:p-8">
            <ContactForm />
          </Box>
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-2">
          <Box className="p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <Eyebrow>Direct</Eyebrow>
              {profile.available && (
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 breathe" />
                  {profile.availableLabel}
                </span>
              )}
            </div>

            <ul className="mt-5">
              {channels.map(({ label, value, href, icon: Icon }, i) => (
                <li key={label} className={i === 0 ? "" : "rule"}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3.5 py-3.5"
                  >
                    <span className="box-sm grid h-9 w-9 shrink-0 place-items-center text-zinc-500 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow block text-zinc-400">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-[14px] font-medium tracking-tight">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Box>
        </Reveal>
      </section>
    </div>
  );
}
