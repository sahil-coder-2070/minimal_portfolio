import React from "react";
import Container from "../layouts/Container";
import Github from "@/svgs/Github";
import LinkedIn from "@/svgs/LinkedIn";
import Mail from "@/svgs/Mail";
import X from "@/svgs/X.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Link } from "react-router-dom";

const SocialLinks = () => {
  return (
    <Container className={`pl-0`}>
      <div className="mt-8 flex gap-2 ">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                to={link.href}
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
      </div>
    </Container>
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
    href: "https://github.com/sahil-coder-2070",
    icon: <Github />,
  },
  {
    name: "Email",
    href: "mailto:sahil207003@gmail.com",
    icon: <Mail />,
  },
];
