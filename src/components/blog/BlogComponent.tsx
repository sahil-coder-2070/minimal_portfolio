import React, { ReactNode } from 'react';
import { ZoomableImage } from '@/components/projects/ZoomableImage';
import CopyButton from '@/components/ui/copy-button';

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

export const BlogComponents = {
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

  // Headings with clean Shadcn typography tokens
  h1: ({ children, ...props }: ChildrenProps) => (
    <h1 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 className="mb-2 mt-6 text-xl font-medium tracking-tight text-foreground" {...props}>
      {children}
    </h3>
  ),

  // Paragraph styling - text-foreground ensures crisp contrast in light & dark mode
  p: ({ children, ...props }: ChildrenProps) => (
    <p className="mb-6 leading-relaxed text-foreground/90 font-normal text-base" {...props}>
      {children}
    </p>
  ),

  // Lists styling
  ul: ({ children, ...props }: ChildrenProps) => (
    <ul className="mb-4 list-disc pl-6 text-foreground/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ChildrenProps) => (
    <ol className="mb-4 list-decimal pl-6 text-foreground/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ChildrenProps) => (
    <li className="mb-2 ml-2 leading-relaxed text-foreground/90" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: ChildrenProps) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),

  // Code block component
  code: ({ children, className, ...props }: CodeProps) => {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground border border-border/60"
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ children, ...props }: ChildrenProps) => (
    <em className="font-semibold not-italic text-foreground/90" {...props}>
      {children}
    </em>
  ),
  // Blockquote
  blockquote: ({ children, ...props }: ChildrenProps) => (
    <blockquote
      className="my-6 border-l-4 border-primary/60 pl-4 italic text-muted-foreground"
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
          className="bg-neutral-950 dark:bg-neutral-900/95 border border-neutral-800 overflow-x-auto rounded-xl p-4 sm:p-6 text-neutral-100 text-xs sm:text-sm font-mono leading-relaxed [&_code]:bg-transparent! [&_code]:border-none! [&_code]:p-0! [&_code]:rounded-none! [&_code]:text-inherit!"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  hr: ({ ...props }) => (
    <hr className="my-12 border-t border-border" {...props} />
  ),
};
