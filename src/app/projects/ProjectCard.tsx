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

const ProjectCard = ({
  completed = ProjectCardData,
  limit,
}: {
  completed?: typeof ProjectCardData;
  limit?: number;
}) => {
  const displayedProjects = useMemo(() => {
    const arr = limit ? [...completed].slice(-limit) : [...completed];
    return arr.reverse();
  }, [completed, limit]);

  const N = displayedProjects.length;

  return (
    <Container className="mt-8 relative">
      {/* Dynamic Grid Container */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-0">
        
        {/* Single vertical line divider in the absolute center (visible sm-up) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 z-0 hidden sm:block pointer-events-none">
          <div 
            className="h-full w-full opacity-60 dark:opacity-40" 
            style={{ 
              backgroundImage: "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)", 
              backgroundSize: "1px 100%", 
              backgroundRepeat: "no-repeat" 
            }} 
          />
        </div>

        {displayedProjects.map((items, index) => {
          return (
            <motion.div
              key={items.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative p-4 flex flex-col"
              style={{
                contentVisibility: "auto",
                containIntrinsicSize: "400px",
                willChange: "transform, opacity",
              }}
            >
              {/* Card Anchor/Link container */}
              <Link
                className="flex flex-col gap-3 cursor-pointer group w-full text-left"
                to={items.projectDetailsPageSlug}
              >
                {/* 1. Double border wrapper around screenshot */}
                <div className="p-[4px] rounded-[10px] border border-border dark:border-neutral-800 bg-card shadow-xs transition-shadow duration-300 group-hover:shadow-md">
                  <div className="relative w-full bg-muted/30 rounded-[6px] border border-border dark:border-neutral-800 h-[210px] sm:h-[180px] md:h-[210px] overflow-hidden select-none">
                    
                    {/* Normal Full Image with hover zoom */}
                    <img 
                      alt={items.img.alt} 
                      loading="lazy" 
                      width="600" 
                      height="400" 
                      decoding="async" 
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                      src={items.img.src} 
                    />

                    {/* Floating Heading Top-Left */}
                    <h4 className="absolute top-2 left-2 text-[10px] text-muted-foreground group-hover:text-foreground font-semibold tracking-wider transition-all duration-300 z-20 uppercase bg-background/80 dark:bg-neutral-900/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-border/50 dark:border-neutral-700/50 shadow-2xs">
                      {items.title}
                    </h4>

                    {/* Floating Top-Right Quick Links */}
                    <div className="absolute top-2 right-2 flex gap-1 z-20">
                      {/* GitHub Link */}
                      {items.links.github && (
                        <a 
                          href={items.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-[8px] border border-border dark:border-neutral-800 bg-background/90 dark:bg-neutral-900/90 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-all shadow-xs hover:scale-105"
                          title="View GitHub Repository"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                        </a>
                      )}

                      {/* Live Link */}
                      {items.links.website && (
                        <a 
                          href={items.links.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-[8px] border border-border dark:border-neutral-800 bg-background/90 dark:bg-neutral-900/90 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-all shadow-xs hover:scale-105"
                          title="View Live Website"
                        >
                          <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="13"
                            width="13"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </a>
                      )}
                    </div>

                  </div>
                </div>

                {/* 2. Text Details Section */}
                <div className="px-1 flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center justify-between">
                    {/* Project Title */}
                    <h3 className="text-[1.05rem] leading-none text-foreground font-bold tracking-tight group-hover:text-primary transition-colors">
                      {items.title}
                    </h3>
                    
                    {/* Pulsing Live/Building Status Badge */}
                    <div className="flex items-center gap-1.5 select-none">
                      <div className="relative flex items-center justify-center size-2">
                        <span className={cn(
                          "absolute inline-flex size-full rounded-full opacity-60 animate-ping",
                          items.isWorking ? "bg-green-500" : "bg-amber-500"
                        )} />
                        <span className={cn(
                          "relative inline-flex size-1.5 rounded-full",
                          items.isWorking ? "bg-green-500" : "bg-amber-500"
                        )} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {items.isWorking ? "Live" : "Building"}
                      </span>
                    </div>
                  </div>

                  {/* Description with two-line clamp */}
                  <p className="text-[0.88rem] leading-snug text-muted-foreground line-clamp-2 min-h-[38px]">
                    {items.description}
                  </p>

                  {/* View details link */}
                  <div className="flex items-center gap-1 select-none pt-1">
                    <span className="text-xs text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">
                      View Project
                    </span>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground size-3 transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>

              {/* 3. Mathematical Dash Dividers at bottom of each grid cell */}
              
              {/* Horizontal Line for Mobile (all items except the absolute last one) */}
              {index < N - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-px block sm:hidden pointer-events-none">
                  <div 
                    className="w-full h-full opacity-60 dark:opacity-40" 
                    style={{ 
                      backgroundImage: "repeating-linear-gradient(to right, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)", 
                      backgroundSize: "100% 1px", 
                      backgroundRepeat: "no-repeat" 
                    }} 
                  />
                </div>
              )}

              {/* Horizontal Line for Desktop (all items except those in the last row) */}
              {index < Math.floor((N - 1) / 2) * 2 && (
                <div className="absolute bottom-0 left-0 right-0 h-px hidden sm:block pointer-events-none">
                  <div 
                    className="w-full h-full opacity-60 dark:opacity-40" 
                    style={{ 
                      backgroundImage: "repeating-linear-gradient(to right, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)", 
                      backgroundSize: "100% 1px", 
                      backgroundRepeat: "no-repeat" 
                    }} 
                  />
                </div>
              )}

            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};

export default ProjectCard;
