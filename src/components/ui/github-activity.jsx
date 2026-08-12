"use client";;
import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_ACCENT = "#39d353";
const DEFAULT_CELL_SIZE = 11;
const DEFAULT_LABEL = "Top contributions in:";
const DEFAULT_MONTHS = 12;
const WEEKS_PER_MONTH = 365.25 / 12 / 7;
const STACK_LIMIT = 3;
const MIN_CARD_WIDTH = 320;
const MIN_LABEL_WEEKS = 3;
// the p-4 on the card, both sides; the width math below has to add it back
const CARD_PADDING = 32;

const gapFor = (cellSize) => Math.max(2, Math.round(cellSize / 4));
// never zero: weeks.slice(-0) would hand back the whole history instead of nothing
const weeksFor = (months) =>
  Math.max(1, Math.ceil(months * WEEKS_PER_MONTH));

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const EASE_OUT = [0.22, 1, 0.36, 1];
const SPRING = {
  type: "spring",
  bounce: 0.2,
  duration: 0.62
};
const HEADER_SPRING = {
  ...SPRING,
  bounce: 0.45
};
const ROW_SPRING = {
  ...SPRING,
  bounce: 0.26,
  delay: 0.08
};
const ROW_OFFSET = 16;
const CELL_FADE = {
  duration: 0.2,
  ease: EASE_OUT
};
const TOOLTIP_FADE = {
  duration: 0.14,
  ease: EASE_OUT
};
const TOOLTIP_EDGE = 8;
const COLUMN_STAGGER = 0.012;
const LABEL_BLUR = 6;
const LABEL_REVEAL = {
  duration: 0.45,
  ease: EASE_OUT
};

const LEVELS = [0, 1, 2, 3, 4];

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toMonthLabels(weeks) {
  const labels = weeks.map(() => null);
  const monthAt = (index) => weeks[index]?.[0]?.date.slice(5, 7);

  let start = 0;
  for (let i = 1; i <= weeks.length; i++) {
    if (i < weeks.length && monthAt(i) === monthAt(start)) continue;
    // a shorter run is narrower than the label itself, so it would sit under the next month
    if (i - start >= MIN_LABEL_WEEKS) {
      labels[start] = MONTH_NAMES[Number(monthAt(start)) - 1] ?? null;
    }
    start = i;
  }

  return labels;
}

const LEVEL_OPACITY = {
  0: 0,
  1: 0.3,
  2: 0.52,
  3: 0.76,
  4: 1,
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function describeDay({
  count,
  date
}) {
  const noun = count === 1 ? "contribution" : "contributions";
  return `${count} ${noun} on ${DATE_FORMAT.format(new Date(`${date}T00:00:00`))}`;
}

const CALENDAR_API = "https://github-contributions-api.jogruber.de/v4";
const EVENTS_API = "https://api.github.com/users";

async function fetchCalendar(login) {
  const res = await fetch(`${CALENDAR_API}/${login}?y=last`);
  if (!res.ok) return null;

  const days = (await res.json())?.contributions ?? [];
  if (!days.length) return null;

  // columns are weeks, so the first day has to be a sunday or every column shears
  const start = days.findIndex((day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0);

  return days.slice(start < 0 ? 0 : start).map((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)),
  }));
}

async function fetchRepos(login) {
  const res = await fetch(`${EVENTS_API}/${login}/events/public?per_page=100`);
  if (!res.ok) return [];

  const events = await res.json();
  const counts = new Map();

  for (const event of events) {
    if (event.type !== "PushEvent" || !event.repo) continue;
    const commits = event.payload?.commits?.length ?? 1;
    counts.set(event.repo.name, (counts.get(event.repo.name) ?? 0) + commits);
  }

  return [...counts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, STACK_LIMIT)
    .map(([fullName, count]) => {
      const [owner, name] = fullName.split("/");
      return {
        name,
        count,
        href: `https://github.com/${fullName}`,
        logo:
          owner.toLowerCase() === login.toLowerCase() ? undefined : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://github.com/${owner}.png?size=64`} alt="" />
          ),
      };
    });
}

function useGitHubUser(login) {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    if (!login) return;
    let active = true;

    Promise.all([fetchCalendar(login), fetchRepos(login)])
      .then(([contributions, repos]) => {
        if (active && contributions) setData({ contributions, repos });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [login]);

  return data;
}

function emptyDays(weeks) {
  const today = new Date();
  return Array.from({ length: weeks * 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * 7 - 1 - i));
    return {
      date: date.toISOString().slice(0, 10),
      count: 0,
      level: 0,
    };
  });
}

function toScale(accent) {
  if (typeof accent === "string") {
    return LEVELS.map((level) => ({
      backgroundColor: accent,
      opacity: LEVEL_OPACITY[level],
    }));
  }

  const colors = accent.length > 4 ? accent : ["transparent", ...accent];
  return LEVELS.map((level) => {
    const color = colors[level] ?? colors.at(-1) ?? "transparent";
    return { backgroundColor: color, opacity: color === "transparent" ? 0 : 1 };
  });
}

function toWeeks(contributions) {
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }
  return weeks;
}

function useFittedColumns(cellSize, gap) {
  const ref = React.useRef(null);
  const [columns, setColumns] = React.useState();

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setColumns(Math.max(1, Math.floor((el.clientWidth + gap) / (cellSize + gap))));

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [cellSize, gap]);

  return [ref, columns];
}

const Tooltip = ({
  hovered,
  reduceMotion
}) => {
  const ref = React.useRef(null);
  const [left, setLeft] = React.useState(hovered.x);

  useIsoLayoutEffect(() => {
    const half = (ref.current?.offsetWidth ?? 0) / 2;
    const edge = TOOLTIP_EDGE + half;
    setLeft(Math.min(Math.max(hovered.x, edge), window.innerWidth - edge));
  }, [hovered]);

  return createPortal(<div
    className="pointer-events-none fixed z-50"
    style={{
      left,
      top: hovered.y,
      transform: "translate(-50%, calc(-100% - 8px))",
    }}>
    <motion.div
      ref={ref}
      className="whitespace-nowrap rounded-lg bg-neutral-900 px-2 py-1 text-[11px] font-medium text-white shadow-md dark:bg-neutral-100 dark:text-neutral-900"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      transition={reduceMotion ? { duration: 0 } : TOOLTIP_FADE}>
      {describeDay(hovered.day)}
    </motion.div>
  </div>, document.body);
};

const ContributionGrid = ({
  contributions,
  scale,
  cellSize,
  months,
  showMonths,
  label,
  reduceMotion
}) => {
  const weeks = React.useMemo(() => toWeeks(contributions), [contributions]);
  const gap = gapFor(cellSize);
  const [ref, columns] = useFittedColumns(cellSize, gap);
  const [hovered, setHovered] = React.useState();

  const cap = Math.min(weeks.length, weeksFor(months));
  const visible = weeks.slice(-Math.min(cap, columns ?? cap));
  const sweepEnd = (visible.length - 1) * COLUMN_STAGGER + CELL_FADE.duration;

  const hover = (day) => (event) => {
    const cell = event.currentTarget.getBoundingClientRect();
    setHovered({ day, x: cell.left + cell.width / 2, y: cell.top });
  };

  return (
    <div
      ref={ref}
      data-slot="github-activity-grid"
      role="img"
      aria-label={label}
      className="relative">
      {showMonths && (
        <motion.div
          className="flex justify-center"
          style={{ gap, marginBottom: gap }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, filter: `blur(${LABEL_BLUR}px)` }
          }
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            ...LABEL_REVEAL,
            delay: reduceMotion ? 0 : sweepEnd,
          }}>
          {toMonthLabels(visible).map((month, index) => (
            <div key={index} className="relative h-3 shrink-0" style={{ width: cellSize }}>
              {month && (
                <span
                  className="absolute left-0 top-0 text-[10px] leading-none text-neutral-400 dark:text-neutral-500">
                  {month}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <div
        className="flex justify-center overflow-hidden"
        style={{ gap }}
        onPointerLeave={() => setHovered(undefined)}>
        {visible.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col" style={{ gap }}>
            {week.map((day) => (
              <motion.div
                key={day.date}
                onPointerEnter={hover(day)}
                className="shrink-0 rounded-[3px] bg-neutral-200/60 dark:bg-neutral-800/60"
                style={{ width: cellSize, height: cellSize }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  ...CELL_FADE,
                  delay: reduceMotion ? 0 : weekIndex * COLUMN_STAGGER,
                }}>
                <div
                  className="h-full w-full rounded-[3px]"
                  style={scale[day.level] ?? scale[0]} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovered && (
          <Tooltip key="tooltip" hovered={hovered} reduceMotion={reduceMotion} />
        )}
      </AnimatePresence>
    </div>
  );
};

const GRADIENT_IMAGES = [
  "/avatars/grad-blue.png",
  "/avatars/grad-green.png",
  "/avatars/grad-red.png",
];

const getGradientImageForIndexOrName = (name = "", index = 0) => {
  if (typeof index === 'number' && index < GRADIENT_IMAGES.length) {
    return GRADIENT_IMAGES[index % GRADIENT_IMAGES.length];
  }
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENT_IMAGES[Math.abs(hash) % GRADIENT_IMAGES.length];
};

const Avatar = ({
  repo,
  layoutId,
  transition,
  className,
  index = 0
}) => {
  const bgImage = getGradientImageForIndexOrName(repo.name, index);

  return (
    <motion.span
      layoutId={layoutId}
      transition={transition}
      className={cn(
        "grid size-7 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-white/20 shadow-md bg-[size:145%] bg-center",
        "[&_img]:size-full [&_img]:object-cover [&_svg]:size-full",
        className
      )}
      style={!repo.logo ? { backgroundImage: `url(${bgImage})` } : undefined}>
      {repo.logo ? repo.logo : null}
    </motion.span>
  );
};

const RepoRow = ({
  repo,
  layoutId,
  transition,
  index
}) => {
  const className =
    "flex items-center gap-3 rounded-xl mx-2 px-2 py-2 hover:bg-foreground/5";

  const content = (
    <>
      <Avatar repo={repo} layoutId={layoutId} transition={transition} index={index} />
      <span className="flex-1 truncate text-sm text-neutral-900 dark:text-white">
        {repo.name}
      </span>
      <span className="text-sm tabular-nums text-neutral-600 dark:text-neutral-400">
        {repo.count}
      </span>
    </>
  );

  return repo.href ? (
    <a href={repo.href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

const Chevron = ({
  open,
  transition
}) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="size-7 text-neutral-400/70 dark:text-neutral-600 "
    initial={false}
    animate={{ rotate: open ? 0 : 180 }}
    transition={transition}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 10-4 4-4-4" />
  </motion.svg>
);

const GitHubActivity = ({
  className,
  username,
  contributions: contributionsProp = [],
  repos: reposProp = [],
  year,
  accent = DEFAULT_ACCENT,
  cellSize = DEFAULT_CELL_SIZE,
  months = DEFAULT_MONTHS,
  showMonths = false,
  label = DEFAULT_LABEL,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  style,
  ...props
}) => {
  const reduceMotion = useReducedMotion();
  const uid = React.useId();
  const [openState, setOpenState] = React.useState(defaultOpen);

  const open = openProp ?? openState;
  const toggle = () => {
    if (openProp === undefined) setOpenState(!open);
    onOpenChange?.(!open);
  };

  const needsFetch = !contributionsProp.length || !reposProp.length;
  const fetched = useGitHubUser(needsFetch ? username : undefined);
  const placeholder = React.useMemo(() => (username ? emptyDays(weeksFor(months)) : []), [username, months]);

  const contributions = contributionsProp.length
    ? contributionsProp
    : (fetched?.contributions ?? placeholder);
  const repos = reposProp.length ? reposProp : (fetched?.repos ?? []);

  const scale = React.useMemo(() => toScale(accent), [accent]);
  const transition = reduceMotion ? { duration: 0 } : SPRING;
  const headerTransition = reduceMotion ? { duration: 0 } : HEADER_SPRING;
  const rowTransition = reduceMotion ? { duration: 0 } : ROW_SPRING;

  const kick = reduceMotion ? {} : { x: ROW_OFFSET, y: ROW_OFFSET };
  const listMotion = {
    initial: { opacity: 0, ...kick },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, ...kick },
  };

  const total = React.useMemo(
    () => contributions.reduce((sum, day) => sum + day.count, 0),
    [contributions]
  );

  const parsedYear = Number(contributions.at(-1)?.date.slice(0, 4));
  const displayYear = year ?? (Number.isFinite(parsedYear) ? parsedYear : null);
  const heading = `${total} contributions${displayYear ? ` in ${displayYear}` : ""}`;

  const gap = gapFor(cellSize);
  const columns = Math.min(Math.ceil(contributions.length / 7), weeksFor(months));
  const width = Math.max(MIN_CARD_WIDTH, columns * (cellSize + gap) - gap + CARD_PADDING);

  return (
    <div
      data-slot="github-activity"
      className={cn(
        "relative max-w-full overflow-hidden rounded-[28px] border border-black/10 bg-white p-4 text-neutral-900 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-950 dark:text-white",
        repos.length > 0 && "pb-[76px]",
        className
      )}
      style={{ width, ...style }}
      {...props}>
      <p className="mb-4 px-1.5 text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
        {heading}
      </p>

      <ContributionGrid
        contributions={contributions}
        scale={scale}
        cellSize={cellSize}
        months={months}
        showMonths={showMonths}
        label={heading}
        reduceMotion={reduceMotion} />

      {repos.length > 0 && (
        <motion.div
          layout
          id={`${uid}-panel`}
          data-slot="github-activity-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "absolute inset-x-3 bottom-3 overflow-hidden border border-black/5 bg-neutral-100/90 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/90",
            open && "top-3"
          )}
          style={{ borderRadius: 18 }}
          transition={transition}>
          <motion.div
            layout="position"
            transition={headerTransition}
            className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="truncate text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</span>

            <div className="flex items-center gap-3">
              {!open && (
                <div className="flex items-center">
                  {repos.slice(0, STACK_LIMIT).map((repo, index) => (
                    <Avatar
                      key={index}
                      repo={repo}
                      layoutId={`${uid}-${index}`}
                      transition={transition}
                      index={index}
                      className="-ml-2 first:ml-0" />
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls={`${uid}-panel`}
                aria-label={
                  open ? "Hide top repositories" : "Show top repositories"
                }
                className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-200/80 text-neutral-700  dark:bg-neutral-800 dark:text-neutral-300 cursor-pointer">
                <Chevron open={open} transition={transition} />
              </button>
            </div>
          </motion.div>

          <AnimatePresence initial={false} mode="popLayout">
            {open && (
              <motion.ul
                key="list"
                layout="position"
                {...listMotion}
                transition={rowTransition}
                className="px-0.5 pb-1">
                {repos.map((repo, index) => (
                  <li key={index}>
                    <RepoRow repo={repo} layoutId={`${uid}-${index}`} transition={transition} index={index} />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export { GitHubActivity };
export default GitHubActivity;
