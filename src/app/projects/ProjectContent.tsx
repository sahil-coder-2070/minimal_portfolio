import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import matter from "gray-matter";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import Container from "@/components/layouts/Container";
import { ProjectComponents } from "./ProjectComponents";
import { Badge } from "@/components/ui/badge";
import Website from "@/components/icons/social/Website";
import Github from "@/components/icons/social/Github";
import { Separator } from "@/components/ui/separator";
import { ProjectNavigation } from "@/components/common/ProjectNavigation";
import { BackButton } from "@/components/common/BackButton";

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

const ProjectContent = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<ProjectMeta>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projects = import.meta.glob("/src/data/projects/*.md", {
    query: "?raw",
    import: "default",
  });

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const loader = projects[`/src/data/projects/${slug}.md`];

        if (!loader) throw new Error("Project not found");

        const text = (await loader()) as string;
        const { data, content } = matter(text);

        setMeta(data);
        setContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <p>Loading blog...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className={"flex min-h-screen items-start justify-center py-20"}
      >
        <p className="text-lg font-medium">404 | Blog not found</p>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton text={"Back to Project"} />
      <header className="mb-8 space-y-6">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img src={meta.image} alt={meta.title} className="object-cover" />
        </div>

        <div className="space-y-4">
          {/* Project Status and Technologies */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={meta.statusVariant} className="text-sm">
              {meta.status.charAt(0).toUpperCase() + meta.status.slice(1)}
            </Badge>
            {meta.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {meta.technologies.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{meta.technologies.length - 3} more
              </Badge>
            )}
          </div>

          <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
            {meta.title}
          </h1>

          <p className="text-muted-foreground text-xl">{meta.description}</p>

          {/* Project Meta Information */}
          <div className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Timeline
              </h5>
              <p className="text-sm">{meta.timeline}</p>
            </div>
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Role
              </h5>
              <p className="text-sm">{meta.role}</p>
            </div>
            {meta.team && (
              <div>
                <h5 className="text-muted-foreground text-sm font-semibold">
                  Team
                </h5>
                <p className="text-sm">{meta.team}</p>
              </div>
            )}
            <div>
              <h5 className="text-muted-foreground text-sm font-semibold">
                Status
              </h5>
              <Badge variant={meta.statusVariant} className="text-xs">
                {meta.status.charAt(0).toUpperCase() + meta.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {meta.live && (
              <a
                href={meta.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inset-shadow bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all disabled:pointer-events-none disabled:opacity-50"
              >
                <Website className="size-4" />
                Live Demo
              </a>
            )}
            {meta.github && (
              <a
                href={meta.github}
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
      <div className="mb-8">
        <div className="bg-muted/20 rounded-lg border p-4">
          <h3 className="mb-3 text-lg font-semibold">Technology Stack</h3>
          <div className="flex flex-wrap gap-2">
            {meta.technologies.map((tech) => (
              <div
                key={tech}
                className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
              >
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Challenges and Learnings */}
      {(meta.challenges?.length || meta.learnings?.length) && (
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {meta.challenges && meta.challenges.length > 0 && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                Key Challenges
              </h3>
              <ul className="space-y-2">
                {meta.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
                  >
                    <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meta.learnings && meta.learnings.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
              <h3 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {meta.learnings.map((learning, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
                  >
                    <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={ProjectComponents}
      >
        {content}
      </ReactMarkdown>
      <ProjectNavigation slug={slug} />
    </Container>
  );
};

export default ProjectContent;
