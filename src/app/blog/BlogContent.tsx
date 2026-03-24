import React, { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Buffer } from "buffer";
import Container from "@/components/layouts/Container";
import { Badge } from "@/components/ui/badge";
import { BlogComponents } from "./BlogComponent";
import { useParams } from "react-router-dom";
import { CalendarRange } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/common/BackButton";
import { BlogNavigation } from "@/components/common/BlogNavigation";
window.Buffer = Buffer;

interface BlogMeta {
  title?: string;
  description?: string;
  date?: string;
  formattedDate?: string;
  image?: string;
  tags?: string[];
}

const BlogContent = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState<BlogMeta>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projects = import.meta.glob("/src/data/blog/*.md", {
    query: "?raw",
    import: "default",
  });
  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);

        const loader = projects[`/src/data/blog/${slug}.md`];

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
      <Container>
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton text={"Back to Blog"} />
      <article className="mx-auto max-w-4xl">
        <header className="mb-8 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <img src={meta.image} alt={meta.title} className="object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {meta.tags?.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
              {meta.title}
            </h1>

            <p className="text-muted-foreground text-xl">{meta.description}</p>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <CalendarRange className="size-6" />
              <time dateTime={meta.date}>{meta.date}</time>
            </div>
          </div>

          <Separator />
        </header>

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={BlogComponents}
        >
          {content}
        </ReactMarkdown>
      </article>
      <BlogNavigation slug={slug} />
    </Container>
  );
};

export default BlogContent;
