import { marqueeSkills } from "@/lib/data";

export function SkillMarquee({
  reverse = false,
  offset = 0,
}: {
  reverse?: boolean;
  /** Rotate the source list so the two rows don't read identically. */
  offset?: number;
}) {
  const source = [
    ...marqueeSkills.slice(offset),
    ...marqueeSkills.slice(0, offset),
  ];
  const row = [...source, ...source];

  return (
    <div className="marquee-pause fade-edges overflow-hidden">
      <div
        className="marquee-track flex w-max gap-2"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="box-sm whitespace-nowrap px-3 py-1.5 text-[12px] font-medium tracking-tight text-zinc-600"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
