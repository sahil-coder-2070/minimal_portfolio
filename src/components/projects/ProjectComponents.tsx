import React, { ReactNode } from 'react';
import Image from 'next/image';
import CopyButton from '@/components/ui/copy-button';
import Bun from '@/components/icons/tech/Bun';
import { ZoomableImage } from '@/components/projects/ZoomableImage';
import JavaScript from '@/components/icons/tech/JavaScript';
import MongoDB from '@/components/icons/tech/MongoDB';
import NextJS from '@/components/icons/tech/NextJS';
import NodeJS from '@/components/icons/tech/NodeJS';
import PostgreSQL from '@/components/icons/tech/PostgreSQL';
import Prisma from '@/components/icons/tech/Prisma';
import ReactIcon from '@/components/icons/tech/ReactIcon';
import TypeScript from '@/components/icons/tech/TypeScript';
import { Badge } from '@/components/ui/badge';

// Technology mapping
const TechnologyComponents: Record<string, () => React.ReactNode> = {
  'Next.js': NextJS,
  nextjs: NextJS,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  'Node.js': NodeJS,
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
const Technology = ({ name = '' }: { name?: string }) => {
  const TechComponent = TechnologyComponents[name] || TechnologyComponents[name?.toLowerCase()];

  return (
    <div className="text-foreground flex size-fit items-center gap-1.5 rounded-full border border-neutral-300/40 bg-zinc-50 px-2 py-0.5 text-xs font-normal tracking-wide shadow-xs select-none dark:border-neutral-800/80 dark:bg-zinc-900/60 [&_svg]:size-3.5">
      {TechComponent && (
        <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
          <TechComponent />
        </span>
      )}
      <span className="text-foreground text-xs font-normal tracking-wide whitespace-nowrap">
        {name}
      </span>
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
        <h5 className="text-muted-foreground text-sm font-semibold">Timeline</h5>
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
            status === 'completed' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'
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
    <h4 className="mb-3 text-lg font-semibold text-green-800 dark:text-green-200">Key Learnings</h4>
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
  // Image tag
  img: ({ src, alt, ...props }: ImageProps) => (
    <ZoomableImage
      src={src}
      alt={alt}
      width={800}
      height={450}
      {...props}
    />
  ),

  // Headings with custom styles
  h1: ({ children, ...props }: ChildrenProps) => (
    <h2 className="mb-4 text-4xl font-bold" {...props}>
      {children}
    </h2>
  ),
  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 className="mb-3 text-2xl font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 className="mb-2 text-xl font-medium" {...props}>
      {children}
    </h3>
  ),

  // Paragraph styling
  p: ({ children, ...props }: ChildrenProps) => (
    <p className="text-secondary mb-6 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  // Lists styling
  ul: ({ children, ...props }: ChildrenProps) => (
    <ul className="mb-4 list-disc pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ChildrenProps) => (
    <ol className="mb-4 list-decimal pl-8" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ChildrenProps) => (
    <li className="text-muted-foreground mb-2 ml-4" {...props}>
      {children}
    </li>
  ),

  // Inline code block
  code: ({ children, className, ...props }: CodeProps) => {
    // agar syntax highlighting hai (language-xyz class)
    if (className && className.startsWith('language-')) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    // simple inline code
    return (
      <code
        className="rounded px-1.5 py-0.5 font-mono text-[1.1em]"
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ children, ...props }: ChildrenProps) => (
    <em className="text-primary not-italic text-sm font-semibold" {...props}>
      `{children}`
    </em>
  ),
  // Blockquote
  blockquote: ({ children, ...props }: ChildrenProps) => (
    <blockquote
      className="my-4 border-l-4 border-neutral-500 pl-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),

  pre: ({ children, ...props }: ChildrenProps) => {
    const getRawText = (node: React.ReactNode): string => {
      if (!node) return '';
      if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(getRawText).join('');
      }
      if (React.isValidElement(node)) {
        return getRawText(node.props.children);
      }
      return '';
    };
    const codeText = getRawText(children);

    return (
      <div className="group relative my-6 w-full">
        <CopyButton text={codeText} />
        <pre
          className="dark:bg-neutral-800/60 bg-neutral-900 border border-transparent ring ring-neutral-700 overflow-x-auto rounded-lg p-6 text-neutral-200 text-sm"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  hr: ({ ...props }) => (
    <hr className="my-12 border-t border-neutral-300/40 dark:border-neutral-800/80" {...props} />
  ),

  Technology,
  TechStack,
  ProjectMeta,
  Challenges,
  Learnings,
};
