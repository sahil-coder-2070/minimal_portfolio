import React from "react";
import Container from "./Container";
import SectionHeading from "../common/SectionHeading";
import Website from "@/components/icons/social/Website";
import LinkedIn from "@/components/icons/social/LinkedIn";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ExperienceCard = () => {
  return (
    <Container>
      <SectionHeading subHeading="Featured" heading="Experience" />
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
