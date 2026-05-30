import React, { ReactNode } from "react";
import Image from "next/image";
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
const TechnologyComponents: Record<string, () => React.ReactNode> = {
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
const Technology = ({ name = "" }: { name?: string }) => {
  const TechComponent =
    TechnologyComponents[name] || TechnologyComponents[name?.toLowerCase()];

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900/60 px-2 py-0.5 text-xs font-normal tracking-wide text-foreground border border-neutral-300/40 dark:border-neutral-800/80 shadow-xs select-none [&_svg]:size-3.5 size-fit">
      {TechComponent && (
        <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
          <TechComponent />
        </span>
      )}
      <span className="text-foreground text-xs font-normal tracking-wide whitespace-nowrap">{name}</span>
    </div>
  );
};

// Tech stack
const TechStack = ({ technologies = [] }: { technologies?: string[] }) => (
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
const Challenges = ({ challenges = [] }: { challenges?: string[] }) => (
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
const Learnings = ({ learnings = [] }: { learnings?: string[] }) => (
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

interface ImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

interface ChildrenProps {
  children: ReactNode;
  [key: string]: unknown;
}

interface CodeProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const ProjectComponents = {
  img: ({ src, alt, ...props }: ImageProps) => (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={400}
      className="rounded-lg"
      {...props}
    />
  ),

  h1: ({ children, ...props }: ChildrenProps) => (
    <h1 className="mb-6 text-4xl font-bold" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 className="mt-8 mb-4 text-3xl font-semibold" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 className="mt-6 mb-3 text-2xl font-medium" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }: ChildrenProps) => (
    <p className="text-muted-foreground mb-4 leading-7" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }: ChildrenProps) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: ChildrenProps) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: ChildrenProps) => (
    <li className="text-muted-foreground leading-7" {...props}>
      {children}
    </li>
  ),

  pre: ({ children, ...props }: ChildrenProps) => {
    return (
      <div className="group relative mb-4">
        <pre
          className="code-block overflow-x-auto rounded-lg text-sm"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  code: ({ children, className, ...props }: CodeProps) => {
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

  blockquote: ({ children, ...props }: ChildrenProps) => (
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
