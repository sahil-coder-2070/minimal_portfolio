'use client';

import { useEffect, useState } from 'react';
import { quotes } from '@/config/Quote';
import { motion as Motion } from 'motion/react';
import Container from '../layouts/Container';
import RepeatSeparator from '../ui/repeat-separator';

export const Quote = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0] || null);

  useEffect(() => {
    if (quotes.length > 1) {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, []);

  if (!currentQuote) return null;

  const { quote, author } = currentQuote;

  return (
    <div data-site-quote>
      <RepeatSeparator />
      <Container >
        <div>
          <div className="border-border before:bg-border after:bg-border relative flex flex-col items-center justify-center border-x px-6 py-12 text-center before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw]">
            {/* Quote Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-quote mb-6 size-10 fill-current text-zinc-300 dark:text-zinc-600"
              aria-hidden="true"
            >
              <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
              <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
            </svg>

            {/* Quote Text */}
            <blockquote className="mb-6 max-w-2xl text-xl font-medium text-zinc-700 italic sm:text-2xl dark:text-zinc-300">
              "{quote}"
            </blockquote>

            {/* Author Attribution */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600"></div>
              <span className="text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                {author}
              </span>
              <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-600"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
