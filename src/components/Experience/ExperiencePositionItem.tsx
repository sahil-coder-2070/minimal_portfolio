import { useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import type { ExperiencePosition } from "./types";
import { cn } from "@/lib/utils";

// Exact Tag component mapping from the Chanhdai HTML DOM structure
function Tag({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex items-center rounded-md border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground dark:bg-zinc-900 retina:border-[0.5px] [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 shadow-2xs hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;
  const [isOpen, setIsOpen] = useState(position.isExpanded ?? true);

  return (
    <div data-slot="collapsible" className="group/experience-position relative" data-open={isOpen ? "" : undefined}>
      {/* Bottom connecting timeline bit */}
      <div className="pointer-events-none absolute bottom-0 left-3 hidden h-px w-3 bg-border group-last/experience-position:flex" />

      {/* Accordion Trigger */}
      <button
        type="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="group block w-full text-left relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-neutral-100 dark:hover:before:bg-neutral-900/40 outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50 cursor-pointer"
      >
        <div className="relative z-1 mb-1 flex items-center gap-3">
          {/* Position Icon Box */}
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shadow-xs"
          >
            {/* Custom Lucide code-xml icon inside the box */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code-xml"
              aria-hidden="true"
            >
              <path d="m18 16 4-4-4-4"></path>
              <path d="m6 8-4 4 4 4"></path>
              <path d="m14.5 4-5 16"></path>
            </svg>
          </div>

          <h4 className="flex-1 font-medium text-foreground text-base leading-snug text-balance">
            {position.title}
          </h4>

          {/* Animated custom ChevronsUpDown icon */}
          <div className="shrink-0 text-muted-foreground mr-1 group-data-disabled:hidden [&_svg]:size-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "size-4 transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0"
              )}
              aria-hidden="true"
            >
              <path d="M7 20L12 15L17 20"></path>
              <path d="M7 4L12 9L17 4"></path>
            </svg>
          </div>
        </div>

        {/* Metadata Row */}
        <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </dl>
              <div
                data-orientation="vertical"
                role="none"
                data-slot="separator"
                className="shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:h-4 data-vertical:self-center"
              />
            </>
          )}

          <dl>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-infinity size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                >
                  <path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"></path>
                </svg>
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </dl>

          {position.duration && (
            <>
              <div
                data-orientation="vertical"
                role="none"
                data-slot="separator"
                className="shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:h-4 data-vertical:self-center"
              />
              <dl>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{position.duration}</dd>
              </dl>
            </>
          )}
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Description list inside a custom prose container */}
            {position.description && (
              <div data-slot="prose" className="prose max-w-none prose-zinc dark:prose-invert pt-2 pl-9 text-sm text-muted-foreground">
                <ul className="list-disc space-y-1.5 pl-5">
                  {position.description.split("\n").map((desc, idx) => (
                    <li key={idx}>
                      <span dangerouslySetInnerHTML={{ __html: desc }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Technologies tags list positioned below the trigger, outside the collapsible container so they are always visible (exactly like Chanhdai's code!) */}
      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <a href={skill.href} target="_blank" rel="noopener noreferrer">
                <Tag className="flex items-center gap-1.5">
                  {skill.icon && <span className="size-3.5 block [&_svg]:size-full">{skill.icon}</span>}
                  {skill.name}
                </Tag>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
