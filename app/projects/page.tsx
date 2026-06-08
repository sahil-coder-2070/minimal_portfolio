import type { Metadata } from 'next';
import Projects from '@/components/projects/ProjectList';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Projects | My Work',
  description:
    'Explore my React and frontend development projects featuring clean UI, performance-focused design, and real-world use cases.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | My Work',
    description:
      'Explore my React and frontend development projects featuring clean UI, performance-focused design, and real-world use cases.',
    url: '/projects',
  },
};

export default async function ProjectsPage() {
  const { ProjectCardData } = await import('@/config/projects/ProjectCardData');
  const slugs = await getMarkdownSlugs('projects');
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getMarkdownContent('projects', slug);
      const staticData = ProjectCardData.find(
        (p) => p.projectDetailsPageSlug?.endsWith(slug) || p.links?.details?.endsWith(slug)
      );

      return {
        id: slug,
        title: staticData?.title || content?.meta.title || slug,
        subheading: staticData?.subheading || null,
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

  // Sort projects ascendingly by their ID in ProjectCardData so that reverse() in ProjectCard renders newest first
  projects.sort((a, b) => {
    const aData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(a.id) || p.links?.details?.endsWith(a.id)
    );
    const bData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(b.id) || p.links?.details?.endsWith(b.id)
    );
    return (aData?.id ?? 0) - (bData?.id ?? 0);
  });

  return (
    <>
      <Projects projects={projects} />
    </>
  );
}
