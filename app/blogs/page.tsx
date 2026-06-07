import type { Metadata } from 'next';
import Blogs from '@/components/blog/BlogList';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog - Thoughts and Tutorials',
  description:
    'Read articles on React, JavaScript, frontend development, best practices, performance optimization, and modern web technologies.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Blog - Thoughts and Tutorials',
    description:
      'Read articles on React, JavaScript, frontend development, best practices, performance optimization, and modern web technologies.',
    url: '/blogs',
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
