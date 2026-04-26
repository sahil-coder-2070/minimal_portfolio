import Container from "@/components/layouts/Container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarSearch } from "lucide-react";

import { motion as Motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { BlogCardData } from "@/config/blog/BlogCardData";
const BlogCard = ({ data = BlogCardData }) => {
  return (
    <Container
      className={`mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2`}
    >
      {data.map((items, index) => {
        return (
          <Motion.div
            key={index}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.2 * index,
            }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <Card className="group h-full w-full overflow-hidden border-gray-100 p-0 shadow-sm dark:border-gray-800">
              <CardHeader className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Link to={`/blogs/${items.slug}`}>
                    <img
                      width={1920}
                      height={1080}
                      src={items.image}
                      alt={items.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <Link to={`/blogs/${items.slug}`}>
                    <h3 className="group-hover:text-primary line-clamp-2 text-xl leading-tight font-semibold">
                      {items.title}
                    </h3>
                  </Link>
                  <p className="text-secondary mt-4 line-clamp-3">
                    {items.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <div className="flex w-full flex-col space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {items.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {items.tags.length > 3 && (
                      <Badge variant="default" className="text-xs">
                        +{items.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <time
                      className="text-secondary flex items-center gap-2 text-sm"
                      dateTime={items.date}
                    >
                      <CalendarSearch className="size-4" />{" "}
                      {items.formattedDate}
                    </time>
                    <Link
                      to={`/blogs/${items.slug}`}
                      className="text-secondary flex items-center justify-end gap-2 underline-offset-4 hover:underline"
                    >
                      Read More <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Motion.div>
        );
      })}
    </Container>
  );
};

export default BlogCard;
