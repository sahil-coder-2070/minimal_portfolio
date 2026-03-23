import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import matter from "gray-matter";

export function ProjectNavigation({ slug }: { slug?: string }) {
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const projects = import.meta.glob("/src/data/projects/*.md", {
    query: "?raw",
    import: "default",
  });

  useEffect(() => {
    const loadNavigation = async () => {
      const allProjects = [];
      for (const path in projects) {
        const loader = projects[path];
        const text = (await loader()) as string;
        const { data } = matter(text);
        const projectSlug = path.split("/").pop().replace(".md", "");
        allProjects.push({ slug: projectSlug, title: data.title });
      }
      // Sort by slug (assuming alphabetical order)
      allProjects.sort((a, b) => a.slug.localeCompare(b.slug));
      const currentIndex = allProjects.findIndex((p) => p.slug === slug);
      setPrevious(currentIndex > 0 ? allProjects[currentIndex - 1] : null);
      setNext(
        currentIndex < allProjects.length - 1
          ? allProjects[currentIndex + 1]
          : null,
      );
    };

    loadNavigation();
  }, [slug]);

  if (!previous && !next) return null;

  return (
    <div className="space-y-6">
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Previous Project */}
        <div className={`${next ? "" : "md:col-span-2"}`}>
          {previous && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-start p-4 text-left"
            >
              <Link to={`/projects/${previous.slug}`}>
                <div className="flex items-center gap-3">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Previous Project
                    </div>
                    <div className="font-medium">{previous.title}</div>
                  </div>
                </div>
              </Link>
            </Button>
          )}
        </div>

        {/* Next Project */}
        <div className={`${previous ? "" : "md:col-span-2"}`}>
          {next && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end p-4 text-right"
            >
              <Link to={`/projects/${next.slug}`}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Next Project
                    </div>
                    <div className="font-medium text-wrap">{next.title}</div>
                  </div>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
