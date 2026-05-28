import React from "react";
import Container from "../layouts/Container";
import { Separator } from "../ui/separator";
import BlogCard from "@/app/blog/BlogCard";
import { BlogCardData } from "@/config/blog/BlogCardData";

const Blogs = () => {
  return (
    <Container className={"py-16"}>

      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Blogs
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Thoughts, tutorials, and insights on engineering, and programming.
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold">Latest Posts</h3>
        <span className="text-sm">({BlogCardData.length} posts)</span>
      </div>
      <div>
        <BlogCard />
      </div>
    </Container>
  );
};

export default Blogs;
