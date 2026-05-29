import CSS from "@/components/icons/tech/Css";
import Figma from "@/components/icons/tech/Figma";
import Html from "@/components/icons/tech/Html";
import JavaScript from "@/components/icons/tech/JavaScript";
import TailwindCss from "@/components/icons/tech/TailwindCss";

import type { Experience } from "./types";

const ExperienceCardData: Experience[] = [
  {
    id: "zero-dimensions",
    companyName: "Zero Dimensions",
    companyLogo: "/company.webp",
    companyWebsite: "https://zerodimensions.in", // Linked company website
    isCurrentEmployer: false,
    positions: [
      {
        id: "frontend-intern",
        title: "Frontend Developer Intern",
        employmentType: "Internship",
        employmentPeriod: {
          start: "Jan 2025",
          end: "July 2025",
        },
        duration: "6m",
        location: "Ahmedabad, India (On-Site)",
        description: `Developed and maintained web applications using HTML, CSS, and JavaScript.
Collaborated with cross-functional teams to deliver high-quality software on time.
Design & Developed multiple websites for clients.`,
        skills: [
          {
            name: "HTML",
            href: "https://html.com/",
            icon: <Html />,
          },
          {
            name: "CSS",
            href: "https://css.com/",
            icon: <CSS />,
          },
          {
            name: "JavaScript",
            href: "https://javascript.com/",
            icon: <JavaScript />,
          },
          {
            name: "Figma",
            href: "https://figma.com/",
            icon: <Figma />,
          },
          {
            name: "TailwindCss",
            href: "https://tailwindcss.com/",
            icon: <TailwindCss />,
          },
        ],
        isExpanded: true, // 1st one is always open
      },
    ],
  },
];

export default ExperienceCardData;
