const RepeatSeparator = () => {
  return (
    <div className="relative left-1/2 flex h-6 w-screen shrink-0 -translate-x-1/2 border-y border-neutral-200/60 before:absolute before:inset-0 before:-z-10 before:bg-[repeating-linear-gradient(315deg,transparent_0,rgb(229_229_229_/_0.6)_0,rgb(229_229_229_/_0.6)_1px,transparent_1px,transparent_50%)] before:bg-[size:10px_10px] dark:border-neutral-800 dark:before:bg-[repeating-linear-gradient(315deg,transparent_0,theme(colors.neutral.900)_0,theme(colors.neutral.900)_1px,transparent_1px,transparent_50%)]" />
  );
};

export default RepeatSeparator;
