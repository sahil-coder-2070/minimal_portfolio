import type { Metadata } from 'next';
import Projects from '@/components/projects/ProjectList';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Projects | My Work',
  description:
    'Explore my React and frontend development projects featuring clean UI, performance-focused design, and real-world use cases.',
};

export default async function ProjectsPage() {
  const slugs = await getMarkdownSlugs('projects');
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getMarkdownContent('projects', slug);
      return {
        id: slug,
        title: content?.meta.title || slug,
        description: content?.meta.description || '',
        img: {
          src: content?.meta.image || '',
          alt: content?.meta.title || slug,
        },
        links: {
          website: content?.meta.live || '',
          github: content?.meta.github || '',
          details: `/projects/${slug}`,
        },
        technologies: (content?.meta.technologies || []).map((name: string) => ({ name })),
        isWorking: content?.meta.status?.toLowerCase() === 'completed',
        isBuilding: content?.meta.status?.toLowerCase() === 'in-progress',
        details: true,
      };
    })
  );

  return <Projects projects={projects} />;
}
