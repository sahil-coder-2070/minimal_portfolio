import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { ProjectCardData } from "@/config/projects/ProjectCardData";

export function ProjectNavigation({ slug }: { slug?: string }) {
  // Map projects to extract their slugs from details link, sorted by id descending (newest first)
  const allProjects = [...ProjectCardData]
    .sort((a, b) => b.id - a.id)
    .map((p) => ({
      slug: p.projectDetailsPageSlug?.split('/').pop() || p.links.details.split("/").pop() || "",
      title: p.title,
    }));

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  if (!previous && !next) return null;

  return (
    <div className="space-y-6 px-5 pb-4">
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Previous project */}
        <div className={`${next ? "" : "md:col-span-2"}`}>
          {previous && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-start p-4 text-left"
            >
              <Link href={`/projects/${previous.slug}`}>
                <div className="flex items-center gap-3">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Previous project
                    </div>
                    <div className="font-medium text-wrap">
                      {previous.title}
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          )}
        </div>

        {/* Next project */}
        <div className={`${previous ? "" : "md:col-span-2"}`}>
          {next && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end p-4 text-right"
            >
              <Link href={`/projects/${next.slug}`}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Next project
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
