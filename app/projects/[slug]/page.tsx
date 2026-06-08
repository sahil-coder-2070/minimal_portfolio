import type { Metadata } from "next";
import Image from "next/image";
import { getMarkdownContent, getMarkdownSlugs } from "@/lib/markdown";
import Container from "@/components/layouts/Container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ProjectComponents } from "@/components/projects/ProjectComponents";
import { ProjectNavigation } from "@/components/common/ProjectNavigation";
import { notFound } from "next/navigation";
import Website from "@/components/icons/social/Website";
import Github from "@/components/icons/social/Github";
import "highlight.js/styles/github-dark.css";
import { ProjectCardData } from "@/config/projects/ProjectCardData";
import { ProjectHeaderActions } from "@/components/projects/ProjectHeaderActions";

interface ProjectMeta {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  status?: "completed" | "in-progress" | "planning";
  statusVariant?: "default" | "secondary" | "destructive" | "outline";
  timeline?: string;
  role?: string;
  team?: string;
  live?: string;
  github?: string;
  challenges?: string[];
  learnings?: string[];
}

// 1. Generate Metadata dynamically for SEO on the server
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMarkdownContent("projects", slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.meta.title} | Projects`,
    description: project.meta.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.meta.title,
      description: project.meta.description,
      images: project.meta.image ? [project.meta.image] : [],
      url: `/projects/${slug}`,
    },
  };
}

// 2. Pre-generate all static slugs at build time
export async function generateStaticParams() {
  const slugs = await getMarkdownSlugs("projects");
  return slugs.map((slug) => ({
    slug,
  }));
}

// 3. Render the Project Server Component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getMarkdownContent("projects", slug);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;
  const projectMeta = meta as ProjectMeta;

  // Map projects to extract their slugs from details link, sorted by id descending to match UI list order
  const allProjects = [...ProjectCardData]
    .sort((a, b) => b.id - a.id)
    .map((p) => ({
      slug: p.projectDetailsPageSlug?.split("/").pop() || p.links.details.split("/").pop() || "",
    }));
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="w-full bg-background">
      {/* Border space above the button div */}
      <div className="mx-auto h-12 border-x border-line md:max-w-3xl" />

      <div data-doc-cols-ready="">
        {/* 1. Document Header Container */}
        <div data-slot="doc-container" className="mx-auto w-full border-x border-line md:max-w-3xl">
          <div className="screen-line-bottom h-px" />
          
          <div className="flex items-center justify-between p-2 pl-4">
            <Link
              href="/projects"
              className="group/button inline-flex shrink-0 items-center justify-center text-sm font-medium whitespace-nowrap transition-all outline-none select-none text-muted-foreground hover:text-foreground hover:no-underline border-none px-0 h-7 gap-2 cursor-pointer"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover/button:-translate-x-1" />
              Projects
            </Link>
            <ProjectHeaderActions
              previousSlug={previousProject?.slug || null}
              nextSlug={nextProject?.slug || null}
              projectTitle={projectMeta.title || "Check out this project"}
            />
          </div>

        <div className="screen-line-top screen-line-bottom py-px">
          <div className="h-4" />
        </div>

        <div className="space-y-4 px-4 py-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={projectMeta.statusVariant} className="text-sm">
              {projectMeta.status
                ? projectMeta.status.charAt(0).toUpperCase() +
                  projectMeta.status.slice(1)
                : "Unknown"}
            </Badge>
            {projectMeta.technologies &&
              projectMeta.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            {projectMeta.technologies && projectMeta.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{projectMeta.technologies.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <h1 data-slot="doc-title" className="screen-line-bottom px-4 pb-4 text-3xl font-semibold tracking-tight text-balance leading-tight lg:text-4xl">
          {projectMeta.title}
        </h1>
      </div>

      {/* 2. Document Grid with Columns */}
      <div data-slot="doc-grid" className="mx-auto grid w-full grid-cols-1 lg:grid-cols-[1fr_var(--container-3xl)_1fr]">
        <aside data-slot="doc-left-col" className="max-lg:hidden" />
        
        <div data-slot="doc-content-col" className="mx-auto w-full border-x border-line md:max-w-3xl">
          <div data-slot="prose" className="prose dark:prose-invert max-w-none px-4 pt-8">
            
            {/* Project description (subheading) */}
            <p className="text-muted-foreground text-lg sm:text-xl font-normal leading-relaxed text-balance mb-6">
              {projectMeta.description}
            </p>

            {/* Featured Image */}
            {projectMeta.image && (
              <figure className="relative aspect-video overflow-hidden rounded-xl border border-line bg-muted shadow-sm transition-all duration-300 mb-8">
                <Image
                  src={projectMeta.image}
                  alt={projectMeta.title || slug}
                  fill
                  priority
                  className="object-cover"
                />
              </figure>
            )}

            {/* Project Meta Information Grid */}
            <div className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4 not-prose mb-8" >
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Timeline
                </h5>
                <p className="text-sm">{projectMeta.timeline}</p>
              </div>
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Role
                </h5>
                <p className="text-sm">{projectMeta.role}</p>
              </div>
              {projectMeta.team && (
                <div>
                  <h5 className="text-muted-foreground text-sm font-semibold">
                    Team
                  </h5>
                  <p className="text-sm">{projectMeta.team}</p>
                </div>
              )}
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Status
                </h5>
                <Badge variant={projectMeta.statusVariant} className="text-xs mt-1">
                  {projectMeta.status
                    ? projectMeta.status.charAt(0).toUpperCase() +
                      projectMeta.status.slice(1)
                    : "Unknown"}
                </Badge>
              </div>
            </div>

            {/* Links and Action Buttons */}
            <div className="flex flex-wrap gap-3 not-prose mb-8">
              {projectMeta.live && (
                <a
                  href={projectMeta.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inset-shadow bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all disabled:pointer-events-none disabled:opacity-50"
                >
                  <Website className="size-4" />
                  Live Demo
                </a>
              )}
              {projectMeta.github && (
                <a
                  href={projectMeta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inset-shadow bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all disabled:pointer-events-none disabled:opacity-50"
                >
                  <Github className="size-4" />
                  Source Code
                </a>
              )}
            </div>

            <div className="not-prose mb-8">
              <div className="bg-muted/20 rounded-lg border p-4">
                <h3 className="mb-3 text-lg font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {projectMeta.technologies &&
                    projectMeta.technologies.map((tech) => (
                      <div
                        key={tech}
                        className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium border border-line"
                      >
                        <span>{tech}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Challenges & Learnings */}
            {(projectMeta.challenges?.length || projectMeta.learnings?.length) && (
              <div className="mb-8 grid gap-6 md:grid-cols-2 not-prose">
                {projectMeta.challenges && projectMeta.challenges.length > 0 && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50/20 p-4 dark:border-yellow-800/40 dark:bg-yellow-950/10">
                    <h3 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                      Key Challenges
                    </h3>
                    <ul className="space-y-2">
                      {projectMeta.challenges.map((challenge, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
                        >
                          <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {projectMeta.learnings && projectMeta.learnings.length > 0 && (
                  <div className="rounded-lg border border-green-200 bg-green-50/20 p-4 dark:border-green-800/40 dark:bg-green-950/10">
                    <h3 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
                      Key Learnings
                    </h3>
                    <ul className="space-y-2">
                      {projectMeta.learnings.map((learning, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
                        >
                          <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-green-500 dark:bg-green-400" />
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Markdown Body Content */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={ProjectComponents as any}
            >
              {content}
            </ReactMarkdown>

            <div className="not-prose mt-8 mb-4">
              <ProjectNavigation slug={slug} />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);
}
