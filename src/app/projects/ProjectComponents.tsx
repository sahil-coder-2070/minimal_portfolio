import React from "react";
import Bun from "@/components/icons/tech/Bun";
import JavaScript from "@/components/icons/tech/JavaScript";
import MongoDB from "@/components/icons/tech/MongoDB";
import NextJS from "@/components/icons/tech/NextJS";
import NodeJS from "@/components/icons/tech/NodeJS";
import PostgreSQL from "@/components/icons/tech/PostgreSQL";
import Prisma from "@/components/icons/tech/Prisma";
import ReactIcon from "@/components/icons/tech/ReactIcon";
import TypeScript from "@/components/icons/tech/TypeScript";
import { Badge } from "@/components/ui/badge";

// Technology mapping
const TechnologyComponents = {
  "Next.js": NextJS,
  nextjs: NextJS,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  "Node.js": NodeJS,
  nodejs: NodeJS,
  node: NodeJS,
  MongoDB: MongoDB,
  mongodb: MongoDB,
  PostgreSQL: PostgreSQL,
  postgresql: PostgreSQL,
  Prisma: Prisma,
  prisma: Prisma,
  Bun: Bun,
  bun: Bun,
};

// Technology badge
const Technology = ({ name = "" }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name?.toLowerCase()];

  return (
    <div className="bg-muted/50 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium">
      {TechComponent && <TechComponent />}
      <span>{name}</span>
    </div>
  );
};

// Tech stack
const TechStack = ({ technologies = [] }) => (
  <div className="bg-muted/20 my-6 rounded-lg border p-4">
    <h4 className="mb-3 text-lg font-semibold">Technology Stack</h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Technology key={tech} name={tech} />
      ))}
    </div>
  </div>
);

// Project meta
const ProjectMeta = ({
  timeline,
  role,
  team,
  status,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
}) => (
  <div className="bg-muted/20 my-6 grid gap-4 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-4">
    {timeline && (
      <div>
        <h5 className="text-muted-foreground text-sm font-semibold">
          Timeline
        </h5>
        <p className="text-sm">{timeline}</p>
      </div>
    )}

    {role && (
      <div>
        <h5 className="text-muted-foreground text-sm font-semibold">Role</h5>
        <p className="text-sm">{role}</p>
      </div>
    )}

    {team && (
      <div>
        <h5 className="text-muted-foreground text-sm font-semibold">Team</h5>
        <p className="text-sm">{team}</p>
      </div>
    )}

    {status && (
      <div>
        <h5 className="text-muted-foreground text-sm font-semibold">Status</h5>
        <Badge
          variant={
            status === "completed"
              ? "default"
              : status === "in-progress"
                ? "secondary"
                : "outline"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    )}
  </div>
);

// Challenges
const Challenges = ({ challenges = [] }) => (
  <div className="my-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
    <h4 className="mb-3 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
      Key Challenges
    </h4>
    <ul className="space-y-2">
      {challenges.map((challenge, index) => (
        <li
          key={index}
          className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-300"
        >
          <span className="mt-1 block size-1.5 rounded-full bg-yellow-500 dark:bg-yellow-400" />
          {challenge}
        </li>
      ))}
    </ul>
  </div>
);

// Learnings
const Learnings = ({ learnings = [] }) => (
  <div className="my-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
    <h4 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">
      Key Learnings
    </h4>
    <ul className="space-y-2">
      {learnings.map((learning, index) => (
        <li
          key={index}
          className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300"
        >
          <span className="mt-1 block size-1.5 rounded-full bg-green-500 dark:bg-green-400" />
          {learning}
        </li>
      ))}
    </ul>
  </div>
);

export const ProjectComponents = {
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      {...props}
    />
  ),

  h1: ({ children, ...props }) => (
    <h1 className="mb-6 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-6 mb-3 text-2xl font-medium" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="text-muted-foreground mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="text-muted-foreground leading-7" {...props}>
      {children}
    </li>
  ),

  pre: ({ children, ...props }) => {
    return (
      <div className="group relative mb-4">
        <pre
          className="bg-muted/30 overflow-x-auto rounded-lg border p-4 text-sm [&>code]:bg-transparent [&>code]:p-0"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  code: ({ children, className, ...props }) => {
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className="rounded px-2 py-1 font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};
