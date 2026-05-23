import { ExperiencePositionItem } from "./ExperiencePositionItem";
import type { Experience } from "./types";

export function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div
      id={`experience-${experience.id}`}
      className="scroll-mt-14 space-y-4 py-4"
    >
      <div className="flex items-center gap-3">
        {/* Company Logo Icon Container */}
        <div className="flex size-6 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {experience.companyLogo ? (
            <img
              alt={`${experience.companyName} logo`}
              aria-hidden="true"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              className="rounded-full"
              style={{ color: "transparent" }}
              src={experience.companyLogo}
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        {/* Company Name */}
        <h3 className="text-lg leading-snug font-semibold">
          {experience.companyWebsite ? (
            <a
              className="link"
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener"
            >
              {experience.companyName}
            </a>
          ) : (
            experience.companyName
          )}
        </h3>

        {/* Pulsing Active Status */}
        {experience.isCurrentEmployer && (
          <span
            className="relative flex items-center justify-center"
            aria-label="Current Employer"
          >
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50"></span>
            <span className="relative inline-flex size-2 rounded-full bg-info"></span>
          </span>
        )}
      </div>

      {/* Timeline connector track containing positions */}
      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}
