import Github from "@/components/icons/social/Github";
import LinkedIn from "@/components/icons/social/LinkedIn";
import Mail from "@/components/icons/social/Mail";
import X from "@/components/icons/social/X.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion as Motion } from "motion/react";

import Link from 'next/link';

const SocialLinks = () => {
  return (
    <Motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="mt-8 flex  gap-2"
    >
      {socialLinks.map((link) => (
        <Tooltip key={link.name} delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              href={link.href}
              key={link.name}
              className="text-secondary flex items-center gap-2"
            >
              <span className="size-6">{link.icon}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{link.name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </Motion.div>
  );
};

export default SocialLinks;

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/sahilcodex",
    icon: <X />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/sahil-singh-tech/",
    icon: <LinkedIn />,
  },
  {
    name: "Github",
    href: "https://github.com/sahilcodexx",
    icon: <Github />,
  },
  {
    name: "Email",
    href: "mailto:sahil207003@gmail.com",
    icon: <Mail />,
  },
];
