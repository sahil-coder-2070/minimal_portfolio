'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import { useVisitorCount } from '@/hooks/useVisitorCount';
import NumberFlow, { continuous } from '@number-flow/react';

export default function VisitorCounter() {
  const visitorCount = useVisitorCount();

  return (
    <span className="flex items-center gap-1 pr-5 text-sm text-neutral-400 select-none dark:text-neutral-400">
      <Eye className="h-5 w-5" />
      <NumberFlow
        plugins={[continuous]}
        value={visitorCount ?? 0}
      /> visitors
    </span>
  );
}

