import Container from '@/components/layouts/Container';
import SectionHeading from '@/components/common/SectionHeading';

import ExperienceContent from './ExperienceContent';
import RepeatSeparator from '../ui/repeat-separator';

const ExperienceCard = () => {
  return (
    <Container className={''}>
      <RepeatSeparator />
      <SectionHeading heading='Experience' classname='pb-2' />
      <ExperienceContent />
    </Container>
  );
};

export default ExperienceCard;
