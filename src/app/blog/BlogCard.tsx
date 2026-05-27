import Container from "@/components/layouts/Container";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { BlogCardData } from "@/config/blog/BlogCardData";
import { ArrowRight, CalendarSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const isNew = (dateStr: string) => {
  const postDate = new Date(dateStr);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 30; // Mark as new if published within 30 days
};

const BlogCard = ({ data = BlogCardData }) => {
  return (
    <Container className="mt-8">
      <div className="relative py-4">
        {/* Vertical separating lines */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line"></div>
          <div className="border-l border-line"></div>
        </div>

        {/* Blog list */}
        <ul className="blog-grid">
          {data.map((items, index) => {
            const isItemNew = isNew(items.date);
            return (
              <li key={index}>
                <Motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    delay: 0.1 * index,
                  }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="relative flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted">
                    {/* Image container */}
                    <div className="relative select-none [--image-radius:var(--radius-xl)]">
                      <img
                        alt={items.title}
                        loading="lazy"
                        width={1200}
                        height={630}
                        decoding="async"
                        className="aspect-1200/630 rounded-[var(--image-radius)] object-cover"
                        style={{ color: "transparent" }}
                        src={items.image}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-[var(--image-radius)] inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10"></div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 p-2 h-full justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg leading-snug font-medium text-balance">
                          <Link to={`/blogs/${items.slug}`}>
                            <span className="absolute inset-0" aria-hidden="true"></span>
                            {items.title}
                          </Link>
                          {isItemNew && (
                            <span
                              className="pointer-events-none ml-2 inline-block size-2 -translate-y-px rounded-full bg-info"
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
                      <div className="mt-2 space-y-3 z-10 relative">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {items.tags.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Date & Read More link */}
                        <div className="flex items-center justify-between gap-2 border-t border-border pt-2.5">
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <CalendarSearch className="size-3.5" />
                              <time dateTime={items.date}>{items.formattedDate}</time>
                            </dd>
                          </dl>
                          <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors duration-200">
                            <span>Read More</span>
                            <ArrowRight className="size-3.5" />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </Motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

export default BlogCard;
