import SectionHeading from '@/components/common/SectionHeading';
import Container from '@/components/layouts/Container';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import RepeatSeparator from '@/components/ui/repeat-separator';
import { MoveRight } from 'lucide-react';

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
  details: boolean;
}

const Project = ({ projects = [] }: { projects?: ProjectItem[] }) => {
  return (
    <Container>
      <RepeatSeparator />
      <SectionHeading heading={'Projects'} />
      <ProjectCard completed={projects} limit={4} />
      <div className="before:bg-border after:bg-border relative m-auto mt-1 flex w-full max-w-screen items-center justify-center gap-2 overflow-visible px-4 py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
        <Link href="/projects">
          <Button variant="default" size="sm" className='cursor-pointer'>
            Show all Projects <MoveRight />
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Project;
