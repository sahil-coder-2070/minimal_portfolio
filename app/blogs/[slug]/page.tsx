import type { Metadata } from "next";
import Image from "next/image";
import { getMarkdownContent, getMarkdownSlugs } from "@/lib/markdown";
import Container from "@/components/layouts/Container";
import { BackButton } from "@/components/common/BackButton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarRange } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { BlogComponents } from "@/components/blog/BlogComponent";
import { BlogNavigation } from "@/components/common/BlogNavigation";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";

// 1. Generate metadata for search engine optimization dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMarkdownContent("blog", slug);
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.image ? [post.meta.image] : [],
    },
  };
}

// 2. Pre-generate all static paths for instant, server-rendered page loading
export async function generateStaticParams() {
  const slugs = await getMarkdownSlugs("blog");
  return slugs.map((slug) => ({
    slug,
  }));
}

// 3. Render the Blog Server Component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getMarkdownContent("blog", slug);

  if (!post) {
    notFound();
  }

  const { meta, content } = post;

  return (
    <Container>
      <BackButton text="Back to Blog" />
      <article className="mx-auto max-w-4xl px-5">
        <header className="mb-8 space-y-6">
          {meta.image && (
            <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-muted">
              <Image
                src={meta.image}
                alt={meta.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {meta.tags?.map((tag: string) => (
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

        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={BlogComponents}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
      <BlogNavigation slug={slug} />
    </Container>
  );
}
