import Container from "@/components/layouts/Container";
import ExperienceCardData from "./ExperienceCardData";
import { ExperienceItem } from "./ExperienceItem";

const ExperienceContent = () => {
  return (
    <Container className="max-w-2xl md:px-4 py-4">
      <div className="space-y-6">
        {ExperienceCardData.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Container>
  );
};

export default ExperienceContent;
