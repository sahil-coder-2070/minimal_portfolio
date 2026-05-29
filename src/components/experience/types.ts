import React from "react";

export interface SkillItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface ExperiencePosition {
  id: string;
  title: string;
  employmentType?: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  duration?: string; // e.g. "2m"
  location?: string;
  description: string; // Markdown or bullet content
  skills?: SkillItem[];
  isExpanded?: boolean;
}

export interface Experience {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  isCurrentEmployer?: boolean;
  positions: ExperiencePosition[];
}
