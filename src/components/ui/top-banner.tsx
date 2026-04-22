const TopBanner = () => {
  return (
    <div className="after:bg-border relative w-full max-w-screen items-center justify-between gap-2 overflow-visible py-3 transition-shadow duration-300 after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">

      <div className="flex h-full min-h-17.5 w-full items-center justify-center bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center p-12 px-[5px] [--pattern-foreground:color-mix(in_oklab,var(--color-zinc-400)_60%,transparent)] sm:min-h-[110px] dark:[--pattern-foreground:color-mix(in_oklab,var(--color-zinc-600)_60%,transparent)]">
        <h3 className="text-xl font-medium opacity-50">
          Open for full-time <br /> & freelance work
        </h3>
      </div>
    </div>
  );
};

export default TopBanner;
