import React from 'react';

const BottomBanner = () => {
  return (
    <div className="after:z relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-3 transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-screen after:-translate-x-1/2 after:bg-neutral-100 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:after:bg-neutral-900 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
      <div className="flex h-50 min-h-30 w-full items-center justify-center bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] mask-y-from-90% mask-x-from-95% mask-circle bg-size-[10px_10px] bg-center px-1.25 [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] sm:min-h-32 dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]"></div>
    </div>
  );
};

export default BottomBanner;
