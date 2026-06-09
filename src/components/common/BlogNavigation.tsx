import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { BlogCardData } from '@/config/blog/BlogCardData';

export function BlogNavigation({ slug }: { slug?: string }) {
  // Use the statically declared BlogCardData list
  const allBlogs = [...BlogCardData].sort((a, b) => b.date.localeCompare(a.date));

  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const previous = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  if (!previous && !next) return null;

  return (
    <div className="space-y-6 px-5 pb-4">
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {/* Previous blog */}
        <div className={`${next ? '' : 'md:col-span-2'}`}>
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
                    <div className="text-muted-foreground text-xs">Previous blog</div>
                    <div className="font-medium text-wrap">{previous.title}</div>
                  </div>
                </div>
              </Link>
            </Button>
          )}
        </div>

        {/* Next blog */}
        <div className={`${previous ? '' : 'md:col-span-2'}`}>
          {next && (
            <Button
              variant="outline"
              asChild
              className="group h-auto w-full justify-end p-4 text-right"
            >
              <Link href={`/blogs/${next.slug}`}>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-muted-foreground text-xs">Next blog</div>
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
