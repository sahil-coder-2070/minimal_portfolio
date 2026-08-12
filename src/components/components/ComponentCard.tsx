'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ComponentCardProps {
  title: string;
  description?: string;
  href?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function ComponentCard({
  title,
  description,
  href = '#',
  badge = 'React · Motion',
  children,
}: ComponentCardProps) {
  return (
    <div className="h-full">
      <div className="relative flex h-full flex-col gap-2 p-2 py-5 md:py-2 hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40">
        {/* Preview container matching Blog Image Container 1:1 */}
        <div className="relative select-none [--image-radius:var(--radius-xl)]">
          <div className="aspect-1200/630 rounded-[var(--image-radius)] bg-neutral-100/80 dark:bg-neutral-900/50 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
            <div className="w-full flex items-center justify-center">
              {children}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[var(--image-radius)] inset-ring-1 inset-ring-black/10 dark:inset-ring-white/10" />
        </div>

        {/* Content matching Blog Content 1:1 */}
        <div className="flex h-full flex-col justify-between gap-2 p-2">
          <div className="space-y-2">
            <h3 className="text-lg leading-snug font-medium text-balance">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Footer Details: Badge & View Component Link */}
          <div className="relative z-10 mt-2 space-y-3">
            <div className="border-border flex items-center justify-between border-t pt-2.5">
              <span className="text-muted-foreground/80 font-mono text-xs font-medium">
                {badge}
              </span>
              <Link href={href}>
                <div className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1 text-xs font-medium transition-colors">
                  <span>View Component</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
