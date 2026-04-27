import Bun from "@/components/icons/tech/Bun";
import MongoDb from "@/components/icons/tech/MongoDB";
import NodeJs from "@/components/icons/tech/NodeJS";
import ReactJs from "@/components/icons/tech/ReactIcon";
import { motion as Motion } from "motion/react";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { TypeScript } from "@/lib/techIcons";

const BioText = () => {
  return (
    <Motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-base whitespace-pre-wrap text-neutral-500 md:text-lg"
    >
      <span className="whitespace-pre-wrap">
        I design and develop interactive web experiences. Using
      </span>
      <SkillTag skill={Skills[4]} />
      <span className="whitespace-pre-wrap">, </span>
      <SkillTag skill={Skills[0]} />
      <span className="whitespace-pre-wrap">, </span>
      <SkillTag skill={Skills[1]} />
      <span className="whitespace-pre-wrap">, </span>
      <SkillTag skill={Skills[2]} />
      <span className="whitespace-pre-wrap"> and </span>
      <SkillTag skill={Skills[3]} />
      <span className="whitespace-pre-wrap">with careful attention to</span>
      <b className="text-primary dark:text-primary whitespace-pre-wrap">
        interface
      </b>
      <span className="whitespace-pre-wrap"> and</span>
      <b className="text-primary dark:text-primary whitespace-pre-wrap">
        Motion.
      </b>
    </Motion.div>
  );
};

export default BioText;

const Skills = [
  {
    name: "React",
    element: <ReactJs />,
    link: "https://react.dev",
  },
  {
    name: "Node.js",
    element: <NodeJs />,
    link: "https://nodejs.org",
  },
  {
    name: "Bun",
    element: <Bun />,
    link: "https://bun.sh",
  },
  {
    name: "MongoDB",
    element: <MongoDb />,
    link: "https://www.mongodb.com",
  },
  {
    name: "TypeScript",
    element: <TypeScript />,
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
];

const SkillTag = ({
  skill,
}: {
  skill?: { name: string; element: React.ReactNode; link: string };
}) => {
  if (!skill) return null;

  return (
    <span>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-end text-black dark:text-white/90"
          >
            <p className="ml-1 font-bold md:text-lg">{skill.name}</p>
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <span className="flex">
            <div className="size-4 shrink-0">{skill.element}</div>
            <p className="ml-1 text-xs font-bold">{skill.name}</p>
          </span>
        </TooltipContent>
      </Tooltip>
    </span>
  );
};
