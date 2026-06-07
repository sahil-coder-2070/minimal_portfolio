import { MetadataRoute } from 'next';
import { getMarkdownSlugs } from '@/lib/markdown';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

  // 1. Static URLs
  const staticRoutes = ['', '/blogs', '/projects', '/bookmarks', '/contact', '/gear', '/resume', '/work'];
  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Blog URLs
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogSlugs = await getMarkdownSlugs('blog');
    blogUrls = blogSlugs.map((slug) => ({
      url: `${siteUrl}/blogs/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
  }

  // 3. Dynamic Project URLs
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const projectSlugs = await getMarkdownSlugs('projects');
    projectUrls = projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching project slugs for sitemap:', error);
  }

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
