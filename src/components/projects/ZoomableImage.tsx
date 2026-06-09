'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion as Motion, AnimatePresence } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ZoomableImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when zoomed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on scroll, mouse wheel, or touch gesture
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [isOpen]);

  // If width and height are provided, it's inline (like in markdown)
  // otherwise it's relative/fill (like the featured image)
  const isFill = !width && !height;

  return (
    <>
      <span
        onClick={() => setIsOpen(true)}
        className={cn(
          "group border-border bg-muted/40 relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 cursor-zoom-in hover:border-neutral-400 dark:hover:border-neutral-700",
          isFill ? "block aspect-video w-full mb-8" : "inline-block my-4",
          className
        )}
      >
        {isFill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn("h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]", className)}
          />
        )}
        
        {/* Overlay hover effect */}
        <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 flex items-center justify-center">
          <span className="bg-background/80 border-border text-foreground opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-xs shadow-sm">
            <Maximize2 className="size-3.5" />
            <span>Click to zoom</span>
          </span>
        </span>
      </span>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-50/90 dark:bg-neutral-950/90 p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          >
            {/* Enlarged Image Container */}
            <Motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.08, ease: 'easeOut' }}
              className="relative max-w-5xl max-h-[75vh] overflow-hidden rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 shadow-2xl cursor-zoom-out flex items-center justify-center"
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain select-none"
              />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
