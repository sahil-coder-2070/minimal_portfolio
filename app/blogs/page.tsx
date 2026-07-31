import type { Metadata } from 'next';
import Blogs from '@/components/blog/BlogList';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

export const metadata: Metadata = {
  title: 'Blog — Web Development, React & Next.js Tutorials',
  description:
    'Technical articles, tutorials, and insights on React, Next.js, JavaScript, performance optimization, and frontend architecture by Sahil Singh.',
  alternates: {
    canonical: `${siteUrl}/blogs`,
  },
  openGraph: {
    title: 'Blog — Web Development, React & Next.js Tutorials',
    description:
      'Technical articles, tutorials, and insights on React, Next.js, JavaScript, performance optimization, and frontend architecture by Sahil Singh.',
    url: `${siteUrl}/blogs`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Sahil Singh | Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Web Development, React & Next.js Tutorials',
    description:
      'Technical articles, tutorials, and insights on React, Next.js, JavaScript, performance optimization, and frontend architecture by Sahil Singh.',
    images: [`${siteUrl}/og-image.webp`],
    creator: '@sahilcodex',
  },
};

export default async function BlogsPage() {
  const slugs = await getMarkdownSlugs('blog');
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getMarkdownContent('blog', slug);
      return {
        slug,
        title: content?.meta.title || slug,
        description: content?.meta.description || '',
        image: content?.meta.image || '',
        tags: content?.meta.tags || [],
        date: content?.meta.date || '',
        formattedDate:
          content?.meta.formattedDate || (content?.meta.date ? formatDate(content.meta.date) : ''),
      };
    })
  );

  // Sort posts by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return <Blogs posts={posts} />;
}
