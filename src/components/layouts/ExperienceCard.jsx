import React from "react";
import Container from "./Container";
import SectionHeading from "../common/SectionHeading";
import Website from "@/svgs/Website";
import LinkedIn from "@/svgs/LinkedIn";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ExperienceCard = () => {
  return (
    <Container>
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-4 flex items-center gap-5">
        <div>
          <img
            src="https://ramx.in/_next/image?url=%2Fcompany%2Fpromote.png&w=256&q=75"
            alt="company logo"
            className="w-12 rounded-md"
          />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 class="text-lg font-bold blur-none">Zero Dimensions</h3>
                {Links.map((link) => (
                  <Tooltip key={link.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        to={link.href}
                        key={link.name}
                        className="text-secondary flex items-center gap-2"
                      >
                        <span className="size-5">{link.icon}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
            <div>
              <p class="text-muted-foreground text-sm">
                Frontend Developer Intern
              </p>
            </div>
          </div>
          <div className="text-muted-foreground flex flex-col md:text-right">
            <p>June 2025 - July 2025</p>
            <p>Ahmedabad, India (On-Site)</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExperienceCard;

const Links = [
  {
    name: "Visit Website",
    href: "https://zerodimensions.in",
    icon: <Website />,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/zerodimensions",
    icon: <LinkedIn />,
  },
];
