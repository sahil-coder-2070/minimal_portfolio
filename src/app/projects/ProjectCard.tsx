import { useMemo } from "react";
import Container from "@/components/layouts/Container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectCardData } from "@/config/projects/ProjectCardData";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectCard = ({ completed = ProjectCardData, limit }) => {
  const displayedProjects = useMemo(() => {
    const arr = limit ? [...completed].slice(-limit) : [...completed];
    return arr.reverse();
  }, [completed, limit]);

  return (
    <Container className={`mt-8 grid grid-cols-1 gap-8`}>
      {displayedProjects.map((items, index) => {
        return (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4"
            style={{
              contentVisibility: "auto",
              containIntrinsicSize: "380px",
              willChange: "transform, opacity",
            }}
          >
            <Card
              className={
                "flex gap-6 overflow-hidden border-0 border-t-2 border-b-2 px-3 py-4 md:flex-row md:gap-3 dark:border-neutral-700/60 dark:bg-neutral-900/30"
              }
            >
              <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-md sm:w-64 sm:shrink-0">
                <div className="h-full w-full">
                  <a href={items.links.website}>
                    <img
                      src={items.img.src}
                      alt={items.img.alt}
                      width={items.img?.width ?? 1280}
                      height={items.img?.height ?? 720}
                      loading="lazy"
                      decoding="async"
                      fetchPriority={index < 2 ? "high" : "low"}
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="h-full w-full object-cover object-center transition-all duration-200 hover:scale-110"
                    />
                  </a>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3">
                <CardHeader className={"flex w-full flex-col gap-4 p-0 px-3"}>
                  <CardTitle className={"flex w-full justify-between text-xl"}>
                    <div>
                      <a href={items.projectDetailsPageSlug}>{items.title}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={items.links.website}
                        className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                        target="_blank"
                        title="View Website"
                      >
                        <ExternalLink size={12} />
                        Live
                      </Link>
                      <Link
                        to={items.links.github}
                        className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                        target="_blank"
                        title="View GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Github
                      </Link>
                    </div>
                  </CardTitle>
                  <CardDescription className={"line-clamp-2 w-full"}>
                    {items.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className={"p-0 px-3"}>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {items.technologies.slice(0, 4).map((tech, idx) => {
                        return (
                          <Link
                            to={tech.href || "#"}
                            target="_blank"
                            className={`inline-flex items-center self-end rounded-md border border-black/10 bg-black/2 px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/5 dark:text-white`}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a
                                  href={tech.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center self-end text-black dark:text-white/90"
                                >
                                  <p className="ml-1 text-xs">{tech.name}</p>
                                </a>
                              </TooltipTrigger>
                              <TooltipContent className="">
                                <span className="flex">
                                  <div className="size-4 shrink-0">
                                    {tech.icon}
                                  </div>

                                  <p className="ml-1 text-xs">{tech.name}</p>
                                </span>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-2 flex w-full items-center justify-between px-3 pt-0">
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-md px-2 py-1 text-xs",
                      items.isWorking
                        ? "border-green-300 bg-green-500/10"
                        : "border-red-300 bg-red-500/10",
                    )}
                  >
                    {items.isWorking ? (
                      <>
                        <div className="size-2 animate-pulse rounded-full bg-green-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        <div className="size-2 animate-pulse rounded-full bg-red-500" />
                        Building
                      </>
                    )}
                  </div>
                  <Link
                    to={items.projectDetailsPageSlug}
                    className={cn(
                      "text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors duration-200 ease-[ease] hover:underline",
                    )}
                  >
                    View Details <ArrowRight className="mt-0.5 size-4" />
                  </Link>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </Container>
  );
};

export default ProjectCard;
