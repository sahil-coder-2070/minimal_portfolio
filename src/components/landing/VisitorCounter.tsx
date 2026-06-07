'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { useVisitorCount } from '@/hooks/useVisitorCount';

const Digit = ({ char, index }: { char: string; index: number }) => {
  const isDigit = /\d/.test(char);

  if (!isDigit) {
    return <span>{char}</span>;
  }

  const num = parseInt(char, 10);

  return (
    <span className="relative inline-block h-5 overflow-hidden align-bottom leading-5">
      <motion.span
        className="flex flex-col"
        animate={{ y: `-${num * 10}%` }}
        transition={{
          type: 'spring',
          stiffness: 70,
          damping: 15,
          delay: index * 0.08,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
          <span key={val} className="inline-flex h-5 items-center justify-center font-mono">
            {val}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const NumberTicker = ({ value }: { value: number }) => {
  const valueString = value.toLocaleString();

  return (
    <span className="inline-flex items-center">
      {valueString.split('').map((char, index) => (
        <Digit key={index} char={char} index={index} />
      ))}
    </span>
  );
};

export default function VisitorCounter() {
  const visitorCount = useVisitorCount();

  return (
    <span className="flex items-center gap-1 pr-5 text-sm text-neutral-400 select-none dark:text-neutral-400">
      <Eye className="h-5 w-5" />
      <NumberTicker value={visitorCount ?? 0} /> visitors
    </span>
  );
}
