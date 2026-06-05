'use client';

import React from 'react';
import Container from '@/components/layouts/Container';
import { Separator } from '@/components/ui/separator';
import ProjectCard from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '../common/SectionHeading';
import RepeatSeparator from '../ui/repeat-separator';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  img: {
    src: string;
    alt: string;
  };
  links: {
    website: string;
    github: string;
    details: string;
  };
  technologies: Array<{ name: string }>;
  isWorking: boolean;
  isBuilding: boolean;
  isBulding?: boolean; // Support historical typo safely
  details: boolean;
}

const Projects = ({ projects = [] }: { projects?: ProjectItem[] }) => {
  const filteredProjects = projects;

  return (
    <>
      <RepeatSeparator />
      <Container className="mt-2">
        <div className="space-y-8">
          <div>
            <SectionHeading
              classname=" text-neutral-400 dark:text-neutral-500 font-medium "
              heading="Projects"
            />
            <h2 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
              Showcase of my work
            </h2>
          </div>
        </div>
        <RepeatSeparator />
        <ProjectCard completed={filteredProjects} />
      </Container>
    </>
  );
};

export default Projects;
