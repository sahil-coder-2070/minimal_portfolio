import type { Metadata } from "next";
import Image from "next/image";
import { getMarkdownContent, getMarkdownSlugs } from "@/lib/markdown";
import Container from "@/components/layouts/Container";
import { BackButton } from "@/components/common/BackButton";
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

  return (
    <Container className="px-5">
      <BackButton text="Back to Projects" href="/projects" />
      <header className="mb-8 space-y-6 px-5">
        {projectMeta.image && (
          <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-muted">
            <Image
              src={projectMeta.image}
              alt={projectMeta.title || slug}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-4 ">
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

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {projectMeta.title}
          </h1>

          <p className="text-muted-foreground text-xl ">{projectMeta.description}</p>

          {/* Project Meta Information Grid */}
          <div className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4 " >
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
          <div className="flex flex-wrap gap-3 ">
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
        </div>

        <Separator />
      </header>

      <div className="mb-8 px-5">
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
        <div className="mb-8 grid gap-6 md:grid-cols-2 px-5">
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
      <div className="prose dark:prose-invert max-w-none px-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={ProjectComponents as any}
        >
          {content}
        </ReactMarkdown>
      </div>

      <ProjectNavigation slug={slug} />
    </Container>
  );
}
