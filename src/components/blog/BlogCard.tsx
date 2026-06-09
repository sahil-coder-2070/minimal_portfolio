import Container from '@/components/layouts/Container';
import Link from 'next/link';
import Image from 'next/image';
import { motion as Motion } from 'motion/react';
import { BlogCardData } from '@/config/blog/BlogCardData';
import { ArrowRight, CalendarSearch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const isNew = (dateStr: string) => {
  const postDate = new Date(dateStr);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30; // Mark as new if published within 30 days
};

const BlogCard = ({ data = BlogCardData }) => {
  return (
    <Container className="mt-">
      <div className="relative py-4">
        {/* Vertical separating lines */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-border border-r"></div>
          <div className="border-border border-l"></div>
        </div>

        {/* Blog list */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((items, index) => {
            const isItemNew = isNew(items.date);
            return (
              <li key={index}>
                <div className="h-full">
                  <div className="relative flex h-full flex-col gap-2 p-2 py-5 md:py-2 transition-[background-color] ease-out hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40">
                    {/* Image container */}
                    <div className="relative select-none [--image-radius:var(--radius-xl)]">
                      <Image
                        alt={items.title}
                        width={1200}
                        height={630}
                        className="object-fit aspect-1200/630 rounded-[var(--image-radius)]"
                        style={{ color: 'transparent' }}
                        src={items.image}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-[var(--image-radius)] inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10"></div>
                    </div>

                    {/* Content */}
                    <div className="flex h-full flex-col justify-between gap-2 p-2">
                      <div className="space-y-2">
                        <h3 className="text-lg leading-snug font-medium text-balance">
                          <Link href={`/blogs/${items.slug}`}>
                            <span className="absolute inset-0" aria-hidden="true"></span>
                            {items.title}
                          </Link>
                          {isItemNew && (
                            <span
                              className="bg-info pointer-events-none ml-2 inline-block size-2 -translate-y-px rounded-full"
                              aria-label="New"
                            ></span>
                          )}
                        </h3>
                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                          {items.description}
                        </p>
                      </div>

                      {/* Footer Details: Tags, Date, & Arrow */}
                      <div className="relative z-10 mt-2 space-y-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {items.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-1.5 py-0.5 text-[10px]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Date & Read More link */}
                        <div className="border-border flex items-center justify-between gap-2 border-t pt-2.5">
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-muted-foreground flex items-center gap-1.5 text-xs">
                              <CalendarSearch className="size-3.5" />
                              <time dateTime={items.date}>
                                {items.formattedDate || (items.date ? formatDate(items.date) : '')}
                              </time>
                            </dd>
                          </dl>
                          <Link href={`/blogs/${items.slug}`}>
                            <div className="text-muted-foreground hover:text-primary flex cursor-pointer items-center gap-1 text-xs font-medium transition-colors duration-200">
                              <span>Read More</span>
                              <ArrowRight className="size-3.5" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

export default BlogCard;
