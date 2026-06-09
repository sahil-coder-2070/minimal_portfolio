import type { Metadata } from 'next';
import { getMarkdownContent, getMarkdownSlugs } from '@/lib/markdown';
import Link from 'next/link';
import { ArrowLeft, CalendarRange } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { BlogComponents } from '@/components/blog/BlogComponent';
import { BlogNavigation } from '@/components/common/BlogNavigation';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/github-dark.css';
import { formatDate } from '@/lib/utils';
import { BlogCardData } from '@/config/blog/BlogCardData';
import { ProjectHeaderActions } from '@/components/projects/ProjectHeaderActions';
import RepeatSeparator from '@/components/ui/repeat-separator';
import { ZoomableImage } from '@/components/projects/ZoomableImage';

// 1. Generate metadata for search engine optimization dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug);
  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.image ? [post.meta.image] : [],
      url: `/blogs/${slug}`,
    },
  };
}

// 2. Pre-generate all static paths for instant, server-rendered page loading
export async function generateStaticParams() {
  const slugs = await getMarkdownSlugs('blog');
  return slugs.map((slug) => ({
    slug,
  }));
}

// 3. Render the Blog Server Component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getMarkdownContent('blog', slug);

  if (!post) {
    notFound();
  }

  const { meta, content } = post;

  // Clean content by removing the first H1 heading and first paragraph to avoid duplication
  let cleanContent = content;
  const lines = content.split('\n');
  const headingIndex = lines.findIndex((line) => line.trim().startsWith('# '));
  if (headingIndex !== -1) {
    // Remove the heading
    lines.splice(headingIndex, 1);
    // Remove trailing empty lines and the first paragraph
    while (headingIndex < lines.length) {
      if (lines[headingIndex].trim() === '') {
        lines.splice(headingIndex, 1);
      } else {
        lines.splice(headingIndex, 1); // remove the paragraph
        break;
      }
    }
  }

  // Also remove any leading dividers (---) and empty lines at the start of the remaining content
  while (lines.length > 0 && (lines[0].trim() === '---' || lines[0].trim() === '')) {
    lines.shift();
  }
  cleanContent = lines.join('\n').trim();

  // Map blogs to extract their slugs, sorted just like in BlogNavigation (date descending)
  const allBlogs = [...BlogCardData].sort((a, b) => b.date.localeCompare(a.date));
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const previousBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return (
    <div className="w-full border-none">
      <RepeatSeparator cn="h-8 opacity-50" />
      <div data-doc-cols-ready="">
        {/* 1. Document Header Container */}
        <div data-slot="doc-container" className="mx-auto w-full md:max-w-3xl">
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Link
              href="/blogs"
              className="group/button text-muted-foreground hover:text-foreground inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-2 border-none px-0 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:no-underline"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover/button:-translate-x-1" />
              Blogs
            </Link>
            <ProjectHeaderActions
              previousSlug={previousBlog?.slug || null}
              nextSlug={nextBlog?.slug || null}
              projectTitle={meta.title || 'Check out this blog post'}
              basePath="blogs"
            />
          </div>

          <RepeatSeparator cn="h-8" />
          <div className="screen-line-top screen-line-bottom py-px">
            <div className="mx-auto h-4 md:max-w-3xl" />
          </div>
          <div className="screen-line-bottom">
            <h1
              data-slot="doc-title"
              className="px-4 text-3xl font-semibold tracking-tight text-balance md:max-w-md"
            >
              {meta.title}
            </h1>
          </div>
        </div>

        {/* 2. Document Grid with Columns */}
        <div
          data-slot="doc-grid"
          className="mx-auto grid w-full grid-cols-1 lg:grid-cols-[1fr_var(--container-3xl)_1fr]"
        >
          <aside data-slot="doc-left-col" className="max-lg:hidden" />

          <div data-slot="doc-content-col" className="mx-auto w-full md:max-w-3xl">
            <div data-slot="prose" className="prose dark:prose-invert w-full px-5 pt-6">
              {/* Description */}
              <p className="text-muted-foreground  mb-6 text-base leading-relaxed font-normal text-wrap sm:text-base">
                {meta.description}
              </p>

              {/* Featured Image */}
              {meta.image && <ZoomableImage src={meta.image} alt={meta.title || slug} priority />}

              {/* Meta tags and date */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex flex-wrap gap-1.5">
                  {meta.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <CalendarRange className="size-4" />
                  <time dateTime={meta.date}>
                    {meta.formattedDate || (meta.date ? formatDate(meta.date) : '')}
                  </time>
                </div>
              </div>

              {/* Markdown Content */}
              <div className="mt-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={BlogComponents as any}
                >
                  {cleanContent}
                </ReactMarkdown>
              </div>

              <div className="not-prose mt-8 mb-4">
                <BlogNavigation slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
