import React, { ReactNode } from 'react';
import Image from 'next/image';
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
};
