import { ReactNode } from 'react';
import Image from 'next/image';

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
    <Image
      src={src}
      alt={alt}
      width={800}
      height={450}
      style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0', height: 'auto' }}
      {...props}
    />
  ),

  // Headings with custom styles
  h1: ({ children, ...props }: ChildrenProps) => (
    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.75rem' }} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '0.5rem' }} {...props}>
      {children}
    </h3>
  ),

  // Paragraph styling
  p: ({ children, ...props }: ChildrenProps) => (
    <p className="text-secondary" style={{ lineHeight: 1.6, marginBottom: '1.5rem' }} {...props}>
      {children}
    </p>
  ),

  // Lists styling
  ul: ({ children, ...props }: ChildrenProps) => (
    <ul
      style={{
        paddingLeft: '1.5rem',
        marginBottom: '1rem',
        listStyleType: 'disc',
      }}
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ChildrenProps) => (
    <ol
      style={{
        paddingLeft: '1.9rem',
        marginBottom: '1rem',
        listStyleType: 'decimal',
      }}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ChildrenProps) => (
    <li className="text-muted-foreground ml-4" style={{ marginBottom: '0.5rem' }} {...props}>
      {children}
    </li>
  ),

  // Inline code block
  code: ({ children, className, ...props }: CodeProps) => {
    // agar syntax highlighting hai (language-xyz class)
    if (className && className.startsWith('language-')) {
      return (
        <code className={`$className`} {...props}>
          {children}
        </code>
      );
    }
    // simple inline code
    return (
      <code
        style={{
          padding: '2px 5px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '1.2em',
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ children, ...props }: ChildrenProps) => (
    <em className="text-primary text-sm font-semibold" style={{ fontStyle: 'normal' }} {...props}>
      `{children}`
    </em>
  ),
  // Blockquote
  blockquote: ({ children, ...props }: ChildrenProps) => (
    <blockquote
      style={{
        borderLeft: '4px solid #555',
        margin: '1rem 0',
        paddingLeft: '1rem',
        fontStyle: 'italic',
        color: '#aaa',
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Preformatted block (code block wrapper)
  pre: ({ children, ...props }: ChildrenProps) => (
    <pre
    className='dark:bg-neutral-800/60 bg-neutral-900 border  border-transparent ring ring-neutral-700'
      style={{
        color: '#eee',
        padding: '1.5rem',
        borderRadius: '8px',
        overflowX: 'auto',
        marginBottom: '1.5rem',
      }}
      {...props}
    >
      {children}
    </pre>
  ),
};
