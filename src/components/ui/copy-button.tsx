'use client';

import React, { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'motion/react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyIcon({ copied, className = "size-4" }: { copied: boolean; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {copied ? (
        <Motion.span
          key="check"
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center shrink-0"
        >
          <Check className={`${className} text-emerald-400 stroke-[2.2]`} />
        </Motion.span>
      ) : (
        <Motion.span
          key="copy"
          initial={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.8, opacity: 0, filter: 'blur(2px)' }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center shrink-0"
        >
          <Copy className={className} />
        </Motion.span>
      )}
    </AnimatePresence>
  );
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    // If already copied (tick state), clicking toggles back to copy icon immediately
    if (copied) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setCopied(false);
      return;
    }

    try {
      await navigator.clipboard.writeText(text.trim());

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setCopied(true);

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      className={`absolute top-3.5 right-3.5 z-10 flex size-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950/90 text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-900 hover:text-neutral-200 cursor-pointer select-none ${className || ''}`}
      aria-label="Copy code"
    >
      <CopyIcon copied={copied} className="size-4" />
    </Motion.button>
  );
}
