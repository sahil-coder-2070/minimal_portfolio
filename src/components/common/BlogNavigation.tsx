import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from "react";
import matter from "gray-matter";

export function BlogNavigation({ slug }: { slug?: string }) {
  interface BlogItem {
    slug: string;
    title: string;
  }

  const [previous, setPrevious] = useState<BlogItem | null>(null);
  const [next, setNext] = useState<BlogItem | null>(null);
  const blog = import.meta.glob("/src/data/blog/*.md", {
    query: "?raw",
    import: "default",
  });

  useEffect(() => {
    const loadNavigation = async () => {
      const allblog: BlogItem[] = [];
      for (const path in blog) {
        const loader = blog[path];
        const text = (await loader()) as string;
        const { data } = matter(text);
        const bloglug = path.split("/").pop()?.replace(".md", "") || "";
        allblog.push({ slug: bloglug, title: data.title });
      }
      // Sort by slug (assuming alphabetical order)
      allblog.sort((a, b) => a.slug.localeCompare(b.slug));
      const currentIndex = allblog.findIndex((p) => p.slug === slug);
      setPrevious(currentIndex > 0 ? allblog[currentIndex - 1] : null);
      setNext(
        currentIndex < allblog.length - 1 ? allblog[currentIndex + 1] : null,
      );
    };

    loadNavigation();
  }, [slug]);

  if (!previous && !next) return null;

  return (
    <div className="space-y-6">
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Previous blog */}
        <div className={`${next ? "" : "md:col-span-2"}`}>
          {previous && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-start p-4 text-left"
            >
              <Link href={`/blogs/${previous.slug}`}>
                <div className="flex items-center gap-3">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Previous blog
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

        {/* Next blog */}
        <div className={`${previous ? "" : "md:col-span-2"}`}>
          {next && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end p-4 text-right"
            >
              <Link href={`/blogs/${next.slug}`}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">
                      Next blog
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
