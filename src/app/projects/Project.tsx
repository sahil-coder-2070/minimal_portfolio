import SectionHeading from '@/components/common/SectionHeading';
import Container from '@/components/layouts/Container';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';
import RepeatSeparator from '@/components/ui/repeat-separator';

const Project = () => {
  return (
    <Container>
      <RepeatSeparator />
      <SectionHeading heading={'Projects'} />
      <ProjectCard limit={4} />
      <div className="mt-8 flex w-full items-center justify-center">
        <Link to="/projects">
          <Button variant="outline">Show all Projects</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Project;
