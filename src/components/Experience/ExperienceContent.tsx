import Container from "@/components/layouts/Container";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Website from "@/components/icons/social/Website";
import LinkedIn from "@/components/icons/social/LinkedIn";
import Skill from "@/components/common/Skills";
import { motion as Motion } from "motion/react";
import ExperienceCardData from "@/components/data/ExperienceCardData";

const ExperienceContent = () => {
  return (
    <Container>
      {ExperienceCardData.map((items) => {
        return (
          <Motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
            key={items.company}
          >
            <div className="mt-4 flex items-center gap-5">
              <div>
                <img
                  src={items.image}
                  alt="company logo"
                  className="w-12 rounded-md"
                />
              </div>
              <div className="flex w-full flex-col justify-between md:flex-row">
                <div className="flex flex-col">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold blur-none">
                        {items.company}
                      </h3>
                      {items.x && (
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link
                              to={items.x}
                              className="text-secondary flex items-center gap-2"
                            >
                              <span className="size-5">
                                <Website />
                              </span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Visit Website</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {items.linkedin && (
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link
                              to={items.linkedin}
                              className="text-secondary flex items-center gap-2"
                            >
                              <span className="size-5">
                                <LinkedIn />
                              </span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>LinkedIn</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {items.position}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground flex flex-col md:text-right">
                  <p>
                    {items.startDate} - {items.endDate}
                  </p>
                  <p>{items.location} </p>
                </div>
              </div>
            </div>

            <div className="text-muted-foreground flex flex-col">
              {items.description.map((description) => (
                <p
                  key={description}
                  dangerouslySetInnerHTML={{
                    __html: `• ${description}`,
                  }}
                />
              ))}
            </div>
            <div>
              <h4 className="text-md mt-4 mb-2 font-semibold">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {items.technologies.map((technology, index) => (
                  <Skill
                    key={index}
                    name={technology.name}
                    href={technology.href}
                  >
                    {technology.icon}
                  </Skill>
                ))}
              </div>
            </div>
          </Motion.div>
        );
      })}
    </Container>
  );
};

export default ExperienceContent;
