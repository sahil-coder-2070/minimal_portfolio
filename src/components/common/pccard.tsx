import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Javascript from "../icons/social/Javascript";
import ReactJs from "../icons/social/ReactJs";
import { Github, TailwindCss, Vite, Website } from "@/lib/techIcons";
import Skill from "./Skills";
import { Link } from "react-router-dom";

import cn from "clsx";
import { ArrowRight, ExternalLink, GithubIcon, Link2 } from "lucide-react";
import Container from "../layouts/Container";

interface PccardProps {
  items: {
    isWorking: boolean;
    projectDetailsPageSlug: string;
  };
}

const Pccard: React.FC<PccardProps> = ({ items }) => {
  return (
    <Container>
      <div>
        <Card
          className={
            "flex gap-2 overflow-hidden px-3 py-4 md:flex-row dark:bg-neutral-900/40"
          }
        >
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-md sm:w-64 sm:shrink-0">
            <div className="h-full w-full">
              <img
                src="/public/projects/image.png"
                alt="Event cover"
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <CardHeader className={"flex w-full flex-col gap-4 p-0 px-3"}>
              <CardTitle className={"flex w-full justify-between text-xl"}>
                <div>Small Card</div>
                <div className="flex items-center gap-2">
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View Website"
                  >
                    <ExternalLink size={12} />
                    Live
                  </Link>
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View GitHub"
                  >
                    <GithubIcon size={12} />
                    Github
                  </Link>
                </div>
              </CardTitle>
              <CardDescription className={"w-full"}>
                ChefyAI is an AI-powered recipe generator that lets users
                instantly create personalized recipes based on their input.
              </CardDescription>
            </CardHeader>
            <CardContent className={"p-0 px-3"}>
              <div>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 4).map((tech, idx) => {
                    return (
                      <Link
                        to={""}
                        target="_blank"
                        className={`inline-flex items-center self-end rounded-md border border-black/10 bg-black/2 px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/5 dark:text-white`}
                      >
                        <p className="ml-1 text-xs">{tech.name}</p>
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
                  true
                    ? "border-green-300 bg-green-500/10"
                    : "border-red-300 bg-red-500/10",
                )}
              >
                {true ? (
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
                to={"#"}
                className={cn(
                  "text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors duration-200 ease-[ease] hover:underline",
                )}
              >
                View Details <ArrowRight className="mt-0.5 size-4" />
              </Link>
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className="mt-10">
        <Card
          className={
            "flex gap-2 overflow-hidden border-0 border-t-2 border-b-2 px-3 py-4 md:flex-row dark:bg-neutral-900/10"
          }
        >
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-md sm:w-64 sm:shrink-0">
            <div className="h-full w-full">
              <img
                src="/public/projects/image.png"
                alt="Event cover"
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <CardHeader className={"flex w-full flex-col gap-4 p-0 px-3"}>
              <CardTitle className={"flex w-full justify-between text-xl"}>
                <div>Small Card</div>
                <div className="flex items-center gap-2">
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View Website"
                  >
                    <ExternalLink size={12} />
                    Live
                  </Link>
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View GitHub"
                  >
                    <GithubIcon size={12} />
                    Github
                  </Link>
                </div>
              </CardTitle>
              <CardDescription className={"w-full"}>
                ChefyAI is an AI-powered recipe generator that lets users
                instantly create personalized recipes based on their input.
              </CardDescription>
            </CardHeader>
            <CardContent className={"p-0 px-3"}>
              <div>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 4).map((tech, idx) => {
                    return (
                      <Link
                        to={""}
                        target="_blank"
                        className={`inline-flex items-center self-end rounded-md border border-black/10 bg-black/2 px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/5 dark:text-white`}
                      >
                        <p className="ml-1 text-xs">{tech.name}</p>
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
                  true
                    ? "border-green-300 bg-green-500/10"
                    : "border-red-300 bg-red-500/10",
                )}
              >
                {true ? (
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
                to={"#"}
                className={cn(
                  "text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors duration-200 ease-[ease] hover:underline",
                )}
              >
                View Details <ArrowRight className="mt-0.5 size-4" />
              </Link>
            </CardFooter>
          </div>
        </Card>
      </div>
      <div className="mt-10">
        <Card
          className={
            "relative flex gap-2 overflow-hidden border-0 border-b-2 px-3 py-4 md:flex-row dark:bg-neutral-900/10"
          }
        >
          <div className="absolute font-serif font-thin top-12 right-3 z-1 text-8xl tracking-tighter opacity-20">
            01.
          </div>
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-md sm:w-64 sm:shrink-0">
            <div className="h-full w-full">
              <img
                src="/public/projects/image.png"
                alt="Event cover"
                className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <CardHeader className={"flex w-full flex-col gap-4 p-0 px-3"}>
              <CardTitle className={"flex w-full justify-between text-xl"}>
                <div>Small Card</div>
               
              </CardTitle>
              <CardDescription className={"max-w-xs"}>
                ChefyAI is an AI-powered recipe generator that lets users
                instantly create personalized recipes based on their input.
              </CardDescription>
            </CardHeader>
            <CardContent className={"p-0 px-3"}>
              <div>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 4).map((tech, idx) => {
                    return (
                      <Link
                        to={""}
                        target="_blank"
                        className={`inline-flex items-center self-end rounded-md border border-black/10 bg-black/2 px-2 py-1 text-sm text-black dark:border-white/15 dark:bg-white/5 dark:text-white`}
                      >
                        <p className="ml-1 text-xs">{tech.name}</p>
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
                  true
                    ? "border-green-300 bg-green-500/10"
                    : "border-red-300 bg-red-500/10",
                )}
              >
                {true ? (
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
               <div className="flex items-center gap-2">
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View Website"
                  >
                    <ExternalLink size={12} />
                    Live
                  </Link>
                  <Link
                    to={"#"}
                    className="text-secondary hover:text-primary dark:bg-dark/5 flex items-center gap-1 rounded-md border border-black/10 bg-black/2 px-2 py-1 text-xs transition-colors dark:border-white/15 dark:text-white/70"
                    target="_blank"
                    title="View GitHub"
                  >
                    <GithubIcon size={12} />
                    Github
                  </Link>
                </div>
              <Link
                to={"#"}
                className={cn(
                  "text-secondary hover:text-primary flex items-center gap-2 text-sm underline-offset-4 transition-colors duration-200 ease-[ease] hover:underline",
                )}
              >
                View Details <ArrowRight className="mt-0.5 size-4" />
              </Link>
              
            </CardFooter>
            
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Pccard;

const technologies = [
  {
    name: "JavaScript",
    icon: <Javascript />,
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    icon: <ReactJs />,
    href: "https://reactjs.org/",
  },

  {
    name: "TailwindCSS",
    icon: <TailwindCss />,
    href: "https://tailwindcss.com/",
  },
  {
    name: "Vite",
    icon: <Vite />,
    href: "https://vitejs.dev/",
  },
];
