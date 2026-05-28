"use client";

import React, { useState } from "react";
import Container from "../layouts/Container";
import { Separator } from "../ui/separator";
import ProjectCard from "@/app/projects/ProjectCard";
import { Badge } from "../ui/badge";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  img: {
    src: string;
    alt: string;
  };
  links: {
    website: string;
    github: string;
    details: string;
  };
  technologies: Array<{ name: string }>;
  isWorking: boolean;
  isBuilding: boolean;
  isBulding?: boolean; // Support historical typo safely
  details: boolean;
}

const Projects = ({ projects = [] }: { projects?: ProjectItem[] }) => {
  const [isSelected, setIsSelected] = useState<boolean | null>(null);

  const filteredProjects =
    isSelected === null
      ? projects
      : projects.filter((item) => item.isWorking === isSelected);

  return (
    <Container className="py-16">

      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            My projects and work across different technologies and domains.
          </p>
        </div>
      </div>

      <Separator />

      <div className="my-2 flex gap-5">
        <Badge
          variant={isSelected === null ? "secondary" : "outline"}
          onClick={() => setIsSelected(null)}
          className={`cursor-pointer capitalize ${
            isSelected === null
              ? "bg-foreground text-background"
              : "hover:bg-accent hover:text-accent-foreground shadow-accent inset-shadow dark:inset-shadow-neutral-700"
          }`}
        >
          All ({projects.length})
        </Badge>

        <Badge
          variant={isSelected === true ? "default" : "outline"}
          onClick={() => setIsSelected(true)}
          className={`cursor-pointer capitalize ${
            isSelected === true
              ? "bg-foreground text-background"
              : "hover:bg-accent hover:text-accent-foreground shadow-accent inset-shadow dark:inset-shadow-neutral-700"
          }`}
        >
          Working ({projects.filter((item) => item.isWorking).length})
        </Badge>

        <Badge
          variant={isSelected === false ? "default" : "outline"}
          onClick={() => setIsSelected(false)}
          className={`cursor-pointer capitalize ${
            isSelected === false
              ? "bg-foreground text-background"
              : "hover:bg-accent hover:text-accent-foreground shadow-accent inset-shadow dark:inset-shadow-neutral-700"
          }`}
        >
          Building (
          {projects.filter((item) => item.isBuilding || item.isBulding).length})
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-bold">Latest Posts</h3>
        <span className="text-sm">({projects.length} posts)</span>
      </div>

      <ProjectCard completed={filteredProjects} />
    </Container>
  );
};

export default Projects;
